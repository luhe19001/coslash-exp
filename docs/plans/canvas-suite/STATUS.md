# Canvas Suite Status

Only the master agent edits this file.

## Baselines

| Item                   | Value                                      |
| ---------------------- | ------------------------------------------ |
| Legacy source          | `c13a3ef01438193dcdcd2e387300e69ae3c27437` |
| Archived source branch | Local `archive/canvas-legacy-c13a3ef`; remote publication deferred |
| coSlash base SHA       | `1bfe2e257aa6db3953b4f6448b9725c01388f46a` |
| Integration branch     | `hlu/canvas-migration`                     |

## Tasks

| Task                         | Status  | Agent  | Branch | Base SHA | Result SHA | Tests | Blocker        |
| ---------------------------- | ------- | ------ | ------ | -------- | ---------- | ----- | -------------- |
| 00 Reference baseline        | complete | codex-root-task-00 | `codex/canvas-task-00-reference-baseline` | `c13a3ef01438193dcdcd2e387300e69ae3c27437` | `b20c698369b91b9bb11a928722e64d3c776a3f8b` | 827 tests/build/lint pass; format backlog documented | Accepted locally; remote archive publication and screenshots remain Task 18 follow-ups |
| 01 Plugin contracts          | complete | codex-root | `codex/canvas-task-01-contracts` | `89adab62f546bd0bbc4143aa69d04eb4ebb92d91` | `477c66303864d16b11c9ea99a7abd842d49d1d3c` | Go/TS/vet/lint/format pass | Locally merged in `01aa158` |
| 02 Core registration         | complete | claude-master-task-02 | `claude/canvas-task-02-core-registration` | `477c66303864d16b11c9ea99a7abd842d49d1d3c` | `e5c7550ab62aa74a9447f950965f94f7e8d0d32d` | Original gates plus dependency follow-up `d7b1278`; combined gates pass | Locally merged in `01aa158`; D-010/D-011 ratified |
| 03 RunFS/event store         | complete | codex-root-task-03 | `codex/canvas-task-03-runfs-eventstore` | `477c66303864d16b11c9ea99a7abd842d49d1d3c` | `685540299b233290128115fde7e6e700f5c519eb` | Review fixes + repeated race/vet/full collector pass | Locally merged in `01aa158` |
| 04 Agent/terminal runtime    | complete | codex-root-task-04 | `codex/canvas-task-04-agent-terminal` | `d7b12784da5bd4a8953b59858ce072d178bacff0` | `fc9c2be8bbc599c7a3b558c54a397a0985f3d997` | targeted repeated race, uncached full collector race, vet, coverage, ownership audit pass | Locally merged in `01aa158`; live matrix remains Task 18 |
| 05 Git/artifacts/publication | complete | claude-worker-task-05 | `claude/canvas-task-05-git-artifacts` | `685540299b233290128115fde7e6e700f5c519eb` | `94fe07cad85773683898781ed62cd4f69ae27d75` | Brief race suite, full collector race/vet/gofmt pass | Locally merged in `01aa158` |
| 06 Session detail projection | complete | codex-root-task-06 | `codex/canvas-task-06-session-detail` | `477c66303864d16b11c9ea99a7abd842d49d1d3c` | `c67bd1db61810168741683cf895ac107b6a42c45` | Golden/unit/race/vet/full collector pass | Locally merged in `01aa158`; Task 09 measures integrated latency |
| 07 Frontend plugin shell     | complete | claude-worker-task-07 | `codex/canvas-task-07-frontend-shell` | `477c66303864d16b11c9ea99a7abd842d49d1d3c` | `5d2e6af2b541b351341a7558a0b6232447e1ba95` | Full frontend gates; combined suite 94 tests | Locally merged in `01aa158`; DOM/visual follow-ups remain hardening work |
| 08 Persistence foundation    | complete | claude-worker-task-08 | `claude/canvas-task-08-persistence` | `685540299b233290128115fde7e6e700f5c519eb` | `8e6158ecc064ecfb5dba13d5963f6a0d31c3fb4d` | Race/vet/full collector and frontend gates pass | Locally merged in `01aa158`; follow-ups documented |
| 09 Session backend           | ready | —      | —      | `01aa158ecc322b3dcf4b71e46d278944147ca7b6` | — | — | Dependencies 02, 04, 06, and 08 are complete in the exact base |
| 10 Session frontend          | complete | codex-worker-task-10 | `codex/canvas-task-10-session-frontend` | `01aa158ecc322b3dcf4b71e46d278944147ca7b6` | `75a3adcfb8612e167e5709d3d2652b2f72cb31b7` | 22 focused/116 full frontend tests; build/lint/format plus Canvas race/vet pass | Accepted and locally merged in `a8f2086`; browser matrix remains Task 18 and shared registration remains Task 19 |
| 11 DaGama model/store        | complete | claude-worker-task-11 | `claude/canvas-task-11-dagama-model` | `94fe07cad85773683898781ed62cd4f69ae27d75` | `a6c1bb80674e08ad8e01f41ec286a1d06ceac0f6` | 51 top-level/115 subtests under race plus full collector/vet/gofmt pass | Locally merged in `01aa158`; Task 12 file split accepted |
| 12 DaGama controller         | complete | codex-root-task-12 | `codex/canvas-task-12-dagama-controller` | `a8f208653c9efa821ef1daf4b19cc6aebad080f8` | `780f4bd6f1a1d62ba724850fdd704bf0c4506f11` | Repeated targeted race, full collector race/vet, 118 frontend tests, build/lint/format, review-fix regressions pass | Human-approved result locally fast-forwarded into `hlu/canvas-migration`; I-007 resolved; Task 13 unlocked. |
| 13 DaGama frontend           | ready | —      | —      | `780f4bd6f1a1d62ba724850fdd704bf0c4506f11` | —          | —     | Tasks 07, 11, and 12 are complete in the integration base. |
| 14 Atlas model/store         | review | codex-root-master-task-14 | `claude/canvas-task-14-atlas-model` | `94fe07cad85773683898781ed62cd4f69ae27d75` | `5159f52ee32e400821e42edc6e539645e15c63db` | 25 top-level tests; repeated Atlas race, full collector race/vet, coverage, ownership audit pass | Ready for independent master review and merge; Task 15 file split is recorded in the brief. |
| 15 Atlas controller          | blocked | —      | —      | —        | —          | —     | 04, 05, 14     |
| 16 Atlas frontend            | blocked | —      | —      | —        | —          | —     | 07, 14         |
| 17 Legacy import             | blocked | —      | —      | —        | —          | —     | 08, 11, 14     |
| 18 Hardening/release         | blocked | —      | —      | —        | —          | —     | 09–17          |
| 19 Final integration         | blocked | master | —      | —        | —          | —     | 18             |
