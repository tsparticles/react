# Architecture Research

**Domain:** React wrapper library monorepo (published package + demos + templates)
**Researched:** 2026-04-10
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌────────────────────────────────────────────────────────────────────┐
│                 Workspace Orchestration Layer                     │
├────────────────────────────────────────────────────────────────────┤
│  pnpm workspaces  │  Lerna task runner  │  Nx cache/graph        │
└───────────────┬───────────────────────────────────────────┬────────┘
                │                                           │
┌───────────────▼──────────────────────────┐   ┌────────────▼───────────────┐
│          Published Library Layer         │   │   Verification Matrix Layer │
├──────────────────────────────────────────┤   ├─────────────────────────────┤
│ components/react/lib                     │   │ apps/* + templates/*        │
│ - Particles.tsx                          │   │ - CRA, Vite, Next Pages/App │
│ - ParticlesProvider.tsx                  │   │ - CRA JS/TS templates        │
│ - index.ts (public API boundary)         │   │ - usage + compatibility      │
└───────────────┬──────────────────────────┘   └────────────┬────────────────┘
                │                                           │
┌───────────────▼───────────────────────────────────────────▼────────────────┐
│                     Release Safety & Distribution Layer                    │
├──────────────────────────────────────────────────────────────────────────────┤
│ CI build:ci → package build (tsc + vite) → template prebuild sync → npm   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component                                         | Responsibility                                                   | Typical Implementation                                                         |
| ------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Workspace orchestration (`pnpm` + `lerna` + `nx`) | Package graph, task execution order, caching                     | Root `package.json`, `pnpm-workspace.yaml`, `lerna.json`, `nx.json`            |
| Published API package (`components/react`)        | Stable React API for consumers                                   | `lib/index.ts`, `Particles.tsx`, `ParticlesProvider.tsx`, `IParticlesProps.ts` |
| Demo apps (`apps/*`)                              | Runtime compatibility validation across frameworks               | Per-framework app entrypoints importing `@tsparticles/react`                   |
| Templates (`templates/*`)                         | New-project bootstrap experience with pinned dependency metadata | `template/*` + `scripts/prebuild.js` updating `template.json`                  |
| CI/release workflow                               | Build/test gate before publish                                   | `.github/workflows/nodejs.yml`, package `prepublishOnly` hooks                 |

## Recommended Project Structure

```text
react/
├── components/
│   └── react/
│       ├── lib/                 # Public runtime + API contract only
│       ├── src/                 # Local playground/dev-only artifacts
│       ├── tests/               # Library-level unit/integration tests (add)
│       └── package.json
├── apps/                        # Consumer compatibility matrix (not reusable logic)
│   ├── react/
│   ├── react-vite/
│   ├── nextjs/
│   └── nextjs-beta/
├── templates/                   # Bootstrap scaffolds and version-sync scripts
│   ├── react/
│   └── react-ts/
├── tools/                       # Shared scripts for matrix validation/release checks (add)
└── .github/workflows/           # CI gates
```

### Structure Rationale

- **`components/react/lib/` only for public runtime:** This is the contract surface. Any breaking change detection, API docs, and release decisions should anchor here.
- **`apps/*` and `templates/*` as downstream verifiers, not source-of-truth:** They should consume the package exactly like users do, never import internals.
- **Dedicated `tests/` and `tools/` additions:** improves maintainability by moving validation logic out of demos and into reusable checks.

## Architectural Patterns

### Pattern 1: Contract-First Package Boundary

**What:** Treat `components/react/lib/index.ts` as the only public entry surface; everything else is internal.
**When to use:** Always, for maintainable semver and safe refactors.
**Trade-offs:** Slightly slower to expose new capabilities; much safer release behavior.

**Example:**

```typescript
// components/react/lib/index.ts
export type { IParticlesProps } from "./IParticlesProps";
export { ParticlesProvider, useParticlesEngine } from "./ParticlesProvider";
export { Particles } from "./Particles";
```

### Pattern 2: Two-Phase Engine Lifecycle (init → render)

**What:** Explicit initialization (`initParticlesEngine` or `ParticlesProvider`) before rendering `<Particles />`.
**When to use:** Any integration where plugins/presets must be registered exactly once.
**Trade-offs:** Slightly more ceremony for consumers; prevents duplicate registration and lifecycle bugs.

**Example:**

```typescript
useEffect(() => {
  initParticlesEngine(async (engine) => {
    await loadFull(engine);
  }).then(() => setReady(true));
}, []);
```

### Pattern 3: Consumer-Matrix Verification

**What:** Validate the package against multiple real consumer environments (CRA, Vite, Next pages/app, templates).
**When to use:** Before any release affecting peer deps, module format, SSR behavior, or init flow.
**Trade-offs:** More CI minutes; dramatically better release safety.

**Example:**

```bash
# current direction (already present):
pnpm run build:ci

# recommended extension:
# add per-consumer smoke targets and run only affected projects when possible
```

## Data Flow

### Request Flow

```text
[Consumer App Component]
    ↓ imports
[@tsparticles/react public API]
    ↓ calls
[initParticlesEngine / ParticlesProvider]
    ↓ loads
[@tsparticles/engine + presets]
    ↓
[<Particles /> mounts]
    ↓
[tsParticles.load({id, options|url})]
    ↓
[Container instance callbacks + cleanup on unmount]
```

### State Management

```text
[Consumer state: init/done flags]
    ↓
[Optional Provider context: engine, isReady, error]
    ↓
[Particles component side-effects]
    ↓
[Engine/container lifecycle]
```

### Key Data Flows

1. **Initialization flow (top-down):** app decides loader strategy (`loadFull`/`loadSlim`) and passes it into init callback.
2. **Render flow (top-down):** app passes `options` or `url` props to `<Particles />`; library converts declarative props into imperative engine load.
3. **Lifecycle flow (bottom-up):** engine/container emits readiness via callbacks; component tears down on unmount.
4. **Template sync flow (release-time):** template prebuild script copies current dependency versions into `template.json` before packing.

## Build Order (for roadmap sequencing)

Recommended dependency-aware build order for enhancements:

1. **Public API contract updates (`components/react/lib/*`)**
   - Define types/exports first; avoid demo-first changes.
2. **Library behavior + unit/integration tests (`components/react/tests` proposed)**
   - Validate lifecycle, provider semantics, and callback behavior.
3. **Consumer matrix updates (`apps/*`)**
   - Prove compatibility in React + Next variants.
4. **Template synchronization (`templates/*`)**
   - Update prebuild scripts/metadata after API + demos are stable.
5. **Release gates (CI checks, publish dry-run)**
   - Only publish after matrix + template checks pass.

Dependency chain:

```text
Library contract → Library tests → Demo compatibility → Template sync → Release publish
```

## Scaling Considerations

| Scale             | Architecture Adjustments                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 0-1k consumers    | Current monorepo split is sufficient; prioritize boundary discipline and basic smoke checks                               |
| 1k-100k consumers | Add strict API export map + module-boundary linting + cross-version compatibility CI matrix                               |
| 100k+ consumers   | Add release automation (changesets/provenance), stronger canary channels, and stricter contract testing across frameworks |

### Scaling Priorities

1. **First bottleneck: release confidence** — demos/templates can drift from package behavior. Fix with matrix tests + automated template sync verification.
2. **Second bottleneck: boundary erosion** — demos importing internals or contract sprawl. Fix with explicit export boundaries and dependency constraints.

## Anti-Patterns

### Anti-Pattern 1: Demo-Driven Core Changes

**What people do:** Implement behavior in `apps/*` first, then “copy” into library.
**Why it's wrong:** Demos become divergent logic sources; regressions slip into publish artifacts.
**Do this instead:** Implement in `components/react/lib` first; demos only consume public API.

### Anti-Pattern 2: Unbounded Public Surface

**What people do:** Export internals ad hoc without contract review.
**Why it's wrong:** Semver risk increases and refactoring becomes expensive.
**Do this instead:** Keep a narrow barrel export with explicit intentional additions.

### Anti-Pattern 3: Release Without Consumer Matrix

**What people do:** Publish when library build passes, skipping framework demos/templates.
**Why it's wrong:** Real-world integration breakage appears after release.
**Do this instead:** Require matrix pass (apps + templates + package build) before publish.

## Integration Points

### External Services

| Service                      | Integration Pattern                         | Notes                                                                           |
| ---------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------- |
| npm registry                 | Publish from CI or controlled local release | Use `pnpm publish` options (`--dry-run`, `--provenance`) for safer releases     |
| GitHub Actions               | CI orchestration for build/test/publish     | `setup-node` + token-based auth are standard for Node package publish workflows |
| tsParticles engine ecosystem | Peer dependency + runtime dynamic import    | Keep peer ranges and demo dependencies aligned to avoid compatibility drift     |

### Internal Boundaries

| Boundary                               | Communication                                  | Notes                                                                      |
| -------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| `components/react/lib` ↔ `apps/*`      | Package import (`@tsparticles/react`)          | No internal file imports from apps                                         |
| `components/react/lib` ↔ `templates/*` | Package dependency + generated `template.json` | Version sync script is critical release-safety boundary                    |
| Workspace root ↔ packages              | Task runner (`lerna`, `nx`, `pnpm`)            | Keep graph-driven execution; avoid ad hoc per-package manual release steps |

## Sources

- pnpm workspace protocol and publishing behavior (official docs, updated 2026-03-30): https://pnpm.io/workspaces, https://pnpm.io/cli/publish **(HIGH)**
- Nx affected runs and boundary enforcement (official docs): https://nx.dev/docs/features/ci-features/affected, https://nx.dev/docs/features/enforce-module-boundaries **(HIGH)**
- Lerna run/version workflows (official docs): https://lerna.js.org/docs/features/run-tasks, https://lerna.js.org/docs/features/version-and-publish **(HIGH)**
- Node package entry points (`exports`/`main`) (official Node docs): https://nodejs.org/api/packages.html **(HIGH)**
- TypeScript project references and build mode (official docs, updated 2026-04-06): https://www.typescriptlang.org/docs/handbook/project-references.html **(HIGH)**
- GitHub Actions Node package publishing guidance: https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-nodejs-packages **(MEDIUM-HIGH)**
- npm `package.json` fields (`peerDependencies`, `publishConfig`, etc.): https://docs.npmjs.com/cli/v10/configuring-npm/package-json **(MEDIUM; fetched content was truncated but key sections verified)**

---

_Architecture research for: React library monorepo for reusable UI integrations_
_Researched: 2026-04-10_
