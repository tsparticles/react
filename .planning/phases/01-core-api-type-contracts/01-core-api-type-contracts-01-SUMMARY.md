---
phase: 01-core-api-type-contracts
plan: "01"
subsystem: api
tags: [react, typescript, tsparticles, type-contracts]
requires: []
provides:
  - Typed callback aliases for engine initialization and loaded container handlers
  - Stable public export barrel with additive type exports
affects: [phase-01-plan-02, phase-01-plan-03]
tech-stack:
  added: []
  patterns: [additive type-safe exports, shared callback type aliasing]
key-files:
  created: []
  modified:
    - components/react/lib/IParticlesProps.ts
    - components/react/lib/ParticlesProvider.tsx
    - components/react/lib/index.ts
key-decisions:
  - "Shared callback aliases were exported and reused to keep provider and public API contracts aligned."
patterns-established:
  - "Callback contract reuse: ParticlesProvider and IParticlesProps share the same Engine init type."
requirements-completed: [TYPE-01, TYPE-02, CORE-04]
duration: 2min
completed: 2026-04-10
---

# Phase 1 Plan 01: Core API Type Contracts Summary

**Additive callback type aliasing now keeps `IParticlesProps`, `ParticlesProvider`, and `initParticlesEngine` aligned on a stable Engine-based contract.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-10T13:46:22Z
- **Completed:** 2026-04-10T13:48:40Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Added explicit exported callback aliases for init and loaded handlers in the public prop contract.
- Reused the same init callback type in `ParticlesProvider` to remove drift risk.
- Preserved stable named/default exports while broadening `initParticlesEngine` callback compatibility to sync or async handlers.

## Task Commits

1. **Task 1: Tighten exported prop and callback type contracts** - `64ab5b7` (feat)
2. **Task 2: Preserve and validate stable public exports** - `a197bf2` (feat)

## Files Created/Modified

- `components/react/lib/IParticlesProps.ts` - Added reusable `ParticlesEngineInit` and `ParticlesLoaded` aliases and wired them into `IParticlesProps`.
- `components/react/lib/ParticlesProvider.tsx` - Adopted shared engine init callback type.
- `components/react/lib/index.ts` - Re-exported callback types and preserved stable barrel entrypoints.

## Decisions Made

- Reused a single exported init callback alias for provider and public props to enforce a consistent Engine callback contract.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 02 can safely build on a stabilized and explicit type/export surface.
- No blockers detected.

## Self-Check: PASSED

---

_Phase: 01-core-api-type-contracts_
_Completed: 2026-04-10_
