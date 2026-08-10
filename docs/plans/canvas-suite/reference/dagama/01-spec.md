# 01 · Product spec

## 1. Scope

A DaGama **board** is a reusable workflow definition saved per project. A **run** is one immutable
execution of a board snapshot. v1 ships one board shape — the six-component default — with per-component
configuration but no graph editing.

| Layer                  | What it is                                                    | Lifetime                        |
| ---------------------- | ------------------------------------------------------------- | ------------------------------- |
| **Board definition**   | Components, their config, prompts, checks, policies           | Edited and reused across runs   |
| **Run**                | Board snapshot + resolved inputs + execution profile          | One end-to-end execution        |
| **Component instance** | One component's state inside a run; recurs in the repair loop | Bounded repetition              |
| **Seat attempt**       | One agent process or command invocation                       | Immutable; a retry is a new one |
| **Artifact**           | A validated file passed between components                    | Immutable once promoted         |

A component is the user's unit of control and completion. A seat attempt is the scheduler's unit of
execution and recovery. This is why a failed attempt can be retried without discarding a component's
already-validated outputs.

## 2. The six components

Each entry gives the execution type, the declared inputs, the required outputs, and the exact condition
under which the controller calls the component successful.

### 0 · Intake — connector, no seat

- **Inputs** — run inputs: `source.kind` ∈ {`text`, `file`}, plus the payload (typed text, or an
  absolute path to a UTF-8 text/markdown file under 1 MiB).
- **Outputs** — `SOURCE.md` (verbatim snapshot), `source.json` (provenance), `PROBLEM.md`.
- **Behaviour** — deterministic. `PROBLEM.md` is rendered from a template: title, provenance header,
  then the source body inside an explicit untrusted-data fence. Nothing is summarised or invented.
- **Success** — all three files written and validated. No model involved, so there is no failure mode
  other than an unreadable source.

> v1 has no normalizer seat. The run dialog already asks the user for a problem statement, which is a
> cheaper and more predictable way to resolve ambiguity than a normalizer turn. See
> [06-decisions.md#d3](./06-decisions.md#d3--intake-is-deterministic-in-v1).

### 1 · Plan — agent seat ×1

- **Inputs** — `PROBLEM.md` (primary), `SOURCE.md` (reference).
- **Outputs** — `PLAN.md` (required).
- **Success** — attempt exited 0 **and** `PLAN.md` exists, is non-empty, and is under the size cap.
- **Notes** — the seat writes into its own output directory inside the run worktree. It is not
  prevented from reading the repository; that is the point of a planner.

### 2 · Build — agent seat ×1

- **Inputs** — `PLAN.md`; on a repair round, additionally `verification.json` and/or `review.json`.
- **Outputs** — `IMPLEMENTATION.md` (agent, required); `CHANGESET.patch` and `change.json`
  (**controller-captured**, never agent-reported).
- **Success** — attempt exited 0, `IMPLEMENTATION.md` validated, and the controller captured a change
  revision. A build that changed nothing is a failure with the reason `no_change_captured`, not a pass.
- **Notes** — the same provider session is resumed across repair rounds so the worker keeps its
  context, but every round produces a new component instance and a new change revision.

### 3 · Verify — command seat, no model

- **Inputs** — the current change revision.
- **Config** — an ordered list of checks, each `{ name, argv[] }`, from the board. Argv only; never a
  shell string. Empty list is legal and yields verdict `skipped`.
- **Outputs** — `verification.json`, plus one log file per check.
- **Success** — every configured check ran to completion. The **verdict** is separate from success:
  `passed` when all exit codes are 0, otherwise `failed`.
- **Routing** — `failed` returns control to Build with `verification.json` as input.

### 4 · Review — agent seat ×1

- **Inputs** — `PROBLEM.md`, `PLAN.md`, `CHANGESET.patch`, `verification.json`.
- **Outputs** — `REVIEW.md` (prose, required) and `review.json` (typed, required).
- **Success** — attempt exited 0, `review.json` parses against its schema, and the controller's
  before/after patch hashes for the turn are **identical**. A reviewer that modified project files
  invalidates its own review; the component fails with `reviewer_mutated_worktree`.
- **Verdict normalisation** — the controller, not the agent, decides the effective verdict:
  `approved` requires `verdict === 'approved'` **and** zero `blocking` findings. Anything else is
  `changes_requested`. Fail closed.
- **Routing** — `changes_requested` returns to Build. Two repair rounds are allowed after the first
  implementation; exhaustion opens a human gate rather than publishing the last attempt.

### 5 · Publish — external action, gated, no model

- **Gate** — an explicit approval gate precedes this component. Its decision is a durable event.
- **Preflight**, all required:
  1. the current worktree patch hash equals the approved `changeRevision`'s hash;
  2. verification for that revision has verdict `passed` (or `skipped` when no checks are configured);
  3. the target branch SHA is unchanged since the recorded integration point;
  4. no path under `.fleetlog/` is staged or untracked-and-unignored;
  5. the run branch exists and its worktree is the one the controller created.
- **Actions** — `git commit`, `git push`, then create or update exactly one PR, querying for an
  existing PR on the head branch first.
- **Outputs** — `publication.json`.
- **Failure on drift** — if the target moved and integration would change project files, control
  returns to Build; the new revision must pass Verify and Review again. Conflict resolution never
  happens inside Publish.

## 3. Artifact schemas

Every schema carries `schemaVersion`. An unknown version fails validation rather than being coerced.
Controller-owned fields are marked **[C]** — an agent that writes them has its value discarded, because
self-reported provenance is not evidence.

```jsonc
// source.json
{ "schemaVersion": 1, "kind": "text" | "file", "title": "…", "path": "/abs/path" | null,
  "bytes": 1234, "sha256": "…", "capturedAt": "2026-07-29T…Z" }                          // all [C]

// change.json
{ "schemaVersion": 1, "changeRevision": 1, "baseSha": "…", "patchSha256": "…",            // all [C]
  "changedFiles": [{ "path": "src/a.ts", "status": "A" | "M" | "D" }],
  "insertions": 42, "deletions": 3, "capturedAt": "…Z" }

// verification.json
{ "schemaVersion": 1, "changeRevision": 1, "patchSha256": "…",                            // [C]
  "verdict": "passed" | "failed" | "skipped",                                             // [C]
  "checks": [{ "name": "typecheck", "argv": ["npm", "run", "typecheck"], "cwd": "…",
               "exitCode": 0, "durationMs": 8123, "logPath": "…", "truncated": false }],
  "startedAt": "…Z", "finishedAt": "…Z" }

// review.json — the agent writes verdict/findings/summary; the controller adds the rest
{ "schemaVersion": 1,
  "verdict": "approved" | "changes_requested",
  "summary": "…",
  "findings": [{ "severity": "blocking" | "advisory", "file": "src/a.ts" | null,
                 "line": 12 | null, "summary": "…", "detail": "…" }],
  "changeRevision": 1, "patchSha256": "…", "effectiveVerdict": "changes_requested",        // [C]
  "seatId": "review-1", "attempt": 1 }                                                     // [C]

// publication.json
{ "schemaVersion": 1, "changeRevision": 1, "commitSha": "…", "branch": "dagama/run-…",     // all [C]
  "remote": "origin", "prUrl": "https://…" | null, "prNumber": 7 | null,
  "action": "created" | "updated" | "existing", "idempotencyKey": "…", "publishedAt": "…Z" }
```

### Artifact envelope

Each promoted artifact appends one line to `artifacts/manifest.jsonl`:

```jsonc
{
  "schemaVersion": 1,
  "artifactId": "uuid",
  "kind": "plan",
  "path": "promoted/<artifactId>/PLAN.md",
  "sha256": "…",
  "bytes": 4096,
  "inputRevision": 1,
  "createdAt": "…Z",
  "producer": {
    "componentId": "plan",
    "instance": 1,
    "seatId": "plan-1",
    "attempt": 1,
  },
}
```

Agents write **candidates** into their own attempt output directory. They never write the manifest and
never promote their own result. Promotion rejects: symlinks anywhere in the path, any component
resolving outside the attempt output directory, files over the per-kind size cap, invalid UTF-8, and
JSON that fails its schema.

## 4. Lifecycle states

```text
seat attempt   queued → preparing → running ─┬→ succeeded
                                             ├→ needs_input → running
                                             ├→ failed
                                             ├→ timed_out
                                             ├→ canceled
                                             └→ taken_over

component      blocked → ready → running → validating ─┬→ succeeded
                                                       ├→ awaiting_approval → succeeded | failed
                                                       └→ failed

ownership      automated ⇄ takeover_requested → human_controlled → handback_pending → automated

run            preparing → running ⇄ awaiting_approval → succeeded | failed | canceled
```

Ownership is orthogonal to execution state. A `human_controlled` seat never auto-advances, and handback
runs the same artifact and revision validation an automated completion does.

`blocked_by_gate`, `waiting_for_repair`, and `blocked_by_drift` are reasons attached to a component in
`awaiting_approval` or `blocked` — not separate states. The card shows the reason string; the state
machine stays small.

## 5. Limits

| Limit                              | v1 default                     | Where configured     |
| ---------------------------------- | ------------------------------ | -------------------- |
| Repair rounds after first build    | 2                              | board                |
| Seat attempt wall-clock timeout    | 30 min                         | board, per component |
| Automatic retries per seat attempt | 1, infrastructure failure only | fixed                |
| Prompt size per attempt            | 128 KiB                        | fixed                |
| Markdown artifact size             | 1 MiB                          | fixed                |
| JSON artifact size                 | 256 KiB                        | fixed                |
| Patch size                         | 8 MiB                          | fixed                |
| Per-check log capture              | 1 MiB, head+tail               | fixed                |

Semantic failure never auto-retries with the same prompt. Infrastructure failure (provider CLI missing,
port exhaustion, tmux failure) may retry once.

## 6. v1 definition of done

1. A board can be saved to a project and started from typed text or a local markdown file.
2. The run creates its own git worktree and the user's active worktree is provably untouched.
3. Intake → Plan → Build → Verify → Review advances with no manual copying.
4. Every seat exposes its real CLI; the user can open it, take control, prompt it, and hand it back.
5. Handback revalidates the component before any downstream work runs.
6. Review approval is pinned to one revision; the repair loop is bounded; a missing or malformed
   outcome fails closed.
7. A human gate precedes Publish.
8. Publish opens at most one PR per run and is safe to retry.
9. A page reload or a dev-server restart neither loses the run nor launches duplicate work.
10. The user can inspect the exact prompt, artifacts, attempts, exit records, and transitions.
11. Cancel and takeover preserve partial work and leave the run in an explicit state.
