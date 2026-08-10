# DaGama handoff — after M6

_For the next agent picking up DaGama. Written 2026-07-30 after M6 landed on branch `hlu/canvas-testing`._

## Where things stand

| Milestone | Status |
|-----------|--------|
| M0–M3 | Done (board, run skeleton, Plan seat) |
| M4 · Build, Verify, repair loop | Done |
| M5 · Review, gate, Publish | Done |
| **M6 · Restart, takeover, cancel** | **Done** |

**Product reality today:** Run → Intake → Plan (live ttyd) → Build (live ttyd) → Verify → Review
(live ttyd) → if effective verdict `approved`, Publish enters `awaiting_approval` with a preflight
checklist → Approve & publish commits, pushes, and creates/updates exactly one PR. Verify `failed` or
Review `changes_requested` repairs Build (max 2 rounds after the first) then opens `gate_opened` /
`waiting_for_repair`. On Vite restart, `reconcileProject` reloads `board.snapshot.json`, drains
pending `exit.json`, re-arms watchers for live tmux sessions, and marks ambiguous attempts
`unknown_after_restart`. Seat footer: Take control / Return to workflow / Prompt / Cancel / Retry.

Specs remain authoritative: [01-spec.md](./01-spec.md), [02-architecture.md](./02-architecture.md),
[03-ui.md](./03-ui.md), [05-build-plan.md](./05-build-plan.md), [06-decisions.md](./06-decisions.md).

## How to run locally

```bash
cd frontend
npm install          # if needed
npm run dev
```

Open **DaGama** (not Columbus), choose a project, save a board (Plan + Build + Review seats required;
Verify checks optional), **Run workflow**. Agent seats need `claude` or `codex` plus `tmux` + `ttyd`
(`brew install ttyd tmux`). Publish needs `gh` authenticated for the project's github.com remote.

Worktrees seen in this effort:

- `…/fleetlog` — main repo
- `…/fleetlog-canvas` — canvas testing worktree (this branch)
- `…/fleetlog-canvas-Dagama` — separate worktree used for DaGama UI testing

App lives under `frontend/` (repo root has no `package.json`).

## M6 what shipped (map)

### Server (`frontend/vite/dagama/`)

| Module | Role |
|--------|------|
| `reconcile.ts` | Pure `classifySeatAttempt` — drain / rearm / `unknown_after_restart` |
| `runs.ts` | `reconcileProject` / `ensureProjectReconciled`; `cancel`; `takeover` / `handback`; long-lived seat controllers; board snapshot reload |
| `controller.ts` | Public `rearmExitWatcher` / `closeExitWatcher`; Review `before-tree-oid.txt` durable for restart drain |
| `adapters.ts` | `buildInteractiveAgentArgv` / `writeInteractiveLauncher` (no exit.json / no max-turns) |
| `run-store.ts` | Events: `cancel_requested`, `takeover_requested`, `handback_completed`; ownership `automated \| human_controlled` |
| `plugin.ts` | Lazy once-per-`projectId` reconcile; routes for cancel / takeover / handback |
| `terminal-registry.ts` | Exported `tmuxSessionExists` / `killTmuxSession` |

### Client UI

| Piece | Role |
|-------|------|
| `PlanSeatPane.tsx` (`AgentSeatPane`) | Take control / Return to workflow / Prompt / Cancel / Retry |
| `lib/dagama-runs.ts` | `cancelDaGamaRun`, `takeoverDaGamaSeat`, `handbackDaGamaSeat` |

### Invariants preserved

1. **Exit protocol (D5):** completion = `exit.json` + artifact validation.
2. **Intent before effect** for cancel / takeover / launch.
3. **Ownership transitions are new attempts (D6)** — interactive resume, never keystroke injection.
4. **Handback** runs the same `onExit` validation as automated completion, then resumes the pipeline.
5. **Cancel** snapshots patch/untracked first, then kills ttyd/tmux; `run_finished` status `canceled`.
6. **Reconcile never double-launches**; ambiguous → `unknown_after_restart` (Retry UI).

## Verification last known good

```bash
cd frontend
npm test          # 41 files / 481 tests
npm run build     # tsc + vite
```

## Known gaps / follow-ups (not M6 blockers)

- **Board-configurable repair bound / timeouts** — fixed `DAGAMA_MAX_REPAIR_ROUNDS = 2`.
- Repair-exhaustion gates: Reject / Retry Build UI landed (see `10-feature-issues.md` ISS-003).
- Codex session bind + publish remote-base check: see `10-feature-issues.md` ISS-006 / ISS-007.
- Env-var attempt-id proof beyond deterministic tmux name (not required; hash name is identity).
- Existing saved boards keep old card heights; new boards get taller seat cards.

## Useful commands / routes

| Action | Route |
|--------|-------|
| Start run | `POST /api/dagama/runs?projectId=` |
| Retry seat | `POST /api/dagama/runs/:id/retry?projectId=` body `{ "componentId": "plan" \| "build" \| "review" }` |
| Cancel | `POST /api/dagama/runs/:id/cancel?projectId=` body `{ "componentId"?: … }` |
| Takeover | `POST /api/dagama/runs/:id/takeover?projectId=` body `{ "componentId": … }` |
| Handback | `POST /api/dagama/runs/:id/handback?projectId=` body `{ "componentId": … }` |
| Reconnect ttyd | `POST /api/dagama/runs/:id/terminal?projectId=` body `{ "componentId"?: … }` |
| Publish preflight | `GET /api/dagama/runs/:id/publish-preflight?projectId=` |
| Decide gate | `POST /api/dagama/runs/:id/gate?projectId=` body `{ "decision": "approved" \| "rejected" }` |

Attempt id shape: `<runId>/<component>/<instance>/<seatId>/<attempt>`

## Docs

- [05-build-plan.md](./05-build-plan.md) — M0–M6 marked done
- [08-build-review.md](./08-build-review.md) — verdict updated for M0–M6

v1 definition of done in [01-spec.md](./01-spec.md#6-v1-definition-of-done) should now hold. Prefer
hardening and the deferred list above over inventing a second product surface.
