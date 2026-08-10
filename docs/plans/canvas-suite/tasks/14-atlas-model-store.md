# Task 14 — Atlas Model, Graph, Policy, and Store

## Objective

Create Atlas Canvas's durable graph, committee, policy, run model, and deterministic storage layer.

## Automatic status and reporting

Canonical dashboard record: [`../task-status/14.js`](../task-status/14.js). The assigned agent must follow [`../AUTOMATION.md`](../AUTOMATION.md) and update the sidecar plus this brief at claim, start, every material checkpoint/test, block, review handoff, and review outcome. Do not ask the human to re-enter status.

## Status schema and current record

This record is the task's pickup lock and current truth. The master changes `readiness` to `ready`; the claiming agent immediately records its identity, branch, and UTC timestamps. Update it at every state change and before every handoff. Never claim a task already in `claimed`, `in_progress`, or `review`.

```yaml
task_id: "14"
state: review # untouched | claimed | in_progress | blocked | review | changes_requested | complete | deferred
readiness: ready # blocked | ready
status_reason: "Independent review fixes and verification are complete at a3c85e5de8f4036c157ed320e0b0a3df7b1b6925; approved locally and ready for dependency-ordered integration."
pickup_condition: "Tasks 00, 03, and 05 are complete and merged into the assigned base SHA."
agent:
  id: codex-root-master-task-14
  runtime: Codex coding agent acting as master
  claimed_at_utc: "2026-08-09T02:17:04Z"
  started_at_utc: "2026-08-09T02:17:04Z"
  completed_at_utc: "2026-08-09T02:24:43Z"
branch: claude/canvas-task-14-atlas-model
worktree: /Users/helu/code/product/coslash-task-14
base_sha: 94fe07cad85773683898781ed62cd4f69ae27d75
result_sha: a3c85e5de8f4036c157ed320e0b0a3df7b1b6925
dependencies:
  required: ["00", "03", "05"]
  satisfied: ["00", "03", "05"] # satisfied at review; final integration still requires the master's merge
blockers: []
current_focus: "Dependency-ordered integration handoff."
next_action: "Merge result a3c85e5 into hlu/canvas-migration and rerun proportionate integration gates before marking complete."
last_updated_at_utc: "2026-08-09T04:03:34Z"
last_updated_by: codex-root-master-task-14
verification:
  state: passed # not_run | running | passed | failed | partial
  commands:
    - "cd collector && go test -race -count=3 ./internal/plugins/canvas/atlas/..."
    - "cd collector && go test -race ./..."
    - "cd collector && go vet ./..."
    - "cd collector && go test -cover ./internal/plugins/canvas/atlas/..."
    - "gofmt/diff/ancestry/ownership/clean-worktree audits"
review:
  reviewer: codex-root-task-14-review
  reviewed_at_utc: "2026-08-09T04:03:34Z"
  outcome: approved # approved | changes_requested | rejected
post_implementation:
  remaining_work: []
  improvements: []
  known_issues: []
  follow_up_tasks: []
```

## Progress-reporting schema

Append one entry below for each material checkpoint, blocker, resumed turn, test result, review response, and handoff. Do not rewrite earlier entries. Send the same entry to the master so `STATUS.md`, `REPORTS.md`, `ISSUES.md`, and `DECISIONS.md` stay synchronized.

```yaml
- update_id: "14-YYYYMMDDTHHMMSSZ-NN"
  at_utc: "YYYY-MM-DDTHH:MM:SSZ"
  agent_id: "coding-agent-id"
  state_from: untouched
  state_to: in_progress
  summary: "What changed and why"
  work_completed: []
  files_changed: []
  tests:
    - command: "exact command"
      result: passed # passed | failed | partial | not_run
      evidence: "output, log, or artifact location"
  decisions: []
  contract_deviations: []
  issues:
    - id: null
      severity: null # P0 | P1 | P2 | P3
      status: null # open | mitigated | resolved
      summary: null
      owner: null
  blockers: []
  help_needed: []
  next_action: "Concrete next step"
```

### Progress reports

```yaml
- update_id: "14-20260809T021704Z-01"
  at_utc: "2026-08-09T02:17:04Z"
  agent_id: "codex-root-master-task-14"
  state_from: in_progress
  state_to: in_progress
  summary: "Operator directed a master takeover after the prior owner stopped reporting checkpoints. All inherited uncommitted Atlas work is preserved in the same isolated branch/worktree."
  work_completed:
    - "Reconciled the sidecar, task brief, central status, branch, worktree, and file timestamps."
    - "Transferred exclusive Task 14 ownership without switching branches or cleaning inherited files."
  files_changed: []
  tests: []
  decisions:
    - "Continue from the inherited worktree instead of discarding or duplicating the prior implementation."
  contract_deviations: []
  issues:
    - id: null
      severity: P2
      status: mitigated
      summary: "Prior Task 14 status reporting stopped while implementation continued."
      owner: codex-root-master-task-14
  blockers: []
  help_needed: []
  next_action: "Audit inherited implementation, repair gaps, and run the required race suite."
```

```yaml
- update_id: "14-20260809T022137Z-02"
  at_utc: "2026-08-09T02:21:37Z"
  agent_id: "codex-root-master-task-14"
  state_from: in_progress
  state_to: in_progress
  summary: "Completed the inherited-code audit, repaired correctness and concurrency gaps, and expanded the Task 14 verification matrix."
  work_completed:
    - "Preserved nested unknown fields and valid UTF-8 during normalization."
    - "Made event-log sequence authoritative over materialized run views."
    - "Serialized optimistic board writes and reclaimed board/run keyed locks."
    - "Rejected cross-project board snapshots and run-created events."
    - "Added v1/v2 migration, graph-policy, reducer, persistence, replay, corruption, symlink, and concurrent-write tests."
  files_changed:
    - "collector/internal/plugins/canvas/atlas/{graph,run,boardstore,runstore,keylock}.go"
    - "collector/internal/plugins/canvas/atlas/{migrate,reducer,store}_test.go"
  tests:
    - command: "cd collector && go test ./internal/plugins/canvas/atlas/..."
      result: passed
      evidence: "Expanded Atlas package suite passed."
    - command: "cd collector && go test -race -count=3 ./internal/plugins/canvas/atlas/..."
      result: passed
      evidence: "Three repeated race-enabled runs passed."
  decisions:
    - "Treat events.jsonl as authoritative on every read; run.json is accepted only at the same sequence."
    - "Use reference-counted keyed locks for compound read-check-write operations."
  contract_deviations: []
  issues: []
  blockers: []
  help_needed: []
  next_action: "Run full collector regression/vet and verify the final owned-path commit."
```

```yaml
- update_id: "14-20260809T022443Z-03"
  at_utc: "2026-08-09T02:24:43Z"
  agent_id: "codex-root-master-task-14"
  state_from: in_progress
  state_to: review
  summary: "Committed and verified the completed Atlas model/store result at 5159f52."
  work_completed:
    - "Verified 25 top-level tests, 64.3% statement coverage, and repeated race behavior."
    - "Ran full collector race and vet gates."
    - "Confirmed clean worktree, base ancestry, formatting, diff integrity, and Atlas-only ownership."
  files_changed:
    - "collector/internal/plugins/canvas/atlas/"
  tests:
    - command: "cd collector && go test -race -count=3 ./internal/plugins/canvas/atlas/..."
      result: passed
      evidence: "Three final race-enabled repetitions passed on 5159f52."
    - command: "cd collector && go test -race ./..."
      result: passed
      evidence: "Full collector race regression passed."
    - command: "cd collector && go vet ./..."
      result: passed
      evidence: "No findings."
    - command: "cd collector && go test -cover ./internal/plugins/canvas/atlas/..."
      result: passed
      evidence: "64.3% statement coverage."
  decisions:
    - "Coordinate compound writes across all Atlas store instances in one collector process."
  contract_deviations: []
  issues:
    - id: I-006
      severity: P3
      status: documented
      summary: "Compound compare-and-write locking is process-local; the supported topology has one collector owner per root."
      owner: master/task-18
  blockers: []
  help_needed: []
  next_action: "Independent master review and merge before marking Task 14 complete."
```

```yaml
- update_id: "14-20260809T040334Z-04"
  at_utc: "2026-08-09T04:03:34Z"
  agent_id: "codex-root-task-14-review"
  state_from: review
  state_to: review
  summary: "Independent review repaired seven persistence, transition-validation, ownership, and graph-identity gaps; result a3c85e5 is locally approved and remains in review until integration."
  work_completed:
    - "Made event replay authoritative over every materialized field, not only sequence and identity."
    - "Made pre-event run snapshots immutable and idempotent and validated snapshots on read."
    - "Rejected typed-nil, unsupported, cross-project, duplicate-role, overflowing, and colliding identities at the model/store boundary."
    - "Adopted bound project ownership for legacy board envelopes that predate projectId."
  files_changed:
    - "collector/internal/plugins/canvas/atlas/{boardstore,graph,policy,run,runstore}.go"
    - "collector/internal/plugins/canvas/atlas/{graph,migrate,reducer,store}_test.go"
  tests:
    - { command: "cd collector && go test -race -count=3 ./internal/plugins/canvas/atlas/...", result: passed, evidence: "Three repeated race-enabled runs passed." }
    - { command: "cd collector && go test -race ./...", result: passed, evidence: "Full collector race regression passed." }
    - { command: "cd collector && go vet ./...", result: passed, evidence: "No findings." }
    - { command: "cd collector && go test -cover ./internal/plugins/canvas/atlas/...", result: passed, evidence: "65.5% statement coverage." }
  decisions:
    - "A materialized view is reusable only when its complete typed state equals authoritative replay."
    - "Allocation retries may reuse byte-identical snapshots but cannot replace them."
  contract_deviations: []
  issues: []
  blockers: []
  help_needed: []
  next_action: "Merge a3c85e5 into hlu/canvas-migration in dependency order and rerun integration gates before marking complete."
```

## Worker report — review — updated 2026-08-09T04:03:34Z

```yaml
task_id: "14"
task_title: "Atlas model/store"
final_state: review
agent: { id: "codex-root-master-task-14", runtime: "Codex coding agent acting as master" }
timing:
  claimed_at_utc: "2026-08-09T02:17:04Z"
  started_at_utc: "2026-08-09T02:17:04Z"
  finished_at_utc: "2026-08-09T04:03:34Z"
  reported_at_utc: "2026-08-09T04:03:34Z"
git:
  branch: "claude/canvas-task-14-atlas-model"
  worktree: "/Users/helu/code/product/coslash-task-14"
  base_sha: "94fe07cad85773683898781ed62cd4f69ae27d75"
  result_sha: "a3c85e5de8f4036c157ed320e0b0a3df7b1b6925"
summary: >-
  Delivered the versioned Atlas graph, v1-to-v2 migration, executable policy,
  committee model, deterministic reducer, revisioned project board store, and
  event-sourced private run store. The takeover preserved the inherited work
  and repaired correctness, concurrency, ownership, and recovery defects before
  committing the review candidate.
delivered:
  - "Current v2 graph with seats, committees, typed trigger/feedback edges, shared instructions, editable system prompts, viewport, run policy, and unknown-field preservation."
  - "Idempotent v1 record-to-v2 graph migration carrying verify and publish policy without semantic loss."
  - "Strict normalization/policy gates for IDs, duplicates, dangling edges, trigger cycles, vendor/model/effort/permission allowlists, checks, branches, paths, and project ownership."
  - "Pure deterministic Atlas run reducer with composite {agent,id} session provenance and attributable committee attempts/artifacts."
  - "Atomic revisioned board persistence and event-log-authoritative run persistence with stale-view repair, torn-tail recovery, corruption reporting, and bounded cross-instance writer coordination."
changed_files:
  - "21 files under collector/internal/plugins/canvas/atlas/ only"
  - "boardstore.go, committee.go, doc.go, errors.go, extra.go, graph.go, keylock.go, migrate.go, policy.go, reducer.go, run.go, runstore.go, systemprompts.go, vocabulary.go"
  - "graph_test.go, migrate_test.go, reducer_test.go, store_test.go"
  - "testdata/board-v1.json, testdata/board-v2.json, testdata/committee-events.jsonl"
acceptance_gates:
  - { gate: "Valid v1 data migrates once to v2 without semantic loss", result: passed, evidence: "Golden v1 policy carry-forward and idempotent second-decode test" }
  - { gate: "Invalid graphs and transitions fail before storage/execution", result: passed, evidence: "Policy, cross-project, duplicate-attempt, cycle, dangling-edge, unsafe-command, and revision-conflict tests" }
  - { gate: "Snapshot and event replay are equivalent", result: passed, evidence: "Deterministic reducer, stale-view repair, rebuild, torn-tail recovery, and durable-corruption tests" }
tests:
  - { command: "cd collector && go test -race -count=3 ./internal/plugins/canvas/atlas/...", result: passed, evidence: "Final repeated race suite; 25 top-level tests" }
  - { command: "cd collector && go test -race ./...", result: passed, evidence: "Full collector race regression on result SHA" }
  - { command: "cd collector && go vet ./...", result: passed, evidence: "No findings" }
  - { command: "cd collector && go test -cover ./internal/plugins/canvas/atlas/...", result: passed, evidence: "65.5% statement coverage" }
  - { command: "gofmt/diff/ancestry/ownership/clean-worktree audits", result: passed, evidence: "Base 94fe07c is an ancestor; all changed files are under Task 14 ownership" }
task_evidence:
  schema_and_graph_versions:
    - "Schema v1 fixtures migrate to BoardSchemaVersion 2; future/foreign schemas fail closed."
    - "Runnable execution remains the fixed plan → build → review chain; freeform graphs can persist but cannot run."
  migration_and_replay_guarantees:
    - "Verify checks and publish settings move into RunPolicy during v1 migration."
    - "events.jsonl is authoritative; run.json is accepted only when its complete typed state equals replay and is otherwise rebuilt."
    - "Unknown compatible members survive at board, component, seat, worker, committee, edge, box, viewport, check, publish, and policy levels."
  golden_and_race_results:
    - "Task 00 v1/v2 boards and committee-event evidence are stored under testdata."
    - "Concurrent stale board saves and duplicate attempt appends elect exactly one winner across distinct store instances."
  legacy_policy_decisions:
    - "Preserved the verified Claude/Codex vocabularies and direct-argv verification allowlist from the legacy baseline."
    - "Trigger cycles are forbidden; feedback cycles remain explicit and bounded to one or two rounds."
  task_15_file_ownership_handoff:
    - "Task 14 owns every file currently present under atlas/."
    - "Task 15 may add controller.go, runner.go, pipeline.go, intake.go, prompt.go, reconcile.go, takeover.go, cancel.go, review_outcome.go, report.go, adapter files, and their tests."
    - "Task 15 must consume CommitteeFor, ValidateTransition, RunStore, BoardSnapshot, and shared Task 04/05 services rather than redefining model or persistence behavior."
decisions:
  - "Use complete typed-state equality with authoritative replay as the materialized-view freshness contract."
  - "Use reference-counted keyed locks shared by all Atlas store instances in one collector process."
contract_deviations: []
issues:
  - id: "I-006"
    severity: P3
    status: documented
    summary: "Compound compare-and-write locking is process-local."
    impact: "Two collectors sharing one Atlas root could interleave board CAS or transition validation."
    owner: master/task-18
    recommendation: "Keep one collector owner per root as shipped; add an OS-level compound primitive if multi-collector storage becomes supported."
blockers: []
post_implementation:
  remaining_work:
    - "Independent review and dependency-ordered merge into hlu/canvas-migration."
  improvements:
    - "Add fuzzing for future board and durable-event variants during Task 18."
  known_issues:
    - "Cross-process compound writes are outside the supported single-collector topology."
  follow_up_tasks:
    - "Task 15: controller and committee orchestration."
    - "Task 16: Atlas frontend over the v2 graph/committee fixtures."
    - "Task 17: legacy import through the migration boundary."
rollback_notes:
  - "The result is additive and isolated to atlas/; omit or revert commits 5159f52 and a3c85e5 without deleting user data."
next_task_recommendations: ["15", "16", "17"]
central_updates_requested: { status: true, reports: true, issues: true, decisions: false }
```

## Dependencies

- Tasks 00, 03, and 05 merged.

## Owned paths

- Atlas schema, graph, policy, board store, run store, reducer, committee-state, and fixture files assigned by the master under `collector/internal/plugins/canvas/atlas/`.
- Do not create controller, subprocess, HTTP, or frontend code.

## Work

- Define the current versioned graph schema for seats, typed edges, shared context, prompts, committee settings, run policy, revisions, and project identity.
- Implement the approved v1-to-v2 migration as an idempotent boundary operation.
- Preserve the fixed execution chain and committee/run states captured by Task 00.
- Normalize and validate graph IDs, dangling edges, duplicate seats, cycles where prohibited, policy allowlists, path containment, and project ownership.
- Use atomic revision-checked writes and shared events; provide deterministic reducer replay for board and committee state.
- Preserve unknown compatible fields on round-trip and reject incompatible future major versions clearly.

## Tests

```sh
cd collector
go test -race ./internal/plugins/canvas/atlas/...
```

Add golden tests for v1/v2 documents, migration idempotence, graph normalization, dangling/duplicate/cyclic inputs, legacy policy conversion, ID collisions, revision conflicts, corrupt/truncated storage, event replay, committee state sequences, and race/concurrent-write behavior.

## Exit gate

- Valid v1 data migrates once to the approved v2 representation without semantic loss.
- Invalid graphs and state transitions fail before storage or execution.
- Snapshot and event replay produce equivalent Atlas state.

## Report back

Before ending the assignment, update the live status and `post_implementation` fields, append a final progress entry, and send this exact schema to the master. A task is not `complete` merely because coding stopped; every exit gate must have passing evidence.

```yaml
task_id: "14"
task_title: "Atlas model/store"
final_state: review # review | blocked | complete
agent: { id: null, runtime: null }
timing:
  {
    claimed_at_utc: null,
    started_at_utc: null,
    finished_at_utc: null,
    reported_at_utc: null,
  }
git: { branch: null, worktree: null, base_sha: null, result_sha: null }
summary: null
delivered: []
changed_files: []
acceptance_gates: [] # each: { gate, result, evidence }
tests: [] # each: { command, result, evidence }
task_evidence:
  schema_and_graph_versions: []
  migration_and_replay_guarantees: []
  golden_and_race_results: []
  legacy_policy_decisions: []
  task_15_file_ownership_handoff: []
decisions: []
contract_deviations: []
issues: [] # each: { id, severity, status, summary, impact, owner, recommendation }
blockers: []
post_implementation:
  remaining_work: []
  improvements: []
  known_issues: []
  follow_up_tasks: []
rollback_notes: []
next_task_recommendations: ["15", "16", "17"]
central_updates_requested:
  { status: true, reports: true, issues: false, decisions: false }
```
