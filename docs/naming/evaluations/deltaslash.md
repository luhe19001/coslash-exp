# Product name eval — `deltaslash`

**Company (fixed):** Centauri AI — does **not** change.
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).
**Date:** 2026-07-30
**Candidate:** `deltaslash`
**Pronounce:** *DELTA-slash*
**One-line meaning:** changes in slash-command state made visible across every agent—context, status, usage, history, activity, and handoffs.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Two familiar technical words |
| Meaning lands without a speech | ~ | Delta means change; connecting that change to the fleet needs one sentence |
| OK under Centauri (companion product, not rename) | Y | Technical companion name with light mathematical/space tone |
| Works for free + paid + enterprise tone | Y | Credible for operational software |
| Room for cute mascot (dog / capybara / other) | Y | Delta/triangle can be a visual motif without dictating mascot |
| Survives “not a log viewer” pivot | Y | Change/state framing supports control and handoffs, not just logs |

**Story we would tell:**

> Every `/context`, `/status`, `/mcp`, and `/usage` response is a snapshot. DeltaSlash turns the changes between those snapshots into persistent agent cards and a fleet dashboard, making history, activity, cost, status, and handoffs visible without querying every CLI session.

**Deal-breakers from taste?** It can sound like a diff tool or game attack rather than an overall agent dashboard; “Delta” is also a heavily used corporate and technical term.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `deltaslash` | **Clear** | [official registry endpoint](https://registry.npmjs.org/deltaslash) returned 404 on 2026-07-30 |
| Near names worth noting | Moderate word heat | Many Delta* packages; no exact candidate or obvious same-category compound found |

**npm verdict:** ship as `deltaslash`

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
| `deltaslash.com` | **Registered** | Registered since 2019; no site resolved during review |
| `deltaslash.dev` | **Unregistered at review** | Registry RDAP 404 |
| `deltaslash.sh` | **Unregistered at review** | Registry RDAP 404; preferred home |
| `deltaslash.ai` | **Unregistered at review** | `.ai` WHOIS returned “Domain not found” |
| other: Centauri path | Available fallback | Product can initially live under Centauri AI |

**Domain verdict:** good `.sh`, `.dev`, and `.ai`; `.com` unavailable

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| Delta Slash — Hyperdimension Neptunia | Named combat ability in a game franchise ([reference](https://vsbattles.fandom.com/wiki/Neptune_%28Hyperdimension_Neptunia%29)) | N | Med (exact phrase owns some search intent) |
| Delta / Delta* software field | Common term for diffs, change data, and incremental systems | ~ | Med (generic technical meaning and weak ownership) |
| Delta corporate brands | Airlines, electronics, finance, and other large brands | N / ~ | Med trademark/search gravity on dominant word |

**Competitor verdict:** no exact software product found; acceptable with search and trademark diligence

### 2.5 Trademark (flag only)

Quick web review found no exact current `DELTASLASH` software mark. This is not a clearance search.

| Hit | Class / area | Concern |
|---|---|---|
| No exact compound found | — | Delta is crowded across software and services |
| Delta Slash game use | Entertainment | Exact phrase has prior entertainment use |

**Trademark verdict:** caution — counsel if shortlisted

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | ~ | 10 letters; longer than target |
| Dotfolder `.…/` clean | Y | `.deltaslash/` |
| Zoom spelling OK | Y | Two standard words |
| Podcast needs “spelled like…”? | N | Predictable pronunciation/spelling |
| Searchable as *our* product? | ~ | Exact is sparse but game usage and generic Delta intent remain |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **19** | Accurate change-over-time story; slightly diff-pinned and less fleet-wide |
| B. npm | 20 | **20** | Exact package clear |
| C. Competitor | 25 | **16** | No exact software product; exact game phrase and crowded Delta field |
| D. Registries + GitHub | 10 | **10** | Checked registries and exact GitHub handles clear |
| E. Ergonomics | 15 | **9** | Easy speech/spelling, but 10 characters and mixed search intent |
| F. Domains | 5 | **4** | `.sh`, `.dev`, and `.ai` appear open; `.com` registered |
| **Total** | **100** | **78** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **Y** (~ unrelated game use) |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Advance** — conditional on semantic and trademark testing

**If Maybe — smallest rename that keeps the idea:**

> Keep `DeltaSlash`; respelling would weaken both understandable words without fixing Delta crowding.

**Discuss next:**

1. Do users hear “changes across slash-command state” or “a slash-command diff tool”?
2. Is the exact game-ability association visible to the target audience?
3. Compare its state-change story directly with CoSlash’s together/dashboard story.

---

## 5. Checklist for the evaluator

- [x] npm exact + search
- [x] PyPI / gems / crates / brew skim
- [x] GitHub org + user + `in:name` search
- [x] Google exact software/SaaS
- [x] DNS skim `.com` `.dev` `.sh` `.ai`
- [x] Note trademark heat if any
- [x] Fill scorecard
