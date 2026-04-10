# Stack Research

**Domain:** React component library maintenance (package + demos + starter templates)
**Researched:** 2026-04-10
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology          | Version                                     | Purpose                                    | Why Recommended                                                                                                                                                                   |
| ------------------- | ------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React               | `19.2.5` (dev/test) + peer range `>=18 <20` | Component runtime + compatibility contract | React 19 is stable and current, but a mature library should keep consumers on React 18 supported via peer range to avoid unnecessary breaking adoption. **Confidence: HIGH**      |
| TypeScript          | `6.0.2`                                     | Types, API contracts, declaration output   | TS is the primary quality gate for a library package API; current version improves inference/perf while still producing standard `.d.ts` outputs. **Confidence: HIGH**            |
| Vite (library mode) | `8.0.8`                                     | Library build + demo dev/build             | Vite is the current standard for fast library/demo workflows; official docs explicitly support browser-oriented library mode and dependency externalization. **Confidence: HIGH** |
| Next.js (demo apps) | `16.2.x`                                    | SSR/App Router compatibility demos         | Next.js 16.x is current stable line; demo apps should prove compatibility with active ecosystem expectations, not just historical versions. **Confidence: MEDIUM**                |
| pnpm workspaces     | `10.33.0`                                   | Monorepo dependency/workspace management   | pnpm’s workspace protocol + lockfile behavior are first-class for monorepos and are now standard in modern OSS repos. **Confidence: HIGH**                                        |

### Supporting Libraries

| Library                | Version                                               | Purpose                              | When to Use                                                                                                               |
| ---------------------- | ----------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Vitest                 | `4.1.4`                                               | Unit/component test runner           | Use for library + Vite demos; tighter integration and faster feedback than Jest in Vite-first repos. **Confidence: HIGH** |
| @testing-library/react | `16.3.2`                                              | React behavior-focused tests         | Use for component behavior contracts and API-level regression checks. **Confidence: HIGH**                                |
| Playwright             | `1.59.1`                                              | Cross-framework demo smoke/E2E tests | Use for “demos actually run” guarantees across Vite + Next templates before release. **Confidence: HIGH**                 |
| Storybook              | `10.3.5`                                              | Interactive component docs/sandbox   | Use when maintainers need visual/manual verification and reproducible usage docs. **Confidence: MEDIUM**                  |
| ESLint                 | `10.2.0` + `typescript-eslint 8.58.1`                 | Linting for TS/React code quality    | Use flat config, typed rules where practical; this is the current lint stack direction. **Confidence: HIGH**              |
| Prettier               | `3.8.2`                                               | Formatting consistency               | Keep deterministic formatting in multi-package repo unless intentionally migrating to Biome. **Confidence: HIGH**         |
| Changesets             | `@changesets/cli 2.30.0` + `changesets/action v1.7.0` | Versioning/changelog/release PRs     | Use for predictable package release workflow in monorepos; industry-standard pairing with pnpm. **Confidence: HIGH**      |

### Development Tools

| Tool                                           | Purpose                                         | Notes                                                                                                             |
| ---------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| GitHub Actions + npm Trusted Publishing (OIDC) | Secure package publishing                       | Prefer OIDC publish over long-lived npm tokens; requires npm CLI `>=11.5.1` and Node `>=22.14.0` in release jobs. |
| Nx                                             | Task graph + cache + affected runs              | Keep for CI speed and selective execution across package + demos + templates.                                     |
| Lerna (minimal scope)                          | Workspace orchestration/version-publish helpers | Use only where needed (e.g., publish orchestration); avoid duplicating responsibilities with Nx + Changesets.     |

## Installation

```bash
# Core
pnpm add -D typescript@^6 vite@^8 @vitejs/plugin-react@^6

# Supporting
pnpm add -D vitest@^4 @testing-library/react@^16 @testing-library/jest-dom@^6 jsdom@^29
pnpm add -D @playwright/test@^1.59 storybook@^10

# Lint/format/release
pnpm add -D eslint@^10 @eslint/js@^10 typescript-eslint@^8 prettier@^3
pnpm add -D @changesets/cli@^2 @changesets/changelog-github@^0.6
```

## Alternatives Considered

| Recommended     | Alternative                | When to Use Alternative                                                                                    |
| --------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Vitest          | Jest                       | Only keep Jest for legacy CRA/template compatibility while migration is in progress.                       |
| pnpm workspaces | npm/yarn workspaces        | Use only if org-wide tooling mandates npm/yarn; otherwise pnpm gives better monorepo ergonomics and speed. |
| Changesets      | Lerna version/publish only | Use Lerna-only release flow only for very simple repos with no need for release PR/changelog automation.   |
| Storybook       | No component explorer      | Skip Storybook only if docs are code-snippet-only and maintainers accept less visual QA.                   |

## What NOT to Use

| Avoid                                                                                      | Why                                                                                                      | Use Instead                                                                                                   |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Create React App / `react-scripts` for new demos/templates                                 | CRA is explicitly deprecated and in long-term stasis; this causes ecosystem drift and outdated DX.       | Vite templates for client demos; Next.js for SSR demos.                                                       |
| npm automation tokens for publish as default                                               | Long-lived publish tokens are higher-risk than OIDC and increase secret-management burden.               | npm Trusted Publishing (OIDC) in GitHub Actions/GitLab/CircleCI.                                              |
| Beta-only peer dependency lines for core runtime packages (unless whole ecosystem is beta) | Publishing stable library versions against beta peer deps creates avoidable compatibility/support churn. | Stable peer ranges (e.g., stable `@tsparticles/engine` major) with beta only in explicit prerelease channels. |

## Stack Patterns by Variant

**If the goal is a stable npm library release:**

- Use React peer range `>=18 <20`, TS strict mode, Vite library mode, Changesets + OIDC publishing.
- Because this minimizes consumer breakage and release risk while keeping maintainer velocity high.

**If the goal is ecosystem compatibility confidence:**

- Use at least one Vite demo and one Next.js demo on current stable major, both covered by Playwright smoke tests.
- Because library regressions usually appear first in framework integration edges, not isolated unit tests.

**If legacy templates must remain available temporarily:**

- Keep legacy templates isolated and clearly labeled, but stop investing in new CRA-based surface area.
- Because maintenance cost compounds quickly on deprecated tooling.

## Version Compatibility

| Package A                  | Compatible With                   | Notes                                                                                              |
| -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `react@19.x` (dev)         | peer `react >=18 <20`             | Develop on latest, publish broad peer range for consumers.                                         |
| `vitest@4.x`               | `vite >=6`, Node `>=20`           | Official requirement from Vitest docs.                                                             |
| `eslint@10.x`              | `typescript-eslint@8.x`           | Use modern flat config style.                                                                      |
| `next@16.2.x` demos        | React 19 line                     | Keep a compatibility demo on current Next stable; do not lock demos to stale major lines.          |
| `@tsparticles/react@3.0.0` | `@tsparticles/engine` stable line | Avoid publishing stable wrapper against engine beta peer unless intentionally in prerelease track. |

## Sources

- React v19 stable post: https://react.dev/blog/2024/12/05/react-19 — verified current React baseline (**HIGH**)
- React “Start a New React Project” guidance: https://react.dev/learn/start-a-new-react-project — framework/tooling direction (**HIGH**)
- Vite docs (v8.0.8): https://vite.dev/guide/ and https://vite.dev/guide/build#library-mode — library-mode + Node requirements (**HIGH**)
- Vitest docs (v4.1.4): https://vitest.dev/guide/ — Vite/Node requirements (**HIGH**)
- pnpm workspace docs (10.x): https://pnpm.io/workspaces — monorepo + release tooling guidance (**HIGH**)
- npm Trusted Publishing docs (edited 2026-03-25): https://docs.npmjs.com/trusted-publishers — OIDC workflow and requirements (**HIGH**)
- Lerna OIDC recipe (v9+): https://lerna.js.org/docs/recipes/oidc-trusted-publishing (**MEDIUM**)
- Storybook docs (v10.3): https://storybook.js.org/docs (**MEDIUM**)
- Next.js blog index + 16/16.2 release posts: https://nextjs.org/blog (**MEDIUM**)
- CRA deprecation notice: https://github.com/facebook/create-react-app (**HIGH**)
- npm registry versions validated on 2026-04-10 via `npm view` for all recommended packages (**HIGH**)

---

_Stack research for: React library package + demos/templates maintenance_
_Researched: 2026-04-10_
