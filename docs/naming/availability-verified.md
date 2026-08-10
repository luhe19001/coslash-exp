# Product name — verified availability screen

_Run 2026-07-29. This is the check §41.4 and §42.4 of [product_name_discussion.md](product_name_discussion.md)
asked for and could not run: **actual registry and registry-of-domains lookups**, not web-search
impressions. 147 candidates screened mechanically; 35 taken through a full screen._

---

## 0. What was actually checked, and how

| Gate | Method | Reliability |
|---|---|---|
| **npm** | `GET registry.npmjs.org/<name>` — 404 = free | Authoritative |
| **PyPI** | `GET pypi.org/pypi/<name>/json` — 404 = free | Authoritative |
| **GitHub handle** | `GET github.com/<name>` — 404 = free | Authoritative for the *handle*; a 200 is often just a personal account, and is **not** a blocker (the repo can live at `centauri-ai/<name>`) |
| **`.com` `.dev` `.ai` `.app`** | RDAP via `rdap.org` — 404 = unregistered | Authoritative |
| **Live site on the `.com`** | DNS + HTTP title fetch | Distinguishes *parked/dormant* (acquirable) from *live business* (not) |
| **Prior commercial use** | Targeted web search per finalist | Indicative only |

**Two things this is not.** `.io` and `.sh` were dropped mid-run: `rdap.org` returns 404 for
`github.io` and `google.sh`, which are obviously registered, so those TLDs cannot be screened this way
and need a registrar lookup. And **none of this is a trademark search** — USPTO classes 9 and 42 still
need `tmsearch.uspto.gov` plus a lawyer on whichever name you pick.

---

## 1. Headline: the existing shortlist mostly failed

§49 closed on **Rubra · Verba · Capsa · Toliman · Cairn**. Under real checks, three of the five are out
and a fourth is wounded.

| Name | Verdict | Evidence |
|---|---|---|
| **Verba** | ❌ **Out** | **npm taken.** The §48 recommendation fails the one gate you named as non-negotiable |
| **Cairn** | ❌ **Out** | **npm taken**, PyPI taken, GitHub taken, and `.com` `.dev` `.ai` `.app` all registered. Zero surface |
| **Capsa** | ❌ **Out** | **Capsa Healthcare** — founded 1968, 500–1,000 staff, and it *ships medication-management software*. That is class 9 against class 9, the same shape as Pyxis. Also: `.com` `.dev` `.ai` `.app` all taken |
| **Rubra** | ⚠️ **Wounded** | `rubra.com` serves a live product titled **"rubra social bookmark manager"** — software, in the save-and-reuse-knowledge space specifically. Plus phonetic collision with **Rubrik** (multi-billion-dollar data company). Only `.app` is free |
| **Toliman** | ⚠️ **Survives** | npm **free**, `.dev` **free**, `.app` **free**. PyPI taken. The class-9 Toliman Health filing from §42.1 is still the open question |

And the §41 recommendation fared no better: **Crux, Azimuth, Proxima, Pyxis, Apsis, Orrery, Almanac,
Parallax, Ephemeris — every single one is taken on npm.** **Pyxis** is also confirmed dead
independently: **BD Pyxis** is a major medical brand whose product line includes software modules.

**§49.4 was right, and stronger than it knew.** Descriptive names in this category are gone. I tested
the two best new descriptive candidates I could construct and both died on contact:

- **Docket** — the single best plain-English fit for this product (*the visible record card of
  proceedings*, and *the queue of work*). Four live products, including one on Product Hunt pitched as
  **"like Jira but for indie devs and AI agents."** Dead.
- **Brevia** — npm and GitHub both free, but **brevia.app** is a live AI tool, alongside **Brev**
  ($3.3M, 2026) and **Brevian** ($9M). Dead.

---

## 2. Recommended — clean on every gate that can be checked

Ordered by my read. All five are npm-free, PyPI-free, and hold at least one credible TLD.

### Tier 1

| Name | Said | Meaning | npm | PyPI | GitHub | Domains | The catch |
|---|---|---|---|---|---|---|---|
| **Excerpta** | ex-CERP-ta | Latin *"the excerpts"* — the passages lifted out of a longer work and kept because they are the part worth having again | **free** | **free** | **free** | `.dev` **free** · `.ai` **free** · `.app` **free** · `.com` dormant | **Excerpta Medica** (Elsevier → Omnicom; EMBASE) is an established name in *medical publishing* — different field, but a real prior use |
| **Siglum** | SIG-lum | The identifying mark assigned to **one particular witness of a text** — the label that says *which version this is* | **free** | **free** | taken | `.ai` **free** · `.com` dormant | `.dev`/`.app` taken; GitHub handle taken |
| **Verbim** | VER-bim | Coined from *verbatim* — the record exactly as it was said. **The doc's own §48.3 variation** | **free** | **free** | taken | `.dev` **free** · `.ai` **free** · `.app` **free** · `.com` parked | Reads as a **typo of Verbatim** to anyone who knows the storage brand. Sound-alike risk cuts both ways |
| **Counterfoil** | COUNT-er-foil | The half of a ticket or cheque **you keep** as your record of the transaction | **free** | **free** | taken | `.ai` **free** · `.com` dormant | Three syllables and slightly Victorian. `.dev`/`.app` taken |
| **Florileg** | FLOR-ih-leg | Clipped from *florilegium* — a **curated gathering of the best excerpts, compiled so they can be reused**. Conceptually the most exact fit in this entire document | **free** | **free** | **free** | **`.com` free** · `.dev` **free** · `.ai` **free** · `.app` **free** | **Nothing is taken anywhere** — the only name here where you can own the `.com` today. Cost: the `-leg` ending is graceless in English, and it is not a standalone word |

### Tier 2 — one real strike each

| Name | Meaning | Position | Strike |
|---|---|---|---|
| **Toliman** | Alpha Centauri's own name — tightest possible parent tie | npm · `.dev` · `.app` free | Class-9 healthcare trademark (§42.1); PyPI taken |
| **Symbolon** | The **split token**: two halves of a broken tally, rejoined to prove the two parties belong together. Your cross-vendor handoff, named | npm · `.dev` free | **Symbolon AG** (Liechtenstein business coaching) holds the `.com`; PyPI taken |
| **Recensio** | A *recension* — a revised text that **incorporates all prior versions** into one authoritative edition | npm · PyPI · `.dev` · `.app` free | Four syllables |
| **Notula** | A *little note* | npm · PyPI · `.dev` free | Thin meaning; near "nodule" |
| **Kartei** | German for **card index** — literally the visible-card filing system | npm · `.dev` · `.ai` free | Only legible to German speakers; KAR-tye invites two readings |
| **Cerpta** / **Excerpa** | Coinages off *excerpt* | Both **fully free** on npm, PyPI, GitHub, `.dev` | Meaningless until explained; fallbacks if Excerpta's `.com` proves unbuyable |

### Ruled out, with evidence

**Blocked by a real company in or near software:** Capsa (Capsa Healthcare), Pyxis (BD), Rubra (rubra
social bookmark manager + Rubrik), Docket (4 products, one in your exact category), Brevia
(brevia.app), Catchword (top-ranked naming agency — npm and GitHub free, but the irony is fatal),
Recolla (the `recoll` desktop-search tool; also a retail font).

**Dead on npm alone** — every one of these is an unavailable package name: `acta, alidade, adversaria,
almanac, anamnesis, apsis, apparat, ariadne, azimuth, baton, breve, brevet, cairn, cardex, cardstack,
carryover, catena, chit, clew, codicil, collation, colophon, continuo, crux, docket, dogear, dossier,
ephemeris, fasti, filum, folia, foliant, folium, glossa, gnomon, handoff, hypomnema, incipit, keepsake,
lookback, marginalia, memento, memoria, memorandum, mneme, orbita, orrery, palimpsest, parallax,
pericope, pinax, proxima, pyxis, quipu, quire, recap, relay, reprise, rescript, scholia, semita, sigla,
stele, stemma, steno, stub, symbola, tessel, tessera, throughline, touchstone, vellum, verba, verbatim,
vernier, vestigia, zettel`

Note what is in that list: **every compound I tried** — Throughline, Touchstone, Carryover, Keepsake,
Lookback, Handoff, Dogear, Cardstack — is taken on npm. The two-words-combined lane you asked about is
picked clean at the good end; the only free compound worth anything was **Keepline**, which is a
coinage rather than a word.

---

## 3. My recommendation

**Excerpta**, with **Florileg** as the zero-conflict alternative and **Siglum** as the short one.

**Why Excerpta.** It is the only candidate that is simultaneously (a) free on npm, PyPI, *and* the
GitHub handle, (b) free on `.dev`, `.ai`, *and* `.app`, and (c) carries the product's actual job in a
word an English speaker parses on first hearing — *excerpt* is right there. What your product does is
lift the part of a long agent session that is worth keeping and make it re-findable and re-usable. That
is what an excerpt is. `npx excerpta`, `excerpta run`, `.excerpta/` all read correctly, and "it's in
Excerpta" sounds like a place where work lives. Against Centauri it scans cleanly — three syllables to
four, no rhyme, no consonant tangle.

Its two costs are honest ones. **Excerpta Medica** is a real prior name, but it is a medical-publishing
brand and always used as the compound, which is the kind of distance that normally coexists — still,
it is the first thing to put in front of a trademark lawyer. And `excerpta.com` is registered with no
DNS at all, so the `.com` is an aftermarket purchase of unknown price rather than a $12 registration.

**Take Florileg instead if owning `excerpta.com`-equivalent matters more than gracefulness.** It is the
only name in 147 that is free *everywhere I looked, including the `.com`* — you could own the complete
set this afternoon for registration price. It also has the single most precise meaning of any candidate
in this document: a florilegium is a compilation of the best excerpts, assembled specifically so they
can be reused later. That is your product's thesis. It just doesn't sound as good.

**Take Siglum if brevity wins.** Two syllables, one possible pronunciation, hard consonants that
survive a bad phone line, and it means *the label identifying which version of a text this is* — which
is, precisely, what a card over a forked agent session is.

---

## 4. Next steps

1. **Register defensively today**, before deciding. Registration is cheap and reversible; losing the
   name is not. For your top two: reserve the npm package (publish a `0.0.0` placeholder — npm names
   cannot be reserved otherwise), create the GitHub org, and register `.dev` + `.ai`.
2. **Check `.io` and `.sh` at a registrar** — RDAP could not screen them and my results say nothing
   about either.
3. **Get an aftermarket quote** on `excerpta.com` (registered, no DNS) or just register `florileg.com`.
4. **USPTO classes 9 and 42** on the finalist, then a lawyer. The specific question for Excerpta is
   coexistence with Excerpta Medica; for Toliman it is the Toliman Health class-9 filing.
5. **Do not re-test descriptive names one at a time.** That loop has now failed on Recapi, Histora,
   Verbatim, Lemma, Rubric, Docket, and Brevia. The evidence says commit to the
   obscure-real-word-or-coinage lane.

---

## Appendix — full screen of the 35 finalists

`free` = confirmed unregistered/unpublished. GitHub column is the *handle*, not a blocker.

| name | npm | PyPI | GitHub | .com | .dev | .ai | .app |
|---|---|---|---|---|---|---|---|
| brevia | **free** | taken | **free** | taken | taken | taken | taken |
| capsa | **free** | **free** | taken | taken | taken | taken | taken |
| catchword | **free** | taken | **free** | taken | **free** | taken | taken |
| cerpta | **free** | **free** | **free** | taken | **free** | **free** | **free** |
| collecta | **free** | **free** | taken | taken | **free** | taken | taken |
| counterfoil | **free** | **free** | taken | taken | taken | **free** | taken |
| diptych | **free** | **free** | taken | taken | ?302 | taken | ?302 |
| docketry | **free** | **free** | taken | taken | taken | taken | **free** |
| earmark | **free** | **free** | taken | taken | taken | taken | taken |
| excerpa | **free** | **free** | **free** | taken | **free** | taken | **free** |
| excerpta | **free** | **free** | **free** | taken | **free** | **free** | **free** |
| florileg | **free** | **free** | **free** | **free** | **free** | ?429 | **free** |
| ipsa | **free** | **free** | taken | taken | **free** | taken | taken |
| kartei | **free** | taken | taken | taken | **free** | **free** | taken |
| keepline | **free** | **free** | taken | taken | **free** | taken | **free** |
| minuta | **free** | **free** | taken | taken | taken | taken | ?429 |
| notula | **free** | **free** | taken | taken | **free** | taken | taken |
| ostracon | **free** | **free** | taken | taken | taken | taken | taken |
| promptuary | **free** | **free** | **free** | taken | taken | ?429 | taken |
| recensio | **free** | **free** | taken | taken | **free** | taken | **free** |
| recolla | **free** | **free** | taken | taken | **free** | **free** | **free** |
| repertory | **free** | **free** | taken | taken | **free** | taken | taken |
| rubra | **free** | **free** | taken | taken | taken | taken | **free** |
| rubrica | **free** | **free** | taken | taken | taken | taken | taken |
| siglum | **free** | **free** | taken | taken | taken | **free** | taken |
| slipbox | **free** | taken | taken | ?429 | taken | taken | ?302 |
| spolia | **free** | **free** | taken | taken | taken | taken | taken |
| sylloge | **free** | taken | taken | taken | **free** | taken | **free** |
| symbolon | **free** | taken | taken | taken | **free** | taken | taken |
| tabella | **free** | taken | taken | taken | taken | taken | taken |
| tesera | **free** | **free** | taken | taken | taken | taken | taken |
| tessra | **free** | **free** | taken | taken | taken | taken | taken |
| toliman | **free** | taken | taken | taken | **free** | taken | ?429 |
| verbim | **free** | **free** | taken | taken | **free** | **free** | **free** |
| zibaldone | **free** | **free** | taken | taken | **free** | taken | taken |

_Ambiguous RDAP cells (`?429`/`?302`) were re-queried individually: `promptuary.ai` taken, `florileg.ai` free, `minuta.app` taken, `toliman.app` free, `slipbox.com` taken, `slipbox.app` taken, `diptych.dev` taken, `excerpta.ai` free, `excerpta.dev` free._
