# Atlas Canvas

Headless, committee-capable fork of the DaGama automated pipeline. DaGama stays
terminal-visible and single-seat; Atlas does not.

**How it works** (pipeline triggers, run root, prompt layers): [how-it-works.md](./how-it-works.md).

## Board model (schemaVersion 2)

Editable boards are a **graph of agent seats**, not a fixed six-stage rail:

- Each component is an agent seat: title, prompt, model/committee, and
  **required outputs** (basenames the seat must produce).
- Users can **add** and **delete** seats from the toolbar / node chrome.
- Directed **trigger** edges are drawn by dragging a connect handle from one
  seat onto another. The midpoint control toggles **auto** vs **manual**: auto
  advances the next seat when the upstream stage succeeds; manual waits for
  **Go** on that edge.
- Directed **feedback** edges (dashed, reverse) connect Review → Build for the
  repair loop. The midpoint control toggles **auto** vs **manual** (same as
  triggers) and **1×** vs **2×** automatic rebuilds after the first Build;
  exhaustion opens the human repair gate. Dragging the reverse of a trigger
  (or Review onto Build) creates feedback.
  Each seat card stacks Prompt → Info → Committee status in one node.

`schemaVersion: 1` boards (six fixed components) are migrated on load: Intake /
Verify / Publish drop out of the editable graph; Plan / Build / Review become
agent seats with `legacyRole` and `plan → build → review` trigger edges.

## How it differs from DaGama

| | DaGama | Atlas |
| --- | --- | --- |
| Seats | Live ttyd terminal + Take control | Headless tmux only; status cards |
| Fan-out | One seat per stage | N workers → main refine (N=1 skips refine) |
| Storage | `.fleetlog/dagama/`, `/api/dagama` | `.fleetlog/atlas/`, `/api/atlas` |
| Board tag | `schemaVersion: 1` | `kind: "atlas"` + `schemaVersion: 2` |

## Pipeline (run bridge)

Phase 1 still executes the classic automated pipeline when the board is the
starter chain:

```text
Intake → Plan committee → Build committee → Verify → Review committee → [approve] → Publish
```

**Shared Context** (floating dock) holds the project picker, optional board name
when unsaved, and shared notes (`board.instructions`) that every seat prompt
receives. Toolbar **Prompts** (or seat **Edit role prompt**) edits the Plan /
Build / Review system prompts once for all future runs of the board. Seat cards
still hold optional per-stage steering. The toolbar **Run** button starts a run
without a separate source form — Intake gets a short stub titled with the board
name; real steering comes from Shared Context notes, role prompts, and seat
prompts. Toolbar **Reset** clears seat prompts, role system prompts, and Shared
Context notes, and stops watching the active run, while keeping seats, edges,
models, and layout — so the same workflow can target another project.

The project folder does **not** need to be a git repository. **Git projects**
run in place on the Shared Context work branch (agents edit the project folder
so changes accumulate between runs; only one live run per project). **Plain
folders** are still copied into an isolated run root with a local git identity
(publish stays unavailable without a remote). Publish PRs target the repo
default branch while pushing the work branch.

Run is allowed only when the board has seats with `legacyRole` plan / build /
review and trigger edges `plan → build → review`. Freeform seats and custom
wiring can be edited and saved; starting a run on them is blocked until a
graph-driven runtime ships.

Defaults on a new board: **one worker per seat** (Plan / Build / Review), with
feedback `review → build` at **auto** + **1×** (toggle mode and rounds on the edge).

Use **Add worker** on a seat card to attach extra workers with their own
Claude/Codex settings. With one worker there is no refine phase. With two or
more, one worker is tagged **Main**; all workers write `PLAN.draft.md` in
parallel, then the main worker is relaunched to read sibling drafts and refine
into promoted `PLAN.md`. **Main refine rules** appear in the Prompt section when
N>1.

## Monitor

Each seat’s Committee section shows launch / running / exit for every worker and
the main refine attempt. Click a worker to open its Fleetlog session detail (same
sheet as the list view), or a status dialog when no session id is bound yet.
After a worker exits, its produced filenames appear under the row; the document
button opens those attempt outputs (e.g. `PLAN.draft.md`). If one worker fails,
use **Retry** on that row (or **Retry failed**) — successful sibling drafts are
kept. There is no terminal iframe.

Board **Duplicate** and page refresh carry seat prompts, role system prompts, and
Shared Context notes from the live board / browser draft.

## Report

When a run finishes (succeeded / failed / canceled), `REPORT.md` is written at the
run root and can be opened from run artifacts on the seat that produced them.

## localStorage keys

```text
fleetlog.atlasProject.v1
fleetlog.atlasBoardId.v1.<projectId>
fleetlog.atlasDraft.v1
fleetlog.atlasDraftMetadata.v1
```

Never share these with Columbus or DaGama keys.
