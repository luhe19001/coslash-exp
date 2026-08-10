# Task 18 — Security, End-to-End, and Release Validation

## Objective

Validate the assembled plugin against security boundaries, legacy parity, end-to-end workflows, visual expectations, restart behavior, and release requirements.

## Automatic status and reporting

Canonical dashboard record: [`../task-status/18.js`](../task-status/18.js). The assigned agent must follow [`../AUTOMATION.md`](../AUTOMATION.md) and update the sidecar plus this brief at claim, start, every material checkpoint/test, block, review handoff, and review outcome. Do not ask the human to re-enter status.

## Status schema and current record

This record is the task's pickup lock and current truth. The master changes `readiness` to `ready`; the claiming agent immediately records its identity, branch, and UTC timestamps. Update it at every state change and before every handoff. Never claim a task already in `claimed`, `in_progress`, or `review`.

```yaml
task_id: "18"
state: complete # untouched | claimed | in_progress | blocked | review | changes_requested | complete | deferred
readiness: ready # blocked | ready
status_reason: "Every runnable acceptance row passes. Two rows are unverified environmental deviations the operator accepted; they are named, not claimed."
pickup_condition: "All implementation tasks are complete and merged into the assigned base SHA."
agent:
  id: claude-worker-task-18
  runtime: claude-code
  claimed_at_utc: "2026-08-09T06:20:00Z"
  started_at_utc: "2026-08-09T06:25:00Z"
  completed_at_utc: "2026-08-09T23:47:25Z"
branch: claude/canvas-task-18-remaining
worktree: /Users/helu/code/product/coslash-task-18b
base_sha: 01077d542978f171fee7388b80e53a844d60f357
result_sha: 84fc3466ded795db13096b4ea851d9d5010a6d54
dependencies:
  required: ["09", "10", "11", "12", "13", "14", "15", "16", "17"]
  satisfied: ["09", "10", "11", "12", "13", "14", "15", "16", "17"]
blockers: []
current_focus: "Complete, with the unrunnable rows named as deviations"
next_action: "Task 19 owns destination registration, the migration route, and the two environments these deviations need."
last_updated_at_utc: "2026-08-09T23:47:25Z"
last_updated_by: claude-worker-task-18
verification:
  state: partial # not_run | running | passed | failed | partial
  commands:
    - "cd collector && go test -race ./... # full module race clean"
    - "cd collector && make check # clean"
    - "cd collector && go test ./internal/plugins/canvas/hardening/ # 50 tests"
    - "cd frontend && npm test && npm run build # 373 tests, build green"
  partial_reason: >
    Passed for every row this environment can run. Two row groups were not
    executed at all and are recorded as operator-approved deviations rather
    than as passes: the browser/visual matrix, which needs a browser this
    repository does not have, and the live provider/tmux/publication matrix,
    which needs an isolated environment with disposable credentials.
review:
  reviewer: human operator
  reviewed_at_utc: "2026-08-09T23:47:25Z"
  outcome: approved # approved | changes_requested | rejected
post_implementation:
  remaining_work:
    - "OPERATOR-APPROVED DEVIATION — browser E2E, the light/dark and viewport matrix, and the Task 00 reference-screenshot comparison were NOT run: no jsdom, no browser, and frontend/package.json is master-only. Task 00 could not capture the reference matrix for the same reason. Frontend behavior is covered by renderToStaticMarkup tests, which assert markup and not layout."
    - "OPERATOR-APPROVED DEVIATION — the live Claude/Codex/tmux matrix and the controlled idempotent publication test were NOT run: they require a final isolated environment with explicitly provisioned disposable credentials. Provider and tmux boundaries are exercised through fakes, so what is verified is that the collector drives them correctly."
    - "Atlas restart reconciliation (T15-RECONCILE) is unimplemented, so the Atlas restart row is verified at the store level but not at the controller level."
  improvements:
    - "The hardening harness mounts route groups behind the real guard, so Task 19 can add the Atlas and migration routes by adding a registrar rather than a suite."
    - "make smoke only exercises unauthenticated surfaces; asserting that /api/canvas, /api/dagama, and /api/atlas refuse an unauthenticated request would put the guard boundary into the release gate."
  known_issues:
    - "No product defect was found by any row group. Three of this worker's own assertions were wrong and were rewritten to assert the real invariant rather than relaxed."
    - "The release gate this task signs off is the collector's, not the product's: a visual regression or a live-provider incompatibility would not have been caught."
  follow_up_tasks:
    - "T18-VISUAL — run the browser, viewport, and light/dark matrix against the Task 00 reference. Owner: Task 19."
    - "T18-LIVE — run the live provider, tmux, and publication matrix with disposable credentials. Owner: Task 19."
```

## Progress-reporting schema

Append one entry below for each material checkpoint, blocker, resumed turn, test result, review response, and handoff. Do not rewrite earlier entries. Send the same entry to the master so `STATUS.md`, `REPORTS.md`, `ISSUES.md`, and `DECISIONS.md` stay synchronized.

```yaml
- update_id: "18-YYYYMMDDTHHMMSSZ-NN"
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
- update_id: "18-20260809T071200Z-01"
  at_utc: "2026-08-09T07:12:00Z"
  agent_id: "claude-worker-task-18"
  state_from: untouched
  state_to: review
  summary: "Delivered Task 18's AVAILABLE scope on explicit operator instruction, after confirming the task cannot reach its exit gate. Added the assembled-plugin hardening suite and ran the release and regression gates. No product code changed."
  work_completed:
    - "Confirmed the blocker from the integration tip rather than from the records: collector atlas/ and migration/ contain only doc.go, frontend/src/plugins/canvas has no atlas/, and sidecars 15, 16, and 17 are untouched."
    - "Added collector/internal/plugins/canvas/hardening/, which assembles the shipped route groups behind the real httpsec.Guard and sends the requests a hostile page in the user's browser would send."
    - "Guard matrix (16): missing and wrong tokens across every registered route, token prefix and suffix and case, bearer variants, DNS-rebinding hosts, loopback aliases, cross-site with a stolen token, foreign origins, top-level navigation, hardening headers on answers and on refusals, the WebSocket subprotocol path, that a subprotocol token cannot authenticate a plain fetch, and that no response header echoes the credential."
    - "Malicious-input and identity matrix (13): workspace escape by traversal, absolute path, and symlink; rendered previews proven inert by escaping plus a sandboxing CSP; the unsupported-type allowlist; revision-checked writes; oversized bodies; wrong methods and content types; digested identities that never become paths and never collide."
    - "Leak matrix (6): repeated runtime, terminal, workspace, and request lifecycles return to their goroutine baseline; a stopped terminal leaves the registry; a close releases what it still holds."
    - "Restart matrix (2): workspace state and revision survive a collector restart through the same route, and a pane that is gone is not resurrected. Per-component reconciliation is already owned and covered by the DaGama controller, terminal manager, and persistence suites, and is cited rather than duplicated."
    - "Ran the release gates: make check, make test, make release, and make smoke, unstaging the release build afterwards."
  files_changed:
    - "collector/internal/plugins/canvas/hardening/ (5 new files; no product file changed)"
  tests:
    - command: "cd collector && go test -race ./internal/plugins/canvas/hardening/"
      result: passed
      evidence: "39 tests, race clean."
    - command: "cd collector && make check && make test && make release && make smoke"
      result: passed
      evidence: "gofmt and vet clean; module tests green; binary built as v0.0.1-87-g8412b20; embedded smoke passed over real HTTP."
    - command: "cd collector && go vet ./... && go test -race ./..."
      result: passed
      evidence: "Full collector race suite green with the hardening package included."
    - command: "cd frontend && npm test && npm run lint && npm run format:check && npm run build"
      result: passed
      evidence: "21 files / 223 tests; two pre-existing warnings; formatting clean; build green. This is the existing Log regression gate."
  decisions:
    - "Task 18 is recorded as review/partial rather than complete. Marking it complete would assert verification of Atlas and migration behavior that does not exist, and Task 19 gates the final pull request on this task's go recommendation."
    - "Restart reconciliation was cited from the owning packages rather than duplicated; only the assembled-level restart row was added."
    - "Two initial failures were investigated as product findings and turned out to be wrong assertions. Both tests were rewritten to assert the invariant the product actually maintains, rather than deleted or relaxed."
  contract_deviations: []
  issues:
    - id: "T18-BLOCK"
      severity: "P1"
      status: open
      summary: "Task 18 cannot reach its exit gate while Tasks 15, 16, and 17 are unwritten and Task 14 is unmerged."
      owner: "master"
  blockers: ["14", "15", "16", "17"]
  help_needed:
    - "A decision on sequencing Tasks 14 through 17 so the remaining Task 18 rows can run."
  next_action: "Master review of d4c6dd6; schedule the remainder after the dependencies land."
```

## Dependencies

- Tasks 09 through 17 merged into the integration branch.
- Read `ACCEPTANCE.md`, `CONTRACTS.md`, and all completed worker reports first.

## Owned paths

- New security, integration, end-to-end, fixture, and release-check files assigned by the master.
- Documentation for test execution within the task's assigned path.
- Do not hide product fixes in this task: route failures to the owning worker or master and retest after merge.

## Work

- Build the threat-model matrix for HTTP authentication, WebSocket origin/authentication, path traversal/symlinks, request limits, command/prompt injection, terminal isolation, and secret leakage.
- Run Session, DaGama, and Atlas journeys using fixture agents and temporary repositories/directories.
- Test process restart during active work and confirm reconciliation without duplicate execution or publication.
- Compare approved Task 00 reference screenshots and behavior in light/dark and supported viewport sizes.
- Execute migration on representative copies and validate journals, imported state, and interrupted-run behavior.
- Run the real-agent/tmux/GitHub matrix only in the final isolated environment and only with credentials explicitly provisioned for that validation.
- Record every P0/P1 failure immediately in `ISSUES.md` through the master; release cannot proceed with either severity open.

## Tests

Run every command and manual journey in `ACCEPTANCE.md`, including:

```sh
cd collector
go test -race ./...
go vet ./...

cd ../frontend
npm test -- --run
npm run build
```

Also run browser E2E/visual, malicious-input, restart/reconciliation, migration, resource-leak, and release/rollback drills defined by the assembled test harness.

## Exit gate

- Every acceptance row has evidence, an owner, and a pass result or explicitly approved non-release-blocking deviation.
- No P0/P1 issue remains open.
- Resource, security, restart, migration, visual, and parity matrices are complete.

## Report back

Before ending the assignment, update the live status and `post_implementation` fields, append a final progress entry, and send this exact schema to the master. A `go` recommendation requires every exit gate to pass and no open P0/P1 issue.

```yaml
task_id: "18"
task_title: "Security/E2E/release validation"
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
  automated_command_results: []
  browser_and_visual_matrix: []
  threat_model_and_malicious_input_results: []
  restart_migration_and_leak_results: []
  real_integration_matrix_and_environment: []
  evidence_locations: []
decisions: []
contract_deviations: []
issues: [] # each: { id, severity, status, summary, impact, owner, recommendation }
open_p0_p1_issues: []
approved_lower_severity_deviations: []
blockers: []
post_implementation:
  remaining_work: []
  improvements: []
  known_issues: []
  follow_up_tasks: []
rollback_notes: []
release_recommendation: no-go # go | no-go
next_task_recommendations: []
central_updates_requested:
  { status: true, reports: true, issues: true, decisions: true }
```
