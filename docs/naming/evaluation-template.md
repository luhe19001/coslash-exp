# Product name eval — `<CANDIDATE>`

_Copy this file to `docs/name-evals/<candidate>.md` (lowercase filename = candidate). Fill every section. Keep answers short._
Worked examples already in that folder: `recapy`, `slashcon`, `slashco`, `slashagent`, `orch`, `slashorch`.

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Product truth used for Fit:** CLI-agent users repeatedly invoke slash commands such as `/context`, `/status`, `/mcp`, and `/usage`. The product pre-computes and combines that scattered state into persistent agent/session cards and an overall dashboard for history, activity, status, usage, cost, and handoffs.  
**Date:** YYYY-MM-DD  
**Candidate:** `<CANDIDATE>`  
**Pronounce:** `<how to say it>`  
**One-line meaning:** `<why this word for agent fleet control / monitor / handoff>`

---

## Score schema (total / 100)

Score after the checks — not before. Use whole numbers.

| Dimension | Max | How to score |
|---|---|---|
| **A. Fit** | 25 | Easy + meaning + Centauri companion + free/paid/enterprise tone + mascot room + not “log”-pinned. Strong on all ≈22–25; cute-but-fuzzy or tone risk ≈12–18; weak story ≈0–11. |
| **B. npm** | 20 | Exact clear = 20. Dead squat / tiny taken = 8–12 (scope/`get…` possible). Live popular package = 0–5. |
| **C. Competitor** | 25 | No real product = 22–25. Other category / weak SEO = 12–18. Live same-name or same-neighborhood coding-agent tool = 0–10. |
| **D. Registries + GitHub** | 10 | All clear = 10. User squat only = 7–8. Org taken or several registries taken = 0–5. |
| **E. Ergonomics** | 15 | Short CLI + Zoom + searchable as us ≈13–15. Long or “spelled like…” often ≈8–11. Search owned by others ≈0–7. |
| **F. Domains** | 5 | `.sh` or `.dev` free = 4–5. Only awkward/get… = 2–3. Nothing usable = 0–1. *(Nice-to-have — don’t fail only on F.)* |

**Bands**

| Total | Overall |
|---|---|
| **75–100** | **Advance** — discuss for shortlist |
| **50–74** | **Maybe** — needs rename, counsel, or explicit risk accept |
| **0–49** | **Drop** |

**Hard overrides (set Overall to Drop even if total ≥50):**

- npm exact is a **popular** live package in our ecosystem (Bole-class), **or**
- Live product with **exact name in coding-agent / AI-devtool** neighborhood and high confusion (Fleeti/Woofy-class), **or**
- Name reads as another company’s identity (e.g. “Slash Co” → slash.co)

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | | |
| Meaning lands without a speech | | |
| OK under Centauri (companion product, not rename) | | |
| Works for free + paid + enterprise tone | | |
| Room for cute mascot (dog / capybara / other) | | |
| Survives “not a log viewer” pivot | | |

**Story we would tell:**  
> …

**Deal-breakers from taste?** (toy / too clever / Fleet* trap / etc.)  

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `<candidate>` | Clear / Taken / Dead squat | URL + downloads/mo if taken |
| Near names worth noting | | e.g. `fooy`, `@fooy/cli` |

**npm verdict:** ship as `<candidate>` / need scope `@org/<candidate>` / rename  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear / Taken | |
| RubyGems | Clear / Taken | |
| crates.io | Clear / Taken | |
| Homebrew | Clear / Taken | |
| GitHub org | Clear / Taken | |
| GitHub user | Clear / Taken | |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `<candidate>.com` | | |
| `<candidate>.dev` | | |
| `<candidate>.sh` | | preferred if free |
| `<candidate>.ai` | | |
| other: | | |

**Domain verdict:** have a home / can launch on `get…` / Centauri path only  

### 2.4 Same-name / adjacent products (required)

List anything Google / GitHub / stores show for this exact string:

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| | | Y / N / ~ | Low / Med / High |

**Competitor verdict:** avoid / OK if we out-position / only with counsel  

### 2.5 Trademark (flag only)

Quick look USPTO / known marks in software (class 9 / 42). Not legal advice.

| Hit | Class / area | Concern |
|---|---|---|
| none found / … | | |

**Trademark verdict:** looks open / caution / stop — talk to counsel  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | | `… run` |
| Dotfolder `.…/` clean | | |
| Zoom spelling OK | | |
| Podcast needs “spelled like…”? | | |
| Searchable as *our* product? | | |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | | |
| B. npm | 20 | | |
| C. Competitor | 25 | | |
| D. Registries + GitHub | 10 | | |
| E. Ergonomics | 15 | | |
| F. Domains | 5 | | |
| **Total** | **100** | **** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | |
| No high-risk same-name competitor | |
| Fit + tone OK for Centauri companion product | |
| Domains acceptable (optional) | |
| Hard override triggered? | No / Yes — … |

**Overall:** Advance / Maybe / Drop  

**If Maybe — smallest rename that keeps the idea:**  
> e.g. respell, `-ie`/`-y`, `get…`, verb form  

**Discuss next:**  
1.  
2.  
3.  

---

## 5. Checklist for the evaluator

- [ ] `npm view <candidate>` / registry.npmjs.org exact + search  
- [ ] PyPI / gems / crates / brew skim  
- [ ] GitHub org + user + `in:name` search  
- [ ] Google exact `"<candidate>"` software/SaaS  
- [ ] DNS skim `.com` `.dev` `.sh` `.ai`  
- [ ] Note trademark heat if any  
- [ ] Fill numeric scorecard + band; don’t fall in love before npm + competitor rows  

_Past full write-ups (Yima, Bole, Fleeti, Packie, Woofy) live in `docs/product_name_discussion.md` §§15–25 — use those as worked examples, not as the template length target._
