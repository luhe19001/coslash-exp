# Task 09 — Session Canvas Backend and Actions

## Objective

Assemble Session Canvas backend routes from the shared projection, persistence, terminal, and execution services.

## Automatic status and reporting

Canonical dashboard record: [`../task-status/09.js`](../task-status/09.js). The assigned agent must follow [`../AUTOMATION.md`](../AUTOMATION.md) and update the sidecar plus this brief at claim, start, every material checkpoint/test, block, review handoff, and review outcome. Do not ask the human to re-enter status.

### Automation progress log

#### Live status record

```yaml
state: complete
agent: codex-worker-task-09
branch: codex/canvas-task-09-session-backend
worktree: /private/tmp/coslash-canvas-task-09
base_sha: 01aa158ecc322b3dcf4b71e46d278944147ca7b6
result_sha: 8d05d8c6954e5cf10072f5bf6eb1138968040a18
claimed_at: 2026-08-09T02:54:10Z
started_at: 2026-08-09T02:54:31Z
updated_at: 2026-08-09T04:05:05Z
current_reason: "Independent review fixed the production terminal-name and reconnect defects; result 8d05d8c is locally merged into hlu/canvas-migration at 88701fa."
current_focus: "Complete and locally integrated."
next_action: "Master mirrors the accepted report centrally and completes the separate master-owned plugin lifecycle wiring."
```

- 2026-08-09T02:54:10Z — **claimed** by `codex-worker-task-09` on branch `codex/canvas-task-09-session-backend`, worktree `/private/tmp/coslash-canvas-task-09`, exact base `01aa158ecc322b3dcf4b71e46d278944147ca7b6`. Dependencies 02, 04, 06, and 08 are complete and present. Task 14 is the only other active worker task and owns non-overlapping Atlas files. Next: verify the claim remains exclusive, then begin implementation.
- 2026-08-09T02:54:31Z — **in_progress**. Verified the claim remains exclusively owned by `codex-worker-task-09` and started implementation in the isolated worktree. Current focus: map the dependency APIs and legacy behavior. Next: define the handler/service boundary in new Task 09-owned files.
- 2026-08-09T03:02:59Z — **in_progress**. Implemented the complete handler/service assembly under `collector/internal/plugins/canvas/sessioncanvas/`: composite detail/actions, workspace and terminal delegation, native same-vendor forks, bounded CLI-backed turn analysis with content-derived cache keys, scoped file rendering, collector resolution, and safe vendor metadata renames. `cd collector && go test ./internal/plugins/canvas/sessioncanvas/...` passes. The first run exposed two test-harness-only defects; both were fixed before the green run. Next: add default lifecycle construction, close remaining security/concurrency edges, and run race/full Canvas gates.
- 2026-08-09T03:08:51Z — **review**. Completed Task 09 in result `558a6e33284e36849bc516f6a0eb1e4c0152da3f`. The isolated worktree is clean, the exact dependency base is an ancestor, the required Canvas race gate passes post-commit, and the full collector race/vet suites pass. Next: master review/merge, central-record mirroring, and master-owned lifecycle wiring.
- 2026-08-09T04:05:05Z — **complete** after independent review. Review found that NUL-delimited composite identities made `terminal.Name` reject every real Session/experiment terminal even though the fake accepted them. Fix `8d05d8c` now uses deterministic JSON-encoded composite identity input, adopts preserved tmux sessions after collector restart, and restarts exited registry entries. Required repeated package race, post-merge Canvas race, full collector race, full vet, formatting, ancestry, and clean-worktree gates pass. Locally merged at `88701fac438e1ca8343bdf6c23367420f6efe27e`.

### Worker report back

```yaml
task: "09 Session Canvas backend"
status: complete
branch: codex/canvas-task-09-session-backend
base_sha: 01aa158ecc322b3dcf4b71e46d278944147ca7b6
result_sha: 8d05d8c6954e5cf10072f5bf6eb1138968040a18
routes_delivered:
  - "GET /api/canvas/sessions/{agent}/{id}"
  - "PUT /api/canvas/sessions/{agent}/{id}/name"
  - "POST /api/canvas/sessions/{agent}/{id}/fork"
  - "POST /api/canvas/sessions/{agent}/{id}/turns/{turn}/analysis"
  - "GET /api/canvas/sessions/{agent}/{id}/files?path=..."
  - "GET|PUT /api/canvas/workspaces/{agent}/{id}"
  - "POST /api/canvas/sessions/{agent}/{id}/terminal"
  - "GET|POST terminal status/input/stop/ws routes delegated to the Task 04 terminal API"
tests_and_security_cases:
  - "go test -race -count=3 ./internal/plugins/canvas/sessioncanvas/... — passed"
  - "go test -race ./internal/plugins/canvas/... — passed before commit and post-commit"
  - "go test -race ./... — passed"
  - "go vet ./... — passed"
  - "go test -cover ./internal/plugins/canvas/sessioncanvas/... — passed, 68.5% statements"
  - "review fix: go test -race -count=3 ./internal/plugins/canvas/sessioncanvas/... — passed"
  - "post-merge 88701fa: go test -race ./internal/plugins/canvas/...; go test -race ./...; go vet ./... — passed"
  - "Covers methods/bodies, unknown and duplicate vendor IDs, vanished cwd, rename validation, prompt/output limits, disabled/failed/invalid analysis, traversal/symlinks/HTML CSP, terminal reuse, safe errors, and command-argument injection boundaries."
performance_observations:
  - "Default resolution discovers and parses only the requested vendor transcript and never invokes the all-session list path."
  - "Analysis results use stable content-derived composite cache keys and a bounded concurrency-safe cache."
  - "Full repository race suite completed in 3.3 seconds with warm Go caches; no current cmd/coslash dependency on sessioncanvas exists until lifecycle integration."
contract_deviations: []
new_issues_or_risks:
  - "Master-owned lifecycle wiring is required before routes are reachable; this is intentionally outside Task 09 ownership."
  - "Concurrent first misses for an identical analysis key may duplicate CLI work; results remain safe and cached."
  - "Live CLI/tmux execution and mounted-route validation remain Task 18 responsibilities."
integration_notes_for_task_10:
  - "Keep identity composite as {agent,id}; do not send duplicate identity fields in action bodies."
  - "Use the returned analysis cacheKey and explicit unsupported/disabled/failure states."
  - "Workspace and terminal state are server-backed through Tasks 08 and 04; frontend code should not add local persistence or shell construction."
changed_files:
  - collector/internal/plugins/canvas/sessioncanvas/analysis.go
  - collector/internal/plugins/canvas/sessioncanvas/analysis_test.go
  - collector/internal/plugins/canvas/sessioncanvas/cache.go
  - collector/internal/plugins/canvas/sessioncanvas/doc.go
  - collector/internal/plugins/canvas/sessioncanvas/files.go
  - collector/internal/plugins/canvas/sessioncanvas/handler.go
  - collector/internal/plugins/canvas/sessioncanvas/handler_test.go
  - collector/internal/plugins/canvas/sessioncanvas/lifecycle.go
  - collector/internal/plugins/canvas/sessioncanvas/runtime.go
  - collector/internal/plugins/canvas/sessioncanvas/runtime_test.go
  - collector/internal/plugins/canvas/sessioncanvas/types.go
remaining_work:
  - "Master mirrors the accepted report into central records and wires sessioncanvas.Runtime into the shared Canvas plugin lifecycle."
improvements:
  - "Add fuzz/property coverage for path inputs, vendor transcript envelopes, and CLI structured output."
  - "Optionally add singleflight coalescing for simultaneous identical analysis misses."
known_issues:
  - "Runtime is not mounted by the current executable until master integration."
  - "Cross-transcript subagent aggregation depends on the shared synthesis/resolver lifecycle; the default exact-session resolver deliberately avoids global enumeration."
follow_ups:
  - "Task 10 consumes the frozen API shapes; Task 18 performs live end-to-end/security validation."
```

## Independent review outcome — 2026-08-09T04:05:05Z

- Reviewer: `codex-root`
- Outcome: approved and locally merged
- Task result: `8d05d8c6954e5cf10072f5bf6eb1138968040a18`
- Integration merge: `88701fac438e1ca8343bdf6c23367420f6efe27e`
- Resolved P1: production Session/experiment terminal names were always invalid because the identity passed to `terminal.Name` contained NUL separators.
- Resolved P1: preserved tmux sessions were not adopted after collector restart, and exited registry entries were returned forever instead of restarted.
- Verification: repeated Session Canvas race, post-merge Canvas race, full collector race, full vet, formatting, diff, ancestry, and clean-worktree checks passed.
- Remaining integration follow-up: master-owned construction/registration of `sessioncanvas.Runtime`; Task 18 retains the live CLI/tmux matrix.

## Dependencies

- Tasks 02, 04, 06, and 08 merged.

## Owned paths

- New Session Canvas handler/service files under `collector/internal/plugins/canvas/` assigned by the master.
- Do not modify shared package implementations or core routes.

## Work

- Register composite session detail, rename, fork, turn analysis, scoped file read/render, workspace, and terminal-creation handlers.
- Resolve agent/vendor/cwd from server-known session data; do not trust duplicates in request bodies.
- Implement same-vendor experiment fork and explicit unsupported/failure results.
- Invoke configured coSlash Claude/Codex CLI settings for structured turn analysis with bounded input/output and cache keys.
- Scope file access beneath the known session cwd; require regular files, supported types, and size caps.

## Tests

```sh
cd collector
go test -race ./internal/plugins/canvas/...
```

Add authenticated handler tests for methods, bodies, unknown vendor/session, duplicate IDs across vendors, vanished cwd, rename validation, prompt limits, synthesis disabled/failure, file traversal/symlinks/HTML, terminal reuse, and safe errors.

## Exit gate

- Canvas backend contract is complete without frontend assumptions.
- All routes work through a guarded test server.
- No arbitrary command or path reaches an effect.

## Report back

```markdown
Task: 09 Session Canvas backend
Status: complete | partial | blocked
Branch/base/result SHA:
Routes delivered:
Tests and security cases:
Performance observations:
Contract deviations:
New issues/risks:
Integration notes for task 10:
```
