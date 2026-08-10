# 06 · Decisions

Each entry records what was decided, why, and what was rejected. An entry with no rejected alternative
was not a real decision.

---

## D1 · A new canvas, forked from Columbus

**Decision.** DaGama is a separate board that copies Columbus's canvas surface. Columbus is unchanged.

**Why.** Columbus's freeform graph and DaGama's fixed pipeline are different products with different data
models. Retrofitting a run lifecycle into Columbus's node union would put two incompatible concepts in
one normalizer, and that normalizer silently drops node kinds it does not recognise.

**Rejected.** Extending Columbus in place — the migration risk to existing saved boards is not worth it,
and every collision listed in [04-fork-map.md](./04-fork-map.md) would become an in-place refactor
instead of a naming convention.

---

## D2 · The controller is a Vite plugin; durability comes from disk

**Decision.** No separate daemon. The controller runs in the dev-server process. `events.jsonl` is the
authority, `run.json` is a rebuildable view, and completion is recorded by the agent's own shell.

**Why.** The design doc is right that React and Vite middleware cannot be the _lifecycle authority_ — but
the fix is to move the authority to disk, not to add a process. The agents already survive independently
in tmux. With an append-only log and a self-recording exit protocol, killing the dev server cannot lose a
run or make a finished turn look unfinished.

**Rejected.** A long-lived `dagama-controller` service. It buys automatic scheduling while the browser is
closed, at the cost of process supervision, IPC, versioning between the plugin and the daemon, and a
second thing that can be stale. The honest limitation of our choice: **while the dev server is down,
running agents finish but no new component is scheduled.** Work resumes on restart via reconciliation.
That trade is acceptable for a local developer tool and is reversible — the controller is a module with a
file-backed state store, so promoting it to its own process later does not change the data model.

---

## D3 · Intake is deterministic in v1

**Decision.** No normalizer agent. `PROBLEM.md` is rendered from a template around the captured source.

**Why.** The run dialog already asks the user for the problem statement, which resolves ambiguity more
cheaply and more predictably than a model turn. A normalizer's failure mode — quietly inventing scope
that every downstream stage then treats as authoritative — is the worst place in the pipeline to have one.

**Rejected.** An Intake seat for unstructured input. Revisit when ticket connectors land, where the source
genuinely is not written for an agent.

---

## D4 · One seat per component

**Decision.** Every component has exactly one seat. No fan-out, no arbiter, no cross-critique.

**Why.** Fan-out multiplies spend and adds a reconciliation problem — deciding whose output wins — before
we know whether the single-seat pipeline works end to end. The design doc's own analysis is that fan-out
pays off in planning and review specifically; that argument still holds, and it will hold after v1.

**Rejected.** Shipping "thorough mode" with two planners and an arbiter. Deferred, not abandoned: the
component/seat/attempt split in the data model exists precisely so that adding a second seat later is a
schema addition rather than a rewrite.

---

## D5 · The exit record is written by the agent's own shell

**Decision.** Each attempt runs a controller-generated `launcher.sh` that pipes the provider through
`tee`, captures `${PIPESTATUS[0]}`, and atomically `mv`s an `exit.json` into place. The controller watches
for that file.

**Why.** It makes completion a durable fact rather than an observation. If the dev server dies mid-turn,
the record still lands. Verified empirically before being specified: exact exit code preserved through the
pipe, output visible in the pane _and_ on disk, atomic appearance, and the pane still interactive
afterwards for takeover.

**Rejected.**

- _Server observes the child process._ Dies with the server; cannot survive a restart.
- _Parse the transcript for a completion marker._ Exactly the terminal-heuristic trap the design doc
  names. A quiet transcript is not a finished turn.
- _`ttyd` liveness._ The pane deliberately outlives the agent, so liveness carries no information.

---

## D6 · Ownership transitions are new attempts, never keystrokes

**Decision.** Taking control starts a _new attempt_ whose inner command is the interactive provider CLI
resuming the same session. DaGama never types into a pane on the user's behalf.

**Why.** Keystroke injection has no acknowledgement, no result identity, and no completion event, so a
scheduler cannot build on it. Modelling takeover as an attempt gives every ownership change a durable
record and a validated handback, and it costs nothing — the user gets a real interactive CLI either way.

**Rejected.** Reusing Columbus's `/api/terminal/send` paste mechanism for orchestration. It stays
available for humans; it is not part of the protocol.

---

## D7 · The exchange directory ignores itself

**Decision.** `<runRoot>/.fleetlog/.gitignore` containing `*`.

**Why.** Tested: `git rev-parse --git-path info/exclude` resolves to the **common** git dir, and a file
written to `worktrees/<name>/info/exclude` is never read. There is no per-worktree exclude. This decision
predates [D15](#d15--the-run-root-is-a-clone-not-a-git-worktree), which makes `info/exclude` private
again — but the plain `.gitignore` is kept, because it needs no git state at all, survives the run root
being re-created, and is visible to anyone inspecting the run rather than hidden inside `.git`.

**Rejected.**

- _`worktrees/<name>/info/exclude`._ Does not work. Verified.
- _Appending to the common `.git/info/exclude`._ Works, but leaks the rule into every other worktree
  including the user's.
- _`-c core.excludesFile=…` per invocation._ Works for our own git calls, but agents run their own `git
status`, which would not carry the flag. It also silently _replaces_ a user's global excludes file.

---

## D8 · A change revision is a tree OID from a temporary index

**Decision.** Capture with `GIT_INDEX_FILE` pointing at a throwaway index: `read-tree HEAD`,
`add -A -- ':(exclude).DS_Store'`, `write-tree`. The resulting tree OID is the revision identity; the
patch is a derived artifact.

**Why.** Measured against the alternatives, it is the only option that is simultaneously complete
(untracked files included), non-mutating (`$GIT_DIR/index` byte-identical, so a concurrent agent's own
staged/unstaged split survives), and reproducible. A content-addressed OID also beats a patch hash: no
timestamps and no dependence on diff-rendering configuration.

**Rejected.**

- _`git diff HEAD`._ Misses untracked files — which is most of a new feature.
- _`git add -A` on the real index._ Irreversibly flattens the user's staged/unstaged distinction. This
  repository currently carries exactly such a split, so the damage would be immediate.
- _`git stash create`._ Silently ignores `-u`, so untracked files are absent, and its OID changes between
  identical invocations because the commit embeds a timestamp. Verified both.

---

## D9 · Review's read-only property is enforced, not requested

**Decision.** The controller compares the change revision before and after a review turn. If it moved,
the review is rejected with `reviewer_mutated_worktree`.

**Why.** A reviewer needs file-write permission to produce `review.json`, so a read-only CLI sandbox
cannot be the guarantee. A hash comparison is a fact; a prompt instruction is a hope.

**Rejected.** Trusting the sandbox mode. Codex `--sandbox read-only` would block the artifact write, and
Claude's plan mode likewise cannot write the file.

---

## D10 · The controller normalises the review verdict

**Decision.** `approved` requires `verdict === 'approved'` **and** zero blocking findings. Any other
combination becomes `changes_requested`.

**Why.** Fail closed. A model that writes "approved" alongside a blocking finding has contradicted
itself, and the safe reading of a contradiction is the conservative one.

**Rejected.** Taking the stated verdict at face value; asking a second agent to adjudicate (that is
fan-out, deferred by D4).

---

## D11 · Publish is deterministic and gated

**Decision.** commit → push → query-then-create/update, argv only, behind an approval gate, keyed by
`<runId>:<changeRevision>`. An agent may draft the PR body text and nothing else.

**Why.** Git and PR effects need idempotency and precise evidence, which is deterministic-adapter work.
The probe also produced a concrete trap: `gh pr list --head X --json number` defaults to **open PRs
only**, so a previously merged branch reads as "no PR" and a naive implementation would open a duplicate.
`--state all` is mandatory, and `gh pr view` is the wrong probe because it exits non-zero when no PR
exists — indistinguishable from a real failure.

**Rejected.** Letting an agent run the git commands. It cannot offer idempotency, and its self-report is
not evidence of what happened.

---

## D12 · Component ids are stable strings; terminal keys are attempt ids

**Decision.** Component ids are `intake|plan|build|verify|review|publish`. The key used for the shared
terminal registry is the full attempt id.

**Why.** Two collision paths, both real. `CanvasNode` derives a CSS class from the id, and
`SessionCanvas.css` already styles `.canvas-node-terminal|note|context|changes|turn` — the chosen ids
avoid all five. And Columbus keys imported-session terminals by _session id_, so importing one session
into both boards would share a tmux session and a port; an attempt id cannot collide with a Columbus node
id.

**Rejected.** UUID component ids (they would make prompts, paths, and event logs unreadable);
session-id-keyed terminals (the collision above).

---

## D13 · The gate is a state of Publish, not a card

**Decision.** Approval renders inside the Publish card when it is `awaiting_approval`.

**Why.** A seventh card that exists only to hold two buttons adds board noise without adding
information. The gate's own state machine is unchanged — it is still a first-class control boundary with
durable `gate_opened` / `gate_decided` events; only its rendering is folded in.

**Rejected.** A dedicated gate node, as drawn in the design doc's default board. That diagram is about
control-flow semantics, which we keep; it is not a layout requirement.

---

## D14 · Domain logic lives server-side, in pure modules

**Decision.** Board normalisation, prompt assembly, artifact validation, the scheduler transition
function, argv builders, and revision capture all live in `vite/dagama/*.ts`. React renders and calls the
API.

**Why.** The test setup has no DOM environment and no testing-library, so anything in a component or
touching `localStorage` is untestable as configured. Putting the logic where it can be unit-tested is the
difference between "robust" and "asserted to be robust". It also means the same code produces the run
dialog's preview and the actual execution, so they cannot drift.

**Rejected.** Client-side orchestration with the server as a thin spawner — the Columbus shape. It cannot
survive a page reload, and it is exactly what the design doc rules out.

---

## D15 · The run root is a clone, not a git worktree

**Decision.** `git clone --local --no-hardlinks <toplevel> <runRoot>`, with the remote URL captured at
preflight and re-pointed afterwards. Not `git worktree add`.

**Why.** The original design's central safety promise — "a run never mutates the user's active worktree"
— was the wrong invariant, and the obvious implementation did not even deliver it. A linked worktree
shares `config`, `hooks/`, `refs/`, `objects/`, and the worktree registry with every other worktree of
the repository. Measured on this machine: a `git config` value written from a run worktree was readable
from the user's checkout, `git worktree list` inside the run enumerated the user's checkouts, and a
branch created in the run appeared in the user's repository. From there, a hostile instruction reaching
the model gets `core.hooksPath` (code execution on the user's next commit), `credential.helper` (the
`gh` token), `update-ref` on a branch the user has checked out, or `git worktree remove --force` on the
user's working directory including its uncommitted files.

The same measurement against a clone: config not visible, branches not visible, `worktree list` shows
only itself, `--git-common-dir` is its own `.git`.

This project is itself a linked worktree, so none of the above is hypothetical.

A second, independent reason: under Codex's `-s workspace-write`, a worktree's gitdir lives _outside_
the workspace, so every writing git command an agent runs fails. In a clone the gitdir is inside the run
root, so the sandbox becomes a real boundary that still permits normal git work.

**Rejected.**

- _`git worktree add`._ Does not isolate. Would require snapshotting and re-verifying the entire shared
  git state after every attempt to detect tampering — more machinery, weaker guarantee.
- _`git clone --local` with hardlinks (the default)._ Object files share inodes, so an agent that
  rewrites one corrupts the user's repository. The disk and time cost of copying is the price of the
  boundary.
- _Cloning from the remote._ Slower, requires network, and would not reflect uncommitted local base
  state.

---

## D16 · A board file is untrusted input, validated server-side

**Decision.** Model, effort, permission, base branch, and check argv are validated against allowlists at
the API boundary, rejecting rather than coercing. `argv[0]` is restricted to a build-tool allowlist and
never a shell interpreter.

**Why.** A board is a JSON file in a project directory. It can be hand-edited, committed, shared, or
arrive in a pull request. Two escalation paths need no shell metacharacter at all: `"permission":
"bypassPermissions"` reaches `--permission-mode` directly, and `argv: ["/bin/sh","-c","curl … | sh"]`
makes "no shell string interpolation" irrelevant because `argv[0]` _is_ the shell. Client-side dropdowns
constrain the UI, not the file.

Validation therefore runs in three places, and that redundancy is intentional: the client normalizer for
a good editing experience, the API boundary because that is the trust boundary, and again at launcher
assembly because that is where a value becomes a command.

**Rejected.** Relying on shell quoting — orthogonal to this class of attack. Relying on the client
allowlist — it is a dropdown, not a gate. Allowing `sh -c` in checks with a warning — a warning on a
board you did not write is not consent.

---

## D17 · Ship the gaps in writing

**Decision.** [02-architecture.md §10](./02-architecture.md#10-threat-model-what-is-and-is-not-enforced)
states what is enforced and what is not, including that a Claude seat has the developer's full
privileges because Claude Code 2.1.220 has no sandbox flag.

**Why.** The first draft of this design asserted two boundaries it did not have: that sibling directories
keep agents out of the control plane, and that the run worktree is where safety comes from. Both read as
reassuring and neither was true. A design document that claims a boundary it lacks is worse than one that
admits the gap, because it stops anyone from looking. The honest formulation — the run record is
authoritative against crashes and advisory against a compromised seat — is what lets a reader decide
whether that is acceptable for their repository.

**Rejected.** Blocking v1 on `sandbox-exec` for Claude seats. It is the right eventual answer and is
listed as such; gating a local developer tool on it, while Codex seats already have an OS-enforced
sandbox and the git boundary is now real, would trade a shipped product for a marginal improvement in a
threat model the user can also mitigate by choosing Codex.
