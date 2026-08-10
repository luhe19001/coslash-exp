# Product name eval — `slashpilot`

**Company (fixed):** Centauri AI — does **not** change.
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).
**Date:** 2026-07-30
**Candidate:** `slashpilot`
**Pronounce:** *SLASH-pilot*
**One-line meaning:** a control surface for piloting coding-agent work from slash-command context, status, usage, history, and activity.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Two ordinary words with obvious pronunciation |
| Meaning lands without a speech | Y | Slash commands plus an operator/pilot control role |
| OK under Centauri (companion product, not rename) | Y | Works as a product under the company brand |
| Works for free + paid + enterprise tone | Y | Serious enough for operational tooling |
| Room for cute mascot (dog / capybara / other) | Y | Pilot character or separate mascot both work |
| Survives “not a log viewer” pivot | Y | Suggests supervision and control, not just history |

**Story we would tell:**

> SlashPilot turns the state users repeatedly request through `/context`, `/status`, `/mcp`, and `/usage` into a persistent cockpit. Agent cards and the fleet dashboard let the operator review history and activity, monitor cost and status, and steer handoffs without visiting every CLI session.

**Deal-breakers from taste?** “Pilot” can imply an autonomous coding assistant or execution engine rather than an observability/control dashboard, and the AI-tool market is saturated with Copilot/Pilot names.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `slashpilot` | **Clear** | [official registry endpoint](https://registry.npmjs.org/slashpilot) returned 404 on 2026-07-30 |
| Near names worth noting | Crowded | OpenCode Pilot, Claude Pilot, ContextPilot, and many Copilot/Pilot tools |

**npm verdict:** exact package is usable, but naming differentiation is weak

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
| `slashpilot.com` | **Registered** | Registered 2026-01-15; Cloudflare nameservers, no responsive site during review |
| `slashpilot.dev` | **Unregistered at review** | Registry RDAP 404 |
| `slashpilot.sh` | **Unregistered at review** | Registry RDAP 404; preferred home |
| `slashpilot.ai` | **Unregistered at review** | `.ai` WHOIS returned “Domain not found” |
| other: Centauri path | Available fallback | Product can initially live under Centauri AI |

**Domain verdict:** usable `.sh`, `.dev`, and `.ai`; `.com` unavailable

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| [OpenCode Pilot](https://www.npmjs.com/package/@lesquel/opencode-pilot) | Remote dashboard for monitoring coding-agent sessions, sending prompts, permissions, and notifications | **Y** | High (very similar job under Pilot name) |
| [Claude Pilot](https://pypi.org/project/claude-pilot/) | Claude Code workflow, automation, and context-engineering tool | Y | Med–High |
| [Context Pilot](https://contextpilot.net/) | AI context/knowledge platform with Claude Code slash commands | ~ | Med |
| Historical SlashPilot shop | Shopify apparel store formerly associated with `slashpilot.com` | N | Low–Med (exact prior commercial use and `.com`) |

**Competitor verdict:** exact compound appears open, but only advance with explicit acceptance that “Pilot” is already a crowded coding-agent product category

### 2.5 Trademark (flag only)

Quick web review found no exact current `SLASHPILOT` software mark. This is not a clearance search.

| Hit | Class / area | Concern |
|---|---|---|
| No exact mark found | — | Pilot/Copilot software marks are broadly crowded |
| Historical SlashPilot shop | Apparel / e-commerce | Exact prior commercial use; low category overlap |

**Trademark verdict:** caution — counsel if shortlisted

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | ~ | 10 letters: understandable but longer than target |
| Dotfolder `.…/` clean | Y | `.slashpilot/` |
| Zoom spelling OK | Y | Two familiar words |
| Podcast needs “spelled like…”? | N | Predictable pronunciation and spelling |
| Searchable as *our* product? | ~ | Exact string is sparse, but Pilot intent belongs to many adjacent tools |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **20** | Strong operator/cockpit story; may imply an execution assistant |
| B. npm | 20 | **20** | Exact package clear |
| C. Competitor | 25 | **8** | Several live Pilot tools in the same coding-agent neighborhood; one highly similar dashboard |
| D. Registries + GitHub | 10 | **10** | All checked package registries and exact GitHub handles clear |
| E. Ergonomics | 15 | **10** | Clear speech/spelling, but long and difficult to own in Pilot search |
| F. Domains | 5 | **4** | `.sh`, `.dev`, and `.ai` appear open; `.com` registered |
| **Total** | **100** | **72** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **~** — exact compound clear, highly similar Pilot products live |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Maybe**

**If Maybe — smallest rename that keeps the idea:**

> Keep the Slash premise but replace crowded `pilot` with a more ownable control/dashboard word.

**Discuss next:**

1. Will users mistake it for an agent that writes code autonomously?
2. Is the overlap with OpenCode Pilot’s agent-monitoring dashboard acceptable?
3. Does “cockpit for slash-command state” outperform the shorter CoSlash/MetaSlash stories?

---

## 5. Checklist for the evaluator

- [x] npm exact + search
- [x] PyPI / gems / crates / brew skim
- [x] GitHub org + user + `in:name` search
- [x] Google exact software/SaaS
- [x] DNS skim `.com` `.dev` `.sh` `.ai`
- [x] Note trademark heat if any
- [x] Fill scorecard
