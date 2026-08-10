# 02 · Architecture

## 1. Where the controller lives

A run lasts hours and must survive a page reload, HMR, a closed tab, and a dev-server restart. DaGama's
controller therefore runs **in the Vite dev-server plugin process**, but it is not the authority on run
state — the disk is.

That distinction is the whole design:

- `events.jsonl` is an append-only log with monotonic `seq`. It is the authority.
- `run.json` is a materialized view. It may be deleted and rebuilt from the event log at any time.
- A seat's completion is recorded by **the agent's own shell**, not by the server watching a process.

The consequence is that killing the dev server cannot lose a run, and cannot make a finished turn look
unfinished. On restart the controller replays the log and reconciles.

We deliberately did not build a separate long-lived daemon. See
[06-decisions.md#d2](./06-decisions.md#d2--the-controller-is-a-vite-plugin-durability-comes-from-disk).

## 2. Storage layout

Two roots, deliberately **siblings and never ancestor/descendant**, so that no relative path leads from
an agent's working directory into the control plane.

That is a hygiene property, not a security boundary — see
[§10 Threat model](#10-threat-model-what-is-and-is-not-enforced) for what actually holds. Claude has no
sandbox flag at all, so a Claude seat runs with the developer's own uid and can reach any path they can.

```text
~/.fleetlog/dagama/projects/<projectId>/
  runs/<runId>/                            # PRIVATE control state — agents never see this
    board.snapshot.json                    # frozen board definition
    inputs.snapshot.json                   # resolved run inputs
    run.json                               # materialized view (rebuildable)
    events.jsonl                           # append-only authority
    prompts/<componentId>/<instance>/<seatId>/<attempt>.md
    attempts/<componentId>/<instance>/<seatId>/<attempt>/
      launcher.sh                          # exactly what we ran
      stream.jsonl                         # provider structured output
      stderr.log
      exit.json                            # written by launcher.sh, the completion record
    artifacts/manifest.jsonl               # authoritative promoted-artifact index
    artifacts/blobs/<artifactId>/<name>    # immutable promoted copies

  roots/<runId>/                           # the run-owned CLONE (agent cwd) — see §6
    .git/                                  # its own, isolated from the user's repo
    .fleetlog/
      .gitignore                           # a single '*', so this tree never enters a commit
      run/
        in/<componentId>/<instance>/       # controller-staged, read-only inputs
        out/<componentId>/<seatId>/<attempt>/ # seat-writable candidate outputs
```

Promoted artifacts are stored twice on purpose: the immutable copy under `artifacts/blobs/` is evidence
the agent cannot reach, and the copy staged into `in/` is what the next component actually reads.

The project's own `.fleetlog/dagama/boards/<boardId>.json` holds board definitions, matching Columbus's
existing project-scoped storage convention.

## 3. Event log

One JSON object per line, appended and fsynced before the side effect it authorises:

| Event                                       | Written                                      | Why it must be durable                   |
| ------------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| `run_created`                               | after snapshots are on disk                  | identifies the run                       |
| `run_root_created`                          | after the clone succeeds                     | cleanup knows what to remove             |
| `component_ready`                           | when inputs are staged                       | scheduling is replayable                 |
| `attempt_launch_requested`                  | **before** spawning anything                 | prevents a double launch after a crash   |
| `attempt_launched`                          | after tmux/ttyd are up                       | records pid, tmux name, port, session id |
| `attempt_session_bound`                     | when Codex emits `thread.started`            | fills session id for takeover/resume     |
| `attempt_exited`                            | when `exit.json` is observed                 | the completion fact                      |
| `artifact_promoted`                         | after the immutable copy + hash are written  | the handoff fact                         |
| `change_captured`                           | after the controller computed the patch hash | pins the change revision                 |
| `component_succeeded`                       | after every required output validated        | the advance decision                     |
| `component_failed`                          | with a machine-readable reason               | the stop decision                        |
| `gate_opened` / `gate_decided`              | around every approval                        | authorises external effects              |
| `takeover_requested` / `handback_completed` | around ownership changes                     | pauses and resumes dependent work        |
| `publish_attempted` / `publish_completed`   | around the external effect                   | idempotency key + provider response      |
| `run_finished`                              | terminal                                     | closes the run                           |

The ordering rule is uniform: **intent before effect, fact after effect.** `attempt_launch_requested`
precedes the spawn, so a crash mid-spawn leaves an intent with no matching `attempt_launched`, and
reconciliation treats that attempt as `unknown` instead of silently launching a second one.

## 4. Attempt identity and the exit protocol

An attempt's identity is deterministic, never generated at spawn time:

```text
attemptId  = <runId>/<componentId>/<instance>/<seatId>/<attempt>
tmuxName   = fleetlog_dagama_<first 16 hex of sha256(attemptId)>
```

Deterministic identity is what makes a retry after a crash idempotent: the same attempt maps to the same
tmux session and the same output directory.

The name is **hashed rather than sanitised**. Columbus's `sanitizeTmuxName` replaces every non-alphanumeric
character with `_`, which maps `plan/1/seat-a` and `plan_1_seat-a` to the same session — and the shared
registry treats a duplicate tmux session as "reuse it by attaching", so a colliding attempt would be
recorded as launched while its launcher never ran. For DaGama a duplicate session is a **hard failure**,
never a reuse, and the attempt id is written into the session environment so reconciliation can verify it
before adopting a session it did not observe start.

### The launcher script

The controller writes `launcher.sh` into the attempt directory and runs it as the tmux session's inner
command. This shape was validated empirically before being specified:

```bash
#!/bin/bash
# <attemptDir>/launcher.sh — written by the controller, run by tmux.
# The ONLY interpolated value is ATTEMPT_DIR, which the controller alone builds.
set -u -o pipefail
ATTEMPT_DIR='<validated absolute path>'
printf '\n--- DaGama · bounded turn starting ---\n'

# Prompt arrives on STDIN, never as an argument and never via $(cat …).
<agent argv…> < "$ATTEMPT_DIR/prompt.md" 2> "$ATTEMPT_DIR/stderr.log" \
  | tee "$ATTEMPT_DIR/stream.jsonl" &
agent_pid=$!

# Wall-clock watchdog. macOS ships no `timeout`/`gtimeout`, and neither CLI has a
# retry cap — a single bad-credential run was measured retrying for 177 s.
( sleep "<timeoutSeconds>"; kill -TERM "$agent_pid" 2>/dev/null
  sleep 10;                 kill -KILL "$agent_pid" 2>/dev/null ) & watchdog=$!

wait "$agent_pid"; code=$?
kill "$watchdog" 2>/dev/null

printf '{"exitCode":%d,"finishedAt":"%s"}\n' "$code" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  > "$ATTEMPT_DIR/exit.json.tmp"
mv "$ATTEMPT_DIR/exit.json.tmp" "$ATTEMPT_DIR/exit.json"     # atomic within one filesystem

printf '\n--- DaGama: turn finished (exit %d). This pane is yours. ---\n' "$code"
exec "${SHELL:-/bin/bash}" -l   # the pane survives; the user can type here
```

Properties, all verified with a real tmux session:

1. `tee` puts the provider's output **in the visible pane and on disk** — the user watches the real CLI.
2. The agent's own exit code is recorded, not `tee`'s zero.
3. `mv` over a same-directory temp file makes `exit.json` appear atomically, so a reader never sees a
   partial record.
4. `exec $SHELL -l` leaves the pane interactive after the turn, so the seat is never a dead log view.

**The prompt goes on stdin.** The first draft used `"$(cat <promptFile>)"` as an argument, which fails
three ways at once: `ARG_MAX` is 1 MiB on this machine, so an artifact-laden prompt dies with a confusing
error; a failed `cat` hands the CLI an empty prompt, and with the tmux tty still on stdin the CLI can
then block forever — producing exactly the silent hang the exit protocol exists to prevent; and it is a
quoting surface. Redirecting the file removes all three, and both CLIs accept a stdin prompt.

**Values are validated before they are quoted, not instead.** Model, effort, and permission strings come
from a board file, which is user data that can be hand-edited or shared. Shell-quoting a value like
`bypassPermissions` is perfectly safe and still a privilege escalation, so the allowlist runs first and
rejects; quoting is the second line, not the first.

The controller detects completion by the appearance of `exit.json` — `fs.watch` on the attempt directory
with a 2 s poll fallback, because macOS FSEvents can miss events under load. Terminal liveness,
transcript quietness, and final-message sentiment are never inputs to that decision.

> Known cosmetic issue: `bash -lc` sources the user's profile, so profile chatter (e.g. nvm warnings)
> appears above the turn. The banner line exists so the turn's real start is unambiguous. We keep the
> login shell because agents need the user's real `PATH` and tool environment.

### Session identity

- **Claude** — the controller chooses the session id: `--session-id <uuid>`. Known before launch. Must be
  a real UUID; a non-UUID exits 1 at argument validation.
- **Codex** — **cannot be chosen.** `codex exec --session-id` does not exist. The id is captured from the
  first line of the JSONL stream: `{"type":"thread.started","thread_id":"…"}`. Never inferred from cwd
  plus launch time, which is ambiguous the moment two seats run in one directory.

Until a Codex thread id appears in the stream, the seat is `running` with `sessionId: null`, and resume
and takeover are disabled rather than guessed.

## 4a. Verified CLI contract

Every flag below was checked against the installed binaries — Claude Code 2.1.220 and codex-cli 0.145.0
— rather than taken from memory. The adapters encode exactly this and nothing more.

### Bounded automated turn

```bash
# Claude — --verbose is MANDATORY with stream-json, not optional
claude -p --output-format stream-json --verbose \
       --session-id <uuid> --model <model> --effort <level> \
       --permission-mode <mode> --max-turns <n> "$(cat <promptFile>)"

# Codex — no --session-id, no --ask-for-approval, no --reasoning-effort on `exec`
codex exec --json --model <model> --sandbox <policy> \
           -c approval_policy="never" -c model_reasoning_effort="<level>" \
           "$(cat <promptFile>)" </dev/null
```

### Traps that would each have produced a broken adapter

| Trap                                                                                                               | Consequence if ignored                                              |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `--output-format stream-json` requires `--verbose`                                                                 | exit 1 immediately, every turn                                      |
| `--resume` + `--session-id` requires `--fork-session`                                                              | exit 1 immediately                                                  |
| `codex exec` has no `--ask-for-approval`; default policy is `on-request`                                           | unexpected-argument error, or a non-deterministic approval path     |
| `codex exec` has no `--reasoning-effort`                                                                           | unexpected-argument error; must use `-c model_reasoning_effort=…`   |
| `codex exec` reads stdin whenever stdin is not a TTY                                                               | the turn blocks or swallows input; always `</dev/null`              |
| Claude's final `result` event reported `subtype:"success"` while `is_error:true` and `terminal_reason:"api_error"` | a stream-parsing implementation would call a failed turn successful |
| Codex emits `{"type":"error"}` events for _retries_, not just fatalities                                           | a stream-parsing implementation would abort a healthy turn          |
| `--model` bogus values are **not** rejected at parse time                                                          | a typo reaches the API instead of failing fast                      |
| `--effort` bogus values are a **warning**, silently using the default                                              | a typo silently degrades reasoning                                  |

The last two are why the controller validates `model` and `effort` against an allowlist before writing
the launcher. That check doubles as the injection guard on values that arrive from a saved board file.

We do not parse the stream to decide success. Exit code plus artifact validation is the contract, and the
`subtype:"success"` trap is precisely why: a stream is evidence for a human, not a completion API.

### Resume, fork, and what each vendor cannot do

|                           | Claude                                                                      | Codex                                                |
| ------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------- |
| Non-interactive resume    | `claude -p --resume <id>`                                                   | `codex exec resume <id> [prompt]`                    |
| Resume creates a new id?  | only with `--fork-session`                                                  | **no** — reuses the same `thread_id`                 |
| Non-interactive fork      | `--resume <id> --fork-session --session-id <newUuid>` (verified end to end) | **not supported** — `codex fork` is interactive-only |
| Model preserved on resume | yes                                                                         | **no** — must re-pass `-m`                           |

Two consequences the design absorbs rather than fights:

- Build's repair rounds resume the **same** session in both vendors, which is what a long-lived worker
  wants. Codex's append-only resume is a feature here, not a limitation.
- Every resume re-passes the full model and effort configuration, because Codex silently falls back to
  its config default otherwise, and a silent model downgrade mid-run would be invisible in the artifacts.

### Permission profiles, concretely

| Component             | Claude                          | Codex                                           |
| --------------------- | ------------------------------- | ----------------------------------------------- |
| Plan / Build / Review | `--permission-mode acceptEdits` | `-s workspace-write -c approval_policy="never"` |

All three need file-write to produce their artifacts, so isolation comes from the run worktree rather
than from the CLI sandbox (see §8). Codex's combination is fully deterministic. Claude's `acceptEdits`
could not be proven never to prompt for a tool permission without spending tokens, so the mitigation is
structural: `--max-turns` bounds the turn, a wall-clock timeout bounds the attempt, and a stalled seat
surfaces as `timed_out` with its pane open for inspection rather than hanging invisibly.

The wall-clock timeout is not optional. A single invalid-credential run was measured retrying for
**177 seconds** before emitting its result, and neither CLI exposes a retry cap.

## 5. Ownership transitions are attempts, not keystrokes

Pasting text into a live TUI has no acknowledgement and no result identity, so DaGama never does it as
part of orchestration. Every ownership change is a new, recorded attempt:

| Action                 | What actually happens                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Open CLI**           | Embed the current attempt's ttyd. Read/write; the user may type at any time.                                                                                                    |
| **Take control**       | New attempt with `ownership: human_controlled`, inner command = the _interactive_ provider CLI resuming the same session id in the same worktree. Downstream scheduling pauses. |
| **Return to workflow** | `handback_completed` event, then the component's output validation and patch-hash capture run exactly as they would for an automated completion.                                |
| **Cancel**             | Snapshot the current patch and untracked files first, then kill the process group.                                                                                              |

The user may of course type into any pane whenever they like. That activity is recorded as
human-controlled and is never mistaken for an acknowledged orchestration event.

## 6. Git and the run worktree

### The run root is a clone, not a worktree

This is the single most important correction to the original design, and it came from trying to break
it rather than from reasoning about it.

The obvious implementation — `git worktree add` — **does not isolate anything**. A linked worktree
shares `config`, `hooks/`, `refs/`, `objects/`, and the worktree registry with every other worktree of
the same repository. This project is itself a linked worktree of `~/code/product/fleetlog`, so the
sharing is not hypothetical. Measured, from inside a run worktree:

| Action from the run root                       | `git worktree add` | `git clone --local` |
| ---------------------------------------------- | ------------------ | ------------------- |
| `git config` value readable in the user's repo | **yes**            | no                  |
| `git worktree list` shows the user's checkouts | **yes**            | no (only itself)    |
| Branch created is visible in the user's repo   | **yes**            | no                  |
| `--git-common-dir`                             | the user's `.git`  | its own `.git`      |

With a shared common dir, an agent that follows a hostile instruction can set `core.hooksPath` (code
execution in the user's next commit, in _any_ worktree), set `credential.helper` (exfiltrate the
`gh` token), `update-ref` a branch the user has checked out, or `git worktree remove --force` the
user's working directory along with its uncommitted files. None of that touches the user's files
directly, which is exactly why "we never write to the user's worktree" was the wrong invariant.

So the run root is created with:

```bash
git clone --local --no-hardlinks <toplevel> <runRoot>
git -C <runRoot> remote set-url origin <remote URL captured at preflight>
```

`--no-hardlinks` is deliberate: plain `--local` hardlinks the object files, so an agent that rewrites
one corrupts the user's repository through the shared inode. Copying costs disk and a little time; it
buys an actual boundary.

A second, independent reason to clone: under Codex's `-s workspace-write` sandbox, a _worktree_'s
gitdir lives outside the workspace, so every writing git command the agent runs fails. In a clone the
gitdir is inside the run root, so `workspace-write` becomes an OS-enforced boundary that still permits
normal git use.

### Preflight, before any agent launches

1. Resolve the repository: `git rev-parse --show-toplevel`, `--git-common-dir`, and `realpath` every
   path before storing or comparing it.
2. Refuse ambiguous states: bare repo, detached HEAD as base, in-progress merge/rebase/bisect, or an
   unreadable remote.
3. Record `baseSha`, the target branch's current SHA, and the remote **URL** (never just its name — a
   remote name is resolved through config the agent can edit).
4. Clone as above and create the run branch inside the clone.
5. Write `<runRoot>/.fleetlog/.gitignore` containing `*`, and verify it with `git check-ignore`.
6. Emit `run_root_created`.

The exchange directory ignores itself with an ordinary file rather than a git-level exclude:

```text
<runRoot>/.fleetlog/.gitignore   containing a single line:   *
```

`*` matches `.gitignore` itself, so the whole exchange tree disappears from `git status`. This was
originally chosen because **there is no per-worktree `info/exclude`** — `git rev-parse --git-path
info/exclude` resolves to the _common_ git dir, and a file written to `worktrees/<name>/info/exclude`
is never read, so the "obvious" approach would have silently leaked the rule into the user's checkout.
The clone makes `info/exclude` safe again, but the plain `.gitignore` is kept because it needs no git
state at all and is visible to anyone inspecting the run.

**Every controller git invocation** is hardened, because config and attributes are agent-writable
inside the run root even though they can no longer reach the user:

```bash
git -c core.hooksPath=<empty dir> -c core.attributesFile=/dev/null -c push.default=nothing …
GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null   # for revision capture
```

Without the first two, `git add -A` runs `filter.<name>.clean` from agent-written config, so the
controller's own evidence capture becomes an execution vector.

The user's repository is read-only to a run. DaGama never runs `stash`, `checkout`, `reset`, `switch`,
or `branch -D` against it.

### Change revision capture

Every Build completion produces a monotonically increasing `changeRevision`. Its identity is a
**content-addressed tree OID**, computed by the controller — never the agent — from a _temporary_ index:

```bash
export GIT_INDEX_FILE="$RUNDIR/capture-index"; rm -f "$GIT_INDEX_FILE"
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null
GIT="git -C $RUN_ROOT -c core.attributesFile=/dev/null -c core.hooksPath=$EMPTY_DIR"

$GIT read-tree HEAD
$GIT add -A -- ':(exclude).DS_Store'
treeOid=$($GIT write-tree)
$GIT -c core.abbrev=40 diff --cached --no-color --no-ext-diff --no-textconv --binary HEAD \
  > "$RUNDIR/change.patch"

# write-tree leaves an UNREFERENCED object; anchor it so gc cannot delete the
# approved revision out from under the gate.
commit=$($GIT commit-tree "$treeOid" -p "$baseSha" -m "dagama revision $n")
$GIT update-ref "refs/dagama/runs/$runId/rev/$n" "$commit"
unset GIT_INDEX_FILE
```

Why this exact form, each point measured:

| Candidate                         | Untracked files                   | Mutates the real index | Reproducible                 |
| --------------------------------- | --------------------------------- | ---------------------- | ---------------------------- |
| `git diff HEAD`                   | no                                | no                     | yes                          |
| `git add -A && git diff --cached` | yes                               | **yes**                | yes                          |
| `git stash create`                | **no** (`-u` is silently ignored) | no                     | **no** (timestamp in commit) |
| temp index + `write-tree`         | yes                               | no                     | yes                          |

Only the temp-index form is complete, non-mutating, and reproducible. `GIT_INDEX_FILE` keeps
`$GIT_DIR/index` byte-identical, so a concurrent agent's own staged/unstaged split survives capture —
which matters, because `git add -A` on the real index irreversibly flattens it.

`treeOid` is the revision identity: content-addressed, no timestamps, no dependence on diff rendering.
`patchSha256` is retained as a secondary, human-diffable value. `:(exclude).DS_Store` is required because
`.DS_Store` is _tracked_ in this repository, so Finder touching a directory would otherwise change a
run's revision.

Verify and Review record the exact `changeRevision` and `treeOid` they evaluated. Any later edit produces
a different OID, invalidating every approval pinned to the old one. Publish compares the current OID
against the approved one and refuses on mismatch.

### Publish

Deterministic, argv-only, and idempotent:

1. commit in the run root;
2. inspect the **tree being committed** and refuse it if it contains any path whose first segment is
   `.fleetlog`, or any `.github/workflows/**` — `git ls-tree -r --name-only <treeOid>`, not the index,
   because the index is not what gets pushed. The workflows check matters because the `gh` token
   carries the `workflow` scope, so an agent-authored workflow file on a pushed branch is a path to CI
   secrets;
3. push to the **URL captured at preflight** with an explicit refspec — never a remote name and never a
   bare `git push`, because the remote name resolves through agent-writable config and a bare push
   obeys `push.default`:
   ```bash
   git -c core.hooksPath=<empty> -c push.default=nothing \
       push --atomic <preflightUrl> "refs/heads/<branch>:refs/heads/<branch>"
   ```
4. query for an existing PR on that head branch, then create or update exactly one, passing `-R
<owner/repo>` and an explicit `--base` on every `gh` call so neither is inferred from cwd config.

The existence probe must be exactly this — `--state all` is mandatory, because the default lists only
open PRs and a previously merged branch would look like "no PR":

```bash
gh pr list -R <owner/repo> --head "$RUN_BRANCH" --state all --json number --jq '.[0].number // empty'
```

It exits 0 with `[]` when absent, so the branch is on emptiness, not on exit code. `gh pr view` is the
wrong probe: it exits non-zero when no PR exists, which is indistinguishable from a real failure. `-R`
makes the query independent of the process cwd.

`idempotencyKey = <runId>:<changeRevision>`. A retry after a crash queries before creating, so a
duplicated event cannot open a second PR.

### macOS path hazards

Three verified traps, all of which produce silent mismatches rather than errors:

- **`/tmp` is a symlink to `/private/tmp`.** `git worktree list` reports the realpath while `git`'s own
  error messages echo the un-normalised string. A run that stores `/tmp/…` will never find its own
  worktree. Every stored path is `realpath`-ed, and paths are never parsed out of error text.
- **The filesystem is case-insensitive** and `core.ignorecase=true`. Run directory uniqueness is checked
  case-folded, and ignore patterns match case-insensitively.
- **`core.precomposeunicode=true`** means git NFC-normalises filenames. Any path comparison against a
  directory listing normalises both sides.

## 7. Prompt composition

The controller assembles and snapshots each seat prompt in a fixed order, then writes it to
`prompts/…/<attempt>.md` before the attempt is queued:

1. **Controller invariants** — output locations, artifact rules, the completion protocol, and the
   boundary statement. Not user-editable, not overridable by any later layer.
2. **Component contract** — the preset's role, declared inputs, required outputs, definition of done.
3. **Board instructions** — persistent project conventions.
4. **Run prompt card** — one instruction applying to the whole run.
5. **Component prompt card** — steering for this stage only.
6. **Artifact references** — upstream work and source content, each inside an explicit untrusted-data
   fence naming its origin.

Layers 3–6 can change _how_ the work is done. They structurally cannot change _what counts as done_,
because the controller validates outputs and permissions outside the prompt entirely: a prompt that says
"skip the gate" is text, while the gate is a state machine the text cannot reach. Delimiting is for
legibility; the actual guarantee is that no invariant depends on the model's cooperation.

## 8. Execution profiles

A component's permission profile is explicit per provider, resolved at snapshot time, and never
inherited from an interactive parent session.

An important consequence: a planning or review seat still needs **file-write permission** to produce its
artifact, so a read-only CLI sandbox is not available as the safety mechanism. Review's read-only
property is instead enforced by a controller check — the tree OID before and after the review turn must
match — which is a fact rather than a request.

What the run root does and does not buy is stated plainly in §10. It bounds _git_ damage completely and
_filesystem_ damage only for Codex.

## 9. Failure taxonomy

Every component failure carries a machine-readable reason so the card can say what is wrong and the
scheduler can decide whether a retry is meaningful:

| Reason                      | Meaning                                              | Auto-retry |
| --------------------------- | ---------------------------------------------------- | ---------- |
| `provider_missing`          | the CLI binary is not installed                      | no         |
| `launch_failed`             | tmux/ttyd/port failure                               | once       |
| `timed_out`                 | wall-clock cap reached                               | no         |
| `nonzero_exit`              | provider exited non-zero                             | no         |
| `missing_output`            | terminal state reached, required artifact absent     | no         |
| `invalid_output`            | artifact failed schema, size, or encoding validation | no         |
| `no_change_captured`        | Build produced no diff                               | no         |
| `reviewer_mutated_worktree` | patch hash changed across a review turn              | no         |
| `revision_stale`            | approval no longer matches the worktree              | no         |
| `target_drifted`            | base branch moved since the integration point        | no         |
| `unknown_after_restart`     | reconciliation could not classify the attempt        | no         |

`unknown_after_restart` always asks the user. An attempt that may have half-applied edits must never be
retried automatically.

## 10. Threat model — what is and is not enforced

An adversarial review of this design found that its first draft asserted two boundaries it did not have.
Both are corrected above; this section states the resulting posture plainly, because a design document
that claims a boundary it lacks is more dangerous than one that admits the gap.

The relevant adversary is **not** a malicious user. It is a _hostile instruction reaching a model_ —
from a ticket body, a repository file, a dependency's README, or an upstream artifact — that the model
then acts on with the developer's own privileges.

### Enforced

| Property                                                          | Mechanism                                                                                                                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A run cannot alter the user's git repository, branches, or config | the run root is a clone with its own `.git`                                                                                                            |
| A run cannot execute code via the user's git hooks                | clone isolation, plus `core.hooksPath` on every call                                                                                                   |
| Controller evidence capture cannot be hijacked by repo config     | `GIT_CONFIG_GLOBAL/SYSTEM=/dev/null`, `attributesFile`                                                                                                 |
| An unrecognised model, effort, or permission cannot reach a CLI   | server-side allowlist, reject rather than coerce                                                                                                       |
| A Verify check cannot become an arbitrary shell                   | argv only, `shell: false`, `argv[0]` allowlist                                                                                                         |
| A prompt cannot change what counts as done                        | required outputs come from the board snapshot in controller code, never from prompt text                                                               |
| A prompt cannot forge another component's output                  | the controller reads only declared filenames from the attempt directory named in the launch record; producer identity is assigned, never self-reported |
| An artifact cannot escape via symlink, hardlink, or TOCTOU        | `O_NOFOLLOW` open, `fstat` on the fd, hash the bytes actually read, copy from that buffer                                                              |
| Publish cannot push to an unexpected remote or branch             | preflight URL plus explicit refspec; `-R` and `--base` on every `gh` call                                                                              |
| Approval cannot apply to a different revision                     | tree OID recomputed at decision time, not replayed                                                                                                     |
| A page the developer visits cannot drive `/api`                   | `Sec-Fetch-Site` check plus a JSON content-type requirement, both before any body is read                                                              |
| Untrusted markdown cannot execute as a first-party page           | markdown-only renderer, plus `default-src 'none'; … sandbox` on the response                                                                           |

### Not enforced in v1 — stated, not hidden

**A Claude seat has the developer's full privileges.** Claude Code 2.1.220 has no sandbox flag. Any
permission mode that does not hang grants a shell running as the user, which can read `~/.ssh`, write
`~/.fleetlog`, and edit shell profiles. Therefore:

- the run record is _authoritative against accident and crash_, and _advisory against a compromised
  seat_;
- gate preconditions are re-derived from controller-recomputed facts at decision time rather than
  trusted from the replayed log, which limits — but does not eliminate — what a forged record achieves;
- the mitigation, deferred past v1, is to wrap Claude seats in `sandbox-exec`.

Codex is materially better here: `-s workspace-write` is an OS-enforced boundary, and with the run root
being a clone it is a boundary the agent can still work inside.

**Pre-existing dev-server exposure, inherited rather than introduced.** Three were identified; two are
now closed and the third is tracked in
[07-open-questions.md](./07-open-questions.md#12-do-the-three-inherited-dev-server-exposures-get-fixed-now-or-noted).

| Exposure                                                    | State                                                     |
| ----------------------------------------------------------- | --------------------------------------------------------- |
| Cross-origin POST to any `/api` route could launch an agent | **closed** — `vite/api-guard.ts` in front of every plugin |
| `/api/render` served agent-authored raw HTML same-origin    | **closed** — markdown-only renderer plus `sandbox` CSP    |
| `ttyd` panes have no origin check and no secret base path   | **open** — the launcher's `exec $SHELL -l` compounds it   |

The two that are closed were the ones DaGama made materially worse, because a run deliberately routes
untrusted source text through `/api/render` and exposes new state-changing routes under `/api/dagama`.
Both are now enforced ahead of any body being read, so the guarantee does not depend on each route
remembering to check.

The `ttyd` gap is unchanged and still real: WebSockets are exempt from CORS, so any page the developer
visits can reach a pane on `127.0.0.1:7681–7781`, and the launcher leaves a live shell there after every
finished turn. It is not fixed yet only because enabling `-O` needs the iframe embed re-verified in a
browser, and breaking every terminal in both canvases would be a worse outcome than the exposure. M3
touches live panes and is the right place for it.
