# Codebase Concerns

**Analysis Date:** 2026-04-10

## Tech Debt

**Initialization pattern duplicated across demo/apps and templates:**

- Issue: Particle engine bootstrap logic is repeated in multiple entry apps instead of reusing a shared helper/provider pattern.
- Files: `apps/react/src/App.js`, `apps/react-vite/src/App.tsx`, `apps/nextjs/pages/index.js`, `apps/nextjs-beta/app/page.tsx`, `templates/react/template/src/App.js`, `templates/react-ts/template/src/App.tsx`
- Impact: Changes to recommended initialization behavior require synchronized edits across many files, increasing drift risk and documentation mismatch.
- Fix approach: Centralize demo initialization through `ParticlesProvider` or a shared local helper package and keep app examples thin.

**Version skew between library and workspace demos:**

- Issue: The published component package targets `@tsparticles/engine` `^4.0.0-beta.11` while demo/template apps install `^3.9.1` and `tsparticles` `^3.9.1`.
- Files: `components/react/package.json`, `apps/react/package.json`, `apps/react-vite/package.json`, `apps/nextjs/package.json`, `apps/nextjs-beta/package.json`, `templates/react/package.json`, `templates/react-ts/package.json`
- Impact: Workspace examples validate a different major line than the component peer target, which can hide compatibility issues.
- Fix approach: Align all workspace package versions to one supported engine line and enforce via workspace constraints.

**CI workflow uses legacy/deprecated patterns:**

- Issue: GitHub Actions workflow still uses deprecated `::set-output` and pins `pnpm/action-setup` to v8 while workspace declares pnpm 10.
- Files: `.github/workflows/nodejs.yml`, `package.json`
- Impact: CI reliability depends on legacy behavior and can diverge from local install behavior.
- Fix approach: Migrate to `$GITHUB_OUTPUT`, align CI pnpm version with `packageManager`, and keep one canonical toolchain.

## Known Bugs

**Provider context can be bypassed silently in `<Particles>`:**

- Symptoms: `<Particles>` catches any error from `useParticlesEngine()` and silently falls back to inline initialization path.
- Files: `components/react/lib/Particles.tsx`, `components/react/lib/ParticlesProvider.tsx`
- Trigger: Any error thrown during hook access path (including non-provider related hook/runtime issues) is swallowed by `catch {}`.
- Workaround: Use `ParticlesProvider` with stable `particlesInit` and avoid relying on fallback behavior; remove broad catch and guard with explicit context access pattern.

## Security Considerations

**Insecure URL examples in public docs:**

- Risk: Documentation demonstrates `http://` remote config usage, which encourages insecure transport for remote particle configuration.
- Files: `README.md`, `components/react/README.md`
- Current mitigation: Not detected.
- Recommendations: Use `https://` examples only and document that `url` should point to trusted origins.

**Global object mutation in demo app:**

- Risk: Assigning runtime container to `window` exposes internal state to all scripts running on the page.
- Files: `apps/react/src/App.js`
- Current mitigation: Not detected.
- Recommendations: Remove `window.particlesContainer` assignment or gate it behind explicit development-only debug guard.

## Performance Bottlenecks

**Full engine bundle loading in all examples:**

- Problem: Examples consistently call `loadFull(engine)` during startup.
- Files: `apps/react/src/App.js`, `apps/react-vite/src/App.tsx`, `apps/nextjs/pages/index.js`, `apps/nextjs-beta/app/page.tsx`, `templates/react/template/src/App.js`, `templates/react-ts/template/src/App.tsx`
- Cause: Full preset loading initializes all features regardless of actual usage.
- Improvement path: Prefer slim/basic loaders for examples and document feature-based plugin loading.

**Potential re-initialization churn in component effect lifecycle:**

- Problem: Particle instance setup/teardown runs when effect dependencies change, including object identity changes in `options` and callback props.
- Files: `components/react/lib/Particles.tsx`
- Cause: `useEffect` depends on `options`, `particlesInit`, and `particlesLoaded`; non-memoized props trigger full reload.
- Improvement path: Document memoization requirements strongly and add internal guards for unchanged option content.

## Fragile Areas

**Error-handling by broad catch around context hook:**

- Files: `components/react/lib/Particles.tsx`, `components/react/lib/ParticlesProvider.tsx`
- Why fragile: Catch-all fallback masks root causes and makes provider misuse/errors harder to diagnose.
- Safe modification: Replace catch-all with explicit optional-context mechanism and preserve non-context errors.
- Test coverage: Gaps in `components/react/lib/**` (no test files detected).

**Outdated scaffold content in demo packages:**

- Files: `apps/nextjs-beta/app/layout.tsx`, `apps/nextjs-beta/next.config.js`, `apps/nextjs/pages/api/hello.js`, `apps/react-vite/src/App.tsx`, `components/react/src/App.tsx`
- Why fragile: Boilerplate/demo defaults (experimental flags, placeholder API route, starter UIs) can be mistaken for maintained production guidance.
- Safe modification: Keep demos minimal and explicitly label scaffold-only files in README sections.
- Test coverage: Not detected for these demo app files.

## Scaling Limits

**Client-side particle rendering scales with instance count and option complexity:**

- Current capacity: Not defined in code or documentation.
- Limit: Multiple simultaneous `<Particles>` instances increase CPU/GPU and memory usage on client devices.
- Scaling path: Standardize on shared engine initialization (`ParticlesProvider`) and constrain default particle counts/themes in example configs.

## Dependencies at Risk

**`@tsparticles/engine` beta line in main component package:**

- Risk: Beta peer/dev dependency in the package introduces API/behavior volatility.
- Impact: Consumer projects can hit unexpected breakage when beta updates shift behavior.
- Migration plan: Publish/stabilize against non-beta engine line and enforce compatibility tests in workspace demos.

**`react-scripts` ecosystem in CRA demo:**

- Risk: CRA-based demo stack and transitive lockfile dependencies include numerous deprecated packages.
- Impact: Maintenance burden and security/audit noise increase.
- Migration plan: Move demos/templates toward Vite/modern tooling while keeping CRA template scope explicitly legacy-only if retained.

## Missing Critical Features

**Library-level automated tests for core React component are missing:**

- Problem: Core package behavior has no dedicated unit/integration tests.
- Blocks: Safe refactoring of lifecycle/error/fallback logic in `components/react/lib/Particles.tsx` and `components/react/lib/ParticlesProvider.tsx`.

**No CI test stage beyond build:**

- Problem: Workspace CI executes install and build but no explicit test command.
- Blocks: Early detection of runtime/regression defects in demos/templates and library behavior.

## Test Coverage Gaps

**Core component package (`components/react/lib`) is untested:**

- What's not tested: Provider readiness/error states, fallback behavior, mount/unmount lifecycle cleanup, and callback invocation ordering.
- Files: `components/react/lib/Particles.tsx`, `components/react/lib/ParticlesProvider.tsx`, `components/react/lib/index.ts`
- Risk: Regressions in async initialization and cleanup can ship undetected.
- Priority: High

**Demo tests only validate scaffold text, not particles behavior:**

- What's not tested: Particle rendering success, engine initialization completion, and config loading paths.
- Files: `apps/react/src/App.test.js`, `templates/react/template/src/App.test.js`, `templates/react-ts/template/src/App.test.tsx`
- Risk: Test suite can pass while core particle integration fails.
- Priority: Medium

---

_Concerns audit: 2026-04-10_
