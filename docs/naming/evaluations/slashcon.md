# Product name eval — `slashcon`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `slashcon`  
**Pronounce:** *SLASH-con*  
**One-line meaning:** short for `/context` — each agent’s context, history, and activity condensed into a card and fleet dashboard.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Clear two beats |
| Meaning lands without a speech | ~ | `/context` is exact for CLI-agent users; the abbreviation needs one introduction |
| OK under Centauri (companion product, not rename) | Y | |
| Works for free + paid + enterprise tone | Y | More serious than dog/capy cuteness |
| Room for cute mascot (dog / capybara / other) | Y | Name leaves room; sticker separate |
| Survives “not a log viewer” pivot | Y | Control/console coded |

**Story we would tell:**  
> Slashcon is short for `/context`: instead of repeatedly asking each coding agent for context, it keeps that context—plus history, status, usage, and live activity—in a persistent card and overall dashboard.

**Deal-breakers from taste?** The `/context` explanation is strong for CLI-agent users, but “con” may still sound like a conference or deception outside that audience.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashcon` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashcon) returned 404 on 2026-07-30 |
| Near names worth noting | Clear | `slashconn`, `getslashcon`, `@slashcon/cli` clear |

**npm verdict:** ship as `slashcon`  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | |
| RubyGems | Clear | |
| crates.io | Clear | |
| Homebrew | Clear | |
| GitHub org | **Taken** | `Slashcon` org, 2 public repos |
| GitHub user | Same org | login occupied |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `slashcon.com` | For sale | HugeDomains |
| `slashcon.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashcon.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashcon.ai` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| other: `.io` | No DNS observed | Registration not confirmed |

**Domain verdict:** `.sh`/`.dev` fine; `.com` buy-or-skip  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| GitHub org Slashcon | Small/unknown org | N | Low–Med (handle taken) |
| “slash con” / SlashCon | Longstanding term and event name for fan-fiction conventions | N | Med (unrelated but creates awkward search and spoken associations) |
| SlashConnecter etc. | Discord/slash-command tools | ~ | Low |
| Slash / slash.co / slash.com | Studio + fintech “Slash” brands | ~ prefix | Med (Slash* gravity) |

**Competitor verdict:** caution — no coding-agent product named Slashcon, but the org, established convention meaning, and Slash* family noise weaken ownership  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| none deep-dived | — | Slash* crowded; counsel if advancing |

**Trademark verdict:** caution  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 8 letters — OK |
| Dotfolder `.…/` clean | Y | `.slashcon/` |
| Zoom spelling OK | Y | |
| Podcast needs “spelled like…”? | N | |
| Searchable as *our* product? | ~ | Slash* SEO competition |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **19** | `/context` closely matches the persistent agent-card job; “con” still needs explanation |
| B. npm | 20 | **20** | Exact clear |
| C. Competitor | 25 | **14** | No same-name agent product; occupied org and established unrelated SlashCon meaning |
| D. Registries + GitHub | 10 | **5** | Org `Slashcon` taken |
| E. Ergonomics | 15 | **9** | CLI length is fine; spoken meaning and search intent are persistently ambiguous |
| F. Domains | 5 | **4** | `.sh` `.dev` `.ai` likely free; `.com` for sale |
| **Total** | **100** | **71** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **Y** (~) |
| Fit + tone OK for Centauri companion product | **~** (“con” ambiguity) |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Maybe**  

**If Maybe — smallest rename that keeps the idea:**  
> `slashdeck`, `slashhelm`, or spell out `slashconsole` (long)  

**Discuss next:**  
1. Does “short for `/context`” land quickly enough to overcome conference/deception readings?
2. GH org `Slashcon` — need alternate org name?  
3. Comfort with Slash* brand neighborhood vs slash.co / slash.com  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill scorecard  
