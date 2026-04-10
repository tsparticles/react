# Architecture

**Analysis Date:** 2026-04-10

## Pattern Overview

**Overall:** Monorepo package architecture with a reusable React library (`components/react`) plus consumer/demo applications (`apps/*`) and Create React App templates (`templates/*`).

**Key Characteristics:**

- Keep reusable runtime code in `components/react/lib/*` and export through `components/react/lib/index.ts`.
- Keep framework-specific usage examples isolated under `apps/*` (CRA, Vite, Next.js Pages Router, Next.js App Router).
- Keep scaffold artifacts isolated under `templates/*/template/*` and generate `template.json` metadata through `templates/*/scripts/prebuild.js`.

## Layers

**Workspace Orchestration Layer:**

- Purpose: Coordinate package graph, workspace boundaries, and build execution.
- Location: `/package.json`, `/pnpm-workspace.yaml`, `/lerna.json`, `/nx.json`.
- Contains: Workspace declarations, top-level build scripts, versioning/release metadata.
- Depends on: `pnpm`, `lerna`, `nx` from `/package.json`.
- Used by: All subprojects under `/apps/*`, `/components/*`, `/templates/*`.

**Library Runtime Layer:**

- Purpose: Provide the published React API for tsParticles.
- Location: `/components/react/lib/*`.
- Contains: Public exports (`index.ts`), React component (`Particles.tsx`), provider/hook (`ParticlesProvider.tsx`), props contract (`IParticlesProps.ts`).
- Depends on: `react` and `@tsparticles/engine` imports inside `/components/react/lib/*.ts*`.
- Used by: `/apps/react/src/App.js`, `/apps/react-vite/src/App.tsx`, `/apps/nextjs/pages/index.js`, `/apps/nextjs-beta/app/*`, `/templates/*/template/src/App.*`.

**Consumer Application Layer:**

- Purpose: Demonstrate integration behavior in multiple React frameworks.
- Location: `/apps/react`, `/apps/react-vite`, `/apps/nextjs`, `/apps/nextjs-beta`.
- Contains: App entry points and framework boilerplate (`src/index.js`, `src/main.tsx`, `pages/index.js`, `app/page.tsx`).
- Depends on: `@tsparticles/react` workspace package and engine/preset loaders (for example `tsparticles`, `@tsparticles/configs`).
- Used by: Local development and validation of package behavior before publishing.

**Template Packaging Layer:**

- Purpose: Publish CRA starter templates that consume `@tsparticles/react`.
- Location: `/templates/react`, `/templates/react-ts`.
- Contains: Template source trees (`template/src/*`), package descriptors (`template.json`), prebuild version sync scripts (`scripts/prebuild.js`).
- Depends on: Workspace package versions from each template `package.json`.
- Used by: `create-react-app --template particles` and `create-react-app --template particles-typescript` workflows documented in `/README.md`.

## Data Flow

**Runtime Particle Initialization Flow (Library Consumer):**

1. Consumer app calls `initParticlesEngine(...)` from `/components/react/lib/index.ts` (examples: `/apps/react/src/App.js`, `/apps/react-vite/src/App.tsx`, `/apps/nextjs/pages/index.js`, `/apps/nextjs-beta/app/page.tsx`).
2. `initParticlesEngine` dynamically imports `@tsparticles/engine` and passes `tsParticles` to the caller callback (`/components/react/lib/index.ts`).
3. Consumer callback loads plugins/presets (for example `loadFull(engine)` in `/apps/react/src/App.js` and `/apps/react-vite/src/App.tsx`).
4. Consumer renders `<Particles ... />`; component effect in `/components/react/lib/Particles.tsx` imports engine and invokes `tsParticles.load({ id, options, url })`.
5. Loaded container instance is persisted in `containerRef` and destroyed on cleanup (`/components/react/lib/Particles.tsx`) to manage lifecycle.

**Provider-Based Shared Engine Flow:**

1. Application wraps subtree with `<ParticlesProvider particlesInit={...}>` from `/components/react/lib/ParticlesProvider.tsx`.
2. Provider performs a single engine initialization in `useEffect`, stores `{ engine, isReady, error }` in context.
3. Descendants retrieve context via `useParticlesEngine()` (`/components/react/lib/ParticlesProvider.tsx`) and render particle components when ready.

**State Management:**

- Use local React state per app (`useState` in `/apps/*/src/App.*` and `/apps/nextjs-beta/app/page.tsx`) for init flags.
- Use React Context only for shared engine state via `/components/react/lib/ParticlesProvider.tsx`.

## Key Abstractions

**Published Module Boundary (`@tsparticles/react`):**

- Purpose: Define the stable API consumed by external apps.
- Examples: `/components/react/lib/index.ts`, `/components/react/package.json` (`main`, `types`, `files`).
- Pattern: Single barrel export for component, provider, hook, and helper initializer.

**Particles Component Abstraction:**

- Purpose: Bridge declarative React props to imperative `tsParticles.load` calls.
- Examples: `/components/react/lib/Particles.tsx`, `/components/react/lib/IParticlesProps.ts`.
- Pattern: `useEffect`-driven side effect with explicit destroy-on-unmount lifecycle.

**Engine Initialization Abstraction:**

- Purpose: Standardize one-time engine/plugin registration.
- Examples: `/components/react/lib/index.ts` (`initParticlesEngine`), `/components/react/lib/ParticlesProvider.tsx`.
- Pattern: Asynchronous callback-based initializer with dynamic import and optional context sharing.

## Entry Points

**Library Entry Point:**

- Location: `/components/react/lib/index.ts`
- Triggers: Import from `@tsparticles/react` in any consumer package.
- Responsibilities: Export public API and provide `initParticlesEngine` helper.

**CRA Demo Entry Point:**

- Location: `/apps/react/src/index.js`
- Triggers: `react-scripts start/build` via `/apps/react/package.json` scripts.
- Responsibilities: Bootstrap React root and mount `/apps/react/src/App.js`.

**Vite Demo Entry Point:**

- Location: `/apps/react-vite/src/main.tsx`
- Triggers: `vite` commands via `/apps/react-vite/package.json`.
- Responsibilities: Bootstrap React root and mount `/apps/react-vite/src/App.tsx`.

**Next.js Pages Router Entry Points:**

- Location: `/apps/nextjs/pages/_app.js`, `/apps/nextjs/pages/index.js`
- Triggers: `next dev/build/start` via `/apps/nextjs/package.json`.
- Responsibilities: Global app shell and page-level particles integration.

**Next.js App Router Entry Points:**

- Location: `/apps/nextjs-beta/app/layout.tsx`, `/apps/nextjs-beta/app/page.tsx`, `/apps/nextjs-beta/app/particles.tsx`
- Triggers: `next dev/build/start` via `/apps/nextjs-beta/package.json`.
- Responsibilities: App-router layout shell and client-side particles rendering.

## Error Handling

**Strategy:** React-lifecycle error containment with explicit provider error state and hook guardrails.

**Patterns:**

- Catch and store init errors in context (`error` state in `/components/react/lib/ParticlesProvider.tsx`) and mark readiness.
- Throw explicit usage errors when context hook is called outside provider (`useParticlesEngine` in `/components/react/lib/ParticlesProvider.tsx`).

## Cross-Cutting Concerns

**Logging:** Use lightweight console logging in demo/example flows (`console.log` in `/apps/react-vite/src/App.tsx`, `/apps/nextjs/pages/index.js`, `/components/react/lib/ParticlesProvider.tsx`).
**Validation:** Rely on TypeScript contracts in library and TS apps (`/components/react/lib/IParticlesProps.ts`, `/apps/react-vite/src/App.tsx`, `/apps/nextjs-beta/app/page.tsx`).
**Authentication:** Not applicable in this codebase architecture (no auth layer detected in `/components/*`, `/apps/*`, `/templates/*`).

---

_Architecture analysis: 2026-04-10_
