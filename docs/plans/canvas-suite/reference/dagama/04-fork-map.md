# 04 · Fork map

DaGama is created by forking Columbus's canvas surface and sharing everything below it. Columbus keeps
working unchanged. This document is the contract that makes those two boards coexist without corrupting
each other.

## 1. Shared, not forked

Forking any of these would be a mistake — either it splits user settings, or it duplicates a registry
that must stay single.

| Shared module                                                                                                            | Why sharing is correct                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `components/canvas/{types,wire,CanvasNode,ZoomControls,use-canvas-node-interaction}`                                     | Pure geometry and prop-driven chrome; already shared by two boards     |
| `components/SessionCanvas.css`                                                                                           | Owns all `.canvas-node*` chrome; statically imported so always bundled |
| `lib/agent-options.ts`                                                                                                   | Vendor vocabularies (models, modes, efforts) — pure tables             |
| `lib/terminal-config.ts`                                                                                                 | The `/api/terminal/*` client                                           |
| `hooks/use-terminal-config.ts`, `use-llm-config.ts`                                                                      | App-level settings singletons; forking would split user settings       |
| `vite/terminal.ts`                                                                                                       | tmux/ttyd argv builders, port scanning, `commandExists`                |
| `vite.config.ts` → `terminalPlugin()`, `agentPlugin()`, `fsCheckPlugin()`, `renderFilePlugin()`, `agentSessionsPlugin()` | Canvas-agnostic; keyed by caller-supplied id                           |
| `components/ui/*`, `lib/utils.ts`                                                                                        | Design system                                                          |

**The single most important sharing rule:** the ttyd/tmux registry — the module-level
`terminals` Map in `vite.config.ts` — must stay **one map**. Port allocation excludes ports already held
by live entries, so two maps means two exclude sets and two canvases racing onto the same port. DaGama
must not register a second copy of `terminalPlugin()`/`agentPlugin()`.

To make that sharing explicit rather than accidental, the registry moves into
`vite/terminal-registry.ts` and both the existing plugins and DaGama import the same singleton. That is
a mechanical extraction with no behaviour change.

## 2. Forked, with the exact reason

| Columbus                                      | DaGama                                  | Why                                                             |
| --------------------------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `components/ColumbusCanvas.tsx`               | `components/DaGamaCanvas.tsx`           | Different board model: components and a run, not freeform nodes |
| `components/ColumbusCanvas.css`               | `components/DaGamaCanvas.css`           | Own class prefix (see §3.2)                                     |
| `lib/columbus-workspace.ts`                   | `lib/dagama-board.ts`                   | Board definition replaces the node graph                        |
| `lib/columbus-boards.ts`                      | `lib/dagama-boards.ts`                  | New storage keys and API prefix                                 |
| `hooks/use-columbus-boards.ts`                | `hooks/use-dagama-boards.ts`            | Same autosave/conflict logic, repointed imports                 |
| `vite/columbus-boards.ts`                     | `vite/dagama/board-store.ts`            | New `.fleetlog` subdirectory and route prefix                   |
| `components/columbus/ProjectPickerDialog.tsx` | shared, with the storage path as a prop | Currently hardcodes `.fleetlog/columbus/boards` in its copy     |
| `components/columbus/BoardActionsMenu.tsx`    | shared, generic over the summary type   | Behaviour is identical                                          |

The autosave machinery in `use-columbus-boards.ts` — the 350 ms debounce, the 120 ms browser-draft
write, the `PROJECT_NOT_OPEN` reopen-and-retry, and the revision-conflict handling — is reused verbatim.
It is the most subtly correct code in the Columbus stack and there is no reason to rewrite it.

## 3. Collision rules

Each rule below is a real corruption path, not a style preference.

### 3.1 localStorage keys

Columbus owns these five. DaGama must use distinct strings:

```text
fleetlog.columbusWorkspace.v1          →  fleetlog.dagamaBoard.v1
fleetlog.columbusArchives.v1           →  (DaGama has no browser archives)
fleetlog.columbusProject.v1            →  fleetlog.dagamaProject.v1
fleetlog.columbusBoard.v1.<projectId>  →  fleetlog.dagamaBoardId.v1.<projectId>
fleetlog.columbusDraftMetadata.v2      →  fleetlog.dagamaDraftMetadata.v1
```

**Why this is corruption, not inconvenience.** `normalizeColumbusWorkspace` accepts any object with
`version: 1` and silently drops nodes whose `kind` it does not recognise, plus every edge touching them.
Autosave then writes the normalised result back 120 ms later. One tab switch would permanently destroy
the other board's content. The draft-metadata key is worse: `draftMatches` would compare the other
canvas's `{projectId, boardId, revision}` and drive conflict recovery against the wrong file.

Shared keys that must **not** be forked: `fleetlog.terminalConfig`, `fleetlog.llmConfig`,
`fleetlog.canvasSessionId`, `fleetlog.digestPrompt`, `fleetlog.dailyDigestWindow`, and the
`fleetlog.turnAnalysis.v1:*` cache (keyed by session + turn + prompt hash, so sharing is a cache hit).

DaGama board documents must also **not** claim `version: 1`. They use their own discriminant so that a
Columbus normalizer confronted with a DaGama file rejects it instead of mangling it.

### 3.2 CSS

Three classes of leak, in decreasing obviousness:

1. **`.columbus-*` selectors** — safe to rename wholesale to `.dagama-*`.
2. **Unprefixed globals hiding in `ColumbusCanvas.css`** — `.canvas-node-kind-terminal|note|log|spec`
   and `.canvas-node.canvas-node-status-starting|live|error`. Both stylesheets are always in the bundle,
   so if DaGama emits the same class names it silently inherits Columbus's colours, and if it redefines
   them, whichever file loads last wins **for both boards**. DaGama uses `.dagama-node-*` exclusively.
3. **`canvas-node-<id>`** — `CanvasNode` derives a class from the raw node id, and `SessionCanvas.css`
   defines `.canvas-node-terminal|note|context|changes|turn`. DaGama's component ids
   (`intake`, `plan`, `build`, `verify`, `review`, `publish`) deliberately avoid all five.

Two rules that are easy to miss and produce silent visual bugs:

- Copy the zoom-control positioning override. `SessionCanvas.css` positions `.canvas-zoom-controls`
  with `position: sticky`, which needs a scrolling ancestor; a panning stage has `overflow: hidden`, so
  without `.dagama-stage > .canvas-zoom-controls { position: absolute; … }` the cluster lands in the
  wrong place.
- The pan-exclusion selector must name DaGama's own toolbar class. Columbus's copy reads
  `closest('.canvas-node, .columbus-toolbar, .canvas-zoom-controls')`; reusing that string verbatim
  means clicking the DaGama toolbar starts a board pan and clears the selection.

Do not carry forward the dead selector `.columbus-node:hover ~ .columbus-handle` — no element ever
receives a `columbus-node` class.

### 3.3 Server routes

Every `/api/*` middleware in this codebase ends the response and never calls `next()` on an unmatched
sub-route. **Registering a second plugin on an existing prefix makes it entirely dead code**, because
connect runs middlewares in registration order and the first one swallows the request.

- DaGama board storage and run control mount on `/api/dagama/*` — a new prefix.
- DaGama **reuses** `/api/terminal/*`, `/api/fs/check`, `/api/render`, and `/api/sessions`.

### 3.4 On-disk paths

```text
<project>/.fleetlog/columbus/boards/   Columbus boards      (unchanged)
<project>/.fleetlog/dagama/boards/     DaGama boards        (new)
<project>/.fleetlog/handoffs/          handoff packets      (shared; keyed by fresh UUID)
~/.fleetlog/dagama/projects/<id>/      DaGama run state     (new, outside the project)
```

If the boards directory were shared, Columbus's `listBoards` — which parses every `*.json` in the
directory — would surface DaGama boards as `CORRUPT_BOARD` load errors, or load and normalize-destroy
them.

Run state lives outside the project on purpose: it is large, machine-specific, and contains transcripts.
Board definitions stay in the project because they are meant to be committed and shared.

### 3.5 Terminal identity

Two live issues in the shared terminal layer:

**Imported sessions collide by construction.** Columbus's `createImportedAgentCluster` sets the node id
to the session id, so importing one logged session into both boards produces the same `terminals` key,
the same tmux session, and the same port. Deleting the node in one board tears down the other board's
live terminal. DaGama sidesteps this entirely: its terminal keys are attempt ids
(`<runId>/<componentId>/<instance>/<seatId>/<attempt>`), never a session id, so they cannot collide with
a Columbus node id.

**The tmux namespace is flat.** `sanitizeTmuxName` produces `fleetlog_<id>` with no canvas attribution.
DaGama's attempt-id-derived names begin `fleetlog_dagama_`, which makes `tmux ls` legible and guarantees
no overlap with Columbus's UUID-derived names. Columbus's own prefix is left alone — changing it would
orphan the persistent tmux sessions of existing boards.

**Codex discovery-claim race — avoided rather than fixed.** Columbus matches a freshly launched Codex
agent to a rollout by cwd plus launch time, claiming from only the terminals it was passed. Two boards
polling with unresolved Codex terminals in the same directory can both claim the same rollout. DaGama
does not participate: it reads the thread id out of the structured `codex exec --json` stream, so it
never guesses and never claims. Columbus's behaviour is unchanged and remains a known limitation there.

### 3.6 Tab wiring

Four edits that must land together, two of which TypeScript will not catch:

| File                   | Change                                                                   |
| ---------------------- | ------------------------------------------------------------------------ |
| `FleetlogTabMenus.tsx` | add `'dagama'` to the `ViewMode` union **and** to the `VIEW_MODES` array |
| `FleetlogTabMenus.tsx` | add the `<TabsTrigger value="dagama">`                                   |
| `FleetlogPage.tsx`     | add the render branch                                                    |
| `FleetlogPage.tsx`     | extend **both** `immersive` expressions (header and page shell)          |

Omitting the `VIEW_MODES` array entry makes clicking the tab **throw** through `assertOneOf`. Omitting
either `immersive` expression is a silent layout bug — the board renders with the session-list header,
filter bar, and footer still present — because `Section = ViewMode | 'digest'` widens automatically.

## 4. Test conventions to match

- vitest, `npm test`. No `vitest.config.*`; the runner reads `vite.config.ts` for the `@` alias and
  defaults to `environment: 'node'`.
- **There is no DOM environment and no testing-library.** Component rendering, `window`, and
  `localStorage` are untestable as configured. This is why DaGama's domain logic — board normalisation,
  prompt assembly, artifact validation, the scheduler's transition function, argv builders, revision
  capture — lives in pure modules under `vite/dagama/`, and React stays a thin rendering layer.
- Test files sit next to their module as `<module>.test.ts`. `src/` tests import extensionless; `vite/`
  tests import with the explicit `.ts` extension.
- Server-side tests use `fs.mkdtempSync` with an `afterEach` cleanup. Use a DaGama-specific prefix so
  parallel runs never share a temp directory.
