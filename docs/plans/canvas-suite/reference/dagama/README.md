# DaGama Canvas

_Implementation specs for the component workflow described in
[`../columbus-canvas-findings.md`](../columbus-canvas-findings.md). Rev. 2026-07-29._

Columbus Canvas is a **freeform** board: the user places prompts, specs, notes, agent terminals and
log viewers, wires them by hand, and copies context between agents themselves. It stays as-is.

DaGama Canvas is an **automatable Canvas**: the same agent-session composition (large terminal +
connected prompt + info card) for each seat, chained by a deterministic controller. The user
configures stages and control boundaries once, supplies a source, and presses **Run**. Validated
artifacts advance the pipeline while every seat remains a real CLI the user can open, steer, take
over, and hand back.

> Configure the work and its control boundaries at the beginning; DaGama then advances from source to
> reviewed result without manual handoffs, while every agent stays visible, editable, and directly
> usable — Canvas composition, workflow automation.

## The documents

| #                            | Document       | Contents                                                                             |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| [01](./01-spec.md)           | Product spec   | Scope, the six components and their contracts, artifact schemas, lifecycle states    |
| [02](./02-architecture.md)   | Architecture   | Controller, durability model, run storage, execution adapters, git worktree, publish |
| [03](./03-ui.md)             | UI spec        | Seat clusters (terminal + prompt + info), compact gate cards, run dialog             |
| [04](./04-fork-map.md)       | Fork map       | What DaGama copies from Columbus, what it shares, and every collision rule           |
| [05](./05-build-plan.md)     | Build plan     | Independently demoable milestones, in order, with exit criteria                      |
| [06](./06-decisions.md)      | Decisions      | Each decision, its rationale, and the alternatives rejected                          |
| [07](./07-open-questions.md) | Open questions | What is deliberately unresolved and which spike answers it                           |
| [08](./08-build-review.md)   | Build review   | Big-picture M0–M1 assessment, fixes made, verification, and remaining scope          |
| [09](./09-feature-test-plan.md) | Feature test plan | Manual acceptance checklist mapped to v1 definition of done                       |
| [10](./10-feature-issues.md) | Feature issues | Issues found against the test plan, with fixes recorded                        |

## v1 in one page

Six components in a fixed line, one seat each, one gate:

```text
Intake ──▶ Plan ──▶ Build ──▶ Verify ──▶ Review ──▶ [approve] ──▶ Publish
                      ▲          │           │
                      └── failed ┘           └── changes requested
```

**Load-bearing invariants** (violating any of these is a bug, not a preference):

1. A run never mutates the user's active worktree. It owns its own git worktree.
2. A component succeeds only when its execution reached a terminal state **and** every required
   output validated. Exit code 0 with a missing artifact is a failure.
3. Completion is read from a durable exit record the agent's own shell wrote — never from terminal
   liveness, transcript quietness, or a confident final sentence.
4. Every agent seat exposes its real CLI. There is no headless-only agent.
5. Review approval applies to exactly one change revision, identified by a controller-computed patch
   hash. Any later edit invalidates it.
6. Publishing is gated, idempotent, and opens at most one PR per run.
7. Source text and upstream artifacts are untrusted data. They can steer implementation choices; they
   cannot grant permissions, drop required outputs, or skip a gate.

**Deliberately not in v1** — see [06-decisions.md](./06-decisions.md) for why each is deferred:
multi-seat fan-out and thorough mode, partitioned or bake-off Build, Linear/Jira connectors, a generic
component builder, a trigger-wire editor, run cost budgets, and cross-vendor handoff packets inside a
run.
