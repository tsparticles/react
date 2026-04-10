# Pitfalls Research

**Domain:** React integration library maintenance (package + demos/templates + broad compatibility)
**Researched:** 2026-04-10
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Compatibility claims without a real version matrix

**What goes wrong:**
Maintainers declare wide support ranges (`react >=16.8 <20`, multiple Next.js generations) but only test one or two combinations locally/CI. Breakages appear only in consumer apps.

**Why it happens:**
`peerDependencies` are treated as policy, not as a test contract. Monorepo demos drift to different engine/framework lines.

**How to avoid:**

- Define an explicit support matrix (React, ReactDOM, Next.js, Node, `@tsparticles/engine`).
- Run automated matrix smoke tests for _each claimed range edge_ (oldest + latest supported versions).
- Keep package and demo/template dependency lines aligned unless intentionally marked “legacy”.

**Warning signs:**

- Peer range is broad, but CI runs a single Node/React combo.
- Demo apps use different major versions than library peers.
- “Works in demo, breaks in user project” issues cluster after releases.

**Phase to address:**
Phase 1 — Compatibility policy + CI matrix foundation.

---

### Pitfall 2: Docs and examples drift from maintained reality

**What goes wrong:**
README/examples keep old patterns (or insecure patterns), while implementation evolves. Users copy/paste wrong setup, resulting in support churn.

**Why it happens:**
Docs and templates are maintained manually, across many files, without validation gates.

**How to avoid:**

- Treat docs/examples as testable artifacts: lint snippets, compile sample code, and validate URLs/protocols.
- Use one shared initialization helper for demos/templates to reduce copy/paste drift.
- Maintain “production-safe defaults” in docs (HTTPS URLs, no global object mutation, minimal bundle loaders).

**Warning signs:**

- Same setup logic duplicated in many demo/template files.
- Docs mention behavior not reflected in code.
- Public docs include `http://` examples or debug-only globals.

**Phase to address:**
Phase 2 — Documentation and template hardening.

---

### Pitfall 3: Tests verify scaffolding, not integration behavior

**What goes wrong:**
Test suites pass while core wrapper behavior regresses (provider/fallback logic, lifecycle cleanup, callback ordering, StrictMode behavior).

**Why it happens:**
Projects keep default app tests and build checks, but skip component-level integration tests for async engine init/unmount/failure paths.

**How to avoid:**

- Add focused tests for `Particles`/provider contract: init, cleanup, error propagation, and URL/options loading paths.
- Run tests under StrictMode for dev-time effect/ref cleanup regressions.
- Add demo smoke tests that assert particles initialization success (not just text rendering).

**Warning signs:**

- CI runs build only or superficial tests.
- No tests around provider context/fallback/error branches.
- Regressions are caught first by users, not CI.

**Phase to address:**
Phase 3 — Testing architecture and regression suite.

---

### Pitfall 4: Unstable release process for multi-package compatibility

**What goes wrong:**
Releases accidentally push unstable/beta compatibility to `latest`, or publish package versions without synchronized changelog/supported-version communication.

**Why it happens:**
No structured release metadata workflow (changesets/changelog discipline), no dist-tag strategy, and no release-gate checks against compatibility matrix.

**How to avoid:**

- Use a release workflow that requires version intent + changelog per change.
- Use npm dist-tags intentionally (`latest`, `beta`, etc.); never promote prerelease lines implicitly.
- Require release gate checks: matrix green, docs updated, demos synchronized.

**Warning signs:**

- Consumers report “unexpected major/beta behavior” after patch/minor updates.
- Changelog lacks compatibility notes.
- Manual release steps differ by maintainer.

**Phase to address:**
Phase 4 — Release governance and automation.

---

### Pitfall 5: CI/toolchain drift hides future breakage

**What goes wrong:**
CI uses deprecated commands and older package manager behavior than local development; failures appear only when infra changes or when contributors use newer tooling.

**Why it happens:**
Workflow files become stale and are not treated as first-class maintenance targets.

**How to avoid:**

- Keep CI Node/pnpm versions aligned with `packageManager` and support policy.
- Remove deprecated GitHub Actions patterns (`::set-output` → `$GITHUB_OUTPUT`).
- Add periodic CI maintenance checks (workflow lint + scheduled dry-run).

**Warning signs:**

- CI config uses deprecated APIs.
- Different lockfile/install behavior between local and CI.
- “Flaky only in CI” dependency resolution issues.

**Phase to address:**
Phase 1 — Compatibility/toolchain baseline.

---

### Pitfall 6: Error masking in wrapper fallback paths

**What goes wrong:**
Catch-all fallback logic swallows real runtime errors (not just missing provider context), making failures silent and diagnosis slow.

**Why it happens:**
Fallback behavior is implemented with broad `catch {}` for resilience, but without explicit error typing/branching.

**How to avoid:**

- Replace broad catch with explicit optional-context detection.
- Re-throw non-context errors.
- Add tests for expected fallback vs unexpected runtime failures.

**Warning signs:**

- Users report “nothing happens” with no actionable error.
- Logs show fallback path entered unexpectedly.
- Issue triage requires reproducing with custom debugging instrumentation.

**Phase to address:**
Phase 3 — Core component hardening.

---

## Technical Debt Patterns

| Shortcut                                      | Immediate Benefit        | Long-term Cost                               | When Acceptable                                                                   |
| --------------------------------------------- | ------------------------ | -------------------------------------------- | --------------------------------------------------------------------------------- |
| Copying init code into every demo/template    | Fast onboarding examples | High drift and stale guidance                | Only for one-off spike branches, not main                                         |
| Testing only build + scaffold text            | Quick green CI           | Core regressions ship silently               | Never for published integration libraries                                         |
| Using full engine loader everywhere           | Simpler example code     | Misleading perf defaults for users           | Acceptable only when explicitly labeled “feature-complete demo”, not default docs |
| Manual release checklist in maintainer memory | Lower process setup cost | Inconsistent tags/changelogs/support windows | Never once >1 maintainer or >1 package                                            |

## Integration Gotchas

| Integration               | Common Mistake                                       | Correct Approach                                                                               |
| ------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| React peer compatibility  | Declare wide `peerDependencies` without matrix tests | Tie each supported range to at least one CI-tested combo                                       |
| Next.js demos             | Keep demos on old/untracked major versions           | Track Active/Maintenance LTS versions intentionally and document which demos target which line |
| Remote config URL loading | Show insecure/trust-agnostic URL examples            | Document trusted-origin + HTTPS-only guidance and validate examples                            |

## Performance Traps

| Trap                                                       | Symptoms                            | Prevention                                                    | When It Breaks                                           |
| ---------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| `loadFull` as default in all examples                      | Higher CPU/GPU usage, large bundles | Default to slim/basic loaders; document feature-based loading | Noticeable on low-power devices and multi-instance pages |
| Re-init on changing object identity (`options`, callbacks) | Frequent teardown/recreate, jank    | Enforce memoized options/callbacks and add guards             | Breaks under dynamic prop-heavy UIs                      |

## Security Mistakes

| Mistake                                          | Risk                                         | Prevention                                                        |
| ------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------------------- |
| Documenting `http://` remote JSON configs        | MITM/config tampering risk                   | Use HTTPS-only examples and trusted origin guidance               |
| Exposing particle container on `window` in demos | Third-party scripts can mutate runtime state | Remove global mutation or gate under explicit dev-only debug mode |

## UX Pitfalls

| Pitfall                                           | User Impact                                  | Better Approach                                                                |
| ------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| Demos show boilerplate noise as recommended setup | New users copy non-essential/legacy patterns | Keep examples minimal, label scaffold-only files, and highlight canonical path |
| Silent fallback/error swallowing                  | “It doesn’t work” with no diagnosis path     | Surface explicit errors and troubleshooting guidance                           |

## "Looks Done But Isn't" Checklist

- [ ] **Compatibility support:** Claimed versions are matrix-tested at min/max edges.
- [ ] **Docs correctness:** README snippets compile/run in CI and match current package versions.
- [ ] **Template freshness:** All starter templates use the same supported dependency line as package guidance.
- [ ] **Release safety:** Dist-tag strategy and prerelease policy are enforced by automation.
- [ ] **Runtime safety:** StrictMode lifecycle paths and cleanup behavior are covered by tests.

## Recovery Strategies

| Pitfall                             | Recovery Cost | Recovery Steps                                                                          |
| ----------------------------------- | ------------- | --------------------------------------------------------------------------------------- |
| Version skew shipped                | HIGH          | Patch release + compatibility advisory + align demos/templates + add missing matrix job |
| Stale docs/templates shipped        | MEDIUM        | Update docs/templates + add snippet validation + publish migration notes                |
| Broken release tag (beta as latest) | HIGH          | Retag/fix publish + clear comms + enforce release automation guardrails                 |
| Silent fallback bug                 | MEDIUM        | Ship explicit error handling fix + add regression tests + add troubleshooting section   |

## Pitfall-to-Phase Mapping

| Pitfall                             | Prevention Phase                          | Verification                                                          |
| ----------------------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| Compatibility claims without matrix | Phase 1: Compatibility policy + CI matrix | Matrix jobs run for min/max supported versions on every PR/release    |
| Docs/example drift                  | Phase 2: Docs/template hardening          | Snippet compile checks + template sync check pass in CI               |
| Behavior-not-scaffold testing gap   | Phase 3: Core test suite                  | Tests cover provider/fallback/lifecycle/error paths with StrictMode   |
| Release governance gaps             | Phase 4: Release automation               | Changeset required, dist-tag validated, release checklist automated   |
| CI/toolchain drift                  | Phase 1: Toolchain baseline               | CI versions match declared toolchain; no deprecated workflow commands |
| Error masking in fallback paths     | Phase 3: Runtime hardening                | Non-context errors surface; fallback branch tested explicitly         |

## Sources

- Internal codebase context (HIGH):
  - `.planning/PROJECT.md`
  - `.planning/codebase/CONCERNS.md`
  - `.planning/codebase/INTEGRATIONS.md`
  - `components/react/package.json`
  - `apps/react/package.json`
  - `apps/react-vite/package.json`
  - `apps/nextjs/package.json`
  - `apps/nextjs-beta/package.json`
  - `.github/workflows/nodejs.yml`
- React StrictMode behavior and lifecycle checks (HIGH): https://react.dev/reference/react/StrictMode
- React project guidance and framework recommendations (MEDIUM): https://react.dev/learn/start-a-new-react-project
- React 19 release/upgrade considerations (HIGH): https://react.dev/blog/2024/12/05/react-19
- npm `peerDependencies` guidance (broad compatible ranges) (HIGH): https://docs.npmjs.com/cli/v11/configuring-npm/package-json#peerdependencies
- npm dist-tags usage for release channels (MEDIUM): https://docs.npmjs.com/adding-dist-tags-to-packages
- GitHub Actions output command guidance (`$GITHUB_OUTPUT`) (HIGH): https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-output-parameter
- Next.js LTS/support windows (HIGH): https://nextjs.org/support-policy
- Node.js release status/LTS policy (HIGH): https://nodejs.org/en/about/previous-releases
- Changesets monorepo release workflow (MEDIUM): https://github.com/changesets/changesets

---

_Pitfalls research for: React integration library ecosystem maintenance_
_Researched: 2026-04-10_
