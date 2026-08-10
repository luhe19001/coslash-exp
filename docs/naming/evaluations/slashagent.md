# Product name eval — `slashagent`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `slashagent`  
**Pronounce:** *SLASH-ay-jent*  
**One-line meaning:** slash-command agent view — persistent cards for each coding agent’s state, history, usage, and activity.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Clear; a bit long |
| Meaning lands without a speech | Y | Says agents outright; slash points to their command interface |
| OK under Centauri (companion product, not rename) | Y | |
| Works for free + paid + enterprise tone | Y | Serious enough for enterprise |
| Room for cute mascot | Y | Name is dry; mascot can soften |
| Survives “not a log viewer” pivot | ~ | “Agent” may pin shelf; still better than Log |

**Story we would tell:**  
> Slashagent turns repeated `/context`, `/status`, `/mcp`, and `/usage` checks into persistent per-agent cards, searchable history, activity, and one fleet view.

**Deal-breakers from taste?** Descriptive; less “ownable brand”; Slash* neighborhood; singular “agent” vs fleet.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashagent` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashagent) returned 404 on 2026-07-30 |
| Near names worth noting | Clear | `slash-agent`, `slashagents`, `getslashagent`, `@slashagent/cli` clear |

**npm verdict:** ship as `slashagent`  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | |
| RubyGems | Clear | |
| crates.io | Clear | |
| Homebrew | Clear | |
| GitHub org | **Taken** | `slashagent` org, **0** public repos (squat/empty) |
| GitHub user | Same org | |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `slashagent.com` | Taken | ZA nameservers |
| `slashagent.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashagent.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashagent.ai` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| other: `.io` `.app` `.so` `.co` | No DNS observed | Registration not confirmed |

**Domain verdict:** `.sh`/`.dev` fine; `.com` taken  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [Autopsias/**slashagents**](https://github.com/Autopsias/slashagents) | Small public collection of Claude Code commands, agents, and skills (4 GitHub stars at review) | **Y** coding agents | **Med** (near-exact plural, but limited adoption) |
| Empty GH org `slashagent` | Handle parked | N | Med (org name blocked) |
| slash.com Twin / slashdev.io | Slash + AI agents | ~ | Med (prefix) |

**Competitor verdict:** caution — same neighborhood as Claude Code agent tooling; plural `slashagents` already used  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| none deep-dived | — | Descriptive “slash agent” may be weak mark; Slash* still crowded |

**Trademark verdict:** caution  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | ~ | 10 letters — usable, not sweet-spot |
| Dotfolder `.…/` clean | Y | `.slashagent/` |
| Zoom spelling OK | Y | |
| Podcast needs “spelled like…”? | N | |
| Searchable as *our* product? | ~ | Competing slash+agent hits |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **19** | Slash-command state and per-agent cards fit directly; name remains generic, long, and singular |
| B. npm | 20 | **20** | Exact clear |
| C. Competitor | 25 | **12** | Near-exact Claude toolkit exists, but is small; wider Slash* agent noise remains |
| D. Registries + GitHub | 10 | **5** | Empty org `slashagent` taken |
| E. Ergonomics | 15 | **9** | 10-letter CLI, generic terms, and plural near-match |
| F. Domains | 5 | **4** | `.sh` `.dev` `.ai` likely free; `.com` taken |
| **Total** | **100** | **69** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **~** (slashagents Claude toolkit) |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Maybe**  

**If Maybe — smallest rename that keeps the idea:**  
> `slashfleet`, `slashdeck`, or drop Slash* for clearer ownable word  

**Discuss next:**  
1. OK that GH org `slashagent` is taken (empty)?  
2. Collision with Autopsias/slashagents — avoid or coexist?  
3. Is literal “agent” in the name a feature or a shelf pin?  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill scorecard  
