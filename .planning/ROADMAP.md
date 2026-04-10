# Roadmap: @tsparticles/react

## Overview

This roadmap focuses on trust-first delivery for an existing React integration: stabilize the API contract and typing surface, harden runtime/compatibility behavior, then ensure documentation, demos, and templates are accurate and current so users can successfully adopt `@tsparticles/react` in real projects.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Core API & Type Contracts** - Deliver a stable React component contract with strong TypeScript usage patterns.
- [ ] **Phase 2: Runtime Reliability & Package Compatibility** - Make lifecycle behavior and package compatibility policy dependable and explicit.
- [ ] **Phase 3: Documentation & Verified Integration Examples** - Ensure onboarding guidance and framework demos are accurate and runnable.
- [ ] **Phase 4: Starter Template Alignment** - Keep JS/TS starter templates synchronized with current package/runtime expectations.
- [ ] **Phase 5: Verification Coverage for Core API & Types** - Close audit verification gaps by producing requirement-level evidence for Phase 1 outcomes.

## Phase Details

### Phase 1: Core API & Type Contracts

**Goal**: Users can render and configure particles in React through a stable, typed API surface.
**Depends on**: Nothing (first phase)
**Requirements**: CORE-01, CORE-02, CORE-03, CORE-04, CORE-05, TYPE-01, TYPE-02
**Success Criteria** (what must be TRUE):

1. User can mount `<Particles />` and see particles render with the documented React API.
2. User can configure particles with either inline options or a remote JSON URL and observe expected behavior.
3. User can initialize the engine once before render and then use particles without repeated setup calls.
4. TypeScript user gets typed props/callbacks and can type options with `ISourceOptions` without custom workarounds.
5. User can pass common render props (`id`, `width`, `height`, `style`, `className`) without breaking rendering.
   **Plans**: 3 plans

Plans:

- [ ] 01-01-PLAN.md — Stabilize and strengthen exported TypeScript contracts for props/callbacks and init helper typing.
- [ ] 01-02-PLAN.md — Preserve dual runtime config paths and render prop passthrough behavior in `Particles` lifecycle.
- [ ] 01-03-PLAN.md — Align package/app/template dependency contracts to Phase 1 compatibility policy and validate with monorepo smoke builds.

### Phase 2: Runtime Reliability & Package Compatibility

**Goal**: Users can rely on predictable lifecycle cleanup and clear compatibility expectations across supported environments.
**Depends on**: Phase 1
**Requirements**: RUNT-01, RUNT-02, RUNT-03, COMP-01, COMP-02
**Success Criteria** (what must be TRUE):

1. User can mount/unmount particles in React StrictMode without leaked containers or duplicate long-lived instances.
2. User receives explicit, actionable errors when initialization/context usage is incorrect.
3. User can verify documented cleanup behavior by unmounting particles without leftover runtime artifacts.
4. User can read and follow a clear React/engine compatibility policy during installation.
5. User can consume the package in modern bundlers via documented entry points/exports.
   **Plans**: 3 plans

### Phase 3: Documentation & Verified Integration Examples

**Goal**: Users can onboard from docs and run framework integrations without undocumented steps.
**Depends on**: Phase 2
**Requirements**: DOCS-01, DOCS-02, DOCS-03, DOCS-04, DOCS-05, COMP-03, COMP-04
**Success Criteria** (what must be TRUE):

1. User can complete install + first render by following README quickstart exactly.
2. User can follow both JavaScript and TypeScript examples for options-object and URL-based configurations.
3. User can choose `slim`, `basic`, `full`, or `all` loader profiles using explicit guidance.
4. User can reference a props table that matches actual runtime behavior.
5. User can run verified Vite and Next.js demos that reflect supported usage patterns.
   **Plans**: 3 plans

### Phase 4: Starter Template Alignment

**Goal**: Users can scaffold JS/TS starter projects that run immediately with current package versions.
**Depends on**: Phase 3
**Requirements**: TMPL-01, TMPL-02, TMPL-03
**Success Criteria** (what must be TRUE):

1. User can scaffold the JavaScript starter and run particles successfully with current dependencies.
2. User can scaffold the TypeScript starter and run particles successfully with current dependencies.
3. User can trust template metadata and prebuild scripts to remain aligned with published package versions.
   **Plans**: 2 plans

### Phase 5: Verification Coverage for Core API & Types

**Goal**: Close milestone audit blockers by restoring verification evidence for all Phase 1 requirements.
**Depends on**: Phase 1
**Requirements**: CORE-01, CORE-02, CORE-03, CORE-04, CORE-05, TYPE-01, TYPE-02
**Gap Closure**: Closes gaps from audit (`v1.0-v1.0-MILESTONE-AUDIT.md`) where all Phase 1 requirements are orphaned due to missing `VERIFICATION.md`.
**Success Criteria** (what must be TRUE):

1. Phase 1 has a `VERIFICATION.md` with a requirement-level table covering CORE-01..CORE-05 and TYPE-01..TYPE-02.
2. Each requirement has explicit verification evidence mapped to implementation and prior summary artifacts.
3. All previously orphaned requirements are no longer unsatisfied in milestone audit output.
4. Re-running milestone audit for v1.0 reports no verification-coverage blocker for `01-core-api-type-contracts`.
   **Plans**: 0 plans

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase                                            | Plans Complete | Status      | Completed |
| ------------------------------------------------ | -------------- | ----------- | --------- |
| 1. Core API & Type Contracts                     | 0/3            | Not started | -         |
| 2. Runtime Reliability & Package Compatibility   | 0/3            | Not started | -         |
| 3. Documentation & Verified Integration Examples | 0/3            | Not started | -         |
| 4. Starter Template Alignment                    | 0/2            | Not started | -         |
| 5. Verification Coverage for Core API & Types    | 0/0            | Not started | -         |
