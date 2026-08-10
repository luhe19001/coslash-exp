# Product name eval — `logslash`

**Company (fixed):** Centauri AI — does **not** change.
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).
**Date:** 2026-07-30
**Candidate:** `logslash`
**Pronounce:** *LOG-slash*
**One-line meaning:** slash-command logs collected across coding agents.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Two simple words |
| Meaning lands without a speech | Y | Unfortunately lands as a slash-command log tool |
| OK under Centauri (companion product, not rename) | ~ | Functional rather than brand-like |
| Works for free + paid + enterprise tone | ~ | Sounds like an observability utility, not a fleet product |
| Room for cute mascot (dog / capybara / other) | ~ | Little brand character |
| Survives “not a log viewer” pivot | **N** | Explicitly pins the product to logs |

**Story we would tell:**

> The product does preserve agent history, but it also combines `/context`, `/status`, `/mcp`, `/usage`, live activity, cost, and handoffs into cards and a fleet dashboard. LogSlash reduces that broader product to logging.

**Deal-breakers from taste?** It triggers the explicit “not a log viewer” naming trap—and the exact name already belongs to an established log technology.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `logslash` | **Clear** | [official registry endpoint](https://registry.npmjs.org/logslash) returned 404 on 2026-07-30 |
| Near names worth noting | Blocked outside npm | Multiple exact LogSlash repositories/tools; npm clearance is irrelevant |

**npm verdict:** technically clear, but do not ship under this name

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | Official project endpoint returned 404 |
| RubyGems | Clear | Official API returned 404 |
| crates.io | Clear | Official API returned 404 |
| Homebrew | Clear | No exact formula or cask |
| GitHub org | Clear | Exact organization endpoint returned 404 |
| GitHub user | **Taken** | Empty exact account created in 2019 |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `logslash.com` | **Registered** | Registered since 2022; current certificate/site configuration is broken |
| `logslash.dev` | **Unregistered at review** | Registry RDAP 404 |
| `logslash.sh` | **Unregistered at review** | Registry RDAP 404 |
| `logslash.ai` | **Unregistered at review** | `.ai` WHOIS returned “Domain not found” |
| other: | — | Exact product already uses GitHub/FoxIO presence |

**Domain verdict:** secondary domains do not cure the exact product collision

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [FoxIO LogSlash](https://github.com/FoxIO-LLC/LogSlash) | Active standard/tool for reducing log volume without losing analytical value; 217 GitHub stars at review | ~ devtool/observability | **High** |
| FoxIO / cwolves | Commercial licensing and AI log-normalization around the LogSlash method ([overview](https://blog.foxio.io/cut-siem-and-ai-cost-by-80-with-logslash-and-cwolves)) | ~ AI/observability | **High** |
| `adnanbasil10/LogSlash` | 2026 Rust pre-ingestion log firewall for duplicate suppression and observability cost | ~ devtool/observability | High |
| Older `logslash` repositories | Multiple exact logging utilities dating to 2013/2016 | ~ | Med |

**Competitor verdict:** avoid—exact name is established in adjacent developer observability

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| LogSlash commercial method/license | Log processing / security observability | Exact commercial name with licensing program |
| [US 10,877,972 B1](https://patents.google.com/patent/US10877972B1/en) | High-efficiency data logging | FoxIO states LogSlash implements its patented method; patent is not a trademark but raises additional product/IP risk |

**Trademark verdict:** stop — talk to counsel; do not shortlist

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 8 letters |
| Dotfolder `.…/` clean | Y | `.logslash/` |
| Zoom spelling OK | Y | Two standard words |
| Podcast needs “spelled like…”? | N | |
| Searchable as *our* product? | N | Exact search belongs to FoxIO LogSlash |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **7** | Explicitly violates the “not a log viewer” product truth |
| B. npm | 20 | **20** | Exact npm package clear, but commercially irrelevant |
| C. Competitor | 25 | **0** | Established exact-name adjacent devtool, licensing program, and multiple implementations |
| D. Registries + GitHub | 10 | **2** | GitHub user and several exact repositories occupied |
| E. Ergonomics | 15 | **1** | Easy to say, but exact search and meaning belong to another log product |
| F. Domains | 5 | **3** | Secondary domains appear open; `.com` registered |
| **Total** | **100** | **33** | Hard override applies |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **N** |
| Fit + tone OK for Centauri companion product | **N** |
| Domains acceptable (optional) | **~** |
| Hard override triggered? | **Yes — established exact-name adjacent developer tool/commercial method** |

**Overall:** **Drop**

**If Maybe — smallest rename that keeps the idea:**

> Do not preserve `log`; return to the broader slash-command state/dashboard premise.

**Discuss next:**

1. Closed; do not revive without a completely different name.
2. Preserve “history” as a capability, not the product identity.
3. Keep the scorecard’s “survives not-a-log-viewer pivot” gate explicit.

---

## 5. Checklist for the evaluator

- [x] npm exact + search
- [x] PyPI / gems / crates / brew skim
- [x] GitHub org + user + `in:name` search
- [x] Google exact software/SaaS
- [x] DNS skim `.com` `.dev` `.sh` `.ai`
- [x] Note trademark/patent heat
- [x] Fill scorecard
