# Technology Stack

**Analysis Date:** 2026-04-10

## Languages

**Primary:**

- TypeScript 5.x - Library implementation and modern app examples in `components/react/lib/*.ts*`, `apps/react-vite/src/*.ts*`, and `apps/nextjs-beta/**/*.ts*`.
- JavaScript (ES modules and CommonJS scripts) - CRA/Next.js examples and template build scripts in `apps/react/src/*.js`, `apps/nextjs/pages/*.js`, and `templates/*/scripts/prebuild.js`.

**Secondary:**

- YAML - Workspace and CI configuration in `pnpm-workspace.yaml` and `.github/workflows/nodejs.yml`.
- CSS - Demo/template styling in `apps/*/src/*.css`, `components/react/src/*.css`, and `apps/nextjs/styles/*.css`.

## Runtime

**Environment:**

- Node.js 20.x in CI (`.github/workflows/nodejs.yml`).
- Browser runtime for React/Next.js apps and the tsParticles canvas component (`components/react/lib/Particles.tsx`).

**Package Manager:**

- pnpm 10.33.0 pinned at workspace root in `package.json` (`packageManager` field).
- CI installs pnpm 8 in `.github/workflows/nodejs.yml`.
- Lockfile: present (`pnpm-lock.yaml`).

## Frameworks

**Core:**

- React 18/19 - UI framework across all packages (`apps/*/package.json`, `components/react/package.json`).
- Next.js 15.3.0 - Demo SSR/app-router packages in `apps/nextjs/package.json` and `apps/nextjs-beta/package.json`.
- tsParticles ecosystem (`@tsparticles/react`, `@tsparticles/engine`, `tsparticles`) - Particle rendering API and engine integration (`components/react/lib/index.ts`, `components/react/lib/Particles.tsx`).

**Testing:**

- Jest + React Testing Library in CRA-based packages (`apps/react/package.json`, `templates/react-ts/package.json`, `templates/react/template/src/App.test.js`, `templates/react-ts/template/src/App.test.tsx`).

**Build/Dev:**

- Vite 5 + `@vitejs/plugin-react` - Dev server and bundling for library/demo (`components/react/vite.config.ts`, `apps/react-vite/vite.config.ts`).
- TypeScript compiler (`tsc`) - Type checking/build step (`components/react/package.json`, `apps/react-vite/package.json`).
- React Scripts 5 - CRA demo lifecycle (`apps/react/package.json`).
- Nx + Lerna - Monorepo orchestration and package builds (`nx.json`, `lerna.json`, root `package.json` scripts).
- Prettier 3 + ESLint 8 - formatting and lint checks (`package.json`, `components/react/.eslintrc.cjs`, `apps/react-vite/.eslintrc.cjs`, `apps/nextjs/.eslintrc.json`).

## Key Dependencies

**Critical:**

- `@tsparticles/react` 3.0.0 - Published React wrapper package source in `components/react/lib/*`.
- `@tsparticles/engine` (^3.9.1 in apps/templates, ^4.0.0-beta.11 peer/dev in component package) - Runtime engine API used by `components/react/lib/Particles.tsx` and `components/react/lib/index.ts`.
- `tsparticles` ^3.9.1 - Full engine loader used in demos (`apps/react/src/App.js`, `apps/react-vite/src/App.tsx`, `apps/nextjs/pages/index.js`).

**Infrastructure:**

- `vite-plugin-dts` and Rollup config - Type declaration/output generation in `components/react/vite.config.ts`.
- `glob` - Multi-entry library build input generation in `components/react/vite.config.ts`.
- `husky` + `@commitlint/*` - Commit workflow tooling declared at root `package.json`.
- `fs-extra` - Template prebuild mutation scripts in `templates/react/scripts/prebuild.js` and `templates/react-ts/scripts/prebuild.js`.

## Configuration

**Environment:**

- No repository-level `.env` files detected in the workspace root scan.
- CRA templates use `process.env.NODE_ENV` and `process.env.PUBLIC_URL` in service worker files (`templates/react/template/src/serviceWorker.js`, `templates/react-ts/template/src/serviceWorker.ts`).
- No project code in `apps/*` or `components/*` reads custom API secrets or service credentials.

**Build:**

- Workspace and package graph: `pnpm-workspace.yaml`, `lerna.json`, `nx.json`.
- Package-level build configs: `components/react/vite.config.ts`, `apps/react-vite/vite.config.ts`, `apps/nextjs/next.config.js`, `apps/nextjs-beta/next.config.js`, `components/react/tsconfig.json`, `apps/react-vite/tsconfig.json`, `apps/nextjs-beta/tsconfig.json`.
- CI pipeline: `.github/workflows/nodejs.yml`.

## Platform Requirements

**Development:**

- Node.js with pnpm workspace support and TypeScript toolchain (`package.json`, `pnpm-workspace.yaml`).
- Browser environment for local demos (`apps/react`, `apps/react-vite`, `apps/nextjs`, `apps/nextjs-beta`).

**Production:**

- Library publishes ESM bundle + types from `components/react/dist/*`.
- Demo deployment targets are web platforms compatible with Next.js/React static or server rendering; Vercel is referenced in `apps/nextjs/README.md` and `apps/nextjs-beta/README.md`.

---

_Stack analysis: 2026-04-10_
