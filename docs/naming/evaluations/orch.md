# Product name eval — `orch`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `orch`  
**Pronounce:** *ork*  
**One-line meaning:** short for orchestration — control plane for many coding agents.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | 4 letters, punchy |
| Meaning lands without a speech | Y | orch = orchestrate |
| OK under Centauri (companion product, not rename) | Y | |
| Works for free + paid + enterprise tone | Y | Serious, enterprise-OK |
| Room for cute mascot (dog / capybara / other) | Y | Name dry; mascot separate |
| Survives “not a log viewer” pivot | Y | Control-plane word |

**Story we would tell:**  
> Orch is the orchestrator for your coding-agent fleet.

**Deal-breakers from taste?** Category-generic; already used by peers for the same job.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `orch` | **Taken** | [official registry](https://registry.npmjs.org/orch): “Distributed RCP Orchestration Library,” `0.1.4`; [46 downloads in the last month](https://api.npmjs.org/downloads/point/last-month/orch) at review |
| Near names worth noting | Crowded | `@oxgeneral/orch` — **CLI orchestrator for AI agent teams** (`orch` command); `orch-cli`, `orchestrator`, `@aipet/orch` also present |

**npm verdict:** rename — bare `orch` blocked; market CLI already means another agent orch  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Taken | `orch` 0.0.2 |
| RubyGems | Taken | Mesos/Marathon deploy helper |
| crates.io | Taken | “Language model orchestration library” (~15k downloads) |
| Homebrew | Clear | |
| GitHub org | Clear | |
| GitHub user | Taken | since 2019, 2 repos |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `orch.com` | Taken | |
| `orch.dev` | Taken | Cloudflare |
| `orch.sh` | Taken | |
| `orch.ai` | Taken | |
| other: `.io` `.app` `.so` `.co` | Taken | all registered |

**Domain verdict:** Centauri path only — no useful public TLD free  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [ORCH / `@oxgeneral/orch`](https://www.orch.one/) | CLI orchestrator for parallel AI-agent teams (Claude, Codex, Cursor, and others) | **Y** | **High** |
| [Orch](https://orch.live/) | Autonomous desktop AI coding agent for macOS and Windows | **Y** | **High** |
| [gabrielkoerich/orch](https://github.com/gabrielkoerich/orch) | Autonomous task orchestrator routing work to Claude, Codex, OpenCode, and other coding agents | **Y** | **High** |
| crates `orch` | LLM orchestration lib | ~ | Med |
| Many `*orchestrator*` repos | agent fleet tools (AO, etc.) | Y neighborhood | High (word gravity) |

**Competitor verdict:** **avoid**  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| [ORCH application 99183849](https://trademarks.justia.com/991/83/orch-99183849.html) | Class 9; downloadable software development tools | Active application directly covers the candidate in the product field |

**Trademark verdict:** stop / caution  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | Ideal length — already owned in agents |
| Dotfolder `.…/` clean | Y | `.orch/` |
| Zoom spelling OK | Y | |
| Podcast needs “spelled like…”? | N | |
| Searchable as *our* product? | N | Orch/orchestrator sea |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **16** | Meaning is direct, but entirely category-generic and occupied |
| B. npm | 20 | **8** | Stale exact take; real CLI is `@oxgeneral/orch` |
| C. Competitor | 25 | **0** | Multiple live exact-name coding-agent/orchestration products |
| D. Registries + GitHub | 10 | **1** | npm, PyPI, RubyGems, crates, and GitHub identity all taken |
| E. Ergonomics | 15 | **3** | Excellent length, but command, search, and spoken identity are owned |
| F. Domains | 5 | **0** | All major TLDs taken |
| **Total** | **100** | **28** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **N** (exact taken; peer owns `orch` CLI) |
| No high-risk same-name competitor | **N** |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **N** |
| Hard override triggered? | **Yes** — live coding-agent orchestrator named ORCH / `orch` |

**Overall:** **Drop**  

**If Maybe — smallest rename that keeps the idea:**  
> `slashorch`, `orchie`, `getorch` (npm clear), or non-orch metaphor  

**Discuss next:**  
1. Confirm we won’t fight `@oxgeneral/orch`  
2. Keep “orch” only as internal slang?  
3. Prefer `slashorch` as the orch-shaped public name  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill numeric scorecard + band  
