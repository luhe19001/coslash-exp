# Product name eval — `coslash`

**Company (fixed):** Centauri AI — does **not** change.
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).
**Date:** 2026-07-30
**Candidate:** `coslash`
**Pronounce:** *CO-slash*
**One-line meaning:** co-ordinated slash-command state—each agent’s context, status, usage, history, and activity brought together in one dashboard.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Two short, familiar sounds once introduced as “co-slash” |
| Meaning lands without a speech | ~ | “Co” suggests together/collaboration; lowercase word break needs one introduction |
| OK under Centauri (companion product, not rename) | Y | Reads as a compact product name |
| Works for free + paid + enterprise tone | Y | Technical without sounding infrastructure-only |
| Room for cute mascot (dog / capybara / other) | Y | Leaves visual identity open |
| Survives “not a log viewer” pivot | Y | Anchored to coordinating agent commands and state, not logs |

**Story we would tell:**
> Coding-agent users repeatedly type `/context`, `/status`, `/mcp`, and `/usage` in separate CLI sessions. CoSlash brings those slash-command answers together: persistent cards show each agent’s context, history, activity, cost, and handoffs, while one dashboard coordinates the fleet.

**Deal-breakers from taste?** Without CamelCase, `coslash` may initially be parsed as *cos-lash*. “Co” is a broad collaboration prefix rather than a uniquely ownable idea.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `coslash` | **Clear** | [official registry endpoint](https://registry.npmjs.org/coslash) returned 404 on 2026-07-30 |
| Near names worth noting | Low heat | No exact package or obvious same-category near-name found |

**npm verdict:** ship as `coslash`

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | Official project endpoint returned 404 |
| RubyGems | Clear | Official API returned 404 |
| crates.io | Clear | Official API returned 404 |
| Homebrew | Clear | No exact formula or cask |
| GitHub org | Clear | Exact organization endpoint returned 404 |
| GitHub user | Clear | Exact user endpoint returned 404; no exact-name repositories found |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `coslash.com` | **Registered; redemption period** | Registered 2025-06-04, expired 2026-06-04; do not assume it will become available |
| `coslash.dev` | **Unregistered at review** | Registry RDAP 404 |
| `coslash.sh` | **Unregistered at review** | Registry RDAP 404; best semantic home |
| `coslash.ai` | **Unregistered at review** | `.ai` WHOIS returned “Domain not found” |
| other: Centauri path | Available fallback | Product can initially live under Centauri AI |

**Domain verdict:** strong `.sh` / `.dev` / `.ai` options; monitor `.com` without relying on it

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [COSLASH LIMITED](https://www.cr.gov.hk/docs/wrpt/wk_new%26changednamecoys_20221114.pdf) | Hong Kong company incorporated in 2022; no public product/category found | Unknown | Med (exact corporate name) |
| [Coslash mailing list](https://fanlore.org/wiki/Category:Slash_Mailing_Lists) | Historical slash fan-fiction community | N | Med (unrelated adult/fandom association) |
| Coslash in Wolfpack Hunter Adventure | Villain in an [indie platform game](https://wolfpack-hunter-studios.itch.io/wolfpack-hunter-adventure) | N | Low |
| Slash / slash.co / slash.com | Existing studio and fintech Slash brands | ~ prefix | Med (crowded Slash* neighborhood) |

**Competitor verdict:** no same-category product found; acceptable if the Hong Kong company’s activity and rights are cleared

### 2.5 Trademark (flag only)

Quick web review found no exact current `COSLASH` software mark. This is not a clearance search.

| Hit | Class / area | Concern |
|---|---|---|
| COSLASH LIMITED | Unknown business area | Exact registered corporate name; confirm activity and rights |
| Slash-formative brands | Software / financial / creative services | Crowded word family; counsel if advancing |

**Trademark verdict:** caution — counsel before adoption

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 7 letters: `coslash run` |
| Dotfolder `.…/` clean | Y | `.coslash/` |
| Zoom spelling OK | Y | “Co, then slash” |
| Podcast needs “spelled like…”? | ~ | May need “co-slash” once to establish the word break |
| Searchable as *our* product? | ~ | Sparse results, but exact company and unrelated fandom/game uses exist |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **21** | Strong “slash-command state together” story; word break needs introduction |
| B. npm | 20 | **20** | Exact package clear |
| C. Competitor | 25 | **16** | No same-category product; exact company plus unrelated search associations |
| D. Registries + GitHub | 10 | **10** | All checked package registries and exact GitHub handles clear |
| E. Ergonomics | 15 | **11** | Short and pronounceable; lowercase parsing and search ownership are imperfect |
| F. Domains | 5 | **4** | `.sh`, `.dev`, and `.ai` appear open; `.com` in redemption |
| **Total** | **100** | **82** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **~** — no product found; exact company requires diligence |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Advance** — conditional on company/trademark review

**If Maybe — smallest rename that keeps the idea:**
> Present the brand as `CoSlash` while retaining lowercase `coslash` for CLI/package use.

**Discuss next:**
1. Does “CoSlash” immediately communicate slash-command state brought together?
2. Confirm COSLASH LIMITED’s current business and any software-name rights.
3. Test whether the historical fan-fiction meaning surfaces for target users.

---

## 5. Checklist for the evaluator

- [x] npm exact + search
- [x] PyPI / gems / crates / brew skim
- [x] GitHub org + user + `in:name` search
- [x] Google exact software/SaaS
- [x] DNS skim `.com` `.dev` `.sh` `.ai`
- [x] Note trademark heat if any
- [x] Fill scorecard
