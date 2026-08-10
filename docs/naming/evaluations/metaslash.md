# Product name eval — `metaslash`

**Company (fixed):** Centauri AI — does **not** change.  
**What we’re naming:** the coding-agent fleet product (free GitHub / product-page tier, subscription, enterprise).  
**Date:** 2026-07-30  
**Candidate:** `metaslash`  
**Pronounce:** *META-slash*  
**One-line meaning:** the meta-layer above coding-agent slash commands, combining context, status, usage, history, and activity into persistent cards and one dashboard.

---

## 1. Fit (discussion, not registries)

| Lens | Score (Y / ~ / N) | Note (≤1 line) |
|---|---|---|
| Easy to say / remember | Y | Two familiar words and an obvious pronunciation |
| Meaning lands without a speech | Y | A layer above `/context`, `/status`, `/mcp`, and `/usage` |
| OK under Centauri (companion product, not rename) | Y | Reads as a product capability, not the company |
| Works for free + paid + enterprise tone | Y | Technical and credible; not tier-specific |
| Room for cute mascot (dog / capybara / other) | Y | The name does not prescribe the visual identity |
| Survives “not a log viewer” pivot | Y | Describes an agent-command control layer, not logs |

**Story we would tell:**  
> Coding agents already expose their state through slash commands such as `/context`, `/status`, `/mcp`, and `/usage`. MetaSlash is the layer above those commands: it pre-computes and combines their answers into persistent cards and an overall dashboard, so users can see each agent’s context, history, activity, cost, and handoffs without querying every CLI session.

**Deal-breakers from taste?** “Meta” is broad and carries Meta Platforms gravity; “meta slash-command” can also sound like a generic feature category rather than a distinctive product.

---

## 2. Hard checks (do these)

### 2.1 npm (required)

| Check | Result | Evidence |
|---|---|---|
| Exact `npm` package `metaslash` | **Clear** | [official registry endpoint](https://registry.npmjs.org/metaslash) returned 404 on 2026-07-30 |
| Near names worth noting | Low heat | No exact package; generic Meta* and Slash* namespaces remain crowded |

**npm verdict:** ship as `metaslash`  

### 2.2 Other registries (quick)

| Registry | Exact | Note |
|---|---|---|
| PyPI | Clear | Official project endpoint returned 404 |
| RubyGems | Clear | Official API returned 404 |
| crates.io | Clear | Official API returned 404 |
| Homebrew | Clear | No exact formula or cask |
| GitHub org | Clear | No exact organization found |
| GitHub user | **Taken** | Active personal account [`MetaSlash`](https://github.com/MetaSlash), with 3 public repositories |

### 2.3 Domains (nice, not required)

| Domain | Status | Notes |
|---|---|---|
| `metaslash.com` | **Registered** | Porkbun nameservers; no live site resolved during review |
| `metaslash.dev` | **Unregistered at review** | Registry RDAP 404 |
| `metaslash.sh` | **Unregistered at review** | Registry RDAP 404; preferred product home |
| `metaslash.ai` | **Unregistered at review** | Registry RDAP 404 |
| other: Centauri path | Available fallback | Product can initially live under Centauri AI |

**Domain verdict:** strong `.sh` / `.dev` options; `.com` is occupied  

### 2.4 Same-name / adjacent products (required)

| Who | What they are | Same category as us? | Risk |
|---|---|---|---|
| MetaSlash, Inc. | Historical software consultancy; credited on the [PyChecker](https://pypi.org/project/PyChecker/) developer tool | ~ | Med–High (exact prior software identity) |
| “Meta slash-commands” | Existing phrase for commands that manage prompts/context for coding agents ([example](https://techrights.org/n/2026/02/14/Gemini_Links_14_02_2026_Fish_Shell_and_Meta_Slash_commands.shtml)) | Y (phrase, not product) | Med (descriptive/category collision) |
| GitHub `MetaSlash` | Active personal developer handle | N | Low–Med (primary handle unavailable) |
| Meta Platforms | Globally prominent Meta software brand | N / ~ | Med (brand gravity; counsel question) |

**Competitor verdict:** no live exact coding-agent product found, but advance only after checking rights and current status around historical MetaSlash, Inc.; the phrase already exists in the coding-agent command neighborhood  

### 2.5 Trademark (flag only)

Quick web review found no exact current `METASLASH` software mark. This is not a clearance search.

| Hit | Class / area | Concern |
|---|---|---|
| Historical MetaSlash, Inc. | Software / programming services | Exact prior commercial identity; confirm status and residual rights |
| Meta-formative software brands | Software / services | Broad Meta Platforms portfolio warrants counsel review |

**Trademark verdict:** caution — counsel before final shortlist  

---

## 3. Ergonomics

| Check | Y / N | Note |
|---|---|---|
| CLI length OK (≈3–8 chars) | ~ | 9 letters; still easy to type: `metaslash run` |
| Dotfolder `.…/` clean | Y | `.metaslash/` |
| Zoom spelling OK | Y | Two ordinary words |
| Podcast needs “spelled like…”? | N | Pronunciation and spelling are predictable |
| Searchable as *our* product? | ~ | Exact prior company and descriptive phrase dilute ownership |

---

## 4. Scorecard

| Dimension | Max | Score | Note |
|---|---|---|---|
| A. Fit | 25 | **22** | Strong meta-layer-over-slash-commands product story |
| B. npm | 20 | **20** | Exact package clear |
| C. Competitor | 25 | **13** | No live exact product; historical exact software identity and category phrase |
| D. Registries + GitHub | 10 | **7** | Registries clear; active exact GitHub user taken |
| E. Ergonomics | 15 | **11** | Clear speech/spelling; 9 characters and weaker search ownership |
| F. Domains | 5 | **4** | `.sh`, `.dev`, and `.ai` appear open; `.com` registered |
| **Total** | **100** | **77** | |

| Gate | Pass? |
|---|---|
| npm usable for free/public package | **Y** |
| No high-risk same-name competitor | **~** — no live product found; historical exact software company needs verification |
| Fit + tone OK for Centauri companion product | **Y** |
| Domains acceptable (optional) | **Y** |
| Hard override triggered? | **No** |

**Overall:** **Advance** — conditional on prior-use and trademark review  

**If Maybe — smallest rename that keeps the idea:**  
> `slashmeta` reverses the compound, but loses some of the natural “layer above” reading.

**Discuss next:**  
1. Confirm whether MetaSlash, Inc. remains active and who controls its software-name rights and `.com`.  
2. Test whether users hear “dashboard above slash commands” or expect a command-authoring feature.  
3. Have counsel assess the exact historical name and Meta-formative risk before adoption.  

---

## 5. Checklist for the evaluator

- [x] npm exact + search  
- [x] PyPI / gems / crates / brew skim  
- [x] GitHub org + user + `in:name` search  
- [x] Google exact software/SaaS  
- [x] DNS skim `.com` `.dev` `.sh` `.ai`  
- [x] Note trademark heat if any  
- [x] Fill scorecard  
