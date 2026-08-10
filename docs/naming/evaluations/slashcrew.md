# Product name eval — `slashcrew`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `slashcrew`  
**Pronounce:** *SLASH-crew*  
**One-line meaning:** slash-command crew — every coding agent reports its state, history, and activity into one dashboard.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Everyday word + slash |
| Meaning lands without a speech | Y | Slash commands expose state; crew is the fleet being observed |
| OK under Centauri (companion product, not rename) | Y | |
| Works for free + paid + enterprise tone | Y | Friendly without being toy |
| Room for cute mascot (dog / capybara / other) | Y | Strong — crew/pack energy |
| Survives “not a log viewer” pivot | Y | People/ops framing, not logs |

**Story we would tell:**  
> Slashcrew turns the `/context`, `/status`, `/mcp`, and `/usage` checks for every coding agent into persistent crew cards, history, activity, and one human-led dashboard.

**Deal-breakers from taste?** “Crew” heavily owned by **CrewAI** in agent SEO; softer technical signal than mux/orch.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashcrew` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashcrew) returned 404 on 2026-07-30 |
| Near names worth noting | Crowded *crew* | `pi-crew`, `@nowcrew/daemon`, `@pinkynrg/crew`, many crew-* agent packages; `slash-crew` / `getslashcrew` clear |

**npm verdict:** ship as `slashcrew`  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | |
| RubyGems | Clear | |
| crates.io | Clear | |
| Homebrew | Clear | formula + cask 404 |
| GitHub org | Clear | no org named slashcrew |
| GitHub user | **Taken** | `@slashcrew` user since 2013, **0 public repos** (squat / dormant) |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `slashcrew.com` | **Taken** | Resolves with Cloudflare DNS; no current product page verified |
| `slashcrew.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashcrew.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS — usable |
| `slashcrew.ai` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| other: `.io` | No DNS observed | Registration not confirmed |

**Domain verdict:** can launch on `.sh` / `.dev` / Centauri path; `.com` blocked  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| *(no live product exact `slashcrew`)* | — | — | Low |
| [CrewAI](https://crewai.com/open-source) | Large open-source multi-agent platform positioning “crew” as teams of orchestrated agents | **Y** | **High** (dominant category meaning and enterprise positioning) |
| `@slashcrew` GitHub + Drupal GitLab | Dormant usernames | N | Low |
| slashcrew.com | Registered domain, unclear product | ~ | Low–Med (blocks `.com`) |
| slash.co / slash.com | Fintech / Slash brands | ~ | Med (Slash* prefix) |

**Competitor verdict:** OK if we out-position — exact string free as product; accept CrewAI *crew* SEO  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| none found for exact `slashcrew` | — | CrewAI + Slash* — counsel if advancing |

**Trademark verdict:** caution  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | ~ | 9 letters — fine |
| Dotfolder `.…/` clean | Y | `.slashcrew/` |
| Zoom spelling OK | Y | |
| Podcast needs “spelled like…”? | N | |
| Searchable as *our* product? | ~ | Compound OK; bare “crew” → CrewAI |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **20** | Strong command-to-card and crew-dashboard story; category meaning remains owned by CrewAI |
| B. npm | 20 | **20** | Exact clear |
| C. Competitor | 25 | **10** | No exact product, but CrewAI strongly owns the agent-team metaphor |
| D. Registries + GitHub | 10 | **7** | GH user squat; other registries clear |
| E. Ergonomics | 15 | **11** | Easy to say; search and explanation must distinguish CrewAI |
| F. Domains | 5 | **3** | `.com` taken; `.sh`/`.dev` usable |
| **Total** | **100** | **71** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **~** (not exact; CrewAI is a high-risk category-word neighbor) |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** (non-`.com`) |
| Hard override triggered? | **No** |

**Overall:** **Maybe**  

**If Maybe — smallest rename that keeps the idea:**  
> `slashpack` / `slashdeck` if CrewAI SEO feels too loud  

**Discuss next:**  
1. Willing to fight “crew” = CrewAI in search / pitch?  
2. OK without `.com` (use `.sh`)?  
3. Compare to `slashmux` / `slashorch` — warmth vs precision  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill numeric scorecard + band  
