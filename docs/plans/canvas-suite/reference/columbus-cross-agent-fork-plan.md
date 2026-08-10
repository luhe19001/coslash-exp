# Columbus: cross-agent forking (Claude ⇄ Codex)

_Execution plan — rev. 2026-07-28. Supersedes the 2026-07-27 draft._
_Companion to [`columbus-workflow-orchestration-plan.md`](./columbus-workflow-orchestration-plan.md)._

---

## 1. The gesture

From any live agent node, click **Fork** and pick the child's vendor.

| Parent | Child | Mechanism | Fidelity |
|---|---|---|---|
| Claude | Claude | `claude --resume <parent> --fork-session` | Exact — native |
| Codex | Codex | `codex fork <parent>` | Exact — native |
| Claude | Codex | Handoff packet → fresh `codex` | Derived |
| Codex | Claude | Handoff packet → fresh `claude` | Derived |

Child launches in the parent's resolved cwd with a translated config. Parent keeps running.

## 2. Constraint and the measurement that resolves it

Neither CLI can ingest the other's rollout. There is no flag to add, so a cross-vendor fork is a
**context transplant**, not a fork.

The draft's answer was a prose summary. That was wrong. Measured composition of a real 9.7 MB
Claude log from this repo (444 lines, ~2.4M tokens):

| Slice | Size | Verdict |
|---|---|---|
| `user.toolUseResult` | 4.71 MB (48%) | **Duplicate** of the same result in `user.message` — drop |
| `Read`/`Glob`/`Grep` results | 4.45 MB (46%) | Child shares the cwd — **re-derivable**, replace with pointer |
| Bash / Edit / Write results | 0.05 MB | Mostly re-derivable via `git diff`; errors are not |
| Assistant text + thinking + tool params + user prompts | **0.39 MB (4%)** | The actual signal |

**~96% of a session log is duplicated or re-derivable.** The parent's context does not need to be
copied; it needs to be *pointed at*. A cleaned transcript lands at ~80–100k tokens and is
**lossless in the ways that matter** — exact paths, exact error text, exact dead ends — which a
summarizer destroys.

Three reasons raw JSONL still can't be handed over as-is:

1. **Size** — 2.4M tokens raw; ~100k cleaned still eats most of a fresh window on turn one.
2. **Format tax** — JSON scaffolding, uuid chains, nested content arrays burn tokens and attention.
3. **Replay risk** — a transcript reads as instructions. Codex seeing `assistant: now I'll run the
   migration` may re-run it. Framing and per-line tagging are mandatory, not cosmetic.

## 3. Architecture: the handoff packet

Two files, **only one of which is loaded**.

```text
<cwd>/.fleetlog/handoffs/<child-node-id>/
  brief.md        ~6-12k chars  · LOADED via the opening prompt · an index, not a summary
  transcript.md   ~50-400k chars · REFERENCED by path · the child greps it on demand
```

The child is an agent with file tools sharing the parent's working tree. Let it pull detail lazily
instead of paying for it upfront. This beats brief-only (nothing is lost — detail is recoverable)
and beats transcript-only (no context blowout). It also makes the brief a much easier artifact to
get right: an index that points at ground truth, rather than a summary that must *be* ground truth.

> **Naming note:** `composeHandoffPrompt` already exists at `columbus-workspace.ts:386` for
> board-edge prompt composition. Unrelated layer. New server modules use `handoff-*`; do not merge.

## 4. What exists today

| Layer | Location | Today |
|---|---|---|
| Node model | `columbus-workspace.ts:51` | `forkOf: string \| null` — parent id only, no vendor/kind |
| Normalize | `columbus-workspace.ts:158`, `:183` | Coerces `forkOf` to a string |
| Factory | `columbus-workspace.ts:494` `createForkedAgentCluster` | `{...parent.config}` verbatim; **no parent→child edge** |
| Codex discovery | `columbus-workspace.ts:414` `matchColumbusAgentSessions` | Matches on `session.cwd === terminal.config.cwd` + launch time |
| UI trigger | `columbus/AgentTerminalNode.tsx:227` | Single icon button |
| Auto-launch | `columbus/AgentTerminalNode.tsx:190` | Fires when `node.forkOf` set; `forkAgent` at `:175` |
| Forked card | `columbus/AgentTerminalNode.tsx:282` | "Forked from" + parent id |
| Client | `columbus-agent.ts:87` `forkAgent` | `POST /api/agent/fork` |
| Route | `vite.config.ts:733` | Guard `:737`; newline flatten `:744`; 8k cap `:748`; fork branch `:759` |
| Command | `terminal.ts:180` `buildForkCommand` / `:145` `buildLaunchCommand` | Both flatten newlines and shell-quote |

Three facts that constrain the work:

1. **Prompt is single-line and ≤8,000 chars** (`vite.config.ts:744`, `:748`). Markdown cannot ride
   in the prompt. It goes to disk; the prompt points at it.
2. **Codex ids are discovered, not chosen.** The handoff route must return the server-resolved
   absolute `cwd` or `matchColumbusAgentSessions` never matches.
3. **Claude ids are chosen** — the child node UUID becomes `--session-id`. The asymmetry is fine;
   don't paper over it.
4. **Logs exceed V8's max string length.** Use `readLines`/`parseJsonLines` (`vite/jsonl.ts`) and
   stream. Never `readFileSync` a rollout.

## 5. Data model

```ts
export type ColumbusForkKind = 'native' | 'handoff';

export type ColumbusForkOrigin = {
  parentSessionId: string;
  parentAgent: ColumbusAgentKind;
  kind: ColumbusForkKind;
  packetDir: string | null;            // handoff only
  packetStatus: 'pending' | 'ready' | 'failed';
  notes: string[];                     // downgrade/truncation warnings for the card
};
```

`ColumbusTerminalNode.forkOf` becomes `ColumbusForkOrigin | null`.

Migration in `normalizeNode` (`columbus-workspace.ts:183`) — v1 boards store a bare string:

```ts
function normalizeForkOrigin(v: unknown, agent: ColumbusAgentKind): ColumbusForkOrigin | null {
  if (v == null) return null;
  if (typeof v === 'string')
    return v ? { parentSessionId: v, parentAgent: agent, kind: 'native',
                 packetDir: null, packetStatus: 'ready', notes: [] } : null;
  // object form: require a non-empty parentSessionId, else null.
}
```

Unrecognised object → `null` (plain node). A fork node with a bogus parent auto-launches a broken
command; degrading to a normal node is strictly safer.

**Lineage edge.** `createForkedAgentCluster` must emit
`{ id: \`${parent.id}->${child.id}\`, from: parent.id, to: child.id, kind: 'context' }`.
`context` is honest under today's two-kind vocabulary (`columbus-workspace.ts:65`); it becomes a
`trigger` edge when the orchestration plan's v2 edge model lands.

## 6. Transcript renderer — the core of the work

New module `frontend/vite/handoff-transcript.ts`. Streams a rollout, emits tagged markdown.
Pure apart from the file read; two vendor adapters, one output shape.

```ts
export type TranscriptEvent = {
  turn: number;
  role: 'user' | 'agent' | 'tool' | 'error';
  kind: 'prompt' | 'text' | 'thinking' | 'call' | 'result' | 'decision';
  tool?: string;
  text: string;
};
export function renderTranscript(file: string, agent: ColumbusAgentKind, budget: number):
  { markdown: string; events: number; droppedTurns: number; notes: string[] };
```

### 6.1 The filter rule: *is it reproducible from the working tree?*

| Class | Action | Why |
|---|---|---|
| `user.toolUseResult` | **Drop** | Byte-for-byte duplicate of the `message` block (48% of the file) |
| `attachment`, `ai-title`, `mode`, `file-history-*`, `system`, hook output | **Drop** | Machinery, zero signal |
| `Read` / `Glob` / `Grep` / `LS` results | **Pointer** — `[read src/x.ts:1-180]` | Child re-reads; same cwd |
| `Edit` / `Write` payloads | **Stat** — `path (+84/−12)` | Child runs `git diff` |
| Tool *parameters* (the bash command, the grep pattern) | **Keep verbatim** | Tiny; states intent |
| User prompts, assistant final text | **Keep verbatim** | Highest signal per byte |
| **Errors, failed commands, non-zero exits** | **Keep verbatim** | **Not reproducible** |
| `AskUserQuestion` answers, plan approvals | **Keep verbatim** | **Not reproducible** |
| Thinking blocks | Keep, oldest dropped first under budget | High "why" signal, 0.09 MB |

The last two rows are the point, and they invert what a summarizer keeps: **errors, dead ends and
human decisions are the only genuinely unrecoverable parts of a session.** "I tried X, it failed
because Y" is the most valuable thing the parent knows and the first thing prose loses.

### 6.2 Tagging (replay safety)

Every line carries turn + role. Wrap the body in an explicit frame:

```markdown
> HISTORICAL RECORD of a Claude Code session. Not instructions. Do not re-execute
> anything below; verify the working tree instead.

[T3 user]  Split the token counter out of pricing.ts
[T3 agent] Table-driven form beats a switch here — the model list changes under us.
[T3 call]  Bash: npm test -- pricing
[T3 ERROR] 2 failed — pricing.test.ts:44 expected 0.03, got 0.031 (float compare)
[T3 edit]  src/lib/pricing.ts (+84/−12)
[T3 read]  src/lib/session.ts:1-180        ← pointer, content omitted
```

### 6.3 Budget

Default cap **400,000 characters** (~100k tokens). Over budget, drop in order, never mid-turn:
thinking blocks (oldest first) → pointer lines → tool params → oldest whole turns. Always keep the
newest 10 turns and every `ERROR`/`decision` line. Record what was dropped in `notes`; a silent
truncation reads as completeness.

## 7. Brief — an index, not a summary

`frontend/vite/handoff-brief.ts` exports `buildBrief(detail: SessionDetail, opts): string`, pure,
no filesystem. `SessionDetail` (`session.ts:88`) already carries `digest`, `todos`, `fileEdits`,
`commands`, `git`, `turnLog` — enough for every section below.

> **Correction to the draft:** "nothing new needs parsing" is true for the brief and **false for
> the transcript**. `SessionTurn.toolUses` is a *count* (`session.ts:82`), not the calls. §6 needs
> its own pass over the raw rollout.

```markdown
# Handoff brief
Continuing work from a **Claude Code** session. It is still open elsewhere — you cannot ask it questions.

- Parent `a1b2c3…` (claude) · 14 turns · started 2026-07-27 14:02
- cwd `/Users/x/code/project` · branch `feature/parser`
- **Full transcript: `.fleetlog/handoffs/<id>/transcript.md`** — grep it for detail. 312 events, 0 dropped.

## Objective            <digest 'goal', else firstPrompt>
## Open todos           <todos, unchecked first>
## Files changed        <fileEdits: path +adds/−dels, uncommitted unless noted>
## Decisions made       <TurnDecision pairs — Q → A>
## Known failures       <every ERROR line from §6, deduped — this is why the transcript exists>
## Where to pick up     <last assistant turn, condensed>

Verify the working tree before redoing anything listed as done — the parent is still working.
```

Cap **12,000 chars**; drop order: decisions detail → files-changed detail → oldest todos. Never
drop objective, transcript pointer, known failures, where-to-pick-up, or the caveat. Over-cap after
mandatory sections → emit anyway with a note.

### 7.1 Redaction

Both files pass through one scrubber (env assignments, `Bearer`, `sk-`/`ghp_`, `.env` contents)
before write. Same requirement as orchestration plan §8.3 — **one module, used in both places.**
The transcript makes this materially more important than the draft assumed: it carries raw command
output, so it *will* contain whatever the parent's shell printed.

### 7.2 Location

`<cwd>/.fleetlog/handoffs/<child-node-id>/` — matches the orchestration plan's `.fleetlog/` root, so
one `.gitignore` entry covers both. Write to temp siblings, `rename` into place. Not writable →
fall back to `~/.fleetlog/handoffs/<id>/` and say so on the card. Append `.fleetlog/` to
`.gitignore` **only if one already exists**.

## 8. Config translation

New pure module `frontend/src/pages/fleetlog/lib/fork-presets.ts` — one source of truth for the UI
preview and the launch path.

**Permission / sandbox.** `''`↔`''`, `plan`↔`read-only`, `acceptEdits`↔`workspace-write`,
`auto`→`workspace-write`. **`bypassPermissions` and `danger-full-access` map to `''` plus a note.**
Hard requirement: consent to a dangerous setting on a Claude node is not consent to it for a Codex
process in the same repo. Reaching it stays a deliberate per-agent act.

**Model** — by tier, unknown → `''` (a wrong `--model` fails the launch):

| Tier | Claude | Codex |
|---|---|---|
| default / unknown | `''` | `''` |
| fast | `haiku` | `gpt-5.6-luna` |
| balanced | `sonnet` | `gpt-5.6-sol` |
| deep | `opus` | `gpt-5.6-terra` |

**Effort** — Codex→Claude drops it. Claude→Codex sets `medium` only if it is a member of
`codexEffortOptions(mappedModel)` (`columbus-workspace.ts:116`), else `''`.

**cwd** — always the server-resolved parent cwd. Never client-supplied.
**Title** — `${parent.title} → Codex` (handoff) / `${parent.title} (fork)` (native).

## 9. Server

### 9.1 `POST /api/agent/handoff-fork`

Added to the existing middleware's route guard (`vite.config.ts:737`).

```text
{ id, agent, parentSessionId, model, mode, effort, prompt, config }
→ { ok, url, port, cwd, writable, sessionId, launchedAt, attachCommand, packetDir, notes }
```

1. Reuse the id/agent/prompt guards at `vite.config.ts:744`.
2. `readClaudeSessionDetail(parentSessionId) ?? readCodexSessionDetail(parentSessionId)` — the id
   resolves the vendor; the caller must not have to declare the *parent's* vendor. 404 if neither,
   409 if `detail.cwd` is gone.
3. `renderTranscript(detail.logPath, parentVendor, 400_000)` → redact → atomic write.
4. `buildBrief(detail, { targetAgent, transcriptPath, failures, notes })` → redact → atomic write.
5. `buildLaunchCommand({...})` — **existing** builder at `terminal.ts:145`, unchanged. A handoff
   fork is a fresh launch.
6. `spawnEmbeddedAgent(…)` — unchanged.

Opening prompt (single line, well inside the cap; `buildLaunchCommand:165` flattens and quotes):

```text
Read <briefPath> first — a handoff brief for work already done by a <vendor> session here.
It points to a full transcript you can grep. Continue from where it left off; verify the
working tree before redoing anything it lists as done.
```

User's dialog text appended when present.

### 9.2 Guard the native route

`vite.config.ts:767` resolves the parent by the **requested** agent, so a cross-vendor native fork
fails as "parent session or its working directory was not found" — misleading. Resolve by id and
return 400 `parent session is a Codex session — use a handoff fork` on mismatch.

### 9.3 Two routes, deliberately

One route with a `kind` flag invites a future "fall back to handoff when native fails", which would
silently hand users derived context when they asked for exact context. Keep them separate.

## 10. Client

- **Menu** — replace the button at `AgentTerminalNode.tsx:227` with a popover; both vendors always
  listed, marked `exact` / `packet`. Keep the `node.sessionId` gate: disabled with
  `title="Waiting for the session log — fork available once it appears"`.
- **Note for the child** — textarea in the menu, appended to the opening prompt. *"You fix the
  tests, I'll keep refactoring"* is the actual reason people fork. Highest-value affordance here.
- **`handoffForkAgent(id, parentSessionId, config, prompt, terminalConfig)`** in `columbus-agent.ts`,
  shaped like `forkAgent` (`:87`); `packetDir` + `notes` added to `AgentStartResult`.
- **Card** (`AgentTerminalNode.tsx:282` grows a handoff branch) — `⑂ Handoff from Claude Code`,
  `◌ Building packet…` → `Brief · Transcript` links, `◌ Launching Codex…`, plus any `notes`
  (sandbox downgrade, truncation, `~/.fleetlog` fallback). Both links open via the existing
  `/api/render` route (`vite.config.ts:976`) — markdown is already a renderable extension
  (`session.ts:33`). Reading exactly what the child was told is what makes a transplant trustworthy.
- **Auto-launch** (`:190`) — dependency `node.forkOf` → `node.forkOf?.parentSessionId`; dispatch on
  `forkOf.kind`. **Retry must not rebuild the packet when `packetStatus === 'ready'`** — a retry
  after a ttyd port failure relaunches against the packet on disk, not a re-derivation from a parent
  that has since moved on.

## 11. Failure modes

| Case | Behavior |
|---|---|
| Parent id resolves to neither vendor | 400 before any spawn |
| Native fork requested across vendors | 400, "use a handoff fork" (§9.2) |
| Parent cwd deleted | 409, no tmux session |
| Parent has zero turns | Packet still written; objective = first prompt; note on card |
| Rollout > V8 string limit | Streamed via `jsonl.ts`; never `readFileSync` |
| Packet write fails (read-only repo) | `~/.fleetlog/handoffs/`; fail only if that also fails |
| Transcript over budget | Truncate per §6.3, note on card, launch |
| Brief over budget after mandatory sections | Write anyway, note, launch |
| Codex child id never discovered | Terminal usable, log node unbound — existing behavior, don't regress |
| Two forks of one parent in flight | Distinct child UUIDs → distinct packet dirs and tmux names |
| Parent dies mid-fork | Irrelevant — the packet is a snapshot. Do not block on parent liveness |

## 12. Tests

**New**

- `vite/handoff-transcript.test.ts` — `toolUseResult` never emitted; Read results become pointers;
  **errors and AskUserQuestion answers survive every budget level**; budget drops in the specified
  order and never mid-turn; Claude- and Codex-sourced rollouts produce the same event shape;
  a truncated final line parses (live rollout).
- `vite/handoff-brief.test.ts` — deterministic section order; empty todos / no edits / no commands
  render or omit cleanly; mandatory sections never dropped; transcript pointer always present.
- `lib/fork-presets.test.ts` — every table entry both directions; unknown → `''`;
  **`bypassPermissions` never yields `danger-full-access` and vice versa**; mapped effort is always
  a member of `codexEffortOptions(mappedModel)`.
- Redaction: shared scrubber catches `sk-`/`ghp_`/`Bearer`/env assignments **in raw command output**.

**Extended**

- `columbus-workspace.test.ts` — legacy string `forkOf` migrates to `native`; malformed → `null`;
  `createForkedAgentCluster` emits the lineage edge; cross-vendor cluster carries the *translated*
  config.
- `terminal.test.ts` — brief-pointer prompt shell-quotes paths with spaces and apostrophes.

**Manual, four runs** — Claude→Codex and Codex→Claude in a real repo: child reads the brief, greps
the transcript when it needs detail, does not redo completed work, parent unaffected.

**Fixture:** check in one real redacted rollout and assert the ~96% reduction holds. That ratio is
the plan's load-bearing assumption; a regression in it is a regression in the feature.

## 13. Execution order

**Phase A — plumbing.** `ColumbusForkOrigin` + migration; `fork-presets.ts` + tests; lineage edge;
fork menu with cross-vendor entries disabled. Native forks unchanged. Ships alone.

**Phase B — the packet, offline.** `handoff-transcript.ts` + `handoff-brief.ts` + redaction, driven
by a CLI script against real logs. **No UI, no route.** Read the output yourself and iterate on the
filter rules until a Codex session could plausibly continue from it. This is where the feature is
won or lost, and it costs nothing to get wrong here.

**Phase C — wire it up.** `/api/agent/handoff-fork`, atomic writes, native-route guard,
`handoffForkAgent`, card states, packet links via `/api/render`.

**Phase D — polish.** Note-for-the-child, `.gitignore` handling, downgrade notices.

**Phase E — fold into orchestration.** The packet becomes an input binding and trigger payload; a
Reviewer step is *declared* as Codex reviewing a Claude implementer and the scheduler assembles the
packet as part of prompt assembly.

A + B + C is the shippable milestone.

## 14. Why before the scheduler

It forces the vendor-neutral context envelope into existence early, under manual control, where a
bad packet is visible immediately instead of corrupting an automated four-step run. And because the
transcript is *lossless* rather than summarized, the scheduler inherits an envelope that survives
composition — a summary of a summary degrades; a filtered transcript does not.

"Have Codex review what Claude just wrote" is useful on its own, today, with no scheduler.

## 15. Implementation status — 2026-07-28

Phases A–C are built and green (186 tests, clean typecheck and lint).

| Module | Purpose |
|---|---|
| `lib/agent-options.ts` | Launch vocabularies, split out so the fork translation and the workspace model don't import each other |
| `lib/fork-presets.ts` | Config translation + the no-escalation rule |
| `vite/redact.ts` | Shared scrubber |
| `vite/handoff-transcript.ts` | Streaming Claude/Codex → tagged markdown |
| `vite/handoff-brief.ts` | The index + opening prompt |
| `vite/handoff-packet.ts` | Atomic write, `.gitignore`, read-only fallback |

**Measured on real logs — better than the estimate in §2.** Reduction is 93–99%, packets land at
17–34k tokens rather than the ~100k budgeted, and nothing has yet needed budget-driven truncation.
Render time is 10–50 ms.

**Five defects the offline checkpoint (§13 Phase B) caught before any UI existed** — all now fixed
with regression tests. This is the phase paying for itself:

1. Redaction matched `TOKEN` inside `max_output_tokens`, scrubbing every token-accounting line into
   noise. Credential names now must not be plural or metric-shaped.
2. The auth-scheme rule fired on the English word "token" in prose (`fork token double-counting`).
   `Token` now requires a credential-shaped value; `Bearer`/`Basic` stay loose.
3. Codex records each assistant message twice — as `event_msg.agent_message` *and*
   `response_item.message` — doubling the narrative.
4. Codex exec results nest a JSON envelope *inside* the "Script completed / Output:" banner, so
   failures rendered as the banner plus a wall of escaped `\r\n`. Banner comes off first, then the
   envelope.
5. Errors were clipped head-first, keeping the preamble and discarding the diagnosis. They now clip
   from both ends, and a failure that cleans to nothing says so.

**Not done, deliberately:** the four manual cross-vendor runs from §12. Those spawn real agents in a
real repo and are yours to drive. Route guards are verified against a live server — a cross-vendor
native fork returns 400 in both directions, an unknown parent 404, a missing parent id 400 — but no
successful handoff has been launched end to end.

Also outstanding: Phase D polish (the "note for the child" textarea is wired through
`handoffForkAgent` but has no input in the fork menu yet).

## 16. Open decisions

1. **Transcript budget** — 400k chars (~100k tokens) proposed. Higher preserves more; lower leaves
   the child more room. Cheap to tune after Phase B on real output.
2. **Ship the transcript at all in v1?** Brief-only is less work. Recommendation: no — the brief's
   value comes from pointing at ground truth, and without the transcript it degrades into exactly
   the lossy summary this rev exists to avoid.
3. **Thinking blocks in the transcript** — 0.09 MB, high "why" density, but cross-vendor exposure of
   another model's reasoning is odd. Recommendation: include, drop first under budget.
4. **LLM condensation** — dropped from this rev. Pointing at a transcript beats summarizing it, and
   it removes the question of sending proprietary session content to the Foundry proxy. Revisit only
   if real transcripts prove unusably noisy after Phase B.
5. ~~Embed the parent's diff?~~ **Resolved: no.** Same reason as everything else — the child shares
   the working tree and can run `git diff`. Revisit only if the two agents ever get separate
   worktrees.
