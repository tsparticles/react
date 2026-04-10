# Feature Research

**Domain:** React UI integration library ecosystem (package + demos + docs + templates)
**Researched:** 2026-04-10
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature                                                                             | Why Expected                                                                                                               | Complexity | Notes                                                                                        |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| Stable React component API (`<Particles />`) with both object config and URL config | Integration libraries are expected to expose a single ergonomic component/hook entry and support common config input paths | MEDIUM     | Already present; keep API stable and documented.                                             |
| TypeScript-first public types and callback signatures                               | React ecosystem expects typed props/events for editor DX and fewer runtime mistakes                                        | LOW        | Keep `IParticlesProps` and engine/container callback typing as first-class docs examples.    |
| Correct peer dependency contract for `react` / `react-dom` and host engine          | Plugin-style packages are expected to use `peerDependencies` for host compatibility                                        | LOW        | Must continue semver-broad peer ranges and avoid hard pinning unnecessary patch versions.    |
| Package entry-point hygiene (`exports` + `main`/module compatibility)               | Modern tooling expects explicit package surface and predictable import/require behavior                                    | MEDIUM     | Essential for Node/bundler compatibility and avoiding deep-import breakage surprises.        |
| StrictMode-safe lifecycle behavior (init + cleanup correctness)                     | React dev mode double-invokes effects; wrappers are expected not to leak or duplicate side effects                         | MEDIUM     | Ensure init/teardown is idempotent; no duplicate engine instances or orphaned canvases.      |
| SSR/Next compatibility guidance (client boundaries)                                 | React users increasingly ship with Next App Router and mixed server/client components                                      | MEDIUM     | Provide explicit “client component only” usage guidance and examples for Pages + App Router. |
| Minimal quickstart docs with copy-paste JS + TS examples                            | Integration packages are judged by time-to-first-render                                                                    | LOW        | Keep README concise, runnable, and aligned with current versions.                            |
| Maintained runnable demos for mainstream React setups (Vite + Next)                 | Users expect a proof that package works in real scaffolds before adoption                                                  | MEDIUM     | Demos are not optional in 2026; they are trust signals for compatibility.                    |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature                                                                                      | Value Proposition                                                                   | Complexity | Notes                                                                               |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| Shared engine provider pattern (`ParticlesProvider`) with single app-lifetime initialization | Reduces duplicated boot logic and mistakes in apps with multiple particle instances | MEDIUM     | Strong maintainer + user DX differentiator versus plain component-only wrappers.    |
| Bundle-profile recipes (“slim/basic/full”) with decision matrix                              | Makes performance tradeoffs explicit; lowers bundle size without guesswork          | MEDIUM     | Turn current loader flexibility into docs-led product advantage.                    |
| Version-aligned demo matrix with automated drift checks                                      | Prevents “docs work, real app fails” trust erosion                                  | HIGH       | Automate dependency alignment checks across package/apps/templates in CI.           |
| Interactive config playground + export-to-code snippet                                       | Shortens trial loop and increases adoption for non-expert users                     | HIGH       | Can output JSON + React snippet + recommended loader package.                       |
| Modern starter templates beyond CRA (Vite + Next App Router)                                 | Meets where new React projects are actually started today                           | HIGH       | CRA is deprecated for new apps; modern starters become a clear ecosystem advantage. |
| Visual regression baseline for demos (component and full-page)                               | Gives maintainers confidence that rendering changes are intentional                 | MEDIUM     | Storybook/Chromatic or equivalent workflow is a mature-library differentiator.      |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature                                                           | Why Requested                                | Why Problematic                                                                | Alternative                                                                                              |
| ----------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Maintain many long-tail framework/scaffold templates in this repo | “Support every starter” sounds user-friendly | Maintenance burden explodes; examples go stale and reduce trust                | Keep a tight matrix (Vite + Next pages/app), archive legacy examples, link community examples externally |
| Build a custom abstraction DSL over tsParticles options           | “Simpler API” appears easier for beginners   | Diverges from upstream engine docs, creates lock-in and duplicate docs surface | Keep thin wrapper; provide presets/helpers and strong documentation instead                              |
| Auto-loading full engine by default                               | New users want instant success               | Inflates bundle size and hides performance costs                               | Default docs to slim/basic loader paths and explain when full/all is justified                           |
| Silent remote config fetching/retry magic                         | “It should just work”                        | Hidden network behavior complicates debugging, SSR, and error handling         | Keep explicit `url` behavior with transparent error callbacks/logging                                    |

## Feature Dependencies

```
Stable component API + TS types
    └──requires──> Package entry-point hygiene + peer dependency contract

StrictMode-safe lifecycle
    └──requires──> Deterministic init/cleanup model

SSR/Next compatibility docs
    └──requires──> Client-boundary examples + demo matrix (Next Pages/App)

Bundle-profile recipes
    └──enhances──> Quickstart docs

Version-aligned demo matrix
    └──requires──> CI drift checks

Legacy CRA-centric template strategy
    └──conflicts──> Modern starter focus (Vite/Next)
```

### Dependency Notes

- **Stable API/types require package contract hygiene:** if exports/peer ranges are brittle, even good API design fails at install/import time.
- **SSR compatibility requires explicit client-boundary guidance:** React integrations touching browser APIs must be clearly scoped to client components in mixed server/client frameworks.
- **Modern starter focus conflicts with heavy CRA investment:** React officially deprecated CRA for new apps, so roadmap effort should shift to Vite/Next-first assets.

## MVP Definition

### Launch With (v1)

Minimum viable product — what’s needed to validate and retain users.

- [ ] Stable `<Particles />` API + TypeScript types + strict lifecycle cleanup — core reliability expectation
- [ ] Updated quickstart docs (JS/TS) with slim/basic/full loader guidance — fastest path to successful first render
- [ ] Maintained demos for Vite + Next (Pages + App Router) — confidence that integrations work in real stacks

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] CI-based version drift detection across package/demos/templates — add when release cadence increases
- [ ] Shared provider-driven recipes and migration guides — add when support volume indicates repeated onboarding mistakes

### Future Consideration (v2+)

Features to defer until product-market fit and maintenance bandwidth are strong.

- [ ] Interactive playground + code export — high value but higher implementation/maintenance cost
- [ ] Full visual regression pipeline for demos/examples — valuable for quality, but phase after core compatibility is solid

## Feature Prioritization Matrix

| Feature                                  | User Value | Implementation Cost | Priority |
| ---------------------------------------- | ---------- | ------------------- | -------- |
| Stable API + TS + lifecycle correctness  | HIGH       | MEDIUM              | P1       |
| Modern docs + loader decision guidance   | HIGH       | LOW                 | P1       |
| Vite + Next demo matrix                  | HIGH       | MEDIUM              | P1       |
| CI demo/template drift checks            | MEDIUM     | HIGH                | P2       |
| Provider recipes + advanced guidance     | MEDIUM     | MEDIUM              | P2       |
| Playground + visual regression expansion | MEDIUM     | HIGH                | P3       |

**Priority key:**

- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature                                  | Competitor A                                                          | Competitor B                                              | Our Approach                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Isolated component docs/testing workflow | Storybook-heavy component ecosystems treat stories as source of truth | Many wrapper libs rely only on README snippets            | Keep README + runnable demos now; add story-driven visual checks as quality differentiator |
| Multi-framework starter paths            | Modern libraries prioritize Vite/Next starters                        | Older ecosystems still keep CRA examples for legacy users | Keep CRA as legacy support only; make Vite/Next the primary documented path                |
| Package surface discipline               | Mature libs use explicit package exports and semver peer ranges       | Weaker libs leak internals via deep imports               | Keep explicit public API and avoid undocumented deep import paths                          |

## Sources

- React blog — CRA deprecation announcement (2025-02-14), HIGH: https://react.dev/blog/2025/02/14/sunsetting-create-react-app
- React docs — `useEffect` behavior + StrictMode extra setup/cleanup cycle, HIGH: https://react.dev/reference/react/useEffect
- Node.js docs — package entry points and `exports` guidance, HIGH: https://nodejs.org/api/packages.html#package-entry-points
- npm docs — `peerDependencies` expectations for plugin-style packages, HIGH: https://docs.npmjs.com/cli/v11/configuring-npm/package-json#peerdependencies
- Vite docs — library mode + recommended package.json shape and externalization, HIGH: https://vite.dev/guide/build#library-mode
- Storybook docs — why story-driven isolated development/testing/docs are ecosystem standard, MEDIUM: https://storybook.js.org/docs/get-started/why-storybook
- Repository context (local): `README.md`, `components/react/lib/*`, `apps/*`, `templates/*`, `package.json` files, HIGH

---

_Feature research for: React integration library ecosystem for @tsparticles/react_
_Researched: 2026-04-10_
