# Product name eval — `slashint`

**Company (fixed):** Centauri AI — does **not** change.
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).
**Date:** 2026-07-30
**Candidate:** `slashint`
**Pronounce:** *SLASH-int*
**One-line meaning:** slash intelligence—the combined context, status, usage, history, and activity extracted from coding-agent commands.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Short, two beats, straightforward spelling |
| Meaning lands without a speech | ~ | `int` could mean intelligence, integer, integration, internal, or interview |
| OK under Centauri (companion product, not rename) | Y | Compact technical product name |
| Works for free + paid + enterprise tone | Y | Serious enough, though abbreviation feels utilitarian |
| Room for cute mascot (dog / capybara / other) | Y | Does not dictate a mascot |
| Survives “not a log viewer” pivot | Y | Intelligence/synthesis can cover monitoring, control, and handoffs |

**Story we would tell:**

> SlashInt is slash intelligence: it pre-computes and combines `/context`, `/status`, `/mcp`, `/usage`, history, and live activity into persistent cards and an overall agent-fleet dashboard.

**Deal-breakers from taste?** The intended expansion is not self-evident. In technical contexts, `int` usually reads as integer or integration, and `\slashint` is already a mathematical typesetting command.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashint` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashint) returned 404 on 2026-07-30 |
| Near names worth noting | Low product heat | Exact search primarily finds the `\slashint` math/LaTeX command |

**npm verdict:** ship as `slashint`

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | Official project endpoint returned 404 |
| RubyGems | Clear | Official API returned 404 |
| crates.io | Clear | Official API returned 404 |
| Homebrew | Clear | No exact formula or cask |
| GitHub org | Clear | Exact organization endpoint returned 404 |
| GitHub user | Clear | Exact user endpoint returned 404; no exact-name repository found |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `slashint.com` | **Unregistered at review** | Verisign RDAP 404 |
| `slashint.dev` | **Unregistered at review** | Registry RDAP 404 |
| `slashint.sh` | **Unregistered at review** | Registry RDAP 404; preferred home |
| `slashint.ai` | **Unregistered at review** | `.ai` WHOIS returned “Domain not found” |
| other: Centauri path | Available fallback | Product can initially live under Centauri AI |

**Domain verdict:** unusually strong; all four checked domains appear open

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [`\slashint`](https://tex.stackexchange.com/questions/667884/style-fourier-with-esint) | Existing LaTeX/TeX command for a slashed integral symbol | N / ~ technical | Med (exact technical search term) |
| `@slashint` content handle | Video-game review author on Waivio/PeakD | N | Low |
| “int” abbreviations | Integer, integration, internal, intelligence, interview | ~ | Med (semantic ambiguity) |

**Competitor verdict:** no exact software product found; good namespace but weak semantic/search ownership

### 2.5 Trademark (flag only)

Quick web review found no exact current `SLASHINT` software mark. This is not a clearance search.

| Hit | Class / area | Concern |
|---|---|---|
| No exact mark found | — | Existing math-command usage may limit distinctiveness, not necessarily registrability |

**Trademark verdict:** looks comparatively open; counsel if shortlisted

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 8 letters: `slashint run` |
| Dotfolder `.…/` clean | Y | `.slashint/` |
| Zoom spelling OK | Y | Easy letters, but expansion may need explanation |
| Podcast needs “spelled like…”? | ~ | Spelling is clear; meaning of `int` is not |
| Searchable as *our* product? | N | `slashint` is already a TeX/math command |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **17** | “Slash intelligence” fits synthesis; abbreviation is materially ambiguous |
| B. npm | 20 | **20** | Exact package clear |
| C. Competitor | 25 | **16** | No product collision, but exact technical term owns search |
| D. Registries + GitHub | 10 | **10** | Checked registries and exact GitHub handles clear |
| E. Ergonomics | 15 | **7** | Short and speakable; meaning and searchability are weak |
| F. Domains | 5 | **5** | All checked primary domains appear open |
| **Total** | **100** | **75** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **Y** |
| Fit + tone OK for Centauri companion product | **~** — expansion needs testing |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Advance** — narrowly; require naming comprehension test

**If Maybe — smallest rename that keeps the idea:**

> Spell out the intended intelligence concept rather than relying on `int`; a respelling will not remove the math-command collision.

**Discuss next:**

1. Ask users what `int` means before explaining it; reject if “intelligence” is not the dominant answer.
2. Decide whether excellent namespace availability offsets poor exact-search ownership.
3. Compare against MetaSlash, which communicates synthesis with less abbreviation ambiguity.

---

## 5. Checklist for the evaluator

- [x] npm exact + search
- [x] PyPI / gems / crates / brew skim
- [x] GitHub org + user + `in:name` search
- [x] Google exact software/SaaS
- [x] DNS skim `.com` `.dev` `.sh` `.ai`
- [x] Note trademark heat if any
- [x] Fill scorecard
