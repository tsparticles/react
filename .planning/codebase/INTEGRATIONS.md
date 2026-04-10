# External Integrations

**Analysis Date:** 2026-04-10

## APIs & External Services

**Particle Rendering Engine:**

- tsParticles engine/runtime - Core rendering and configuration loading for particle effects.
  - SDK/Client: `@tsparticles/react`, `@tsparticles/engine`, `tsparticles` in `components/react/package.json`, `apps/react/package.json`, `apps/react-vite/package.json`, `apps/nextjs/package.json`, and `apps/nextjs-beta/package.json`.
  - Auth: Not applicable.

**Remote Configuration Endpoint (consumer-provided):**

- Arbitrary JSON URL passed through the React component `url` prop and loaded by engine call in `components/react/lib/Particles.tsx` (`tsParticles.load({ id, options, url })`).
  - SDK/Client: `@tsparticles/engine` loader API used by `components/react/lib/Particles.tsx`.
  - Auth: Not detected in repository code.

**Example HTTP Endpoint (local demo):**

- Next.js demo API route returns static JSON in `apps/nextjs/pages/api/hello.js` and `apps/nextjs-beta/pages/api/hello.ts`.
  - SDK/Client: Next.js built-in API routes.
  - Auth: None.

## Data Storage

**Databases:**

- Not detected.
  - Connection: Not applicable.
  - Client: Not applicable.

**File Storage:**

- Local filesystem only for build-time/template scripts using `fs-extra` in `templates/react/scripts/prebuild.js` and `templates/react-ts/scripts/prebuild.js`.

**Caching:**

- CI dependency cache via GitHub Actions cache in `.github/workflows/nodejs.yml` (pnpm store path cache).
- No application-level Redis/memcached/browser persistence integration detected.

## Authentication & Identity

**Auth Provider:**

- None.
  - Implementation: Not applicable; no auth libraries or token handling imports detected in `apps/*` or `components/*` code.

## Monitoring & Observability

**Error Tracking:**

- None detected (no Sentry/Datadog/Bugsnag packages/imports).

**Logs:**

- Console logging in demos and provider initialization paths, e.g. `console.log` in `apps/react-vite/src/App.tsx`, `apps/react/src/App.js`, `apps/nextjs/pages/index.js`, and `console.error` in `components/react/lib/ParticlesProvider.tsx`.

## CI/CD & Deployment

**Hosting:**

- Not hard-configured in code; Next.js READMEs reference Vercel as deployment option in `apps/nextjs/README.md` and `apps/nextjs-beta/README.md`.

**CI Pipeline:**

- GitHub Actions workflow in `.github/workflows/nodejs.yml` running install + `pnpm run build:ci` on push/PR for `main` and `legacy`.

## Environment Configuration

**Required env vars:**

- For CRA service worker templates only: `NODE_ENV`, `PUBLIC_URL` in `templates/react/template/src/serviceWorker.js` and `templates/react-ts/template/src/serviceWorker.ts`.
- No required third-party API credential variables detected (no `NEXT_PUBLIC_*`, `REACT_APP_*`, or service-specific secret keys in source).

**Secrets location:**

- Repository does not expose secret files in scanned paths; no `.env*` files detected in root scan.
- CI can reference GitHub secrets (commented Nx Cloud token placeholder) in `.github/workflows/nodejs.yml`.

## Webhooks & Callbacks

**Incoming:**

- None detected (no webhook receiver routes).

**Outgoing:**

- None detected as fixed integrations.
- Consumer-specified outbound fetch behavior exists indirectly through tsParticles URL loading when `url` prop is provided (`components/react/lib/Particles.tsx`).

---

_Integration audit: 2026-04-10_
