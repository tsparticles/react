# Phase 1: Core API & Type Contracts - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-10T12:00:00Z
**Phase:** 01-core-api-type-contracts
**Areas discussed:** Version baseline and upgrade direction, Public API contract stability, Type contract modernization, Modern syntax migration, Compatibility guardrails

---

## Version baseline and upgrade direction

| Option                      | Description                                                       | Selected |
| --------------------------- | ----------------------------------------------------------------- | -------- |
| Latest stable deps only     | Prioritize stable channels for all dependencies                   |          |
| Latest viable + beta engine | Keep ecosystem fresh while following active tsParticles beta line | ✓        |
| Conservative patch updates  | Minimize change set to patch/minor only                           |          |

**User's choice:** Latest viable + beta engine line for tsParticles
**Notes:** User specified that tsParticles packages use `4.0.0-beta` under active development and Phase 1 should update to latest versions.

---

## Public API contract stability

| Option                       | Description                                                           | Selected |
| ---------------------------- | --------------------------------------------------------------------- | -------- |
| Keep current API shape       | Preserve `Particles`, `initParticlesEngine`, and options/url patterns | ✓        |
| Introduce major API redesign | Reshape exports and consumer contracts now                            |          |
| Hybrid with deprecations     | Add new APIs and mark old ones deprecated                             |          |

**User's choice:** Keep current API shape while modernizing internals
**Notes:** Scope is core contracts and modernization, not a breaking redesign.

---

## Type contract modernization

| Option                  | Description                                              | Selected |
| ----------------------- | -------------------------------------------------------- | -------- |
| Additive type hardening | Improve signatures and safety without breaking consumers | ✓        |
| Strict retyping         | Tighten types even if it requires consumer rewrites      |          |
| Minimal/no type updates | Focus only on dependency bumps                           |          |

**User's choice:** Additive type hardening
**Notes:** Type improvements should align with modern syntax migration and preserve compatibility.

---

## Modern syntax migration

| Option                      | Description                                                         | Selected |
| --------------------------- | ------------------------------------------------------------------- | -------- |
| Internal modernization only | Refactor internals to modern patterns with stable external behavior | ✓        |
| Broad style rewrite         | Rewrite across all apps/templates now                               |          |
| Defer modernization         | Keep current style and postpone to later phases                     |          |

**User's choice:** Internal modernization in Phase 1
**Notes:** Keep effort focused on core package; demos/templates have dedicated later roadmap phases.

---

## Compatibility guardrails

| Option                        | Description                                                      | Selected |
| ----------------------------- | ---------------------------------------------------------------- | -------- |
| Preserve compatibility ranges | Keep broad peer support and verify against existing integrations | ✓        |
| Narrow supported matrix now   | Reduce supported versions immediately                            |          |
| Decide later                  | Skip compatibility policy in this phase                          |          |

**User's choice:** Preserve ranges and verify as part of Phase 1 planning
**Notes:** Detailed runtime hardening remains in Phase 2, but API/package compatibility must remain intact.

---

## the agent's Discretion

- Refactor ordering across `components/react/lib/*`
- Specific internal syntax choices that do not alter public contracts

## Deferred Ideas

- Full runtime behavior hardening and edge-case policy expansion (Phase 2)
- Full docs/demo/template synchronization (Phases 3 and 4)
