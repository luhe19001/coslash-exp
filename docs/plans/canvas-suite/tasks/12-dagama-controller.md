# Task 12 — DaGama Controller and Run Lifecycle

## Objective

Implement DaGama's controlled agent pipeline on top of the approved model, execution, terminal, artifact, verification, and publication services.

## Automatic status and reporting

Canonical dashboard record: [`../task-status/12.js`](../task-status/12.js). The assigned agent must follow [`../AUTOMATION.md`](../AUTOMATION.md) and update the sidecar plus this brief at claim, start, every material checkpoint/test, block, review handoff, and review outcome. Do not ask the human to re-enter status.

## Status schema and current record

This record is the task's pickup lock and current truth. The master changes `readiness` to `ready`; the claiming agent immediately records its identity, branch, and UTC timestamps. Update it at every state change and before every handoff. Never claim a task already in `claimed`, `in_progress`, or `review`.

```yaml
task_id: "12"
state: complete # untouched | claimed | in_progress | blocked | review | changes_requested | complete | deferred
readiness: ready # blocked | ready
status_reason: "Complete: human-approved result 780f4bd was fast-forwarded locally into hlu/canvas-migration after all five P2 findings were resolved."
pickup_condition: "Tasks 04, 05, and 11 are complete and merged into the assigned base SHA."
agent:
  id: codex-root-task-12
  runtime: Codex coding agent
  claimed_at_utc: "2026-08-09T02:54:16Z"
  started_at_utc: "2026-08-09T02:54:49Z"
  completed_at_utc: "2026-08-09T05:30:39Z"
branch: codex/canvas-task-12-dagama-controller
worktree: /private/tmp/coslash-canvas-task-12
base_sha: a8f208653c9efa821ef1daf4b19cc6aebad080f8
result_sha: 780f4bd6f1a1d62ba724850fdd704bf0c4506f11
dependencies:
  required: ["04", "05", "11"]
  satisfied: ["04", "05", "11"]
blockers: []
current_focus: "Complete and locally integrated at 780f4bd6f1a1d62ba724850fdd704bf0c4506f11."
next_action: "Task 13 may be claimed; Task 18 retains disposable live-provider and OS process/FD verification."
last_updated_at_utc: "2026-08-09T05:30:39Z"
last_updated_by: codex-root-task-12
verification:
  state: passed # not_run | running | passed | failed | partial
  commands:
    - "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race -count=3 ./internal/plugins/canvas/dagama/..."
    - "go test -race ./..."
    - "GOCACHE=/private/tmp/coslash-task-12-gocache go vet ./..."
    - "GOCACHE=/private/tmp/coslash-task-12-gocache go test -cover ./internal/plugins/canvas/dagama/..."
    - "GOCACHE=/private/tmp/coslash-review-gocache go test -race -count=3 ./internal/plugins/canvas/sessioncanvas/... ./internal/plugins/canvas/terminal/..."
    - "GOCACHE=/private/tmp/coslash-review-gocache go test -race ./..."
    - "GOCACHE=/private/tmp/coslash-review-gocache go vet ./..."
    - "npm test && npm run build && npm run lint && npm run format:check"
review:
  reviewer: "human operator"
  reviewed_at_utc: "2026-08-09T05:30:39Z"
  outcome: approved # approved | changes_requested | rejected
post_implementation:
  remaining_work: []
  improvements:
    - "Add OS-level process/FD snapshots during Task 18 live verification."
  known_issues:
    - "Ordinary verification uses fake provider processes plus real temporary Git repositories; the disposable live Claude/Codex matrix remains assigned to Task 18."
  follow_up_tasks:
    - "Task 13 DaGama frontend"
    - "Task 18 live-agent hardening"
```

## Progress-reporting schema

Append one entry below for each material checkpoint, blocker, resumed turn, test result, review response, and handoff. Do not rewrite earlier entries. Send the same entry to the master so `STATUS.md`, `REPORTS.md`, `ISSUES.md`, and `DECISIONS.md` stay synchronized.

```yaml
- update_id: "12-YYYYMMDDTHHMMSSZ-NN"
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
- update_id: "12-20260809T025416Z-01"
  at_utc: "2026-08-09T02:54:16Z"
  agent_id: "codex-root-task-12"
  state_from: untouched
  state_to: claimed
  summary: "Claimed Task 12 after the full plan/Git audit; its completed dependency base and Task 11 file split are exact and non-overlapping."
  work_completed:
    - "Verified Tasks 04, 05, and 11 are complete and present in 01aa158ecc322b3dcf4b71e46d278944147ca7b6."
    - "Verified Task 09's active worktree and Task 14's review worktree do not overlap the DaGama controller filenames."
  files_changed:
    - "task-status/12.js"
    - "tasks/12-dagama-controller.md"
  tests: []
  decisions:
    - "Selected Task 12 among Wave 3 candidates because it directly unlocks blocked Task 13."
  contract_deviations: []
  issues: []
  blockers: []
  help_needed: []
  next_action: "Create the isolated worktree at /private/tmp/coslash-canvas-task-12 and begin implementation."
```

```yaml
- update_id: "12-20260809T025449Z-02"
  at_utc: "2026-08-09T02:54:49Z"
  agent_id: "codex-root-task-12"
  state_from: claimed
  state_to: in_progress
  summary: "Created the isolated worktree from the exact dependency base and started implementation."
  work_completed:
    - "Created codex/canvas-task-12-dagama-controller at 01aa158ecc322b3dcf4b71e46d278944147ca7b6."
    - "Verified the worktree is clean and the claim still belongs to codex-root-task-12."
  files_changed: []
  tests: []
  decisions: []
  contract_deviations: []
  issues: []
  blockers: []
  help_needed: []
  next_action: "Inspect the integrated DaGama and shared service APIs, then implement the controller and fakes."
```

```yaml
- update_id: "12-20260809T030428Z-03"
  at_utc: "2026-08-09T03:04:28Z"
  agent_id: "codex-root-task-12"
  state_from: in_progress
  state_to: in_progress
  summary: "Implemented the event-driven DaGama controller and its fake-adapter lifecycle matrix."
  work_completed:
    - "Added bounded intake, prompts, typed review outcomes, Plan/Build/Verify/Review routing, repair exhaustion, publication gating, retry, cancel, takeover/handback, and reconciliation."
    - "Added ProductionRuntime composition over Task 05 Git/artifact/verification/publication services and a narrow Task 04 exact-attempt driver boundary."
    - "Added durable run-report generation and intent-before-effect publication ordering."
  files_changed:
    - "collector/internal/plugins/canvas/dagama/{controller,runner,pipeline,intake,prompt,repair,reconcile,takeover,cancel,review_outcome,report}.go"
    - "collector/internal/plugins/canvas/dagama/{controller,review_outcome}_test.go"
  tests:
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test ./internal/plugins/canvas/dagama/..."
      result: passed
      evidence: "Existing Task 11 model/store suite plus new lifecycle, repair, publish, retry, cancel, takeover/handback, and restart tests pass."
  decisions:
    - "Keep exact tmux/PTY launch and exit-record handling behind AttemptDriver; controller events remain intent-before-effect and never infer exit from terminal output."
  contract_deviations: []
  issues: []
  blockers: []
  help_needed: []
  next_action: "Add real temporary-Git isolation coverage, run race/full collector gates, and audit the owned-path diff."
```

```yaml
- update_id: "12-20260809T031932Z-04"
  at_utc: "2026-08-09T03:19:32Z"
  agent_id: "codex-root-task-12"
  state_from: in_progress
  state_to: in_progress
  summary: "Completed the controller correctness pass and expanded the F1-F8 lifecycle evidence."
  work_completed:
    - "Made retry, handback, and exited-attempt reconciliation idempotently continue from persisted Plan, Build, or Review state without duplicate agent execution."
    - "Persisted and validated an immutable board snapshot for restart/retry behavior instead of loading a later editable board revision."
    - "Moved Review normalization and effective-verdict derivation into the controller, enforced artifact/session provenance, and made stored failure messages client-safe."
    - "Added terminal reports for successful publication, cancellation, and rejected gates, including source, check argv, exit state, verification, Review, gate decision, artifacts, and publication facts."
  files_changed:
    - "collector/internal/plugins/canvas/dagama/{controller,pipeline,intake,prompt,reconcile,takeover,cancel,review_outcome,report,runner}.go"
    - "collector/internal/plugins/canvas/dagama/{controller,intake,prompt,review_outcome,runner}_test.go"
  tests:
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race -count=3 ./internal/plugins/canvas/dagama/..."
      result: passed
      evidence: "ok github.com/centauri-ai/coslash/collector/internal/plugins/canvas/dagama 32.051s"
  decisions:
    - "Store board.snapshot.json as an Intake artifact because Task 11's frozen RunState records board identity/revision but has no snapshot field."
    - "Treat the Task 04 AttemptDriver as the native tmux/PTY and exact-exit adapter boundary; the controller owns durable intents, validation, normalization, and routing."
  contract_deviations: []
  issues: []
  blockers: []
  help_needed: []
  next_action: "Run full collector race/vet regression gates and the owned-path/security audit, then commit and hand off for review."
```

```yaml
- update_id: "12-20260809T032318Z-05"
  at_utc: "2026-08-09T03:23:18Z"
  agent_id: "codex-root-task-12"
  state_from: in_progress
  state_to: blocked
  summary: "Preserved the tested controller at 97d1108 but stopped before review because the merged Task 04 surface cannot satisfy the live native-tmux plus exact-exit lifecycle required by Task 12."
  work_completed:
    - "Committed the owned-path-only controller result as 97d11088fc11948c8e2e0d4ec10eb4dd0988afb3."
    - "Passed repeated targeted race, full collector race, full vet, coverage, formatting, ownership, forbidden-runtime, and post-commit race checks."
    - "Confirmed Task 04 agentexec.RunHeadless supplies bounded exact completion while terminal.Manager supplies interactive tmux lifecycle, but neither API supplies both in one early-launch/later-exit attempt lifecycle."
  files_changed:
    - "collector/internal/plugins/canvas/dagama/{controller,runner,pipeline,intake,prompt,repair,reconcile,takeover,cancel,review_outcome}.go"
    - "collector/internal/plugins/canvas/dagama/{controller,runner,intake,prompt,review_outcome}_test.go"
  tests:
    - command: "go test -race ./..."
      result: passed
      evidence: "All collector packages passed; DaGama completed in 14.826s."
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go vet ./..."
      result: passed
      evidence: "No diagnostics."
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -cover ./internal/plugins/canvas/dagama/..."
      result: passed
      evidence: "78.1% statement coverage."
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race ./internal/plugins/canvas/dagama/..."
      result: passed
      evidence: "Post-commit pass in 12.249s."
  decisions:
    - "Do not label the injected AttemptDriver boundary a production Task 04 integration when no concrete implementation can expose a running terminal and exact later exit without an unapproved wrapper/process layer."
  contract_deviations:
    - "The preserved result has a fake/injected AttemptDriver boundary but no production adapter; the Task 12 live execution exit gates are therefore incomplete."
  issues:
    - id: "I-007"
      severity: P1
      status: open
      summary: "Task 04 lacks a unified asynchronous native-tmux and exact-exit attempt lifecycle for workflow controllers."
      owner: "master / Task 04 contract owner"
  blockers:
    - "Supply an approved API that launches through terminal.Manager, returns terminal identity and composite session before completion, persists exact exitCode/finishedAt, and supports probe/rearm/cancel/takeover/handback."
  help_needed:
    - "Master must assign and merge the Task 04 contract follow-up because Task 12 does not own shared agentexec/terminal files."
  next_action: "Resume Task 12 after the contract lands; implement the concrete driver, avoid holding the per-run lock while the attempt is live, and rerun concurrent F4/F7/F8 plus leak tests."
```

```yaml
- update_id: "12-20260809T033329Z-06"
  at_utc: "2026-08-09T03:33:29Z"
  agent_id: "codex-root-task-12"
  state_from: blocked
  state_to: blocked
  summary: "Mirrored the blocked report into master-owned records under explicit operator authorization and exposed I-007 in the migration monitor."
  work_completed:
    - "Added I-007 to ISSUES.md with master/Task 04 ownership and the exact unlock sequence."
    - "Updated STATUS.md and REPORTS.md with Task 12 result 97d1108, passing evidence, blocker, and recommended first action."
    - "Added a sidecar-backed open-task-ticket panel to migration-control.html; I-007 links back to Task 12 from any selected monitor task."
    - "Added migration-control.test.mjs syntax, sidecar, and Markdown synchronization coverage."
  files_changed:
    - "ISSUES.md"
    - "STATUS.md"
    - "REPORTS.md"
    - "migration-control.html"
    - "migration-control.test.mjs"
    - "task-status/12.js"
    - "tasks/12-dagama-controller.md"
  tests:
    - command: "node --test migration-control.test.mjs"
      result: passed
      evidence: "3 tests passed: inline script syntax, sidecar-backed I-007, and central Markdown synchronization."
    - command: "node --check task-status/12.js"
      result: passed
      evidence: "No syntax errors."
    - command: "git diff --check -- migration-control.html migration-control.test.mjs ISSUES.md STATUS.md REPORTS.md task-status/12.js tasks/12-dagama-controller.md"
      result: passed
      evidence: "No whitespace errors."
  decisions:
    - "Use the task sidecar as the monitor ticket feed and ISSUES.md as the full central register, avoiding browser-local issue state."
  contract_deviations: []
  issues:
    - id: "I-007"
      severity: P1
      status: open
      summary: "Task 04 lacks a unified asynchronous native-tmux and exact-exit attempt lifecycle for workflow controllers."
      owner: "master / Task 04 contract owner"
  blockers:
    - "I-007 remains the Task 12 production blocker."
  help_needed:
    - "Master assigns and merges the Task 04 lifecycle contract follow-up."
  next_action: "Resume Task 12 only after the I-007 dependency result is present in its base."
```

```yaml
- update_id: "12-20260809T042922Z-07"
  at_utc: "2026-08-09T04:29:22Z"
  agent_id: "codex-root-task-12"
  state_from: blocked
  state_to: in_progress
  summary: "Resumed Task 12 after explicit operator authorization to perform the exact I-007 master follow-up. The preserved controller commit is clean and its required DaGama race test passes."
  work_completed:
    - "Reconciled current integration, Task 04, Task 09, and Task 12 Git evidence; no existing commit supplies the missing tracked tmux exact-exit lifecycle."
    - "Confirmed 97d1108 remains a clean owned-path-only controller commit."
  files_changed:
    - "task-status/12.js"
    - "tasks/12-dagama-controller.md"
  tests:
    - command: "cd collector && go test -race ./internal/plugins/canvas/dagama/..."
      result: passed
      evidence: "ok github.com/centauri-ai/coslash/collector/internal/plugins/canvas/dagama 11.658s"
  decisions:
    - "Keep the master-owned shared lifecycle change and resumed Task 12 controller work in separate commits."
  contract_deviations: []
  issues:
    - id: "I-007"
      severity: P1
      status: mitigated
      summary: "The authorized shared lifecycle follow-up is now actively implementing the exact unlock condition."
      owner: "codex-root-task-12 acting under master authorization"
  blockers: []
  help_needed: []
  next_action: "Create the isolated lifecycle-follow-up branch and implement tracked native-tmux launch, exact exit, probe/re-adopt, stop, and cleanup."
```

```yaml
- update_id: "12-20260809T043515Z-08"
  at_utc: "2026-08-09T04:35:15Z"
  agent_id: "codex-root-task-12"
  state_from: in_progress
  state_to: in_progress
  summary: "Implemented and committed the authorized shared tracked-tmux lifecycle follow-up at b4c60a3."
  work_completed:
    - "Added race-free tracked launch by arming remain-on-exit before direct-argv pane respawn."
    - "Added durable exact pane exit status/time, bounded pane capture for session discovery, restart adoption, stop, and retained-pane cleanup."
  files_changed:
    - "collector/internal/plugins/canvas/terminal/manager.go"
    - "collector/internal/plugins/canvas/terminal/manager_test.go"
  tests:
    - command: "go test -race -count=3 ./internal/plugins/canvas/terminal/..."
      result: passed
      evidence: "Repeated race suite passed."
    - command: "go test -race ./internal/plugins/canvas/agentexec/... ./internal/plugins/canvas/terminal/..."
      result: passed
      evidence: "Shared execution and terminal regression suites passed."
    - command: "go vet ./internal/plugins/canvas/terminal/..."
      result: passed
      evidence: "No diagnostics."
  decisions:
    - "Run provider argv directly in tmux and treat pane_dead_status/pane_dead_time as the exact completion source; terminal output never determines exit."
  contract_deviations: []
  issues:
    - id: "I-007"
      severity: P1
      status: mitigated
      summary: "The shared lifecycle contract required by Task 12 now exists at b4c60a3."
      owner: "codex-root-task-12 acting under master authorization"
  blockers: []
  help_needed: []
  next_action: "Rebase the preserved controller onto the shared lifecycle and implement its concrete native AttemptDriver."
```

```yaml
- update_id: "12-20260809T044950Z-09"
  at_utc: "2026-08-09T04:49:50Z"
  agent_id: "codex-root-task-12"
  state_from: in_progress
  state_to: review
  summary: "Completed Task 12 at adca6ba with a production native AttemptDriver, concurrent lifecycle controls, concrete artifact/revision promotion, and exact restart-safe completion evidence."
  work_completed:
    - "Rebased the preserved controller onto current integration and the shared lifecycle without changing its behavior."
    - "Bound Claude/Codex composite sessions before the launch callback returns, persisted launch/session facts before waiting, and adopted retained attempts after restart."
    - "Released the per-run lock while agents live so cancel and takeover proceed concurrently; stale completion cannot overwrite a newer terminal state."
    - "Added concrete Build revision capture, Review before/after mutation checks, dead-pane cleanup, real temporary-Git tests, and concurrent cancel/takeover tests."
  files_changed:
    - "collector/internal/plugins/canvas/dagama/{attempt_driver,controller,pipeline,prompt,reconcile,runner,takeover}.go and tests"
    - "collector/internal/plugins/canvas/revision/{capture.go,revision_test.go}"
    - "collector/internal/plugins/canvas/terminal/{manager.go,manager_test.go}"
  tests:
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race -count=3 ./internal/plugins/canvas/dagama/..."
      result: passed
      evidence: "33.029s"
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race ./..."
      result: passed
      evidence: "All collector packages passed; DaGama 12.016s."
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go vet ./..."
      result: passed
      evidence: "No diagnostics."
    - command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -cover ./internal/plugins/canvas/dagama/..."
      result: passed
      evidence: "73.3% statement coverage."
    - command: "git diff --check 1e1324c93a03d8b3940576a9e0717b3d11f2f776..HEAD"
      result: passed
      evidence: "No whitespace errors; task worktree clean."
  decisions:
    - "Use bounded tmux capture only to discover the provider session identifier; exact process exit always comes from tmux pane facts."
    - "Use the Build instance as the repair attempt number so every output candidate path remains unique and auditable."
  contract_deviations:
    - "The operator explicitly authorized the master-owned shared terminal lifecycle follow-up; it is isolated in b4c60a3 and 726f0da for independent review."
  issues:
    - id: "I-007"
      severity: P1
      status: resolved
      summary: "Tracked native-tmux launch, exact exit, session discovery, restart adoption, controls, and cleanup are implemented and integrated."
      owner: "master review / integration"
  blockers: []
  help_needed: []
  next_action: "Master independently reviews and merges b4c60a3, 5fdb2e4, 726f0da, and adca6ba in dependency order, resolves I-007 centrally, and unlocks Task 13."
```

```yaml
- update_id: "12-20260809T051041Z-10"
  at_utc: "2026-08-09T05:10:41Z"
  agent_id: "codex-root-task-12"
  state_from: review
  state_to: changes_requested
  summary: "Reviewer identified five P2 defects spanning companion drag batching, auto-arrange state, Codex promotion identity, stale pin removal, and failed tmux shutdown reporting."
  work_completed:
    - "Validated every finding against the rebased integration and Task 12 code."
  files_changed: []
  tests: []
  decisions:
    - "Resolve the cross-task integration findings in the active review branch under the operator's explicit instruction, with focused regressions for every state/lifecycle defect."
  contract_deviations:
    - "The requested fixes include Task 09/10 session backend/frontend paths in addition to Task 12 terminal lifecycle code."
  issues: []
  blockers: []
  help_needed: []
  next_action: "Rebase onto current hlu/canvas-migration, implement all five fixes, and rerun full collector/frontend gates."
```

```yaml
- update_id: "12-20260809T051042Z-11"
  at_utc: "2026-08-09T05:10:42Z"
  agent_id: "codex-root-task-12"
  state_from: changes_requested
  state_to: review
  summary: "Resolved all five review findings at 780f4bd and returned the clean rebased branch for re-review."
  work_completed:
    - "Batched primary and companion node layouts into one outward workspace update and added a two-node regression."
    - "Restricted auto-arrange to geometry so collapsed, locked, and future node state survives."
    - "Rendered stale pinned IDs as checked unavailable rows that remain explicitly removable."
    - "Snapshotted Codex rollout IDs before native fork, discovered the exact new forked_from_id child, serialized discovery, and failed/cleaned up explicitly when identity cannot be confirmed."
    - "Made terminal Stop return a sanitized kill error while retaining registry/client ownership for retry."
  files_changed:
    - "frontend/src/plugins/canvas/session/{SessionCanvas.tsx,workspace.ts,workspace.test.ts}"
    - "frontend/src/plugins/canvas/shared/use-canvas-node-interaction.ts"
    - "collector/internal/plugins/canvas/sessioncanvas/{codex_fork.go,handler.go,handler_test.go}"
    - "collector/internal/plugins/canvas/terminal/{manager.go,manager_test.go}"
  tests:
    - command: "GOCACHE=/private/tmp/coslash-review-gocache go test -race -count=3 ./internal/plugins/canvas/sessioncanvas/..."
      result: passed
      evidence: "Repeated race suite passed."
    - command: "GOCACHE=/private/tmp/coslash-review-gocache go test -race -count=3 ./internal/plugins/canvas/terminal/..."
      result: passed
      evidence: "Repeated race suite including guarded WebSocket tests passed."
    - command: "GOCACHE=/private/tmp/coslash-review-gocache go test -race ./..."
      result: passed
      evidence: "All collector packages passed; DaGama 14.505s."
    - command: "GOCACHE=/private/tmp/coslash-review-gocache go vet ./..."
      result: passed
      evidence: "No diagnostics."
    - command: "npm test"
      result: passed
      evidence: "15 files, 118 tests passed."
    - command: "npm run build; npm run lint; npm run format:check"
      result: passed
      evidence: "Production build and formatting passed; lint has only two pre-existing Fast Refresh warnings."
    - command: "post-commit targeted backend/frontend suites; git diff --check; clean worktree"
      result: passed
      evidence: "Session Canvas, shutdown retry, component/model tests, and TypeScript build passed at 780f4bd."
  decisions:
    - "Use Codex rollout session_meta.forked_from_id rather than a fabricated UUID or terminal output to establish the promotable child identity."
    - "Keep terminal registry and live clients intact until tmux confirms kill-session success."
  contract_deviations:
    - "The operator explicitly requested fixes in Task 09/10 backend/frontend paths; the cross-task changes are isolated in the final review-fix commit."
  issues: []
  blockers: []
  help_needed: []
  next_action: "Master re-reviews and merges 465eccf, 2a6b3f1, c1b6aa6, 43e2923, and 780f4bd in dependency order, resolves I-007 centrally, and unlocks Task 13."
```

```yaml
- update_id: "12-20260809T053039Z-12"
  at_utc: "2026-08-09T05:30:39Z"
  agent_id: "codex-root-task-12"
  state_from: review
  state_to: complete
  summary: "Human operator approved Task 12 and the reviewed branch was fast-forwarded locally into hlu/canvas-migration at 780f4bd."
  work_completed:
    - "Verified integration HEAD equals 780f4bd6f1a1d62ba724850fdd704bf0c4506f11 and contains the complete reviewed five-commit series."
    - "Marked I-007 resolved and unlocked untouched Task 13 from the integrated Task 12 base."
  files_changed:
    - "task-status/12.js"
    - "tasks/12-dagama-controller.md"
    - "STATUS.md"
    - "REPORTS.md"
    - "ISSUES.md"
    - "task-status/13.js"
    - "tasks/13-dagama-frontend.md"
  tests:
    - command: "git merge --ff-only codex/canvas-task-12-dagama-controller; git rev-parse HEAD; git merge-base --is-ancestor"
      result: passed
      evidence: "Local hlu/canvas-migration HEAD is exactly 780f4bd and contains the accepted task branch."
  decisions:
    - "Accept the reviewer-fixed result as complete under the human operator's explicit instruction."
  contract_deviations: []
  issues:
    - id: "I-007"
      severity: P1
      status: resolved
      summary: "Tracked native-tmux exact-exit lifecycle is integrated."
      owner: "complete"
  blockers: []
  help_needed: []
  next_action: "Task 13 may be claimed; Task 18 retains live provider and OS resource verification."
```

## Dependencies

- Tasks 04, 05, and 11 merged.

## Owned paths

- `controller.go`, `runner.go`, `pipeline.go`, `intake.go`, `prompt.go`, `repair.go`, `reconcile.go`, `takeover.go`, `cancel.go`, `review_outcome.go`, and their tests under `collector/internal/plugins/canvas/dagama/`.
- Do not modify Task 11 model/store files or shared services.

## Work

- Preserve the proven pipeline: intake, isolated checkout, agent run, exact exit capture, artifact collection, verification, bounded repair, gates, and publication.
- Use native PTY/tmux execution through Task 04; do not shell out through ttyd or create another process layer.
- Implement retry, cancel, takeover, handback, restart reconciliation, and explicit terminal states.
- Bind related coSlash sessions by `{agent, id}` and preserve navigable provenance from card to run to artifact.
- Isolate working copies and ensure cleanup of processes, sockets, temporary paths, and worktrees on every exit path.
- Keep repair attempts bounded and policy-driven. Never silently publish after a failed required check or approval gate.
- Produce a durable run report containing inputs, commands, exit results, verification, artifacts, decisions, and publication outcome.

## Tests

```sh
cd collector
go test -race ./internal/plugins/canvas/dagama/...
```

Use fake agent, tmux, and GitHub adapters plus temporary Git repositories. Cover all baseline failure cases F1–F8, successful and failed verification, bounded repair, retry, cancel, takeover/handback, restart without duplicate execution, publication gates, session binding, and resource-leak checks.

## Exit gate

- A run can be stopped, resumed/reconciled, audited, and safely retried.
- No failed required gate can reach publication.
- Repeated restart tests create neither duplicate work nor leaked processes/worktrees.

## Report back

Before ending the assignment, update the live status and `post_implementation` fields, append a final progress entry, and send this exact schema to the master. A task is not `complete` merely because coding stopped; every exit gate must have passing evidence.

```yaml
task_id: "12"
task_title: "DaGama controller"
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
  lifecycle_and_controls: []
  fake_adapter_and_git_results: []
  f1_f8_results: []
  restart_and_leak_observations: []
  publication_gate_results: []
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
next_task_recommendations: ["13", "18"]
central_updates_requested:
  { status: true, reports: true, issues: false, decisions: false }
```

## Blocked report back

```yaml
task_id: "12"
task_title: "DaGama controller"
final_state: blocked
agent: { id: "codex-root-task-12", runtime: "Codex coding agent" }
timing:
  {
    claimed_at_utc: "2026-08-09T02:54:16Z",
    started_at_utc: "2026-08-09T02:54:49Z",
    finished_at_utc: "2026-08-09T03:23:18Z",
    reported_at_utc: "2026-08-09T03:23:18Z",
  }
git:
  {
    branch: "codex/canvas-task-12-dagama-controller",
    worktree: "/private/tmp/coslash-canvas-task-12",
    base_sha: "01aa158ecc322b3dcf4b71e46d278944147ca7b6",
    result_sha: "97d11088fc11948c8e2e0d4ec10eb4dd0988afb3",
  }
summary: "Implemented and tested the deterministic DaGama lifecycle, but blocked production review because Task 04 has no approved asynchronous primitive combining a live native tmux terminal, early composite-session binding, and a durable exact later exit."
delivered:
  - "Bounded text/file intake, canonical source provenance, immutable board snapshot, layered untrusted-input prompts, and controller-derived typed Review outcomes."
  - "Plan/Build/Verify/Review routing, three-instance bounded repair, explicit repair/publication gates, fail-closed publication, and durable terminal reports."
  - "Retry, cancellation snapshot, takeover/handback validation, conservative restart reconciliation, composite-session checks, and Task 05 Git/artifact/verification/publication composition."
  - "Fake-adapter F1-F8 coverage and a real temporary-Git isolation/cleanup test."
changed_files:
  - "collector/internal/plugins/canvas/dagama/cancel.go"
  - "collector/internal/plugins/canvas/dagama/controller.go"
  - "collector/internal/plugins/canvas/dagama/controller_test.go"
  - "collector/internal/plugins/canvas/dagama/intake.go"
  - "collector/internal/plugins/canvas/dagama/intake_test.go"
  - "collector/internal/plugins/canvas/dagama/pipeline.go"
  - "collector/internal/plugins/canvas/dagama/prompt.go"
  - "collector/internal/plugins/canvas/dagama/prompt_test.go"
  - "collector/internal/plugins/canvas/dagama/reconcile.go"
  - "collector/internal/plugins/canvas/dagama/repair.go"
  - "collector/internal/plugins/canvas/dagama/review_outcome.go"
  - "collector/internal/plugins/canvas/dagama/review_outcome_test.go"
  - "collector/internal/plugins/canvas/dagama/runner.go"
  - "collector/internal/plugins/canvas/dagama/runner_test.go"
  - "collector/internal/plugins/canvas/dagama/takeover.go"
acceptance_gates:
  - { gate: "Deterministic pipeline, controls, audit, retry, and fail-closed gates", result: passed, evidence: "Repeated DaGama race suite and controller F1-F8 fake matrix pass." }
  - { gate: "Isolated Git root and source worktree preservation", result: passed, evidence: "ProductionRuntime temporary-repository test creates an independent .git, preserves source status, round-trips artifacts, and removes the disposable root." }
  - { gate: "Native live tmux plus exact exit/restart lifecycle", result: blocked, evidence: "Task 04 exposes terminal.Manager and agentexec.RunHeadless separately; no unified launch/completion primitive exists." }
tests:
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race -count=3 ./internal/plugins/canvas/dagama/...", result: passed, evidence: "32.051s" }
  - { command: "go test -race ./...", result: passed, evidence: "All collector packages passed; DaGama 14.826s." }
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go vet ./...", result: passed, evidence: "No diagnostics." }
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -cover ./internal/plugins/canvas/dagama/...", result: passed, evidence: "78.1% coverage." }
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race ./internal/plugins/canvas/dagama/...", result: passed, evidence: "Post-commit 12.249s." }
  - { command: "git diff --check; gofmt ownership and forbidden-runtime audit", result: passed, evidence: "Clean committed worktree; exactly 15 Task 12-owned files; only direct argv git calls occur in the temporary-repository test." }
task_evidence:
  lifecycle_and_controls:
    - "Happy path reaches an explicit publish gate; rejection never calls publish; approval writes a succeeded report and terminal event."
    - "Retry, cancel, takeover/handback, repair exhaustion, immutable board reload, and conservative unknown-after-restart behavior are covered."
  fake_adapter_and_git_results:
    - "Fake runtime covers agent, tmux lifecycle facts, verification, GitHub publication, cancellation, takeover, handback, and probe/rearm behavior."
    - "Real Git test proves the run clone owns its .git and leaves the source worktree unchanged."
  f1_f8_results:
    - "F1/F2: intake and board snapshot plus isolated real Git clone pass."
    - "F3: Intake through publish gate and durable artifacts/report pass."
    - "F4: takeover/handback and missing-output fail-closed behavior pass with fakes; live terminal integration is blocked."
    - "F5/F6: failed verification/Review bounds, reviewer mutation, rejection, approval, and no failed-gate publish pass."
    - "F7: running rearm, exact recovered completion drain, ambiguous launch refusal, and no duplicate second reconcile pass with fakes."
    - "F8: cancel snapshot, report, terminal state, and repeat-cancel refusal pass with fakes."
  restart_and_leak_observations:
    - "Repeated fake reconciliation creates no duplicate execution; ProductionRuntime cleanup removes its disposable root."
    - "OS-level live process/FD observations remain blocked until the concrete Task 04 driver exists."
  publication_gate_results:
    - "Verification and normalized Review revision identities are rechecked before publication; rejected or stale gates cannot publish."
decisions:
  - "Persist board.snapshot.json as an Intake artifact because frozen Task 11 state has board identity/revision but no immutable snapshot field."
  - "Stop at blocked rather than misrepresent an injected fake AttemptDriver as production Task 04 integration."
contract_deviations:
  - "No concrete Task 04-backed AttemptDriver exists; current execution is an injected completion-shaped boundary and cannot expose a live attempt before completion."
issues:
  - { id: "I-007", severity: P1, status: open, summary: "Missing unified async native-tmux/exact-exit Task 04 contract", impact: "Live takeover/cancel/restart and exact exit cannot all be proven in production", owner: "master / Task 04 contract owner", recommendation: "Add an approved early-launch/later-completion API with composite session, terminal identity, exact exit record, and probe/rearm controls." }
blockers:
  - "Task 04/master lifecycle follow-up must merge into the Task 12 base."
post_implementation:
  remaining_work:
    - "Implement the concrete driver, release controller locking while an attempt is live, and rerun concurrent F4/F7/F8 tests."
  improvements:
    - "Task 18 should add live OS process/FD snapshots and disposable Claude/Codex verification."
  known_issues:
    - "The current result is not production-ready for live agent attempts despite all deterministic/fake and Task 05 integration gates passing."
  follow_up_tasks:
    - "Master/Task 04 contract follow-up"
    - "Resumed Task 12"
    - "Task 18 live hardening"
rollback_notes:
  - "The result is one isolated commit; revert or omit 97d11088fc11948c8e2e0d4ec10eb4dd0988afb3 to remove it. No target integration merge or external publication occurred."
next_task_recommendations:
  - "Task 04/master contract follow-up"
  - "Resume Task 12; do not mark it review/complete until live lifecycle gates pass"
central_updates_requested:
  { status: true, reports: true, issues: true, decisions: false }
```

## Review-fix handoff report back

```yaml
task_id: "12"
task_title: "DaGama controller"
final_state: review
agent: { id: "codex-root-task-12", runtime: "Codex coding agent" }
timing:
  {
    claimed_at_utc: "2026-08-09T02:54:16Z",
    started_at_utc: "2026-08-09T02:54:49Z",
    finished_at_utc: "2026-08-09T05:10:42Z",
    reported_at_utc: "2026-08-09T05:10:42Z",
  }
git:
  {
    branch: "codex/canvas-task-12-dagama-controller",
    worktree: "/private/tmp/coslash-canvas-task-12",
    base_sha: "a8f208653c9efa821ef1daf4b19cc6aebad080f8",
    result_sha: "780f4bd6f1a1d62ba724850fdd704bf0c4506f11",
  }
summary: "Rebased Task 12 onto current integration and resolved all five P2 review findings with focused state/lifecycle regressions and complete collector/frontend verification."
delivered:
  - "Atomic primary/companion canvas movement and state-preserving auto-arrange."
  - "Explicit removal UI for stale pins."
  - "Exact promotable Codex child discovery from new native-fork rollout metadata."
  - "Recoverable tmux shutdown failures that return errors without discarding registry ownership."
changed_files:
  - "frontend/src/plugins/canvas/session/SessionCanvas.tsx"
  - "frontend/src/plugins/canvas/session/workspace.ts"
  - "frontend/src/plugins/canvas/session/workspace.test.ts"
  - "frontend/src/plugins/canvas/shared/use-canvas-node-interaction.ts"
  - "collector/internal/plugins/canvas/sessioncanvas/codex_fork.go"
  - "collector/internal/plugins/canvas/sessioncanvas/handler.go"
  - "collector/internal/plugins/canvas/sessioncanvas/handler_test.go"
  - "collector/internal/plugins/canvas/terminal/manager.go"
  - "collector/internal/plugins/canvas/terminal/manager_test.go"
acceptance_gates:
  - { gate: "Five review findings resolved", result: passed, evidence: "Focused tests cover two-node batching, preserved collapsed/locked state, stale pin classification, Codex child response, and shutdown retry." }
  - { gate: "Collector regression", result: passed, evidence: "Full race and vet suites passed." }
  - { gate: "Frontend regression", result: passed, evidence: "118 tests, TypeScript/Vite build, lint, and formatting passed; lint contains only two pre-existing warnings." }
tests:
  - { command: "go test -race -count=3 ./internal/plugins/canvas/sessioncanvas/...", result: passed, evidence: "Repeated race suite passed." }
  - { command: "go test -race -count=3 ./internal/plugins/canvas/terminal/...", result: passed, evidence: "Repeated race suite passed." }
  - { command: "go test -race ./...", result: passed, evidence: "All collector packages passed; DaGama 14.505s." }
  - { command: "go vet ./...", result: passed, evidence: "No diagnostics." }
  - { command: "npm test", result: passed, evidence: "15 files, 118 tests." }
  - { command: "npm run build; npm run lint; npm run format:check", result: passed, evidence: "Build/format passed; two pre-existing lint warnings only." }
  - { command: "post-commit targeted tests; git diff --check; git status --porcelain", result: passed, evidence: "Clean result at 780f4bd." }
task_evidence:
  lifecycle_and_controls:
    - "Terminal Stop retains the entry and clients when kill-session fails, returns a sanitized error, and succeeds on retry."
  fake_adapter_and_git_results:
    - "Codex fork test creates parent/child rollout files and proves the exact childSessionId response without shell mediation."
  f1_f8_results:
    - "Previously passing Task 12 DaGama lifecycle coverage remains green in the full collector race suite."
  restart_and_leak_observations:
    - "No process ownership is discarded after failed shutdown; failed Codex discovery attempts bounded cleanup with an uncancelled context."
  publication_gate_results:
    - "Unchanged and green in the full DaGama race suite."
decisions:
  - "Discover Codex fork children via bounded new-rollout scanning and session_meta.forked_from_id; serialize discovery to prevent cross-request ambiguity."
  - "Batch drag companions at the interaction boundary so consumers emit exactly one workspace update per pointer event."
contract_deviations:
  - "User-requested review fixes touch completed Task 09/10 paths; all are isolated in 780f4bd for explicit master review."
issues:
  - { id: "I-007", severity: P1, status: resolved, summary: "Tracked native-tmux lifecycle and exact exit", impact: "Previously blocked Task 12", owner: "master review / integration", recommendation: "Merge the rebased series and close centrally." }
blockers: []
post_implementation:
  remaining_work:
    - "Independent master re-review and dependency-ordered merge into hlu/canvas-migration."
  improvements:
    - "Task 18 should exercise real Codex native-fork rollout discovery and OS-level process/FD snapshots."
  known_issues:
    - "Real provider invocation remains intentionally assigned to Task 18."
  follow_up_tasks:
    - "Task 13 after review and merge"
    - "Task 18 live provider and leak verification"
rollback_notes:
  - "Omit or revert 780f4bd, 43e2923, c1b6aa6, 2a6b3f1, and 465eccf in reverse order. No push, PR, target integration merge, provider invocation, or external publication occurred."
next_task_recommendations: ["13", "18"]
central_updates_requested:
  { status: true, reports: true, issues: true, decisions: false }
```

## Review handoff report back

```yaml
task_id: "12"
task_title: "DaGama controller"
final_state: review
agent: { id: "codex-root-task-12", runtime: "Codex coding agent" }
timing:
  {
    claimed_at_utc: "2026-08-09T02:54:16Z",
    started_at_utc: "2026-08-09T02:54:49Z",
    finished_at_utc: "2026-08-09T04:49:50Z",
    reported_at_utc: "2026-08-09T04:49:50Z",
  }
git:
  {
    branch: "codex/canvas-task-12-dagama-controller",
    worktree: "/private/tmp/coslash-canvas-task-12",
    base_sha: "1e1324c93a03d8b3940576a9e0717b3d11f2f776",
    result_sha: "adca6ba535337895c4dafc4968852ae940f88f36",
  }
summary: "Completed the restart-safe DaGama controller on a tracked native-tmux lifecycle, with early composite-session binding, exact exit evidence, concurrent controls, concrete artifact/revision promotion, fail-closed gates, and deterministic cleanup."
delivered:
  - "Tracked direct-argv Claude/Codex tmux attempts with bounded session discovery, exact pane exit status/time, restart adoption, stop, and cleanup."
  - "Durable intent-before-effect Plan/Build/Verify/Review routing, bounded repair, revision/artifact evidence, normalized Review mutation checks, publication gates, and terminal reports."
  - "Concurrent cancel and takeover/handback without holding the per-run lock across the live attempt; stale completion cannot win after a control transition."
  - "Fake lifecycle coverage plus real temporary-Git plan/build isolation, artifact promotion, product-patch exclusion, and cleanup coverage."
changed_files:
  - "collector/internal/plugins/canvas/dagama/attempt_driver.go"
  - "collector/internal/plugins/canvas/dagama/attempt_driver_test.go"
  - "collector/internal/plugins/canvas/dagama/{cancel,controller,controller_test,intake,intake_test,pipeline,prompt,prompt_test,reconcile,repair,review_outcome,review_outcome_test,runner,runner_test,takeover}.go"
  - "collector/internal/plugins/canvas/revision/capture.go"
  - "collector/internal/plugins/canvas/revision/revision_test.go"
  - "collector/internal/plugins/canvas/terminal/manager.go"
  - "collector/internal/plugins/canvas/terminal/manager_test.go"
acceptance_gates:
  - { gate: "A run can be stopped, reconciled, audited, and safely retried", result: passed, evidence: "Repeated race suite covers concurrent cancellation, takeover/handback, retained-attempt adoption, recovered completion, retry, and no duplicate execution." }
  - { gate: "No failed required gate reaches publication", result: passed, evidence: "Verification, Review revision/mutation, rejection, exhaustion, and stale-publication cases all fail closed." }
  - { gate: "Repeated restart creates no duplicate work or leaked resources", result: passed, evidence: "Idempotent fake restart tests and real temporary-Git cleanup pass; exact tmux completion and dead-pane removal are covered." }
  - { gate: "Native attempt and exact exit contract", result: passed, evidence: "b4c60a3 plus adca6ba use direct argv in tracked tmux; exact exit is read from pane_dead_status/pane_dead_time, never inferred from output." }
tests:
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race -count=3 ./internal/plugins/canvas/dagama/...", result: passed, evidence: "33.029s" }
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -race ./...", result: passed, evidence: "All collector packages passed; DaGama 12.016s." }
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go vet ./...", result: passed, evidence: "No diagnostics." }
  - { command: "GOCACHE=/private/tmp/coslash-task-12-gocache go test -cover ./internal/plugins/canvas/dagama/...", result: passed, evidence: "73.3% statement coverage." }
  - { command: "go test -race -count=3 ./internal/plugins/canvas/terminal/... ./internal/plugins/canvas/revision/...", result: passed, evidence: "Shared lifecycle and capture hardening passed repeated race coverage." }
  - { command: "git diff --check 1e1324c93a03d8b3940576a9e0717b3d11f2f776..HEAD", result: passed, evidence: "No whitespace errors; task worktree clean." }
task_evidence:
  lifecycle_and_controls:
    - "Launch/session events persist before the controller waits; controller locking is released while an attempt lives."
    - "Cancel stops the pane before snapshotting; takeover/handback is validated against the live retained terminal and stale completion is ignored."
  fake_adapter_and_git_results:
    - "Ordinary provider tests use fakes while real temporary repositories prove isolated Plan/Build revision capture, artifact promotion, and cleanup."
  f1_f8_results:
    - "F1-F3 intake, immutable board/source evidence, isolated Git, full pipeline, artifacts, and reports pass."
    - "F4/F7/F8 live lifecycle semantics pass with tracked-manager fakes and concurrent controller tests; F5/F6 verification, repair, Review, and publication gates pass."
  restart_and_leak_observations:
    - "Retained pane identity and exact completion survive manager reconstruction; completion drain is idempotent and cleanup removes dead panes/disposable Git roots."
  publication_gate_results:
    - "Required checks, normalized Review verdict, and before/after revision identity must all match before publication."
decisions:
  - "Treat tmux pane_dead_status and pane_dead_time as the only exact native-attempt completion evidence."
  - "Keep the authorized shared lifecycle and capture hardening in separate commits so master can review the expanded ownership explicitly."
contract_deviations:
  - "Shared terminal and revision files were changed under the operator's explicit authorization to implement the master-owned I-007 follow-up; the changes are isolated in b4c60a3 and 726f0da."
issues:
  - { id: "I-007", severity: P1, status: resolved, summary: "Missing unified async native-tmux/exact-exit lifecycle", impact: "Task 12 was blocked", owner: "master review / integration", recommendation: "Merge the reviewed four-commit series and close the central ticket." }
blockers: []
post_implementation:
  remaining_work:
    - "Independent master review and dependency-ordered merge into hlu/canvas-migration."
  improvements:
    - "Task 18 should add OS-level process/FD snapshots around disposable live provider runs."
  known_issues:
    - "Real Claude/Codex invocation was intentionally not performed; Task 18 owns that disposable live-provider matrix."
  follow_up_tasks:
    - "Task 13 after Task 12 is reviewed and merged"
    - "Task 18 live Claude/Codex/tmux and leak verification"
rollback_notes:
  - "Omit or revert adca6ba, 726f0da, 5fdb2e4, and b4c60a3 in reverse order. No push, PR, target integration merge, provider invocation, or external publication occurred."
next_task_recommendations: ["13", "18"]
central_updates_requested:
  { status: true, reports: true, issues: true, decisions: false }
```
