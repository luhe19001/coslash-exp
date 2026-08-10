# 10 · Feature test issues

Findings from walking [09-feature-test-plan.md](./09-feature-test-plan.md) against the
implementation on `hlu/canvas-testing` (2026-07-30). Unit suite green before and after fixes:
`npm test` → 41 files / 481 tests (assertions added inside existing cases).

Legend: **blocker** blocks a DoD case · **major** wrong/missing acceptance behavior ·
**minor** polish or incomplete hardening · **known** documented follow-up, not a regression.

---

## Issues

### ISS-001 — Handback leaves ttyd/tmux alive
| | |
|---|---|
| Case | F4.4 |
| Severity | **major** |
| Evidence | `DaGamaRunService.handback` writes `exit.json` and calls `onExit`, but never `killAttempt`. Cancel/takeover both kill. |
| Expected | After Return to workflow, the human pane is gone; Build advances on a clean seat. |
| Actual | Interactive session can keep running (port/tmux leak; iframe still looks live). |
| Status | **fixed** — see Fixes |

### ISS-002 — Status strip hides gate / block reasons
| | |
|---|---|
| Case | F5.3, spec §4 / 03-ui status strip |
| Severity | **major** |
| Evidence | `RunStateStrip` only renders `reason`/`message` when `status === 'failed'`. |
| Expected | Card shows reason strings like `waiting_for_repair` while `awaiting_approval`. |
| Actual | Amber “Awaiting approval” with no why. |
| Status | **fixed** — see Fixes |

### ISS-003 — Repair-exhaustion gate has no operator surface
| | |
|---|---|
| Case | F5.3 |
| Severity | **major** (also called out in handoff.md) |
| Evidence | `gate_opened` / `waiting_for_repair` on Verify/Review; `decideGate` only accepted Publish; UI kept showing board config editors. |
| Expected | Human can reject the run or authorize another Build repair round. |
| Actual | Stuck at awaiting_approval with editable seat/check config and no actions. |
| Status | **fixed** — see Fixes |

### ISS-004 — Config editors stay visible during non-Publish gates
| | |
|---|---|
| Case | F5.3, 03-ui §3–4 |
| Severity | **minor** |
| Evidence | `showConfig = !liveSeat && !showPublishGate` — Verify/Review `awaiting_approval` is neither. |
| Expected | Gate/run state replaces configuration on the card. |
| Actual | Check list / seat fields editable while the gate is open. |
| Status | **fixed** — with ISS-003 |

### ISS-005 — Polling stops at Publish `awaiting_approval`
| | |
|---|---|
| Case | F3.5, F6.1, F7.1 |
| Severity | **minor** |
| Evidence | `useDaGamaRuns` `isLive` is only `preparing` \| `running`. |
| Expected | Gate view stays fresh if preflight/server state changes (or another tab decides). |
| Actual | One-shot load; no poll until user acts. |
| Status | **fixed** — see Fixes |

### ISS-006 — Codex takeover always disabled (session id never stored)
| | |
|---|---|
| Case | F4.5 |
| Severity | **known** → **fixed** |
| Evidence | Controllers set `sessionId: null` for Codex; UI hides Take control; server returns `SESSION_REQUIRED`. |
| Expected (F4.5) | Rejected / control disabled when session unknown — **pass as fail-closed**. |
| Gap | Live Codex session extraction → store update still unwired (handoff). Takeover cannot succeed even after a real Codex session exists. |
| Status | **fixed** — see Fixes; F4.5 fail-closed still holds until `thread.started` is observed |

### ISS-007 — Publish “base unmoved” uses project tip, not fresh `origin/<base>`
| | |
|---|---|
| Case | F6.1 |
| Severity | **known** → **fixed** |
| Evidence | handoff.md; `readCurrentBaseSha` on project folder. |
| Status | **fixed** — see Fixes |

### ISS-008 — Stranded `ready` after crash leaves run uncancelable / never resumes
| | |
|---|---|
| Case | F7.1, F8.1 |
| Severity | **major** |
| Evidence | Vite can die after `component_ready` and before `attempt_launch_requested`. Reconcile no-oped when `!attempt`; cancel threw `NO_ATTEMPT`; UI hid Cancel because `liveSeat` required an attempt. Seen on `DagamaRefinment` (`run-20260730t191156-3365e26f`). |
| Expected | Restart resumes the ready seat; Cancel finishes the run even with no live attempt. |
| Actual | Run stayed `running` forever with Plan `ready` and no escape hatch. |
| Status | **fixed** — see Fixes |

---

## Cases reviewed (code + unit tests)

| Area | Assessment |
|------|------------|
| F1 Board / start | Covered by board-store + runs intake tests; UI autosave paths previously fixed in 08-build-review |
| F2 Isolation | Clone + `--git-common-dir` covered in runs/git tests |
| F3 Happy path | pipeline.test covers Intake→…→Publish gate; Prompt/artifact APIs present |
| F4 Takeover / handback | takeover.test + ISS-001/006; F4.5 fail-closed until Codex bind |
| F5 Review / repair | pipeline.test exhaustion; ISS-002/003/004 fixes for operator surface |
| F6 Publish | publish.test + PublishGatePane; ISS-007 remote tip; reject/approve unit-covered |
| F7 Restart / reload | reconcile.test; ISS-008 resume ready; AgentSeatPane reconnect path present |
| F8 Cancel | cancel.test; ISS-008 cancel without attempt; second cancel → `RUN_TERMINAL` |

Manual live matrix (claude/codex + tmux + ttyd + `gh`) still required for P0 smoke in §F9.

---

## Fixes

### Fix ISS-001 — kill seat on handback
`DaGamaRunService.handback` now calls `killAttempt` after writing durable `exit.json` and before `onExit` validation (same teardown order intent as cancel: durable fact, then kill, then promote). Test asserts kill of the human-controlled attempt id/tmux name.

### Fix ISS-002 — show reasons on non-failed strips
`RunStateStrip` surfaces `reason` / `message` for `awaiting_approval` and `blocked`, not only `failed`.

### Fix ISS-003 / ISS-004 — repair gate API + UI
- `decideGate` accepts Verify/Review gates with `waiting_for_repair`: **rejected** fails the run; **approved** records `gate_decided` and launches another Build instance (human-authorized round beyond the automatic bound).
- `RepairGatePane` on Verify/Review when `awaiting_approval` + `waiting_for_repair`.
- Board config editors hidden whenever the component is `awaiting_approval`.

### Fix ISS-005 — poll through Publish gate
`isLive` includes `awaiting_approval` so the canvas keeps mirroring the server at the Publish gate.

### Fix ISS-006 — bind Codex session id from stream.jsonl
- Launcher already tees stdout to `stream.jsonl`; controller now watches that file via `watchCodexSession`.
- On `{"type":"thread.started","thread_id":…}`, appends durable `attempt_session_bound` and updates the live attempt.
- Takeover / repair resume stay fail-closed until the id is known; after bind, interactive `codex resume <id>` works.
- Reconcile re-arms the stream watcher when a live attempt still has `sessionId: null`.

### Fix ISS-007 — publish base_unmoved uses fresh remote tip
- `resolveRemoteBaseSha` uses `git ls-remote <frozen remoteUrl> refs/heads/<base>` (fallback: `fetch origin` + `origin/<base>` when no URL).
- Checklist label/detail say `origin/<base>`; local project branch tip is no longer the authority.

### Fix ISS-008 — resume stranded ready + cancel without attempt
- `reconcileProject` calls `resumeReadyPipeline` after seat classification: Plan/Build/Review `ready` with no attempt relaunch via `advance`; Verify `ready` re-runs Verify.
- `cancel` finishes non-terminal runs with no live attempt (`component_failed` + `run_finished canceled`); snapshot/kill path unchanged when an attempt is live.
- UI: stranded `ready` seats show `AgentSeatPane` Cancel (config editors hidden).

---

## Sign-off (this pass)

| Area | Result | Notes |
|------|--------|-------|
| F1 Board / start | code OK | needs manual F1.1–1.4 |
| F2 Isolation | code OK | needs manual F2.* |
| F3 Happy path | code OK | needs manual F3.* |
| F4 Takeover / handback | fixed ISS-001 | needs live Claude F4.2–4.4 |
| F5 Review / repair | fixed ISS-002–004 | needs live F5.2–5.3 |
| F6 Publish | code OK | needs live `gh` F6.3–6.4 |
| F7 Restart / reload | code OK | needs manual F7.2 |
| F8 Cancel | code OK | needs manual F8.1 |

Tester: agent (code review + unit) · Date: 2026-07-30 · Branch: `hlu/canvas-testing`
