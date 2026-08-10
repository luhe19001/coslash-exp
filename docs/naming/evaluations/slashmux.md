# Product name eval — `slashmux`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `slashmux`  
**Pronounce:** *SLASH-mux*  
**One-line meaning:** slash-command multiplexer — one card/dashboard surface combining the state and history of many agent sessions.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Two clear beats |
| Meaning lands without a speech | Y | Slash commands + muxing many session signals into one surface |
| OK under Centauri (companion product, not rename) | Y | |
| Works for free + paid + enterprise tone | Y | Technical, not toy |
| Room for cute mascot (dog / capybara / other) | Y | Dry name; mascot softens |
| Survives “not a log viewer” pivot | Y | Multiplex / control plane |

**Story we would tell:**  
> Coding-agent users repeatedly ask `/context`, `/status`, `/mcp`, and `/usage`. Slashmux multiplexes those checks with agent history and activity into persistent cards and one fleet dashboard.

**Deal-breakers from taste?** Insider jargon outside CLI culture; *mux* is now an established naming pattern for several direct agent-control products.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashmux` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashmux) returned 404 on 2026-07-30 |
| Near names worth noting | Crowded *mux* | `octomux` **taken** (coding-agent fleet dashboard); `agentmux` **taken**; Mux Inc. `@mux/*`; bare `mux` package; `slash-mux` / `getslashmux` clear |

**npm verdict:** ship as `slashmux`  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | |
| RubyGems | Clear | |
| crates.io | Clear | |
| Homebrew | Clear | formula + cask 404 |
| GitHub org | Clear | no user/org `@slashmux` |
| GitHub user | Clear | |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `slashmux.com` | **Unregistered at review** | WHOIS no-match; no A/NS |
| `slashmux.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashmux.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS — strong |
| `slashmux.ai` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| other: `.io` | No registration found | RDAP 404; no A/NS |

**Domain verdict:** unusually clean — pick `.sh` or `.dev`  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| *(none exact `slashmux`)* | — | — | Low |
| [octomux](https://octomux.com/) | Local dashboard for parallel Claude/Cursor agents, with inbox, diffs, and review | **Y** | **High** (same job and same *mux* construction) |
| [AgentMux](https://agentmux.ai/) | Open-source multi-provider agent operating environment with panes, coordination, and governance | **Y** | **High** |
| [agentmux.app](https://agentmux.app/) | Separate commercial orchestrator for coding agents and terminal workflows | **Y** | **High** |
| Mux (mux.com) | Video API for developers | N | Med (owns “Mux” SEO in dev) |
| tmux | Terminal multiplexer | ~ positive assoc | Low–Med |
| slash.co / slash.com | Fintech / Slash brands | ~ | Med (Slash* prefix) |

**Competitor verdict:** only with explicit risk acceptance — exact compound is open, but the market already contains several same-category `*mux` products  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| [AGENTMUX application 99766995](https://trademarks.justia.com/997/66/agentmux-99766995.html) | Class 9; AI-agent orchestration software | Active 2026 application does not match `slashmux`, but materially raises same-market naming risk |

**Trademark verdict:** caution  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 8 letters — sweet spot |
| Dotfolder `.…/` clean | Y | `.slashmux/` |
| Zoom spelling OK | Y | |
| Podcast needs “spelled like…”? | N | |
| Searchable as *our* product? | ~ | Exact compound is unique; category searches are crowded by octomux and multiple AgentMux products |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **22** | Slash commands and multiplexed session cards map directly to the product; *mux* remains insider/crowded |
| B. npm | 20 | **20** | Exact clear |
| C. Competitor | 25 | **5** | Multiple live same-category `*mux` products; AgentMux has a pending software mark |
| D. Registries + GitHub | 10 | **10** | All clear |
| E. Ergonomics | 15 | **10** | Short CLI and unique exact search, but weak spoken/category differentiation |
| F. Domains | 5 | **5** | Broad TLD availability |
| **Total** | **100** | **72** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **~** (no exact match; several high-risk same-pattern competitors) |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Maybe**  

**If Maybe — smallest rename that keeps the idea:**  
> `slashpane` / `slashdeck` if *mux* SEO feels too contested  

**Discuss next:**  
1. Comfort living next to **octomux** (same category, rhyme)  
2. Compare with `slashorch` — mux surface vs orch job word  
3. Grab `slashmux.sh` early if advancing  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill numeric scorecard + band  
