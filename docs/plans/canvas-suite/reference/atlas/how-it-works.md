# Atlas Canvas — How it works

Atlas runs an automated coding pipeline against your project. **Git repos** work
**in place**: on Run, Atlas checks out the Shared Context work branch (board
publish base) in the project folder and agents edit there so successive runs
accumulate. **Plain folders** still get an isolated copy under
`~/.fleetlog/atlas/.../roots/<runId>/`.

```text
Git project     ──checkout work branch──►  same folder   ◄── agents write code here
Plain folder    ──copy──►  Run root                      ◄── agents write code here
Board JSON      ──steering──►  Controllers               ◄── prompts, validate artifacts
```

---

## Pipeline (what triggers what)

Today’s runner still executes a fixed chain. Canvas **trigger edges** (`plan → build → review`) gate whether Run is allowed and whether each hop is **auto** or **manual**. Canvas **feedback edges** (`review → build`) set the repair budget (`maxRounds` 1 or 2) and whether rebuilds are **auto** or wait for **Go**. They do not yet drive arbitrary graphs.

```text
Shared Context  →  Run
                 │
                 ▼
              Intake        (deterministic — stub SOURCE.md / PROBLEM.md; notes via board.instructions)
                 │
                 ▼
         Plan committee     workers → consolidator (N=1 skips consolidator)
                 │  on Plan success
                 ▼
              Build         implements the plan in the worktree
                 │  on Build success
                 ▼
              Verify        runs board check argv (or skips if empty)
                 │
        ┌────────┴────────┐
        │ passed/skipped  │ failed
        ▼                 ▼
     Review            repair Build  (feedback maxRounds, then human gate)
        │
        │ changes_requested
        └──────────────────► repair Build  (same shared budget)
        │
        ▼
   [approve gate]  →  Publish   (git/gh; needs a remote)
```

| Stage | Who runs | Success means | Hands off to |
| --- | --- | --- | --- |
| **Intake** | Controller | `PROBLEM.md` written | Plan |
| **Plan** | N agent workers (+ main refine if N>1) | Final `PLAN.md` promoted | Build |
| **Build** | Agent | Worktree change + `IMPLEMENTATION.md` / patch | Verify |
| **Verify** | Shell argv from board | Checks pass (or none configured) | Review, or repair Build via feedback budget |
| **Review** | Agent | `review.json` + `REVIEW.md` | Approve gate, or repair Build via feedback edge |
| **Publish** | git / `gh` after human approve | Commit / PR | Done |

**Committee fan-out (Plan):** with one worker, that seat writes `PLAN.md` directly.
With two or more, each worker writes `PLAN.draft.md` in parallel. When all exit 0
with a valid draft, the **main** worker is relaunched to read those drafts,
reflect, and refine into promoted `PLAN.md`. That file is what Build reads.

---

## Where the code lives

| What | Where |
| --- | --- |
| Project you opened | e.g. `~/Downloads` or a git repo |
| Boards | `<project>/.fleetlog/atlas/boards/*.json` |
| Run control state | `~/.fleetlog/atlas/projects/<projectId>/runs/<runId>/` |
| **Worktree (git)** | the project folder on the Shared Context work branch |
| **Worktree (plain folder)** | `~/.fleetlog/atlas/projects/<projectId>/roots/<runId>/` |
| Promoted artifacts | `<runRoot>/.fleetlog/run/artifacts/` |
| Per-attempt outputs | `<runRoot>/.fleetlog/run/out/<stage>/<seat>/<attempt>/` |
| Assembled prompt snapshot | `<runRoot>/.fleetlog/run/attempts/.../prompt.md` |

Only one live Atlas run per project (in-place git shares the folder). Publish
commits/pushes the work branch and opens a PR against the repo default branch.

---

## Where control prompts live

Prompts are **layered**. Validation is outside the prompt — exit 0 without the required file still fails (`missing_output`). If the agent writes the required basename at the run-root cwd instead of the attempt out dir, the controller copies it into the out dir before validating.

### 1. You edit on the canvas

| Prompt | UI | Stored on board as |
| --- | --- | --- |
| Role system prompts | Toolbar **Prompts**, or seat **Edit role prompt** | `systemPrompts.{plan,build,review,planRefine}` |
| Seat steering | Seat card → Prompt section | `components[].prompt` |
| Main refine rules (N>1) | Same section, second textarea | `components[].committee.consolidationPrompt` |
| Shared Context notes | **Shared Context** dock | `instructions` |
| Run title (auto) | Board name at Run | Intake stub → `PROBLEM.md` / `SOURCE.md` |

Role system prompts are one copy per role for all future runs of the board
(defaults stay ≤5 sentences). Use `{{OUTPUT_PATH}}` / `{{OUTPUT_JSON_PATH}}` for
the required artifact paths. Per-worker vendor / model / effort / permission live
in the seat card’s **Info** section.

### 2. Controller assembles the real prompt

Code: `frontend/vite/atlas/prompt.ts`

Layers (top → bottom):

1. **Role system prompt** — editable board `systemPrompts` (with path placeholders filled)
2. **Committee note** (multi-worker) — one-line main vs contributor hint
3. **Main refine rules** — from the canvas (main refine attempt only)
4. **Board instructions** — `board.instructions`
5. **Component prompt card** — `components[].prompt`
6. **Artifact path references** — paths to `PROBLEM.md`, prior `PLAN.md`, drafts, verify/review JSON, etc. (bodies are not inlined; the seat opens and reviews each doc itself)
7. **Review turn discipline** — always-on: Read the listed paths, write both outputs, no exploratory Bash/lint/tests (headless `acceptEdits` otherwise burns the turn budget)

Snapshot written before launch:

```text
<runRoot>/.fleetlog/run/attempts/<component>/<instance>/<seatId>/<attempt>/prompt.md
```

Open it from the seat’s Prompt section (“assembled prompt”) while a run is live.

### 3. Controller contracts (not in the prompt text)

| Concern | Location |
| --- | --- |
| Default / editable role prompts | `frontend/src/pages/fleetlog/lib/atlas-system-prompts.ts` |
| Prompt assembly | `frontend/vite/atlas/prompt.ts` |
| Stage advance / triggers | `frontend/vite/atlas/runs.ts` (`afterPlanSucceeded`, `afterBuildSucceeded`, …) |
| Seat launch + artifact promote | `frontend/vite/atlas/controller.ts` |
| Committee naming / drafts | `frontend/vite/atlas/committee.ts` |
| Run allowlist (must be plan→build→review) | `frontend/vite/atlas/board-policy.ts` |
| Model / permission allowlists | `frontend/src/pages/fleetlog/lib/atlas-vocabulary.ts` |

---

## Mental model

```text
Canvas board  =  who runs, with what model, and your steering text
Controller    =  when the next stage starts, what file must exist, pass/fail
Worktree      =  git: project folder on work branch · plain: isolated copy
```

Trigger edges on the canvas declare forward intent (`plan → build → review`).
Feedback edges declare the repair loop (`review → build`, `maxRounds` 1 or 2,
`mode` auto or manual). The **Vite controller** is what actually advances the pipeline after each stage.
