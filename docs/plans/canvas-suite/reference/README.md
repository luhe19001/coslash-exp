# Legacy Canvas reference

Design and analysis documents for the Canvas products as they existed in the
Fleetlog repository, at baseline `c13a3ef01438193dcdcd2e387300e69ae3c27437`.

They are kept because the Fleetlog checkout is being retired and this is the
only remaining record of *why* the products work the way they do. Nothing here
describes the coSlash implementation — for that, read the code and the task
records one directory up.

**Treat every file here as history, not as instruction.** Several describe a
runtime coSlash deliberately did not carry across: privileged Vite middleware,
ttyd-backed terminals, and browser-local persistence. Where a document and the
shipped behavior disagree, the code is right and the document is old.

## What is here

| Path | What it is |
| --- | --- |
| `00-original-migration-proposal.md` | The first-pass migration plan, 2026-08-08, written against `coslash/main@1bfe2e2`. Superseded by the task package one directory up, but it records the reasoning that package assumes and never restates — why the legacy branch is a behavior reference and test corpus rather than something to merge. |
| `dagama/` | The DaGama product: spec, architecture, UI, fork map, build plan, decisions, open questions, build review, feature test plan, and known feature issues. The most complete legacy design set. |
| `atlas/` | Atlas overview and how-it-works. Thin next to DaGama's; the Atlas design is better recovered from `MASTER_PLAN.md` and the Atlas task briefs. |
| `canvas-live-terminal.md` | The legacy embedded-terminal design, back when it was ttyd in an iframe. coSlash replaced this with a native PTY over a guarded WebSocket (decision D-004), so this is the *before* picture. |
| `canvas-turn-inspector.md` | Session Canvas turn inspection. |
| `columbus-*.md` | Columbus workflow orchestration, cross-agent fork analysis, and canvas findings. **Columbus was not ported.** Kept because the findings informed DaGama and Atlas, and because deleting the only copy alongside the repo that held it would lose analysis nobody can redo. |

## What is deliberately not here

The Fleetlog product-naming documents, which have nothing to do with Canvas.
They remain in the Fleetlog checkout.
