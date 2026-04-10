# Requirements: @tsparticles/react

**Defined:** 2026-04-10
**Core Value:** React developers can add and control tsParticles reliably with minimal setup while keeping full access to engine capabilities.

## v1 Requirements

Requirements for this project cycle. Each maps to exactly one roadmap phase.

### Core API

- [ ] **CORE-01**: User can render particles in React by mounting a stable `<Particles />` component API.
- [ ] **CORE-02**: User can configure particles with an inline options object passed to `<Particles />`.
- [ ] **CORE-03**: User can configure particles from a remote JSON URL passed to `<Particles />`.
- [ ] **CORE-04**: User can initialize the engine once per app lifecycle using `initParticlesEngine` before rendering particles.
- [ ] **CORE-05**: User can pass common render props (`id`, `width`, `height`, `style`, `className`) without breaking particle rendering.

### Type Safety

- [ ] **TYPE-01**: User can consume fully typed component props and callbacks when using TypeScript.
- [ ] **TYPE-02**: User can type options with `ISourceOptions` from `@tsparticles/engine` in TypeScript examples.

### Runtime Reliability

- [ ] **RUNT-01**: User can mount/unmount particles in React StrictMode without leaked containers or duplicate long-lived instances.
- [ ] **RUNT-02**: User can receive explicit, actionable errors when engine/context initialization is misused.
- [ ] **RUNT-03**: User can rely on documented cleanup behavior when particles components unmount.

### Compatibility

- [ ] **COMP-01**: User can install `@tsparticles/react` with a clearly documented React/engine version compatibility policy.
- [ ] **COMP-02**: User can use the package from modern bundlers through well-defined package entry points and exports.
- [ ] **COMP-03**: User can run verified integrations in Vite and Next.js demo environments that reflect supported usage.
- [ ] **COMP-04**: User can adopt the package in both JavaScript and TypeScript projects without undocumented setup steps.

### Documentation and Examples

- [ ] **DOCS-01**: User can complete installation and first render from README quickstart steps.
- [ ] **DOCS-02**: User can follow both JavaScript and TypeScript usage examples for options-object configuration.
- [ ] **DOCS-03**: User can follow both JavaScript and TypeScript usage examples for URL-based configuration.
- [ ] **DOCS-04**: User can choose an appropriate loader profile (`slim`, `basic`, `full`, or `all`) using explicit guidance.
- [ ] **DOCS-05**: User can reference an accurate props table that matches runtime behavior.

### Templates

- [ ] **TMPL-01**: User can scaffold a JavaScript starter project that runs particles with current package versions.
- [ ] **TMPL-02**: User can scaffold a TypeScript starter project that runs particles with current package versions.
- [ ] **TMPL-03**: User can rely on template metadata and prebuild scripts staying aligned with published package versions.

## v2 Requirements

Deferred to a future cycle. Not included in the current roadmap.

### Advanced DX

- **DX-01**: User can adopt provider-based single-initialization recipes with migration guidance.
- **DX-02**: User can use automated demo/template dependency drift reporting in CI outputs.

### Product Differentiators

- **DIFF-01**: User can interactively build particle configuration in a playground and export production-ready code.
- **DIFF-02**: Maintainer can review visual regression baselines for demos before release.

## Out of Scope

Explicitly excluded for this cycle.

| Feature                                                               | Reason                                                                                        |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Building a custom abstraction DSL over tsParticles options            | Increases divergence from upstream engine documentation and raises long-term maintenance cost |
| Automatically loading the full engine in all examples by default      | Hides performance tradeoffs and encourages unnecessary bundle growth                          |
| Expanding this repo into non-React wrappers                           | This repository is intentionally scoped to React integration                                  |
| Investing in broad long-tail template matrix beyond core modern paths | Increases maintenance burden and accelerates docs/example drift                               |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| CORE-01     | Phase 5 | Pending |
| CORE-02     | Phase 5 | Pending |
| CORE-03     | Phase 5 | Pending |
| CORE-04     | Phase 5 | Pending |
| CORE-05     | Phase 5 | Pending |
| TYPE-01     | Phase 5 | Pending |
| TYPE-02     | Phase 5 | Pending |
| RUNT-01     | Phase 2 | Pending |
| RUNT-02     | Phase 2 | Pending |
| RUNT-03     | Phase 2 | Pending |
| COMP-01     | Phase 2 | Pending |
| COMP-02     | Phase 2 | Pending |
| COMP-03     | Phase 3 | Pending |
| COMP-04     | Phase 3 | Pending |
| DOCS-01     | Phase 3 | Pending |
| DOCS-02     | Phase 3 | Pending |
| DOCS-03     | Phase 3 | Pending |
| DOCS-04     | Phase 3 | Pending |
| DOCS-05     | Phase 3 | Pending |
| TMPL-01     | Phase 4 | Pending |
| TMPL-02     | Phase 4 | Pending |
| TMPL-03     | Phase 4 | Pending |

**Coverage:**

- v1 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0
- Checked complete: 0

---

_Requirements defined: 2026-04-10_
_Last updated: 2026-04-10 after milestone gap closure remapping_
