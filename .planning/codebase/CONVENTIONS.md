# Coding Conventions

**Analysis Date:** 2026-04-10

## Naming Patterns

**Files:**

- Use `PascalCase.tsx` for React components and component-adjacent modules in the library (`components/react/lib/Particles.tsx`, `components/react/lib/ParticlesProvider.tsx`, `components/react/lib/IParticlesProps.ts`).
- Use `camelCase.ts` for utility-like exports and lowercase entry files (`components/react/lib/index.ts`, `components/react/src/main.tsx`, `apps/react/src/index.js`).
- Use framework-conventional filenames in Next.js apps (`apps/nextjs/pages/_app.js`, `apps/nextjs/pages/index.js`, `apps/nextjs-beta/app/layout.tsx`, `apps/nextjs-beta/app/page.tsx`).
- Use `*.test.*` for test files colocated with source (`apps/react/src/App.test.js`, `templates/react/template/src/App.test.js`, `templates/react-ts/template/src/App.test.tsx`).

**Functions:**

- Use `PascalCase` for React function components (`components/react/lib/ParticlesProvider.tsx`, `apps/react-vite/src/App.tsx`, `apps/nextjs-beta/app/page.tsx`).
- Use `camelCase` for callbacks and helpers (`components/react/lib/index.ts` `initParticlesEngine`, `apps/react/src/App.js` `particlesLoaded`, `lightTheme`, `darkTheme`).

**Variables:**

- Use `camelCase` for local variables and state (`containerRef`, `particlesInitialized`, `contextEngine`, `isReady`).
- Use bracketed spacing style in several app/template files (`const [ init, setInit ] = useState(false);` in `apps/react/src/App.js`, `templates/react-ts/template/src/App.tsx`, `apps/nextjs-beta/app/page.tsx`).

**Types:**

- Use `I`-prefixed interface names for public prop contracts (`components/react/lib/IParticlesProps.ts`).
- Use explicit imported types in TypeScript modules (`components/react/lib/Particles.tsx`, `apps/react-vite/src/App.tsx`, `apps/nextjs-beta/pages/api/hello.ts`).

## Code Style

**Formatting:**

- Tool used: Prettier via scripts in `package.json` and `components/react/package.json` (`prettier --write` and `prettier --check`).
- Key settings: No dedicated `.prettierrc*` is detected; rely on Prettier defaults and per-file formatting.
- Style is not fully uniform across workspace apps (double quotes + semicolons in `components/react/lib/*.tsx`, single quotes and semicolon-optional style in `apps/react-vite/src/*.tsx`). Keep formatting aligned with the package you modify.

**Linting:**

- Tool used: ESLint.
- TypeScript/Vite packages (`components/react/.eslintrc.cjs`, `apps/react-vite/.eslintrc.cjs`) enforce:
  - `eslint:recommended`
  - `plugin:@typescript-eslint/recommended`
  - `plugin:react-hooks/recommended`
  - `react-refresh/only-export-components` (warn)
- Next.js packages (`apps/nextjs/.eslintrc.json`, `apps/nextjs-beta/.eslintrc.json`) use `next/core-web-vitals`.
- CRA app (`apps/react/package.json`) uses `react-app` and `react-app/jest` via `eslintConfig`.

## Import Organization

**Order:**

1. External packages and type imports (`@tsparticles/*`, `react`, `next/*`) in files like `components/react/lib/Particles.tsx` and `apps/nextjs/pages/index.js`.
2. Internal modules/assets (`./IParticlesProps`, `./particles`, `./logo.svg`).
3. Stylesheet imports (`./App.css`, `../styles/globals.css`).

**Path Aliases:**

- Not detected. Use relative imports (`./`, `../`) and package imports.

## Error Handling

**Patterns:**

- Use defensive async initialization with `try/catch` and guarded state updates in effects (`components/react/lib/ParticlesProvider.tsx`).
- Use early returns to short-circuit invalid or already-initialized states (`apps/react/src/App.js`, `apps/react-vite/src/App.tsx`).
- Use optional chaining for nullable runtime objects (`containerRef.current?.destroy()` in `components/react/lib/Particles.tsx`).
- In shared library code, throw explicit errors for invalid hook context (`useParticlesEngine` in `components/react/lib/ParticlesProvider.tsx`).

## Logging

**Framework:** console

**Patterns:**

- Keep production-relevant library failures logged with clear context (`console.error("Failed to initialize particles engine:", error)` in `components/react/lib/ParticlesProvider.tsx`).
- Demo/sample apps log lifecycle events during integration (`apps/react-vite/src/App.tsx`, `apps/nextjs/pages/index.js`).

## Comments

**When to Comment:**

- Use comments to explain non-obvious behavior and lifecycle assumptions, especially async initialization and build entry mapping (`components/react/lib/Particles.tsx`, `components/react/vite.config.ts`).
- Keep boilerplate explanatory comments in scaffolded files (`apps/react/src/setupTests.js`, `apps/react/src/index.js`).

**JSDoc/TSDoc:**

- Public provider/hook APIs use doc blocks in shared library code (`components/react/lib/ParticlesProvider.tsx`).
- Most app/demo modules use minimal inline comments only.

## Function Design

**Size:**

- Components typically remain single-purpose and moderate in size; larger demo components inline configuration objects (for example `apps/react/src/App.js`).

**Parameters:**

- Use typed props interfaces in the library (`IParticlesProps` in `components/react/lib/IParticlesProps.ts`).
- Use typed callback parameters where TypeScript is active (`Container` in `apps/react-vite/src/App.tsx`, `Engine` in `apps/nextjs-beta/app/page.tsx`).

**Return Values:**

- React components return JSX.
- Async helpers return `Promise<void>` for initialization flows (`components/react/lib/index.ts` `initParticlesEngine`).

## Module Design

**Exports:**

- Use mixed default + named exports for primary component plus helpers (`components/react/lib/index.ts` exports default `Particles`, named `Particles`, `ParticlesProvider`, `useParticlesEngine`, and `initParticlesEngine`).
- Use default export for app page/component entry modules (`apps/nextjs/pages/index.js`, `apps/nextjs-beta/app/page.tsx`, `apps/react-vite/src/App.tsx`).

**Barrel Files:**

- Use a top-level barrel for package API surface (`components/react/lib/index.ts`).
- Additional barrel files are not detected.

---

_Convention analysis: 2026-04-10_
