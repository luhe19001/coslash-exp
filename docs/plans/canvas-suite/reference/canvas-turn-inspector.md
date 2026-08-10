# Canvas: bigger board + Turn Inspector + LLM participant

_Design reference — written 2026-07-23. Feature branch: `hlu/canvas-testing`._

## 1. Why (the vision)

FleetLog's Canvas turns one coding-agent session into a spatial "workbench" of
nodes. This work pushes it toward a **manager's cockpit**: engineers now oversee
coding agents like a team of reports. The manager needs to grasp, per user
request/turn, four things without scrolling raw rolling logs:

1. **Intention** — what the user actually wanted.
2. **Plan** — the agent's execution/exploration plan (plan mode or not).
3. **Status** — where execution stands against that plan.
4. **Signals** — findings, issues, and important decisions made/proposed.

Goal: reduce mental load. Answer "what's the plan, where did it go wrong, what
was decided" fast.

## 2. What shipped (3 phases)

| Phase | Deliverable | Key files |
|---|---|---|
| 1 | Canvas world enlarged 1180×790 → **1680×1120**, `MIN_ZOOM` 0.6 → 0.4 | `lib/canvas-workspace.ts`, `components/SessionCanvas.css`, `components/SessionCanvas.tsx` |
| 2a | Parsers emit `turnLog: SessionTurn[]` (per-turn data) | `vite/derive.ts`, `vite/claude-sessions.ts`, `vite/codex-sessions.ts`, `lib/session.ts` (+ tests) |
| 2b | **Turn Inspector** canvas node (prev/next, defaults to current turn) | `components/TurnInspectorPanel.tsx`, `SessionCanvas.tsx`, `canvas-workspace.ts`, CSS |
| 3 | On-demand **LLM read** per turn (intention/approach/status/findings/issues), cached | `lib/turn-analysis.ts`, `hooks/use-turn-analysis.ts`, `TurnInspectorPanel.tsx`, threading in `FleetlogPage.tsx` |

Verification at completion: `tsc -b` clean, `vitest` 75 pass, `oxlint` clean,
`vite build` succeeds.

## 3. Data model

New shared type in `vite/derive.ts`, mirrored in `lib/session.ts`:

```ts
type SessionTurn = {
  index: number;            // 1-based; matches DigestEntry.turn
  prompt: string;           // full user request (6k cap, newlines preserved)
  planText: string | null;  // agent plan prose (ExitPlanMode / update_plan explanation)
  todos: { text: string; done: boolean }[]; // plan/checklist snapshot as of this turn
  toolUses: number;
  errors: number;
  decisions: { question: string; answer: string | null }[];
  fileEdits: string[];      // distinct paths touched this turn
};
// SessionDetail gained:  turnLog: SessionTurn[]
```

Parsers build it via a `turnsByIndex: Map<number, SessionTurn>` on the
accumulator. `currentTurn(acc)` lazily gets/creates the turn for
`Math.max(acc.prompts, 1)` — the **same anchor `pushDigest` already uses** — and
events (tool uses, errors, decisions, todo snapshots, file edits) attribute to
it. `finalizeTurns` sorts by index and de-dupes `fileEdits`.

## 4. Key decisions (with pros / cons)

### D1. Extend the parser AND use the LLM (vs LLM-only / parser-only)
**Chosen: parser extension + LLM synthesis.**
- The data simply didn't exist: only `firstPrompt` was kept in full, later
  prompts were truncated to 280 chars, and agent plans were dropped entirely.
- ✅ Highest fidelity; the LLM reads real prompts/plans, not lossy scraps.
- ✅ Deterministic per-turn view works even without an LLM configured.
- ❌ Most work; touches the intricate vendor parsers.

### D2. New `turnLog` field (vs reusing `turns`)
`SessionDetail.turns` is already a **number** (turn count) read across the
frontend. Added a separate `turnLog: SessionTurn[]`.
- ✅ Zero ripple through existing consumers.
- ❌ Two turn-named fields; mild naming confusion (documented here).

### D3. Turn boundary = each user prompt, anchored by `Math.max(prompts,1)`
- ✅ Consistent with the existing digest anchoring; lazy creation cleanly
  handles pre-first-prompt events (they fall into turn 1).
- ❌ Coarse: a "turn" is one user prompt. Sub-agent / nested task turns are not
  split out. Codex counts `task_started` separately for its `turns` number, but
  `turnLog` keys off user messages — the two turn concepts can differ.

### D4. Capture plan prose that was being dropped
Claude `ExitPlanMode.input.plan`; Codex `update_plan` `explanation` field.
- ✅ Surfaces the actual plan, the manager's #1 ask.
- ❌ Codex extraction is **best-effort regex** (`stringFieldFrom`, double-quoted
  only). Exec-wrapped single-quoted args may miss the explanation. Plan-mode is
  not the only mode; non-plan turns simply have `planText: null` and the UI/LLM
  infers from activity.

### D5. `capText` (new) vs `truncate` (existing)
`truncate` collapses all whitespace → destroys prompt/plan formatting. `capText`
trims + slices but **preserves internal newlines**. Used for `prompt`/`planText`.

### D6. On-demand LLM (vs live auto-monitoring)
**Chosen: analyze the selected turn on click; cache the result.**
- ✅ Matches the app's read-only, on-demand model; no new streaming plumbing.
- ❌ Not truly "real-time" — the manager clicks; it doesn't auto-refresh as an
  agent works. Live monitoring is deferred (see §7).

### D7. Reuse existing LLM plumbing, structured-JSON with tolerant parse
`requestCompletion(config, messages, maxTokens)` → dev-server proxy
`POST /api/llm/complete` → Azure Foundry (non-streaming). Prompt instructs strict
JSON; `parseTurnAnalysis` strips fences, slices `{`…`}`, extracts field-by-field,
falls back to raw text. Mirrors `lib/daily-digest.ts`.
- ✅ Consistent with the codebase; no new provider surface.
- ❌ No schema library, no retry loop. Relies on the tolerant parser + a raw-text
  fallback panel. `maxTokens` must stay large (40960) or reasoning models return
  empty content (hidden reasoning tokens eat the budget).

### D8. Cache analysis in localStorage, keyed by content hash
Key: `fleetlog.turnAnalysis.v1:<sessionId>:<turnIndex>:<hash(prompt+planText)>`.
- ✅ No repeat token spend on turn-switch / reopen; survives refresh.
- ❌ Per-browser only; localStorage quota is best-effort (silent skip on
  failure). Content-hash means a grown transcript re-analyzes (intended).

## 5. Adding a new Canvas node — checklist (learned in 2b)

Only **one** compile-time guard exists: the exhaustive
`Record<CanvasNodeId, string>` `titles` map in `NodeInspector`. Everything else
is a manual list that silently omits a missing node — no type error. Touch all of:
1. `CanvasNodeId` union — `canvas-workspace.ts`
2. `DEFAULT_CANVAS_LAYOUT` entry — `canvas-workspace.ts`
3. `NodeInspector` `titles` map **+ a body block** — `SessionCanvas.tsx`
4. Body component (keep `SessionCanvas.tsx` lean per `frontend/CLAUDE.md`)
5. `<WorkbenchNode id=… {...nodeProps('…')}>` in the render list
6. Wires in the `<svg>` (optional) + jump-command array (note the
   `changes → 'worktree'` label special-case)

## 6. Gotchas to remember

- **Canvas size lives in TWO places** that must stay in sync: the TS constants
  `CANVAS_WIDTH/HEIGHT` (`canvas-workspace.ts`) **and** hardcoded literals in
  `.canvas-world { width; height }` (`SessionCanvas.css`). Changing only one
  silently desyncs the scroll box from the world.
- **Persisted workspace**: `normalizeCanvasWorkspace` returns the full default if
  `version !== 1`. Adding node ids is safe **only while `version` stays 1** —
  new ids get their default layout; unknown stored ids are ignored. Bumping the
  version discards all saved layouts/checkpoints/pins.
- **Server analysis cache** (`AnalysisCache`, in `vite/*`) is in-memory keyed by
  file mtime. New parser fields appear after the dev server reloads (editing a
  `vite/*.ts` file triggers this; otherwise restart).
- **Azure config** lives in `localStorage` (`fleetlog.llmConfig`) in plaintext
  and travels in each proxy request body — no `.env`/server key.
- **Codex decisions** never capture the user's answer inline → `answer: null`.
- `↳` is used in decision text (consistent with existing digest strings); it's
  content, not a UI icon (`frontend/CLAUDE.md` bans glyph icons, allows
  typographic characters in text).

## 7. Not done / future work

- **Live monitoring** (auto-refresh analysis while an agent runs) — needs
  streaming/polling plumbing the app doesn't have. D6 chose on-demand for v1.
- **`parseTurnAnalysis` has no unit test** — worth adding alongside the parser
  tests (mirror `daily-digest` coverage). Parser `turnLog` tests exist in
  `vite/claude-sessions.test.ts` and `vite/codex-sessions.test.ts`.
- **Per-turn timestamps** were intentionally dropped from `SessionTurn` (not
  essential to the feature) — re-add if duration-per-turn becomes useful.
- **Codex plan explanation** capture is best-effort regex (D4) — revisit if plan
  prose is commonly missed.
- **Per-turn todos** snapshot only updates on a todo mutation within that turn;
  turns with no todo activity carry `[]` (UI can fall back to session `todos`).
- Bundle >500 kB warning is **pre-existing / unrelated**.

## 8. Status

All three phases are implemented and verified but **uncommitted** in the working
tree, alongside an also-uncommitted `git merge` of `hl/feature-explorer`
(Daily Digest + LLM settings). Decide commit grouping before committing.
