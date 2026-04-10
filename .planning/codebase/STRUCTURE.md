# Codebase Structure

**Analysis Date:** 2026-04-10

## Directory Layout

```text
react/
├── apps/                  # Runnable demo/consumer applications (CRA, Vite, Next.js)
│   ├── react/             # Create React App JavaScript demo
│   ├── react-vite/        # Vite + React TypeScript demo
│   ├── nextjs/            # Next.js Pages Router demo
│   └── nextjs-beta/       # Next.js App Router demo
├── components/            # Publishable workspace packages
│   └── react/             # @tsparticles/react package source and build config
├── templates/             # CRA template packages (JS and TS)
│   ├── react/             # cra-template-particles
│   └── react-ts/          # cra-template-particles-typescript
├── .github/workflows/     # CI workflows
├── .planning/codebase/    # Generated architecture/quality/stack planning docs
├── package.json           # Workspace root scripts and tooling deps
├── pnpm-workspace.yaml    # Workspace package globs
├── lerna.json             # Lerna monorepo config and versioning
└── nx.json                # Nx target defaults/cache config
```

## Directory Purposes

**`apps/`:**

- Purpose: Keep runnable integration examples separate from publishable package code.
- Contains: Framework app entry points, framework configs, static assets, and demo UI code.
- Key files: `/apps/react/src/App.js`, `/apps/react-vite/src/App.tsx`, `/apps/nextjs/pages/index.js`, `/apps/nextjs-beta/app/page.tsx`.

**`components/react/`:**

- Purpose: Host the reusable library package published as `@tsparticles/react`.
- Contains: Public runtime code in `/components/react/lib/*`, packaging/build config, and local playground files in `/components/react/src/*`.
- Key files: `/components/react/lib/index.ts`, `/components/react/lib/Particles.tsx`, `/components/react/lib/ParticlesProvider.tsx`, `/components/react/package.json`, `/components/react/vite.config.ts`.

**`templates/`:**

- Purpose: Distribute CRA starter templates with particles prewired.
- Contains: Template source in `/templates/*/template/*`, template metadata in `/templates/*/template.json`, prebuild scripts in `/templates/*/scripts/prebuild.js`.
- Key files: `/templates/react/template/src/App.js`, `/templates/react-ts/template/src/App.tsx`, `/templates/react/scripts/prebuild.js`, `/templates/react-ts/scripts/prebuild.js`.

**`.github/workflows/`:**

- Purpose: Define CI behavior for pushes and pull requests.
- Contains: GitHub Actions workflow YAML.
- Key files: `/.github/workflows/nodejs.yml`.

## Key File Locations

**Entry Points:**

- `/components/react/lib/index.ts`: Public module entry and API exports for `@tsparticles/react`.
- `/apps/react/src/index.js`: CRA bootstrap entry.
- `/apps/react-vite/src/main.tsx`: Vite bootstrap entry.
- `/apps/nextjs/pages/_app.js`: Next.js Pages Router app shell entry.
- `/apps/nextjs/pages/index.js`: Next.js Pages Router primary page entry.
- `/apps/nextjs-beta/app/layout.tsx`: Next.js App Router root layout entry.
- `/apps/nextjs-beta/app/page.tsx`: Next.js App Router page entry.

**Configuration:**

- `/package.json`: Root scripts and tool dependencies.
- `/pnpm-workspace.yaml`: Workspace package inclusion rules.
- `/lerna.json`: Monorepo package list and version command settings.
- `/nx.json`: Nx target defaults and caching.
- `/components/react/vite.config.ts`: Library bundling and externalization.
- `/apps/react-vite/vite.config.ts`: Demo Vite app config.
- `/apps/nextjs/next.config.js`: Next.js Pages Router config.
- `/apps/nextjs-beta/next.config.js`: Next.js App Router demo config.

**Core Logic:**

- `/components/react/lib/Particles.tsx`: Component lifecycle and `tsParticles.load` integration.
- `/components/react/lib/ParticlesProvider.tsx`: Shared engine context/provider pattern.
- `/components/react/lib/IParticlesProps.ts`: Public props contract.
- `/components/react/lib/index.ts`: Initializer helper and exports.

**Testing:**

- `/apps/react/src/App.test.js`: CRA demo test.
- `/templates/react/template/src/App.test.js`: JavaScript template test scaffold.
- `/templates/react-ts/template/src/App.test.tsx`: TypeScript template test scaffold.
- `/apps/react/src/setupTests.js`: CRA test setup.
- `/templates/react/template/src/setupTests.js`: JS template test setup.
- `/templates/react-ts/template/src/setupTests.ts`: TS template test setup.

## Naming Conventions

**Files:**

- React components commonly use PascalCase filenames: `Particles.tsx`, `ParticlesProvider.tsx`, `App.tsx`.
- Entry files use framework defaults: `index.js`, `main.tsx`, `_app.js`, `page.tsx`, `layout.tsx`.
- Type/interface files are prefixed with `I` in the library: `IParticlesProps.ts`.

**Directories:**

- Workspace segments are plural and role-based: `apps/`, `components/`, `templates/`.
- Package directories are framework or package-name oriented: `react-vite`, `nextjs-beta`, `react-ts`.

## Where to Add New Code

**New Feature:**

- Primary code: Add public runtime behavior in `/components/react/lib/` (and export from `/components/react/lib/index.ts`).
- Tests: Add library-facing behavioral checks in consumer examples under `/apps/react/src/` or template scaffolds under `/templates/*/template/src/` based on target runtime.

**New Component/Module:**

- Implementation: Place reusable module files in `/components/react/lib/` and keep demo usage in `/apps/*/src/` or `/apps/*/app/`.

**Utilities:**

- Shared helpers: Place package-level helpers in `/components/react/lib/` near related runtime modules; keep template-only helpers inside `/templates/*/template/src/`.

## Special Directories

**`/components/react/dist/`:**

- Purpose: Built distributable artifacts for `@tsparticles/react`.
- Generated: Yes.
- Committed: Yes (directory present in repository tree).

**`/apps/react/build/`, `/apps/react-vite/dist/`, `/apps/nextjs/.next/`, `/apps/nextjs-beta/.next/`:**

- Purpose: Build output for demo apps.
- Generated: Yes.
- Committed: Yes (directories present in repository tree).

**`/templates/*/template/`:**

- Purpose: Scaffold files copied into generated CRA projects.
- Generated: No (source template content maintained in repo).
- Committed: Yes.

**`/.planning/codebase/`:**

- Purpose: Internal architecture/planning analysis docs used by orchestration commands.
- Generated: Yes.
- Committed: Yes (designed for repository documentation workflows).

---

_Structure analysis: 2026-04-10_
