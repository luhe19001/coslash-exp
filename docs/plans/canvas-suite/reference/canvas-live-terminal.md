# Canvas: embedded live terminal (resume-in-place)

_Design reference & findings — written 2026-07-23. Feature branch: `hlu/canvas-testing`._

## 1. Why (the vision)

Previously, "resuming" a session from the Canvas was an off-canvas action: the
NEXT MOVE node POSTed to `/api/resume`, and the dev server ran `osascript` to pop
open a **macOS Terminal.app** window running `claude --resume <id>` (or
`codex resume <id>`). The manager left the cockpit to actually drive the agent.

Goal: bring a **real, interactive terminal onto the canvas itself** — type a next
prompt, hit send, and the session resumes live in an embedded panel. No popup, no
context switch. Then: **merge** it with NEXT MOVE so there is a single "compose →
resume live" surface.

## 2. What shipped

| Piece | Deliverable | Key files |
|---|---|---|
| Server | `terminalPlugin` with `/api/terminal/{start,status,stop,preflight}`; spawns `ttyd` serving a persistent `tmux` session on loopback; in-memory registry; cleanup on shutdown | `vite.config.ts`, `vite/terminal.ts` (+ `vite/terminal.test.ts`) |
| Client lib | Config trio (writable / persistTmux / port range) + fetch wrappers | `lib/terminal-config.ts`, `hooks/use-terminal-config.ts` |
| Client UI | Combined **NEXT MOVE · LIVE TERMINAL** canvas node: prompt composer → live `<iframe>` terminal with restart/stop/copy-attach + reconnect | `components/TerminalPanel.tsx`, `components/SessionCanvas.tsx`, `lib/canvas-workspace.ts`, `SessionCanvas.css` |
| Settings | New "Terminal" tab in the (renamed) `SettingsDialog` | `components/SettingsDialog.tsx`, `FleetlogPage.tsx` |

Removed in the merge: the separate `resume` canvas node, `ResumeSessionButton.tsx`,
and the config `enabled` toggle (the terminal is now the sole canvas resume path).
The `/api/resume` (Terminal.app) endpoint is left intact but is no longer called
from the canvas.

Verification: `tsc -b` clean, `oxlint` clean, `vitest` 80 pass, live end-to-end
smoke against a real session (start → serve → status/reuse → stop cleanup).

## 3. Architecture

```
Browser (canvas)                Vite dev server plugin            Host
────────────────                ──────────────────────           ────
TerminalPanel                   POST /api/terminal/start
  compose prompt  ───────────▶    resolve cwd (readClaudeSessionDetail)
                                  preflight ttyd+tmux
                                  findFreePort(7681..7781)
                                  tmux new-session -d  ──────────▶ tmux session
                                    "<resumeCommand>; exec $SHELL"   (persistent)
                                  spawn ttyd -i 127.0.0.1 -p N ──▶ ttyd (loopback)
  <iframe src=                 ◀── { url: http://127.0.0.1:N/ }        │
   http://127.0.0.1:N/> ◀───────────── HTTP + WebSocket ──────────────┘
```

- **ttyd** serves a full xterm.js terminal over HTTP/WebSocket. **tmux** makes the
  session persistent and attachable, so `tmux attach -t fleetlog_<id>` from a real
  Terminal mirrors the canvas panel live.
- The panel reconnects on mount via `/status` (the ttyd/tmux process outlives a
  React remount / browser refresh).
- Config travels in the request body → the server stays stateless (mirrors the
  `/api/llm/*` proxy pattern).

## 4. Findings (the non-obvious stuff)

### ttyd embeds directly in a cross-origin iframe — no reverse proxy needed
The plan hedged on X-Frame-Options blocking the iframe. Probing the installed
**ttyd 1.7.7** showed it sends **no `X-Frame-Options` and no CSP**, **inlines all
assets** into a single ~730 KB HTML page, and **does not check the WebSocket
Origin** by default. So a plain `<iframe src="http://127.0.0.1:<port>/">` works
cross-origin with zero proxy code. This dropped an entire HTTP+WS proxy layer.
_If a future ttyd build adds framing headers_, switch to a same-origin proxy that
strips them and start ttyd with `-b /api/terminal/<id>` (its URLs already live
under that base) — the design leaves a comment marking this path.

### Port-free detection must be a connect probe, not a bind probe
The original `isPortFree` bound `127.0.0.1:<port>` with Node's default
`SO_REUSEADDR`. A pre-existing ttyd on the machine bound the **wildcard**
`0.0.0.0:7681` (`tmux attach -t phone`, from the reference doc). With
`SO_REUSEADDR`, a loopback bind **falsely succeeds** against a wildcard listener,
so 7681 was reported free — our ttyd then failed to bind, but `waitForPort` saw
the *other* ttyd and reported success (the browser hit the wrong terminal).

Fix: detect with a **TCP connect probe** (`net.connect` to `127.0.0.1:<port>`) —
anything reachable answers; `ECONNREFUSED` means free. This is authoritative
regardless of the other server's bind address. See `isPortInUse` in
`vite/terminal.ts`.

### `spawn`, not `spawnSync`, for ttyd
The existing one-shot action (`osascript`) uses `spawnSync` because it returns
immediately. ttyd is **long-lived** — it must be `spawn`ed and its handle kept in
the registry so it can be killed on `/stop` and on server shutdown
(SIGINT/SIGTERM/exit + `httpServer` close). Otherwise a dev-server restart leaks
ttyd processes.

### Keep a live shell after the agent exits
The tmux command is `<shell> -lc "<resumeCommand>; exec <shell>"`. The trailing
`exec $SHELL` means when the resumed agent exits, the pane drops to an interactive
shell instead of dying — exactly like a real Terminal window. `tmux -c <cwd>`
sets the start dir (replacing the old `cd <cwd> &&`).

### Headless `tmux capture-pane` is misleading; the browser is the source of truth
`capture-pane` came back blank for a resumed session because (a) agents like
Claude/Codex use the **alternate screen buffer**, and (b) a fresh `exec $SHELL`
can clear scrollback via shell init. This is a headless-snapshot artifact only —
ttyd renders the live PTY faithfully in the browser. Don't gate verification on
`capture-pane`; verify the HTTP 200 + xterm page + tmux session existence instead.

### Adding a canvas node touches ~5 coordinated spots
`CanvasNodeId` union → `DEFAULT_CANVAS_LAYOUT` → `NodeInspector` titles record →
`<WorkbenchNode>` render → optional wire + command-palette entry. Removing
`resume` from the union let TypeScript enumerate every reference to clean up.
`normalizeCanvasLayout` iterates `NODE_IDS` (derived from `DEFAULT_CANVAS_LAYOUT`
keys) with per-node fallback, so adding/removing a node auto-migrates saved
localStorage workspaces — no version bump needed.

## 5. Prerequisites & security

- `brew install ttyd tmux` (macOS). `/start` preflights and returns
  `501 MISSING_BINARY` with the install hint if absent.
- ttyd binds `-i 127.0.0.1` only (loopback) — unreachable off-box.
- `-W` (writable) is gated by the settings toggle; omit for a read-only mirror.
- No auth on the loopback ttyd for this MVP (`ttyd -c user:pass` available later).
- macOS-only, consistent with the existing AppleScript resume.

## 6. Edge cases handled

- ttyd/tmux missing → 501 + install hint (panel shows `brew install …`).
- Port in use → connect-probe skips it; range exhausted → `503`.
- Session cwd gone → `409` (reuses the existing resume checks).
- Multiple sessions → distinct ports + `fleetlog_<sanitized id>` tmux names.
- Repeat start → returns the existing live terminal (`reused: true`), no double-spawn.
- Server restart → ttyd killed on shutdown; tmux left alive (persistence);
  `/status` reports `live:false` so the client offers a fresh start.
