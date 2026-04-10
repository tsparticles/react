# Project Research Summary

**Project:** @tsparticles/react
**Domain:** React integration library monorepo (published package + demos + templates)
**Researched:** 2026-04-10
**Confidence:** HIGH

## Executive Summary

`@tsparticles/react` is a mature integration library, not a greenfield app. The research converges on a contract-first approach: keep the public React API narrow and stable (`<Particles />`, provider/init helpers, typed props), then validate real compatibility through a consumer matrix (Vite + Next Pages/App + templates) before every release. Experts building this category prioritize semver discipline, tested peer ranges, and demo/template fidelity over rapid feature churn.

Recommended implementation strategy is to modernize around React 19 dev baseline with peer support for React 18, Vite library mode, pnpm workspaces, and release governance via Changesets + OIDC publishing. Product-wise, the P1 scope is reliability and trust: StrictMode-safe lifecycle behavior, clean package entry points/peer contracts, concise quickstarts, and maintained runnable demos. Differentiators like a provider-led engine pattern, bundle-profile recipes, and drift automation should follow once core compatibility and docs correctness are consistently green.

Primary risks are ecosystem drift and false confidence: claiming compatibility without matrix coverage, docs/templates diverging from code, and tests validating scaffolding instead of lifecycle behavior. Mitigation is explicit and actionable: matrix-test min/max supported versions, treat docs/examples as testable artifacts, add focused provider/lifecycle/error-path tests, and gate releases on compatibility + documentation synchronization.

## Key Findings

### Recommended Stack

The stack recommendation is consistent across sources: modern Node/React tooling with conservative compatibility policy. Build and test should be Vite + Vitest + Testing Library + Playwright, with pnpm/Nx/Lerna orchestration retained for monorepo scale and affected-run efficiency. Release safety should be handled by Changesets and npm Trusted Publishing (OIDC), not long-lived tokens.

**Core technologies:**

- **React 19.2.5 dev baseline + peer `>=18 <20`**: enables current development while preserving broad consumer compatibility.
- **TypeScript 6.0.2**: contract-quality API types and declaration output for integration DX.
- **Vite 8 (library mode)**: fast package/demo build flow with explicit externalization.
- **Next.js 16.2 demos**: validates SSR/App Router compatibility in current ecosystem norms.
- **pnpm workspaces 10 + Nx/Lerna**: scalable monorepo task graph, caching, and orchestration.
- **Changesets + GitHub Actions OIDC publishing**: consistent version/changelog governance and safer publish auth.

Critical version constraints: Vitest 4 requires modern Node (`>=20`), and npm Trusted Publishing workflows require modern npm/Node in release jobs.

### Expected Features

P1 is not “more features”; it is dependable integration behavior and onboarding clarity. The research strongly favors a thin wrapper over tsParticles internals, with explicit guidance for modern React app setups.

**Must have (table stakes):**

- Stable `<Particles />` API with object and URL config modes.
- TypeScript-first prop/callback contracts.
- Correct peer dependency and package entry-point hygiene (`exports` discipline).
- StrictMode-safe init/cleanup lifecycle behavior.
- Clear SSR/client-boundary guidance for Next.js (Pages + App Router).
- Minimal, runnable JS/TS quickstarts plus maintained Vite/Next demos.

**Should have (competitive):**

- `ParticlesProvider`-driven single-init recipes.
- Bundle profile guidance (slim/basic/full) with decision matrix.
- CI-based demo/template version drift checks.

**Defer (v2+):**

- Interactive config playground with code export.
- Full visual regression pipeline expansion.

### Architecture Approach

Use a layered monorepo model where `components/react/lib` is the sole contract source, while `apps/*` and `templates/*` are downstream verifiers that must consume only public package exports. Follow two-phase engine lifecycle (init then render), enforce consumer-matrix verification before release, and sequence work as: **library contract → library tests → demo compatibility → template sync → release gates**.

**Major components:**

1. **Workspace orchestration layer** (`pnpm` + `nx` + `lerna`) — task graph, cache, and execution order.
2. **Published library layer** (`components/react/lib`) — stable API boundary and runtime lifecycle behavior.
3. **Verification matrix layer** (`apps/*`, `templates/*`) — real-consumer compatibility validation.
4. **Release safety layer** (CI/workflows) — build/test/publish gates and synchronization checks.

### Critical Pitfalls

1. **Compatibility claims without a tested matrix** — prevent with explicit support matrix and min/max edge CI coverage.
2. **Docs/examples drift from reality** — prevent by validating snippets/templates in CI and centralizing shared init patterns.
3. **Scaffold-level tests miss integration regressions** — prevent with focused lifecycle/provider/error-path tests under StrictMode.
4. **Unstable release governance (tags/changelogs/intent)** — prevent via Changesets, dist-tag policy, and automated release gates.
5. **Error masking in fallback logic** — prevent by replacing broad catches with explicit context checks and rethrowing unexpected runtime errors.

## Implications for Roadmap

Based on combined research, the roadmap should prioritize **trust infrastructure before feature expansion**.

### Phase 1: Compatibility & Toolchain Baseline

**Rationale:** Without verified version policy, every later feature is high-risk and support-heavy.
**Delivers:** Explicit support matrix (React/Next/Node/engine), CI min/max edge jobs, aligned Node/pnpm/workflow versions.
**Addresses:** Feature table stakes for peer contract correctness and maintained demos.
**Avoids:** Pitfall 1 (untested compatibility claims), Pitfall 5 (CI/toolchain drift).

### Phase 2: Core API + Lifecycle Hardening

**Rationale:** Contract reliability is the product; stabilize internals before scaling docs/templates.
**Delivers:** Contract-first export hygiene, StrictMode-safe init/cleanup, explicit fallback/error handling, provider semantics locked.
**Implements:** Architecture patterns 1 and 2 (public boundary + two-phase lifecycle).
**Avoids:** Pitfall 3 (behavior not tested) and Pitfall 6 (error masking).

### Phase 3: Documentation, Demo, and Template Integrity

**Rationale:** Onboarding trust depends on runnable, current examples more than new API surface.
**Delivers:** Updated quickstart docs (JS/TS + slim/basic/full guidance), Vite + Next Pages/App demo parity, template sync validation.
**Uses:** Stack guidance for modern starters; anti-feature guidance to avoid long-tail template sprawl.
**Avoids:** Pitfall 2 (docs drift), plus integration/security gotchas around remote URL guidance.

### Phase 4: Release Governance & Automation

**Rationale:** Once compatibility and docs are reliable, enforce release behavior so quality is sustained.
**Delivers:** Changesets-required release intent, dist-tag policy (`latest` vs prerelease), matrix/docs/template gates pre-publish, OIDC publish flow.
**Addresses:** Predictable multi-package release communication and safer publishing.
**Avoids:** Pitfall 4 (unstable release process).

### Phase 5: Differentiators (Post-Stability)

**Rationale:** Differentiators add value only after baseline trust is institutionalized.
**Delivers:** Provider recipes/migration guidance, automated drift intelligence, optional playground/visual regression expansion.
**Addresses:** P2/P3 features without compromising core maintenance posture.

### Phase Ordering Rationale

- Dependencies are explicit: architecture recommends **contract → tests → matrix → templates → release**.
- Pitfall mapping aligns cleanly to phases (Phase 1/2/3/4 coverage).
- This ordering minimizes “works locally, breaks for users” failures and prevents roadmap over-investment in high-cost differentiators before reliability is solved.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 1:** Exact matrix boundaries (oldest supported React/Next/Node combos) and CI runtime cost strategy.
- **Phase 3:** Long-term template policy (legacy CRA retention/deprecation timeline) and secure remote-config documentation constraints.
- **Phase 5:** Playground architecture and maintenance model (hosting, schema validation, code-export fidelity).

Phases with standard patterns (can likely skip research-phase):

- **Phase 2:** Contract boundary hardening and StrictMode lifecycle testing are well-documented, established patterns.
- **Phase 4:** Changesets + OIDC + dist-tag governance follows mature, repeatable ecosystem practice.

## Confidence Assessment

| Area         | Confidence | Notes                                                                                                 |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------- |
| Stack        | HIGH       | Strong official-source coverage (React, Vite, pnpm, npm, Vitest) with concrete versions.              |
| Features     | HIGH       | Table stakes and prioritization align with ecosystem norms and repository realities.                  |
| Architecture | HIGH       | Clear monorepo boundaries and dependency-aware sequencing validated by current repo shape.            |
| Pitfalls     | HIGH       | Pitfalls are concrete, codebase-relevant, and mapped to prevention phases with verification criteria. |

**Overall confidence:** HIGH

### Gaps to Address

- **Exact compatibility floor policy:** Decide and publish explicit oldest-supported versions per framework/runtime; enforce with matrix edges in CI.
- **CRA legacy strategy:** Research says de-prioritize CRA for new investment, but repo still contains CRA assets; define migration/deprecation policy and timeline.
- **Provider/fallback behavior contract:** Formalize expected error semantics (what is swallowed vs surfaced) before adding broader automation.
- **Release channel policy details:** Finalize prerelease promotion rules and communication templates for compatibility-impacting changes.

## Sources

### Primary (HIGH confidence)

- React official docs/blog — React 19 baseline, StrictMode/effect behavior, modern project guidance.
- Vite official docs — library mode and build/package guidance.
- pnpm official docs — workspaces and publish behavior.
- npm official docs — peerDependencies, package/release conventions, trusted publishing.
- Node.js official docs — package entry points/`exports` contract.
- Nx/Lerna official docs — monorepo orchestration, affected runs, version/publish workflows.
- Repository-local sources — `.planning/PROJECT.md`, package/apps/templates/workflow files.

### Secondary (MEDIUM confidence)

- Next.js release/support documentation for current line targeting.
- Storybook documentation for visual workflow tradeoffs.
- Changesets project docs for monorepo release workflow implementation details.

### Tertiary (LOW confidence)

- None identified as roadmap-critical; no major decisions rely solely on low-confidence sources.

---

_Research completed: 2026-04-10_
_Ready for roadmap: yes_
