# coSlash Canvas Suite Migration Plan

**Status:** proposed  
**Prepared:** 2026-08-08  
**Target repository:** `https://github.com/centauri-ai/coslash`  
**Target baseline inspected:** `coslash/main@1bfe2e257aa6db3953b4f6448b9725c01388f46a`  
**Legacy source inspected:** `fleetlog:hlu/canvas-testing@c13a3ef01438193dcdcd2e387300e69ae3c27437`

## 1. Executive recommendation

Create a new integration branch from the latest `coslash/main` and port the three user-visible Canvas products in vertical slices:

1. Session Canvas
2. DaGama Canvas
3. Atlas Canvas

Do **not** merge or cherry-pick the legacy branch wholesale. The repositories have unrelated Git histories, the runtime architecture changed from Vite middleware to a Go collector, and the legacy branch contains more than 72,000 added lines across experiments, docs, UI, and privileged server behavior. Treat the old branch as a behavior/design reference and test corpus.

The main technical requirement is to move every filesystem, Git, process, terminal, agent, artifact, verification, and publish operation from `frontend/vite/**` into authenticated Go APIs under `collector/`. The frontend should retain the existing Canvas designs and workflows while using coSlash's current session model, settings, branding, theme, API authentication, diagnostics, packaging, and embedded-frontend build.

Recommended integration branch:

```text
coslash/main
  └── feature/canvas-suite-migration
        ├── milestone/canvas-shell
        ├── milestone/session-canvas
        ├── milestone/dagama
        └── milestone/atlas
```

The milestone branches are optional short-lived branches. The deliverable remains one branch based on current coSlash main.

## 2. Audit summary

### 2.1 Repository state

| Item                         | Finding                                                                                                                       | Planning consequence                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| coSlash main                 | React/Vite frontend plus Go collector/API, packaged as one loopback-only binary                                               | All privileged Canvas runtime code belongs in Go, not Vite plugins                  |
| Legacy Canvas branch         | Current branch is `hlu/canvas-testing@c13a3ef`, one local commit ahead of `origin/hlu/canvas-testing`                         | Preserve or push the source snapshot before migration starts                        |
| Git ancestry                 | coSlash and the legacy Fleetlog branch have unrelated histories                                                               | Use a manual/patch port; do not merge unrelated histories                           |
| Legacy change size           | 260 changed files and approximately 72,293 insertions relative to its Fleetlog base                                           | Migrate by capability, not by directory copy                                        |
| Legacy frontend/runtime size | About 15,218 component lines, 7,731 frontend-lib lines, 17,074 Atlas runtime/test lines, and 12,509 DaGama runtime/test lines | Atlas and DaGama are independent major workstreams                                  |
| coSlash API                  | `net/http` method-qualified routes protected by `internal/httpsec.Guard` and a per-start token                                | Every new API route must stay behind this guard; frontend calls must use `apiFetch` |
| coSlash session data         | Go collector returns complete session records and synthesis, but not the legacy Canvas turn/context structures                | Add an on-demand Canvas-detail projection without slowing the session list          |
| Production build             | coSlash embeds the built frontend into the Go binary                                                                          | Final parity includes `make release` and smoke tests, not only Vite development     |

### 2.2 Verification performed during this evaluation

- Current coSlash Go baseline: `go test ./...` passed at the inspected main SHA.
- Legacy test run: 61 of 62 test files passed; 822 of 823 tests passed.
- The single legacy assertion failure attempted to create `~/.fleetlog/handoffs/...`, which the evaluation sandbox forbids.
- The same legacy run reported two `EMFILE` watcher errors in Atlas/DaGama controller tests. These need watcher lifecycle review even though they are environment-sensitive.
- Legacy `npm run build` currently fails with 12 TypeScript errors, concentrated in Atlas UI/policy/tests/run control plus one DaGama run-service call.
- The prior DaGama review documents a green build and test state before the local `WIP all` Atlas commit. The combined current HEAD must therefore be treated as a WIP reference, not a releasable baseline.

### 2.3 Current-source issues to freeze before porting

The migration should not silently reproduce or hide these conditions:

- `AtlasCanvas` and related components have current type-contract failures.
- Atlas `board-policy`, pipeline tests, and run-service calls have current type/API drift.
- DaGama references a missing `finishRun` method at current HEAD.
- Atlas supports editing a general graph, but its runtime only runs the legacy `plan -> build -> review` chain.
- DaGama's documented live visual/interaction matrix still needs a complete manual pass.
- The controller tests can leave enough file watchers to trigger `EMFILE` under constrained environments.

Phase 0 must classify each as either a source-branch fix, a deliberate limitation, or a migration acceptance test.

## 3. Scope

### 3.1 In scope

#### Session Canvas

- Star/unstar one session from List or Board and open it as a spatial workbench.
- Preserve the current nine-node design:
  - Session
  - Goal & Debrief
  - Evolved Plan
  - Decision Timeline
  - Context Map
  - Worktree
  - Next Move / Live Terminal
  - My Note
  - Turn Inspector
- Preserve drag, resize, collapse, lock, focus, zoom, auto-arrange, wiring, node inspection, and layout persistence.
- Preserve attention items, checkpoints, experiment forks, comparison, pins/working set, command palette, and JSON export.
- Preserve context-file inspection, triggered/deferred context, worktree diff display, turn-by-turn plans/decisions, and optional AI turn analysis.
- Preserve embedded tmux/ttyd resume, reconnect, stop, restart, copy-attach, and note-to-terminal behavior.

#### DaGama Canvas

- Preserve the fixed six-component workflow:
  `Intake -> Plan -> Build -> Verify -> Review -> Publish`.
- Preserve visible, controllable agent terminals and the single-seat-per-stage model.
- Preserve durable boards and revisions, run snapshots, append-only events, exact exit records, artifact validation/promotion, isolated run roots, revision capture, bounded repair, human gates, cancel, retry, takeover, handback, restart reconciliation, and idempotent publish.
- Preserve the documented invariant that DaGama does not mutate the user's active worktree.

#### Atlas Canvas

- Preserve the existing graph editor, seat creation/deletion, trigger and feedback wires, manual/automatic edge controls, worker committees, prompts, shared context, attempt outputs, live-run monitor, verification, repair gates, retry/cancel/takeover/handback, reports, and publish flow.
- Preserve headless execution as distinct from DaGama's terminal-visible execution.
- Preserve current run-policy truth: arbitrary graphs can be edited and saved, but only the legacy Plan/Build/Review graph is runnable until a graph-driven controller exists.
- Preserve Atlas's current Git-project in-place work-branch behavior and plain-folder isolated-copy behavior unless a separate product decision changes it.

### 3.2 Explicitly out of scope for this migration

- Dormant `ColumbusCanvas` productization.
- Daily Digest and the old Azure Foundry settings UI.
- A new arbitrary-graph Atlas scheduler.
- Re-designing the three Canvases to look like the current session cards.
- Renaming every internal `.fleetlog` path in the same change.
- New ticket providers, new agent vendors, or new publish providers.
- Broad cleanup of unrelated Fleetlog documents and experiments.

Columbus-derived primitives may be ported only when Session Canvas, Atlas, or DaGama directly depends on them.

## 4. Behavioral preservation matrix

This matrix is the parity contract. A capability is not complete until its acceptance condition passes on the coSlash branch.

### 4.1 Session Canvas

| Capability                 | Legacy source of truth                                       | coSlash acceptance condition                                                                                     |
| -------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Session promotion          | `CanvasStarButton`, `use-canvas-selection`                   | List and Board can select exactly one `{agent,id}` identity; reload restores it                                  |
| Spatial workspace          | `SessionCanvas`, `SessionCanvas.css`, `components/canvas/**` | Existing layout, wires, drag/resize/lock/collapse/focus/zoom behavior matches visual baseline                    |
| Workspace state            | `canvas-workspace.ts`                                        | Layout, pins, and checkpoints survive reload; legacy same-origin keys are read when present                      |
| Session/goal/plan/timeline | `session-node-views.tsx`                                     | Uses current coSlash synthesis and session facts without losing first prompt, todos, digest, or outcome          |
| Context map                | legacy Claude/Codex parsers and `derive.ts`                  | On-demand API returns captured files, grouped reads, deferred context, and triggered skills/MCP/tools            |
| Worktree                   | `FileDiffPanel`, legacy edit derivation                      | Paths, additions/deletions, new-file state, and hunks are available without changing list API performance        |
| Turn inspector             | `TurnInspectorPanel`, `turn-analysis.ts`                     | User turns, stated plan, todos, decisions, tool/error/file counts render for both Claude and Codex               |
| AI turn read               | legacy Azure completion path                                 | Same output UX uses coSlash's configured synthesis backend; no browser-stored API secret is reintroduced         |
| Terminal                   | `TerminalPanel`, `terminal-registry.ts`, `terminal.ts`       | Resume/reconnect/restart/stop/copy-attach and bracketed-paste note work after page refresh and collector restart |
| Experiments                | `CanvasWorkspacePanels`, fork/handoff modules                | Same-vendor fork launches safely, lineage binds to the child session, failures are explicit, comparison works    |
| File rendering             | `render-file.ts`                                             | Markdown/HTML inspection is path-scoped, size-limited, sanitized/sandboxed, and authenticated                    |

### 4.2 DaGama Canvas

| Capability group | Must remain true                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Board safety     | Atomic writes, optimistic revision conflicts, corruption handling, symlink refusal, request-size limits                  |
| Run durability   | Append intent before effect, fsync durable events, tolerate a torn last line, replay snapshots deterministically         |
| Isolation        | Run-owned clone/root; user's active worktree, index, refs, and status remain unchanged                                   |
| Completion       | An agent succeeds only after a terminal exit record and required artifact validation                                     |
| Agent control    | Live CLI is visible; takeover and handback are explicit new ownership attempts                                           |
| Repair           | Verify/Review failures route through bounded Build repair; exhaustion opens a human repair gate                          |
| Review identity  | Approval is tied to a controller-computed revision/hash and invalidated by later edits                                   |
| Restart          | Reconcile live tmux, drain exit records, resume stranded `ready`, and fail ambiguous attempts as `unknown_after_restart` |
| Cancel           | Durable cancel intent, partial patch snapshot, process termination, explicit terminal run state                          |
| Publish          | Fresh remote-base check, no control-plane/workflow paths, one idempotent commit/push/PR result per run                   |

### 4.3 Atlas Canvas

| Capability group   | Must remain true                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Board graph        | Add/delete seats; configure prompts/profiles/outputs; create trigger/feedback edges; auto/manual and repair-round controls       |
| Compatibility      | Schema-v1 boards migrate on load to schema v2 without losing Plan/Build/Review intent                                            |
| Runnable policy    | Only a valid legacy Plan/Build/Review chain starts; custom graphs remain saveable and clearly blocked from Run                   |
| Committees         | One worker skips refine; multiple workers produce independent drafts; the main worker refines promoted output                    |
| Attempts           | Per-worker status, session binding, prompts, output listing, retry failed, cancel, takeover, and reconciliation remain auditable |
| Storage            | Project boards and private run state remain separated; atomic events and exclusive sequencing prevent duplicate event numbers    |
| Git/plain folders  | Git projects use the configured work branch in place; plain folders use disposable isolated roots                                |
| Pipeline           | Intake, committees, Verify, bounded repair, Review, gate, Report, and Publish preserve current stage semantics                   |
| Headless invariant | Atlas does not expose a ttyd iframe as normal execution; status and session detail are the primary monitor                       |

## 5. Architecture delta

| Concern           | Legacy branch                                             | coSlash main                                               | Required migration                                                         |
| ----------------- | --------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| Server runtime    | Vite `configureServer` middleware in TypeScript           | Go HTTP server in `collector/`                             | Port privileged behavior to Go services and handlers                       |
| API security      | Vite origin/content-type guard                            | Loopback host/origin/fetch-site guard plus per-start token | Keep every route behind `httpsec.Guard`; use `apiFetch`                    |
| Session parsing   | TypeScript Claude/Codex readers with Canvas-only detail   | Go vendor parsers and unified session model                | Add on-demand Canvas detail to Go parsers/projectors                       |
| Settings          | Browser localStorage, including Azure and terminal config | Versioned `~/.coslash/settings.json`                       | Extend settings/diagnostics; never store credentials in browser state      |
| Process lifecycle | Vite process owns watchers, tmux, ttyd, and controllers   | Long-lived coSlash binary owns runtime                     | Add Go managers with explicit shutdown/reconcile behavior                  |
| Frontend delivery | Vite dev app                                              | Built assets embedded in Go binary                         | Remove production dependence on Vite middleware                            |
| Data root         | `.fleetlog` and `~/.fleetlog`                             | `~/.coslash`                                               | Preserve legacy data paths first; migrate separately and non-destructively |
| API calls         | Direct `fetch`                                            | Token-aware `apiFetch`                                     | Convert every Canvas/Atlas/DaGama call                                     |
| UI base           | Fleetlog names and older components                       | coSlash page, theme, settings, diagnostics, onboarding     | Integrate destinations without regressing the current Log experience       |

## 6. Target architecture

```text
React frontend
  ├── Logs: existing coSlash List / Board / Inspector
  ├── Session Canvas
  ├── DaGama Canvas
  └── Atlas Canvas
          │
          │ apiFetch + X-Coslash-Token
          ▼
Go HTTP API behind httpsec.Guard
  ├── session/canvas detail and safe file rendering
  ├── terminal capability manager
  ├── project + board stores
  ├── DaGama controller
  ├── Atlas controller
  └── run/artifact/verify/publish APIs
          │
          ▼
Shared Go runtime primitives
  ├── scoped filesystem + atomic file/event operations
  ├── Claude/Codex launch, resume, stream, and session binding
  ├── tmux/ttyd process supervision
  ├── Git/revision/worktree helpers
  ├── artifact validation/promotion
  ├── verification command execution
  └── publish preflight + idempotent GitHub publication
```

### 6.1 Recommended Go package boundaries

```text
collector/internal/canvas/          # on-demand session detail and workspace support
collector/internal/terminal/        # tmux/ttyd registry, capabilities, lifecycle
collector/internal/agentexec/       # Claude/Codex argv, launchers, session-id capture
collector/internal/runfs/           # atomic writes, append log, safe paths, locks
collector/internal/artifacts/       # validation, manifests, promotion, safe reads
collector/internal/revision/        # Git state, patch/revision identity, run roots
collector/internal/verification/    # bounded argv execution and logs
collector/internal/publication/     # preflight, commit, push, PR idempotency
collector/internal/dagama/          # DaGama schema, reducer, controller, policies
collector/internal/atlas/           # Atlas schema, committees, reducer, controller, policies
collector/cmd/coslash/*_api.go      # thin HTTP decoding/encoding only
```

Keep Atlas and DaGama reducers/controllers separate during the parity port. Extract only primitives with genuinely identical contracts. Their worktree, visibility, committee, and pipeline semantics are intentionally different.

### 6.2 Frontend structure

Use coSlash naming and paths for new code:

```text
frontend/src/pages/coslash/canvas/
frontend/src/pages/coslash/atlas/
frontend/src/pages/coslash/dagama/
frontend/src/pages/coslash/components/canvas-shared/
frontend/src/pages/coslash/lib/canvas-api.ts
frontend/src/pages/coslash/lib/atlas-api.ts
frontend/src/pages/coslash/lib/dagama-api.ts
```

Do not copy the old `FleetlogPage` over `CoslashPage`. Extend current coSlash navigation and preserve its settings, diagnostics, onboarding, synthesis behavior, session freshness, and error handling.

### 6.3 API rules

- Use method-qualified Go patterns for every endpoint.
- Use `apiFetch` for every frontend request.
- Return stable `{ok, code, error}` errors without leaking filesystem/process internals.
- Decode bounded request bodies and validate all enums and IDs server-side.
- Resolve project/run/session IDs to server-known scoped paths; never accept an arbitrary artifact path from the browser.
- Preserve optimistic board revisions and idempotency keys.
- Keep state-changing effects behind POST/PUT/DELETE; GET routes must be read-only.
- Polling may be retained for initial parity. SSE/WebSocket event streaming is a later optimization, not a migration prerequisite.

### 6.4 Terminal security

The embedded terminal is the highest-risk Session Canvas/DaGama surface because ttyd serves on a second loopback port outside the main API guard.

Before enabling it by default:

- Bind ttyd only to loopback.
- Require `--check-origin` and verify the allowed coSlash origin behavior in a real browser.
- Use a random, high-entropy per-terminal URL capability and never reuse it across collector restarts.
- Namespace and validate tmux names; never interpolate user text into a shell command.
- Keep terminal writable/read-only policy server-side in settings.
- Revoke the capability on stop/cancel and clean up ttyd while preserving tmux only where restart semantics require it.
- Add diagnostics for missing `tmux`, `ttyd`, agent CLIs, Git, and `gh`.
- Prefer a guarded same-origin WebSocket reverse proxy if the capability/origin design cannot pass security review.

## 7. Data compatibility strategy

Functional parity and data-path renaming must be separate concerns.

### 7.1 Initial branch behavior

- Continue to recognize project-local `.fleetlog/atlas/boards` and `.fleetlog/dagama/boards`.
- Continue to recognize legacy private run roots under `~/.fleetlog/atlas` and `~/.fleetlog/dagama` so incomplete runs can be inspected/reconciled.
- Keep `.fleetlog/run/**` as the agent/controller exchange protocol during the first port. It is embedded in prompts, Git exclusions, publish checks, artifact paths, and tests.
- Never destructively rename or delete legacy data.
- Keep legacy schema versions and migration behavior covered by fixtures.

### 7.2 New coSlash-owned state

- New global settings remain under `~/.coslash`.
- Prefer server-backed Canvas workspace state for new layouts, pins, checkpoints, and experiment metadata so it is not tied to a browser origin.
- If localStorage remains for the first slice, read legacy `fleetlog.*` keys when available and write versioned `coslash.*` keys.
- Session identity should be `{agent,id}`, not only `id`.

### 7.3 Cross-origin limitation

Browser localStorage from an old Vite origin (for example `127.0.0.1:5173`) cannot be read automatically by coSlash on `127.0.0.1:8787`. If preserving existing browser-only drafts/layouts is required, add an explicit export/import utility in the legacy app or provide a documented one-time JSON import. Do not weaken browser security to bridge origins.

### 7.4 Later storage rename

After parity, a separate migration may copy validated legacy state to `~/.coslash/workflows/**` and `.coslash/**`. It must use dual-read/single-write behavior, a migration journal, checksums/revisions, and an untouched legacy backup. Active runs should finish in their original root rather than moving underneath live processes.

## 8. Branch and source-preservation procedure

1. Push or otherwise archive local source commit `c13a3ef`; it is currently ahead of the remote branch.
2. Record the exact legacy commit in the coSlash migration document and test fixtures.
3. In the coSlash repository, fetch the latest main and create `feature/canvas-suite-migration` from it.
4. Do not add the unrelated Fleetlog history as a merge parent.
5. Port small, reviewable vertical slices. Each commit should build and pass the tests available at that milestone.
6. Regularly merge/rebase the integration branch onto current coSlash main; resolve changes in favor of current coSlash contracts unless they break an explicit parity item.
7. Keep old source files available read-only during the project for side-by-side behavior checks.

Suggested commit/PR sequence:

1. `docs(canvas): freeze migration contracts and fixtures`
2. `feat(canvas): add coSlash navigation shell and authenticated clients`
3. `feat(canvas): add scoped runtime and terminal primitives`
4. `feat(canvas): migrate session canvas detail and workbench`
5. `feat(dagama): migrate durable workflow runtime and canvas`
6. `feat(atlas): migrate committee runtime and canvas`
7. `test(canvas): complete parity, security, packaging, and migration matrix`

## 9. Phased implementation plan

### Phase 0 — Freeze the behavioral baseline

**Goal:** establish a trustworthy source of truth before translating code.

Work:

- Preserve/push `c13a3ef`.
- Fix or explicitly waive the 12 current TypeScript build errors in a source-reference branch.
- Re-run the legacy tests with a writable temporary home and a higher watcher limit; confirm whether all 823 tests pass without `EMFILE`.
- Run the documented manual DaGama matrix with Claude, Codex, tmux, ttyd, and `gh` where available.
- Capture screenshots/video for the three Canvases at representative states.
- Export representative schema-v1/schema-v2 boards, run snapshots, event logs, artifacts, prompts, revisions, and terminal states as sanitized fixtures.
- Turn documented limitations into explicit tests or UI copy, especially Atlas custom-graph runtime blocking.

Exit gate:

- Source snapshot is recoverable.
- Legacy build/test status is fully explained.
- A checked-in parity checklist and sanitized golden fixtures exist.

### Phase 1 — Add the coSlash product shell and API contracts

**Goal:** expose the destinations without copying legacy page architecture.

Work:

- Extend `CoslashTabMenus` with `Canvas`, `DaGama Canvas`, and `Atlas Canvas`.
- Add immersive/full-bleed layout behavior while retaining coSlash header, branding, theme, settings, diagnostics, and current Log views.
- Restore a Canvas selection control to current `SessionCard` and `SessionBoard` using composite identity.
- Add placeholder destinations with feature/readiness errors rather than nonfunctional controls.
- Add typed API clients that all call `apiFetch`.
- Add missing shadcn primitives only when required (`label`, `select`, `textarea`, and any dialog variants).
- Define OpenAPI-like request/response fixtures or Go/TypeScript contract tests before implementing effects.

Exit gate:

- coSlash List and Board behave exactly as before.
- The three destinations route/render in light and dark themes.
- Unauthorized API calls fail through the existing token guard.

### Phase 2 — Port shared privileged runtime primitives to Go

**Goal:** create the secure runtime foundation once.

Work:

- Port atomic write, fsync, append-log, torn-tail repair, safe-directory traversal, symlink refusal, size caps, and exclusive event sequencing.
- Port hardened command execution with explicit argv, environment allowlists, timeouts, cancellation, bounded stdout/stderr, and no shell interpolation.
- Port Claude/Codex bounded/interactive launchers, resume/fork semantics, exact session/thread ID capture, and durable exit records.
- Implement tmux/ttyd registry, port allocation, random capability paths, reconnect, paste, stop, and shutdown behavior.
- Port artifact candidate validation, controller-blob promotion, manifests, and safe reads.
- Port Git preflight, run-root creation/removal guards, revision capture, tree/patch identity, and status parsing.
- Port Verify argv execution and publish preflight/effect primitives.
- Add diagnostics and versioned settings for Canvas prerequisites.

Testing:

- Translate legacy pure-unit cases one-for-one.
- Use fake process runners for controller tests.
- Use temporary real Git repositories for Git/isolation tests.
- Test all HTTP handlers through `httpsec.Guard`.
- Test server shutdown/restart with live and missing tmux/exit records.

Exit gate:

- No privileged production behavior remains dependent on Vite middleware.
- Runtime primitives pass race, path traversal, symlink, crash-tail, timeout, and cancellation tests.

### Phase 3 — Migrate Session Canvas end to end

**Goal:** ship the first usable Canvas vertical slice on coSlash main.

Backend work:

- Add an on-demand Canvas-detail endpoint keyed by agent and session ID.
- Extend Go transcript parsing/projection for:
  - turn log
  - per-turn plans/todos/decisions/errors/tool uses/file edits
  - captured context files and grouped reads
  - deferred context and triggered skill/MCP/tool use
  - diff hunks required by Worktree
- Reuse current coSlash synthesis for Goal/Debrief.
- Add scoped file-render, experiment-fork, terminal, terminal-paste, and workspace-state APIs.
- Add optional turn-analysis API through the configured synthesis backend with bounded input/output and cache keys.

Frontend work:

- Port the current Session Canvas components and CSS under coSlash paths.
- Adapt session types instead of replacing the current coSlash `Session` contract.
- Replace direct `fetch` with `apiFetch`.
- Replace legacy Azure/terminal localStorage settings with coSlash settings and diagnostics.
- Preserve all nine nodes and current spatial interactions.
- Preserve empty/loading/error/authentication states.

Exit gate:

- Both Claude and Codex sessions populate every supported node.
- Layout/checkpoints/pins survive reload.
- Terminal resumes and reconnects after UI reload.
- Experiment fork lineage and comparison work.
- Existing coSlash list refresh performance does not materially regress.

### Phase 4 — Migrate DaGama runtime and UI

**Goal:** port the smaller, terminal-visible workflow before Atlas.

Backend work:

- Port DaGama board schema/policy/store and revision conflicts.
- Port event reducer/run store before porting the controller; validate legacy snapshots/events against golden fixtures.
- Port Intake and isolated run-root behavior.
- Port Plan/Build/Review seat controllers and exit/artifact contracts.
- Port Verify, revision capture, review normalization/mutation guard, bounded repair, repair gates, and publish gate.
- Port retry, cancel, takeover, handback, Codex session binding, restart reconciliation, and idempotent publish.
- Enumerate/reconcile known incomplete projects at startup or from durable sidecars; do not depend on a browser page being open.

Frontend work:

- Port DaGama Canvas and its current CSS/layout.
- Port project selection, board autosave/conflict recovery, run dialog, state strips, visible terminals, prompts/info, artifacts, Verify results, repair gate, and publish gate.
- Keep configuration editing separate from live/gate state exactly as the fixed feature issues require.

Exit gate:

- Full `Intake -> Plan -> Build -> Verify -> Review -> approval -> Publish` runs for Claude and Codex.
- User worktree isolation is proven by status/index/ref snapshots.
- Kill/restart/reload/takeover/handback/cancel cases pass.
- Repeated approve/publish cannot create a duplicate PR.

### Phase 5 — Migrate Atlas runtime and UI

**Goal:** port committee/headless behavior after shared and DaGama contracts are stable.

Backend work:

- Port Atlas schema-v1 migration, schema-v2 graph validation, board policy, and store.
- Port committee selection, worker naming, main/refine behavior, required outputs, prompt layers, and attempt-output storage.
- Port headless spawn and session binding using the shared agent runtime without adding ttyd as the normal Atlas UI.
- Port Atlas reducer/run store with exclusive event sequencing and live-run discovery.
- Port fixed pipeline transitions, auto/manual triggers, feedback budget, Verify/Review repair, reports, gates, and publish.
- Preserve Atlas's Git-project in-place work-branch semantics and plain-folder-copy semantics with separate tests.
- Preserve the explicit custom-graph runtime block.

Frontend work:

- Port Atlas Canvas, graph interactions, CSS, shared context dock, system-prompt editor, committee controls/status, attempt dialogs, live-run monitor, artifacts, Verify/repair/publish gates.
- Resolve current legacy TypeScript contract drift rather than copying it into coSlash.
- Ensure session links open the current coSlash inspector by `{agent,id}`.

Exit gate:

- Schema-v1 and schema-v2 boards round-trip without data loss.
- One-worker and multi-worker Plan/Build/Review cases pass.
- Worker retry retains successful sibling artifacts.
- Manual and auto trigger/feedback cases pass.
- Custom graph Run is disabled with accurate explanation.
- Refresh/restart does not duplicate a headless attempt.

### Phase 6 — Compatibility, security, and packaging hardening

**Goal:** make the integration safe to ship as coSlash.

Work:

- Complete legacy board/run discovery and non-destructive migration tests.
- Validate all settings upgrades and `settings.schema.json` changes.
- Add retention/cleanup rules that can delete only proven disposable run roots.
- Audit all Git and filesystem deletion targets with explicit ancestry checks.
- Threat-model API, terminal capability, artifact rendering, prompt injection boundaries, and publish effects.
- Run Go race tests where applicable and watcher/goroutine leak tests.
- Verify dark/light layouts and responsive minimum sizes.
- Run frontend build/test/lint/format and collector test/check.
- Run `make release` and smoke the embedded binary, API token flow, browser launch, restart, and Homebrew-style archive layout.
- Update README, troubleshooting, privacy, diagnostics, and user-facing prerequisites.

Exit gate:

- No P0/P1 parity or security issues remain.
- Production binary passes the full manual matrix.
- Legacy data remains recoverable.

### Phase 7 — Integrate and prepare release

**Goal:** produce the requested branch cleanly based on current main.

Work:

- Rebase/merge the integration branch onto the latest coSlash main.
- Re-run every automated and manual gate after conflict resolution.
- Produce a final feature matrix identifying complete, deliberately deferred, and unsupported behavior.
- Keep rollout behind a feature flag only if a terminal or publish security gate remains unresolved.
- Prepare reviewable release notes and a rollback/data-recovery procedure.

Exit gate:

- `feature/canvas-suite-migration` is based on current coSlash main, green, packaged, and reviewable.
- The current Log experience has no functional regression.
- Canvas, DaGama, and Atlas each meet their definition of done below.

## 10. Testing strategy

### 10.1 Test layers

1. **Golden compatibility tests** — old board/event/run/artifact JSON decodes and produces the expected state.
2. **Pure reducer/policy tests** — stage transitions, gates, repair budgets, committee joins, and failures.
3. **Filesystem/Git integration tests** — real temp repositories, isolation, symlinks, torn events, revisions, and cleanup guards.
4. **Process adapter tests** — fake Claude/Codex/tmux/ttyd/gh executables with deterministic streams and exits.
5. **Authenticated HTTP tests** — valid token, missing/wrong token, wrong origin/host/fetch-site, body caps, method mismatches, and fixed errors.
6. **Frontend unit tests** — normalization, autosave conflict handling, run polling, selection identity, and API errors.
7. **Browser interaction tests** — drag/resize/wire/edit/dialog/gate/terminal reconnect flows.
8. **Production smoke tests** — embedded assets and Go runtime, not Vite middleware.

### 10.2 Required live matrix

| Product        | Claude           | Codex            | Restart            | Cancel          | Takeover              | Publish                 |
| -------------- | ---------------- | ---------------- | ------------------ | --------------- | --------------------- | ----------------------- |
| Session Canvas | resume/fork      | resume/fork      | terminal reconnect | stop            | n/a                   | n/a                     |
| DaGama         | full pipeline    | full pipeline    | reconcile          | snapshot + stop | take/hand back        | `gh` preflight + one PR |
| Atlas          | one/multi-worker | one/multi-worker | reconcile headless | stop attempt    | when session ID known | `gh` preflight + one PR |

### 10.3 CI commands

```sh
cd collector
make test
make check
make release
make smoke

cd ../frontend
npm test
npm run build
npm run lint
npm run format:check
```

Add targeted race/leak/security jobs as the Go workflow managers land.

## 11. Major risks and mitigations

| Risk                                                                       | Severity | Mitigation                                                                            |
| -------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| Translating two large TypeScript controllers to Go changes event semantics | Critical | Port reducer/store first; use golden logs and intent-before-effect tests              |
| Current Atlas source does not build                                        | High     | Repair/freeze source contracts in Phase 0; port only characterized behavior           |
| Terminal is outside the main API port                                      | Critical | Loopback + origin check + capability path; security gate or same-origin proxy         |
| Incomplete runs are lost during storage rename                             | Critical | Preserve legacy paths; never move active roots; migrate separately                    |
| Atlas and DaGama are over-deduplicated                                     | High     | Share primitives only; retain separate policies/controllers                           |
| Atlas in-place Git behavior surprises users                                | High     | Preserve existing semantics, show explicit preflight, prevent concurrent project runs |
| Session list becomes slow due to Canvas detail                             | High     | Derive expensive transcript/context detail only on selected-session endpoint          |
| Watcher/goroutine leaks exhaust resources                                  | High     | Explicit close ownership, leak tests, watcher counters, bounded registries            |
| Publish causes duplicate or unreviewed external effects                    | Critical | Durable idempotency, frozen revision/base checks, human gate, fake-`gh` tests         |
| Browser-only legacy drafts cannot cross origins                            | Medium   | Server-backed state going forward; explicit export/import for old origin              |
| coSlash Log UX regresses while adding immersive views                      | High     | Keep current page as base; regression screenshots and existing tests on every phase   |
| Huge long-lived branch becomes unreviewable                                | High     | Green milestone commits/PRs and frequent mainline synchronization                     |

## 12. Definitions of done

### Session Canvas done

- A session can be selected from current coSlash List/Board and reopened after reload.
- All nine nodes render real Claude and Codex data.
- Spatial interactions and saved workspace behavior match the legacy design.
- Context, changes, turns, checkpoints, experiments, pins, export, and optional AI analysis work.
- Embedded terminal and note delivery pass the security and restart gates.

### DaGama done

- A saved board runs through the full fixed pipeline without manual context copying.
- The user's active worktree remains unchanged.
- Every agent has a visible, controllable CLI and exact durable completion.
- Repair, approval, publish, cancel, takeover, handback, and restart behavior pass.
- Publish creates or updates at most one PR for the approved revision.

### Atlas done

- Existing boards, graph editing, prompts, committees, attempts, outputs, monitors, gates, and reports work.
- Headless one-worker and committee runs survive restart without duplication.
- Current fixed-chain limitations are enforced and accurately communicated.
- Git and plain-folder modes preserve their distinct behavior.
- Publish remains revision-bound and idempotent.

### Integration branch done

- It starts from current coSlash main and does not merge unrelated Fleetlog history.
- Current coSlash Logs, settings, diagnostics, auth, synthesis, themes, packaging, and startup remain green.
- All new privileged behavior lives in the Go runtime and is authenticated/scoped.
- Legacy user data is preserved or explicitly importable; nothing is destructively renamed.

## 13. Effort and sequencing estimate

This is a high-complexity migration, not a normal frontend feature. The legacy branch contains two workflow engines, terminal/process supervision, session parsing extensions, a spatial workbench, Git isolation/revision logic, and external publishing.

Approximate effort for one engineer already familiar with the codebase:

| Milestone         | Relative size | Planning range       |
| ----------------- | ------------- | -------------------- |
| Phase 0 baseline  | Medium        | 3–5 engineering days |
| Shell/contracts   | Small–medium  | 2–4 days             |
| Shared Go runtime | Large         | 8–15 days            |
| Session Canvas    | Large         | 7–12 days            |
| DaGama            | Very large    | 12–20 days           |
| Atlas             | Very large    | 18–30 days           |
| Hardening/release | Large         | 8–15 days            |

Total planning range: roughly **58–101 engineering days** for one engineer, with substantial uncertainty around provider CLI behavior, terminal proxy/security, and Atlas source repair. A first usable Session Canvas can land much earlier than the full suite. Parallel UI work is possible after API contracts are frozen, but parallel controller translations should wait until the shared durability/process primitives are stable.

## 14. Recommended immediate next actions

1. Push/archive `c13a3ef` so the Atlas work cannot be lost.
2. Create a small source-stabilization task for the 12 TypeScript build errors and watcher leaks.
3. Check in sanitized golden fixtures and the parity matrix in coSlash.
4. Create `feature/canvas-suite-migration` from the latest coSlash main.
5. Implement Phase 1 shell/contracts without altering existing Log behavior.
6. Spike one end-to-end Go capability: selected session -> on-demand Canvas detail -> one read-only Canvas node.
7. Spike the terminal security/lifecycle contract before relying on embedded terminals in either Session Canvas or DaGama.

The first implementation milestone should be a read-only Session Canvas slice, not Atlas or the workflow scheduler. It proves navigation, authenticated API composition, on-demand session detail, embedded production packaging, and visual integration at the lowest control-plane risk.
