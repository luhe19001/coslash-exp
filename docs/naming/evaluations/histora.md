# Product name eval — `histora`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `histora`  
**Pronounce:** *his-TOR-ah*  
**One-line meaning:** history made visible — persistent records of agent sessions, activity, usage, status, and handoffs.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Familiar history root, three clear syllables |
| Meaning lands without a speech | Y | Immediately suggests history and recorded activity |
| OK under Centauri (companion product, not rename) | Y | Distinct product word under the company |
| Works for free + paid + enterprise tone | Y | Serious, durable, and audit-friendly |
| Room for cute mascot (dog / capybara / other) | ~ | Possible, but the word naturally favors archive/story imagery |
| Survives “not a log viewer” pivot | Y | Covers history, activity, decisions, and handoffs beyond raw logs |

**Story we would tell:**  
> Histora makes every coding agent’s past and present legible: one card for status, context, usage, activity, and cost, plus searchable session history and handoffs across the fleet.

**Deal-breakers from taste?** The meaning is unusually accurate, but the exact name is already an active software identity in several history, audit, and records products.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `histora` | **Clear** | [official registry endpoint](https://registry.npmjs.org/histora) returned 404 on 2026-07-30 |
| Near names worth noting | Crowded history root | `historia`, `history`, and many history/log packages exist; exact `histora` is clear |

**npm verdict:** technically ship as `histora` — brand conflict still blocks it  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | Official JSON endpoint returned 404 |
| RubyGems | Clear | Official API returned 404 |
| crates.io | Clear | Official API returned 404 |
| Homebrew | Clear | Formula + cask endpoints returned 404 |
| GitHub org | **Taken** | [`Histora`](https://github.com/Histora) organization, 0 public repos at review |
| GitHub user | Taken as org | Exact login unavailable |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `histora.com` | **Taken / live** | Medical-data SaaS; RDAP registered and site resolves |
| `histora.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `histora.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `histora.ai` | **Taken / live** | Registered and resolves |
| `histora.app` | **Taken / live** | Shopify audit-history product |
| other: `.io` | **Taken** | Resolves |

**Domain verdict:** secondary developer TLDs are available, but the identity-defining domains belong to active products  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [Histora.app](https://www.histora.app/about) | Shopify product-change audit history: attribution, before/after records, media backups, and reports | **~** | **High** — exact name and closely adjacent history/activity proposition |
| [Histora Chrome extension](https://chromewebstore.google.com/detail/histora/ocfdighefbnjbdeclllkiggiggoaakad) | AI tool that records, organizes, searches, and analyzes browsing history | **~** | **High** — exact AI software name and history dashboard |
| [Histora / Gemedata](https://www.historaagent.com/) | Medical/dental data SaaS connecting records, files, history, and AI organization | **~** | **High** — exact software identity with active trademark filing |
| [Histora.me](https://histora.me/) | AI conversations with historical figures plus a personal journal | N/~ | Med — exact AI product name |
| [Histora decision platform](https://www.g2.com/products/histora/reviews) | Business decision record and historical-context platform | **~** | **High** if still active — very close record/history story |

**Competitor verdict:** **avoid** — the exact name already means history/audit/records across several live software products  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| [HISTORA application 99166890](https://www.trademarkelite.com/trademark/trademark-detail/99166890/HISTORA) | Classes 9, 35, 42, 44; database/file management, software development, and electronic record storage | Notice of Allowance issued; directly overlaps software and record-management territory |

**Trademark verdict:** **stop — talk to counsel; do not treat as open**  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 7 letters — `histora run` |
| Dotfolder `.…/` clean | Y | `.histora/` |
| Zoom spelling OK | Y | H-I-S-T-O-R-A |
| Podcast needs “spelled like…”? | ~ | Often: “Histora, without the final y” |
| Searchable as *our* product? | N | Exact search is already divided among active software products |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **23** | Exceptionally accurate history/activity/dashboard meaning |
| B. npm | 20 | **20** | Exact package clear |
| C. Competitor | 25 | **1** | Multiple active exact-name software products in closely adjacent history/records territory |
| D. Registries + GitHub | 10 | **5** | Package registries clear; exact GitHub organization taken |
| E. Ergonomics | 15 | **3** | Sayable and short, but exact search/identity is already owned |
| F. Domains | 5 | **4** | `.dev` and `.sh` unregistered; primary identity domains taken |
| **Total** | **100** | **56** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **N** |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **~** (developer TLDs available; primary domains occupied) |
| Hard override triggered? | **Yes** — exact name is already an active software identity with overlapping history/record-management products and mark |

**Overall:** **Drop** (hard override despite excellent semantic fit)  

**If Maybe — smallest rename that keeps the idea:**  
> Do not make a minor respelling around `Histora`; choose a different history/record root to avoid the same spoken identity.  

**Discuss next:**  
1. Preserve the “visible agent history” concept under a more ownable word  
2. Do not let exceptional meaning outweigh exact-name software and trademark conflicts  
3. Use Histora as an internal positioning phrase, not the public product name  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS + registry skim `.com` `.dev` `.sh` `.ai` `.app` `.io`  
- [x] Note trademark heat  
- [x] Fill numeric scorecard + band  
