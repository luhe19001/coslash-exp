# 05 · Build plan

Seven milestones. Each one is independently demoable, ends with the suite green, and leaves Columbus
working. Ordering is by risk retired per unit of code written — the load-bearing contracts come before
any UI that depends on them.

## Status

| Milestone                        | State                                                            |
| -------------------------------- | ---------------------------------------------------------------- |
| M0 · Share the terminal registry | **done**                                                         |
| M1 · The board                   | **done** — board model, storage, policy gate, canvas, tab wiring |
| M2 · Run skeleton                | **done** — event log, clone, revision capture, Intake, run UI    |
| M3 · One agent seat end to end   | **done** — Plan seat, exit.json protocol, promote PLAN.md, live ttyd |
| M4 · Build, Verify, repair loop  | **done** — Build seat, revision capture, Verify, repair/exhaustion |
| M5 · Review, gate, Publish       | **done** — Review seat, verdict normalisation, Publish gate + PR |
| M6 · Restart, takeover, cancel   | **done** — reconcile, cancel snapshot+kill, takeover/handback     |

Baseline before this work: 21 test files / 196 tests. After M0–M1: 24 files / 264 tests. After M2: 28
files / 377 tests, `tsc -b` clean, `oxlint` clean, production build clean.

Two things landed that were not in the original plan, both from the adversarial review:

- `vite/dagama/board-policy.ts` — the server-side allowlist gate
  ([D16](./06-decisions.md#d16--a-board-file-is-untrusted-input-validated-server-side)).
- `src/pages/fleetlog/lib/dagama-vocabulary.ts` — an import-free module so the client normalizer and the
  server gate share one allowlist instead of two that drift.

M2's git work also changed shape: the run root is a **clone**, not a worktree
([D15](./06-decisions.md#d15--the-run-root-is-a-clone-not-a-git-worktree)).

---

## M0 · Share the terminal registry

**Work.** Extract the module-level `terminals` map and `spawnEmbeddedAgent` from `vite.config.ts` into
`vite/terminal-registry.ts`. Repoint `terminalPlugin()` and `agentPlugin()` at the singleton.

**Why first.** Port allocation excludes ports held by live entries. Two registries means two exclude sets
and two boards racing onto one port. Doing this extraction before DaGama exists keeps it a pure
refactor with no new behaviour to debug.

**Demo.** Nothing user-visible. `npm test` green, `tsc -b` clean, Columbus launches an agent as before.

---

## M1 · The board

**Work.**

- `vite/dagama/board-store.ts` — `.fleetlog/dagama/boards`, `/api/dagama/*`, atomic write, revision
  conflicts. Structurally the Columbus store with a new directory, prefix, and schema discriminant.
- `lib/dagama-board.ts` — board schema, the six component defaults, normalisation.
- `lib/dagama-boards.ts` + `hooks/use-dagama-boards.ts` — client and autosave, repointed keys.
- `components/DaGamaCanvas.tsx` + `.css` — the fixed six-card rail, derived wires, toolbar, and each
  card's configuration state.
- Tab wiring: both `FleetlogTabMenus` edits, both `FleetlogPage` `immersive` expressions.

**Demo.** Open the DaGama tab, see six cards wired in a line, set Plan's vendor and model and Verify's
checks, save the board, reload, reopen it.

**Exit criteria.** A DaGama board round-trips through the project directory. Switching between the
Columbus and DaGama tabs repeatedly leaves both boards intact — the localStorage collision test.

---

## M2 · Run skeleton — worktree, Intake, durability

**Work.**

- `vite/dagama/git.ts` — preflight, the run-root **clone**, teardown, temp-index revision capture with
  `GIT_CONFIG_GLOBAL/SYSTEM=/dev/null`, tree-OID anchoring, the self-ignoring exchange directory.
- `vite/dagama/run-store.ts` — directory layout, `events.jsonl` append, `run.json` materialisation and
  rebuild-from-log.
- `vite/dagama/intake.ts` — `SOURCE.md`, `source.json`, `PROBLEM.md`.
- `POST /api/dagama/runs`, `GET /api/dagama/runs`, `GET /api/dagama/runs/:id`.
- Run dialog, run chip, run list, Intake card body.

**Demo.** Press **Run workflow**, watch a worktree appear at the previewed path, see Intake's three
artifacts linked from its card, then reload the page and find the run still there.

**Exit criteria.** `run.json` deleted by hand rebuilds identically from `events.jsonl`. The user's
worktree is byte-identical before and after — assert on `git status --porcelain` and the index hash.

**Delivered.** Both exit criteria hold, in the suite and against a live dev server. What shipped:

- `vite/dagama/run-store.ts` — `events.jsonl` as the authority with a pure total `reduce()`, `run.json`
  as a rebuildable view, gapless-seq enforcement, and torn-tail truncation.
- `vite/dagama/git.ts` — preflight, the `--local --no-hardlinks` clone, the self-ignoring exchange
  directory verified with `check-ignore`, and temp-index revision capture with tree-OID anchoring.
- `vite/dagama/intake.ts` — the three artifacts, strict UTF-8, and the untrusted-source fence.
- `vite/dagama/runs.ts` + routes on the existing `/api/dagama` middleware.
- `hooks/use-dagama-runs.ts`, `RunDialog`, `RunChip`, `ArtifactDialog`, and run state on each card.

Two things changed shape from the plan:

- **`captureRevision` landed in M2, not M4.** It is the module the non-mutation exit criterion is
  actually asserted against, so building it here is what made that criterion testable at all. M4
  inherits a proven capture instead of writing one under a deadline.
- **An extraction preceded the work**: `errors.ts` and `fs-safety.ts` now hold the atomic write,
  fsync, and symlink-refusing directory walk that the board store had inline, so the run store shares
  one implementation rather than a second copy.

One durability bug was found by writing the torn-line test rather than by review: appending after a
crash-torn final line concatenated onto it, destroying both records. The parser now reports how many
bytes are trustworthy and the store truncates the tail before appending — an event is durable only
once its terminating newline is on disk.

---

## M3 · One agent seat, end to end

The riskiest milestone. Everything after it is repetition of a proven shape.

**Work.**

- `vite/dagama/adapters.ts` — per-vendor argv and the launcher script; Codex thread-id extraction from
  the structured stream.
- `vite/dagama/prompt.ts` — layered assembly, untrusted-data fencing, snapshot to disk.
- `vite/dagama/artifacts.ts` — validation (schema, size, encoding, symlink, traversal) and promotion with
  the manifest append.
- `vite/dagama/controller.ts` — the transition function plus the exit-record watcher, driving one
  component.
- Plan card: live CLI, prompt viewer, artifact chips, Retry.

**Demo.** Press Run → Plan launches a real Claude turn visible in the card → `PLAN.md` is promoted and
linked. Reload the browser mid-turn; the card reconnects to the same live terminal.

**Exit criteria.** The controller distinguishes running, succeeded, failed, timed out, and cancelled
without consulting terminal liveness. An agent that exits 0 without writing `PLAN.md` fails with
`missing_output`.

---

## M4 · Build, Verify, and the repair loop

**Work.** Build seat with controller-captured revision; the Verify command runner and
`verification.json`; the Verify → Build repair edge with the round bound and the exhaustion gate.

**Demo.** A real code change lands in the run worktree, `npm run typecheck` runs against it, and a
deliberate failure loops back to Build exactly once before pausing for a decision.

**Exit criteria.** Every revision is a fresh component instance with a distinct tree OID. A Build that
changes nothing fails with `no_change_captured`.

**Done.** Shared seat launch/watch extracted from Plan; `BuildSeatController` promotes
`IMPLEMENTATION.md` and captures `CHANGESET.patch` / `change.json` via `captureRevision` +
`change_captured`; empty diffs fail `no_change_captured`. `VerifyRunner` execs board checks
(`shell: false`), writes `verification.json` with verdict `passed` / `failed` / `skipped`. Pipeline
advances Plan → Build → Verify → Review ready; Verify fail repairs Build up to
`DAGAMA_MAX_REPAIR_ROUNDS` (2) then `gate_opened` / `waiting_for_repair`. UI: Build reuses the agent
seat pane; Verify shows a results strip.

---

## M5 · Review, gate, Publish

**Work.** Review seat with `review.json` validation, verdict normalisation, and the reviewer-mutation
guard; the approval gate inside the Publish card; the publish adapter with query-then-create.

**Demo.** A reviewed change reaches the gate showing its preflight checklist; approving opens exactly one
PR. Approving twice, or replaying the publish event, still yields one PR.

**Exit criteria.** Publish refuses when the revision is stale, when verification did not pass for that
revision, when the target moved, or when a `.fleetlog` path would be committed.

**Delivered.** Review reuses `SeatControllerBase` (`review-1`); prompts fence PROBLEM/PLAN/CHANGESET/
verification; success promotes `REVIEW.md` + controller-normalised `review.json` (fail-closed
effective verdict) and enforces the before/after tree-OID mutation guard (`.fleetlog` excluded so
seat out-dir writes do not false-positive). `changes_requested` repairs Build under the same
`DAGAMA_MAX_REPAIR_ROUNDS` bound; `approved` opens the Publish gate (`gate_opened` /
`awaiting_approval`). Publish preflight checklist + `gate_decided` → commit/push/`gh pr list` then
create-or-update one PR (`idempotencyKey = runId:changeRevision`). UI: Review on `AgentSeatPane`;
Publish card shows the gate checklist and Approve & publish.

---

## M6 · Restart, takeover, cancel

**Work.** Reconciliation on controller start; `unknown_after_restart` for attempts it cannot classify;
takeover and handback as recorded attempts; cancel with a patch snapshot taken first.

**Demo.** Kill the dev server mid-turn and restart it: the finished turn is picked up from its exit
record, nothing is launched twice, and an ambiguous attempt asks the user instead of guessing.

**Exit criteria.** The v1 definition of done in [01-spec.md](./01-spec.md#6-v1-definition-of-done) holds
in full.

**Done.** `reconcile.ts` + `runs.reconcileProject` (lazy once-per-project from `plugin.ts`); board reload
from `board.snapshot.json`; Cancel (`cancel_requested` → snapshot → kill → `run_finished` canceled);
Takeover / Handback (interactive launcher, `human_controlled`, same `onExit` validation on handback);
seat footer controls on `AgentSeatPane`.

---

## Testing strategy per milestone

Everything listed under `vite/dagama/` is a pure or filesystem-only module with a `.test.ts` beside it,
runnable in the existing node environment. The React layer has no test coverage by construction — there
is no DOM environment — which is the reason the domain logic is not in React.

The four tests that matter most, because they encode invariants rather than behaviour:

1. **Non-mutation.** Capturing a revision leaves `$GIT_DIR/index` byte-identical and `git status`
   unchanged in a fixture worktree with a deliberate staged/unstaged split.
2. **Fail closed.** Exit 0 with a missing or malformed required artifact produces a component failure, and
   `approved` alongside a blocking finding normalises to `changes_requested`.
3. **Rebuildability.** A `run.json` deleted mid-run reconstructs from `events.jsonl` with identical state.
4. **Escape resistance.** Promotion rejects a symlink, a `..` traversal, an oversized file, and invalid
   UTF-8 in an artifact path or body.
