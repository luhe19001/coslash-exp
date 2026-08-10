# 07 · Open questions

Things deliberately unresolved, each with the spike that settles it. A question here is not a gap in the
plan; it is a decision that should be made with evidence rather than argument.

## 1. Required before v1 ships

### 1.1 Does Claude's `acceptEdits` ever block in print mode?

The whole exit protocol assumes a bounded turn terminates. Claude has **no sandbox flag**, and the CLI
probe could not exercise a live tool-permission prompt without spending tokens, so "`acceptEdits` never
hangs on a non-edit tool" is currently an assumption.

**Spike.** Run one real `-p` turn per permission mode against a scratch repo with a prompt that forces a
Bash tool call, and record whether `exit.json` appears. Ten minutes and a few cents.

**Until then.** The wall-clock watchdog in the launcher is the mitigation, and a hang surfaces as
`timed_out` with the pane open rather than as a silent stall. If the spike shows blocking, the fallback
is `--disallowedTools` for the tools a component does not need.

### 1.2 Do the three inherited dev-server exposures get fixed now or noted?

**Resolved for two of three, in M2.** None were introduced by DaGama; all three affected Columbus and
DaGama inherited them.

| Exposure                                                            | State                                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| No `/api` route checks `Origin` / `Sec-Fetch-Site` / `Content-Type` | **fixed** — `vite/api-guard.ts`, registered before every plugin  |
| `/api/render` passes raw HTML through `marked`, served same-origin  | **fixed** — markdown-only renderer plus a restrictive CSP        |
| `ttyd` panes have no origin check and no secret path                | **open** — needs `-O` and `-b /<random>`, and an embed re-verify |

The render route mattered most, because a run deliberately routes untrusted source text and
agent-authored markdown through it. Two independent layers now apply:

- `marked`'s `html`, `link`, and `image` hooks are overridden, so embedded HTML is escaped and only
  recognised URL schemes survive. `sanitize` was removed from `marked` in v5, and passing `renderer` in
  the parse options **replaces** the default renderer rather than extending it — `use()` is the merging
  form, and getting this wrong silently strips every other rule, headings included.
- `Content-Security-Policy: default-src 'none'; … sandbox`, which is what holds if the renderer ever
  regresses. `sandbox` is the load-bearing token: it puts the document in a unique origin with scripting
  disabled, which is also what makes the verbatim-HTML branch of that route safe.

The API guard checks `Sec-Fetch-Site` **and** requires `application/json` on state-changing methods.
Neither is redundant: a cross-origin `fetch` carrying a JSON content type is preflighted and CORS stops
it, but an HTML `<form>` can POST cross-origin with no preflight at all — it simply cannot set that
content type. Requiring JSON is what actually closes the form vector.

**`ttyd` remains open, deliberately.** The fix is two flags, but verifying it needs a browser to confirm
the pane still embeds once the origin check is on, and shipping it unverified risks breaking every
terminal in both canvases. Do it with the M3 seat work, where a live pane is already being exercised.

## 2. Answer with the first real runs

**Verify command discovery.** v1 ships an empty check list, so Verify reports `skipped` until configured.
Reading `package.json` scripts and offering them would be a nice affordance, but only after we know which
checks people actually configure. Watch what the first ten boards contain.

**Repair bound.** Two rounds is a guess informed by the design doc. Measure rounds-to-approval and move
it if the data disagrees.

**Prompt size.** Artifacts are passed by path plus a focused excerpt. The excerpt policy — how much of
`CHANGESET.patch` a reviewer sees inline before it becomes a path — is unset. Measure real patch sizes
first.

**Whether Intake needs a normalizer seat.** [D3](./06-decisions.md#d3--intake-is-deterministic-in-v1)
says no, on the theory that the run dialog is a better place to resolve ambiguity. That holds only while
the source is typed by the user. It stops holding the moment a ticket connector lands.

## 3. Deferred features, with the trigger that revives each

| Feature                                  | Revive when                                                             |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| Two-seat planning + arbiter              | the single-seat pipeline reaches approved changes reliably              |
| Two-seat review with an all-approve join | reviewer disagreement is observable and someone wants it                |
| Partitioned / bake-off Build             | per-seat run roots exist and someone has a ticket that needs them       |
| Linear / Jira Intake connectors          | typed text is demonstrably the bottleneck                               |
| Generic component builder                | at least two non-feature workflows have been validated with the presets |
| Run cost budgets                         | a run has actually cost more than someone expected                      |
| `sandbox-exec` for Claude seats          | before any use where the repository is not fully trusted                |

## 4. Known inaccuracies elsewhere in the codebase

Found while building DaGama; neither is DaGama's to fix, both are worth recording.

**`agent-options.ts` effort tables are slightly wrong.** `codex debug models` reports that `gpt-5.6-sol`
supports `ultra`, but the shared table omits it. DaGama carries its own verified vocabulary rather than
editing a table Columbus depends on. Worth correcting in place at some point.

**Columbus's Codex session discovery can double-claim.** `matchColumbusAgentSessions` builds its claimed
set from only the terminals it is passed, so two boards polling with unresolved Codex terminals in the
same directory can both bind the same rollout. DaGama avoids the whole mechanism by reading the thread id
out of the structured stream, so this is a Columbus-only limitation — recorded in
[04-fork-map.md](./04-fork-map.md#35-terminal-identity).

## 5. Reviews that did not complete

The adversarial review that produced [D15](./06-decisions.md#d15--the-run-root-is-a-clone-not-a-git-worktree)
was one of three. The **durability/restart** and **simplicity/scope** reviews did not finish, so their
findings are absent from this plan.

That matters for two areas in particular, which should be re-reviewed before M6:

- the exact ordering window between `attempt_launch_requested` and the spawn, and what reconciliation
  does with a tmux session it did not observe start;
- whether the six-component board is the right first cut, or whether a shorter pipeline would reach a
  useful demo sooner.

The security review already flagged several durability-adjacent issues that have been folded in: the
per-run `O_EXCL` lock before reconciliation or any external effect, a pre-existing `exit.json` at launch
being a hard failure, and an `exit.json` with no matching `attempt_launched` being treated as forged or
stale rather than as success.
