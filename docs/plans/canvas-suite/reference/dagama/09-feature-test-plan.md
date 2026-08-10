# 09 · Feature test plan

Manual acceptance checklist for DaGama v1. Unit tests in `frontend/vite/dagama/*.test.ts` cover
invariants; this plan is what a human walks through against a live project with `claude`/`codex`,
`tmux`, `ttyd`, and (for Publish) authenticated `gh`.

Mapped to [01-spec.md §6](./01-spec.md#6-v1-definition-of-done). Check a box only when the observed
behavior matches the expected result.

## Setup

```bash
cd frontend
npm install   # if needed
npm test      # suite green before manual runs
npm run dev
```

- Open **DaGama** (not Columbus).
- Choose a real git project with a github.com `origin` if you will exercise Publish.
- Save a board: Plan + Build + Review seats configured; Verify checks optional (empty = skipped).
- Prefer a tiny source (“Add a one-line comment to README”) so agent turns finish quickly.

Record: project path, board name, run id(s), PR url (if any).

---

## F1 · Board save and run start

**DoD 1**

| # | Steps | Expected |
|---|--------|----------|
| 1.1 | Edit Plan seat (vendor/model) and Verify checks; wait for autosave | Board saves; no policy error |
| 1.2 | Reload the page; reopen the project | Same board and revision resume |
| 1.3 | **Run workflow** with typed text source | Run creates; Intake succeeds; Plan launches |
| 1.4 | Start a second run from a local `.md` file | Intake `SOURCE.md` matches the file |

---

## F2 · Isolated run worktree

**DoD 2**

| # | Steps | Expected |
|---|--------|----------|
| 2.1 | Note `git status` in the project before Run | Clean or known dirty state |
| 2.2 | Let Plan/Build edit files in the run | Previewed run root gains changes |
| 2.3 | `git status` / `git rev-parse` in the **project** folder | Untouched vs pre-run tip; no new commits from the run |
| 2.4 | Confirm run root is a clone (own `.git`), not a linked worktree of the project | `--git-common-dir` is inside the run root |

---

## F3 · Happy path pipeline

**DoD 3, 10**

| # | Steps | Expected |
|---|--------|----------|
| 3.1 | Run with empty Verify checks | Intake → Plan → Build → Verify(`skipped`) → Review without manual copy |
| 3.2 | Open Prompt on Plan while running | Exact assembled prompt visible |
| 3.3 | After Plan succeeds, inspect `PLAN.md` artifact | Promoted content matches the seat output |
| 3.4 | After Build, inspect `IMPLEMENTATION.md` + change summary | Diff matches worktree edits |
| 3.5 | After Review approved, Publish card shows gate | Status `awaiting_approval`; preflight checklist loads |

---

## F4 · Live seats, takeover, handback

**DoD 4, 5**

| # | Steps | Expected |
|---|--------|----------|
| 4.1 | During Plan, confirm ttyd iframe shows the real Claude/Codex TUI | Interactive pane, not a log dump |
| 4.2 | **Take control** while Plan is running (Claude with known session) | New attempt; ownership `human_controlled`; Build does not start |
| 4.3 | Edit / finish work in the pane; ensure required artifact is present | Out dir has `PLAN.md` (seeded or written) |
| 4.4 | **Return to workflow** | Same validation as automated exit; on success Build advances |
| 4.5 | Take control with Codex when `sessionId` is null | Rejected / control disabled — no silent launch |
| 4.6 | Handback with missing required artifact | Component `failed` (`missing_output`); no downstream advance |

---

## F5 · Review fail-closed and repair bound

**DoD 6**

| # | Steps | Expected |
|---|--------|----------|
| 5.1 | Force Review `changes_requested` (or malformed `review.json` via a fixture board/run if easier) | Fail closed; no Publish gate |
| 5.2 | Let Verify fail (add a failing check, e.g. `false`) | Repair Build launches (instance 2) |
| 5.3 | Fail Verify/Review until repair exhaustion | `gate_opened` / `waiting_for_repair`; run stays `running`; max Build instances = 3 |
| 5.4 | Review that mutates project files | `reviewer_mutated_worktree`; no approval |

---

## F6 · Publish gate and idempotency

**DoD 7, 8**

| # | Steps | Expected |
|---|--------|----------|
| 6.1 | On Publish gate, open preflight | Checklist items reflect remote, base, change, etc. |
| 6.2 | **Reject** | Run ends failed / gate rejected; no push |
| 6.3 | New run to approved Review; **Approve & publish** | Commit + push + exactly one PR; link shown |
| 6.4 | Approve again on the same revision (or retry publish) | Same PR updated/reused — not a second PR |

---

## F7 · Reload and Vite restart

**DoD 9**

| # | Steps | Expected |
|---|--------|----------|
| 7.1 | Mid-Plan: reload the browser only | Run still listed; **reconnect** restores ttyd; no second Plan spawn |
| 7.2 | Mid-Plan: stop Vite (`Ctrl-C`), restart `npm run dev`, reopen project | Reconcile runs; if `exit.json` landed, Plan promotes once and pipeline continues |
| 7.3 | Kill Vite after `attempt_launch_requested` but before a healthy launched session (or remove tmux) | Plan `failed` with `unknown_after_restart`; no duplicate tmux; Retry available |
| 7.4 | Vite restart while Plan running and tmux still alive | Watcher re-armed; later exit promotes once; Build can advance (board snapshot loaded) |

---

## F8 · Cancel

**DoD 11**

| # | Steps | Expected |
|---|--------|----------|
| 8.1 | During Build, edit a file in the run root; press **Cancel** | `cancel-snapshot.patch` under the attempt dir; tmux/ttyd dead; run status `canceled` |
| 8.2 | Cancel again | Rejected (run already terminal) |
| 8.3 | Confirm project worktree still untouched | Same as F2 |

---

## F9 · Smoke matrix (quick)

Run when you only have ~20 minutes. One happy path + one failure + one lifecycle check.

| Priority | Case |
|----------|------|
| P0 | F3.1 + F6.3 (full path to one PR) |
| P0 | F7.2 (Vite restart mid-seat) |
| P1 | F4.2–F4.4 (takeover → handback) |
| P1 | F8.1 (cancel preserves snapshot) |
| P2 | F5.2–F5.3 (repair / exhaustion) |

---

## Sign-off

| Area | Pass | Notes |
|------|------|-------|
| F1 Board / start | | |
| F2 Isolation | | |
| F3 Happy path | | |
| F4 Takeover / handback | | |
| F5 Review / repair | | |
| F6 Publish | | |
| F7 Restart / reload | | |
| F8 Cancel | | |

Tester: _______________  Date: _______________  Branch: _______________
