# Product name eval — `slashorch`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `slashorch`  
**Pronounce:** *SLASH-ork*  
**One-line meaning:** slash-command orchestration — one fleet view combining each agent’s context, status, usage, history, and activity.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Two clear beats |
| Meaning lands without a speech | Y | Slash commands become orchestrated fleet state |
| OK under Centauri (companion product, not rename) | Y | |
| Works for free + paid + enterprise tone | Y | Serious enough for enterprise |
| Room for cute mascot (dog / capybara / other) | Y | Dry name; mascot softens |
| Survives “not a log viewer” pivot | Y | Orchestration, not logs |

**Story we would tell:**  
> Instead of checking `/context`, `/status`, `/mcp`, and `/usage` agent by agent, Slashorch assembles those signals with session history and activity into cards and one fleet control surface.

**Deal-breakers from taste?** Slash* brand neighborhood (slash.co / slash.com); “orch” category still crowded, but compound is ownable.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashorch` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashorch) returned 404 on 2026-07-30 |
| Near names worth noting | Clear | `slash-orch`, `getslashorch`, `@slashorch/cli` clear |

**npm verdict:** ship as `slashorch`  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | |
| RubyGems | Clear | |
| crates.io | Clear | |
| Homebrew | Clear | |
| GitHub org | Clear | |
| GitHub user | Clear | |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `slashorch.com` | **Unregistered at review** | WHOIS no-match; no A/NS |
| `slashorch.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashorch.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS — strong |
| `slashorch.ai` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| other: `.io` | No registration found | RDAP 404; no A/NS |

**Domain verdict:** unusually clean — pick `.sh` or `.dev`  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| *(none exact `slashorch`)* | — | — | Low |
| [ORCH / `@oxgeneral/orch`](https://www.orch.one/) | Mature open-source orchestrator for parallel Claude, Codex, Cursor, and other agents | **Y** | **High** (same job and entire suffix) |
| [Orch](https://orch.live/) | Autonomous desktop AI coding agent for macOS and Windows | **Y** | **High** |
| slash.co / slash.com | Slash studio / fintech+agent | ~ | Med (Slash* prefix) |

**Competitor verdict:** caution — exact compound remains distinct, but `orch` is an active same-category product identity, CLI, and command  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| [ORCH application 99183849](https://trademarks.justia.com/991/83/orch-99183849.html) | Class 9; downloadable software development tools | Active application covers the full distinguishing suffix in the same field; counsel required |

**Trademark verdict:** caution  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | ~ | 9 letters — fine, not sweet-spot |
| Dotfolder `.…/` clean | Y | `.slashorch/` |
| Zoom spelling OK | Y | |
| Podcast needs “spelled like…”? | N | |
| Searchable as *our* product? | Y | Unique compound today |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **20** | Slash-derived fleet state fits the control surface; *orch* remains generic and occupied |
| B. npm | 20 | **20** | Exact clear |
| C. Competitor | 25 | **8** | Multiple live ORCH/Orch coding-agent products plus active software mark |
| D. Registries + GitHub | 10 | **10** | All clear |
| E. Ergonomics | 15 | **10** | Unique exact compound; slightly long and easily shortened to a competitor's name |
| F. Domains | 5 | **5** | Broad TLD availability |
| **Total** | **100** | **73** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **~** (not exact compound; high-risk `orch` identity collision) |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Maybe**  

**If Maybe — smallest rename that keeps the idea:**  
> `slashorch` already is the escape from bare `orch`  

**Discuss next:**  
1. Comfort with Slash* prefix vs slash.co/slash.com  
2. Compare with `recapy` — serious orchestration word vs cute mascot word  
3. Grab `slashorch.sh` early if advancing  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill numeric scorecard + band  
