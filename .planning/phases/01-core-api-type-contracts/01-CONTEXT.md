# Phase 1: Core API & Type Contracts - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver and validate a stable, typed React API surface for `@tsparticles/react` so users can render/configure particles with predictable contracts. This phase is limited to core API and typing decisions (not docs/demo/template completion phases).

</domain>

<decisions>
## Implementation Decisions

### Version Baseline and Upgrade Direction

- **D-01:** Phase 1 prioritizes updating core dependencies and package metadata to current stable ecosystem baselines where safe, while keeping compatibility ranges broad enough for existing consumers.
- **D-02:** `@tsparticles/engine` 4.0.0 beta line is the canonical target for this phase because it is the actively developed upstream for this project.
- **D-03:** Upgrades must happen with monorepo alignment in mind: library package first (`components/react`), then immediate compatibility checks against existing consumers in `apps/*` and `templates/*`.

### Public API Contract Stability

- **D-04:** Keep the existing public surface centered on `Particles` default/named export and `initParticlesEngine` as the primary initialization entrypoint.
- **D-05:** Preserve support for both `options` object and `url` config input paths in `IParticlesProps` and runtime behavior.
- **D-06:** Any API-shape changes in this phase should be additive/compatible; breaking removals are explicitly out of scope for Phase 1.

### Type Contract Modernization

- **D-07:** Keep TypeScript-first contracts explicit (`Engine`, `Container`, `ISourceOptions`) and modernize signatures only where it improves safety without forcing consumer rewrites.
- **D-08:** Strengthen type clarity around callbacks (`particlesInit`, `particlesLoaded`) and exported contracts so users get predictable IntelliSense and compile-time validation.

### Modern Syntax and Internal Cleanup

- **D-09:** Migrate internal implementation toward more modern, consistent TypeScript/React syntax patterns while preserving behavior.
- **D-10:** Prefer codebase-consistent patterns already used in `components/react/lib` (typed exports, explicit async flows, guarded cleanup) over introducing new stylistic patterns unique to this phase.

### Compatibility Guardrails

- **D-11:** Treat React compatibility (`>=16.8.0 <20` currently) as a contract to preserve unless a deliberate policy change is explicitly documented.
- **D-12:** Package entry points and export behavior must remain consumable by modern bundlers; compatibility hardening in runtime edge cases is deferred to Phase 2.

### the agent's Discretion

- Exact refactor sequencing inside `components/react/lib/*` as long as public behavior and types remain stable.
- Internal naming/style cleanups that do not alter exported API shape.
- Choice of additive typing improvements that maintain backward compatibility.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Scope and Requirement Mapping

- `.planning/ROADMAP.md` — Defines Phase 1 goal, requirement mapping (`CORE-01..05`, `TYPE-01..02`), and success criteria.
- `.planning/REQUIREMENTS.md` — Source of testable requirement contracts for this phase.
- `.planning/PROJECT.md` — Product-level constraints and non-goals (React-focused wrapper, compatibility-first posture).

### Current Core API Implementation

- `components/react/lib/index.ts` — Export surface and `initParticlesEngine` contract.
- `components/react/lib/Particles.tsx` — Primary runtime component behavior and loading lifecycle.
- `components/react/lib/IParticlesProps.ts` — Public prop/type contract.
- `components/react/lib/ParticlesProvider.tsx` — Shared-engine provider/hook API used by consumers.

### Packaging and Version Policy Inputs

- `components/react/package.json` — Current peer/dependency ranges and package publishing metadata.
- `.planning/codebase/STACK.md` — Baseline version landscape and existing drift signals.
- `.planning/codebase/CONVENTIONS.md` — Existing code-style and module conventions to preserve while modernizing.

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `components/react/lib/index.ts`: Existing stable barrel/export file for public API; best anchor point for contract-preserving changes.
- `components/react/lib/IParticlesProps.ts`: Single source for consumer-facing props typing.
- `components/react/lib/ParticlesProvider.tsx`: Existing optional advanced integration path (shared engine init) that can remain compatible while core contracts evolve.

### Established Patterns

- Dynamic engine import and async init flow is already standardized (`import("@tsparticles/engine")` in core files).
- Cleanup and lifecycle guarding patterns exist (`unmounted`/`mounted` guards, `containerRef.current?.destroy()`).
- Public API currently favors a thin wrapper model over heavy abstraction; this aligns with project direction.

### Integration Points

- Package contract updates originate in `components/react/lib/*` and `components/react/package.json`.
- Compatibility validation can be checked quickly through existing consumers in `apps/react`, `apps/react-vite`, `apps/nextjs`, and `apps/nextjs-beta`.
- Template alignment is downstream and should be considered as compatibility smoke checks only in this phase (full template work is Phase 4).

</code_context>

<specifics>
## Specific Ideas

- Primary objective for this phase is to update core dependencies/contracts to latest viable versions.
- `@tsparticles/engine` beta 4.0.0 line is intentional (actively developed upstream), not an incidental drift.
- Modern syntax migration is desired, but only in ways that keep consumer-facing API stable.

</specifics>

<deferred>
## Deferred Ideas

- Full runtime edge-case hardening and strict lifecycle resilience work beyond contract-level changes — deferred to Phase 2.
- Full documentation/demo/template synchronization work — deferred to Phases 3 and 4.

</deferred>

---

_Phase: 01-core-api-type-contracts_
_Context gathered: 2026-04-10_
