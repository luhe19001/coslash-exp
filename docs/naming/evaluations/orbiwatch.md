# Product name eval — `orbiwatch`

**Company (fixed):** Centauri AI — does **not** change.
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).
**Date:** 2026-07-30
**Candidate:** `orbiwatch`
**Pronounce:** *OR-bee-watch*
**One-line meaning:** a Centauri-aligned watchtower for agents in orbit—monitoring each agent’s status, history, activity, usage, and handoffs.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Three clear beats and familiar “watch” ending |
| Meaning lands without a speech | Y | Orbital fleet monitoring is immediately legible under Centauri |
| OK under Centauri (companion product, not rename) | Y | Strong celestial family connection |
| Works for free + paid + enterprise tone | Y | Sounds like an operational monitoring product |
| Room for cute mascot (dog / capybara / other) | ~ | Celestial/watch identity pushes toward satellites or an owl |
| Survives “not a log viewer” pivot | ~ | “Watch” over-emphasizes monitoring and underplays control/handoff |

**Story we would tell:**

> OrbiWatch keeps every coding agent in view as it moves through its work. It collects `/context`, `/status`, `/mcp`, `/usage`, history, and live activity into persistent cards and a fleet dashboard—an orbital watchtower for the Centauri product family.

**Deal-breakers from taste?** It does not preserve the slash-command insight in the name, and “watch” narrows the product toward passive monitoring.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `orbiwatch` | **Clear** | [official registry endpoint](https://registry.npmjs.org/orbiwatch) returned 404 on 2026-07-30 |
| Near names worth noting | High brand heat | NETGEAR Orbi and existing Orbiwatch/Orbitwatch monitoring products |

**npm verdict:** technically usable, but the product name is blocked by brand collisions

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
| `orbiwatch.com` | **Unregistered at review** | Verisign RDAP 404 |
| `orbiwatch.dev` | **Unregistered at review** | Registry RDAP 404 |
| `orbiwatch.sh` | **Unregistered at review** | Registry RDAP 404 |
| `orbiwatch.ai` | **Unregistered at review** | `.ai` WHOIS returned “Domain not found” |
| other: `orbitwatch.mx` | **Live adjacent product** | Existing platform brands itself as Orbiwatch/Orbitwatch |

**Domain verdict:** candidate domains look open, but domain availability does not cure the live product collision

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [Orbiwatch / Orbitwatch](https://www.orbitwatch.mx/) | Paid AI satellite-monitoring platform with unified dashboards, alerts, history, and reports | ~ | **High** (exact name and strikingly similar monitoring job) |
| ORBIWATCH space platform | Recent space-situational-awareness software for orbital monitoring, AI prediction, and risk dashboards ([public showcase author](https://in.linkedin.com/in/harshal-more-051537381)) | ~ | **High** (exact name, software, space/monitoring meaning) |
| [NETGEAR Orbi](https://www.netgear.com/home/wifi/mesh/orbi-970-series/) | Major mesh-network hardware/software brand | ~ software | High (dominant `Orbi` search and registered software mark) |

**Competitor verdict:** avoid—the exact monitoring identity and celestial meaning are already occupied

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| [ORBI — NETGEAR, Reg. 5162110](https://trademarks.justia.com/867/88/orbi-86788272.html) | Class 9; network hardware and software for monitoring/controlling traffic | Active registered software mark on the dominant portion |
| Orbiwatch / Orbitwatch | AI satellite monitoring | Exact live commercial identity; separate clearance needed |

**Trademark verdict:** stop — talk to counsel; do not shortlist

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | ~ | 9 letters; manageable but above target |
| Dotfolder `.…/` clean | Y | `.orbiwatch/` |
| Zoom spelling OK | ~ | “Orbi” may be heard as “orbit” or NETGEAR Orbi |
| Podcast needs “spelled like…”? | Y | Must distinguish OrbiWatch from OrbitWatch |
| Searchable as *our* product? | N | Exact/near-exact monitoring products and NETGEAR own intent |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **18** | Strong Centauri monitoring story, but misses Slash premise and over-pins to watching |
| B. npm | 20 | **20** | Exact package clear |
| C. Competitor | 25 | **2** | Exact live AI monitoring product plus exact orbital-monitoring software project |
| D. Registries + GitHub | 10 | **10** | Checked registries and exact GitHub handles clear |
| E. Ergonomics | 15 | **3** | Search and spelling are controlled by Orbiwatch/Orbitwatch and NETGEAR Orbi |
| F. Domains | 5 | **5** | Candidate `.com`, `.dev`, `.sh`, and `.ai` appear open |
| **Total** | **100** | **58** | Hard override applies |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **N** |
| Fit + tone OK for Centauri companion product | **~** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **Yes — exact live AI monitoring identity plus exact orbital software name** |

**Overall:** **Drop**

**If Maybe — smallest rename that keeps the idea:**

> Do not make a small spelling change; keep the celestial concept but replace both occupied `Orbi` and monitoring-generic `watch`.

**Discuss next:**

1. Closed unless counsel finds the exact products abandoned and the ORBI mark safely distinguishable.
2. Reuse the strong “agents in orbit around Centauri” story with a more ownable word.
3. Prefer a name that retains the slash-command product truth.

---

## 5. Checklist for the evaluator

- [x] npm exact + search
- [x] PyPI / gems / crates / brew skim
- [x] GitHub org + user + `in:name` search
- [x] Google exact software/SaaS
- [x] DNS skim `.com` `.dev` `.sh` `.ai`
- [x] Note trademark heat if any
- [x] Fill scorecard
