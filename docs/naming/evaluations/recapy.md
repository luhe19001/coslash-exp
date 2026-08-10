# Product name eval — `recapy`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `recapy`  
**Pronounce:** *ree-CAP-ee* or *reh-CAP-ee*  
**One-line meaning:** re- + capy(bara) — calm interop host; “recap” ear also = session digest / handoff summary.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Soft, duckie-length |
| Meaning lands without a speech | ~ | Capy story needs one beat; “recap” helps |
| OK under Centauri (companion product, not rename) | Y | Standalone product word |
| Works for free + paid + enterprise tone | ~ | Cute; enterprise may want more serious twin |
| Room for cute mascot (dog / capybara / other) | Y | Capybara *is* the face |
| Survives “not a log viewer” pivot | Y | Not pinned to logs |

**Story we would tell:**  
> Recapy is the calm layer agents sit on — capybara interop — and the place you recap / hand off work across vendors.

**Deal-breakers from taste?** Possible “recap app” shelf; more importantly, the capybara story now overlaps directly with Capy, a coding-agent fleet product.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `recapy` | **Clear** | [official registry endpoint](https://registry.npmjs.org/recapy) returned 404 on 2026-07-30 |
| Near names worth noting | Mostly clear | `capy` taken; `recappy`, `getrecapy`, `@recapy/cli` clear |

**npm verdict:** ship as `recapy`  

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
| `recapy.com` | Taken / aftermarket | Afternic |
| `recapy.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `recapy.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS — good CLI home |
| `recapy.ai` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `recapy.io` | Taken | Live recap site |
| other: `.app` `.so` `.co` | No DNS observed | Registration not confirmed |

**Domain verdict:** can launch on `.sh` / `.dev` / Centauri path; `.com`/`.io` contested  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [Capy](https://capy.ai/yc) / [YC profile](https://www.ycombinator.com/companies/capy) | Active AI-native development environment for orchestrating fleets of coding agents in parallel from one dashboard | **Y** | **High** — same job, same capybara root/mascot territory |
| [Recapy (App Store)](https://apps.apple.com/ly/app/recapy-ai-youtube-summary/id6742327277) | AI YouTube / podcast summarizer | ~ AI, not coding agents | **Med** |
| [Recapy.io](https://recapy.io/) | TV / movie / book recaps | N | Med (exact-name SEO) |
| Tiny GH repos | hobby / agent email draft named recapy | ~ | Low |

**Competitor verdict:** caution — the exact string is distinct, but the intended “re-capy” story sits beside a live fleet-agent twin named Capy; recap products add a second source of confusion  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| none checked in depth | — | App Store Recapy may have marks — counsel if advancing |

**Trademark verdict:** caution — talk to counsel before lock  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 6 letters — `recapy run` |
| Dotfolder `.…/` clean | Y | `.recapy/` |
| Zoom spelling OK | Y | R-E-C-A-P-Y |
| Podcast needs “spelled like…”? | ~ | Once: “re-capy, like capybara” |
| Searchable as *our* product? | N/~ | Recap apps muddy Google; “capy coding agents” resolves to the direct competitor |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **17** | Easy + mascot-ready, but the capy story is no longer ownable in-category |
| B. npm | 20 | **20** | Exact clear |
| C. Competitor | 25 | **7** | Capy is a live coding-agent fleet product; recap apps add SEO noise |
| D. Registries + GitHub | 10 | **10** | All clear |
| E. Ergonomics | 15 | **10** | CLI/Zoom good; search and spoken brand distinction are contested |
| F. Domains | 5 | **4** | `.sh` `.dev` `.ai` likely free |
| **Total** | **100** | **68** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **N/~** (not exact-name, but Capy is a high-risk same-root category twin) |
| Fit + tone OK for Centauri companion product | **~** (good tone; capy identity is occupied in-category) |
| Domains acceptable (optional) | **Y** (`.sh`/`.dev`) |
| Hard override triggered? | **No** |

**Overall:** **Maybe** — exact name remains technically usable, but the intended capybara positioning would invite persistent confusion with Capy  

**If Maybe — smallest rename that keeps the idea:**  
> `recappy`, `capyhost`, or keep capy as mascot with another CLI  

**Discuss next:**  
1. Is the capybara identity worth competing with Capy in the same product category?  
2. Is “recap” a feature we want in the name, or noise?  
3. Prefer a different mascot/root, or obtain counsel and test confusion before advancing  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill scorecard  
