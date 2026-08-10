# 08 · Build review

_Reviewed 2026-07-29 against `../columbus-canvas-findings.md`, the DaGama specs, and the full working
diff. Revised the same day after M2 landed._

## Verdict

M0–M6 are done. DaGama has a separate fixed six-component canvas, project-backed board storage with
optimistic revisions and a server-side policy gate, durable runs (append-only event log, isolated git
clone, controller-computed revisions, deterministic Intake), Plan / Build / Review agent seats end to
end (bounded launcher + `exit.json`, artifact promotion, live ttyd), Verify as an argv-only command
runner with `verification.json`, bounded Verify/Review→Build repair, Review verdict normalisation +
mutation guard, a Publish approval gate that commits, pushes, and opens or updates exactly one PR,
restart reconciliation (`unknown_after_restart` when ambiguous), Cancel with patch snapshot then kill,
and Take control / Return to workflow as recorded ownership attempts (D6).

v1 definition of done in [01-spec.md](./01-spec.md#6-v1-definition-of-done) is met. Remaining work is
hardening (Codex session wiring, repair-exhaustion Approve UI, board-configurable bounds) rather than
another milestone.

No unresolved M0–M2 blocker remains after the fixes below. M3 landed the seat shape M4–M5 reused.

## Material issues found and fixed

### 1. Agent profile edits could make a board permanently unsaveable

Changing vendor cleared model, effort, and permission to empty strings with the expectation that the
normalizer would fill them back in. The live editor does not normalize before autosave, and the server
correctly rejects those empty execution fields. Changing a model had the same problem for effort. The
Add check action also began with an invalid empty check.

The editor now replaces a vendor with a complete safe default profile, preserves or resolves effort
when the model changes, and creates a valid editable `npm test` check. The server remains fail-closed.

### 2. Draft recovery and project switching had data-loss paths

The hook claimed Columbus-style recovery but only cached unbound drafts. On reload, a modified unsaved
draft could be replaced by the project's most recent saved board. Switching projects while an autosave
was pending could also let the old board save through the newly selected project reference.

DaGama now caches the live board with `{ projectId, boardId, revision }` metadata, resumes autosave only
when that metadata still matches disk, surfaces a conflict when it does not, preserves an unbound
modified draft, and flushes dirty saved boards before changing projects. This brings the behavior back
in line with the collision and recovery contract in `04-fork-map.md`.

### 3. The Run button was an enabled no-op

With no project it was disabled, and with a project it was enabled but did nothing because M2 was not
implemented. M2 replaced it with the real run dialog and preflight preview from `03-ui.md`. It is still
disabled without a **saved** board — a run pins to a board revision, so an unsaved board has nothing to
run — and the tooltip names which precondition is missing rather than giving one generic reason.

## M2 issues found and fixed

### 4. An append after a crash-torn line destroyed two records

Found by writing the torn-line test, not by reading the code. A crash between an append and its fsync
leaves a final line with no newline; the next append then concatenated onto it, corrupting both the
torn record and the new one, and leaving a log that no longer parsed from a cold start.

The parser now reports how many bytes of the file are trustworthy, and the store truncates the
unterminated tail before appending. The rule it encodes: an event is durable only once its terminating
newline is on disk. A complete-looking line that lost its newline is discarded too, because it is
indistinguishable from one that was never finished.

### 5. The runs hook discarded its own run list

The stale-response guard was a shared request counter. The initial load fires the list request and the
remembered-run request together, so whichever incremented second invalidated the other — leaving the
run list permanently empty on open. The guard now holds the **project**, which is what it was actually
meant to discriminate on, and the polling effect keys off the run id rather than the run object so it
stops rebuilding its interval on every tick.

### 6. The error path had its own error path

`component_failed` carried the raw error message, and git errors can run to kilobytes. The store
correctly refuses an over-sized event, so recording a failure could itself throw and leave the run with
no terminal event at all. Failure messages are now bounded — safe to truncate, because unlike an argv
token or an artifact, prose does not change meaning when shortened.

### 7. The artifact route trusted a hardcoded list

It matched the requested name against a constant. It now matches against the run's own recorded
outputs, which the controller wrote — so a traversal cannot appear in the allowlist, and an artifact the
run never produced cannot be read even when a file of that name exists on disk.

### 8. Two inherited dev-server exposures closed

`/api` had no origin or content-type check, and `/api/render` passed agent-authored raw HTML through
`marked` on our own origin. Both are now fixed (`vite/api-guard.ts`; a markdown-only renderer plus a
`sandbox` CSP) and both are covered by tests. The third, `ttyd`'s missing origin check, is still open and
is explained in `07-open-questions.md` — it needs a browser to re-verify the embed, and breaking every
terminal would be worse than the exposure. Do it with M3.

## Verification

- `npm test`: 30 files, 418 tests passed (M0–M1 was 24 / 265).
- `npm run build`: TypeScript and production build passed.
- `npm run lint`: passed with the same six existing Fast Refresh warnings outside DaGama.
- Prettier: clean across every DaGama implementation file and the docs touched here. The full-repository
  check still reports pre-existing unformatted files outside this work.

Both M2 exit criteria were verified twice — in the suite, and live against a running dev server:

- `run.json` deleted by hand replayed from `events.jsonl` to a byte-identical file.
- Across a real run, the user's repository was unchanged: identical `git status --porcelain`,
  `.git/index` hash, and `git show-ref`. The run root reported its own `--git-common-dir`, listed none of
  the user's worktrees, and created no branch in the user's repo.

The live pass also confirmed the guard fixes: a cross-site POST is refused 403, a form-encoded POST 415,
a mismatched `Origin` 403, while the same-origin DaGama journey — open project, save board, preview,
start run, read an artifact — still completes. `/api/render` escaped an embedded `<script>`, dropped a
`javascript:` link while keeping its visible text, retained a legitimate `https:` link, and sent the CSP.

**Still not done: the canvas has had no live visual/interaction pass.** Every verification above is API-
and suite-level. There are no React DOM tests by construction, so one manual pass is still worth doing:
open DaGama, switch each seat's vendor/model, add and edit a check, save, reload, reopen, start a run,
open an artifact from the Intake card, switch projects, and switch between Columbus and DaGama.

## Big-picture assessment

The architecture is pointed in the right direction, and M2 strengthened the case: the event log as sole
authority, the clone rather than a linked worktree, and controller-computed revision identity are the
three decisions everything later leans on, and all three are now exercised by tests that assert
invariants rather than behaviour.

The next meaningful risk is M3. Durable run state and clone isolation are proven; what is unproven is
the exit protocol — reading completion from a record the agent's own shell wrote, rather than from
terminal liveness or a confident final sentence. Everything after M3 is repetition of that shape, so it
is worth getting slowly. Keep the milestone order as written, and fix the `ttyd` origin check while a
live pane is already on screen.
