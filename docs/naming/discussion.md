# Product name — discussion notes

_Working document, 2026-07-29. Not a shortlist to pick from. The goal is to widen the field and
sharpen the criteria so the eventual choice is obvious rather than argued into._

> ⚠️ **Availability claims in this document are unverified.** The registry checks §41.4 and §42.4 ask
> for have since been run — see **[product-name-availability-verified.md](product-name-availability-verified.md)**.
> Headline result: **Verba, Crux, and Cairn are all taken on npm**, and **Capsa** is blocked by Capsa
> Healthcare. Of the §49 shortlist only **Toliman** and (wounded) **Rubra** survive. Check that file
> before acting on any recommendation below.

---

## 1. What are we actually naming?

Three layers are in play and they are currently tangled:

| Layer | Today | Status |
|---|---|---|
| Company | Centauri AI | YC-backed, built for finance/alt-investments, now pivoting |
| Product | FleetLog | Pre-release, private package, never published |
| Component | Columbus / Atlas | Internal; may or may not ship |

**First finding, from the code audit: the component layer is already broken.** The orchestration
board is called `Columbus` throughout the codebase (`ColumbusCanvas`, `columbus-workspace.ts`,
`.fleetlog/columbus/boards/`) and **`Atlas Canvas`** in the UI (`FleetlogTabMenus.tsx:62`,
`FleetlogPage.tsx:80`). One feature, two names, neither retired. Whatever gets decided at the
product level should resolve this too — a two-name feature is a symptom of not having settled what
the thing is.

**Recommendation before anything else: decide whether you are naming one thing or three.** At seed
stage the strong default is *one name for company and product* (Datadog, Greptile, Temporal, Vercel,
Snowflake all did this) with components getting plain descriptive labels — "the canvas", "the
board", "workflows" — rather than codenames. Two brands is double the budget and half the recall.
Columbus and Atlas can stay internal codenames indefinitely; they should probably never become
public sub-brands.

**Five options this section surfaces** *(how many things you name)*

1. **Remuda** — one name for company + product; components stay “canvas / board / workflows.”
2. **Centaur** — collapse into the human+machine term of art; retire Centauri/FleetLog/Columbus as public brands.
3. **Centauri + Remuda** — keep company, rename product only; components stay descriptive.
4. **Auk** — fresh single brand, maximum distance from finance-era Centauri and log-era FleetLog.
5. **Fleet** — bare continuity name; cheapest story, accepts search collision, still one public brand.

---

## 2. What the product is, in the terms a name has to fit

Grounded in the codebase audit rather than aspiration, because names fail when they describe the
pitch instead of the product.

**What exists today:** a single-page local tool that reads `~/.claude` and `~/.codex`, derives
meaning from vendors' own JSONL rollout logs, and shows you every coding-agent session you have ever
run — as a list, a board, a spatial canvas per session, and an LLM daily digest. It does not own the
session. It is a **reader and derivation layer over someone else's agents.**

**What it is becoming:** the Columbus/Atlas half — launching real CLIs, wiring components, forking
sessions across vendors, driving a ticket to a PR. That half writes.

**Three things a name should probably respect:**

1. **The most defensible idea is vendor neutrality.** The cross-vendor handoff packet — measured,
   93–99% reduction, Claude context transplanted into Codex and back — is the piece nobody else has
   and the piece the docs keep circling. The product's real position is *the layer above
   heterogeneous agents that makes them one system.* Not a log viewer. Not another orchestrator.
2. **The user stays in control.** The doc's own invariant: "Columbus must not create a hidden
   headless-only agent"; "the user is always the final authority." This is a **human-in-the-loop**
   product by explicit design, not by omission. That is a positioning asset and a naming seed.
3. **Fleet is real.** Many concurrent agents, many repos, one person overseeing them. The internal
   persona in the shipped prompts is literally *"chief of staff for a developer who manages coding
   agents as delegated workstreams."* Whatever the name, this framing is good and worth keeping.

**Five options this section surfaces** *(names that respect the three truths)*

1. **Handoff** — vendor neutrality as the named primitive; the measured cross-vendor packet.
2. **Rein** — human final authority as the named control surface.
3. **Remuda** — fleet of interchangeable mounts under one rider; chief-of-staff shape without “Fleet.”
4. **Bridge** — the layer above heterogeneous agents, not another agent and not a log viewer.
5. **Centaur** — human-in-the-loop as term of art; invariant and category claim in one word.

---

## 3. The case against FleetLog (and the part worth keeping)

**"Fleet" is right and crowded.** It captures the many-agents-one-overseer shape exactly. But in
developer tools it is occupied: JetBrains Fleet (the IDE — discontinued December 2025, which frees
it somewhat, though it leaves residue) and FleetDM (active, osquery-based device management). Naming
into a word two devtools already used is a search-results problem forever.

**"Log" is the actual mistake.** It names the wedge, not the product. Three specific problems:

- The center of gravity has already moved. The newest and self-declared "product-level source of
  truth" doc is entirely about orchestration and control. Nothing in it is a log.
- Category names age badly. "Log" pins you to observability at exactly the moment you are becoming a
  control plane. Datadog got to stretch from monitoring into everything because "Datadog" is
  *semantically almost empty*. "FleetLog" is semantically specific — it tells you what shelf to put
  it on, and then you are on that shelf.
- It undersells. "Log" is passive, retrospective, read-only. The product's own promise is
  configure-then-advance.

**Cost of changing: low, but not zero.** Private package, no CLI, no published artifact, one route,
one page directory. Three things need a migration plan and they are the reason to decide *now*
rather than after release:

- `localStorage` keys, all `fleetlog.*` — including saved Columbus boards.
- **`.fleetlog/` written into users' repos**, and appended to their `.gitignore`. Boards there are
  explicitly meant to be committed. Rename this after other people's repos contain it and you own a
  migration forever.
- tmux session names `fleetlog_<id>`, which the docs instruct users to `tmux attach` by hand.

**Keep if you rename:** the fleet framing, the chief-of-staff persona, and the manager's-cockpit
language. Those are good. It is only the "-Log" that should go.

**Five options this section surfaces** *(keep Fleet framing, kill Log)*

1. **Fleethelm** — Fleet + steering; control plane, not record store.
2. **Fleetdeck** — Fleet + manager’s cockpit language already in the docs.
3. **Fleetbridge** — Fleet + vendor bridge; neutrality without saying “log.”
4. **Fleet** — bare; maximum continuity, maximum JetBrains/FleetDM residue.
5. **Remuda** — keep the *framing* (pool under an overseer), drop the *word* Fleet entirely.

---

## 4. Seed 1 — capybara

### 4.1 The metaphor is stronger than "relaxed"

The calm-and-welcoming read is real but it is the weak version. The sharp version:

**The capybara is the animal that everything else gets along with.** Birds ride them, monkeys sit on
them, other species tolerate them universally. They are the interop layer of the wetland. For a
product whose defining technical achievement is *making Claude and Codex sit on the same
platform peacefully*, that is not a cute association — it is the actual thesis in animal form.

Three more that land:

- **Group size and structure.** Herds of 10–30, up to 100 in dry season, with a dominant male and
  tolerated subordinate males who do not get driven out. A fleet with a lead and coexisting workers
  is very close to the planner/worker topology.
- **Calm under load.** The observability promise: many things happening, nobody panicking.
- **Semi-aquatic, always watching.** Eyes, ears and nostrils on top of the head so it can submerge
  and still observe. That is almost too neat a description of a monitoring layer.

### 4.2 The hard problem

**`capybara` is one of the most-used Ruby gems in existence** — `teamcapybara/capybara`, the
standard acceptance-testing framework for Rack apps, ~3.40.x, in a large fraction of Rails
codebases. It lives squarely in developer tooling. `gem install capybara` already means something
else to the exact people you are selling to.

That is a hard blocker on the literal word for a dev tool. It is *not* a blocker on anything else.

### 4.3 The resolution: keep the capybara, don't use the word

**A mascot and a name are separable.** Datadog's mascot is Bits the dog; the name and the character
do independent work. GitHub has Octocat; Mozilla, Linux, Go, Rust, PostgreSQL all carry animals that
are not their names. You can have a capybara on the landing page, in the CLI's ASCII art, on the
stickers, in the 404, and in the brand voice — while the name does something else entirely.

This is probably the right answer to seed 1: **it gives you everything you liked about the capybara
with none of the collision.** And a capybara mascot on a serious infrastructure product is a good
tonal signature — it says *calm* in a category that is mostly shouting.

### 4.4 If you still want it in the word

Derivations and cognates, roughly in order of usability:

| Word | Origin | Note |
|---|---|---|
| **Carpincho** | Río de la Plata Spanish for capybara | Charming, ownable, genuinely obscure. Hard to spell from hearing |
| **Chigüire** | Venezuelan | Diacritic kills it for a CLI |
| **Ronsoco** | Peruvian | Sounds like a brand already |
| **Capivara** | Portuguese | One letter from the gem — worst of both worlds |
| **Hydrochoerus** | Genus, Greek "water hog" | Too long; "Hydro-" is generic |
| **Cappy / Capy** | Diminutive | Reads unserious; likely squatted |

`Carpincho` is the only one I would keep on the table, and mostly as a mascot name.

**Five options this section surfaces** *(keep the thesis, dodge the gem)*

1. **Carpincho** — cognate that owns the animal; best as mascot/character name if Zoom-spelling fails.
2. **Egret** — bird that rides the capybara; product = rider, mascot = platform.
3. **Riverdog** — Datadog-shaped compound; mascot carries interop/calm without saying capybara.
4. **Remuda** — same Río de la Plata region as *carpincho*; fleet metaphor, animal stays mascot.
5. **Sandbar** — wetland meeting ground; semantically light, mascot does the “species get along” work.

---

## 5. Seed 2 — Centauri, and the much better idea hiding inside it

You described two meanings: the distant intelligent star, and the half-human half-horse. **They are
not equally good, and the weaker one is the one currently doing the work.**

**"Centauri" as a star** is generic sci-fi. Alpha Centauri, Babylon 5, a hundred companies. It says
"space, future, tech" — which is to say, nothing. It is also the finance-era name, and the Crunchbase
and YC listings still read *"The Modern ETL and Data Science Platform for Finance."* Carrying it
forward means carrying that.

**"Centaur" as human+machine is excellent, and you may be underrating how excellent.** In AI, the
centaur is not a vague metaphor — it is a *term of art*. **Centaur chess** (Kasparov's "advanced
chess") is human+engine teams, and for years those teams beat both grandmasters and engines alone.
"Centaur" is the canonical word for human-AI collaboration that outperforms either alone.

Now read your own product invariant back:

> "Columbus must not create a hidden headless-only agent with no direct user path to the underlying
> CLI… The user is always the final authority over the agent and the workflow."

**That is the centaur thesis, stated as an engineering requirement.** The company name you are
considering leaving accidentally encodes the new product's core differentiator far better than it
encoded the old one. Worth sitting with before discarding.

Two ways to use it:

- **Keep Centauri, rename the product.** The centaur meaning gets recovered by the new positioning
  rather than the name changing.
- **Move into the horse half.** The centaur's lower body is the interesting part for a fleet
  product, and it opens a word bank nobody in this category is using — see §7.3. This is where
  seeds 1 and 2 unexpectedly converge.

**Five options this section surfaces** *(use the centaur idea, not the star)*

1. **Centaur** — ship the term of art; separate carefully from company name Centauri.
2. **Chiron** — the wise centaur; shorter, in-family, less generic than Centaur.
3. **Remuda** — move into the horse half; pool of mounts, human rider implied.
4. **Rein** — the human holds control; centaur invariant without mythology.
5. **Turma** — cavalry of ~thirty; horse half + herd size from seed 1 in one Latinate word.

---

## 6. Decoding the names you like

You gave six references. They are not one style — they are five distinct formulas, and knowing which
one you are in matters more than any individual candidate.

| Reference | Formula | What it buys | What it costs |
|---|---|---|---|
| **Datadog** | concrete noun + concrete noun, semantically near-empty | Infinite room to stretch; mascot comes free | Says nothing; needs marketing spend to mean anything |
| **PuppyGraph** | animal + technical primitive | Warmth plus a literal category signal | The literal half dates as you outgrow it |
| **Tableau** | borrowed real word, elevated register | Feels designed, not engineered | No tech signal; SEO-hostile |
| **Greptile** | **command × animal portmanteau** | Double duty: says what it does *and* has a creature | Hard to find one that isn't forced |
| **Temporal** | the core primitive as a bare abstract noun | Maximum confidence; owns a concept | Unsearchable; only works if you own the category |
| **Repsan**-style | coined, command-shaped, meaning-free | Total availability, total ownership | Meaningless on day one |

**The useful observation: your two seeds converge on the Greptile quadrant.** You like an animal
(capybara) and you like system-command word variations. Greptile is exactly `grep` × `reptile`. That
is the formula your own taste is pointing at, and it is the highest-craft quadrant on the list.

The mechanism that makes Greptile work is worth stating precisely, because it is imitable:
**overlap, not concatenation.** `g-rep-tile` — the command is *inside* the animal, not bolted to it.
`PuppyGraph` concatenates and reads as two words; `Greptile` fuses and reads as one. Look for words
where the technical term is already hiding.

**Five options this section surfaces** *(one candidate per formula you liked)*

1. **Auk** — Greptile formula: command (`awk`) inside animal; overlap, not concatenation.
2. **Forktail** — PuppyGraph-adjacent: animal + technical primitive, but nature already fused it.
3. **Riverdog** — Datadog formula: near-empty two-noun compound; mascot carries feeling.
4. **Attaché** — Tableau formula: borrowed elevated word; **attach** hides inside.
5. **Handoff** — Temporal formula: bare primitive for what you own; searchability is the tax.
   *(Repsan foil if you want a sixth later: **Pinemux** — coined, command-shaped, meaning-free.)*

---

## 7. Word banks

Raw material, not candidates. The point is to see the territory.

### 7.1 Commands and primitives that actually describe this product

Ranked by how true they are to what the thing does:

- **`fork`** — session forking is the core mechanic. The deepest Unix concept in the product.
- **`tee`** — split a stream to a file and a view. Literally the §6.1 architecture: the file is the
  authority, the pane is the view.
- **`tail -f`** — the observability verb. Also an animal part.
- **`mux` / `tmux`** — multiplexing many sessions into one surface. Precisely what the app is.
- **`attach` / `detach`** — how you take over an agent and hand it back.
- **`watch`, `top`, `ps`, `trace`, `strace`** — the observation family.
- **`exec`, `spawn`, `wait`, `join`** — the lifecycle family.
- **`awk`, `sed`, `grep`** — the classic text-processing family; strongest *sound*, weakest fit.
- **`worktree`, `rebase`, `merge`** — the git family, newly relevant now that runs get isolated
  worktrees.

### 7.2 Animals with the right behaviour

Beyond capybara, chosen for *behavioural* fit rather than cuteness:

- **Meerkat** — sentinel behaviour: one stands watch while the others work, and calls out. The most
  literally-correct observability animal there is.
- **Otter** — a group of otters is a **raft**; they hold hands so the raft doesn't drift apart. Also
  one of the few tool-using mammals. And **Raft is the consensus algorithm** — a genuine double
  meaning, though Raft-the-algorithm is too famous to own.
- **Octopus** — central brain plus semi-autonomous arms, each with local neurons solving problems
  independently. Biologically the best multi-agent metaphor that exists. Unusably crowded in infra
  (Kraken, Octopus Deploy, GitKraken).
- **Ant / termite** — see §7.4, this one earns its own section.
- **Starling** — murmuration; thousands coordinating with no central controller.
- **Corvid / rook** — tool use and planning. A **rookery** is where a colony nests.
- **Auk** — colonial seabird, enormous colonies, and a near-homophone of **`awk`**. Three letters.
- **Tern** — colonial, extreme-distance migrant, and one letter from **term**inal.
- **Heron** — stands motionless watching, then strikes. Also **Heron of Alexandria**, who built the
  first known automata. Watch-then-act, plus an automation ancestor. (Collision: Apache Heron.)
- **Egret** — and note that egrets are among the birds that *ride capybaras*. The platform metaphor,
  if you want a deep cut.

### 7.3 The horse bank — where seed 1 and seed 2 meet

Nobody in agent tooling is using this vocabulary, and it is unusually well-suited.

- **Remuda** — the herd of spare horses a ranch keeps, from which each rider draws a fresh mount for
  the day's work. **This is a compute-fleet metaphor that already existed.** A pool of
  interchangeable mounts, drawn from as needed, returned when tired. It is a Río de la Plata /
  ranching word — the same region the capybara (*carpincho*) comes from. Three syllables, spellable,
  sayable, almost certainly available in every namespace.
- **Turma** — a Roman cavalry squadron of about **thirty riders**. You described capybara herds as
  "20, 30". A turma is cavalry, i.e. the horse half of the centaur. **It merges both seeds
  numerically and semantically**, which is either a lovely coincidence or a sign.
- **Rein / Reins** — the control surface. Short, real, and it says *the human holds it*, which is
  the product invariant. `rein run` types well.
- **Tack, Bridle, Hitch, Canter, Furlong** — a furlong is the distance a horse plows without rest;
  a *unit of delegated work*. Charming, possibly too clever.
- **Corral, Paddock, Stable** — the containment cluster. "Stable" is unusable (stable/unstable, and
  Stable Diffusion) but the shape is right.

### 7.4 One concept worth knowing by name: stigmergy

The architecture you converged on in the Columbus doc — components never talk to each other, they
read and write artifacts in a shared run folder, and deterministic code composes the next prompt —
has a precise scientific name.

**Stigmergy**: coordination through traces left in a shared environment rather than through direct
communication. It is how ants and termites build without a plan or a manager.

This is worth knowing for two reasons. It is a **naming seed** (ant, termite, trace, mound, pheromone
— though most read badly). More importantly it is a **positioning asset**: "agents coordinate through
artifacts, not conversation" is a real technical differentiator, it explains why you have no wasted
reporting turns, and having the academic term for it makes the argument sound researched rather than
improvised.

### 7.5 Coinage patterns (the Repsan quadrant)

If you go fully coined: two to three syllables; alternate consonant and vowel; end in `-a`, `-o`,
`-el`, `-io`, or a hard consonant; avoid `-ly`, `-ify`, `-r` truncations (dated), and avoid any
`AI`/`GPT` suffix (dates instantly and reads as a wrapper). Command-shaped coinages want a hard
consonant cluster at the front — `str`, `sp`, `tr`, `mx`, `gr` — because that is what real Unix
commands sound like.

**Five options this section surfaces** *(best pull from the banks)*

1. **Forktail** — §7.1 + §7.2: `fork` + `tail` already minted as a bird name.
2. **Meerkat** — §7.2: sentinel / chief-of-staff animal; one watches while others work.
3. **Remuda** — §7.3: strongest horse-bank word; fleet metaphor that already existed.
4. **Termite** — §7.4: stigmergy + **term**inal overlap; architecture thesis in one animal.
5. **Hitch** — §7.3 / short CLI: hook a mount (agent) onto the working string; three letters longer
   than Auk, ranch-native, Zoom-safe.

---

## 8. Screening rubric

Apply before falling in love. The Capybara/Ruby collision is the cautionary tale: **the web search
looked fine.** You have to check the package registries.

**Hard checks**

1. **Package registries, not just Google** — npm, PyPI, RubyGems, crates.io, Homebrew, Go modules.
   This is where dev-tool collisions hide.
2. **GitHub org availability.**
3. **Domain.** `.com` is hard and increasingly optional in devtools. `.dev`, `.sh`, `.ai`, `.io` are
   all credible; **`.sh` is unusually on-brand** for a terminal-native product.
4. **Trademark**, classes 9 and 42.
5. **Not an existing dev tool in an adjacent category.** JetBrains Fleet and FleetDM are why
   "Fleet" is compromised.

**Ergonomic checks**

6. **CLI length.** You have no CLI today, which means *zero constraints and full freedom* — spend
   it. Three to six characters is the sweet spot for something typed daily. `fleetlog run` gets
   aliased on day two; `auk run` does not.
7. **The dotfolder.** Whatever you pick becomes `.<name>/` inside other people's repos and
   `.gitignore` files. Short and lowercase-clean.
8. **Spell-it-over-a-bad-Zoom test.** Carpincho fails. Rein passes.
9. **Say-it-on-a-podcast test.** Does it need a "spelled like…"?
10. **Searchability.** Coined beats real-word. "Temporal" is a genuinely hard company to search for;
    "Greptile" takes one query.

**Strategic checks**

11. **Does it survive the next pivot?** Observability → orchestration → whatever follows. This is
    the test FleetLog fails.
12. **Does it fit the buyer?** Solo devs tolerate — reward — whimsy. Enterprise procurement does
    not. The audit shows a solo-built tool with team-shaped ambitions and an Azure-only LLM backend,
    which hints at a corporate deployment context. **Resolve the tone question before the name
    question.**
13. **Can it host a mascot?** If the capybara is coming along regardless, the name has to leave room
    for it.

**Five options this section surfaces** *(names that clear the rubric, plus one instructive fail)*

1. **Auk** — 3 letters; Zoom-safe; searchable coinage-feel; hosts any mascot; passes CLI/dotfolder.
2. **Rein** — short, spellable, serious tone; strong on authority; real-word search tax.
3. **Remuda** — sayable, stretchable past “log,” mascot room; one-sentence explain once.
4. **Remount** — familiar English; verb-ready CLI; softer trademark than Remuda.
5. **Carpincho** — instructive fail on §8.8 / §8.9 (Zoom + podcast spelling); keep as mascot, not CLI.

---

## 9. Directions, held loosely

Not a shortlist. Five *directions*, each with what it commits you to. Under each: **five options** to
make the direction concrete — still raw material, not a vote.

**A. Command × animal portmanteau** *(the Greptile quadrant — where your taste points)*
Look for animals with a command hiding inside. Commits you to: cleverness that has to survive being
explained once.

1. **Auk** — `awk` sits inside the colonial seabird; three letters; puffins are auks so the mascot
   draws itself. Cleanest Greptile fusion in the banks.
2. **Tern** — one letter from **term**inal; colonial migrant bird; same formula as Auk, slightly
   sterner sound.
3. **Forktail** — a real bird name that already compounds **fork** (core mechanic) + **tail**
   (`tail -f` / animal part). Nature minted the portmanteau.
4. **Termite** — **term**inal inside **termite**; stigmergy animal for the artifact-folder
   architecture (§7.4). Highest thesis density; pest tone is the gate.
5. **Raftail** — otter **raft** (group that holds hands) × **tail** (watch the stream). Many agents,
   one coherent group you observe.

**B. The horse bank** *(recovers seed 2, opens virgin territory)*
Pre-existing ranch/cavalry vocabulary for a pool of mounts under a human rider. Commits you to: a
metaphor nobody else in the category is using, and one short explanation.

1. **Remuda** — herd of spare horses drawn fresh each day. Exact compute-fleet metaphor; same region
   as *carpincho*; strongest single word in this document.
2. **Remount** — the fresh horse from the remuda; also the verb “get back on.” Session resume /
   new worker in plain English.
3. **Turma** — Roman cavalry of ~thirty; matches the herd size you tied to capybaras; horse half of
   the centaur.
4. **Rein** — the control surface; shortest statement of “user is final authority.” `rein run`
   types like a command.
5. **Gaucho** — the rider who draws from the remuda; human half of the ranch metaphor (centaur thesis
   in Río de la Plata form). Treat cultural weight carefully.

**C. Semantically empty, mascot-carried** *(the Datadog play)*
A two-noun compound or clean coinage that means little on day one, with the capybara doing the
emotional work. Commits you to: buying meaning with brand spend you may not have.

1. **Riverdog** — near-empty compound; quiet nod to the semi-aquatic mascot without saying
   capybara; Datadog-adjacent shape.
2. **Sandbar** — where wetland species meet; stretchable, calm, no category shelf; mascot does the
   interop story.
3. **Pinemux** — coined, command-shaped front cluster (`pine` + soft mux echo); owns nothing until
   you teach it.
4. **Carpincho** — Spanish for capybara; empty of tech meaning, full of mascot ownership. Hard to
   spell from hearing — better as character name than CLI if that fails §8.8.
5. **Rookery** — colony nest (corvids); warm and slightly empty of product claim; room to grow from
   “place agents live” into whatever comes next.

**D. Name the primitive** *(the Temporal play)*
A bare abstract noun for what you actually own. Commits you to: category leadership — this only
works if you define the category. Hardest to search for.

1. **Handoff** — names the measured cross-vendor differentiator; risk of sounding like a feature,
   not a product.
2. **Attaché** — elevated borrowed word with **attach**/detach hiding inside; specialist attached to
   a mission (chief-of-staff adjacent).
3. **Centaur** — term of art for human+engine teams that beat either alone; your invariant in one
   word. Separate carefully from company name Centauri.
4. **Stigmergy** — academic name for coordinate-through-artifacts (§7.4); maximally on-thesis,
   weakly spellable. Positioning gold; product-name risky.
5. **Bridge** — you are the layer between heterogeneous agents, not another agent. True, crowded,
   unsearchable.

**E. Keep Fleet, drop Log**
`Fleet` + a better second half, or Fleet alone. Cheapest migration; preserves framing you already
have. Commits you to: living beside JetBrains and FleetDM in search results forever.

1. **Fleethelm** — fleet + helm; keep many-agents framing, replace passive Log with steering.
2. **Fleetbridge** — control bridge + vendor bridge; you stand between Claude and Codex.
3. **Fleetdeck** — closest to the docs’ “manager’s cockpit” language.
4. **Fleetward** — guardian / toward-the-fleet feel; softer brand shape, weaker CLI story.
5. **Fleet** — bare. Maximum continuity, maximum collision with JetBrains residue and FleetDM.
   Only if you accept search forever and let the mascot + positioning do all differentiation.

**Current read, offered as a starting position rather than a recommendation:** direction B with a
capybara mascot resolves the most tensions at once — it recovers the centaur idea you already own,
opens unclaimed vocabulary, keeps the animal you like without the RubyGems collision, and gives you a
short CLI. **Remuda** is the specific word I would test first.

**Five options this section surfaces** *(one champion per direction)*

1. **Auk** — champion of A (Greptile craft + CLI length).
2. **Remuda** — champion of B (horse bank; doc’s starting test word).
3. **Riverdog** — champion of C (empty compound, mascot-carried).
4. **Centaur** — champion of D (primitive / term of art you already almost own).
5. **Fleethelm** — champion of E (keep Fleet framing, drop Log).

---

## 10. Decide these before deciding the name

1. **One name or three?** Company, product, components. Strong default: one. (§1)
2. **What category are you claiming?** Observability, orchestration, or *the neutral layer above
   heterogeneous agents*. The third is the most defensible and the least named. Names sort
   completely differently across the three. (§2)
3. **Whimsical or serious?** Solo-dev tone versus enterprise tone. This gates the capybara. (§8.12)
4. **Is the capybara a name, a mascot, or neither?** Recommendation: mascot. (§4.3)
5. **Does Centauri survive as the company name?** The centaur meaning fits the new product better
   than it fit the old one. (§5)
6. **When does `.fleetlog/` stop being written into other people's repos?** This is the real
   deadline. Every day of external use raises the migration cost. (§3)

**Five options this section surfaces** *(each forces a different answer to the gates above)*

1. **Remuda** — one public name; category = layer above agents; serious-enough; capybara = mascot;
   Centauri can stay or go; stop writing `.fleetlog/` as soon as you pick it.
2. **Centaur** — forces the Centauri company decision (merge, rename, or confuse); claims
   human+machine category outright.
3. **Auk** — forces the whimsy gate; best CLI; capybara can still be mascot beside a bird brand.
4. **Fleethelm** — delays leaving Fleet search space; buys migration calm; still kills Log now.
5. **Handoff** — forces category claim (“we are the handoff layer”); least whimsical; weakest as a
   standalone brand until you own the noun.

---

_Sources consulted for collision checks:_
[Capybara (Ruby gem)](https://rubygems.org/gems/capybara/versions/3.40.0) ·
[teamcapybara/capybara](https://github.com/teamcapybara/capybara) ·
[JetBrains Fleet](https://www.jetbrains.com/fleet/) ·
[JetBrains discontinues Fleet](https://devclass.com/2025/12/09/jetbrains-abandons-fleet-ide-pins-hopes-on-forthcoming-air-agentic-development-tool/) ·
[Fleet (fleetdm)](https://fleetdm.com/releases/fleet-4-76-0) ·
[Centauri AI on Y Combinator](https://www.ycombinator.com/companies/centauri-ai)

---

## 11. Name suggestions (expanded)

Preference from this discussion: **fuse a few words (or pick one dense word), keep the whole thing short, and make the meaning land without a pitch deck.**
Capybara stays mascot unless noted. Screen anything you like against §8 before attachment.

Earlier pass leaned too hard on bolted `X+mux` concatenations. This list prefers (1) real words that already carry the thesis, (2) Greptile-style *overlap* fusions, then (3) short compounds where both halves earn their place.

---

### 11.1 Direction B — horse / centaur bank (doc’s own strongest find)

These recover seed 2 (centaur = human+machine) and sit next to seed 1 geographically (Río de la Plata ranching ↔ *carpincho*). Nobody in agent tooling is using this vocabulary.

#### Remuda
A remuda is the herd of spare horses a ranch keeps; each rider draws a fresh mount for the day’s work and returns it when tired. That is already a compute-fleet metaphor — a pool of interchangeable agents/sessions, drawn as needed, not owned forever. Three syllables, spellable, sayable, almost certainly free in registries. Pairs cleanly with a capybara mascot (same region’s animal). Cost: one-sentence explain on first hearing; after that it owns itself. **This is still the word the rest of the doc would test first.**

#### Remount
A remount is the fresh horse taken from the remuda — and as a verb, “remount” means get back on. Compresses Remuda’s idea into a real English verb you already know: take another agent, resume a session, draw a new worker. Shorter CLI feel than Remuda (`remount run`), survives Zoom spelling, and doubles as product language (“remount this ticket onto Codex”). Cost: slightly more generic than Remuda; check collisions in ops/travel software.

#### Turma
Roman cavalry squadron of ~thirty riders. Matches the herd size you associated with capybaras (20–30), is literally the horse half of the centaur, and is two syllables. Merges seed 1 and seed 2 numerically and semantically. Cost: Latinate; may need “turma — like a cavalry unit” once. Strong if you want *fleet* meaning without the word Fleet.

#### Rein / Reins
The control surface. Shortest statement of the product invariant: the human holds it. `rein run` / `reins` types like a Unix command. Cost: real word → searchability and trademark harder than a coinage; “rein” alone can sound incomplete. Best as product name only if positioning leans hard into human authority.

#### Gaucho
The rider who draws from the remuda — the *human* half of the ranch metaphor, not the horse pool. Encodes centaur thesis in South American form: person in charge of a working string of mounts. Short, punchy, mascot-compatible. Cost: cultural weight (treat carefully); existing brands/restaurants; less “devtools” on first hearing than Remuda.

#### Cavvy
Cowboy slang for the remuda / cavvy yard. Four letters, CLI-perfect, obscure enough to own. Same metaphor as Remuda with Greptile-length ergonomics. Cost: so obscure it fails the podcast test without a spelling; easy to confuse with “cavy” (guinea pig family — ironically near capybara).

#### Furlong
The distance a horse plows without rest — a unit of delegated work. Charming fit for “one agent run / one workstream slice.” Cost: possibly too clever; racing/measurement associations; weaker fleet signal than Remuda.

#### Outrider
Scout who rides ahead of the herd and reports back. Maps to sentinel observability + chief-of-staff: one watcher, many workers. Cost: longer (8 letters); Western tone; less unique than Remuda.

---

### 11.2 Direction A — command × animal (Greptile quadrant)

Mechanism to copy: **overlap, not concatenation.** The command should already be hiding inside the animal (or a real animal-word should hide the command).

#### Auk *(awk ⊂ auk)*
Colonial seabird, enormous colonies (fleet), three letters, `auk run` never needs an alias. Puffins are auks → mascot draws itself even with capybara as brand character. Cleanest Greptile fusion in the banks. Cost: cleverness must survive one explanation (“like awk, but a bird”); soft animal may feel whimsical for enterprise buyers (§8.12).

#### Tern *(term ⊂ tern)*
Colonial seabird, long-distance migrant, one letter from **term**inal. Same formula as Auk, slightly more “serious” phonetics. Cost: small bird; “tern/turn/term” ear collisions on calls; less iconic mascot than auk/puffin.

#### Forktail *(fork + tail, and a real bird)*
Forktails are real birds (fork-tailed flycatchers, Asian forktails). The name is a compound that nature already minted: **fork** (core session mechanic) + **tail** (observability verb *and* animal part). Reads as one word, delivers two product truths without inventing a portmanteau. Cost: two obvious halves (more PuppyGraph than Greptile); “tail” can still echo logging if you are not careful in marketing.

#### Termite *(term ⊂ termite)*
Greptile-grade overlap: **term**inal sits inside **termite**, and termites are the textbook stigmergy species — coordination through traces in a shared environment, which is exactly the Columbus artifact-folder architecture (§7.4). One word that fuses CLI + architecture thesis. Cost: pest connotation is real; enterprise slide decks may reject it on sight; whimsy/serious tone gate (§8.12) is harsh here.

#### Raftail *(raft × tail)*
Otter group = raft (hold hands so the group does not drift) + `tail -f` observability. Says “many agents, one coherent group you watch.” Avoids owning Raft-the-algorithm while borrowing the good half of §7.2. Cost: coined feel; raft/Raft ear collision remains; less elegant than Forktail.

#### Egret
Bird that *rides the capybara* — the platform metaphor as a deep cut (§7.2). If the mascot is the capybara (interop layer), the product name can be the rider that uses that platform. Short, elegant, Tableau-adjacent. Cost: meaning is insider; no tech signal; SEO-hostile; needs the mascot story to do work.

#### Meerkat
Most literally correct observability animal: one stands watch, others work, sentinel calls out. Chief-of-staff in animal form. Cost: PuppyGraph warmth without a command half; longer; kids’-TV residue; does not encode vendor neutrality or forking.

---

### 11.3 Direction E — keep Fleet, drop Log

Cheapest migration path. Preserves framing you already like. Accepts JetBrains/FleetDM search residue forever.

#### Fleethelm
Fleet + helm. You keep “many agents, one overseer”; you replace passive “Log” with steering. Manager’s-cockpit language from §3, in one compound. Cost: 9 letters; still contains compromised “Fleet”; reads as two words more than Greptile does.

#### Fleetbridge
Ship’s bridge (control plane) + fleet. Also nods at bridging vendors — Claude on one side, Codex on the other, you in the middle. Cost: long (11); bridge is crowded in infra (network bridges, Bridgefy, etc.); Fleet residue remains.

#### Fleetdeck
Fleet + deck (ship deck / control deck). Closest to “manager’s cockpit” wording already in the docs. Cost: same Fleet search problem; “deck” is trendy in creator tools.

#### Fleetward
Archaic “toward the fleet” / guardian-of-the-fleet feel. Softer, more brand-like than Fleethelm. Cost: obscure adverb; weak CLI story; still Fleet-.

Better honest take for this direction: if you keep Fleet, prefer **Fleethelm** or bare **Fleet** over another `Fleet*` compound that still undersells. The second half must be *control*, not *record*.

---

### 11.4 Direction D — name the primitive (Temporal play)

Bare nouns for what you actually own. Only works if you commit to category leadership (§2’s “layer above heterogeneous agents”).

#### Handoff
The cross-vendor handoff packet is the measured differentiator (93–99% reduction). Naming the primitive is confident and accurate. Cost: common English → search/trademark hard; sounds like a feature, not a product; may pin you to “migration tool” shelf the way Log pinned you to observability.

#### Helm
Steering. Short as Auk, serious as Temporal. Fits human-in-the-loop without ranch metaphor. Cost: Helm-the-Kubernetes-package-manager is a hard collision in the exact buyer community; almost certainly disqualified on §8.1 / §8.5.

#### Bridge
Vendor-neutral layer; you are the bridge, not another agent. Cost: extremely crowded; unsearchable; feature-shaped.

#### Attaché *(attach ⊂ attaché)*
Elevated borrowed word (Tableau formula) with a command hiding inside: **attach** / detach is how you take over an agent and hand it back (§7.1). An attaché is a specialist attached to a mission — chief-of-staff adjacent. Cost: accent/spelling (`attache` vs `attaché`); diplomatic tone may feel off-category; soft tech signal.

#### Stigmergy / Stig
Academic name for “coordinate through artifacts, not conversation” (§7.4). Extremely on-thesis for Columbus. Cost: unspellable over Zoom; reads research-project; `Stig` alone is incomplete and surname-collidy. Better as positioning language than product name.

#### Overseer
Literal chief-of-staff / fleet overseer. Cost: dystopian tone; long; generic.

---

### 11.5 Direction C — short compounds / coinages that still mean something

Not empty Datadog — still deliver meaning — but fused enough to feel like one brand.

#### Forkraft *(fork × raft)*
Session **fork** (deepest Unix mechanic in the product) + **raft** (otter group that holds together; soft echo of Raft consensus without claiming it). One word for “branch workstreams that stay one system.” Cost: invented; must be heard once; raft/Raft collision in distributed-systems ears.

#### Reinhold *(rein × hold)*
Rein + hold — the invariant as a compound: human holds the rein. Also a recognizable surname-shaped brand (easy to say, easy to spell). Cost: surname collisions; less “tool” sounding; “hold” is soft.

#### Worktern *(work × tern / worktree × tern)*
Echoes **worktree** (isolated runs) and **tern**/terminal, with a colonial-bird animal in the second half. More Greptile-shaped than Fleethelm. Cost: slightly forced; “worktern/workturn” ear slip; needs one explanation.

#### Vendmux *(vendor × mux)*
Unsexy but precise: multiplex across vendors. Names the neutrality thesis head-on. Cost: ugly; “vend” feels retail; concatenation, not overlap; bad podcast name. Useful as a foil — shows what pure descriptiveness sounds like when it fails taste.

#### Polyrein *(poly × rein)*
Many agents, one rein. Compact statement of fleet + human authority. Cost: “poly” is Greek-prefix soup; medical/polyamory ear residue; feels coined-by-committee.

#### Handmux *(hand × mux)*
Human hand on the multiplexed surface. Shorter cousin of Reinmux without ranch vocabulary. Cost: “hand” is soft; concatenation; weaker than Rein or Remuda alone.

---

### 11.6 Centaur line (use the term of art, carefully)

#### Centaur
In AI this is not decoration — it is the word for human+engine teams that beat either alone (centaur chess). Your invariant *is* the centaur thesis as an engineering requirement (§5). As a product name it is instantly explainable to the AI-native buyer. Cost: mythic/fantasy residue for enterprise; possible confusion with company name Centauri; other “Centaur” products exist — registry check mandatory.

#### Chiron
The wise centaur; teacher/mentor figure. Shorter, less generic than Centaur, still in-family. Cost: astronomy/astrology (Chiron the comet/centaur object) and medical (Chiron Corp history) collisions; spelling “KY-ron” over the phone.

If Centauri remains the **company**, do not also ship Centaur as the **product** unless you explicitly want one brand tree. Prefer Remuda/Rein for product and let positioning recover the centaur meaning (§5’s first option).

---

### 11.7 How the suggestions map to what the name must respect (§2)

| Must respect | Strongest carriers |
|---|---|
| Vendor neutrality / layer above agents | Handoff, Bridge, Vendmux, Fleetbridge, Egret (platform story) |
| Human final authority | Rein, Reinhold, Centaur, Chiron, Attaché, Gaucho, Fleethelm |
| Fleet / many agents, one overseer | Remuda, Remount, Turma, Cavvy, Fleethelm, Meerkat, Forkraft, Auk/Tern (colonies) |
| Architecture (stigmergy, tee/fork) | Termite, Forktail, Forkraft, Stigmergy, Worktern |
| Survive next pivot (not “log”) | Remuda, Centaur, Rein, Auk, Handoff, Turma — anything not shelf-pinned to observability |

---

### 11.8 Working tiers (opinionated, not final)

**Tier 1 — test first (meaning dense, short, on-thesis)**
1. **Remuda** — best single-word match to the product shape; virgin territory; mascot-compatible.
2. **Remount** — same metaphor, more familiar English, verb-ready.
3. **Forktail** — nature-minted compound; fork + tail without forced coinage.
4. **Auk** — best Greptile craft; best CLI length.
5. **Rein** — shortest encoding of the invariant.

**Tier 2 — strong alternates**
Turma, Centaur (if company name changes or stays clearly separate), Fleethelm (if migration cost dominates), Forkraft, Attaché, Gaucho, Tern, Chiron.

**Tier 3 — interesting but gated by tone or collision**
Termite (stigmergy jackpot / pest problem), Cavvy (CLI gift / podcast liability), Egret (beautiful / insider), Meerkat (clear / soft), Handoff (true / feature-shaped), Furlong (clever / thin).

**Drop or foil only**
Vendmux, Polyrein, Handmux, Helm (K8s collision), bare Bridge, Stig — useful to argue against, not to ship.

---

### 11.9 Decision rule for the next cut

Pick three from Tier 1–2 that disagree with each other (e.g. **Remuda** vs **Auk** vs **Fleethelm**) and run only §8 hard checks. Keep the one that still feels obvious after the collision report — not the one that won the metaphor debate. The doc’s job was to widen; the registry’s job is to narrow.

---

## 12. Cute cut — capybara style × Centauri theme

Re-pass with a different tone gate: **fun for developers**, borrow something cute, stay in capybara energy
(calm interop, everyone gets along, wetland chill) while still lining up with Centauri’s better half
(human+horse / fleet of mounts — not the sci-fi star).

Out of scope here: Chiron-smart myth names, pest animals, bare abstracts (Handoff, Bridge), and
serious-only ranch Latin (Turma). The bar is sticker-on-a-laptop, not seminar-on-a-slide.

### The five

1. **Capytaur**
   - Blend: **capy**bara × cen**taur**
   - Why it’s fun: Greptile-style fusion of the two seeds you already like; reads as one word; instantly
     meme-able and mascot-complete (the animal *is* the brand smile).
   - Meaning that lands: chill platform everything can sit on **and** human+machine team. The product
     thesis without a lecture.
   - Watch: whimsy gate for enterprise; say “CAP-ee-tor” once on a podcast; check registries for
     `capy*` squatters.

2. **Neighbara**
   - Blend: **neigh** (horse) × **bara** (capybara nickname)
   - Why it’s fun: sounds like “neighbor” — and the capybara thesis *is* “everyone gets along.” Horse
     half keeps Centauri; bara keeps the cute animal without the Ruby gem.
   - Meaning that lands: friendly adjacency across vendors; agents as neighbors on one calm host.
   - Watch: ear-collision with “neighbor”; spelling must be taught once (`neighbara`, not `neibara`).

3. **Calmry**
   - Blend: **calm** × caval**ry**
   - Why it’s fun: soft on the tongue, short CLI (`calmry run`), feels designed rather than academic.
     Capybara’s “calm under load” meets Centauri’s horse-line cavalry without saying Centaur.
   - Meaning that lands: a calm cavalry of agents — many mounts, no panic, human still the rider.
   - Watch: coined, so day-one meaning is taught; easy to misspell as `calmary` / `calmery`.

4. **Cavvy**
   - Blend: cowboy slang for the remuda / horse pool (centaur horse-half) — four letters, cute the way
     obscure ranch words are cute to eng crowds.
   - Why it’s fun: `cavvy` types like a toy Unix command; sticker energy; same fleet metaphor as
     Remuda without the three-syllable seriousness.
   - Meaning that lands: draw a fresh agent from the cavvy, ride it, return it — compute remuda.
   - Watch: podcast spelling (“cavvy, like cavalry’s little sibling”); near “cavy” (guinea-pig family,
     ironically next to capybara — can be a feature, not a bug, if the mascot story leans in).

5. **Carpincho**
   - Blend: Río de la Plata Spanish for capybara — pure cute animal word; Centauri align sideways via
     the same region’s remuda/gaucho horse culture (seeds 1 and 2 meet geographically).
   - Why it’s fun: ownable, warm, Octocat-grade character energy; developers collect weird animal
     brands. You can put the animal on everything without explaining a portmanteau.
   - Meaning that lands: interop host / “species share the platform”; calm fleet presence.
   - Watch: Zoom spelling is the known weakness (§8.8). If it fails spoken-first, keep **Carpincho**
     as the mascot name and ship **Capytaur** / **Cavvy** as the CLI.

### How to use this cut

Pick a **CLI name** and a **mascot name** separately if needed — that was §4.3’s real resolution.

| If you want… | Lead with | Mascot can be |
|---|---|---|
| One word that fuses both seeds | **Capytaur** | itself / capybara art |
| Softest cute + horse wink | **Neighbara** | capybara |
| Calm + cavalry, less animal-word | **Calmry** | capybara |
| Shortest fun CLI | **Cavvy** | carpincho / capybara |
| Maximum animal charm | **Carpincho** | itself (CLI may need a short alias) |

**Working trio to screen first:** `Capytaur`, `Cavvy`, `Neighbara`.
All three are cute without being Chiron-smart, developer-fun without being empty, and still touch both
the capybara style and the Centauri horse/human theme.

---

## 13. Chinese-history cut — good stories × Centauri × capybara

Another pass: borrow from **positive** Chinese history and classical imagery (talent-spotting, relay
horses, treasure fleets, Silk Road bridge-building, auspicious mounts — not conquerors, not
culture-war flashpoints). Keep Centauri’s horse / human+mount line and capybara’s calm-interop
“everyone can sit here” style. Prefer names that are short enough to type and fun enough for
developers once the one-line story is told.

Avoided on purpose: 和谐/Hexie (modern baggage), Wukong (crowded), heavy imperial throne titles,
and anything that needs a seminar to enjoy.

### The ten

1. **Bole** (伯乐)
   - History: the legendary judge of horses — “Bole picks the 千里马.” Human who recognizes the right
     mount.
   - Centauri: pure human+horse — you choose which agent/mount to ride.
   - Capybara: calm discernment, not chaos; the quiet expert in the room.
   - Why developers like it: four letters, sticky parable, sticker line writes itself (“find your
     Bole / be the Bole”).

2. **Yima** (驿马)
   - History: the imperial **relay horse** — fresh mounts waiting at each 驿站 so the message keeps
     moving.
   - Centauri: remuda in classical Chinese form; draw a fresh horse, ride the next leg.
   - Capybara: the station hosts whoever is passing through — interop platform energy.
   - Why developers like it: handoff + fork + fleet in one short word; `yima run` feels native.

3. **Tianma** (天马)
   - History: Han “heavenly horses” (the prized Ferghana steeds) — mounts worth a dynasty’s attention.
   - Centauri: glorious horse half of the brand without saying Centaur.
   - Capybara: mythic-calm animal presence; elevated, not shouty.
   - Why developers like it: celestial steed fleet; soft sci-fi without finance-era Centauri star
     baggage.

4. **Longma** (龙马)
   - History: dragon-horse; auspicious hybrid; 龙马精神 = vital, enduring spirit.
   - Centauri: horse fused with something more — human+machine rhyme without Greek myth.
   - Capybara: hybrid that gets along in two worlds (water/land energy maps cleanly to
     multi-vendor).
   - Why developers like it: compact compound, lucky valence, cute without being childish.

5. **Feiyan** (飞燕)
   - History: from 马踏飞燕 (*Galloping Horse Treading on a Flying Swallow*) — Han bronze icon of
     speed so light it barely touches the bird.
   - Centauri: the horse masterpiece of Chinese art history.
   - Capybara: the small calm creature in the scene; grace under motion (calm under load).
   - Why developers like it: beautiful, short, sticker-ready; “fast but gentle” product feel.

6. **Haina** (海纳)
   - History: clipped from 海纳百川 — “the sea accepts all rivers.”
   - Centauri: the wide field that holds a whole cavalry of agents.
   - Capybara: **the strongest Chinese rhyme for the capybara thesis** — everything is welcome on
     the platform; Claude and Codex as rivers, you as the sea.
   - Why developers like it: soft brand sound; one proverb and the positioning is done.

7. **Baichuan** (百川)
   - History: the “hundred rivers” half of the same proverb — many streams, one destination.
   - Centauri: many agent workstreams under one overseer.
   - Capybara: plurality without conflict; wetland-adjacent mental image.
   - Why developers like it: bit more poetic than Haina; still explainable in one breath.

8. **Baochuan** (宝船)
   - History: Zheng He’s **treasure ships** — the Ming treasure fleet, many vessels, one mission.
   - Centauri: fleet framing with a celebrated explorer (not a warlord).
   - Capybara: big calm carriers; the ship that other efforts ride inside.
   - Why developers like it: “treasure fleet” is an instant story; fleet without JetBrains Fleet.

9. **Bailong** (白龙)
   - History: the White Dragon Horse (白龙马) of *Journey to the West* — the quiet mount that
     actually carries the pilgrim while the louder heroes fight.
   - Centauri: human+mount partnership; the horse half doing real work.
   - Capybara: humble, steady, non-panicking presence — capybara temperament in myth form.
   - Why developers like it: familiar story, underdog charm, not Wukong-crowded if you stay on the
     horse.

10. **Silu** (丝路)
    - History: the **Silk Road** — opened in the Zhang Qian / Han arc — trade and ideas moving
      across cultures without one side owning the other.
    - Centauri: the path the mounts travel; company-scale ambition with exploration valence.
    - Capybara: neutral ground where different parties meet and exchange (vendor neutrality).
    - Why developers like it: globally legible, warm, bridge metaphor without the bare English word
      Bridge.

### Quick map

| Name | Chinese hook | Centauri hook | Capybara hook |
|---|---|---|---|
| Bole | 伯乐 | human picks the mount | calm talent-spotting |
| Yima | 驿马 | relay remuda | host station for all comers |
| Tianma | 天马 | heavenly steed | elevated calm animal |
| Longma | 龙马 | hybrid horse | two-world harmony |
| Feiyan | 马踏飞燕 | iconic horse art | light creature, calm speed |
| Haina | 海纳百川 | holds the cavalry | accepts all rivers/vendors |
| Baichuan | 百川 | many workstreams | many streams, no fight |
| Baochuan | 宝船 / 郑和 | treasure fleet | big calm carrier |
| Bailong | 白龙马 | working mount | quiet steadfast host |
| Silu | 丝路 | path of mounts / exchange | neutral meeting ground |

### Working cluster to screen first

**Yima**, **Bole**, **Haina**, **Longma**, **Feiyan**.

- Best CLI feel: **Yima**, **Bole**, **Silu**
- Best capybara thesis: **Haina**, **Baichuan**
- Best Centauri horse smile: **Tianma**, **Longma**, **Bailong**, **Feiyan**
- Best fleet story without the word Fleet: **Baochuan**

Same rule as §12: mascot can stay a capybara (or carpincho) even if the CLI is Chinese-history-native —
name and character do different jobs.

---

## 14. Focus cut — Bole & Yima variations

You liked **Bole** and **Yima**. This section stays inside that pair: short variations, consistent with
Centauri’s situation (company can stay Centauri; product is the human+mount control layer; agents are
horses you draw and ride), and biased toward a **simple cute logo** — one glyph, soft shapes, readable
at favicon size. No myth-professor names, no long compounds.

### Logo system to keep in mind

One mark family for the whole set:

- **Bole line** → a small round **seal / stamp** on a calm horse head (or just a horse + check). Meaning:
  “this mount is chosen.”
- **Yima line** → a tiny **post-house + horse**, or a horse with a mail ribbon / baton. Meaning: “fresh
  mount for the next leg.”
- **Capybara** can sit beside either as the soft mascot (host animal), not inside the word — same
  Datadog/Bits split.

If Centauri remains the company, the product word should feel like a *tool under the constellation*,
not a second cosmology: warm, short, mount-coded.

---

### A. Bole family *(human picks the mount)*

| Name | Shape | Centauri fit | Cute logo |
|---|---|---|---|
| **Bole** | 4 letters, original | You are 伯乐; agents are 千里马 | Horse head + small seal/check |
| **Boley** | Bole + soft `-y` | Friendlier product tone under Centauri | Same seal, rounder type, smile-dot eye |
| **Bolma** | Bo**l**e + **ma** (马) | “Bole’s horse” in one breath | Seal resting on a simple horse glyph |
| **Bola** | Drop the `e` | Softer sound, still Bole | Circular badge with a horse mark inside |
| **Lebo** | Flip | Playful, still the same story | Seal first, horse second (chooser → mount) |

**Best simple defaults:** `Bole` (clearest story), `Boley` (cutest), `Bolma` (most horse-visible).

---

### B. Yima family *(relay mount / handoff)*

| Name | Shape | Centauri fit | Cute logo |
|---|---|---|---|
| **Yima** | 4 letters, original | Relay remuda; draw next agent | Post-house + tiny horse |
| **Yimi** | Soft vowel swap | Cuter, pet-name energy | Same house, friendlier horse face |
| **Yimao** | Yima + soft ending | Still 驿马, a bit plush | Horse with a small scarf/ribbon (baton) |
| **Yizhan** | 驿站 — the station | Product as the place mounts wait | Little station icon alone (very faviconable) |
| **Yimae** | Soft Latin `-ae` | Slightly brand-y without getting smart | Ribbon-horse in a circle |

**Best simple defaults:** `Yima` (clearest), `Yimi` (cutest), `Yizhan` (logo almost draws itself).

---

### C. Bridge variations *(Bole × Yima, still short)*

Keep these only if you want one word that says both “choose” and “relay”:

| Name | Read | Logo |
|---|---|---|
| **Yibole** | Yi + Bole — station’s chooser | House + seal |
| **Bolyi** | Bole + Yi — chooser of relays | Seal + small baton |
| **Yibo** | Shortest blend | Dot-house + seal (two circles) |
| **Bolima** | Bole + ima/马 | Seal on horse, no house |
| **Mayi** | 马 + 驿 reversed | Horse carrying a tiny station mark — *careful:* also means 蚂蚁 (ant); can be cute, or confusing |

**Best of this bridge:** `Yibo` (shortest), `Bolima` (horse stays visible), `Yibole` (story densest).

---

### D. Centauri-situation pairings *(how the words live together)*

Simple, consistent naming schemes — pick one pattern and stick to it:

1. **Company Centauri / product Bole**  
   Logo: Centauri wordmark + Bole horse-seal as app icon.  
   Story: Centauri is the sky; Bole is how you pick the mount.

2. **Company Centauri / product Yima**  
   Logo: Centauri wordmark + Yima post-horse as app icon.  
   Story: Centauri is the sky; Yima is how work hops agent to agent.

3. **One brand: Boley or Yimi**  
   Drop the split; cute product *is* the company rename path.  
   Logo: only the cute glyph (seal-horse or post-horse). Capybara optional sidekick.

4. **Product Bole / mascot Yima** (or reverse)  
   Bole = chooser CLI; Yima = the little horse character in UI empty states.  
   Logo: seal for app; horse character for illustration.

5. **Product Yizhan / mounts called Yima**  
   Yizhan = the app (station); each session is a yima.  
   Logo: station favicon; horse stickers inside the product.

---

### E. Ten variations to put on a napkin (logo-first)

Drawn so a designer can sketch each in one minute:

1. **Bole** — horse head + round seal  
2. **Boley** — same, softer letters, bigger eyes on the horse  
3. **Bolma** — seal sitting on the horse’s back like a saddle stamp  
4. **Yima** — square little station + horse peeking out  
5. **Yimi** — same station, rounder, blush-dot cheeks on the horse  
6. **Yizhan** — station only (door + roof); horse appears in motion graphics later  
7. **Yibo** — two circles: house-dot + seal-dot  
8. **Bolima** — seal + horse, no building  
9. **Yibole** — station with a seal above the door  
10. **Bola** — seal badge alone with a tiny horse mark inside

Capybara rule for all ten: optional companion in marketing, not required in the wordmark — keeps Centauri’s mount story clean and the mark simple.

---

### Working shortlist (from this focus)

| Priority | Name | Why |
|---|---|---|
| 1 | **Bole** | Strongest meaning; Centauri-human authority; simplest seal-horse logo |
| 2 | **Yima** | Strongest product mechanic (relay/handoff); simplest station-horse logo |
| 3 | **Boley** | If Bole feels too stern for the cute direction |
| 4 | **Yimi** | If Yima needs more plush / consumer warmth |
| 5 | **Yibo** | If you want one fused word under Centauri without a long story |

**Practical next step:** sketch only **Bole** vs **Yima** app icons at 32×32. Whichever still reads when blurry is the product; the other can become the in-app horse character or CLI alias.

---

## 15. Screening report — Yima (§8 applied)

Screened 2026-07-29 against the rubric in §8. This is an availability / collision pass, not legal advice.
Trademark conclusion especially needs a real counsel search before filing.

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `yima` | **Clear** | Exact package 404. Nearby: `yima-api-sdk`, `yima-iot-device-sdk`, `@katsele/types` (“Yima monorepo”, Oct 2025) — not the bare name. |
| 1 | **PyPI** `yima` | **Taken** | `yima` 0.1.3 — Python API for old SMS/接码 site 51ym.me (“易码”). Repo [SimZhou/yima](https://github.com/SimZhou/yima) archived since 2019, ★4. Low activity, but **exact name blocked on PyPI**. |
| 1 | **RubyGems** `yima` | **Clear** | 404 |
| 1 | **crates.io** `yima` | **Clear** | 404; search empty |
| 1 | **Homebrew** | **Clear** | formula + cask 404 |
| 1 | **Go modules** | **N/A / fine** | Bare `yima` is an invalid module path (needs a dot). No obvious `yima` module dominance on pkg.go.dev. |
| 2 | **GitHub org** `yima` | **Clear** | org 404 |
| 2 | **GitHub user** `yima` | **Taken** | Empty user since 2015, 0 public repos — classic squat. Org name still free; user handle would need rename purchase/negotiate or use `yima-dev` / `getyima`. |
| 3 | **Domains** | **Mixed** | See table below |
| 4 | **Trademark 9/42** | **Caution — counsel** | No single clean “Yima = agent tooling” owner jumped out. Nearby: Shenzhen Yima Technology / **AIYIMA** (class 9 electronics, TTAB history with Lamborghini ANIMA). Not a free pass. |
| 5 | **Adjacent product** | **Real collisions** | See “Named collisions” below — none are agent-orchestration peers, but several are loud in search / CN culture. |

#### Domains (DNS + RDAP skim)

| Domain | Status (skim) | Read |
|---|---|---|
| `yima.com` | Registered, ParkingCrew NS | Parked / aftermarket |
| `yima.io` | Registered, Afternic NS; HTTPS live | Likely for-sale / broker |
| `yima.dev` | Registered (Cloudflare NS) | Taken |
| `yima.app` | Registered | Taken |
| `yima.ai` | Registered (Namecheap NS) | Taken |
| `yima.sh` | RDAP 404 + DNS NXDOMAIN | **Likely available — on-brand for CLI** |
| `yima.so` | RDAP 404 + DNS NXDOMAIN | Likely available |
| `yima.co` | DNS NXDOMAIN | Likely available |
| `yima.tools` | DNS NXDOMAIN | Likely available |
| `getyima.com` | DNS NXDOMAIN | Likely available |

### Named collisions (the ones that matter)

1. **Novawerk/YIMA — period calendar (“姨妈来了”)**  
   Live open-source app explicitly branding **YIMA = 姨妈**. In Chinese slang, 大姨妈 / 姨妈 = menstruation. Romanized, this is the same English string as 驿马. For any CN-facing or bilingual audience, this is the sharpest brand risk — not a registry miss, a **meaning miss**.

2. **PyPI / 易码 (51ym.me)**  
   Exact `yima` on PyPI; SMS verification wrapper; archived but still occupies the name.

3. **YiMAproject (2014 ZF2 “Yima Application Framework”)**  
   Old PHP module org; low stars; residue in GitHub search only.

4. **Other companies** using Yima / 奕馬 / 意玛 in IoT, GIS, optoelectronics, Africa home-automation — fragmented, not a category killer, but SEO noise forever.

### Ergonomic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 4 letters — sweet spot. `yima run` needs no alias. |
| 7 | Dotfolder `.yima/` | **Pass** | Short, lowercase-clean. |
| 8 | Zoom spelling | **Pass with teach** | Y-I-M-A is easy; tone/story is the hard part (“relay horse, not auntie”). |
| 9 | Podcast | **Needs “spelled / means…” once** | Must say: *Yima — Chinese 驿马, imperial relay horse.* Otherwise CN listeners hear 姨妈. |
| 10 | Searchability | **Weak** | GitHub `yima` query is noisy (400+ repos, many false friends: YImage, YimMenu, YiMao). Coined enough in English, crowded in practice. |

### Strategic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 11 | Survive next pivot | **Pass** | Relay-mount metaphor stretches observability → orchestration → control plane. Not pinned to “log.” |
| 12 | Buyer tone | **Split** | Cute/simple logo works for solo devs. Enterprise + CN bilingual buyers hit the 姨妈 homograph problem. |
| 13 | Host a mascot | **Pass** | Post-horse mark + optional capybara companion still works. |

### Verdict

**Yima is registry-feasible, not brand-clean.**

- **Ship-blocking or near-blocking:** Chinese **姨妈** collision (already productized by Novawerk/YIMA); exact **PyPI** take; noisy search.
- **Fine / workable:** npm, crates, RubyGems, Homebrew, GitHub **org**, likely **`yima.sh`** (and `.so` / `.tools` / `getyima.com`).
- **If you still want the 驿马 story:** prefer a spelling that breaks the 姨妈 homograph in Latin letters, or keep 驿马 as the *story* and ship a distinct CLI — e.g. from §14: **Yimi**, **Yizhan**, **Bolima**, or **Bole** as the product with Yima as the in-app horse character only.

**Rubric scorecard (informal):** Hard checks 3/5 clean (fail PyPI + adjacent meaning; domains mixed). Ergonomics 4/5 (searchability soft fail). Strategic 2/3 (tone/CN risk).

**Recommendation:** do **not** lock the public product name to bare `Yima` until you either (a) accept the 姨妈 joke forever, or (b) pick a variant that keeps the relay-horse story without the auntie spelling. Strongest next screens from the same family: **Yizhan**, **Yimi**, **Bole**.

---

## 16. Screening report — Bole (§8 applied)

Screened 2026-07-29 against the rubric in §8, same method as §15. Not legal advice.

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `bole` | **Hard fail** | [rvagg/bole](https://github.com/rvagg/bole) — “A tiny JSON logger.” **~5.8M downloads last month**, ~49M last year, actively maintained (pushed 2026-07). Exact Capybara-lesson case: web search looks fine; registry is occupied by a real Node dependency. |
| 1 | **PyPI** `bole` | **Taken** | Cascading config + logger ([LamaAni/bole](https://github.com/LamaAni/bole)), low stars, still exact name. |
| 1 | **RubyGems** `bole` | **Taken** | Tiny file/stdout logger gem ([bratta/bole](https://github.com/bratta/bole)). |
| 1 | **crates.io** `bole` | **Taken** | “Manage all package managers on your system” ([lemorage/bole](https://github.com/lemorage/bole)), small but present. |
| 1 | **Homebrew** | **Clear** | formula + cask 404 |
| 1 | **Go modules** | **N/A / fine** | Bare path invalid; no bare-module issue. |
| 2 | **GitHub org** `bole` | **Clear** | org 404 |
| 2 | **GitHub user** `bole` | **Taken** | Since 2012, 1 public repo — old squat / personal. |
| 3 | **Domains** | **Mixed** | See table |
| 4 | **Trademark 9/42** | **Caution — counsel** | Live USPTO **BOLE** in class 9 for microphones (Jiangmen Shengbaile, reg. 2026). Older software/recruiting marks cancelled or abandoned. CN class-42 “BOLE” SaaS filings exist historically. Not clear for agent tooling — still not empty. |
| 5 | **Adjacent product** | **Crowded meaning space** | Not one rival agent tool, but many loud neighbors (below). |

#### Domains (DNS + RDAP skim)

| Domain | Status (skim) | Read |
|---|---|---|
| `bole.com` | Registered (hichina NS) | Taken (CN registrar) |
| `bole.dev` | Registered (Afternic) | Broker / aftermarket |
| `bole.io` | Registered (Afternic) | Broker / aftermarket |
| `bole.app` | Registered (Afternic) | Broker / aftermarket |
| `bole.co` | Afternic NS in DNS | Likely parked / for sale |
| `bole.tools` | Redirect DNS | Taken / parked |
| `usebole.com` | Registered | Taken |
| `bole.sh` | RDAP 404 + NXDOMAIN | **Likely available — on-brand** |
| `bole.so` | RDAP 404 + NXDOMAIN | Likely available |
| `bole.ai` | DNS NXDOMAIN | Likely available |
| `getbole.com` | DNS NXDOMAIN | Likely available |
| `withbole.com` | DNS NXDOMAIN | Likely available |

Variant package names on npm (quick skim): **`boley`, `bolma`, `getbole`, `bole-ai`, `bolehq` all 404** — the cute §14 spellings are registry-open where bare `bole` is not.

### Named collisions (the ones that matter)

1. **npm `bole` logger (rvagg)** — **ship-blocker for a JS/TS devtool.** Same failure mode as Ruby `capybara` in §4.2 / §8. Anyone who `npm install bole` already means the logger. Your CLI/docs/search will fight millions of monthly downloads forever.

2. **Portuguese `boleto` (bank payment slip)** — dominates GitHub name search (laravel-boleto, boletonet, etc.). English query `bole` is drowning in Brazilian billing libraries. Not the same word, but SEO/GitHub noise is brutal (~15k repos matching).

3. **RecBole (伯乐)** — major open-source recommender library ([RUCAIBox/RecBole](https://github.com/RUCAIBox/RecBole), ★4.5k+). Chinese site literally titles it 伯乐. Same classical allusion you want; already owned in ML open source.

4. **伯乐 as HR/recruiting brand** — 伯乐圈, 伯乐云, resume tools, talent platforms. In CN business culture 伯乐 = talent scout, so the metaphor is correct — and **already heavily used in hiring products**.

5. **English “bole”** — tree trunk; also place/person names. Mild, not fatal.

6. **Bolero / bolero** — F# Blazor, Rust fuzzing (`bolero` crate). Near-miss noise only.

### Ergonomic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 4 letters. `bole run` is ideal length — if the name were free. |
| 7 | Dotfolder `.bole/` | **Pass** on form; **awkward** next to logger mental model. |
| 8 | Zoom spelling | **Pass** | B-O-L-E; may need “like 伯乐, the horse judge,” not “boleto.” |
| 9 | Podcast | **One explain** | Story is strong; Portuguese/English ear collisions possible. |
| 10 | Searchability | **Fail** | Logger + boleto + RecBole + HR 伯乐 = unsearchable as a new agent product. |

### Strategic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 11 | Survive next pivot | **Pass (metaphor)** | Talent-picker / mount-chooser scales past logs. |
| 12 | Buyer tone | **Good story, bad shelf** | Serious enough for enterprise; CN buyers already map 伯乐 → recruiting. |
| 13 | Host a mascot | **Pass** | Seal-on-horse logo still works; capybara can sit beside. |

### Verdict

**Bole is metaphor-excellent and registry-hostile.**

- **Ship-blocking:** exact **npm** package with multi-million monthly downloads (devtools audience overlap is total). Also taken on **PyPI / RubyGems / crates**.
- **Brand-noisy:** RecBole (same 伯乐), CN recruiting “伯乐*” products, Brazilian **boleto** search pollution.
- **Still nice:** GitHub **org** free; likely **`bole.sh` / `bole.so` / `bole.ai` / `getbole.com`**; story fits Centauri human+mount better than most names in this doc.
- **If you want the 伯乐 story:** do what §4.3 did for capybara — **keep the parable, change the spelling.** From §14, screen next: **`Boley`**, **`Bolma`**, **`Bola`** (npm clear on first two; confirm all §8 rows). Or company Centauri + product that isn’t bare `bole`.

### Yima vs Bole (head to head)

| | **Yima** | **Bole** |
|---|---|---|
| npm exact | Clear | **Hard fail (~5.8M/mo logger)** |
| Other registries | PyPI taken (dead SMS wrap) | PyPI + gems + crates taken |
| Cultural own-goal | **姨妈** slang / period app | Recruiting-伯乐 clutter; boleto noise |
| Metaphor fit | Relay / handoff | Chooser / human authority |
| Domains `.sh` | Likely free | Likely free |
| Cute logo | Post-horse | Seal-horse |
| Bare name ship? | Risky | **No** |

**Rubric scorecard (informal):** Hard checks **1/5** clean (Homebrew + GH org only; registries and adjacent meaning fail). Ergonomics 2/5 (length yes; search/podcast friction). Strategic 2/3 (pivot + mascot yes; buyer shelf noisy).

**Recommendation:** retire bare **`Bole`** as the installable / npm / CLI name. Keep 伯乐 as the *origin story*. Next screen the open variants **`boley`** and **`bolma`** with the same §8 checklist — or go back to a clean relay-side variant (**Yizhan** / **Yimi**) that doesn’t collide with a top-percentile Node logger.

---

## 17. Screening report — Fleeti (§8 applied)

Screened 2026-07-29 against the rubric in §8, same method as §15–§16. Not legal advice.

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `fleeti` | **Clear** | Exact 404; search empty. Nearby: `fleet` and `fleetlog` taken; `fleety` / `getfleeti` clear. |
| 1 | **PyPI** `fleeti` | **Clear** | 404 |
| 1 | **RubyGems** `fleeti` | **Clear** | 404 |
| 1 | **crates.io** `fleeti` | **Clear** | 404; search empty |
| 1 | **Homebrew** | **Clear** | formula + cask 404 |
| 1 | **Go modules** | **N/A / fine** | Bare path invalid |
| 2 | **GitHub org** `Fleeti` | **Taken** | [github.com/Fleeti](https://github.com/Fleeti) — bio: “Gestion de flotte de véhicules” (2019) |
| 2 | **GitHub user** | **Same org** | Org occupies the login |
| 3 | **Domains** | **Mixed / hostile on primary** | See table |
| 4 | **Trademark 9/42** | **Caution — counsel** | No clean USPTO “FLEETI” hit in a quick pass; **Fleetio** (Rarestep) is a live US fleet-management family. EU/FR marks for Fleeti SAS not fully checked here. |
| 5 | **Adjacent product** | **Hard fail** | Exact-name funded SaaS in **fleet management** — see below. This is the JetBrains Fleet / FleetDM problem, worse: same spelling. |

#### Domains (DNS + RDAP skim)

| Domain | Status (skim) | Read |
|---|---|---|
| `fleeti.co` | Live product site; GoDaddy NS | **Company home** — [en.fleeti.co](https://en.fleeti.co/) |
| `fleeti.com` | Registered (GoDaddy NS) | Taken |
| `fleeti.ai` | Registered (locked statuses) | Taken |
| `fleeti.io` | GoDaddy NS in DNS | Treat as taken / controlled |
| `fleeti.dev` | NXDOMAIN / RDAP 404 | Likely available |
| `fleeti.sh` | NXDOMAIN / RDAP 404 | Likely available |
| `fleeti.app` | NXDOMAIN (RDAP flaky) | Possibly available |
| `fleeti.so` | NXDOMAIN / RDAP 404 | Likely available |
| `fleeti.tools` | NXDOMAIN | Likely available |
| `getfleeti.com` / `usefleeti.com` | NXDOMAIN | Likely available |

Clear secondary domains do **not** fix an exact-name company on `fleeti.co`.

### Named collisions (the ones that matter)

1. **Fleeti SAS (fleet management / telematics)** — **ship-blocker.**  
   Funded vehicle-fleet SaaS (~$4–6M reported), 1000+ companies / 40k vehicles claimed, EU + Africa ops, LinkedIn “fleeti-world.” Exact string **Fleeti**. Category words: fleet, telematics, dashboard, agents-in-the-field. Google “Fleeti” goes to them, not you.

2. **Fleetio** (Rarestep) — near-homophone / podcast twin. Major US fleet-management product; “Fleeti” vs “Fleetio” will be misspelled and mis-searched forever.

3. **FleetDM / JetBrains Fleet** — parent-word residue from §3. `Fleeti` keeps you inside that search neighborhood by design.

4. **AWS FleetIQ**, GitLab **fleeting**, etc. — substring noise only; not the main problem.

### Ergonomic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 6 letters — still in the sweet band. `fleeti run` is fine. |
| 7 | Dotfolder `.fleeti/` | **Pass** | Clean; migration from `.fleetlog/` is a story (“drop Log, add i”). |
| 8 | Zoom spelling | **Pass** | F-L-E-E-T-I; may be heard as Fleetio. |
| 9 | Podcast | **Weak** | Will be heard as Fleet / Fleetio / Fleety; needs “Fleeti with an I, not Fleetio.” |
| 10 | Searchability | **Fail** | Exact company + Fleetio + Fleet* sea. Coined-looking, but already owned in market. |

### Strategic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 11 | Survive next pivot | **Soft fail** | Still shelf-pins you to “fleet” (ops / vehicles / devices). Better than Log, worse than Remuda/Bole-story names. |
| 12 | Buyer tone | **Fail for uniqueness** | Sounds like vehicle/MDM fleetware — enterprise buyers may assume telematics. |
| 13 | Host a mascot | **Pass** | Capybara can ride along; wordmark doesn’t need the animal. |

### Fit vs your own criteria (§2–§3, §9E)

- Keeps the **fleet framing** you like (direction E).
- Drops **Log** (good).
- Does **not** escape the Fleet search tax the doc already warned about — it doubles down with an existing **Fleeti** telematics brand.
- Weak Centauri / capybara / cute-logo story compared to Bole/Yima families; it’s a continuity rename, not a new metaphor.

### Verdict

**Fleeti is registry-clean and brand-taken.**

- **Ship-blocking:** live funded company **Fleeti** (vehicle fleet SaaS) + GitHub org + primary domain `fleeti.co`. Adjacent-category collision under §8.5 is decisive.
- **Also bad:** Fleetio near-homophone; remains stuck in FleetDM / JetBrains Fleet SEO gravity.
- **Genuinely fine:** npm / PyPI / gems / crates / Homebrew all clear — the opposite pattern from **Bole**.
- **Do not ship** as the public product name unless you intend to confuse with (or fight) Fleeti SAS.

### Head to head (Yima / Bole / Fleeti)

| | **Yima** | **Bole** | **Fleeti** |
|---|---|---|---|
| npm exact | Clear | **Hard fail** | Clear |
| Other registries | PyPI stale take | Mostly taken | **All clear** |
| Exact live company | No | No | **Yes — fleet SaaS** |
| Cultural own-goal | 姨妈 | Recruiting 伯乐 / boleto noise | Sounds like trucks/telematics |
| Metaphor for your product | Relay horse | Talent-picker | Generic “fleet” + vowel |
| Bare name ship? | Risky | **No** | **No** |

**Rubric scorecard (informal):** Hard checks **fail on §8.5** despite clean registries (org + company + domain). Ergonomics 3/5. Strategic 1/3.

**Recommendation:** drop **Fleeti**. If you want Fleet continuity, a *different* second half that isn’t already a telematics brand (and isn’t Log) still needs a collision pass — but bare/near `Fleeti`/`Fleetio` is a dead end. Prefer the open myth/cute lanes (**Boley** / **Bolma** / **Yizhan** / **Yimi**) over another Fleet* coinage.

---

## 18. Easy-cute cut — Puppy / Duckie energy × Centauri × agent fleet

New brief after Yima / Bole / Fleeti stalled:

- **Easy to say, easy to remember** (like *puppy*, *duckie*)
- **Meaning still lands** (agent fleet = many workers; control = you steer; monitoring = you watch)
- **Centauri-aligned** (horse / mount / human+machine — not the sci-fi star)
- Soft `-y` / `-ie` / short animal words welcome; avoid hard romanizations and Fleet* telematics traps

Think **PuppyGraph formula**: a warm, obvious word first; meaning second. Logo should be drawable in one minute.

### Ten options

1. **Pony**
   - Say: *POH-nee*
   - Meaning: Centauri’s horse half as a friendly mount; a **pony herd** = your agent fleet; you pick one and ride.
   - Why it fits the brief: as easy as puppy; clearer than Remuda; seal/horse logo still works.
   - Watch: My Little Pony residue; screen registries before attachment.

2. **Remy**
   - Say: *REM-ee* (like the name)
   - Meaning: soft clip of **remuda** — the pool of mounts you draw from each day.
   - Why: personal-name easy; Centauri horse line without teaching Spanish ranch words.
   - Watch: people / Ratatouille / name collisions; still worth a §8 pass.

3. **Centie**
   - Say: *SEN-tee*
   - Meaning: cuddly diminutive of **Centauri / centaur** — human+machine, product under the company sky.
   - Why: strongest literal Centauri family name; duckie-level softness.
   - Watch: must not sound like “sentry” only; explain once as centaur-cute.

4. **Herdie**
   - Say: *HER-dee*
   - Meaning: **herd** of agents + duckie ending — many workers, one overseer.
   - Why: exactly the puppy/duckie shape; fleet meaning without the word Fleet.
   - Watch: coined; teach “herd of agents” once.

5. **Reiny**
   - Say: *RAY-nee*
   - Meaning: you hold the **reins** — human final authority (product invariant).
   - Why: control meaning + cute `-y`; short CLI `reiny`.
   - Watch: heard as rainy; spell once.

6. **Scoutie**
   - Say: *SKOW-tee*
   - Meaning: sentinel / monitoring — one watches while the fleet works (meerkat job, duckie sound).
   - Why: clear “I observe my agents” for the observability half.
   - Watch: Boy Scouts / Scout software collisions — §8 needed.

7. **Packie**
   - Say: *PACK-ee*
   - Meaning: a **pack** of coding agents you run together.
   - Why: puppy-adjacent (dogs in packs); easy; fleet-without-Fleet.
   - Watch: “picky” ear slip; pack = wolves may feel aggressive to some.

8. **Colt**
   - Say: *kolt*
   - Meaning: young horse ready to ride — spin up a fresh agent mount (Centauri).
   - Why: one syllable, punchy, still animal-warm.
   - Watch: firearms “colt” association in US; check carefully.

9. **Dobbin**
   - Say: *DOB-in*
   - Meaning: old English pet name for a **steady workhorse** — the reliable mount, not the loud hero.
   - Why: memorable, storybook-cute, Centauri horse, calm like capybara energy.
   - Watch: slightly old-fashioned; two syllables still easy.

10. **Taury**
    - Say: *TOR-ee*
    - Meaning: short from **centaur** — human+engine team in a nickname.
    - Why: Centauri DNA without “Centauri”; soft like duckie.
    - Watch: “Tory” politics ear in UK; “taurine” science echo — screen audience.

### PuppyGraph-style compounds (if you want animal + job)

Same ease bar: both halves obvious.

| Name | Blend | Meaning |
|---|---|---|
| **Ponyhelm** | pony × helm | Mounts you steer |
| **Herdwatch** | herd × watch | Watch the agent herd |
| **Puprein** | pup × rein | Soft mascot + control (very puppy) |
| **Coltwatch** | colt × watch | Fresh mounts, observed |
| **Packwatch** | pack × watch | Pack of agents under watch |

Prefer a **one-word** cute name for CLI; use compounds only if the one-worders collide in §8.

### How this maps to the product

| Product truth (§2) | Best carriers here |
|---|---|
| Many agents, one overseer | Herdie, Packie, Pony, Remy |
| Human stays in control | Reiny, Ponyhelm, Centie, Taury |
| Monitoring / calm watch | Scoutie, Herdwatch, Coltwatch |
| Centauri company fit | Centie, Taury, Pony, Remy, Colt, Dobbin |

### Working shortlist (taste + ease)

1. **Pony** — clearest Centauri + fleet picture  
2. **Remy** — remuda, but as easy as a friend name  
3. **Herdie** — most duckie-shaped  
4. **Centie** — most Centauri-native  
5. **Reiny** — most “you are in control”

**Skip:** Fleetie / Fleety (Fleeti + Fleetio trap). Keep **duckie / puppy / capybara** as mascot energy even if the word is pony/herd — name and sticker can differ (§4.3).

**Next step:** pick 2–3 from the shortlist and run the same §8 screen as Yima/Bole/Fleeti before falling in love.

---

## 19. Math-space cut — cute / interesting, still easy to say

Search lane: recreational math, soft Greek letters, friendly shapes, and light CS-math that maps to
**agent fleet control + monitoring** — without Chiron-smart seminar names (no Yoneda, no stigmergy-as-CLI).

Bar from §18 still applies: **puppy/duckie easy**, meaning lands in one line, Centauri optional (human+machine,
many mounts) when it fits naturally.

### Why math can work for this product

| Math idea | Product rhyme |
|---|---|
| Many elements coordinated | set, pack, span, orbit, braid |
| You stay the authority | focus, rein→control theory wink, fixed point (human as fixed point) |
| Watch / measure | trace, metric, sample, hat (estimator) |
| Vendor interop / handoff | amicable pairs, Venn overlap, zip, fold, telescope (cancel middle junk) |
| Canvas / board | atlas, tessellation, mesh, torus |
| Cute by tradition | happy numbers, amicable, cardioid (heart curve), torus (donut) |

---

### A. Recreational number names *(already emotionally warm)*

1. **Happy** *(happy numbers)*  
   Iterate digits → reach 1. Soft English, zero teaching cost. Meaning stretch: agents iterate until a good
   terminal state; calm valence like capybara.  
   Watch: generic adjective; search hard; “Happy” apps everywhere — §8 mandatory.

2. **Amicable** / **Amie** *(amicable numbers)*  
   Two numbers that “take care of each other’s divisors” — best-friends pair. Perfect for
   Claude↔Codex handoff / vendor pairs that get along (capybara thesis).  
   **Amie** (*ah-MEE*) is the duckie-length form.  
   Watch: Amicable is long; Amie collides with names/brands.

3. **Sociable** / **Socie** *(sociable numbers)*  
   Longer aliquot cycles — a *ring* of numbers, not just a pair. Fleet of agents in a cycle of handoffs.  
   Watch: “social app” shelf risk.

4. **Cute** *(cute numbers exist in tiling literature)*  
   Meta and on-brief, but probably too vague as a product word.

5. **Perfect** *(perfect numbers)*  
   Equals the sum of its parts — whole fleet as one.  
   Watch: overused marketing word.

---

### B. Shapes & curves *(logo draws itself)*

6. **Cardie** *(cardioid — heart-shaped curve)*  
   Say: *CAR-dee*. Real math curve; heart logo; warm like puppy.  
   Meaning: center of the “pulse” of the fleet (monitoring).  
   Watch: cardiac / Cardie name collisions.

7. **Torus** / **Torie** *(doughnut surface)*  
   One surface, loops forever — sessions that stay on one control plane. **Torie** = duckie form.  
   Watch: Torie/Tory politics ear (same as Taury in §18).

8. **Mobie** *(Möbius strip)*  
   Say: *MOH-bee*. One-sided surface — handoff without “leaving the board.” Cute `-bie`.  
   Watch: Möbius / Mobius Labs CV startup residue; spell Mobie vs Moebie.

9. **Astie** *(astroid — star-shaped curve)*  
   Star curve → quiet Centauri wink without saying Centauri. Soft.  
   Watch: coined feel; teach once.

10. **Ellie** *(ellipse)*  
    Say: *EL-ee*. As easy as duckie; focus+directrix story = human focus, agent path.  
    Watch: common personal name.

11. **Tess** *(tessellation / tesseract wink)*  
    Say: *tess*. Tile the canvas with agent runs; also soft clip of tesseract.  
    Watch: Tess personal name; Tessellate competitors possible.

---

### C. Letters & operators *(short CLI candy)*

12. **Phi** / **Phie** *(φ — golden ratio)*  
    Beauty / proportion — human+machine in balance (centaur thesis). **Phie** = *FEE* or *FLY*? Prefer
    spoken “fie” / brand as **Phie** (*FEE*).  
    Watch: Φ already used in many products; pronounce carefully.

13. **Tau** *(τ — circle constant / torque)*  
    One syllable; turn/force; agent loops. Modern-math cool without being long.  
    Watch: Tau software collisions; “tao” ear slip.

14. **Mew** *(μ — mean / micro)*  
    Say: *myoo* or kitten *mew*. Greek mu + kitten sound = puppy-tier cute; “mean state of the fleet.”  
    Watch: Pokémon Mew; mu/moo confusion.

15. **Dotty** *(dot notation ẋ / dotted operators)*  
    Say: *DOT-ee*. Monitoring as dots on a timeline; Newton’s dot = rate of change. Extremely duckie.  
    Watch: Dotty personal name; “dotty” = slightly mad in UK English (can be charming).

16. **Tildie** *(tilde ≈ approximate)*  
    Soft “good enough / close match” — handoff packet as compressed ≈ of full context.  
    Watch: coined; teach tilde once.

17. **Hattie** *(hat notation â — estimator)*  
    Monitoring = estimate of agent state. Cute name sound.  
    Watch: personal name clutter.

---

### D. Structure words that match the architecture*

18. **Zippie** *(zip — pair streams / FP zip)*  
    Say: *ZIP-ee*. Mux multiple agent streams into one view (tee/mux story). Puppy energy.  
    Watch: Zippy/Zippie brands; compression apps.

19. **Foldie** *(fold / reduce)*  
    Fold many agent outputs into one digest / one PR. Soft and clear.  
    Watch: foldable-phone residue; laundry “foldie” slang possible.

20. **Telly** *(telescoping series)*  
    Middle terms cancel — exact metaphor for **handoff packet reduction** (93–99%). British-cute.  
    Watch: British “telly” = TV; could be feature or bug.

21. **Vennie** *(Venn diagram)*  
    Overlap of vendor worlds on one platform — capybara interop in one picture. Very teachable logo.  
    Watch: coined; Venn already known so explanation is free.

22. **Spline** / **Splinie** *(interpolation curve)*  
    Smooth path between control points — human sets points, agents interpolate the work. **Splinie**
    for duckie form; **Spline** for slightly more serious.  
    Watch: Spline design tools exist; §8 needed.

23. **Quiver** *(directed graph of arrows; also arrow-bag)*  
    Bag of arrows = bag of agent runs; category-theory wink without saying it. Soft two syllables.  
    Watch: Quiver App (diagramming) collision — check hard.

24. **Orbit** / **Orbitie** *(group action orbit)*  
    Agents orbit the human fixed point. **Orbit** is clear; **Orbitie** is cuter.  
    Watch: Orbit = many cloud/devops products.

25. **Trace** *(matrix trace / execution trace)*  
    Dual meaning already used in your stack (observability traces). Short, serious-cute.  
    Watch: crowded in observability (Distributed Trace, etc.).

26. **Atlas** *(atlas of charts — topology)*  
    Already in your UI as “Atlas Canvas.” Math-legitimate; means “collection of local views → one map.”  
    Watch: Atlassian / Atlas products; you already have Columbus/Atlas naming debt (§1).

27. **Beaver** / **Beavie** *(Busy Beaver)*  
    Famous CS-math hardworking machine; animal as cute as puppy; “busy agents” story.  
    Watch: BusyBee / Busy Beaver companies exist; beaver = eager but also dam-building slog.

28. **Groupie** *(mathematical group + English groupie)*  
    Agents in a group operation; playful fan of the lead planner. Very duckie.  
    Watch: unserious for enterprise; “groupie” cultural tone.

29. **Loopie** *(loops / algebraic loop)*  
    Agent run loops; as easy as duckie.  
    Watch: LoopPay / Loop apps; may feel toy.

30. **Cosie** *(cosine + cosy)*  
    Homophone gift: math cosine × British *cosy* = calm monitoring nest. Peak soft.  
    Watch: spelling Cosie vs Cozy vs Cosy; weak “fleet” signal.

---

### E. Working shortlist (math × cute × product)

| Priority | Name | Math hook | Product hook | Ease |
|---|---|---|---|---|
| 1 | **Vennie** | Venn | vendor overlap / interop | duckie |
| 2 | **Dotty** | dot notation | live monitoring dots | duckie |
| 3 | **Amie** | amicable numbers | handoff pairs get along | name-easy |
| 4 | **Zippie** | zip | mux agent streams | puppy |
| 5 | **Telly** | telescoping sum | handoff compression | soft |
| 6 | **Cardie** | cardioid | heart / pulse of fleet | soft |
| 7 | **Mobie** | Möbius | one-surface handoff | soft |
| 8 | **Phie** | golden φ | human+machine balance | short |
| 9 | **Splinie** | spline | human control points | soft |
| 10 | **Mew** | μ | kitten-cute + mean state | tiny |

**Centauri-native in this set:** Phie (proportion), Orbit/Orbitie, Astie (star curve), Atlas (if you reclaim it).  
**Capybara-native:** Vennie, Amie, Cosie, Mobie (everyone on one surface).  
**Fleet-control-native:** Zippie, Foldie, Dotty, Trace, Quiver.

### F. Probably skip (math-cool, brief-fail)

- **Eigen / Functor / Yoneda / Manifold / Homotopy** — Chiron-smart.  
- **Lambda / Matrix / Kernel / Nova** — category-crowded.  
- **Pi / Pie** — too owned / food-only.  
- **Happy** as bare word — warm math, miserable SEO.  
- **Beaver** unless you want Busy Beaver explainers forever.

### Next step

Pick **three** that feel as easy as puppy/duckie (suggested: **Vennie**, **Dotty**, **Zippie** — or **Amie** if you want the handoff-pair story) and run the §8 registry/domain/adjacent screen before attachment. Math gives meaning; §8 still decides ship/no-ship.

---

## 20. Labrador Retriever variations

New seed: **Labrador Retriever** — same ease bar as puppy/duckie (§18). Soft, loyal, fetch-coded.

### Why this breed fits the product

| Breed trait | Product rhyme |
|---|---|
| **Retriever** | Product *retrieves* sessions from `~/.claude` / `~/.codex`, digests, handoff packets |
| **Loyal companion** | Human+agent sidekick (centaur-soft, not horse-literal) |
| **Eager / steady** | Fleet of workers that bring things back to you |
| **Puppy energy** | Datadog / PuppyGraph warmth; sticker logo is obvious |
| **Lab** short form | 3 letters — CLI candy (if free) |

Centauri note: less horse than Pony/Remy; more **companion animal**. Still human-in-the-loop: the dog returns the bird; the human decides.

---

### A. Short & easy (duckie / puppy length)

| Name | From | Say | Notes |
|---|---|---|---|
| **Labby** / **Labbie** | Lab + `-y/-ie` | *LAB-ee* | Softest; most duckie-shaped |
| **Labsy** | Lab + sy | *LAB-zee* | Playful; slightly more coined |
| **Labo** | Labrador clip | *LAH-bo* | International soft; check collisions |
| **Labbi** | Lab | *LAB-ee* | Same family as Labby |
| **Labs** | plural Lab | *labz* | Cool/plural fleet wink; may feel like “laboratories” |
| **Lab** | bare | *lab* | Shortest; **heavy** collision with laboratory / GitLab / ML “lab” |

### B. Retriever side *(meaning denser)*

| Name | From | Say | Notes |
|---|---|---|---|
| **Retrie** | retriever | *ri-TREE* | Clear “retrieve”; cute clip |
| **Retrievy** | retriever + y | *ri-TREE-vee* | Very soft; a bit long (3 syllables) |
| **Triever** | drop Re- | *TREE-ver* | Punchier; still obvious |
| **Trievy** | triever + y | *TREE-vee* | Duckie length |
| **Rievie** | retrieve | *REE-vee* | Soft; spelling must be taught |
| **Revvie** | retrieve | *REV-ee* | Easy; “rev” engine wink for agents |
| **Fetchie** | fetch (what retrievers do) | *FETCH-ee* | Verb-clear; puppy play |
| **Fetchy** | fetch + y | *FETCH-ee* | Same; check Fetch.com etc. |

### C. Labrador shape games *(still pronounceable)*

| Name | From | Say | Notes |
|---|---|---|---|
| **Labra** | Labra-dor | *LAB-ra* | Soft; exotic without being hard |
| **Lador** | La-dor | *LAY-dor* / *lah-DOR* | Two syllables; ownable |
| **Brador** | -brador | *BRAY-dor* | Distinct; slightly brand-y |
| **Rador** | -rador | *RAY-dor* | Short; radar ear-slip (monitoring wink or confusion) |
| **Labrador** | full | *LAB-ra-dor* | Clear; long for daily CLI |
| **Labbydor** | blend | *LAB-ee-dor* | Cute but long |

### D. Color-lab cousins *(same family, different word)*

| Name | From | Say | Notes |
|---|---|---|---|
| **Goldie** | Golden Retriever | *GOAL-dee* | Peak duckie ease; warm |
| **Golden** | same | *GOAL-den* | Clear; crowded adjective |
| **Coco** / **Cocoa** | chocolate Lab | *KO-ko* | Soft; many brands |
| **Ebony** | black Lab | *EB-uh-nee* | Elegant; longer |
| **Butter** | yellow Lab nickname energy | *BUT-er* | Soft; food brand risk |

### E. PuppyGraph-style compounds

| Name | Blend | Meaning |
|---|---|---|
| **Labwatch** | lab × watch | Loyal monitor over the fleet |
| **Labpack** | lab × pack | Pack of agent-dogs |
| **Labhelm** | lab × helm | Companion that still steers with you |
| **Fetchmux** | fetch × mux | Retrieve + multiplex streams |
| **Retriewatch** | retrieve × watch | Fetch + observe |
| **Labrein** | lab × rein | Soft animal + human control |

Prefer one-word **Labby / Retrie / Goldie / Fetchie** for CLI; compounds if one-worders fail §8.

---

### F. Working shortlist

| Priority | Name | Why |
|---|---|---|
| 1 | **Labby** | Easiest; puppy/duckie twin; Labrador-obvious |
| 2 | **Retrie** | Meaning on the nose (retrieve sessions / results) |
| 3 | **Goldie** | Golden retriever; maximum warmth / ease |
| 4 | **Fetchie** | Verb you already want in the product |
| 5 | **Triever** | Shorter retriever; still clear |
| 6 | **Labra** | Ownable clip of Labrador |
| 7 | **Revvie** | Soft retrieve; agent “rev” |
| 8 | **Lador** | Distinct Labrador shard |

**Skip / careful:** bare **Lab** (laboratory / GitLab gravity), full **Labrador** (long CLI), **Fetch** alone (likely crowded — use Fetchie).

**Logo:** chocolate/yellow/black Lab head, tennis ball, or stick — as drawable as Datadog’s dog. Capybara can stay secondary mascot; Lab becomes the face.

**Next step:** §8-screen **Labby**, **Retrie**, and **Goldie** (or **Fetchie** if you want the verb). Same checklist as Yima/Bole/Fleeti.

---

## 21. Broader dog-name variations

Widen the kennel past Labrador (§20). Same bar: **easy to say, easy to remember**, meaning for
agent fleet / watch / fetch / loyal companion, sticker-simple logo.

### Why dogs keep working

Datadog already proved the category likes dogs. Your brief (puppy, duckie, Lab) wants the *soft*
end of that — companion and fetch — not attack breeds or long show names.

| Dog idea | Product rhyme |
|---|---|
| Pack | many agents, one overseer |
| Fetch / bring | retrieve sessions, digests, PRs |
| Watch / guard | monitoring layer |
| Walk / lead | human holds the leash (rein invariant) |
| Herd | corral coding agents |
| Companion | centaur-soft: human + helper |

---

### A. Soft breed names (easy as puppy)

| Name | Breed / idea | Say | Notes |
|---|---|---|---|
| **Corgi** | Welsh Corgi | *KOR-gee* | Short, famous, cute; herding breed = fleet control |
| **Corgie** | soft -e | *KOR-gee* | Duckie spelling |
| **Beagle** | Beagle | *BEE-gull* | Scout / sniffer → finds sessions & signals |
| **Beagie** | Beagle + ie | *BEE-gee* | Softer CLI |
| **Pug** | Pug | *pug* | 3 letters; very sticky; less “fleet” meaning |
| **Puggie** | Pug + ie | *PUG-ee* | Duckie form |
| **Poodle** | Poodle | *POO-dull* | Smart/trainable wink; check collisions |
| **Poodie** | clip | *POO-dee* | Softer |
| **Collie** | Collie (also Collatz wink §19) | *KOL-ee* | Herding + dog; as easy as duckie |
| **Sheltie** | Shetland Sheepdog | *SHEL-tee* | Herding; soft; “shelter/shelt” ear |
| **Akita** | Akita | *ah-KEE-tah* | Loyal; sharper sound |
| **Shiba** | Shiba Inu | *SHEE-bah* | Cute internet dog; crowded meme |
| **Husky** | Husky | *HUS-kee* | Team-pull (sled = fleet); energetic |
| **Huskie** | soft | *HUS-kee* | Same |
| **Malamute** | Alaskan Malamute | *MAL-uh-myoot* | Pack pull; long for CLI |
| **Malam** / **Mally** | clips | *MAL-um* / *MAL-ee* | Shorter |
| **Boxer** | Boxer | *BOX-er* | Punchy; less soft |
| **Boxie** | soft | *BOX-ee* | Cuter |
| **Spaniel** | Spaniel | *SPAN-yull* | Soft; long |
| **Sannie** / **Spanie** | clips | *SAN-ee* / *SPAN-ee* | Easier |
| **Terrier** | Terrier | *TAIR-ee-er* | Feisty; 3 syllables |
| **Terrie** | clip | *TAIR-ee* | Duckie |
| **Dane** | Great Dane | *dayn* | Short; personal-name collision |
| **Danie** | soft | *DAY-nee* | Softer |
| **Whippet** | Whippet | *WIP-it* | Fast agent runs; cute word |
| **Whippie** | soft | *WIP-ee* | Duckie |
| **Vizsla** | Vizsla | *VEESH-lah* | Velcro dog (sticks to human); harder spelling |
| **Vizzie** | soft | *VIZ-ee* | Easier |
| **Kelpie** | Australian Kelpie | *KEL-pee* | Herding; already soft -ie |
| **Heeler** | Blue Heeler / cattle dog | *HEE-ler* | Herds by heel — control from behind |
| **Heelie** | soft | *HEE-lee* | Duckie; also Heelys shoes noise |
| **Shepherd** | German/Aussie Shepherd | *SHEP-erd* | Classic overseer metaphor |
| **Sheppy** / **Shep** | clips | *SHEP-ee* / *shep* | Easier CLI |
| **Aussie** | Australian Shepherd | *AW-see* | Soft; “Australia” collision |
| **Bernie** | Bernese Mountain Dog | *BER-nee* | Name-easy; big gentle helper |
| **Newfie** | Newfoundland | *NEW-fee* | Gentle giant; rescue/retrieve water |
| **Samoyed** / **Sammy** | Samoyed | *SAM-ee* | Smile-dog; very soft |
| **Sammy** | clip | *SAM-ee* | Peak easy (personal name tax) |
| **Chow** / **Chowie** | Chow Chow | *chow* / *CHOW-ee* | Short; food ear-slip |
| **Basenji** | Basenji | *bah-SEN-jee* | Unique; harder |
| **Senji** | clip | *SEN-jee* | Softer |

---

### B. Dog-job words (meaning first, still cute)

| Name | Job | Say | Product hook |
|---|---|---|---|
| **Fetchie** | fetch | *FETCH-ee* | Retrieve sessions / results (§20) |
| **Watchie** | watchdog | *WATCH-ee* | Monitoring (§18) |
| **Guardie** | guard dog | *GAR-dee* | Watch the fleet |
| **Herdie** | herding | *HER-dee* | Corral agents (§18) |
| **Packie** | pack | *PACK-ee* | Many agents (§18) |
| **Leashy** / **Leashie** | on leash | *LEESH-ee* | Human holds control (rein) |
| **Walkie** | walk | *WALK-ee* | Take agents out / walk the board |
| **Sitty** | sit/stay | *SIT-ee* | Agents stay where you put them |
| **Stayie** | stay | *STAY-ee* | Weak |
| **Rollover** | trick | — | Too long / awkward |
| **Scoutie** | scout | *SKOW-tee* | Sentinel (§18) |
| **Pointer** | pointing breed | *POINT-er* | Points at issues in the fleet |
| **Pointie** | soft | *POINT-ee* | Cuter |
| **Tracker** | tracking | *TRACK-er* | Trace runs; observability |
| **Trackie** | soft | *TRACK-ee* | Duckie |
| **Sniffie** | scent work | *SNIFF-ee* | Find signals in logs/sessions |
| **Barkie** | bark | *BAR-kee* | Alerts; maybe noisy valence |
| **Woofie** | woof | *WOOF-ee* | Very cute; light meaning |
| **Puppack** | pup × pack | *PUP-pack* | PuppyGraph compound |
| **Dogdeck** | dog × deck | — | Manager cockpit; heavier |

---

### C. Soft dog-words & nicknames

| Name | Say | Notes |
|---|---|---|
| **Puppy** | *PUP-ee* | You already like the ease; bare word crowded / unserious alone |
| **Pups** | *pups* | Plural fleet wink |
| **Puppie** | *PUP-ee* | Same |
| **Doggo** | *DOG-oh* | Internet-cute; meme tax |
| **Pupper** | *PUP-er* | Meme tax |
| **Goodboy** | — | Too meme / awkward product |
| **Buddy** | *BUD-ee* | Companion; very generic |
| **Buddie** | *BUD-ee* | Soft spelling |
| **Pal** | *pal* | Short; weak |
| **Sidekick** | *SIDE-kick* | Human+agent; clear; less “dog” |
| **Mutt** / **Muttie** | *mutt* / *MUT-ee* | Mixed agents / vendor mix; “mutt” can feel low-status |
| **Mongrel** | — | Skip (negative) |
| **Canie** | from canine | *KAY-nee* | Soft coined |
| **Canine** | — | Clinical |
| **Fido** | *FY-doh* | Classic dog name; dated/owned |
| **Rex** | *rex* | Classic; sharp |
| **Rover** | *RO-ver* | Roaming agents; classic dog name |
| **Spot** / **Spottie** | *spot* / *SPOT-ee* | Monitoring “spot”; Dalmatian wink |
| **Spottie** | *SPOT-ee* | Cute + observe |
| **Patch** / **Patchie** | *patch* / *PATCH-ee* | Patch of fur / patch the run; also software patch |
| **Tails** | *taylz* | Wagging; also `tail -f` observability double meaning — strong |
| **Tailsy** / **Tailie** | *TAYL-ee* | Soft; Unix `tail` wink |
| **Paw** / **Pawie** | *paw* / *PAW-ee* | Soft; weak meaning |
| **Pawpack** | — | Compound pack |
| **Woof** | *woof* | Alert; tiny |
| **Arf** / **Arfie** | *arf* / *ARF-ee* | Tiny cute |
| **Bark** | *bark* | Alert; sharp |
| **Howie** | howl | *HOW-ee* | Soft; personal-name tax |
| **Hound** / **Houndie** | *hound* / *HOWN-dee* | Search/hunt sessions |
| **Houndie** | *HOWN-dee* | Softer |
| **Bloodhound** | — | Long; intense |
| **Scentie** | scent | *SEN-tee* | Find; clashes with Centie (§18) |

---

### D. Herding / working line *(closest to fleet control)*

These are the best *meaning* dogs for “many agents, one human”:

| Name | Why |
|---|---|
| **Corgi** / **Corgie** | Herds; short; globally cute |
| **Collie** | Herds; duckie sound |
| **Kelpie** | Already `-ie`; farm herding |
| **Heeler** / **Heelie** | Controls from the heel — human leads |
| **Sheppy** / **Shep** | Shepherd = overseer |
| **Aussie** | Aussie shepherd; soft |
| **Herdie** | Job-word; breed-agnostic |
| **Packie** | Pack structure |

---

### E. Working shortlist (dog-wide)

| Priority | Name | Lane | Why |
|---|---|---|---|
| 1 | **Corgi** | breed | Short, cute, herding = fleet control |
| 2 | **Collie** | breed | Duckie-easy; herd |
| 3 | **Tailie** | word + Unix | Wag + `tail -f` monitoring |
| 4 | **Spottie** | nickname | Spot issues; Dalmatian cute |
| 5 | **Kelpie** | breed | Soft `-ie`; herding |
| 6 | **Sheppy** | shepherd | Overseer metaphor |
| 7 | **Beagie** | beagle | Scout / find sessions |
| 8 | **Houndie** | hound | Search the fleet history |
| 9 | **Rover** | classic name | Agents roam; you call them back |
| 10 | **Whippie** | whippet | Fast runs; soft |

Keep in play from §20: **Labby**, **Retrie**, **Goldie**, **Fetchie**.

**Logo system:** one simple dog silhouette (corgi butt, collie nose, spotted coat, wagging tail) — Datadog-adjacent but your own breed face. Capybara can remain the “interop host” alternate sticker.

**Skip:** aggressive-guard marketing (Rottweiler, Pit, Malinois), meme-only (**Doggo**/**Pupper**) as the *primary* product word, bare **Lab** / **Dog** / **Pup** without a twist.

**Next step:** if the dog lane is the one, §8-screen a mixed trio — e.g. **Corgi**, **Tailie**, **Labby** — so you test breed vs Unix-wink vs Labrador soft.

---

## 22. Retrieve-soundalikes & respellings of favorites

Two asks in one:

1. Names that **sound like “retrieve”** (easy to say, still mean “bring it back”).
2. **Different spellings** of the popular soft names already in play (Labby, Goldie, Corgi, …) — same mouthfeel, new orthography for registry/domain room.

---

### A. Sounds like *retrieve* (*ri-TREEVE*)

Keep the stress pattern: **re- / rə-** + **TREEVE**-ish ending — or clip to the **treeve / trieve** half.

| Name | Say | Trick | Notes |
|---|---|---|---|
| **Retrie** | *ri-TREE* | clip -ver | Already shortlisted; cleanest |
| **Retreeve** | *ri-TREEVE* | ee for ea | Full sound; looks coined/ownable |
| **Retreive** | *ri-TREEVE* | common misspell of retrieve | Instantly readable; may look like a typo |
| **Retriv** | *ri-TRIV* | drop ending | Sharper; slightly “trivia” ear |
| **Retrev** | *ri-TREV* | e/i swap | Short; Trever/Trevor slip |
| **Retreiv** | *ri-TREEVE* | ie vowel | Soft brandy |
| **Ritrive** | *ri-TREEVE* | i for e | Same sound; odd look |
| **Reetrive** | *ree-TREEVE* | double e | Emphasizes “re-” (do again / fetch again) |
| **Trieve** | *TREEVE* | drop Re- | One syllable punch; still “retrieve” |
| **Treeve** | *TREEVE* | phonetic | Same; tree + eve look |
| **Trevie** | *TREE-vee* | duckie -ie | Softest retrieve-family |
| **Treve** | *TREEVE* / *trev* | hard clip | Tiny CLI; Trevor ear |
| **Trievy** | *TREE-vee* | y ending | Soft |
| **Retrievy** | *ri-TREE-vee* | full + y | Very soft; 3 beats |
| **Retrivy** | *ri-TRIV-ee* | iv + y | Soft; “trivia” slip |
| **Retrivr** | *ri-TREE-ver* | Flickr-style -r | Product-y; drops silent e |
| **Retrievr** | *ri-TREE-ver* | same idea | Closer to “retriever” |
| **Retrvr** | *ri-TREE-ver* | heavy clip | Ultra-brand; hard to guess first time |
| **Revvie** | *REV-ee* | retrieve → rev | Soft; engine “rev” wink |
| **Reevie** | *REE-vee* | reeve + ie | Gentle; teach spelling |
| **Reeve** | *reev* | real word (bailiff) | One syllable; historical “steward” — overseer wink |
| **Review** | *ri-VIEW* | near shape | Monitoring meaning; English-crowded |
| **Revie** | *REE-vee* / *ri-VIEW* | clip review | Soft monitor wink |
| **Retrace** | *ri-TRACE* | related re- | Observability; less cute |
| **Reprieve** | *ri-PREEVE* | near rhyme | Wrong meaning (delay/pardon) — skip |

**Best retrieve-lane shortlist:** `Retreeve`, `Trieve`, `Trevie`, `Retrie`, `Retrivr`, `Revvie`.

---

### B. Respellings of popular names we already like

Same pronunciation (or nearly); different letters so `npm` / domains / GitHub might open.

#### Labrador / Lab family
| Familiar | Respellings | Say |
|---|---|---|
| **Labby** | Labbi, Labbie, Labbee, Laby, Labbey, Labbi | *LAB-ee* |
| **Labra** | Labbra, Labrah, Labhra | *LAB-ra* |
| **Lador** | Lahdor, Laydor, Ladorr | *LAY-dor* |
| **Goldie** | Goldy, Goldi, Goaldee, Goaldi, Goldye | *GOAL-dee* |
| **Fetchie** | Fetchy, Fetchee, Fechie, Fetchi | *FETCH-ee* |

#### Other dogs
| Familiar | Respellings | Say |
|---|---|---|
| **Corgi** | Korgi, Corgie, Korgie, Corgey, Korji | *KOR-gee* |
| **Collie** | Kollie, Colly, Kolly, Colley, Coli | *KOL-ee* |
| **Kelpie** | Kelpy, Kellpie, Kelpee, Kelpi | *KEL-pee* |
| **Sheppy** | Shepi, Shepee, Sheppi, Sheppee | *SHEP-ee* |
| **Heelie** | Heely, Heeli, Heeley, Healey* | *HEE-lee* |
| **Beagie** | Beagy, Beegi, Beagee, Beagiee | *BEE-gee* |
| **Tailie** | Taily, Taylie, Tailee, Tayley, Tayli | *TAY-lee* |
| **Spottie** | Spotty, Spoti, Spottee, Spoty | *SPOT-ee* |
| **Houndie** | Houndy, Howndie, Houndi | *HOWN-dee* |
| **Whippie** | Whippy, Whippee, Whipi, Wippie | *WIP-ee* |
| **Rover** | Rovver, Rovur, Rovir | *RO-ver* |

\*Healey looks like a surname — good or bad depending on §8.

#### Cute non-dog favorites still in the air
| Familiar | Respellings | Say |
|---|---|---|
| **Pony** | Ponie, Poney, Ponee, Ponii | *POH-nee* |
| **Remy** | Remi, Remee, Remmie, Remmi, Remye | *REM-ee* |
| **Herdie** | Herdy, Herdee, Hurdie, Herdi | *HER-dee* |
| **Centie** | Centy, Senty, Senti, Centee, Centi | *SEN-tee* |
| **Reiny** | Reinie, Rainy*, Rainie, Reynie, Rayny | *RAY-nee* |
| **Dotty** | Dottie, Doty, Doti, Dottee | *DOT-ee* |
| **Vennie** | Venny, Venie, Vennee, Veni | *VEN-ee* |
| **Zippie** | Zippy, Zippi, Zippee, Zipi | *ZIP-ee* |
| **Scoutie** | Scouty, Skoutie, Scouti | *SKOW-tee* |
| **Packie** | Packy, Pakkie, Paky, Packi | *PACK-ee* |

\*Rainy = exact English word (weather) — pronounce twin, meaning drift.

#### Math-cute favorites
| Familiar | Respellings | Say |
|---|---|---|
| **Amie** | Amy*, Ami, Aimee, Amye | *ah-MEE* / *AY-mee* |
| **Cardie** | Cardi, Kardee, Cardey | *CAR-dee* |
| **Mobie** | Moby*, Mobi, Moebie, Mobee | *MOH-bee* |
| **Phie** | Phi, Fie, Phe, Phy | *FEE* / *fie* |
| **Mew** | Mu, Myu, Meu | *myoo* |
| **Telly** | Telli, Telee, Telie | *TEL-ee* |
| **Splinie** | Spliny, Splinee, Splini | *SPLINE-ee* |

\*Amy / Moby = famous collisions — respell carefully.

---

### C. Flickr-style & vowel-twist patterns (apply to any favorite)

Use these recipes when the obvious spelling is taken:

1. **Swap y / ie / ee / i** — Labby → Labbie → Labbee → Labbi  
2. **K for C** — Corgi → Korgi; Collie → Kollie  
3. **Drop a vowel** — Retriever → Retrivr; Goldie → Goldi  
4. **Double a consonant** — Remy → Remmie; Packie → Pakkie  
5. **End in -r / -rve** — Retrivr, Triever → Trievr  
6. **Phonetic English** — retrieve → Retreeve; rein → Rainie (careful)

---

### D. Tight shortlist (this section only)

**If you want the retrieve sound:**
1. **Retreeve** — full pronounce, ownable spelling  
2. **Trieve** — short punch  
3. **Trevie** — duckie soft  
4. **Retrivr** — product/Flickr shape  
5. **Retrie** — minimal clip  

**If you want old favorites in new clothes:**
1. **Labbie** / **Labbi** (from Labby)  
2. **Korgi** / **Corgie** (from Corgi)  
3. **Goldi** / **Goaldee** (from Goldie)  
4. **Kollie** / **Colley** (from Collie)  
5. **Taylie** / **Tailee** (from Tailie)  
6. **Remi** / **Remmie** (from Remy)  
7. **Dottie** (from Dotty)  
8. **Fetchy** / **Fetchee** (from Fetchie)  

**Next step:** §8-screen one retrieve-sound (**Retreeve** or **Trieve**) plus one respell (**Labbie** or **Korgi**) — proves whether orthography actually frees npm/GitHub or the *sound* is already owned.

---

## 23. Verb lane — dog verbs, capybara verbs, product verbs

Shift from *animal-as-noun* to **verb-as-brand**: what the animal *does*, and what the product *does*.
Same ease bar (puppy/duckie). Verbs often make the best CLIs: `fetch`, `watch`, `heel`, `host`.

---

### A. Verbs we associate with **dogs**

| Verb | What the dog does | Product rhyme | Cute / easy name forms |
|---|---|---|---|
| **fetch** | bring the thing back | pull sessions, digests, PR results | Fetchie, Fetchy, Fetchee, Fetchr |
| **retrieve** | formal fetch | same, more serious | Retrie, Retreeve, Trieve, Trevie, Retrivr (§22) |
| **bring** | deliver to human | handoff packet → you | Bringie, Bringy |
| **carry** | hold in mouth | carry context across vendors | Carrie*, Carry | 
| **heel** | walk at your side | human leads; agents follow | Heelie, Heely, Heel |
| **herd** | move the group | corral agent fleet | Herdie, Herdy |
| **guard** | protect | watch the fleet | Guardie, Gardy |
| **watch** | stay alert | monitoring / observability | Watchie, Watchy |
| **scout** | go look ahead | explore repos / sessions | Scoutie, Scouty |
| **sniff** | find by scent | find signal in logs | Sniffie, Sniffy |
| **track** | follow a trail | trace a run / ticket→PR | Trackie, Tracky, Tracker |
| **point** | indicate prey | point at the failing agent | Pointie, Pointy |
| **trail** | follow behind | `tail -f` double meaning | Trailie, Traily, Tailie |
| **tail** | follow / wag | observe stream (`tail`) | Tailie, Taily, Tails |
| **follow** | stay with leader | agents follow planner | Followie — long; Folly bad |
| **lead** | go first | planner agent / you lead | Leadie, Leady — weak |
| **leash** | human restraint | rein invariant | Leashie, Leashy |
| **sit** / **stay** | wait for command | agents wait on you | Sitty, Stayie — toyish |
| **dig** | unearth | dig into session history | Diggie, Diggy |
| **bury** | hide | weak / negative | skip |
| **chase** | pursue | chase a failing run | Chasie, Chasey |
| **bark** | alert | notify on failure | Barkie, Barky — noisy valence |
| **wag** | show status | healthy pulse | Waggie, Waggy |
| **nuzzle** | soft contact | gentle attach to CLI | Nuzzie — very soft |
| **cuddle** | comfort | tone only | Cuddlie — maybe too soft |
| **walk** | outing | walk the board / standup | Walkie, Walky |
| **run** | go | `run` an agent | already English CLI |
| **come** | return to human | detach → attach back | soft; hard to brand |
| **hold** | gentle bite/hold | hold state / reinhold | Holdie |
| **pack** | move as pack | fleet together | Packie, Packy |

\*Carrie = personal name collision.

**Dog-verb shortlist:** `Fetchie`, `Heelie`, `Herdie`, `Watchie`, `Trackie`, `Tailie`, `Sniffie`, `Pointie`, `Leashie`, `Diggie`.

---

### B. Verbs / behaviors we associate with **capybaras**

Capybaras are less “command” animals than dogs — more **state and social verbs**. That matches your interop thesis (§4): everything sits on them peacefully.

| Verb / behavior | What the capybara does | Product rhyme | Cute / easy name forms |
|---|---|---|---|
| **host** | birds/monkeys sit on them | vendor-neutral platform | Hostie, Hosty, Host |
| **carry** | carry other species | carry Claude+Codex together | Carrie, Carry |
| **share** | share space | shared run folder / stigmergy | Sharee, Sharie, Sharey |
| **welcome** | tolerate all comers | any agent vendor welcome | Welcie — awkward; Welcome long |
| **tolerate** | don’t drive others off | coexist planner+workers | Tolie, Tolly — weak |
| **lounge** | rest calm under load | calm observability | Loungie, Loungey |
| **chill** | stay calm | calm under load (§4.1) | Chillie, Chilly* |
| **float** | semi-aquatic rest | stay light on the system | Floatie, Floaty |
| **soak** / **wallow** | water rest | deep context soak | Soakie; Wallow long |
| **bask** | rest in sun | idle-healthy state | Baskie, Basky |
| **submerge** | sink, keep eyes up | background watch, head above water | Subbie — weak; Merjie no |
| **watch** | eyes/ears/nose above water | monitor while “under” | Watchie (shared with dog) |
| **graze** | easy feeding | steady token/work graze | Grazie, Grazey |
| **rest** | stillness | wait without panic | Restie, Resty |
| **sit** | sit still for riders | stable platform | Sitty |
| **ride** *(others ride them)* | be the mount | agents ride your board | Ridie, Ridey — or **Rider** for human |
| **ferry** | move others across | handoff across vendors | Ferrie, Ferry, Ferrie |
| **bridge** | connect banks | vendor bridge | Bridgie — Bridge crowded |
| **gather** | herd loosely | gather sessions | Gatherie — long; Gathie |
| **nuzzle** | gentle social | soft attach | Nuzzie |
| **huddle** | group calm | huddle agents | Huddie, Huddly |
| **coexist** | multi-species | multi-vendor | Coexie — ugly |
| **mingle** | mix peacefully | mix vendors | Minglie, Mingle |
| **nestle** | settle in | nest in `.yima/` / board | Nestlie, Nestie |
| **park** | sit/park body | park an agent / session | Parkie, Parky |
| **pause** | stillness | pause fleet | Pausie |
| **drift** | easy water move | soft fail; “drift” negative in git | skip as primary |
| **calm** | be calm | calmry already (§12) | Calmie, Calmy |

\*Chilly = cold valence risk.

**Capybara-verb shortlist:** `Hostie`, `Floatie`, `Loungie`, `Ferrie`, `Huddie`, `Nestie`, `Parkie`, `Baskie`, `Sharee`, `Nuzzie`.

**Strongest capybara verbs for *meaning* (not just cute):** **host**, **ferry**, **share**, **watch**, **carry** — those *are* the product.

---

### C. Product verbs (what *you* already do) → cute forms

Ground in §2 / §7.1 — not animal theater:

| Product verb | Meaning | Cute / easy forms | Tone |
|---|---|---|---|
| **watch** | observe agents | Watchie | dog + capy |
| **attach** / **detach** | take over CLI / give back | Attachie — clumsy; **Attache** already (§11) | serious |
| **fork** | branch session | Forkie, Forky | Unix-cute |
| **mux** | multiplex panes | Muxie, Muxy | Unix-cute |
| **spawn** | start agent | Spawnie — awkward | |
| **handoff** | cross-vendor packet | Handie, Hoffie — weak; keep Handoff | |
| **steer** | control | Steerie, Steery | soft control |
| **rein** | restrain/guide | Reiny, Reinie | horse + control |
| **oversee** | chief of staff | Overie — weak | |
| **run** | execute | Runnie — weak; `run` stays command | |
| **digest** | daily LLM digest | Diggie*, Digestie | Diggie also dog-dig |
| **launch** | start board/agent | Launchie — long | |
| **advance** | configure-then-advance | Advie — weak | |
| **retrieve** | read vendor logs | (§22) | dog |
| **tail** | follow log stream | Tailie | dog + Unix |
| **trace** | follow execution | Tracey, Tracie | soft |
| **join** | join workstreams | Joynie | soft |
| **wait** | human gate | Waitie — weak | |
| **park** | pause session | Parkie | capy + devops |
| **host** | be the layer | Hostie | capy |
| **ferry** | carry context across | Ferrie | capy gold |
| **zip** | braid streams | Zippie | math/FP |
| **fold** | reduce many→one | Foldie | math/FP |
| **leash** | human authority | Leashie | dog |

---

### D. Verb → name recipes

1. **Verb + ie/y** — fetch → Fetchie; host → Hostie; float → Floatie  
2. **Verb + r (Flickr)** — fetch → Fetchr; watch → Watchr  
3. **Bare verb** — only if §8-clear and not English-crowded (`heel`, `mux`, `ferry`)  
4. **Animal noun + verb** — PuppyGraph style: Labwatch, Capyhost, Dogfetch — use when one word fails  

---

### E. Side-by-side: which verbs belong to whom

| Verb | Dog | Capybara | Product |
|---|---|---|---|
| fetch / retrieve | ✅ primary | ❌ | ✅ read sessions |
| heel / herd / leash | ✅ primary | ❌ | ✅ human leads fleet |
| watch / scout / track | ✅ | ✅ watch | ✅ monitor |
| host / ferry / share | ❌ | ✅ primary | ✅ interop layer |
| float / lounge / bask | ❌ | ✅ primary | ✅ calm under load |
| fork / mux / attach | ❌ | ❌ | ✅ Unix core |
| park / nest | soft | ✅ | ✅ session lifecycle |

**Reading:** dogs give you **control + fetch** verbs. Capybaras give you **platform + calm + interop** verbs. The product needs **both** — which is why a dog *face* + capybara *mascot* (or vice versa) still works, or a verb name that sits in the overlap: **watch**, **carry**, **park**.

---

### F. Working shortlist (verb-first)

| Priority | Name | Verb family | Why |
|---|---|---|---|
| 1 | **Ferrie** | capy ferry | Cross-vendor carry; cute; clear |
| 2 | **Hostie** | capy host | Platform everything sits on |
| 3 | **Fetchie** | dog fetch | Retrieve sessions/results |
| 4 | **Heelie** | dog heel | Human leads; agents at heel |
| 5 | **Watchie** | both | Monitoring; easiest meaning |
| 6 | **Leashie** | dog leash | Control invariant; soft |
| 7 | **Floatie** | capy float | Calm under load; very duckie |
| 8 | **Parkie** | capy/devops park | Park a session / agent |
| 9 | **Trackie** | dog track | Trace ticket→PR |
| 10 | **Forkie** | product fork | Core mechanic; Unix-cute |
| 11 | **Muxie** | product mux | Multiplex surface |
| 12 | **Tailie** | dog + Unix tail | Observe stream |

**Pairing idea:** product CLI = verb (**Ferrie** / **Fetchie** / **Heelie**); mascot = noun animal (capybara or Lab). Name does the job; sticker does the feeling (§4.3).

**Next step:** pick one dog-verb (**Fetchie** or **Heelie**) and one capy-verb (**Ferrie** or **Hostie**) for §8 — that tests both halves of the thesis.

---

## 24. Screening report — Packie (§8 applied)

Screened 2026-07-29. Same method as §15–§17. Not legal advice.

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `packie` | **Taken (weak)** | “a light javascript package tool for browser”, v0.0.1, modified 2022, **~9 downloads/month**. Exact name blocked, but not a Bole-scale dependency. |
| 1 | **PyPI / RubyGems / crates / Homebrew** | **Clear** | All 404 |
| 1 | Nearby npm | **Noise** | `packy` taken, `packi` taken, `packs` taken; `pakkie`, `packie-ai`, `getpackie` clear |
| 2 | **GitHub org** `packie` | **Clear** | 404 |
| 2 | **GitHub user** `packie` | **Taken** | Since 2010, mostly empty squat |
| 3 | **Domains** | **Mixed** | See table |
| 4 | **Trademark 9/42** | **Caution** | Quick pass only; shipping/logistics “Packie” in market — counsel if you proceed |
| 5 | **Adjacent product** | **Real hit** | **Packie** = NZ Shopify shipping/consignment app ([apps.shopify.com/packie](https://apps.shopify.com/packie), packie.co.nz). Packing/parcels — not agents, but exact brand in “pack*” commerce. Also scattered PackieAI toy repos. |

#### Domains (DNS + RDAP skim)

| Domain | Status (skim) | Read |
|---|---|---|
| `packie.com` | Registered, ParkLogic | Parked |
| `packie.ai` | Registered (Cloudflare, locked) | Taken |
| `packie.app` | Registered (Cloudflare) | Taken |
| `packie.io` | AWS NS in DNS | Treat as taken / in use |
| `packie.dev` | NXDOMAIN / RDAP 404 | Likely available |
| `packie.sh` | NXDOMAIN / RDAP 404 | Likely available |
| `packie.so` / `packie.co` | NXDOMAIN | Likely available |
| `getpackie.com` | NXDOMAIN | Likely available |

### Ergonomic / strategic

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 6 letters, duckie shape |
| 7 | Dotfolder `.packie/` | **Pass** | Clean |
| 8–9 | Zoom / podcast | **Pass with teach** | Easy; may hear “packy” / “Pakkie” |
| 10 | Searchability | **Weak** | Shopify Packie + packy/packi tooling + “package” SEO gravity |
| 11 | Pivot | **Soft** | “Pack” = agent pack survives; also reads as npm/parcel packing |
| 12 | Buyer tone | **OK cute / soft enterprise** | Soft dog-pack story; commerce Packie confuses category |
| 13 | Mascot | **Pass** | Dog pack / capybara pack stickers fine |

### Verdict

**Packie is cute and mostly registry-light, but not clean.**

- **npm exact taken** (dead package, but occupied).
- **Shopify Packie** owns the word in shipping — §8.5 adjacent brand, different industry, same Google string.
- **Primary domains** `.com` / `.ai` / `.app` hostile; `.sh` / `.dev` look free.
- **Dog meaning** (agent pack) still good — prefer a respell if you love the sound: **`pakkie`** (npm clear), **`Packy`** is taken, **`Packi`** taken.

**Rubric:** Hard checks soft-fail (npm + adjacent Packie logistics). Ergonomics pass. Strategic mixed.

**Recommendation:** don’t ship bare **Packie** without accepting Shopify collision + npm squat. If the *sound* is the love: screen **`pakkie`** / **`packie-ai`** / keep **pack** as metaphor under another face (Corgi, Heelie).

---

## 25. Centauri extensions — meaningful tails (rinco & friends)

Idea: keep **Centauri** as company (or stem) and add a **short extension** with meaning — e.g. you liked the *sound* of **rinco** → *Centaurinco*.

### What “rinco” actually means *(pick carefully)*

| Sense | Language | Meaning | Brand read |
|---|---|---|---|
| **–rinco** | sci. Greek *rhynchos* | beak / snout (as in Spanish/Portuguese **ornitorrinco** = platypus) | Cute animal wink; a bit biology-class |
| **rinco** | Italian slang | clip of *rincoglionito* ≈ dazed / dumb | **Avoid** in IT markets |
| **rincón** | Spanish | corner, nook, cozy spot | Nest for agents — soft, good |
| **brinco** | Portuguese / Spanish | jump; (also earring) | Energetic “jump a run” — fun |
| **–ino / –ina** | Italian diminutive | “little …” | *Centaurino* = little centaur — cute |

So **Centaurinco** sounds playful, but bare *rinco* is risky in Italian and weakly meaningful in English unless you lean **platypus** (*ornitorrinco*) or switch to **rincón / –ino**.

---

### A. Diminutive / affectionate tails *(cute Centauri)*

| Extension | Full-ish form | Meaning | Ease |
|---|---|---|---|
| **-ie** | Centaurie / Centie | duckie soft (§18) | best ease |
| **-ino** | Centaurino | Italian “little centaur” | cute, clear |
| **-ina** | Centaurina | feminine little | soft |
| **-ito** | Centaurito | Spanish little | soft |
| **-ette** | Centaurette | tiny | maybe toyish |
| **-let** | Centaurlet | tiny | awkward |
| **-y** | Centaury | also a real plant/herb | pretty; botanical collision |

---

### B. Place / nest tails *(where the fleet lives)*

| Extension | Form | Meaning |
|---|---|---|
| **rincon** | Centaurincon / product **Rincon** | Spanish *rincón* = cozy corner — board/nest |
| **den** | Centauriden / **Den** | animal den for the pack |
| **nest** | Centaurinest / **Nestie** | sessions nest |
| **yard** | Centauriyard | remuda yard |
| **bay** | Centauribay | dock bay for agents |
| **dock** | Centauridock | attach/detach dock |
| **port** | Centauriport | handoff port |
| **pad** | Centauripad | launch pad |
| **hub** | Centaurihub | control hub |
| **hold** | Centaurihold | cargo hold / rein-hold |

---

### C. Control / fleet tails *(product truth)*

| Extension | Form | Meaning |
|---|---|---|
| **helm** | Centaurihelm | you steer |
| **rein** | Centaurirein / **Reiny** | human authority |
| **pack** | Centauripack / **Packie** | agent pack |
| **herd** | Centauriherd | fleet |
| **mux** | Centaurimux | multiplex surface |
| **deck** | Centaurideck | manager cockpit |
| **ops** | Centauriops | operations |
| **run** | Centaurirun | run agents |
| **flow** | Centauriflow | workstreams |
| **link** | Centaurilink | vendor link |
| **bridge** | Centauribridge | cross-vendor |
| **ferry** | Centauriferry / **Ferrie** | carry context |
| **host** | Centaurihost / **Hostie** | platform |
| **watch** | Centauriwatch | monitor |
| **trace** | Centauritrace | observe |
| **lab** | Centaurilab | workshop (careful: “lab” gravity) |
| **forge** | Centauriforge | build/ship |
| **works** | Centauriworks | studio |

---

### D. Myth / rank tails *(centaur + authority)*

| Extension | Form | Meaning |
|---|---|---|
| **–ion** | **Centaurion** | sounds like *centurion* — officer over the troop; excellent overseer wink |
| **–us** | Centaurus | constellation (Alpha Centauri family) |
| **–um** | Centaurium | real plant genus; soft science |
| **–ia** | Centauria | place/realm |
| **–on** | Centauron | coined engine/core |
| **–os** | Centauros | Spanish/Portuguese plural “centaurs” = the fleet itself |
| **–is** | Centauris | coined soft |

**Centaurion** is the standout “extension with meaning”: Centauri stem + officer who commands the formation (agent fleet).

---

### E. Rinco-sound cousins *(if you like the mouthfeel)*

Keep the *RIN-ko / RING-ko / BRIN-ko* family without Italian slang:

| Name | Meaning hook | With Centauri |
|---|---|---|
| **Rincon** | cozy corner (ES) | product **Rincon** under Centauri |
| **Brinco** | jump (PT/ES) | spin up / jump a run |
| **Rinko** | phonetic; JP name feel | soft coined |
| **Rico** | “rich” / personal name | weak product meaning |
| **Orinco** | wink *ornitorrinco* (platypus) | cute animal; odd |
| **Rinco** alone | avoid IT slang sense | only if platypus story is intentional |
| **Centaurino** | little centaur | better than Centaurinco |
| **Centaurincon** | long | prefer product **Rincon** |

---

### F. How to use extensions (naming system)

1. **Company = Centauri** (keep). **Product = short extension word** standing alone: `Rincon`, `Ferrie`, `Helm`, `Centaurion` as product — not the 5-syllable mashup.  
2. **Company = Centauri**. **Product = Centauri + one tail** only if ≤ 4 syllables total: `Centaurion`, `Centaurino`, `Centauriops`.  
3. Avoid **Centauri + rinco** as one token if Italian slang is a concern; prefer **Centaurino** or product **Rincon**.

### Working shortlist (extension lane)

| Priority | Name | Why |
|---|---|---|
| 1 | **Centaurion** | Overseer / officer of the agent troop; Centauri-native |
| 2 | **Centaurino** | Cute little centaur; easy affection |
| 3 | **Rincon** | Cozy nest/corner for the fleet; rinco-adjacent sound with real meaning |
| 4 | **Brinco** | Jump a run; lively verb-noun |
| 5 | **Centaurihelm** / product **Helm** | Control (Helm K8s collision if bare) |
| 6 | **Centauripack** / product **Pakkie** | Pack of agents |
| 7 | **Centauriferry** / product **Ferrie** | Cross-vendor carry |
| 8 | **Centaurium** | Soft science; plant genus — check collisions |

**Skip:** bare **Rinco** as global brand without a chosen meaning story; **Centaurinco** as spelling (looks arbitrary next to Centaurino / Rincon).

**Next step:** if Centauri-stem is required, §8-screen **Centaurion** and **Rincon** (and optionally **Centaurino**). If product can detach from the company word, prefer a short verb/animal from §20–§23 and keep Centauri on the letterhead only.

---

## 26. Screening report — Unleash (§8 applied)

Screened 2026-07-29. Same method as §15–§17, §24. Not legal advice.

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `unleash` | **Taken** | Netflix archival “Unleash your code into the wild” + heavy **Unleash feature-flag** ecosystem (`unleash-client`, `@unleash/*`, `unleash-server`, …). Bare package ~730/mo; the *brand* owns the search. |
| 1 | **PyPI** `unleash` | **Taken** | Old release-commit helper (`mbr/unleash`) — secondary |
| 1 | **RubyGems** `unleash` | **Hard fail** | Official Ruby SDK — **~38.5M downloads** |
| 1 | **crates.io** `unleash` | **Taken** | Release tooling + many `unleash-*` API/SDK crates for getunleash.io |
| 1 | **Homebrew** | **Clear** | formula/cask 404 (irrelevant given the rest) |
| 2 | **GitHub** | **Taken** | [Unleash/unleash](https://github.com/Unleash/unleash) — major OSS feature-flag platform (10k+★ class); org **Unleash** |
| 3 | **Domains** | **Owned by them** | Primary: [getunleash.io](https://www.getunleash.io/); unleash.* family in their orbit |
| 4 | **Trademark 9/42** | **Treat as blocked** | Bricks Software AS d/b/a Unleash; AWS Marketplace listing; Series B (~$35M reported). Counsel would almost certainly advise against. |
| 5 | **Adjacent product** | **Hard fail — same buyer** | Enterprise **feature management / feature flags** — developer control-plane tooling. Overlaps your buyer (devs shipping with agents/AI). Worse than Fleeti (telematics) or Packie (shipping). |

### Ergonomic / strategic

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass on paper** | 7 letters; `unleash run` fine — if the name were free |
| 7 | Dotfolder `.unleash/` | **Fail socially** | Already means feature-flag config in many stacks |
| 8–9 | Zoom / podcast | **Fail** | Every listener hears the feature-flag company |
| 10 | Searchability | **Fail** | Unsearchable as a new product; they own page one |
| 11 | Pivot | **Metaphor OK, brand no** | “Unleash agents” is a nice verb (dog leash inverse) — owned |
| 12 | Buyer tone | **Fail** | Enterprise buyers already map Unleash → flags |
| 13 | Mascot | **N/A** | Don’t go here |

### Dog-lane note

From §23, **leash / unleash** is a cute control metaphor (human holds leash; or unleash the pack). Metaphor works. **The word does not** — same lesson as bare `Lab` or `Bole`: good story, taken name.

### Verdict

**No — you cannot use Unleash as the product name.**

It fails §8.1 (registries), §8.2 (GitHub), §8.3 (domains), §8.5 (major adjacent/same-category devtool), and practical search/podcast tests. This is in the **Bole / Fleeti** tier of hard no — not a “weak squat you might ignore.”

**If you like the leash idea:** stay with softer owned-sounding forms that aren’t the company — **Leashie**, **Heelie**, or a respell that doesn’t read as Unleash (don’t do `Unleesh` / `Unleashe` — still collision). Or keep the metaphor in copy (“unleash your agent pack”) while the *product word* is something §8-clear.

**Rubric scorecard:** Hard checks **0/5** meaningful clears. Do not ship.

---

## 27. Screening report — Leashie & leash-family variants (§8)

Screened 2026-07-29 after Unleash hard-failed (§26). Question: can the *cute leash* form work?

### Variants tested

`leashie`, `leashy`, `leashi`, `leashee`, `leeshy`, `leeshie`, `leashr`, `leasher`, `unleashie`, `unleashy`, `getleashie`, `leashie-ai`, …

### Hard checks (summary matrix)

| Name | npm | PyPI | gems | crates | brew | GH org | GH user | Notes |
|---|---|---|---|---|---|---|---|---|
| **leashie** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | **Taken** (empty, 2026-02) | Best duckie spelling |
| **leashy** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | **Taken** (empty, 2021) | Pet-shop brand collision |
| **leashi** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | **Taken** (12 repos, 2016) | Personal account noise |
| **leashee** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | **CLEAR** | **CLEAR** | Cleanest GH of the set |
| **leeshy** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | Taken (empty) | Looks like a person name |
| **leeshie** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | Taken (empty) | |
| **leashr** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | **CLEAR** | **CLEAR** | Flickr-style; teach spelling |
| **leasher** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | Taken (empty 2025) | |
| **unleashie** | CLEAR | CLEAR | CLEAR | CLEAR | CLEAR | **CLEAR** | **CLEAR** | Too close to Unleash — skip |
| bare **leash** | Taken (tiny) | — | — | — | — | Taken org | — | Pet-taxi app “Leash”; skip |

npm search for `leashie` / `leashy`: no meaningful package hits. Repo search for `leashie`: **0** repos.

### Domains (priority)

| Domain | Status (skim) | Read |
|---|---|---|
| `leashie.com` | Registered (Google Domains NS) | Taken |
| `leashie.dev` / `.sh` / `.ai` / `.io` / `.app` / `.so` | NXDOMAIN / RDAP not registered | **Likely available** |
| `getleashie.com` | NXDOMAIN | Likely available |
| `leashy.com` | Registered (Afternic) | Parked / aftermarket |
| `leashy.dev` / `.sh` / `.io` / `.ai` / `.app` | NXDOMAIN | Likely available |
| `leashee.com` | NXDOMAIN | Likely available |
| `unleashie.com` | NXDOMAIN | Free but **don’t use** (Unleash echo) |

### Adjacent / meaning collisions (§8.5)

| Collision | Risk to Leashie |
|---|---|
| **Unleash** (feature flags) | Podcast/search cousin — “leash” stem — but **Leashie ≠ Unleash**; distinguishable with logo + one clarify |
| **Leashy** pet shop (leashyshop.com) | Physical dog-walk gear — same cute spelling family; **not** a devtool; mild SEO/pet-shelf confusion |
| **Leash** pet taxi app | Bare word; less risk if you stay on **Leashie** |
| French SCI “LEASHY” | Real-estate shell — ignore |

Not a same-category developer control-plane product. Much healthier than Unleash / Fleeti / Bole.

### Ergonomic / strategic

| # | Check | Leashie? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 7 letters; `leashie run` fine |
| 7 | Dotfolder `.leashie/` | **Pass** | Clean; no existing meaning |
| 8 | Zoom | **Pass** | L-E-A-S-H-I-E; may need “like leash + ie” |
| 9 | Podcast | **Pass with one line** | “Leashie, not Unleash the feature-flag tool” |
| 10 | Searchability | **Good-enough** | Coined-ish; Unleash dominates “unleash” not “leashie” |
| 11 | Pivot | **Pass** | Human holds the leash = authority invariant; survives observability→orchestration |
| 12 | Buyer tone | **Cute / solo-dev friendly** | Enterprise may want a sterner twin later; OK for seed |
| 13 | Mascot | **Pass** | Dog on a leash / capybara on a soft leash — sticker writes itself |

### Variant ranking (this family)

| Rank | Name | Verdict |
|---|---|---|
| 1 | **Leashie** | **Best balance** — registries clear, org free, meaning clear, duckie shape. User squat + `.com` taken are normal seed friction; `.sh` / `.dev` open. |
| 2 | **Leashee** | Cleanest GH (user+org free); slightly uglier spelling |
| 3 | **Leashr** | Registries + GH clear; Flickr-odd; teach once |
| 4 | **Leashy** | Registries clear but **pet-shop brand** + parked `.com` |
| 5 | **Leashi** | GH personal account with history — avoid |
| ❌ | **Unleashie** / **Unleashy** | Don’t — Unleash gravity |
| ❌ | bare **Leash** / **Unleash** | Already failed / pet-taxi / feature-flags |

### Verdict

**Yes — Leashie is usable under §8, with normal caveats.**

Unlike Unleash, it does **not** hit a major same-category developer product. All major package registries are clear. Main follow-ups before locking:

1. Grab **`leashie.sh`** or **`leashie.dev`** (and GitHub **org** `leashie`) early — user handle is squatted empty.  
2. Accept pet-aisle echo of **Leashy** shop / dog mascot (can be a feature).  
3. In first-hear copy, one clause distancing from **Unleash** feature flags.  
4. Trademark class 9/42 search still required (not done deeply here) — especially vs pet brands and Unleash.

**Metaphor fit:** strongest dog-control verb form yet — human holds the leash; agents run; you don’t go headless (§2 invariant). Pairs with Lab/Corgi/capybara stickers.

**Recommended next:** register `leashie.sh` + GH org if you want this lane; optionally §8-compare head-to-head with **Heelie** / **Ferrie** before final.

---

## 28. Heel family — short names, combos, suffixes (with registry skim)

You like **Heel**: dog command = walk at my side → human leads, agents follow. Short, memorable, on-thesis.

Goal: **short**, optionally **combined**, **rememberable**, **package-clear**.

Quick registry skim 2026-07-29 (npm / PyPI / gems / crates / brew). Not full trademark counsel.

### Meaning to keep

| Phrase | Product |
|---|---|
| *Heel* (dog cmd) | Agents stay at your side; you are final authority |
| *Heeler* (cattle dog) | Working dog that controls the herd from the heel |
| *at heel* | Formal obedience position — attach/detach without losing the lead |

---

### A. Bare / tiny (≤6 letters)

| Name | Say | Registries | Domains / adjacent | Verdict |
|---|---|---|---|---|
| **Heel** | *heel* | **All taken** (npm~280/mo + pypi/gems/crates) | `heel.*` mostly taken; foot/medical ear | **No** — short but not clear |
| **Heels** | *heels* | **All CLEAR** ✓ | fashion “high heels” SEO; GH org taken | Possible; teach “at your heels” |
| **Heely** | *HEE-lee* | **All CLEAR** ✓ | **Heelys** roller-shoes brand (famous) | Risky podcast twin |
| **Heeli** | *HEE-lee* | **All CLEAR** ✓ | weaker brand look | OK respell of Heelie |
| **Heelie** | *HEE-lee* | **All CLEAR** ✓ | `.com` parked; **`.dev/.sh/.ai/.io` look free** | **Top cute short** |
| **Heelee** | *HEE-lee* | **All CLEAR** ✓ | uglier | Backup spelling |
| **Heelr** | *heeler*-ish | **All CLEAR** ✓ | Flickr-odd; GH org taken | OK if you like -r |
| **Heelo** | *HEE-lo* | crates **taken** | hello ear-slip | Skip |
| **Heelt** | *heelt* | CLEAR ✓ | awkward | Skip |
| **Heelen** | *HEE-len* | CLEAR ✓ | personal-name feel | Soft maybe |

---

### B. + a few characters at the end (suffix recipes)

| Pattern | Examples | Registries | Notes |
|---|---|---|---|
| **-ie / -y** | Heelie, Heely, Heeli | CLEAR | duckie ease — preferred |
| **-er** | **Heeler** | npm **taken** (~100/mo) | Perfect meaning BUT… |
| | | | **heeler.com = Agentic Development Security** — AI/agent SDLC security platform. **Same buyer neighborhood. Do not ship Heeler.** |
| **-r** | Heelr | CLEAR | brandy |
| **-o** | Heelo | crates taken | skip |
| **-ix** | **Heelix** | CLEAR ✓ | heel + helix (DNA/twist of workstreams); sci-cute |
| **-um** | Heelum | CLEAR ✓ | soft coined |
| **-io** | Heelio | CLEAR ✓ | startup-io; heelio.com taken |
| **-ai** | Heelai | CLEAR ✓ | dates as AI wrapper — avoid |
| **-ops** | **Heelops** | CLEAR ✓ | heel + ops; serious short compound |
| **-mux** | **Heelmux** | CLEAR ✓ | heel + multiplex surface |
| **-run** | Heelrun | CLEAR ✓ | `heelrun` CLI story |
| **-deck** | Heeldeck | CLEAR ✓ | cockpit |
| **-pack** | Heelpack | CLEAR ✓ | pack at heel |
| **-ify** | Heelify | CLEAR ✓ | dated verbing — weak |
| **-dog / -pup** | Heeldog, Heelpup | CLEAR ✓ | on-nose cute; longer |

---

### C. Combinations / “at heel” compounds

| Name | Idea | Registries | Notes |
|---|---|---|---|
| **Atheel** | *at heel* fused | CLEAR ✓ | Real training phrase; ownable spelling |
| **Onheel** | on heel | CLEAR ✓ | same idea |
| **Aheel** | a-heel | CLEAR ✓ | GH org taken; still shippable CLI |
| **Byheel** | by heel | CLEAR ✓ | weaker |
| **Reheel** | call back to heel | CLEAR ✓ | re-attach agent to you |
| **Upheel** | up + heel | CLEAR ✓ | weak |
| **Heelmux** | heel × mux | CLEAR ✓ | control + multiplex |
| **Heelops** | heel × ops | CLEAR ✓ | control plane ops |
| **Corheel** | corgi × heel | CLEAR ✓ | cute combo; niche |
| **Heelpup** | heel × pup | CLEAR ✓ | soft |

---

### D. What to avoid in this family

| Name | Why |
|---|---|
| **Heel** bare | Registries + domains owned; foot clinic ear |
| **Heeler** | **heeler.com** agentic AppSec — category collision like Unleash/Fleeti |
| **Heely** | Heelys shoes — kids/rolling shoes forever |
| **Heelai** | AI-suffix trap (§7.5) |
| **Unheel** / anything *unleash*-shaped | Unleash gravity |

---

### E. Working shortlist (short + clear + on-meaning)

| Priority | Name | Why it fits your goal |
|---|---|---|
| 1 | **Heelie** | Short, cute, all registries clear, strong heel meaning, `.sh`/`.dev` likely free |
| 2 | **Heelix** | Short coined; heel + helix; registries clear; more “product” than pet |
| 3 | **Atheel** | *at heel* in one word; unique; registries clear |
| 4 | **Heelops** | Short compound; serious; clear packages |
| 5 | **Heelmux** | Control + your mux surface; clear |
| 6 | **Heels** | 5 letters; all registries clear; “at your heels” — fashion SEO tax |
| 7 | **Reheel** | Verb: bring agent back to heel / re-attach |
| 8 | **Heelr** | Minimal suffix; clear registries |

**Logo:** dog at heel beside a human silhouette — or just a heel mark + lead line. Capybara can still ride shotgun as interop mascot.

### F. How this compares to Leashie

| | **Heelie** | **Leashie** |
|---|---|---|
| Meaning | position (at my side) | tool (I hold the lead) |
| Length | 6 letters | 7 letters |
| Registries | clear | clear |
| Big adjacent | Heeler.com (different spelling) | Unleash (different spelling) |
| Ease | slightly punchier | slightly softer duckie |

Both are viable. **Heelie** is shorter; **Leashie** is softer. **Atheel** / **Heelix** if you want less pet-shop and more ownable coinage.

### Next step

If Heel is the metaphor: §8-deepen **Heelie** vs **Heelix** vs **Atheel** (domains RDAP + trademark), and explicitly **drop Heeler** because of heeler.com.

---

## 24. Screening report — Packie (§8 applied)

Screened 2026-07-29 against the rubric in §8, same method as §15–§17. Not legal advice.

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `packie` | **Taken (weak)** | `packie@0.0.1` — “a light javascript package tool for browser,” published 2019, one version, **~9 downloads last month**. Dead squat, not a Bole-scale dependency — but exact name still blocked unless you rename/negotiate/use a scope (`@you/packie`). |
| 1 | **npm near** | **Mixed** | `packy`, `packi`, `packee` taken. **`pakkie`, `paky`, `getpackie`, `@packie/cli` clear.** |
| 1 | **PyPI** `packie` | **Clear** | 404. (`packy` taken — content-provider package manager.) |
| 1 | **RubyGems** `packie` | **Clear** | 404 |
| 1 | **crates.io** `packie` | **Clear** | 404. (`packy` = archive unpacker CLI.) |
| 1 | **Homebrew** | **Clear** | formula + cask 404 |
| 1 | **Go modules** | **N/A / fine** | Bare path invalid |
| 2 | **GitHub org** `packie` | **Clear** | org 404 |
| 2 | **GitHub user** `packie` | **Taken** | Since 2010, 1 public repo — old personal squat |
| 3 | **Domains** | **Mixed** | See table |
| 4 | **Trademark 9/42** | **Caution — counsel** | No clean live USPTO “PACKIE” software hit in a quick pass; older Packy* marks abandoned/cancelled. Still check NZ/AU (live Packie logistics) and phonetic **Packy**. |
| 5 | **Adjacent product** | **Real collision** | Live **Packie** shipping/fulfil SaaS — see below. Same “pack” shelf as parcels, not agents. |

#### Domains (DNS + RDAP skim)

| Domain | Status (skim) | Read |
|---|---|---|
| `packie.com` | ParkLogic parking | Parked / aftermarket |
| `packie.app` | Registered (Cloudflare) | Taken |
| `packie.ai` | Registered (Cloudflare) | Taken |
| `packie.io` | AWS DNS present | Treat as controlled |
| `packie.co.nz` | Live A record | **NZ Packie logistics** |
| `packie.dev` | NXDOMAIN | Likely available |
| `packie.sh` | RDAP 404 + NXDOMAIN | **Likely available — on-brand** |
| `packie.so` | NXDOMAIN | Likely available |
| `packie.co` | NXDOMAIN / RDAP 404 | Likely available |
| `packie.tools` | NXDOMAIN | Likely available |
| `getpackie.com` / `usepackie.com` | NXDOMAIN | Likely available |

### Named collisions (the ones that matter)

1. **Packie (NZ) — Shopify shipping / consignments** — **main brand risk.**  
   Live logistics product: sync orders, courier labels, packing — [apps.shopify.com/packie](https://apps.shopify.com/packie), [packie.co.nz](https://www.packie.co.nz/integration-pricing). Exact spelling. Google “Packie” → parcels, not agent packs.

2. **Packy** (near-homophone) — tracking API ([packyapp.com](https://packyapp.com/tracking-api)), Packy AI travel ([packyai.com](https://packyai.com/)). Podcast/Zoom will land on Packy often.

3. **npm `packie`** — dead browser “package tool”; reinforces *package/pack* meaning, not dog pack.

4. **Dutch `pakkie`** — colloquial “parcel/package.” If you respell to Pakkie for npm clearance, you lean harder into shipping semantics (and that spelling is free on npm/PyPI).

5. **GitHub noise** — low (≈35 name hits); PackieAI hobby repos; not a category killer.

### Ergonomic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 6 letters. `packie run` fine. |
| 7 | Dotfolder `.packie/` | **Pass** | Clean. |
| 8 | Zoom spelling | **Soft fail** | Heard as **picky** or **Packy** often; must spell P-A-C-K-I-E. |
| 9 | Podcast | **Soft fail** | “Packie, like a pack of dogs, P-A-C-K…” every time. |
| 10 | Searchability | **Weak** | Exact logistics Packie + Packy travel/tracking. Dog-pack story doesn’t win SEO alone. |

### Strategic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 11 | Survive next pivot | **Pass (thin)** | “Pack of agents” stretches; “packing parcels” gravity pulls backward. |
| 12 | Buyer tone | **Cute yes / enterprise mixed** | Duckie-soft; may sound like shipping or “picky.” |
| 13 | Host a mascot | **Pass** | Dog-pack logo draws itself; capybara can still host. |

### Fit vs your brief

- Dog **pack** verb/noun (§21/§23): yes — many agents, one overseer.  
- Easy/cute: yes.  
- Meaning collision: **pack = parcel** is as strong in market as **pack = dogs**.  
- Registries: workable (dead npm; scope or `pakkie`/`getpackie` escape hatches).  
- Not a Fleeti-level exact category twin (they’re logistics, you’re agent control) — but still §8.5 adjacent enough to muddy launch.

### Verdict

**Packie is cute and mostly registry-feasible, brand-muddy.**

- **Not a hard npm fail** (unlike Bole) — squat is tiny.  
- **Not a hard exact-category fail** (unlike Fleeti telematics) — but **live Packie shipping** + **Packy** twin is enough to reject for a clean launch.  
- **Ergonomics:** picky/Packy ear-slip is real.  
- **Ship bare `Packie`?** Only if you accept always explaining “dog pack, not parcels.” Better: keep the *idea*, change the spelling/shape (**Packy** is worse; try **Packkie** no — prefer **Herdie**, **Puppack**, or a clearer dog verb like **Heelie** / **Fetchie**).

### Scorecard vs prior screens

| | **Yima** | **Bole** | **Fleeti** | **Packie** |
|---|---|---|---|---|
| npm exact | Clear | Hard fail | Clear | Weak take (dead) |
| Live same-name product | No | No | Yes (fleet SaaS) | Yes (shipping SaaS) |
| Ear / podcast | 姨妈 risk | boleto / logger | Fleetio | picky / Packy |
| Metaphor fit | Strong | Strong | Weak | OK (dog pack) |
| Bare name ship? | Risky | No | No | **Discouraged** |

**Rubric scorecard (informal):** Hard checks ~3/5 (npm weak fail, adjacent fail, domains mixed; GH org + most registries OK). Ergonomics 2/5. Strategic 2/3.

**Recommendation:** do **not** lock on bare **Packie**. If the pack metaphor is the one you love, §8-screen escapes next: **`getpackie`** (npm clear), **`pakkie`** (clear but Dutch “parcel”), or drop to **Herdie** / **Puppack** / **Heelie** for cleaner meaning.

---

## 25. Screening report — Woofy (§8 applied)

Screened 2026-07-29 against the rubric in §8, same method as §15–§17 / §24. Not legal advice.

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `woofy` | **Taken (weak)** | `woofy@0.0.1` — leftover create-svelte stub (~6 downloads/mo). Not a Bole-scale block. |
| 1 | **npm near** | **Mixed** | `woof` taken (“CLI apps as easy as fetch” 🐶). **`woofie`, `woofi`, `getwoofy`, `@woofy/cli` clear.** Notable: **`claude-woofy`** — screen puppy that barks when Claude Code finishes — *same buyer neighborhood*. |
| 1 | **PyPI** `woofy` | **Taken** | Unofficial Dog API wrapper ([elaresai/woofy](https://github.com/elaresai/woofy)). |
| 1 | **RubyGems** `woofy` | **Clear** | 404 |
| 1 | **crates.io** `woofy` | **Clear** | 404 |
| 1 | **Homebrew** | **Clear** | formula + cask 404 |
| 1 | **Go modules** | **N/A / fine** | Bare path invalid |
| 2 | **GitHub org** `woofy` | **Clear** | org 404 |
| 2 | **GitHub user** `woofy` | **Taken** | Since 2014, 1 repo |
| 3 | **Domains** | **Hostile on primaries** | See table |
| 4 | **Trademark 9/42** | **Hard caution** | Live **WOOFY** marks: Woofy Inc. (HelloWoofy social/AI marketing; SEC Form C notes trademarks); separate registered WOOFY SaaS (network/backup/scheduling, *excluding* social). Counsel required — this is not empty. |
| 5 | **Adjacent product** | **Hard fail** | Live AI SaaS brand **Woofy / HelloWoofy / Woofy.ai** — see below. |

#### Domains (DNS + RDAP skim)

| Domain | Status (skim) | Read |
|---|---|---|
| `woofy.com` | Registered | Taken |
| `woofy.ai` | Registered | **HelloWoofy / Woofy.ai brand** |
| `woofy.dev` | Registered (Cloudflare) | Taken |
| `woofy.app` | Afternic | Broker / aftermarket |
| `woofy.io` | Cloudflare NS | Treat as controlled |
| `woofy.co` | Cloudflare NS | Taken / controlled |
| `getwoofy.com` | Google Domains NS | Taken |
| `woofy.sh` | RDAP 404 + NXDOMAIN | **Likely available** |
| `woofy.so` | NXDOMAIN | Likely available |
| `woofy.tools` | NXDOMAIN | Likely available |
| `usewoofy.com` / `withwoofy.com` | NXDOMAIN | Likely available |

### Named collisions (the ones that matter)

1. **HelloWoofy / Woofy.ai (Woofy Inc.)** — **ship-blocker.**  
   Live AI social-media management SaaS (scheduling, content AI, analytics). Listed on GetApp as **Woofy**, site [hellowoofy.com](https://hellowoofy.com/), crowdfunding history, **WOOFY** trademark activity. Google “Woofy” → marketing AI dog, not agent fleet.

2. **Other WOOFY SaaS trademark** (network management / backups / scheduling, not social) — second registrant in the same wordmark space.

3. **`claude-woofy` (npm)** — cute Claude Code status puppy. Tiny package, but proves the *name + coding agents* association is already a joke product in your exact market.

4. **Yearn `woofy` / crypto residue** — DeFi side noise in GitHub search.

5. **Puppy Linux builder named woofy** — niche, not decisive.

### Ergonomic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 5 letters. `woofy run` excellent. |
| 7 | Dotfolder `.woofy/` | **Pass** | Clean and cute. |
| 8 | Zoom spelling | **Pass** | W-O-O-F-Y; unmistakable. |
| 9 | Podcast | **Pass as sound / fail as brand** | Easy to say; hearers may think HelloWoofy. |
| 10 | Searchability | **Fail** | Owned by social-AI Woofy + pet/crypto noise. |

### Strategic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 11 | Survive next pivot | **Weak** | “Woof” = alert/cute dog only; thin for orchestration control plane. |
| 12 | Buyer tone | **Too toy for some enterprise; fine for solo** | Peak duckie — and already used by another AI product. |
| 13 | Host a mascot | **Pass** | Dog face *is* the name. |

### Verdict

**Woofy is easy and memorable — and already someone else’s AI dog.**

- **Cute/ease:** excellent (better than Packie on Zoom).  
- **Registries:** weak npm/PyPI takes; Ruby/crates/brew clear; org free.  
- **Brand:** **No** — live Woofy.ai / HelloWoofy + WOOFY marks. Same failure mode as Fleeti (exact live SaaS), in an *AI* category even closer to you.  
- **Coding-agent adjacency:** `claude-woofy` is a warning flare, not a green light.

### Scorecard vs prior screens

| | **Packie** | **Woofy** | **Fleeti** |
|---|---|---|---|
| Ease / cute | Good | **Excellent** | OK |
| npm | Dead squat | Dead squat | Clear |
| Live same-name SaaS | Shipping | **AI social (Woofy.ai)** | Vehicle fleet |
| Trademark heat | Mild | **Hot** | Caution |
| Bare name ship? | Discouraged | **No** | No |

**Rubric scorecard (informal):** Hard checks fail on §8.5 + §8.4 despite soft registries. Ergonomics 4/5. Strategic 1/3.

**Recommendation:** drop bare **Woofy**. Keep woof/dog energy via a freer shape (**Woofie**, **Fetchie**, **Labby**, **Heelie**) and §8 those — `woofie` was clear on npm/PyPI in this pass. Do not fight HelloWoofy for “the AI dog named Woofy.”

---

## 29. Post-LLM / agent era lexicon (and drop Reheel)

**Reheel dropped (2026-07-29).** Default association is shoes / Heelys / “re-heel,” not dog heel. Keep **Heelie** / **Heelix** / **Atheel** if we stay on the heel metaphor.

### What “new words” actually are

Most “new” AI product language is **old English with a new job**, not coinages. A few true neologisms stuck. For naming:

| Kind | Examples | Product-name quality |
|---|---|---|
| **True-ish neologisms** | chatbot, LLM (acronym), GenAI, RAG, MCP | Often ugly as product names; great as category labels |
| **Repurposed technical** | prompt, token, embedding, context window, temperature | Overloaded; bare words usually taken |
| **Repurposed systems** | harness, runtime, orchestration, pipeline, workflow | Same |
| **Agent-stack jargon** | tool call, function calling, agent loop, handoff, subagent, swarm, skills, memory, guardrails | Great **copy**, weak **bare brand** |
| **Product-shaped coins** | Greptile, Cursor, Devin, LangChain, AutoGPT | Ownable; fusion / soft coinage wins |

### High-signal post-ChatGPT / agent vocabulary

**Model / text surface**

| Word | Role | Name note |
|---|---|---|
| **prompt** / prompt engineering | instruction to the model | era-defining; dead as bare brand |
| **completion** / generation | model output | generic |
| **token** | billing + context unit | finance collision |
| **context window** / context | what the model “sees” | too long / generic |
| **system prompt** | sticky instructions | compound |
| **temperature** / sampling | randomness knobs | science collision |
| **hallucination** | confident wrong output | negative valence |
| **embedding** / vector / RAG | retrieval stack | infra noise |
| **fine-tune** / LoRA | adaptation | too technical |
| **multimodal** | text+image+… | marketing sludge |

**Agent / tool surface**

| Word | Role | Name note |
|---|---|---|
| **agent** / AI agent | LLM + tools + loop | category word; bare taken everywhere |
| **tool call** / function calling | model invokes APIs | compound |
| **agent loop** / ReAct | perceive → act → observe | process, not brand |
| **harness** | scaffolding around the model (evals, tools, sandbox, retries) | *the* 2024–26 systems word; npm `harness` taken; soft **Harnessie** weak |
| **runtime** | where the agent runs | overloaded with every language runtime |
| **orchestration** | multi-step / multi-agent control | enterprise sludge; you *do* this |
| **workflow** / pipeline / DAG | structured runs | taken |
| **handoff** | pass work agent→agent or human | **your feature**; bare `handoff` taken; soft **Handie** muddy |
| **subagent** / nested agent | child run | compound |
| **swarm** / multi-agent | many agents | Sci-fi / crypto noise |
| **crew** | team of agents (CrewAI sense) | nautical-cute; check CrewAI gravity |
| **skills** / skill packs | reusable agent capabilities (Cursor-shaped) | clear meaning; bare taken |
| **memory** / long-term memory | cross-session state | generic |
| **guardrails** / safety layer | policy / filters | enterprise |
| **eval** / evals / eval harness | measuring agent quality | category, not product |
| **sandbox** / computer use | isolated execution | security collision |
| **MCP** | Model Context Protocol | acronym brand risk |
| **A2A** | agent-to-agent protocols | acronym |
| **copilot** | sidekick framing | Microsoft gravity |
| **autonomous** / autopilot | less HITL | overclaim risk for you |
| **human-in-the-loop** / HITL | your Centaur thesis | phrase, not name |
| **playground** | interactive try-it UI | taken |
| **studio** | builder UI | taken |
| **canvas** | spatial workspace (you have one) | feature word; Cursor Canvas gravity |
| **board** | your persisted canvas unit | feature word |
| **fork** | branch a run / session | git gravity; you use it |
| **session** / thread / chat | conversation unit | generic |
| **transcript** | full dialogue log | your handoff packet piece |
| **brief** / packet | structured handoff artifact | your vocabulary |
| **redact** | scrub secrets before handoff | verb feature |
| **vendor** / multi-vendor | Claude vs Codex vs … | your differentiator; ugly as brand |
| **interop** / adapter | cross-tool glue | engineering copy |

**Infrastructure / product pattern words that rode the wave**

| Word | Note |
|---|---|
| **inference** | serving models |
| **gateway** / proxy | routing to models |
| **router** / model router | pick which model |
| **observability** / tracing | LangSmith-shaped |
| **cost** / spend / token burn | ops anxiety |
| **latency** | ops anxiety |
| **compaction** / summarization | shrink context |
| **scratchpad** | intermediate reasoning store |
| **plan** / planner / executor | classical agent pattern |
| **critic** / reviewer agent | multi-agent role |
| **persona** / role | system-prompt cosplay |

### Soft / fusion forms from the era lexicon (skimmed)

| Soft form | Source word | Registries (skim) | Vibe |
|---|---|---|---|
| **Harnessie** | harness | likely clear-ish | duckie + jargon — cute but try-hard |
| **Handie** | handoff | muddy (handy) | weak |
| **Skillie** | skills | check | soft capability |
| **Loopie** | agent loop | check | process-cute |
| **Swarmie** | swarm | check | insect/crypto risk |
| **Evalie** | evals | check | too niche |
| **Prompty** | prompt | often taken / toy | Promptfoo gravity |
| **Tokie** | token | finance/cute clash | weak |
| **Guardie** | guardrails | check | security-cute |
| **Sandie** | sandbox | name collision | weak |
| **Crewie** | crew | CrewAI shadow | careful |
| **Planx** / **Loopx** | plan / loop | coin | sharper |

**Skim takeaway:** era bare words (`harness`, `handoff`, `skills`, `prompt`, `agent`, `canvas`) are mostly **registry-taken or category-owned**. Soft forms clear more often but can feel like jargon + duckie glued together. Older metaphors (**heel**, **leash**, **remuda**, **ferry**) still clear the registry bar more cleanly than “Harnessie.”

### How this should steer naming

1. Use era words in **tagline and docs** (“multi-vendor agent harness,” “handoff packet,” “board orchestration”).
2. Prefer a **non-era** product name that *hosts* those words (Heelie = control; Remuda = pool; Ferrie = handoff).
3. If you insist on era DNA in the name, fuse hard (Greptile-style): **Heelix**, **Atheel**, **Loopmux**-class — not bare **Harness**.

### Updated shortlist after Reheel drop

| Name | Lane | Status |
|---|---|---|
| **Heelie** | dog heel / control | keep — lead soft |
| **Leashie** | control plane | keep |
| **Heelix** / **Atheel** | heel coinage | keep — less shoe/pet |
| **Remuda** | agent pool | keep — non-era, ownable |
| **Steerie** / **Tetherie** | control | keep |
| **Ferrie** | handoff | keep |
| **Reheel** | — | **dropped** (shoes) |
| **Heeler** | — | **dropped** (heeler.com) |
| Era softs (Harnessie…) | jargon+duckie | optional spice only |

### Next step

§8-deepen **Heelie** vs **Heelix** vs **Atheel** — or pick control (**Heelie/Leashie**) vs pool (**Remuda**) first, then deepen that lane.

---

## 30. Microsoft-style growth names + harness lane

**Ask (2026-07-29):** Prefer Microsoft-shaped names — easy to grow bigger — and want to leverage popular era words like **harness**, searching outward from there.

### What “Microsoft-easy-to-grow” means

Not “sounds corporate.” Means an **umbrella metaphor** that is not locked to one feature:

| Microsoft name | Metaphor | Why it grew |
|---|---|---|
| **Azure** | color / sky | empty enough for all cloud |
| **Office** | place | whole productivity suite |
| **Teams** | people unit | collab umbrella |
| **Copilot** | role beside you | every surface (GitHub, 365, Security…) |
| **Fabric** | material / weave | data platform sprawl |
| **Arc** | shape / bridge | hybrid management |
| **Loop** | cycle / canvas | collab components |
| **Edge** | boundary | browser + more |

**Recipe:** short · sayable · not a feature noun · can host a family later (`X Boards`, `X Cloud`, `X for teams`).

**Anti-recipe for you:** FleetLog-shaped (feature+log), bare Orchestrator, bare Harness.

### Harness: use in copy, not as the brand

**Bare Harness is a hard no.** [Harness.io](https://harness.io) is a large CI/CD / software-delivery company; they already ship **Harness AI** and DevOps agents. Registries taken. Category phrase “agent harness” is useful in docs/taglines (“the multi-vendor agent harness”) but fighting Harness.io for the noun is Fleeti/Woofy-class failure.

Same pattern as Microsoft: they say “copilot” as a *role* everywhere; the *product umbrella* can still be Azure / 365 / Fabric.

### Search outward from “harness” (gear around the engine)

Harness = the scaffolding that holds power in place. Adjacent word families:

| Family | Words | Grow potential |
|---|---|---|
| **Horse gear** | tack, bridle, rein, cinch, girth, saddle, stirrup, yoke | control without micromanage; western fits fleet |
| **Rig / setup** | rig, kit, gear, tackle, chassis, cradle, scaffold | “the agent rig” — engineer-native |
| **Weave** | loom, warp, weft, fabric*, mesh | Fabric/Loop already MSFT-owned territory — careful |
| **Berth / place** | bay, dock*, deck, pad, berth, yard, field, range | place-names grow like Office |
| **Bounds** | rail, rails*, guardrail, governor | light-touch control |
| **Clipped harness** | harni, arness, arnex | Azure-style invented — empty, expandable |

\*heavy gravity: Fabric (Microsoft), Dock (Docker), Rails (Ruby), Loop/Arc/Fabric (Microsoft).

### Registry skim (2026-07-29) — bare era/gear words mostly taken

Almost all bare nouns (`harness`, `rig`, `tack`, `loom`, `warp`, `helm`, `deck`, `cinch`, `rein`…) are **npm+PyPI taken**. Soft / clipped forms clear more often:

| Candidate | npm / PyPI | Microsoft-grow read | Note |
|---|---|---|---|
| **Harni** | clear / clear | High — invented, short, empty | harness DNA without Harness.io |
| **Arness** | clear / clear | High — same clip, slightly longer | teach “from harness” once |
| **Arnex** | clear / clear | High — sharper coin | less obvious etymology |
| **Riata** | clear / clear | Medium — western rope | ownable; niche teach |
| **Warpie** | clear / clear | Medium — soft weave | duckie + era |
| **Warpa** / **Warpix** | clear / clear | Medium–High | less pet-shop than Warpie |
| **Loomie** | clear / clear | Medium | Loom.com video gravity on root |
| **Tackie** | clear / clear | Medium | horse tack = harness gear |
| **Cinchie** | clear / clear | Medium | “it’s a cinch” + saddle cinch; bare **Cinch** = live CDP (cinch.io) |
| **Railer** | clear / clear | Medium–High | rails/guardrails; utility tone |
| **Deckie** | clear / clear | Medium | control deck → platform |
| **Riggie** / **Rigmux** | clear / clear | Medium | agent rig |
| **Gearx** / **Fieldx** / **Padx** / **Bayx** / **Deckx** | clear / clear | Medium | short + x; a bit 2010s |
| **Steerie** | clear / clear | Medium | light-touch helm |
| Bare **Cinch** / **Harness** / **Loom** / **Warp** | taken + live brands | — | drop bare |

### Recommended strategy

1. **Tagline / category:** keep popular words — *agent harness*, *orchestration*, *handoff*, *multi-vendor*.
2. **Product umbrella:** Microsoft-short empty name that can grow (prefer **Harni** / **Arness** / **Arnex**, or weave/place softs **Warpa**, **Railer**, **Deckie**).
3. **Do not** ship bare Harness, Cinch, Loom, Fabric, Arc, Loop, Dock, Rails.

### Working shortlist in this lane

| Name | Why it fits this ask |
|---|---|
| **Harni** | harness DNA, Azure-empty, registries clear, grows (`Harni Boards`) |
| **Arness** | clearer “harness” echo, still ownable |
| **Arnex** | sharper invented; less teachable |
| **Warpa** / **Warpix** | weave/orchestration metaphor; soft MSFT-Fabric cousin without collision |
| **Railer** | guardrails + lazy-efficient bounds |
| **Tackie** | harness-gear literal; softer brand |
| **Riata** | short western control line; both registries clear |
| **Heelie** / **Remuda** | still valid; less “era word,” more metaphor |

### Next step

Pick invent-from-harness (**Harni/Arness**) vs metaphor-from-harness-gear (**Tackie/Riata/Cinchie**) vs weave (**Warpa**) — then §8-deepen that pair (domains + trademark + podcast test).

---

## 31. Five-way blend cut — relax × coding agent × harness × multi-agent × capybara

_Brief: a few names blending all five ingredients. Short, combined words, meaning delivered without a
paragraph of explanation. Twenty options, fresh (deliberately avoiding names already screened in
§11–§30). None are registry-checked yet — run §8 on the finalists._

### A. Fusions that carry three or more meanings at once

These are the ones worth taking seriously. Each is a real word or real term whose existing meanings
already say *harness*, *calm*, and *many* without you having to teach it.

| Name | Blend | Why it lands | Watch out |
|---|---|---|---|
| **Hammock** | relax + harness | A hammock *is* a harness that suspends and holds you — and it is the universal icon of calm. Bonus: "hammock-driven development" is a known idea among senior devs (Rich Hickey), so the audience already reads it as *thinking time*, not laziness | 7 letters; furniture associations |
| **Slackrein** | relax + harness + control | *Slack rein* / *loose rein* is the horsemanship term for guiding with the lightest possible hand. That is your control-plane thesis stated in two syllables: the harness is on, the hand is light | 9 letters — clip to **Slakrein** or run it as two words |
| **Trace** | coding agent + harness | In harness terminology the **traces** are the straps that connect the animals to the load. In systems, traces are how you see what happened. Same word, both halves of the product | Crowded in observability (OpenTelemetry); may read as a feature not a brand |
| **Whiffle** | multi-agent + harness | From *whiffletree* — the pivoting bar that **balances the pull across several harnessed animals**. A pre-existing word for multi-agent load balancing. Playful mouthfeel | Obscure; needs the one-line story |
| **Nice** | relax + coding agent | `nice` is the Unix command for running work at low priority — literally "be relaxed about it" — and it reads as friendly | SEO is brutal; NICE Ltd exists. Consider **Renice** (re-prioritize a *running* process = steering agents mid-flight) |

### B. Capybara, gem-safe

The literal word is blocked by the Ruby gem (§4.2). These keep the animal without the collision.

| Name | Blend | Why it lands | Watch out |
|---|---|---|---|
| **Ronso** | capybara | From *ronsoco*, Peruvian for capybara. 5 letters, clean, already sounds like a shipped product | Meaning is invisible without the story |
| **Carpie** | capybara + cute | From *carpincho*, the Río de la Plata name. Keeps the Spanish thread and the `-ie` softness | Reads a little like "carp" |
| **Cappie** | capybara + cute | Closest to the animal while clearing the gem, and it matches the `-ie` energy you liked in Packie / Leashie / Woofy | "cap" has slang baggage |
| **Baskie** / **Bask** | capybara + relax + observability | Basking is what a capybara actually does: still, warm, and watching everything at once. That is your product's posture | Bare **Bask** is short but generic |
| **Wallo** | capybara + relax | From *wallow*, the capybara's real relaxing verb, softened past the negative idiom | Faint echo of "wallow in" |

### C. Multi-agent herd, taken easy

| Name | Blend | Why it lands | Watch out |
|---|---|---|---|
| **Grazie** | multi-agent + relax + warmth | A grazing herd, and *grazie* — thank you. Warm and unhurried in six letters | Pronunciation forks (GRAT-see-eh / GRAY-zee) |
| **Herdle** | multi-agent + relax | Herd + amble. Says "several agents, unhurried" with no explanation needed | Wordle-era `-le` echo |
| **Muxie** | multi-agent + coding agent | `mux` — multiplexing many sessions into one surface is *literally* what the app does — plus a soft tail. 5 letters | Only devs decode the root |
| **Loafer** | capybara + relax | Capybaras are famously "loafs"; a loafer is unbothered. Real word, instantly legible | Shoes; and "loafer" can read as lazy rather than calm |
| **Podle** | multi-agent + cute | Pod plus a soft tail. Short, friendly, herd-shaped | Generic; pod is well-worn |

### D. Harness + calm, blunt and clear

For when you would rather deliver the meaning than be clever about it.

| Name | Blend | Why it lands | Watch out |
|---|---|---|---|
| **Calmrig** | relax + harness | Calm + rig (the harness). Zero explanation required | Compound reads as two words |
| **Softrein** | relax + harness + control | Gentle control, stated plainly. Sibling to Slackrein | 8 letters |
| **Cradle** | harness + care | Holds the fleet gently; the harness framing without the horse | Cradlepoint; "cradle to grave" |
| **Nohup** | relax + coding agent | `nohup` = keeps running after you walk away. The most relaxed command in Unix, and devs know it cold | Pronunciation; very generic as a command |
| **Sling** | harness + relax | A sling carries a load, and you *sling* a hammock | "Sling" also means throw |

### If I had to cut to five

1. **Hammock** — the only option that lands relax *and* harness in one real word, and the dev audience
   already has a positive association for it. Warmest brand, easiest mascot pairing with a capybara.
2. **Slackrein** — the most accurate name in this entire document for what the product actually
   promises: full harness, lightest possible hand. Length is the only real objection.
3. **Whiffle** — best pure multi-agent meaning, and the etymology is a genuinely good story to tell
   once.
4. **Ronso** — best of the capybara-safe set: short, brandable, no collision, no baggage.
5. **Muxie** — best short technical option; `mux` is the truest one-word description of the app.

**Pairing note.** These combine well with the §4.3 conclusion: any of the five can carry a capybara
mascot without competing with it. **Hammock + a capybara in the hammock** is the single strongest
name-and-mascot pair available — it delivers relax, harness, and the animal in one image, and it does
not require the word "capybara" anywhere near a package registry.

---

## 32. Register shift — confident infrastructure names (§31 rejected wholesale)

_§31 was rejected entirely. Reading the miss: it leaned cute (`-ie` tails), compound (Calmrig,
Softrein read as two words), or joke-etymology (Whiffle, Slackrein need a paragraph). But the names
originally cited as good — Tableau, Temporal, Repsan — are none of those. They are **single, elegant,
confident, non-diminutive**. This cut moves to that register: one word, two syllables where possible,
no animal, no cuteness, meaning delivered on contact._

Same semantic targets — relax, harness, multi-agent — reached through **horse gaits, harness gear,
and calm-water geography** instead of portmanteaus.

### The ten

| Name | Meaning | Why it works here | Watch out |
|---|---|---|---|
| **Tandem** | Animals harnessed one behind another to pull one load | Multi-agent *and* harness in a word every English speaker already owns. Zero teaching cost. "Running in tandem" is already how people describe your product | Common word; Tandem Diabetes holds mindshare |
| **Span** | A *span* is a matched pair harnessed together — also a tracing span, also reach | Four letters, three true meanings, and one of them is already systems vocabulary | Very common; SEO tax |
| **Canter** | The horse's sustainable cruising gait — from the "Canterbury pace," the easy speed pilgrims rode | The exact tone: not sprinting, not idle, a pace you can hold all day. Elegant, spellable, confident | Faint "can't" prefix |
| **Amble** | A gait bred specifically for unhurried comfort over distance | The purest available word for *relaxed forward progress*. Calm without being passive | Could read as slow |
| **Drover** | One who moves a herd without doing the walking | Your persona as a noun — the chief-of-staff framing from the shipped prompts. Multi-agent, human-in-charge, no cuteness | Slightly archaic |
| **Latigo** | The leather strap that cinches a saddle | Pure harness. Three syllables, already sounds like a shipped product, feels unclaimed | *Látigo* also means whip in Spanish — check that this reads as tack, not punishment |
| **Halyard** | The line that raises a sail | Rigging vocabulary, fleet-adjacent, confident mouthfeel, no diminutive | Nautical drifts away from the horse/capybara threads |
| **Estero** | Spanish for estuary or marsh — calm water where many flows converge | Delivers multi-agent confluence, relax, and the capybara's actual habitat with no animal in the name and no joke to explain | Meaning invisible to non-Spanish speakers |
| **Llano** | The Llanos are the wetlands holding the world's largest capybara populations | A real place, elegantly short, and the most direct capybara reference available without touching the gem | "YAH-no" gets mangled by English speakers |
| **Swale** | A low moist hollow that slows water down and lets it settle | Calm, capybara-adjacent terrain, ownable, and it sounds like infrastructure rather than a pet | Obscure; needs one line of story |

### Read on this cut

- **Tandem** and **Span** are the two that need zero explanation and still say *multiple things
  harnessed to one job*. If the objection to earlier cuts was "too clever," these are the answer.
- **Canter** and **Amble** are the two that carry *relaxed* without carrying *lazy* — a distinction
  every cute option in §31 failed.
- **Estero**, **Llano**, **Swale** are a lane not previously offered: capybara habitat rather than
  capybara. They keep the animal's world and its calm without the word or the mascot competing for
  attention.
- **Drover** is the only one that names the *user* rather than the system. Worth considering
  separately — products named for their operator (Copilot, Cursor, Sentry) tend to age well.

### If the register is still wrong

The three unexplored directions, in case this cut also misses:

1. **Pure abstract coinage** — Vercel/Repsan territory: no meaning, total ownability, four to six
   letters, invented from scratch. Fast to screen because nothing collides.
2. **Two-syllable Latin/Greek roots** — the Temporal play, taken further: bare concept nouns that
   claim the category rather than describe the mechanism.
3. **Deliberately plain English** — Linear, Render, Sentry, Notion. One ordinary word used with
   total confidence, no metaphor at all.

---

## 33. Figma / Brex formula × the memory brief

_New and much sharper brief: combine words around **coding agent · harness · logs · resume ·
knowledge · the conversation and decision history with the agent**. Reference names: **Figma**,
**Brex** (plus Tableau, Temporal, Greptile, Repsan)._

### 33.1 The brief is better than the earlier ones

"Relax" and "capybara" described a *feeling*. This brief describes the **actual product**: the
durable record of what agents said, did, and decided — which you can re-enter. The codebase audit
already said the same thing: FleetLog does not own the agent, it reads and derives meaning from
vendors' rollout logs, and its most defensible asset is portable context. **Name the memory, not the
mood.**

And one word in the brief is already doing double duty for free:

> **Résumé** means both *to take up again* and *the document recording your history.*

Both meanings are exactly this product. Any name built on that root inherits both at once.

### 33.2 Decoding Figma and Brex

Both are the same move: **take a meaningful root, clip it hard, add a punchy tail, land at 4–6
letters.**

- **Figma** ← *figure* + `-ma`. Soft vowel tail, two syllables, invented but instantly pronounceable.
- **Brex** ← *Brazil* + `-ex`. Hard consonant tail, one syllable, punchy.

So the generator is: **`[root from the brief] → clip → + {-a, -ma, -o, -ia, -ex, -ux, -is}`**.
Outsiders read it as a coined name; insiders can be told the etymology once and it sticks. That is
exactly the Greptile trick applied to Latin and Greek roots instead of Unix commands.

### 33.3 Root bank (the raw material for this brief)

| Concept from the brief | Roots worth clipping |
|---|---|
| log / record | `log`, **`logia`** (Gk. *a collection of recorded sayings*), `logos` (account, reasoning), `ledger`, `annals` |
| resume | `resume`, **`sumere`** (L. *to take up*), `summa` (the compiled whole), `reprise` |
| knowledge | `lore`, `ken`, `gnosis`, **`mneme`** (memory), `nous` (mind), `corpus` (body of collected text) |
| decision history | **`minutes`** (the formal record of what was decided), `acta` (L. *things done*), `gesta` (deeds recorded), `ratio` (reckoning), `crux` |
| annotation / accumulated context | **`glossa`** (marginal explanation), `scholia`, `marginalia`, `colophon` (the production record at a book's end), `palimpsest` |
| harness | `latigo`, `rig`, `tack`, **`quipu`** (Andean knotted-cord record) |
| agent action | `act`, `exec`, `fork`, `trace`, `span` |

### 33.4 The ten

| Name | Root → clip | What it means | Shape |
|---|---|---|---|
| **Logia** | Gk. *logia* — a collection of recorded sayings | The most etymologically exact word available for *an agent transcript*. Contains `log`, means "the compiled record of what was said" | 5, Figma family |
| **Acta** | L. *acta* — "the things done," official recorded proceedings | Decision history in four letters, and it contains `act`. Confident, ancient, unclaimed-feeling | 4 |
| **Summa** | L. *sumere* → *summa*, the compiled complete account | Shares its root with **resume**, and means the whole knowledge compiled into one work. Resume + knowledge in one word | 5, Figma family |
| **Resma** | *resume* → clip + `-ma` | Figma's exact shape applied to the brief's best root. Also Spanish for a *ream* — a stack of records | 5, Figma family |
| **Logma** | *log* + `-ma` | The bluntest Figma-shaped derivation from `log`. Reads as invented, decodes in one syllable | 5, Figma family |
| **Minux** | *minutes* + `-ux` | Meeting **minutes** are the formal record of decisions; `-ux` lands it in Unix. Decision history × terminal, fused | 5, Brex family |
| **Gesta** | L. *gesta* — deeds performed and recorded | Sibling to Acta with more forward motion. "What the agents did, written down" | 5, Figma family |
| **Glossa** | Gk. *glossa* — the marginal explanation; root of *glossary* | Accumulated annotation layered onto a text — which is what a long agent session actually is | 6, Figma family |
| **Dossa** | *dossier* → clip + `-a` | The accumulated file on a subject. Warm mouthfeel, obvious once said | 5, Figma family |
| **Quipu** | Quechua *quipu* — the Andean knotted-cord record | Many strands, physically knotted, holding an accounting. Harness + logs + multi-agent in one object — and it is South American, same region as the *carpincho* | 5 |

### 33.5 Read on the ten

- **Logia** and **Acta** are the two strongest. Both are real historical words for *the written record
  of what was said and done*, both are short, both sound like confident infrastructure, and neither
  needs more than one sentence of story.
- **Summa** and **Resma** are the two that carry the *resume* double meaning — continue-and-record —
  which is the single most product-true idea in this brief.
- **Minux** is the only one that fuses the two halves you keep circling: a decision-record root plus a
  Unix tail. Closest thing here to Greptile's move.
- **Quipu** is the most interesting object and the riskiest word. Worth keeping on the list purely
  because it is a *physical multi-strand ledger* — the best concrete image anyone has produced for
  "many agents, one accumulated record."
- Held in reserve as roots rather than finalists: **Corpus**, **Verba**, **Annex**, **Crux**,
  **Reprise**, **Lore**, **Ken**, **Colophon**.

### 33.6 If you want more in this lane

The generator is now explicit, so this is cheap to extend: pick any root from §33.3, clip to one or
two syllables, and try each tail — `-a`, `-ma`, `-ia`, `-o`, `-ex`, `-ux`, `-is`. The ones that
survive are the ones where **the clip is still legible** (Logma → log; Resma → resume) or where **the
whole word is already a real historical term** (Logia, Acta, Gesta, Glossa, Quipu). Anything that is
legible on neither axis is just noise with a nice ending.

---

## 34. Pronunciation gate — §33 audited, and replacements that pass by construction

_Applying a pronunciation test to §33. Four of the ten fail, including the one ranked first. Recorded
honestly, with the failure mode named, so the same traps are not re-proposed later._

### 34.1 The test

A product name is said aloud far more than it is read: on calls, in podcasts, by a salesperson to a
prospect, by one engineer to another. Five gates:

1. **Sight-read** — does a US English speaker say it correctly on first encounter?
2. **Round-trip** — hear it → spell it, and spell it → say it, both without help.
3. **Variant count** — how many plausible pronunciations exist? More than one is a tax; more than two
   is disqualifying.
4. **Bad audio** — does it survive a poor connection? Stops (`k t p d b`) and `s`/`f` survive; soft
   consonants and diphthongs do not.
5. **Adjacency** — does it rhyme with, or open with, something unfortunate?

### 34.2 Design rules that fall out

These are the transferable part — apply them to any future candidate before falling in love:

- **Never put `g` before `e`, `i`, or `y`.** English has no rule for hard vs soft; you get both
  forever. This alone kills *Logia* and *Gesta*.
- **Avoid `-ia` endings.** They create two-vs-three syllable ambiguity *and* unstable stress.
- **Check what it rhymes with before checking what it means.** A name that sounds like *minus*,
  *jester*, or *anal* cannot be rescued by a good etymology.
- **No silent letters.** Silent `g` (gnosis) or `m` (mnema) breaks the round-trip permanently.
- **Prefer one vowel value per vowel letter** — `a`="ah", `o`="oh". Double consonants that change
  vowel length (*Summa*: SUM-ah or SOO-mah) introduce a needless fork.
- **Two syllables, stress on the first.** Figma, Brex, Datadog, Tableau, Stripe — all front-stressed.

### 34.3 The §33 ten, audited

| Name | Said | Verdict | Failure mode |
|---|---|---|---|
| **Acta** | AK-tah | **Pass — cleanest of the ten** | None. Hard stops, one reading, identical across languages |
| **Logma** | LOG-mah | **Pass** | `g` is hard because a consonant follows. Rhymes with *dogma* — mild |
| **Glossa** | GLOSS-ah | **Pass** | Clean. *Glossa* is also the anatomical word for tongue — mild |
| **Dossa** | DOSS-ah | **Pass (US)** | UK/AU: *doss* = sleep rough, *dosser* = layabout |
| **Suma** *(was Summa)* | SOO-mah | **Wobble → fixed** | **Summa** forks (SUM-ah / SOO-mah). Dropping one `m` removes the fork and keeps the *resume* root |
| **Resma** | REZ-mah | **Wobble** | Pronounces fine; the problem is visual — it reads as a *misspelling* of "resume" |
| **Logia** | LOH-jah / LOH-jee-ah / LOG-ee-ah | **Fail** | Three readings. `g`-before-`i` ambiguity stacked on `-ia` syllable ambiguity. The worst possible combination — and it was my top pick |
| **Minux** | MY-nux / MIN-ux | **Fail** | *Linux* pulls one way, *minus* the other. And MY-nux **is** "minus" — a product that sounds like subtraction |
| **Gesta** | JES-tah / GES-tah | **Fail** | Soft-`g` default makes it *jester* |
| **Quipu** | KEE-poo | **Fail** | Nobody sight-reads it, and the correct pronunciation ends in "poo" |

### 34.4 Traps to not re-propose

Same root bank, ruled out on sound rather than meaning. Worth recording because several are otherwise
excellent:

| Candidate | Why it dies |
|---|---|
| **Dicta** | Perfect meaning (*things said*, and *obiter dicta* is the legal term for recorded remarks). Opens with "dick-" |
| **Annals / Annal** | The literal word for a chronological record. Homophone of *anal* |
| **Lorem** | *Lorem ipsum* means placeholder gibberish — the opposite of durable knowledge |
| **Gnosis / Mnema** | Silent leading consonant; round-trip impossible |
| **Nous** | NOOS collides with *noose* |
| **Ratio** | RAY-shee-oh vs RAH-tee-oh |
| **Archiva** | ar-KYE-vah vs ar-KEE-vah |

### 34.5 Ten that pass by construction

Same brief — logs, resume, knowledge, conversation and decision history — filtered through §34.2
before being written down.

| Name | Said | Meaning | Note |
|---|---|---|---|
| **Acta** | AK-tah | L. *the things done* — official recorded proceedings | Carried over. Best score on both meaning and sound |
| **Actum** | AK-tum | Singular of *acta*: the single recorded deed | Slightly more substantial than Acta; same clean sound |
| **Verba** | VER-bah | L. *the words* — the spoken record | Clean stops, one reading, on-brief for "conversation history" |
| **Suma** | SOO-mah | The compiled total; shares the root of **resume** | Keeps §33's best idea, drops Summa's fork |
| **Scripta** | SKRIP-tah | L. *the written things* | Front stress, hard cluster, survives bad audio well |
| **Memra** | MEM-rah | From *memoria* — decodes as memory instantly | Invented-feeling but unambiguous |
| **Nota** | NOH-tah | *The noted thing*; from *nota bene* | Very clean; risk is blandness and Notion adjacency |
| **Stela** | STEE-lah | An inscribed stone slab — a permanent public record | Strong image: the record that outlasts the run |
| **Carta** | CAR-tah | The document, the charter — as in Magna Carta | ⚠️ **Carta** is an active US fintech; check before investing |
| **Tome** | TOHM | The accumulated volume | Plainest and cleanest; one syllable, zero ambiguity |

### 34.6 After both gates

Ranked on meaning **and** sound together:

1. **Acta** — survives every test. Four letters, one reading, means exactly "the recorded proceedings."
2. **Verba** — the conversation-history half of the brief, said cleanly.
3. **Suma** — the only one carrying the *resume* double meaning without a pronunciation fork.
4. **Scripta** — most substantial-sounding; best on a bad phone line.

**Acta** and **Verba** also compose, if a two-word system is ever wanted: *Acta* for the decision
record, *Verba* for the transcript. Next step is the §8 registry screen — npm, PyPI, RubyGems,
GitHub org, and domains — on these four.

---

## 34. §8 screen — Logia, Acta, Summa, Minux (+ Figma-shaped escapes)

Screened 2026-07-29 against §8 / §33. Not legal advice. Focus: pronunciation fitness + registry/brand.

### Pronunciation bar (product-suitable)

Must pass: one clear stress · no “how do you spell that?” · CLI `name run` · Zoom without phonetic alphabet.

| Name | Say | Pass? | Note |
|---|---|---|---|
| **Logia** | LO-jee-uh / lo-GEE-ah | Pass | Two valid stresses; still fine |
| **Acta** | AK-tuh | **Pass** | Best mouthfeel of the four |
| **Summa** | SUM-uh | Pass | Familiar; soft |
| **Minux** | MY-nux / MIN-ux | Weak | Linux / Minix / MinusX shadow |
| **Resma** | REZ-muh | **Pass** | Figma twin |
| **Logma** | LOG-muh | **Pass** | Blunt, clear |
| **Dossa** | DOSS-uh | **Pass** | Warm, clear |
| **Gesta** | JESS-tuh / GESS-tuh | Weak | Soft-g vs hard-g split |
| **Glossa** | GLOSS-uh | Pass | Slightly long |
| **Quipu** | KEE-poo | Weak teach | Spelling from hearing fails often |

### Hard / brand checks (the four)

| | **Logia** | **Acta** | **Summa** | **Minux** |
|---|---|---|---|---|
| npm | taken | taken | taken | taken |
| PyPI | taken | taken | taken | clear |
| gem | clear | taken | taken | clear |
| crates | clear | clear | clear | clear |
| Live brand | Logia Initiative (AI eng), Log-IA SaaS | **acta.ai — AI meeting notes / decision history** | summa-ai.com (tax/accounting AI) | soundalike **Minusx.ai** (agentic BI) |
| §8.5 | Caution — AI-adjacent Logia | **Fail — category twin** | Caution — live Summa AI | Caution — Minusx sound |
| Verdict | Weak / discourage bare | **No** | Discourage bare | Usable only if you accept Linux-ish + Minusx |

**Acta is a hard no** — [acta.ai](https://acta.ai) is literally conversation + decision history agents. Same failure mode as Fleeti/Harness/Cairn.

**Logia / Summa** — meaning perfect, bare name fights existing AI/software Logia and Summa.

**Minux** — clever minutes+ux; pronunciation and Minusx/Linux gravity hurt.

### Clearer Figma/Brex escapes (same brief, better ship shape)

Registries skimmed clear (or mostly clear) and pronunciation-checked:

| Name | Formula | Say | Why |
|---|---|---|---|
| **Dossa** | dossier + `-a` | DOSS-uh | Both npm+PyPI clear; warm; “the file on this agent” |
| **Resma** | resume + `-ma` | REZ-muh | npm squat only; resume double meaning; Figma shape |
| **Logma** | log + `-ma` | LOG-muh | npm clear; log legible; Figma shape |
| **Resumia** | resume + `-ia` | reh-SOOM-ee-uh | both clear; longer but résumé-obvious |
| **Resumma** | resume + summa blend | reh-SUM-uh | both clear; resume+summa |
| **Actux** | acta + `-ux` | AK-tux | both clear; keeps Acta meaning, escapes acta.ai |
| **Gestux** | gesta + `-ux` | JESS-tux | both clear; deeds recorded × Unix |
| **Glossix** | glossa + `-ix` | GLOSS-ix | both clear; annotation layer |
| **Quipux** | quipu + `-ux` | KEE-pux | both clear; softens Quipu spelling a bit |
| **Summux** | summa + `-ux` | SUM-ux | both clear; compiled whole × mux |
| **Summex** | summa + `-ex` | SUM-ex | both clear; Brex tail |
| **Kenux** | ken + `-ux` | KEN-ux | both clear; knowledge × Unix |
| **Lorema** | lore + `-ma` | lor-EE-muh | both clear; accumulated lore |
| **Annexa** | annex + `-a` | uh-NEK-suh / AN-ex-uh | both clear; attached record |
| **Sessia** | session + `-ia` | SESS-ee-uh | both clear; session history |
| **Sessux** | session + `-ux` | SESS-ux | both clear; punchier |
| **Histora** | history + `-a` | hiss-TOR-uh | both clear; decision/conversation history |
| **Decidux** | decide + `-ux` | de-SIDE-ux | both clear; decision log |
| **Briefa** | brief + `-a` | BREE-fuh | both clear; handoff brief |
| **Packeta** | packet + `-a` | puh-KET-uh | both clear; handoff packet |

Also clear but weaker mouthfeel: **Actia**, **Gestia**, **Cruxa**, **Verbux**, **Corpux**, **Corpia**, **Loreux**, **Kenis**, **Colopha**, **Handlog**, **Packetux**, **Briefux**.

### Drop / demote

| Name | Why |
|---|---|
| **Acta** | acta.ai meeting-intelligence AI |
| **Quipu** bare | getquipu.com + other Quipu SaaS |
| **Logia** bare | multiple Logia / Log-IA AI entities; registries taken |
| **Summa** bare | summa-ai.com + cultural Summa; registries taken |
| **Gesta** | soft-g pronunciation split; registries taken |
| **Memex** | Bush’s Memex + packages taken — don’t fight history |

### Updated shortlist (pronunciation × ship)

1. **Dossa** — clearest empty Figma-shape; dossier = agent file  
2. **Resma** — resume double meaning; watch npm squat  
3. **Logma** — log-obvious; Figma  
4. **Actux** — Acta meaning without acta.ai  
5. **Summux** / **Summex** — summa/resume family with Brex tail  
6. **Kenux** — knowledge + Unix, Greptile-adjacent  
7. **Sessux** — session record, punchy  
8. **Histora** — history umbrella, softer  

### Next step

§8-deepen domains/trademark on **Dossa vs Resma vs Logma vs Actux** — pronunciation already passes all four.

---

## 35. House-fit cut — naming a product that belongs to Centauri AI

_Constraint clarified: **Centauri AI stays as the company name.** The internal fleet-log-and-control-
panel needs an external product name that is short and sits naturally beside it. This is a house-style
problem, not a semantic-blend problem — and it is a much easier one, because Centauri hands us a whole
world for free._

### 35.1 The house style, read off the existing name

**Cen-TAU-ri.** Three syllables, Latinate, celestial, soft consonants, bright `-i` ending, faintly
classical. That gives four rules for the product name:

1. **Same world** — celestial, classical, or instrument-of-observation. Not animals, not Unix, not cute.
2. **Do not end in `-i`.** Rhyming with the parent reads as a knockoff sub-brand, not a product.
3. **Shorter than the company**, so "Centauri <Name>" scans as company-then-product.
4. **Two or three syllables**, front-stressed, so it survives being said on a call.

And the thing nobody has used yet: **Centauri's own myth is the centaur — rider and mount as one
creature. Your product is the rider's half.** That is the poetry sitting unused in the company name.

### 35.2 Orrery — the one I would build the brand on

An **orrery** is the brass tabletop machine where a dozen planets and moons orbit at once, all
visible, all in correct relation — driven by a single crank the operator turns by hand.

That is a fleet control panel from 1750.

- **Many bodies, one view** — the multi-agent canvas, exactly.
- **Geared and harnessed** — every body's motion is mechanically constrained. Your permission
  profiles, gates, and writer leases in one image.
- **Hand-cranked** — the human drives it. Your §1.2 invariant, rendered in brass.
- **Celestial** — house-matched to Centauri without repeating it.

"**Centauri Orrery**" scans beautifully, and the logo draws itself: concentric rings, one hand on the
crank. OR-uh-ree, six letters, three syllables. The best name in this document.

### 35.3 Proxima — the airtight house logic

**Proxima Centauri** is the nearest star to Earth, and a member of the Centauri system.

So the company is the star system; the product is its closest star. That is house architecture you
cannot argue with — and if a second product ever ships, the system has more stars in it (Toliman,
Hadar) waiting to be used.

It also means the right thing on its own: **proximate** — near, immediate, at hand. A control panel is
the thing nearest you when the work is happening. PROX-ih-mah, unambiguous, front-stressed.
⚠️ *Proxima Nova* is a famous typeface — a category away, but designers will notice.

### 35.4 Chiron — Centauri's own best character

Of all the centaurs, **Chiron** is the one who matters: the teacher. He trained Achilles, Jason, and
Asclepius, and he never fought a battle himself. He is the one who oversees the heroes doing the work.

That is your persona — the shipped prompts already call the user *"chief of staff for a developer who
manages coding agents."* Chiron is that, in myth.

And the double: **Chiron is also a real astronomical object** — the first discovered of the
"centaur" class of small bodies orbiting between Saturn and Uranus. So it is simultaneously
Centauri's mythology and Centauri's astronomy. KYE-ron, two syllables.
⚠️ Bugatti Chiron owns a lot of search results.

### 35.5 Parallax — your cross-vendor thesis, named

**Parallax** is how you get depth: observe the same object from two different positions and the shift
tells you the distance. It is the technique that first measured a star.

Your most defensible feature is two model families reviewing the same code from different vantage
points. That is parallax, exactly. Astronomical, clean to say, PAIR-uh-lax, and it makes the
cross-vendor review sound like a measurement rather than a gimmick.

### 35.6 Tycho — the logbook that changed everything

**Tycho Brahe** kept the most meticulous observational records in history — decades of naked-eye
measurements, obsessively logged. He never worked out the laws himself. **Kepler did, using Tycho's
logs.**

"The rigorous record that makes everything downstream possible" is your product in one name. TY-ko,
two syllables, five letters, celestial (there is a Tycho crater), punchy.
⚠️ Tycho the musician; Tycho Station in *The Expanse*.

### 35.7 Almanac — the plain-spoken one

An **almanac** is the published record of celestial events: what happened, what is coming, tabulated
and trusted. Warm, old, unpretentious, and it says *log* without saying "log."

The least clever option here, and the one most likely to still feel right in ten years.
AL-man-ak, three syllables, zero ambiguity.

### 35.8 Two more, held in reserve

- **Toliman** — the old name for Alpha Centauri. Same house logic as Proxima, more obscure, entirely
  unclaimed-feeling. TOL-ih-man.
- **Vernier** — the fine-adjustment scale on a precision instrument; the thing you turn for small,
  exact corrections. Your take-over-and-nudge gesture as an object. VER-nee-er.

### 35.9 How they read in the wild

| Written | Said aloud |
|---|---|
| Centauri **Orrery** | "We run everything through Orrery." |
| Centauri **Proxima** | "It's in Proxima." |
| Centauri **Chiron** | "Chiron caught it in review." |
| Centauri **Parallax** | "Parallax flagged a conflict." |
| Centauri **Tycho** | "Check Tycho for what the agent decided." |
| Centauri **Almanac** | "It's all in the Almanac." |

**Orrery** wins that test — "run it through Orrery" already sounds like a thing that exists.

### 35.10 Recommendation

**Orrery**, with **Proxima** as the safe second and **Chiron** as the romantic third.

Orrery is the only candidate in this entire document that delivers all four of the product's ideas in
a single image — many bodies visible at once, mechanically constrained, in correct relation, turned by
a human hand — while sitting in Centauri's celestial world without echoing its sound. Screen it
first: npm, PyPI, GitHub org, `orrery.dev` / `.sh`, and trademark class 9/42.

---

## 35. Screening report — Histora (§8 applied)

Screened 2026-07-29 against the rubric in §8, same method as §15–§17 / §24–§25. Not legal advice.

**Candidate:** **Histora** — Figma-shaped clip of *history* (`history` → `histor-` + `-a`). Intended as the durable conversation / decision history layer for Centauri AI’s coding-agent control product (ex-FleetLog).

### Hard checks

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | **npm** `histora` | **Clear** | Exact package 404. Nearby noise: `historia`, `historix`, `historai` (other names). |
| 1 | **PyPI** `histora` | **Clear** | 404 |
| 1 | **RubyGems** `histora` | **Clear** | 404 |
| 1 | **crates.io** `histora` | **Clear** | no crate |
| 1 | **Homebrew** | **Clear** | formula + cask 404 |
| 1 | **Go modules** | **N/A / fine** | bare name not a module path |
| 2 | **GitHub org** `histora` | **Taken** | Org `Histora` since 2016-07-14, 0 public repos — squat/empty, but handle occupied |
| 2 | **GitHub user** | **Same handle** | API resolves as Organization type; no alternate bare user free |
| 3 | **Domains** | **Blocked on the ones that matter** | See table |
| 4 | **Trademark 9/42** | **Hot — counsel** | Live site brands **HISTORA®** (registered-mark signal on histora.com). Do not DIY-clear. |
| 5 | **Adjacent product** | **Fail — category / brand twins** | Two live Histora products; one is agentic AI data layer |

#### Domains (DNS skim)

| Domain | Status (skim) | Read |
|---|---|---|
| `histora.com` | Live | **HISTORA®** dental clinical data / agentic AI platform |
| `histora.ai` | Live | Same dental / “smart layer” AI story |
| `histora.app` | Live | Shopify **product audit log / history** app (Slate Apps Ltd) |
| `histora.io` | Resolves | Taken |
| `histora.co` | Resolves | Taken (Squarespace-ish) |
| `histora.dev` | NXDOMAIN | Likely free — not enough to save bare name |
| `histora.sh` | NXDOMAIN | Likely free — CLI-pretty, still fights .com/.ai/.app |
| `histora.so` / `.tools` | NXDOMAIN | Likely free |
| `gethistora.com` | NXDOMAIN | Likely free — “get-” escape only |

### Named collisions (the ones that matter)

1. **HISTORA® — dental clinical data infrastructure + AI agents** ([histora.com](https://www.histora.com/), [histora.ai](https://histora.ai/))  
   Live product. Explicit **®**. Messaging: history/records layer, autonomous agents, human-in-the-loop clinical judgment. Founded ~2025, LinkedIn-active. **This is a Fleeti/Cairn-class collision** — same English string, live SaaS, and uncomfortably close “history + agents” thesis even though vertical is dentistry not coding.

2. **Histora — Shopify product audit log** ([histora.app](https://www.histora.app/), Shopify App Store)  
   UK vendor (Slate Apps Ltd). Exact job-to-be-done rhyme with “audit / change history.” Different industry (ecommerce), same Google string and `.app` TLD you’d want.

3. **Spanish / Romance `historia`**  
   Everyday word for *history* / *story*. Podcast listeners will hear **Historia**. Search forever shares oxygen with “historia …” in ES/PT/IT. Coined-looking in English; real-word tax in half of Europe.

4. **Near-miss OSS** — `historai` (LLM + shell history CLI), `historia` npm, Historage repos — SEO fog, not ship-blockers alone.

### Ergonomic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 6 | CLI length | **Pass** | 7 letters — outside 3–6 sweet spot but still `histora run` fine; no forced alias |
| 7 | Dotfolder `.histora/` | **Pass** | Clean lowercase |
| 8 | Zoom spelling | **Weak** | People will type **Historia** (extra *i*) or hear “history-uh” |
| 9 | Podcast | **Needs “spelled…”** | Must say: *Histora — H-I-S-T-O-R-A, not Historia.* Fail relative to Figma/Brex punch |
| 10 | Searchability | **Fail** | Owned by histora.com + histora.app + `historia` language flood |

### Strategic checks

| # | Check | Pass? | Notes |
|---|---|---|---|
| 11 | Survive next pivot | **Weak–OK** | “History” stretches to logs/resume/knowledge; thinner for pure control-plane / multi-vendor harness if product outgrows “record” |
| 12 | Buyer tone | **Pass as sound** | Serious enough for Centauri AI letterhead — *if it were free* |
| 13 | Host a mascot | **Pass** | Empty enough for capybara; no animal lock-in |

### Suitability next to Centauri AI

Phonetic fit is decent (*Centauri Histora* — Latinate pair). Strategic fit is the problem: Centauri wants a **coding-agent fleet + control** external name; Histora reads as **records/history product**, and two other companies already spent that brand. You’d launch into their SEO and their ®.

### Verdict

**Histora is registry-clear and brand-dead.**

- **Registries:** surprisingly clean (npm / PyPI / gem / crates / brew).  
- **Ship-blocking:** live **HISTORA®** on `.com` + `.ai` (dental agentic data), plus Shopify **Histora** on `.app` (audit history). GitHub org taken.  
- **Ergonomics:** 7 letters; Zoom/podcast confuse with **Historia**.  
- **Same failure mode as Fleeti / Cairn / Acta / bare Harness** — packages free, primary brand is not.

**Rubric scorecard (informal):** Hard checks **fail §8.3 + §8.4 + §8.5** (domains, mark heat, adjacent live products). Ergonomics 2/5. Strategic 1/3 for *this* company once collisions count.

**Recommendation:** **drop bare Histora.** Keep the *history / durable record* idea in the tagline. Escapes that preserve the mouthfeel without the landmine:

| Escape | Why |
|---|---|
| **Histora → Histora is gone** | — |
| **Sessux / Sessia** | session history, freer |
| **Dossa** | dossier file, Figma-short |
| **Resma** | resume double meaning |
| **Actux** | “things done” without acta.ai |
| **Historix** | sharper coin; check §8 fresh (npm may be taken) |
| **Rigil / Vela / Pyxis** | Centauri-sky names if control-plane > memory |

Do not fight HISTORA® for “the history layer.”

---

## 36. Screening report — Histora (§8 applied)

_Screened 2026-07-29. **Verdict: do not use.** The idea is right; the word is not available._

### 36.0 Tooling caveat — what was and wasn't verified

Honest accounting, because a screen is worthless if you don't know its gaps:

- **Verified by web search:** live sites and shipping products under this name (below). Decisive on its own.
- **Could NOT verify from this environment:** npm / PyPI / RubyGems / crates.io (the fetch tool
  returned empty bodies even for a control package known to exist), the GitHub org, DNS for
  `.dev` / `.sh` / `.ai`, and USPTO records (outbound DNS is blocked in the sandbox).
- **Manual follow-ups**, if you want completeness despite the verdict:
  `npmjs.com/package/histora` · `pypi.org/project/histora` · `rubygems.org/gems/histora` ·
  `github.com/histora` · `tmsearch.uspto.gov`.

The gaps do not change the outcome — §8.3 and §8.5 fail independently.

### 36.1 The findings

| # | Check | Result |
|---|---|---|
| 8.1 | Package registries | **Unverified** (tooling) |
| 8.2 | GitHub org | **Unverified** (tooling) |
| 8.3 | Domain | **FAIL** — `.com`, `.io`, `.net`, `.me`, `.app` all live with unrelated businesses |
| 8.4 | Trademark | **High risk** — multiple concurrent commercial users, at least one in class 9 |
| 8.5 | Adjacent product collision | **FAIL — the serious one.** A shipping SaaS product named Histora is an *audit-log / change-history* tool |
| 8.6 | CLI length | Weak — 7 chars; natural alias `hist` collides with shell `history` |
| 8.7 | Dotfolder | Pass — `.histora/` is fine |
| 8.8 | Spell-over-Zoom | **Weak** — near-miss of a common word; listeners will write "Historia" |
| 8.9 | Podcast / stress | Mild — HIS-tor-ah vs his-TOR-ah, two plausible readings |
| 8.10 | Searchability | **FAIL** — autocorrects toward *historia* / *history*, plus five live Historas |
| 8.11 | Survives the pivot | **FAIL** — same trap as "-Log", one synonym over |
| 8.12 | Buyer fit | Pass — serious, classical, enterprise-safe |
| 8.13 | Hosts a mascot | Pass — neutral |

### 36.2 Who already has it

- **histora.com** — HISTORA, *"The Smart Layer for Modern Dental Data — AI Dental Platform."* The `.com`
  is not parked; it is a **live AI company**. Launching an AI product while `yourname.com` is a
  different AI product is the worst version of this problem.
- **Shopify App Store — "Histora: Product History" / "Histora: Product Audit Log"**, described as
  *"records every change to products, variants and pricing automatically with before-and-after
  detail."* **This is a change-history and audit-log product.** Not a distant category — a functional
  sibling of yours, already trading under the exact name. This is the finding that ends it.
- **histora.io** — marketing tools platform. **histora.me** — AI historical chat. **histora.net** —
  historical timeline. **histora.app** — live.
- **Histora** — a commercial typeface family on MyFonts. Typefaces are software: **class 9**, the same
  class you would file in.

Five live products, one font, and the `.com` is another AI company. §4.2's lesson repeats: the plain
web search *looked* survivable until you read what the results actually were.

### 36.3 The strategic objection, separate from availability

Even if every namespace were clear, one problem would remain.

**"History" names the retrospective half of the product** — which is precisely the mistake §3 diagnosed
in *FleetLog*. Replacing "-Log" with "-History" is a synonym swap: it fixes the tone and keeps the
trap. The audit showed the center of gravity moving from *reading vendors' logs* to *orchestrating and
controlling agents*, and the newest planning doc is entirely about control.

In fairness, *history* is the better version of that trap. Git is built on history; the word carries
branching, provenance, and replay rather than just records. But it still points backward, and the
product's own promise — "configure the work, then advance from source to reviewed result" — points
forward.

### 36.4 House fit with Centauri AI

Decent, with a small flaw. **Cen-TAU-ri His-TOR-a**: both three syllables, both Latinate, both
vowel-final, both stressed on the second syllable. Said together they scan as a *matched pair* rather
than as company-then-product — slightly singsong. Compare "Centauri **Orrery**" (OR-uh-ree,
front-stressed), where the stress contrast makes the two words sit in different registers.

### 36.5 The salvage — keep the idea, change the word

The concept is genuinely right, and it is the §33 brief exactly: logs, resume, knowledge, the
conversation and decision history. Don't drop it — fix the spelling problem.

**Storia** is the better word. Italian for *history* and *story*; STOR-ee-ah, one stress, six letters.
It keeps everything Histora was reaching for and drops the three things that sank it: it is a real
word rather than a near-miss, so nobody spells it back wrong; it doesn't autocorrect into a different
term; and "Centauri Storia" has the stress contrast that Histora lacks. It also quietly contains
*story* — the narrative of what the agents did, which is warmer and more accurate than *log*.

Other roots if Storia screens badly: **Provenance / Provena** (the record of origin and custody —
forward-useful, already the term of art in data lineage), **Anamnesis** (Greek, recollection — too
long), **Estoria** (archaic Spanish — distinctive but hard).

**Recommendation:** drop Histora, screen **Storia** next, and keep **Orrery** as the incumbent — it is
the only candidate so far that names the *control* half of the product rather than the record half.

---

## 36. Capybara root — product-name variations (not the Ruby gem)

**Constraint reminder (§4):** bare `capybara` is dead (Ruby acceptance-testing gem). **`Capy` is also hot** — [capy.ai](https://capy.ai) is literally “orchestrate a fleet of cloud coding agents.” Same category. Do not ship Capex ([capex.ai](https://capex.ai)) or Capyx (Belgian IT, capyx.be).

**Keep the animal as mascot.** Name from a *clip, cognate, or scientific root* that still lets you say “the chill herd that hosts everyone else’s birds.”

### Root bank

| Root | Source | Product read |
|---|---|---|
| *kapi'yva* / *ka'apiûara* | Tupi–Guaraní etymology of capybara (“grass-eater” / leaf-eater) | original word behind the meme |
| *carpincho* / *capincho* | Río de la Plata Spanish | regional true name |
| *ronsoco* | Peruvian Amazon | obscure cognate |
| *chigüire* | Colombia/Venezuela | hard Zoom spelling — skip bare |
| *Hydrochoerus* | “water hog” scientific genus | serious Latinate clip |
| *-ybara* / `capy-` | English word shape | Figma/Brex tails |

### Strong variations (registries skimmed clear npm+PyPI unless noted)

| Name | Say | Formula | Centauri pair | Soft TLDs look free |
|---|---|---|---|---|
| **Kapya** | KAP-yah | *kapi'yva* → Figma `-a` | Centauri Kapya | `.dev .sh .ai` |
| **Kapiva** | kah-PEE-vah | closer to *kapi'yva* | Centauri Kapiva | `.sh` (`.com`/`.ai` resolve — check brand) |
| **Kapux** | KAP-ux | kapi + Brex `-ux` | Centauri Kapux | `.dev .sh .ai` |
| **Kapyx** | KAP-ix | kapi + `-yx` | Centauri Kapyx | `.dev .sh` (`.ai` resolves) |
| **Capya** | CAP-yah | capy + `-a` without bare Capy | Centauri Capya | `.dev .sh .ai` (`.com` for sale) |
| **Capyma** | CAP-ih-mah | exact Figma shape on capy | Centauri Capyma | `.dev .sh .ai` |
| **Capux** | CAP-ux | capy + `-ux` | Centauri Capux | `.dev .sh .ai` |
| **Ybara** | ee-BAR-ah | the distinctive *tail* of capy**bara** | Centauri Ybara | `.dev .sh .ai` |
| **Cabari** | kah-BAR-ee | soft respell of -bara herd | Centauri Cabari | `.dev .sh .ai` |
| **Carpex** | CAR-pex | *carpincho* → Brex | Centauri Carpex | soft TLDs free; `.com` may park |
| **Carpi** | CAR-pee | short carpincho clip | Centauri Carpi | easy CLI; teach once |
| **Ronso** | RON-so | *ronsoco* clip | Centauri Ronso | `.dev .sh .ai` |
| **Ronsux** | RON-sux | ronsoco + `-ux` | Centauri Ronsux | freer coin |
| **Choera** | kee-OR-ah / KOH-rah | *Hydro**choerus**** clip | Centauri Choera | odd = ownable |
| **Puara** | PWAH-rah | tail of *ka'apiûara* | Centauri Puara | teach once |

### Drop / careful

| Name | Why |
|---|---|
| **Capybara** | Ruby gem |
| **Capy** | capy.ai = coding-agent fleet (category twin) |
| **Capex** | finance CapEx + capex.ai |
| **Capyx** | live Belgian IT firm |
| **Carpincho** | Zoom/podcast spelling fail (§8.8/8.9) |
| **Apiura** | sounds like APIura (Laravel tool) |
| **Cavy / Cavia** | packages taken; guinea-pig genus — cute but muddy |

### Creative read (not just a list)

The meme animal stays on the hoodie. The *product* should sound like it can sit on a Centauri slide:

- **Kapya** — closest to the true etymology, five letters, soft, empty enough to grow (logs → control → harness).  
- **Ybara** — keeps the only part of “capybara” that isn’t already a gem or a competitor (`capy-`); feels coined.  
- **Ronso** — same animal, zero Ruby/Capy collision, short CLI.  
- **Capyma** — if you want the Figma move people can decode in one beat.  
- **Choera** — if you want serious/scientific next to Centauri without saying rodent.

### Next step

§8-deepen a trio that disagree: **Kapya** (etymology) vs **Ybara** (coinage) vs **Ronso** (cognate) — domains RDAP + trademark + “Centauri ___” podcast test.

---

## 37. Where capybara and Centauri actually meet

_Brief: words connecting the two seeds. There turn out to be four genuine bridges, not forced ones —
and two of them are good enough to name a product on._

### 37.1 Bridge one: they share a sky

**The Centaurus constellation is only visible from the southern hemisphere.** Alpha Centauri, Proxima,
Hadar — none of them rise for most of North America or Europe.

**The capybara lives only in South America.**

So the capybara's sky *is* the Centaur's sky. A capybara in the Llanos at night sits under Centaurus.
That is not a stretch; it is the same patch of sphere. Everything in this bridge is house-matched to
Centauri by construction and animal-connected by geography.

There is a sharper detail. **Alpha and Beta Centauri are known as the Southern Pointers** — the two
stars you follow to find the Southern Cross, and therefore south itself. The Centauri stars are what
you navigate *by*.

### 37.2 Bridge two: they share a saddle

This is the conceptual one, and it is the best idea in this section.

**The capybara is the animal other species ride and rest on** — birds on its back, monkeys on its
shoulders. **The centaur is the creature where rider and mount are one body.**

Both are about the same thing: **the relationship between a rider and the thing that carries them.**

And your own codebase already speaks this language. An agent slot in the component model is called a
**seat**. The human sits; the agents move. That is the centaur, that is the capybara, and it is
already your technical vocabulary.

### 37.3 Bridge three: water

The capybara's genus is ***Hydrochoerus*** — Greek for "water hog." Centaurus's celestial neighbours
are the water constellations: **Hydrus** the water snake, **Eridanus** the river. Same root, sky and
animal.

### 37.4 Bridge four: horseback country

The **Llanos** and the **Pantanal** hold the world's largest capybara populations. They are also
**llanero** and **gaucho** country — horseback cultures. A rider on a horse, moving a herd, through
capybara wetlands, under Centaurus. All four seeds in one landscape.

### 37.5 The candidates

| Name | Said | The connection | Watch |
|---|---|---|---|
| **Crux** | KRUKS | The Southern Cross — the constellation that Alpha and Beta Centauri *point to*. And "the crux" is the decisive point, which is exactly what your Review component produces. **Company points to product** | Somewhat used; check registries |
| **Toliman** | TOL-ih-man | The traditional name for Alpha Centauri. Its etymology traces to Arabic for **"the ostriches"** — the two stars read as birds drinking at the Milky Way. An animal name already living inside the Centauri system | Obscure; needs one line of story |
| **Sella** | SEL-lah | Latin for **seat** or **saddle** — the word your own component model already uses for an agent slot. The centaur is rider-and-mount fused; the capybara is what others ride. Sella is the classical word for the thing you occupy while something else does the moving | Reads as a personal name |
| **Pyxis** | PIX-iss | The mariner's compass constellation, southern sky. A compass is a navigation-and-control instrument — which is what a control panel is | Unfamiliar; 5 letters and clean, though |
| **Hydrus** | HY-drus | The southern water-snake constellation, and a direct echo of the capybara's genus *Hydrochoerus*. Sky and animal on one root | Hydra adjacency (ML config, Marvel) |
| **Tropa** | TRO-pah | The gaucho word for a herd being driven. Multi-agent, on horseback, in capybara country, under Centaurus — four seeds, five letters | Plain in Spanish; may read as "troop" |
| **Trine** | TRYNE | **Alpha Centauri is a triple system** — A, B, and Proxima, three bodies orbiting each other. Your fan-out is 1–3 seats. A trine is a relationship of three | Astrology connotation |
| **Circinus** | SIR-sih-nus | The constellation of the drawing compass, sitting **directly adjacent to Centaurus**. Dividers mean precision and measurement | Three syllables; longest here |
| **Baqueano** | ba-kee-AH-no | The gaucho word for the one who knows every path and river crossing — the guide who has been everywhere before. Beautiful meaning | Four syllables, hard for English speakers. Reserve only |

### 37.6 Read

**Crux** is the strongest on every mechanical test in §34: four letters, one pronunciation, hard
consonants that survive a bad phone line, and a meaning that is squarely about *decisions* — the thing
your Review component exists to produce. The house logic is unusually tight: the Centauri Pointers
point at Crux, so the company literally points at the product. "Centauri Crux."

**Toliman** is the most authentically Centauri, and the ostrich etymology is a genuine delight — it
means the animal seed is already hiding inside the star system, which is a better story than any
portmanteau I have produced.

**Sella** is the dark horse. It is the only candidate that names what the product *gives the user* — a
seat — rather than what the product watches. It is Latinate, it sits beautifully next to Centauri, and
it comes with the strongest sentence available: *the agents do the moving; you keep the seat.*

**Recommendation:** screen **Crux**, **Toliman**, and **Sella**, along**Orrery** from §35. And note
that Orrery still belongs in the conversation for the same reason Sella does — both name the human's
instrument rather than the machine's output.

---

## 38. Screening report — Centauri Capya (§8 applied)

_Screened 2026-07-29. **Verdict: the best capybara-derived candidate so far, and still not the
flagship.** Strong mechanics, two structural weaknesses._

### 38.1 What it gets right

- **It clears the gem.** `capya` ≠ `capybara` as a string, so RubyGems/npm/PyPI have no literal
  collision. This is the first capybara option that survives §4.2.
- **CLI ergonomics are the best of anything screened.** Five characters, `capya run` types cleanly,
  `.capya/` is a fine dotfolder. Compare `fleetlog` (8) or `histora` (7).
- **Not a diminutive.** It avoids the `-ie` trap that sank Cappie / Carpie / Leashie. It reads as a
  name, not a pet name.
- **No exact-name company found** in search. Genuinely more available than Histora.
- **Hosts the mascot natively** — the name and the capybara are the same idea, so no competition
  between them.

### 38.2 Weakness one: the pronunciation forks the wrong way

**CAP-ya** is intended. But English has no natural `p`+`y` cluster, so readers reach for analogy — and
the nearest analogies are *sepia*, *copia*, *utopia*, all of which are **three syllables**:

- **CAP-ee-ah** (3 syllables) — the most likely first reading
- **CAP-yah** (2 syllables) — the intended one
- **KAY-pyah** — a minority reading

So the default guess is probably *not* the one you want. Not fatal — both readings are pleasant and
neither is embarrassing — but you will be correcting people, and §34.2 rates a two-way fork as a tax.

**Round-trip is weak.** Hearing "Capya," people write *Capia*, *Cappia*, *Kapya*, *Capyah*. The only
anchor for the correct spelling is knowing it came from capybara — fine for insiders, guesswork for
everyone else.

### 38.3 Weakness two: three search gravity wells

Worse than expected, and this is the finding that matters:

1. **capybara** — the animal is one of the most-memed creatures on the internet, and the Ruby gem is
   in a large fraction of Rails codebases. "Capya" autocompletes straight into both.
2. **CAPA software** — *Corrective And Preventive Action* is a large enterprise quality-management
   software category. Searches for "capya software" fold into "CAPA software" results. This is the
   nasty one: it is **B2B enterprise software**, the same buyer world you are selling into.
3. **Capyba Software** (`capyba.com`) — an existing software development company with a
   capybara-derived name. One letter apart, same etymology, adjacent industry. Not a legal blocker,
   but a confusable neighbour.

Three separate wells is more contamination than Orrery, Crux, or Sella carry.

### 38.4 Weakness three: register clash with Centauri

"**Centauri Capya**" pairs a Greek myth with a rodent nickname. Two observations:

- **Tonally it clashes.** §35.1's house rule was *same world*. Centauri is classical, celestial,
  slightly austere; Capya is warm, soft, animal. That can be a deliberate and charming contrast — the
  Datadog trick — but it reads as *accidental* unless the brand commits to the joke.
- **Mechanically it tangles.** Cen-TAU-ri CAP-ya puts two hard K onsets back to back across a 3+2 or
  3+3 syllable pair. Say it five times fast. Compare "Centauri **Crux**" — also two K's, but Crux is
  one syllable, so it lands as a punch instead of a stumble.

### 38.5 Weakness four: zero semantic payload

This is the strategic one. Capya says nothing about logs, control, orchestration, agents, history, or
seats. It is a friendly noise.

That is the **Datadog play** — semantically empty, mascot-carried — and §9C already priced it: *the
name means nothing until you spend money making it mean something.* Datadog could afford that. A
seed-stage company shipping its first external product generally cannot, and every rival name still on
the table carries meaning for free: **Orrery** (many bodies, one crank), **Crux** (the decisive point),
**Sella** (the seat you keep).

### 38.6 Scorecard

| Check | Capya | vs. Orrery / Crux |
|---|---|---|
| Gem / registry collision | Pass | Pass |
| CLI ergonomics | **Best** | Good / Best |
| Pronunciation | Two-way fork, defaults wrong | Clean / Clean |
| Round-trip spelling | Weak | Good / Best |
| Searchability | **Three gravity wells** | Clean-ish / Clean-ish |
| House fit with Centauri | Register clash, K-on-K | Strong / Strong |
| Semantic payload | **None** | High / High |
| Mascot | **Native** | Compatible |

### 38.7 Verdict and the upgrade

**Use Capya as the mascot name, not the product name.** It is genuinely the best capybara word anyone
has produced in this document, and §4.3's conclusion still holds: the mascot and the name should do
independent work. "Capya" is a great name for the capybara that lives on the landing page, in the CLI
art, and on the stickers — while the product name carries meaning.

**If you want the sound but with a real anchor: *Capella*.** It is a star — the brightest in Auriga —
so it is house-perfect under Centauri, it opens with the same `cap-` mouthfeel you are drawn to, and it
means something (Latin *"little she-goat"*, and a genuine celestial object). Same warmth, real
foundation. ⚠️ Capella University and Capella Hotels are large; screen carefully before investing.

**Standing recommendation unchanged:** **Orrery** first, **Crux** second, **Sella** as the dark horse,
with **Capya** as the mascot across whichever wins.

---

## 39. Screening report — Centauri Capi (§8 applied)

_Screened 2026-07-29. **Verdict: weaker than Capya.** One hard collision, one rule violation, one
homophone problem. But the third `cap-` proposal in a row is a signal worth acting on — see §39.5._

### 39.1 The hard collision: CAPI is already taken in your buyer's vocabulary

**CAPI is the universal abbreviation for Kubernetes Cluster API** — a CNCF SIG Cluster Lifecycle
project, production-ready since v1.0 in October 2021, documented by Canonical, SUSE, Spectro Cloud and
others. Any infrastructure or platform engineer who hears "Capi" thinks *Cluster API* first.

And it is not the only one. **CAPI** also established as:

- **CryptoAPI** — the long-standing Microsoft Windows crypto interface, standard security vocabulary.
- **the C-API** — how CPython developers refer to Python's C extension interface.
- **CAPI** — IBM POWER's Coherent Accelerator Processor Interface.

This is categorically worse than Capya's problem. Capya suffered *search contamination*. Capi suffers
**active ambiguity in live conversation with exactly the audience you are selling to.** A name that
requires "no, not that CAPI" in the first sentence of every technical conversation is a name that
costs you something every day.

### 39.2 It breaks the one house rule

§35.1 rule 2: **do not end in `-i`**, because rhyming with the parent reads as a knockoff sub-brand.

**"Centauri Capi"** — Cen-tau-**REE** Ca-**PEE**. It rhymes with itself. Where "Centauri Capya" was
merely a K-on-K tangle, "Centauri Capi" is singsong, and it makes the product sound like a
diminutive of the company rather than a thing in its own right. This is a clear regression from Capya
on house fit.

### 39.3 It sounds like "copy"

CAP-ee sits uncomfortably close to *copy* over a poor connection — and "copy" is a word developers say
constantly. *"Is it in Capi?"* / *"Is it in copy?"* For a product whose whole job involves moving
context between agents, being homophone-adjacent to **copy** is an unlucky collision of meaning as
well as sound.

There is also a vowel fork: **CAP-ee** vs **KAY-pee** (English goes both ways before a single
consonant — *capital* vs *caper*).

### 39.4 Scorecard against Capya

| Check | Capi | Capya |
|---|---|---|
| CLI length | 4 — better | 5 |
| Cutesiness | Slightly less | Slightly more |
| **Established technical collision** | **CAPI = Cluster API, CryptoAPI, C-API** | None |
| **House fit** | **Rhymes with Centauri — breaks the rule** | K-on-K tangle only |
| Homophone risk | **"copy"** | None |
| Semantic payload | None | None |
| capybara search gravity | Same | Same |

Net: two new hard problems for one character saved.

### 39.5 The signal: you keep reaching for `cap-`

Three proposals in a row — capybara, Capya, Capi — all built on the same syllable. That is a real
preference and it should be served rather than argued with. So: **what is the best `cap-` word that
survives screening?**

**Capstan.**

A capstan is the vertical drum on a ship's deck that hauls a heavy line — sailors insert bars and
**walk it around together** to raise an anchor no one person could lift. It is:

- **many participants, one mechanism, one load** — multi-agent, exactly;
- **human-powered** — people push it; nothing happens on its own. Your §1.2 invariant again;
- **mechanical and geared** — harness, without the horse;
- **`cap-`** — the sound you keep returning to.

Mechanically it is strong where Capi is weak: **CAP-stan**, front-stressed, one pronunciation, hard
stops that survive bad audio, seven letters, no established technical abbreviation, no rhyme with
Centauri. And it is a first cousin of **Orrery** — both name a hand-driven instrument that moves many
bodies at once — which means the two best candidates in this document now agree on what the product
*is*.

"**Centauri Capstan**" scans cleanly. And the logo is a drum with radiating bars, which is a better
mark than a rodent for an infrastructure product while still leaving **Capya** free to be the mascot.

Other `cap-` options, weaker: **Capella** (a real star, house-perfect, but Capella University and
Hotels are large), **Capita** (Latin *heads*, i.e. a headcount of the herd — but bound to "per
capita"), **Caparo** (from *caparison*, the horse's harness — §31).

### 39.6 Recommendation

Drop **Capi**. Keep **Capya** as the mascot. Screen **Capstan** — it is the first candidate that
satisfies the `cap-` instinct *and* carries meaning *and* passes §34's pronunciation gate.

Standing order: **Orrery** and **Capstan** as the two leaders, **Crux** and **Sella** behind them,
**Capya** riding along as the mascot regardless of which wins.

---

## 40. Screening — CentaurCapi / CenCapi / Ccapi / ccapi

_Screened 2026-07-29. **Verdict: all four are weaker than bare Capi, which already failed.** Each
inherits the original collision and adds a new problem on top._

### 40.1 The principle that decides all four at once

> **A compound name's real name is whatever users clip it to.**

Users, not founders, decide what a product is called out loud. "Centauri Capstan" becomes *Capstan*.
"CentaurCapi" and "CenCapi" become **Capi**. So every variant here still lands on the syllable that
carries the **CAPI = Cluster API** collision and the **"copy"** homophone from §39. Prefixing does not
remove a collision — it just adds characters in front of one.

The corollary is the useful part:

> **You cannot rescue a colliding name by prefixing it, clipping the parent onto it, or doubling a
> letter.** Those three moves are the classic signs of trying to keep a word that isn't available. The
> tell that a name is right is that it needs no modification at all.

### 40.2 Individually

**CentaurCapi** — 11 characters, four syllables, unclear stress (CEN-tar-cap-ee? cen-tar-CAP-ee?). It
also puts the company *inside* the product name, which makes "Centauri CentaurCapi" absurd and makes
the standalone form compete with the parent instead of complementing it. Fails the brief's own "not too
long" requirement by a wide margin.

**CenCapi** — the fatal detail is phonetic: **the `C` in "Centauri" is soft (`s`), and the `C` in
"Capi" is hard (`k`).** So `CenCapi` spells the same letter twice with two different sounds, adjacent:
*sen-CAP-ee*. Readers stumble every time. Separately, clipping a parent company to three letters and
welding it on is the house style of **internal enterprise tooling** — the exact register this rename
exists to escape.

**Ccapi / ccapi** — **a doubled opening letter is inaudible.** Said aloud, "Ccapi" is
indistinguishable from "Capi," so the extra `C` exists only in writing, and every verbal introduction
becomes "with two C's." That is the worst possible version of the spell-over-Zoom failure: the name
cannot be transmitted by speech at all.

It gets worse in lowercase. `ccapi` reads exactly like a C-language binding — `ccapi.h` — which
**amplifies the C-API collision it was meant to escape.** And `cc` is the C compiler command, so
`ccapi` parses as "cc api" to anyone who lives in a terminal. Users will also simply type `capi` and
get nothing.

### 40.3 What you're actually reaching for, and how to get it properly

The instinct behind all four is legitimate: **you want the tie to Centauri to be visible.** Welding
letters is just the wrong instrument. Three patterns that work:

1. **Two words — company then product.** Adobe Photoshop. Microsoft Excel. Atlassian Jira. The tie is
   *stated* rather than fused, and the product name stays clean and clippable. "Centauri Capstan."
2. **A product name that is genuinely inside the company's world.** This is the strong one, and it is
   why **Proxima**, **Crux**, and **Toliman** score so well: *Proxima Centauri is a star in the
   Centauri system.* **Alpha and Beta Centauri physically point at Crux.** The connection is
   astronomically true, so it needs no spelling trick — and it is a much tighter tie than any prefix
   could manufacture.
3. **A naming system rather than a prefix.** If Centauri's products are all southern-sky objects, the
   family resemblance does the work, and product #2 and #3 are already named.

Pattern 2 is the answer to the impulse behind CenCapi. You do not need the letters `Cen` in the product
name to make it Centauri's — you need the *object* to belong to Centauri. Astronomy already did that
work for you.

### 40.4 Standing state of the board

| Rank | Name | Why it leads |
|---|---|---|
| 1 | **Orrery** | Hand-cranked instrument showing many bodies in correct relation. Names the control half |
| 1= | **Capstan** | Many hands, one drum, one heavy load. Serves the `cap-` instinct with meaning intact |
| 3 | **Crux** | The constellation Centauri points at; "the crux" = the decisive point. Best sound of any candidate |
| 4 | **Sella** | Latin *seat* — already your component vocabulary. "The agents move; you keep the seat" |
| 5 | **Proxima** | Airtight house logic; a real star in the Centauri system |
| — | **Capya** | **Mascot**, not product name |
| Out | Histora, Capi, CentaurCapi, CenCapi, Ccapi, ccapi | See §36, §39, §40 |

---

## 41. Final brief — a plain, ownable name that belongs to Centauri AI

_Constraints, now tight: fits under **Centauri AI** as parent · **no animals** · **no gods or myth** ·
easy to say · easy to use · ownable · carries a **Centauri / astronomical** term._

### 41.1 What the constraints eliminate

| Removed | Why |
|---|---|
| **Chiron** | Mythological figure |
| **Capya**, and every capybara derivation | Animal |
| **Capstan**, **Sella**, **Remuda**, **Cinch** | Real words, but nautical / Latin / ranching — not Centauri's world |
| **Rigil**, **Agena** | Real Centauri star names, but `g` before `i`/`e` — two readings (§34.2) |
| **Hadar** | Alpha Centauri's neighbour, but HAY-dar vs hah-DAR |
| **Sextant**, **Astrolabe** | Perfect instruments; unfortunate opening syllables |
| **Zenith**, **Meridian**, **Vela**, **Norma**, **Carina** | Astronomical and clean, but heavily used or common first names |
| **Syzygy** | Unpronounceable |

What remains is a coherent, disciplined lane: **the Centauri system, its southern neighbours, and the
instruments of observation.**

### 41.2 The list

| Name | Said | Centauri term | Why it fits the brief |
|---|---|---|---|
| **Crux** | KRUKS | The Southern Cross — the constellation **Alpha and Beta Centauri point at**. They are literally called the Southern Pointers | 4 letters, one reading, hardest consonants in the set, `crux run` and `.crux/` are perfect. And "the crux" is everyday English for *the decisive point* — what a review-and-decision product produces. **Easiest name here on every "easy" axis** |
| **Toliman** | TOL-ih-man | The traditional name for **Alpha Centauri itself** | You cannot get a tighter parent tie — it *is* the company's star. Obscure, so the most likely to be genuinely available. Front-stressed, one reading |
| **Proxima** | PROX-ih-mah | **Proxima Centauri**, the nearest star to Earth and a member of the system | Airtight house logic: the company is the star system, the product its closest star. Also means *nearest, at hand* — what a control panel is. ⚠️ Proxima Nova typeface |
| **Azimuth** | AZ-ih-muth | The bearing — the compass direction you are pointed at | Underrated for this brief. Front-stressed, one reading, feels unclaimed, and "which way are we pointed" is exactly a control-panel idea. Plain enough to say to anyone |
| **Orrery** | OR-uh-ree | The hand-cranked model of many bodies orbiting in correct relation | Still the best *meaning* fit: many bodies visible at once, geared, turned by a human hand. An instrument, not a myth |
| **Parallax** | PAIR-uh-lax | Depth measured by observing from two positions | Your cross-vendor double review, named — and it makes that feature sound like a measurement rather than a gimmick |
| **Pyxis** | PIX-iss | The mariner's compass constellation, southern sky | Crisp, 5 letters, very ownable. A compass is a control instrument |
| **Apsis** | AP-sis | The extreme point of an orbit | Sharp, short, unusual, clean. Least freighted word on the list |
| **Almanac** | AL-man-ak | The published record of celestial events | Warmest and plainest. Says *log* without saying "log," and will still feel right in ten years |
| **Ephemeris** | eh-FEM-er-iss | The table of where every body will be at each time — an astronomical **logbook** | Best meaning for the record half of the product. Longest word here; four syllables is the cost |

### 41.3 The sentence test

| Said aloud | Reads as |
|---|---|
| "Centauri **Crux** caught it in review." | A tool with authority. Lands hard, ends clean |
| "It's all in **Toliman**." | A place where work lives |
| "Open **Proxima**." | Immediate, close at hand |
| "Check the **Azimuth** board." | Direction and control |
| "Run it through **Orrery**." | A mechanism you drive |
| "**Parallax** flagged a conflict." | A measurement, not an opinion |

### 41.4 Recommendation

**Crux**, then **Toliman**, then **Azimuth**.

**Crux** is the answer to the brief as written. It is the shortest name on the board, has exactly one
pronunciation, opens and closes on hard consonants so it survives any phone line, types perfectly as a
CLI and a dotfolder, is not a god and not an animal, and belongs to Centauri's own patch of sky through
a real astronomical relationship — the Centauri Pointers aim at Crux, so **the company points at the
product**. It also happens to mean, in plain English, *the decisive point*, which is what the Review
component exists to produce. No etymology lesson required, and nothing to explain twice.

**Toliman** is the pick if the parent tie matters more than brevity — it is Alpha Centauri's own name,
and its obscurity is an asset for availability.

**Azimuth** is the pick if you want plain English over classical: it is the one name here that a
non-technical buyer could hear once and repeat correctly, and it says *direction under control*.

**Next step:** §8 screen on Crux, Toliman, and Azimuth — npm, PyPI, RubyGems, crates.io, GitHub org,
`.com` / `.dev` / `.sh` / `.ai`, and trademark classes 9 and 42. Note the tooling caveat from §36.0:
the registry-fetch path was broken in this environment, so those five checks need to be run manually or
from a different network.

---

## 42. Availability check — Toliman and Rigil

_Checked 2026-07-29 via search. **Toliman: viable but not clean. Rigil: dead — three independent
failures.** Registry and domain checks still blocked by the §36.0 tooling gap._

### 42.1 Toliman — viable, with one real trademark to clear

**Found:**

- **Toliman Health, LLC** holds **two USPTO filings** (serials 88937292 and 88937325, both filed
  2020-05-28) for *"Downloadable mobile applications for digital healthcare."* That is **class 9 —
  downloadable software**, the same class you would file in.
- A **Toliman** company page on LinkedIn describing itself as *aerospace, systems and software
  engineering, and management consulting*. Roughly 30 followers, so very small — but "software
  engineering" is in the description.

**Read:** trademark protection is **field-of-use sensitive**, and a developer-tooling product for
coding agents is a long way from a consumer digital-health app. Coexistence is plausible. But it is
class 9 against class 9, so this is a question for a trademark attorney rather than a judgement I can
make. The tiny consultancy is unlikely to be a blocker on its own.

**Compare:** Histora had five live products plus a commercial font and a lost `.com`. Toliman has one
dormant-looking healthcare mark and a micro-consultancy. **Materially better — the difference between
"pick something else" and "pay a lawyer $2k to check."**

**Still unverified:** npm, PyPI, RubyGems, crates.io, GitHub org, and `toliman.com` / `.dev` / `.sh` /
`.ai`. Given a 7-letter uncommon word, the `.com` may well be held by a domainer; the alt TLDs are
likely open.

### 42.2 Rigil — three independent failures

**1. An existing technology company owns the name and the `.com`.**
**Rigil Corporation** (`rigil.com`) — founded 2005, Washington DC, describes itself as *"an
award-winning strategy, technology, and products company,"* working in **IT modernization,
cybersecurity, and program management**, and shipping proprietary software products (StrataGem,
iViews). Same word, same industry, owns the domain. On its own this ends it.

**2. Permanent confusion with Rigel — a more famous star and several bigger companies.**
*Rigil* (Rigil Kentaurus = Alpha Centauri) is far less known than **Rigel** (Beta Orionis). And Rigel
is crowded: **Rigel Technologies** (RPA software, Madrid), **Rigel Ventures**, **Rigel
Pharmaceuticals** (public), plus **RIGOL Technologies** and **Rigetti Computing** in the same phonetic
neighbourhood. Anyone hearing "Rigil" writes "Rigel" — the exact round-trip failure from §34.1.

**3. The pronunciation was already disqualifying.**
RYE-jil / RIH-gil / RYE-gil. `g` before `i` has no rule in English (§34.2). Rigil failed the sound gate
in §41.1 before any of this.

**Verdict: do not pursue.** Three unrelated reasons is not a name with problems; it is the wrong name.

### 42.3 Where this leaves the shortlist

| Name | Availability read |
|---|---|
| **Crux** | Unscreened. Expect **many** small users — it is a common English word (climbing gear, assorted products). Common-word names collide widely but often coexist, because no one can monopolize a dictionary entry. Needs its own screen |
| **Toliman** | **One class-9 healthcare mark to clear.** Best-positioned of the Centauri star names |
| **Azimuth** | Unscreened. Common technical term, so expect scattered users; likely coexistable |
| **Proxima** | Proxima Nova typeface is the known obstacle; otherwise unscreened |
| **Rigil** | **Out** — §42.2 |
| **Pyxis** | Unscreened, and the most likely of the whole list to be genuinely open. ⚠️ I have a weak recollection of "Pyxis" in hospital medication dispensing — verify |
| **Apsis** | Unscreened; short, obscure, plausibly open |

### 42.4 Practical next step

Two things, in this order, and neither needs me:

1. **Ten minutes of direct checks** on Toliman, Crux, Azimuth, and Pyxis:
   `npmjs.com/package/<name>` · `pypi.org/project/<name>` · `rubygems.org/gems/<name>` ·
   `github.com/<name>` · a registrar lookup for `.com` / `.dev` / `.sh` / `.ai`.
2. **A knockout trademark search** on the surviving one or two, classes 9 and 42, via
   `tmsearch.uspto.gov` — then a lawyer if it looks close. The Toliman Health filing is exactly the
   kind of thing worth $2k of professional opinion before you print stickers.

Do not skip step 1 for the appealing ones. §36 and §38 both looked survivable on a plain web search and
were not.

---

## 43. Toliman variations

_Brief: vary Toliman. First, two facts about the source word that should shape the choice._

### 43.1 The etymology is a *dual* — and it is a gift

Toliman traces to Arabic **al-ẓalīmān** (الظليمان), which is not "the ostrich" but **"the two
ostriches"** — the Arabic dual form. Alpha and Beta Centauri were read as **a pair of birds** drinking
at the Milky Way.

So the name literally means *the two of them.*

Your signature technical feature is **two reviewers from two different model families** examining the
same change — the parallax idea from §35.5, and the one thing in the product nobody else has. A name
whose etymology means "the pair" is a better brand story than anything invented in this document.

**This argues against clipping too far.** "Tolma" and "Tolim" gain two characters and throw the story
away. Keep enough of the word that it is still recognisably Alpha Centauri's name.

### 43.2 The trade-off nobody can dodge

Trademark law covers **confusingly similar** marks, not just identical ones. So against **Toliman
Health, LLC** (§42.1):

> **The more you vary, the safer the trademark — and the weaker the Alpha Centauri tie.**

That is the actual axis. Pick a point on it deliberately rather than by taste alone.

| Distance from "Toliman" | Trademark safety | Centauri tie |
|---|---|---|
| Toliman | Lowest | **Perfect** |
| Tolman, Tolimar, Tolimo | Medium | Strong, still legible |
| Tolma, Tolim | Higher | Faint — reads as a coinage |
| Zaliman, Bungula | Highest | Different word entirely |

### 43.3 The variations

**Recommended**

| Name | Said | Note |
|---|---|---|
| **Tolman** | TOL-man | The cleanest clip. Dropping the middle `-i-` takes it from three soft syllables to two hard ones — punchier than the original, one reading, front-stressed, `tolman` types well. ⚠️ It is a real surname (Edward Tolman, the psychologist), so expect small collisions — but surname-register names are legitimate in AI right now |
| **Tolimar** | TOL-ih-mar | Keeps almost all of Toliman with a firmer ending than `-man`. Reads like a place or an established company. Three syllables, front-stressed, unambiguous |
| **Tolma** | TOL-mah | Figma-shaped, five letters, one reading, most ownable of the set. Free bonus: **τόλμα** is Greek for *daring, audacity*. Mild adjacency to "dolma" |
| **Tolimo** | TOL-ih-mo | Warmer and softer than Tolimar; the `-o` ending reads friendly rather than corporate |
| **Tolim** | TOL-im | Tightest clip that still says one clear thing. Slightly abrupt — reads unfinished to some ears |

**Ruled out, with reasons**

| Name | Why |
|---|---|
| **Toli** | Ends in `-i` — rhymes with Centauri, breaking the §35.1 house rule |
| **Tolima** | A real **department of Colombia** and a well-known football club (Deportes Tolima). *Charming footnote: Tolima sits in capybara country, tying back to §37 — but the collisions are too heavy* |
| **Tolix** | **Tolix** is the famous French café-chair brand. Every designer knows it |
| **Toman** | The Iranian currency unit — and a finance collision is the last thing this pivot needs |
| **Zaliman / Zalim** | Closest to the Arabic root, but that word family carries **ẓālim = "unjust, tyrant"** in Arabic, Urdu and Turkish. Do not go here |
| **Bungula** | A genuine historical name for Alpha Centauri, from *bini* + *ungula* = **"the double hoof"** of the Centaur — lovely meaning, and it echoes the dual again. But "bung-" is unfortunate in English |
| **Thaliman** | The `th-` opening goes mushy over bad audio |

### 43.4 Recommendation

**Keep Toliman, or take Tolman.**

**Toliman** unchanged is still the best version of itself: it *is* Alpha Centauri's name, the "two
ostriches" etymology gives you a brand story that maps precisely onto your best feature, and §42
found only one dormant-looking class-9 mark in an unrelated field. Pay for the trademark opinion
before abandoning it.

**Tolman** is the pick if the trademark opinion comes back uncomfortable, or if you simply want more
punch: two hard syllables instead of three soft ones, same origin, still legible as the star. It is the
only variation that improves the *sound* rather than merely differing from it.

**Tolma** is the fallback if you need real distance from Toliman Health — most ownable, cleanest
registries likely, and the Greek "daring" reading is a pleasant accident. The cost is that the Alpha
Centauri connection becomes something you assert rather than something the word carries.

Run the §42.4 checks on all three before choosing: npm, PyPI, RubyGems, crates.io, GitHub org,
`.com` / `.dev` / `.sh` / `.ai`, then USPTO classes 9 and 42.

---

## 44. DECISION — Toliman

_Decided 2026-07-29. The product formerly known as FleetLog is **Toliman**, shipping under **Centauri
AI**. This section closes the search; everything above is the record of how we got here._

### 44.1 The decision

> **Centauri AI · Toliman**

**Why it won:**

- **It is Alpha Centauri's own name.** The parent tie is astronomical fact, not a spelling trick — the
  thing §40.3 established you actually needed.
- **The etymology is a gift.** Arabic *al-ẓalīmān*, **"the two ostriches"** — the dual form, because
  Alpha and Beta Centauri are a pair. Your signature feature is two reviewers from two model families
  examining the same change. The name already means *the pair*.
- **It passes the sound gate.** TOL-ih-man, front-stressed, one reading, no soft/hard consonant
  ambiguity, no bad rhyme (§34).
- **It is genuinely available-ish.** §42 found one dormant-looking class-9 healthcare mark and a
  micro-consultancy — versus five live products and a font for Histora, and an occupied `.com` and
  industry for Rigil.
- **No animal, no god, and it does not name half the product.** It is a pure brand, which means it
  survives the pivot from observability to orchestration that killed "-Log" and would have killed
  "-History."

### 44.2 Positioning line

The name carries no description, so the tagline does that work — which is the right division of labour
(§44 vs the §3 FleetLog trap):

> **Toliman — the history and control plane for coding agents.**

Alternates worth testing: *"Watch, steer, and chain every coding agent you run."* ·
*"Mission control for your agent fleet."*

### 44.3 Naming system going forward

Resolve the double-naming §1 flagged as a symptom. One brand, plain descriptive labels underneath:

| Was | Becomes |
|---|---|
| FleetLog | **Toliman** (the product) |
| Columbus *(in code)* / Atlas Canvas *(in UI)* | **Workflows**, or **the canvas** — a feature name, not a codename |
| Future components | Plain descriptive labels. Do not mint new codenames |

If a second product ever ships, the Centauri system has more stars in it — **Proxima**, **Hadar** — so
the family is already there. That is the §40.3 pattern-3 payoff.

**Capya survives as the mascot**, and it now fits better than it did: §37.1 established that Centaurus
is only visible from the southern hemisphere, which is exactly where capybaras live. **A capybara under
the southern stars is a coherent image, not a compromise** — the star and the animal share a sky.

### 44.4 Migration checklist

From the codebase audit. Ordered by how expensive it gets if you wait.

**Do before any external release — cost becomes permanent afterward**

1. **`.fleetlog/` → `.toliman/`.** Written into *users' repos*: `vite/columbus-boards.ts` writes
   `<project>/.fleetlog/columbus/boards/*.json`, `vite/handoff-packet.ts` writes
   `<cwd>/.fleetlog/handoffs/<child>/`, and the code **appends `.fleetlog/handoffs/` to the user's
   `.gitignore`**. Board files are meant to be committed. Implement **dual-read** (check both paths,
   write only the new one) and leave it in for a few releases.
2. **`localStorage` keys `fleetlog.*` → `toliman.*`.** Eleven keys including
   `columbusWorkspace.v1`, `columbusArchives.v1`, `columbusBoard.v1.*`. **Dual-read with fallback** or
   users lose saved boards silently.
3. **Claim the namespaces now, before shipping.** There is no CLI yet, so `toliman` is unclaimed and
   free — reserve it on **npm, PyPI, Homebrew, GitHub org**, plus `toliman.com` / `.dev` / `.sh` /
   `.ai`. Squatters watch launch announcements.

**Do at leisure — cosmetic**

4. `frontend/package.json` name · `frontend/index.html` title · route `/fleetlog` ·
   `src/pages/fleetlog/` · `FleetlogPage.tsx` · `FleetlogTabMenus.tsx`
5. Header brand (purple `F` tile → `T`), avatar fallback `FL` → `TL`
6. `/* Fleetlog semantic colors */` in `src/index.css`; test temp-dir prefixes
   `fleetlog-codex-` / `fleetlog-claude-`
7. **tmux prefix** `fleetlog_<id>` → `toliman_<id>` in `vite/terminal.ts`. Scan **both** prefixes
   during the transition — the docs tell users to `tmux attach -t fleetlog_<id>` by hand, and live
   agent sessions must stay reachable.
8. Update the six `docs/` files that say Columbus or FleetLog.

### 44.5 Still open

1. **Trademark opinion, classes 9 and 42** — the Toliman Health filings (serials 88937292, 88937325).
   Different field of use, so likely survivable, but worth a professional read before printing
   anything. This is the one real risk left.
2. **Registry and domain verification** — blocked by the §36.0 tooling gap, not by any finding. Ten
   minutes of manual checks.

### 44.6 Closed

The search is over. Do not reopen it for a better word — §40.1's lesson applies to the whole process:
**the tell that a name is right is that it needs no modification.** Toliman needs none.

---

## 45. Recap lane — resume a session, read its history, extract insight

_Brief: something in the spirit of **recap** — resume a session and investigate history to gain
insight — but ownable and not widely used._

_Note the constraint shift: this lane is **not celestial**, so it drops the §41 "carries a Centauri
term" requirement. Worth deciding deliberately whether that requirement still binds._

### 45.1 The etymology closes an earlier loop

**Recap** ← **recapitulate** ← Latin *re-* + *capitulum*, "little head" — a **chapter heading**.

So *recapitulate* means **to go back through something by its chapter headings.** That is precisely
what this product does to a raw rollout log: the Turn Inspector and the digest derive headings from
JSONL so nobody has to read the raw stream.

And *capitulum* yields **`cap-`** — the root reached for three times in §38–§39 (capybara, Capya,
Capi). This lane serves that instinct with a real Latin foundation instead of a clip of an animal.

### 45.2 The candidates

**Most ownable**

| Name | Said | Meaning | Note |
|---|---|---|---|
| **Capsa** | CAP-sah | Latin: **the case that holds the scrolls** — the container for written records | Five letters, front-stressed, one reading, Figma-shaped, satisfies `cap-`, and almost certainly unclaimed. Best ownability in the lane |
| **Capitula** | cap-IT-yoo-lah | Latin: **the chapter headings** (plural) | **Best meaning in this entire document** — it is literally what the product manufactures from a log. Cost: four syllables |
| **Reckoner** | RECK-uh-ner | From *ready reckoner*, a reference table; and a **reckoning** is a formal account | Distinctive and ownable. Cost: folksy register, three syllables |
| **Recapa** | reh-CAP-ah | Direct Figma-ization of *recap* | Ownable by construction. Cost: visibly invented from "recap," which some read as unserious |

**Strong meaning, moderate ownability**

| Name | Said | Meaning | Note |
|---|---|---|---|
| **Retrace** | reh-TRACE | Go back over the path you took | Clean, precise, and it contains **`trace`** — the systems word. Best balance of clarity and ownability |
| **Recon** | REE-con | Reconnaissance: go look, then report back | Five letters, punchy, front-stressed, competent tone. Used in security and gaming, but no dominant devtool brand |
| **Debrief** | dee-BREEF | The structured session after an operation where you review what happened and extract lessons | Exact meaning — **and already your codebase's word**: the session inspector has a `DEBRIEF` panel and a "Copy handoff debrief" button, and the handoff packet's file is literally `brief.md`. Cost: common word, second-syllable stress |
| **Reprise** | ruh-PREEZ | To take up again; a musical return of a theme | Elegant, carries the *resume* half cleanly |
| **Rundown** | RUN-down | A summary — and it contains **`run`**, your unit of work | Front-stressed, plain. Cost: "rundown" also means dilapidated |

**Ruled out**

| Name | Why |
|---|---|
| **Recap** | Everyday word, unownable, and already generic in every product's UI |
| **Recall** | Microsoft Recall |
| **Capita** | **Capita plc** — FTSE-listed UK outsourcing giant |
| **Caput** | German *kaputt* — "broken, finished" |
| **Retro**, **Replay**, **Rewind** | Generic and heavily used |
| **Tally** | Ends in the `-ee` sound; rhymes with Centauri (§35.1) |
| **Recapo** | *Capo* — mafia boss / guitar clamp |

### 45.3 Read

**Capsa** is the answer to the brief as stated — ownable, short, front-stressed, one pronunciation, and
it means *the case where the records are kept*. It also quietly resolves the `cap-` thread: you get the
sound you like with a Latin foundation rather than a rodent.

**Retrace** is the answer if you want the meaning legible without an etymology lesson. "Retrace" needs
no explanation, and containing `trace` earns it a second reading from engineers.

**Capitula** has the best meaning of anything proposed across all 45 sections — *the chapter headings* —
and four syllables is the price. Worth saying aloud a few times before dismissing it; "Centauri
Capitula" is unexpectedly good.

**Debrief** deserves a mention it has not had: it is already the word your own product uses for this
exact function. Sometimes the name is sitting in the UI already.

### 45.4 The open question this lane raises

Two messages ago the brief required a Centauri/astronomical term; **none of these are celestial.** So
before going further: does the product name still need to belong to Centauri's world, or is
meaning-first now the priority? Toliman satisfies the first; Capsa and Retrace satisfy the second.
They are different bets and both are defensible — but not simultaneously.

---

## 46. Recap lane, deeper — manuscript scholarship, collation, provenance

_Three veins not yet worked: the full `capitulum` family, the vocabulary of **textual scholarship**
(which has exact words for comparing versions to establish what a text says — i.e. your consolidation
step), and **provenance**._

### 46.1 The find: Rubric

**A rubric was originally the red-lettered heading in a manuscript** marking where a section begins —
from Latin *rubrica*, the red ochre ink used for it. In modern use, a rubric is **the criteria you
evaluate against**.

Both meanings are this product:

- the **headings** that make a raw session log legible — the Turn Inspector and digest;
- the **standard** the Review component judges against, producing `approved` / `changes_requested`.

ROO-brik. Six letters, front-stressed, one pronunciation, no bad rhyme, `.rubric/` is a clean
dotfolder, `rubric run` types well. Used in education but with no dominant devtool brand. **Best
balance of meaning, sound, and ownability in this lane.**

### 46.2 The `capitulum` family, in full

*capitulum* → *capitulare* → **chapter** (via Old French *chapitre*). All one root.

| Name | Said | Meaning |
|---|---|---|
| **Capsa** | CAP-sah | The case holding the scrolls (§45) |
| **Capitula** | cap-IT-yoo-lah | The chapter headings, plural (§45) |
| **Capitulary** | cap-IT-yoo-lary | A Carolingian legal document **organized into numbered chapters**. Charlemagne's capitularies. Fullest form of the root; four syllables |
| **Caption** | CAP-shun | The short heading that tells you what you are looking at — exactly what the digest produces. Front-stressed, `cap-` satisfied. Cost: very common word |
| **Chapiter** | CHAP-ih-ter | Archaic form of *chapter*, also a column's capital. Obscure and distinctive |

### 46.3 Textual scholarship — words for reconciling versions

This is the vein worth mining, because scholarship already solved your consolidation problem and named
the parts.

| Name | Said | Meaning | Fit |
|---|---|---|---|
| **Collate** | koh-LATE | **To compare multiple versions of a text to establish what it says** | This *is* your consolidation step — two planners, two reviewers, one reconciled output. Everyday word, so instantly legible |
| **Recension** | reh-SEN-shun | The version of a text produced after examining all its manuscripts | Same idea in scholarly register; more ownable, nine letters |
| **Variorum** | vah-ree-OR-um | An edition that **preserves what every commentator said**, including all disagreements | The best metaphor anyone has produced for a multi-reviewer record with a `DISPUTES.md`. Four syllables is the price |
| **Concordance** | kon-KOR-dance | The exhaustive index of every occurrence in a text | Precise but long; "concord" also means agreement |
| **Palimpsest** | PAL-imp-sest | A manuscript scraped and rewritten **with the earlier text still visible** | Unbeatable image for layered agent history. Ten letters |
| **Colophon** | COL-uh-fon | The note at a manuscript's end recording **who made it, when, and how** | A production record, which is what a run artifact is |
| **Incipit** | IN-sip-it | "Here begins" — the opening words used to identify a manuscript | Front-stressed, distinctive, very ownable |
| **Glossa / Scholia** | — | Marginal explanation; accumulated annotation (§33) | Still valid |

### 46.4 Provenance

**Provenance** — PROV-uh-nance — is the documented history that establishes what something is and where
it came from. It is the **term of art in data lineage**, which means it reads as forward-looking
infrastructure rather than backward-looking record-keeping. That distinction is exactly what killed
Histora (§36.3).

Precise and respected; ten letters and three syllables is the cost. Related: **Lineage** (common in
data engineering), **Attestation** (too long), **Custody** (legal register).

### 46.5 Anamnesis

**Anamnesis** — an-am-NEE-sis — Greek for *recollection*; in medicine, **the history gathered from the
patient in order to understand the case.** Not the record for its own sake — the record *interrogated
for insight*, which is precisely the brief. Four syllables is the only objection, and it is a real one.

### 46.6 Coinages from these roots (most ownable route)

| Name | Said | From |
|---|---|---|
| **Rubra** | ROO-brah | Latin *rubrica* — **the red ink used to write chapter headings.** Five letters, Figma-shaped, front-stressed, one reading, almost certainly unclaimed. The physical substance of marking what matters in a record |
| **Rubrix** | ROO-brix | Brex-shaped variant; slightly 2010s with the `x` |
| **Collata** | koh-LAH-tah | From *collate* |
| **Capsara** | cap-SAR-ah | Extended *capsa* |

### 46.7 Warnings

| Name | Why not |
|---|---|
| **Redux** | Latin "brought back," perfect meaning, punchy — but **Redux is one of the best-known JavaScript state libraries.** Dead in devtools |
| **Retro / Postmortem** | The real engineering vocabulary for this, and therefore both generic and taken. Postmortem is also morbid |
| **Inquest** | Coroner's inquest — death connotation |
| **Varia** | `-ia` ending (§34.2) |
| **Provena** | Provena Health, Illinois |
| **Journal** | Genuinely triple-meaning — diary, the filesystem write-ahead log, `journalctl`, scholarly publication — but far too common to own |

### 46.8 Read

**Rubric** is the pick from this section: the heading that organizes *and* the standard you judge by,
in six front-stressed letters that need no etymology lesson.

**Collate** is the pick if you want the consolidation step named — it is the most accurate single verb
for what a multi-seat component does, and everyone already knows the word.

**Rubra** is the pick if ownability dominates: the red ink of chapter headings, five letters, clean,
and near-certainly free in every registry.

**Variorum** and **Palimpsest** will not be your name — both too long — but they are the two best
*images* in this document, and either would make an excellent name for a feature: the variorum view of a
multi-reviewer disagreement, the palimpsest of a session's revisions.

Running shortlist across §45–§46, ownable-first: **Rubra · Capsa · Rubric · Collate · Incipit**.

---

## 47. Rubric — hard blocker, and what survives

### 47.1 The blocker: Rubrik, Inc.

**Rubrik, Inc. (NYSE: RBRK)** — Palo Alto, ~3,100 employees, IPO'd April 2024, ~$187M quarterly revenue
growing 30% YoY. Enterprise data protection, cyber resilience, cloud data management. Flagship product
*Rubrik Security Cloud*, marketed with **"orchestrated application recovery"** and **"data threat
analytics."**

Why this ends bare **Rubric**:

- **Perfect homophone.** ROO-brik / ROO-brik. Indistinguishable in speech, which is where a product
  name lives.
- **Same industry.** Enterprise infrastructure software, sold to the same buyers through the same
  channels. This is not a distant-category coexistence case like Proxima Nova.
- **Their own copy uses "orchestrated."** The overlap is in positioning, not just letters.
- **Enforcement capacity.** A public company at that scale holds broad class 9 and 42 registrations and
  has counsel to defend them. No attorney would clear this.

Add **Rubrix** and any `-ik`/`-ix` respelling to the same grave: they all collide phonetically.

### 47.2 The idea that survives, and it is the best part

The etymology contains something worth keeping regardless of the name.

In a **missal**, the **rubrics are printed in red** and are the *instructions* — what the priest must
**do**. The **black text is what he says** — the content. Red directs; black performs.

> **Deterministic control code is the red text. The agents produce the black text.**

That is an exact description of the §2.3 architecture: trigger code composes and directs, agents write
the actual work product. It is a genuinely good positioning line — *"the red text that drives the
black"* — and it survives whatever the product ends up being called.

### 47.3 Family members that escape the homophone

| Name | Said | Why it clears Rubrik | Meaning |
|---|---|---|---|
| **Rubra** | ROO-brah | Different final syllable; not a homophone | Latin *rubrica* clipped — **the red ink used to write chapter headings.** Five letters, front-stressed, one reading, Figma-shaped, near-certainly unclaimed. Best ownability in the family |
| **Rubrica** | roo-BREE-kah | Three syllables, stress on the second — phonetically distinct | The full Latin. Elegant, Italian/Spanish-feeling. Cost: three syllables and a foreign shape |
| **Rubicon** | ROO-bih-con | Shares the *ruber* root (**"red river"**) but sounds nothing like Rubrik | **The point of no return.** Caesar's crossing. Your Publish component is precisely the irreversible outward-facing step behind a human gate — this names it. ⚠️ Crowded: Rubicon Project (ad tech, now Magnite), Rubicon Technologies (waste), Jeep Wrangler Rubicon. All different categories, so coexistence is plausible |
| **Rubricate** | ROO-brih-kate | Distinct | **A rubricator was the specialist scribe who came after the main scribe and added the red headings.** A second pass over a document to mark its structure — literally what your digest does to a log. Nine letters is the cost |
| **Minium** | MIN-ee-um | Unrelated sound | The red lead pigment used for rubrication — and the origin of the word **"miniature."** Obscure but pretty |

### 47.4 Adjacent finds in the same semantic space

Not from *rubric*, but from the same idea — *the heading you look things up by, the order things happen
in*:

| Name | Said | Meaning |
|---|---|---|
| **Lemma** | LEM-ah | In lexicography, the **headword** of a dictionary entry; in mathematics, a supporting proposition; in NLP, the canonical form of a word. **Real technical vocabulary in three fields, all meaning "the canonical heading you retrieve by."** Five letters, front-stressed, one reading, Figma-shaped. Strong find |
| **Ordo** | OR-doh | The liturgical **order of service** — the document specifying what happens in what sequence. **An ordo is a workflow definition.** Four letters. ⚠️ Some far-right adjacency ("ordo ab chao") — check before committing |
| **Ordinal** | OR-dih-nal | Indicating order and position. Clean, front-stressed, mathematical |
| **Canon** | KAN-un | The authoritative list — and canon law was the rubricated text *par excellence*. ⚠️ Canon the camera company |

### 47.5 Recommendation

**Rubra** if you want the rubric idea and maximum ownability: five letters, one reading, the red ink
itself, and almost certainly free in every registry. It keeps everything you liked about Rubric and
sheds the public company.

**Rubicon** if you want meaning over safety: it shares the red root, it means *the irreversible
decision*, and it names the one moment in your pipeline that genuinely deserves a human gate. Crowded
but not fatally — all the existing users are in unrelated categories.

**Lemma** if you are willing to leave the rubric family: it is the cleanest short word in this section,
it is real vocabulary in three technical fields, and every one of those meanings is *the canonical
heading you retrieve by* — which is what this product manufactures.

Updated shortlist: **Rubra · Lemma · Rubicon · Capsa · Toliman**.

---

## 48. Verbatim lane

### 48.1 Why the idea is right

**Verbatim** — Latin *verbatim*, "word for word," from *verbum*, word. Exactly as it was said, without
alteration.

**It is already your own design vocabulary.** The cross-agent fork plan §6.1 specifies that errors,
failed commands, non-zero exits, `AskUserQuestion` answers and plan approvals are kept **verbatim**,
because they are the only parts of a session that cannot be re-derived from the working tree. Verbatim
is the *fidelity guarantee* the handoff packet makes: pointers for what is reproducible, exact words for
what is not.

That is a genuinely earned tie — the same class as **seat** (§37.2) and **debrief** (§45.2), where the
right word was already sitting in the product.

### 48.2 Why the bare word is out

**Verbatim** is one of the most recognisable storage-media brands of the last fifty years — floppy
disks, CDs, DVDs, USB drives — and it sits squarely in **class 9, computer hardware and media**. Decades
of continuous use, global recognition, and the same class you would file in. Not survivable.

### 48.3 The variations

**Recommended**

| Name | Said | From | Why |
|---|---|---|---|
| **Verba** | VER-bah | Latin *verba* — **"the words"** | The obvious answer. Five letters, front-stressed, one reading, Figma-shaped, hard stops that survive bad audio. Carries the full meaning of verbatim with none of the brand. Most ownable in the family |
| **Steno** | STEN-oh | *stenography* — shorthand | Different root, **exact same job**: a stenographer produces the verbatim record of proceedings. Five letters, clean, front-stressed, competent tone. No dominant devtool brand |
| **Verbim** | VER-bim | Invented from *verbatim* | Six letters, front-stressed, one reading, obviously derived but not a real word — so highly ownable. Middle ground between Verba and a pure coinage |
| **Hansard** | HAN-sard | The **verbatim record of UK parliamentary debates**, named for Thomas Hansard | A Hansard is literally *the canonical exact transcript of a deliberative body's proceedings* — remarkably precise for a product recording multi-agent deliberation and decisions. Seven letters, one reading. Cost: distinctly British, and a proper noun |
| **Verbata** | ver-BAH-tah | *verbatim* + `-a` | Clearly derived, three syllables, ownable. Softer than Verbim |
| **Ipsa** | IP-sah | Latin *res ipsa loquitur* — "the thing itself speaks" | **"The thing itself"** — the record as it actually was, not as summarised. Four letters, clean, very ownable. ⚠️ IPSA is an acronym in a few fields |

**Ruled out**

| Name | Why |
|---|---|
| **Verbatim** | The storage-media brand — class 9, global, decades of use |
| **Verbum** | "-bum" in English |
| **Verbose** / **Verbiage** | Both negative in engineering — verbose logging means *too much* |
| **Verbal** | Implies spoken-not-written; wrong signal for a written record |
| **Verb** | Very common word, and Verb Technology is publicly traded |
| **Verbix** | An existing verb-conjugation tool |
| **Litera** | Beautiful fit (*ad litteram* = to the letter) but **Litera** is an established legal-document software company |
| **Scribe** | Exactly right in meaning, but **Scribe** (scribehow.com) is a well-known documentation product |
| **Verity** | Heavily used, and ends in the `-ee` sound that rhymes with Centauri (§35.1) |
| **Dicta** | Perfect meaning (*obiter dicta* = recorded remarks); opens with "dick-" (§34.4) |
| **Sic** | The exactness marker itself, but three letters and unfortunate homophones |

### 48.4 Read

**Verba** is the pick. It is the shortest, cleanest, most ownable word that carries the whole idea —
*the words, exactly as they were* — and it passes every gate in §34 without a caveat. "Centauri Verba"
scans well: three syllables then two, different vowel shapes, no rhyme with the parent, no consonant
tangle. `verba run`, `.verba/`.

**Steno** is the pick if you want the *role* rather than the *artifact* — the one who takes down every
word as it is said. It is arguably the more vivid image, and equally clean mechanically.

**Hansard** is the interesting outsider: no other candidate in 48 sections has meant "the official
verbatim record of a deliberating body," which is precisely what a multi-seat run produces. Worth saying
aloud before dismissing it as too British.

Updated shortlist: **Verba · Steno · Rubra · Lemma · Capsa · Toliman**.

---

## 49. Lemma — blocked, and the idea worth rescuing

### 49.1 The blocker

**Lemma** (YC Fall 2025, founders Jerry Zhang and Cole Gawin) is *"an observability and evaluation
platform built for AI agents,"* sold to engineering teams shipping AI features. Active, funded,
shipping. Their handle is **`uselemma`** — the `use-` prefix is what founders reach for when the bare
name is gone, so `lemma.com` was unavailable even to them.

Also in the space: a second **Lemma** doing consumer-brand AI insights, and **Lemma** from ThreadAI.

Why this is worse than a normal collision:

- **Same category** — AI agent observability, which is half of what you do.
- **Same buyer** — engineering teams.
- **Same accelerator** — YC, like Centauri AI. Being the second YC company with the name, in an
  adjacent category, is awkward socially as well as legally.

**Do not take near-variants either.** *Lemmata*, *Lemna*, and *Analemma* all carry "lemma" audibly.
Proximity to a same-category competitor is worse than distance from a different-category one — the
opposite of the Proxima Nova situation.

### 49.2 What I undersold: the mathematical meaning

Last section I described a lemma as a lexicographic headword. That is the weak reading. The strong one:

> In mathematics, **a lemma is a subsidiary result proved on the way to a main theorem** — a stepping
> stone established so that later work can stand on it. From Greek *λῆμμα*, "that which is taken or
> received," from *lambanein*, to take.

**That is the component model exactly.** Each component produces a declared, validated artifact that
the next component *receives* and builds on. `PLAN.md` is a lemma. `REVIEW.md` is a lemma. The merged
PR is the theorem. **The run folder is a chain of lemmas.**

This is the best conceptual fit found in 49 sections. The word is gone; the idea is not.

### 49.3 Words that carry the idea without the collision

| Name | Said | Why |
|---|---|---|
| **Cairn** | KAIRN | **A stack of stones marking a route, built up by successive travellers who each add one.** That is your architecture as a physical object — and it is the **stigmergy** idea from §7.4 made concrete: coordination through marks left in a shared environment rather than through conversation. Five letters, clean, `cairn run` and `.cairn/` both work. ⚠️ Cairn Energy (oil & gas), Cairn Terrier, cairn.info — all unrelated categories |
| **Corollary** | KOR-uh-lary | What follows necessarily from what was already established. Four syllables is the cost |
| **Axiom** | AX-ee-um | The foundation everything is built from. Five letters, punchy, front-stressed. ⚠️ Crowded — Axiom Space, Axiom Zen, others |
| **Vestige** | VES-tij | The trace remaining that shows what was there. Clean, distinctive. Slightly melancholy register |
| **Waypoint** | WAY-point | A marked position on a route. ⚠️ HashiCorp Waypoint |
| **Blaze** | BLAYZ | The mark cut into a tree to show the trail. ⚠️ Heavily used in tech |

**Cairn** is the pick. It carries the whole lemma idea — *each stage leaves a durable marker the next
one builds on* — with a concrete image, five letters, and no devtools collision.

### 49.4 The pattern worth noticing

Histora, Capya, Capi, Rubric, and now Lemma: **every word chosen for how well it describes the product
has turned out to be taken by someone describing the same product.** That is not bad luck. Good
descriptive names in a hot category are the first ones claimed — and AI agent tooling is the hottest
category there is right now.

The names that have survived every screen are the ones that are **available by construction**:

> **Rubra · Verba · Capsa · Toliman · Cairn**

Four are real words nobody in software has reached for, and one is a star. That is the lane where a
name can actually be owned in 2026. It may be worth committing to it rather than continuing to test
descriptive candidates one at a time — each of which costs a screening round and, so far, has ended
the same way.

---

## 50. Session Lib — naming the library of agent sessions

_New framing: the product is **a library for coding-agent run sessions.** Names that directly mean
that._

### 50.1 Why the framing is strong

Two things it gets right that earlier framings missed:

1. **A library is not a pile.** What makes a collection a library is that it is **indexed, preserved,
   and retrievable** — which is exactly the value the product adds over raw `~/.claude` JSONL. The
   name should carry *retrieval*, not just storage.
2. **`lib` has a second meaning in dev-speak** — reusable things you import. Board presets, starter
   workflows, and the component catalogue are literally a library in that sense too. The double
   reading is real, not a stretch.

As positioning, *"the library for coding agent sessions"* is a clean category claim. Per §36.3, put it
in the tagline whatever the name turns out to be.

### 50.2 The names

**Most ownable**

| Name | Said | Meaning |
|---|---|---|
| **Theca** | THEE-kah | Greek for **case, sheath, repository** — it is the `-theca` in *biblio-theca*, the book-case. Five letters, front-stressed, one reading, Figma-shaped, and almost certainly unclaimed in software. Literally means "the container that holds the collection." ⚠️ Minor anatomical/botanical use |
| **Athenaeum** | ath-uh-NEE-um | **A library and reading room.** Distinctive, elegant, institutional in a good way. Cost: four syllables |
| **Trove** | TROHV | **A valuable collection, accumulated and found.** Five letters, one reading, warm. Directly means "a rich store worth digging through." ⚠️ Trove was a game; moderate general use |
| **Accession** | ak-SESH-un | The archival term for **taking a record into the collection and giving it a permanent ID.** Every session gets accessioned. Precise; nine letters, second-syllable stress |

**Most directly meaningful**

| Name | Said | Meaning |
|---|---|---|
| **Corpus** | COR-pus | **The collected body of texts you work with** — real term of art in linguistics and ML. Six letters, front-stressed, one reading. Says "the whole collection, ready to be queried." ⚠️ Generic in ML; faint "corpse" adjacency aloud |
| **Archive** | AR-kive | The most direct English word: curated, preserved, retrievable records. ⚠️ Extremely common — Internet Archive, Apache Archiva, `git archive`, `tar`. Hard to own alone, but **"Centauri Archive"** works as a two-word product name |
| **Biblio** | BIB-lee-oh | Clipped *bibliotheca*. Clear and clean, slightly bookish/dusty |
| **Fonds** | FON | Archival term for **the entire body of records created by one source, kept together** — precisely a session library. Too odd-sounding in English to ship |
| **Curator** | KYOOR-ay-tor | The one who tends a collection. Warm, but common |

**Great meaning, use as feature names**

| Name | Why |
|---|---|
| **Scriptorium** | The monastery room where manuscripts were **copied and preserved**. Five syllables — too long for a product, perfect for the archive view |
| **Muniment** | The room where an institution's deeds and records are kept |
| **Stacks** | The shelving where a library's collection actually lives. ⚠️ Overloaded in tech |

### 50.3 Ruled out

| Name | Why |
|---|---|
| **Repository / Repo** | Literally means "a place where things are stored" — and therefore permanently confusable with git repos in this exact product |
| **Vault** | HashiCorp Vault |
| **Depot** | Depot.dev is an active CI/build company |
| **Codex** | OpenAI |
| **Cache** | Core computing vocabulary; unownable |
| **Thesaurus** | Originally Greek for *treasure-house of knowledge* — lovely, but now means synonym dictionary |
| **Seance** | French *séance* literally means "a sitting," i.e. a session — charming etymology, unusable connotation |
| **Dewey** | Proper-noun baggage |

### 50.4 Read

**Theca** is the pick for ownability: it is the actual Greek root for *the case that holds the
collection*, it is five letters, front-stressed, unambiguous, and no one in software has taken it.
"Centauri Theca" scans cleanly, `theca run` and `.theca/` both work.

**Corpus** is the pick for immediate legibility to your buyer: engineers and ML people already use it
to mean "the body of material you query," which is exactly what a session library is. The cost is that
it is generic enough that you would be claiming a common noun.

**Athenaeum** is the pick if you want gravitas and do not mind four syllables. Nothing else here sounds
as much like an institution that keeps things safe.

**Archive** is the honest default — it says the thing plainly, and "Centauri Archive" is a perfectly
good product name even though "Archive" alone could never be owned.

Updated shortlist: **Theca · Corpus · Trove · Rubra · Verba · Capsa · Cairn · Toliman**.

---

## 51. Verified availability check — 2026-07-29

_Method: `registry.npmjs.org/<name>` — empty response = 404 = available; JSON payload = taken.
Validated against controls (`react`, `lodash` both returned full payloads). Product-space checked by
search._

### 51.1 npm results

**My earlier proposals — two are dead**

| Name | npm | Finding |
|---|---|---|
| **Rubra** | ✅ **free** | And **no notable product-space use found anywhere.** Cleanest name in this document |
| **Toliman** | ✅ **free** | Plus the §42 healthcare trademark to clear |
| **Theca** | ✅ free | ⚠️ But **theca.com is a live AI company** — *"AI solutions that find and explain your important information,"* enterprise search / RAG / decision support **on your own data.** Adjacent category, owns the `.com`. Also Theca Capital. **Compromised** |
| **Capsa** | ✅ free | ❌ **Out.** Four tech uses: **Capsa Network Analyzer** (Colasoft packet analyzer), **Capsa** by Themis AI (ML output reliability), Capsa Technology (fintech, Techstars), Capsa Healthcare (60 years) |
| **Verba** | ❌ **TAKEN** | `verba@2.9.0` — **a Node logging library**, actively maintained. Adjacent category. Out |
| **Cairn** | ❌ taken | `cairn@0.8.0` — React Native styling, last published 2017. Dormant but the package name is gone |
| **Trove** | ❌ taken | `trove@0.1.0` (2016) — *"a simple tool for stashing and grabbing files,"* **and it ships a `bin` called `trove`**, so the CLI name is taken too |

**Your ten — all clear on npm**

`sesslib` · `libsession` · `librun` · `sessionfolio` · `sessfolio` · `sessionarchive` · `sessarchive` ·
`sessvault` · `sessiondex` · `sessdex` — **every one returned 404.** All publishable today.

One exception on meaning: **Libsession is taken in open source.** **libsession / libsession-util** is the
real core library of **Session**, the encrypted messenger (session-foundation on GitHub). npm is clear,
the name is not. Drop it.

### 51.2 The finding that matters: available ≠ ownable

You asked whether you can *own the IP*. On npm, yes — all ten are free. As intellectual property, **no,
and the reason is structural.**

US trademark strength runs on a spectrum:

| Band | Protection | Examples from your list |
|---|---|---|
| **Generic** | Never protectable | "Session Library" for a session library |
| **Descriptive** | Weak — unregistrable without ~5 years of acquired distinctiveness | **Sessionarchive, Sessarchive, Sessvault, Sessiondex, Sessfolio, Sesslib, Librun** |
| **Suggestive** | Protectable | Hints at the benefit without describing it |
| **Arbitrary** | Strong | **Rubra, Toliman** — real words unrelated to the product |
| **Fanciful** | Strongest | Invented words (Kodak, Xerox) |

**All ten of your names sit in the descriptive band.** "Session Archive" for a product that archives
sessions is textbook descriptive. You can publish the package tomorrow — and you cannot stop a
competitor launching "SessionVault" next month, because nobody gets a monopoly on plain description.

**The very thing that makes them free on npm is what makes them unownable: nobody claims generic
compounds because they are not worth claiming.**

### 51.3 Brand read on the ten

Beyond the legal point, three craft problems:

1. **`Sess-` is not a morpheme.** It is not a recognisable clip the way `lib` or `dev` is, and it reads
   as a hiss. Six of your ten open with it.
2. **Two descriptors welded together reads as internal tooling**, not a product — the same register
   problem §40.2 identified in CenCapi. "Sessionarchive" sounds like a database table.
3. **Length.** Sessionarchive (14) and Sessionfolio (12) fail your own "not too long" brief.

Best of the ten, if you go this way: **Sessdex** — shortest, most name-like, and `-dex` carries energy
(index, Pokédex). Runner-up **Librun** — the only non-`sess` option, six letters, and *run* is your
actual primitive.

### 51.4 Still unverified

Domains (no DNS from this environment), PyPI, GitHub orgs (two fetches timed out), USPTO.

**GitHub matters less than you think:** you would ship as `github.com/centauri-ai/<product>`, not
`github.com/<product>`. The org is Centauri. Only npm and the domain are real constraints.

### 51.5 Recommendation

**Rubra.** It is the only candidate that is simultaneously free on npm, absent from the product space,
pronounceable on sight, five letters, and — critically — **arbitrary rather than descriptive, so it is
actually registrable and defensible.** It also carries real meaning once told: *rubrica*, the red ink
used to write chapter headings in a manuscript (§47).

**Toliman** remains the alternative if the Centauri tie matters more than a clean trademark path; npm is
free, and the healthcare mark is a $2k question.

If you want the descriptive framing anyway, **put it in the tagline, not the name** — *"Rubra: the
library for coding agent sessions."* You get the clarity for free and keep a mark you can defend.

---

## 52. The Claude pattern

### 52.1 Decoding it

Five elements, and the first is the one people miss:

1. **It is a given name, not a surname.** Claude, Harvey, Devin, Sierra, Clay, Ada, Alexa, Siri —
   every successful AI product name in this style is a first name, a place, or an object. **Never a
   surname.** See §52.2 for why that is not an accident.
2. **It is arbitrary relative to the product.** "Claude" says nothing about language models. That puts
   it in the strongest trademark band (§51.2) — the opposite of Sessvault.
3. **It is personable.** You can say *"ask Claude," "Claude thinks," "Claude caught it."* Exactly right
   for something you delegate work to and then check on — which is your product's entire relationship
   with the user.
4. **It is slightly out of fashion.** Claude is not a top-100 baby name. Distinctive rather than
   generic, and it reads as considered rather than trendy.
5. **A backstory is available but optional.** Widely read as **Claude Shannon**, father of information
   theory; Anthropic has never confirmed it. The story is there if you want it and costs nothing if
   you don't. That is elegant, and worth copying.

### 52.2 The legal detail that decides the shortlist

Under **Lanham Act §2(e)(4)**, a mark that is *"primarily merely a surname"* is **refused registration**
without proof of acquired distinctiveness. Given names carry no such bar.

This quietly rules out the obvious moves:

| Surname (refusable) | Given name (registrable) |
|---|---|
| Leavitt, Herschel, Hopper, Babbage, Kepler, Shannon, Panizzi, Otlet, Avram | **Tycho**, **Vannevar**, Hypatia, Henrietta, Caroline |

**If you copy Claude, copy the whole move: pick a first name.**

### 52.3 Candidates, and who they were

Filtered for: a person whose actual work was *keeping records so that insight could be extracted from
them* — the Claude Shannon logic applied to your product rather than to language models.

| Name | Said | Who | npm |
|---|---|---|---|
| **Tycho** | TY-ko | **Tycho Brahe** kept the most meticulous astronomical observation logs in history and never derived a law from them. **Kepler did — from Tycho's records.** *The record that made the insight possible* is your product in one sentence. A given name, and celestial, so it house-fits Centauri | ⚠️ taken — see §52.4 |
| **Leavitt** | LEV-it | **Henrietta Leavitt** found the period–luminosity relation — the cosmic distance ladder — by *cataloguing thousands of variable stars*. She found the law hidden inside a giant catalogue of observations | ✅ **free** — but a **surname** (§52.2) |
| **Vannevar** | van-NEE-var | **Vannevar Bush**, "As We May Think" — the **Memex**, a machine for storing all your records with associative trails between them. The direct ancestor of this product | ⚠️ taken by a 142-byte package literally described as `"placeholder"` |
| **Hypatia** | hy-PAY-shah | Alexandrian scholar; edited and preserved the mathematical texts that survived | Not checked; four syllables |

**Do not use Dewey.** Melvil Dewey is the obvious librarian namesake and a genuine reputational
landmine: documented history of sexual harassment and antisemitism, and the American Library
Association stripped his name from its highest award in 2019.

**Avram is out** on a nice irony: `avram@0.6.12` is *"Validation with Avram Schema Language"* by the
German library network GBV — active, ships a `bin`, and is itself named after Henriette Avram. The
namesake is already claimed in exactly this domain.

### 52.4 The Tycho npm situation is better than it looks

`tycho@0.0.1` — *"a real-time multiplayer game framework for node.js"*, published **2012**, targeting
**Node 0.6**, never updated past `0.0.1`. Thirteen years abandoned.

Two things follow:

- **The package manifest has no `bin` field.** So the *command* `tycho` is unclaimed, even though the
  package name is not. Your CLI can be `tycho` on day one.
- **Ship as a scoped package** — `@centauri-ai/tycho` — which is standard practice now and costs
  nothing. Optionally file an npm name dispute for the abandoned bare name later.

### 52.5 Recommendation

**Tycho**, and it now has four independent arguments behind it:

1. **Celestial** — house-fits Centauri without rhyming with it (§35.6).
2. **The story is the product.** Tycho kept the records; Kepler found the laws in them. That is exactly
   what you promise: the accumulated session record is where the insight comes from.
3. **It is a given name**, so it clears the §2(e)(4) surname bar that would trip Leavitt, Herschel, and
   every other obvious candidate.
4. **Two syllables, front-stressed, one pronunciation, five letters**, `tycho run`, `.tycho/`.

⚠️ Known collisions: **Tycho** the electronic musician (well known but a different class), and Tycho
Station in *The Expanse*. Neither is enterprise software. Worth a proper §8 screen — domains and
USPTO classes 9 and 42 — before committing.

**Leavitt** is the alternative if you prefer the story of *finding the law inside the catalogue* and are
willing to fight a surname refusal or operate on unregistered common-law rights. npm is genuinely free,
which counts for something.

Board now: **Tycho · Rubra · Toliman**.
