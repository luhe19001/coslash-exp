# Product name eval — `slashco`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `slashco`  
**Pronounce:** *SLASH-co*  
**One-line meaning:** slash-command product shorthand — but it reads primarily as “Slash Company.”

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Very short |
| Meaning lands without a speech | ~ | Slash maps to agent commands; “Co” still sounds like company, not product job |
| OK under Centauri (companion product, not rename) | ~ | Collides with “Slash Co” identity |
| Works for free + paid + enterprise tone | ~ | Fine tone; wrong owner association |
| Room for cute mascot | Y | |
| Survives “not a log viewer” pivot | Y | Empty enough to stretch |

**Story we would tell:**  
> The Slash prefix truthfully points to `/context`, `/status`, `/mcp`, and `/usage` being combined into agent cards; “Co” adds no useful dashboard meaning and creates the identity collision.

**Deal-breakers from taste?** Reads as **Slash Company** — already real brands.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashco` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashco) returned 404 on 2026-07-30 |
| Near names worth noting | Clear | `getslashco`, `@slashco/cli` clear |

**npm verdict:** ship as `slashco` (technically)  

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
| `slashco.com` | Taken / aftermarket | Afternic |
| `slashco.dev` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashco.sh` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashco.ai` | **Unregistered at review** | Registry RDAP 404; no A/NS |
| `slashco.io` | Taken | Vercel DNS — someone hosting |
| other: `.app` `.so` `.co` | Not checked | Do not assume availability |

**Domain verdict:** secondary TLDs OK; `.io` already used  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| **slash.co** | Venture studio / GenAI build shop | ~ AI services | **High** (name = Slash Co) |
| **slash.com** | Fintech + AI agent “Twin” in Slack | ~ AI agents | **High** (Slash brand + agents) |
| [SlashCo](https://github.com/Mantibro/SlashCo) | Established open-source multiplayer horror game/gamemode with an active community and derivative VR content | N | **Med–High** (exact-name search and identity collision, despite different category) |
| slashdev.io | AI agent dev shop | ~ agents | Med |
| GH noise | Discord SlashCommands* repos | N | Low (false friends) |

**Competitor verdict:** **avoid** — phonetic/visual “Slash Co” is already owned in software/AI services, and the exact `SlashCo` string already identifies a live game community  

### 2.5 Trademark (flag only)

| Hit | Class / area | Concern |
|---|---|---|
| Slash* brands active | fintech / studio / AI | High confusion risk |

**Trademark verdict:** stop / counsel — do not treat as open  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | Y | 7 letters |
| Dotfolder `.…/` clean | Y | |
| Zoom spelling OK | Y | |
| Podcast needs “spelled like…”? | Y | “Slash-C-O, not slash.com” |
| Searchable as *our* product? | N | Loses to slash.co / slash.com |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **10** | Slash-command premise is real; “Co” still reads as another company rather than the product job |
| B. npm | 20 | **20** | Exact clear |
| C. Competitor | 25 | **2** | slash.co + slash.com identity collision; exact SlashCo game identity |
| D. Registries + GitHub | 10 | **10** | Clear |
| E. Ergonomics | 15 | **5** | Easy to say; unsearchable and indistinguishable from existing identities |
| F. Domains | 5 | **3** | `.sh`/`.dev` free-ish; `.io` taken |
| **Total** | **100** | **50** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **N** |
| Fit + tone OK for Centauri companion product | **N/~** |
| Domains acceptable (optional) | **~** |
| Hard override triggered? | **Yes** — reads as Slash Co (slash.co / slash.com) |

**Overall:** **Drop** (override; numeric score is also in Drop band)  

**If Maybe — smallest rename that keeps the idea:**  
> Prefer `slashcon` / `slashagent` / non-Slash animal-verb names — not `slashco`  

**Discuss next:**  
1. Confirm we will not fight slash.co / slash.com  
2. If “slash” prefix is important, what second half is ownable?  
3. Alternatives that keep terminal vibe without “Co”  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill scorecard  
