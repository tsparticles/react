# @tsparticles/react

## What This Is

`@tsparticles/react` is the official React wrapper for tsParticles, providing a reusable `<Particles />` component and initialization helpers for React applications. This repository includes the publishable library, runnable demo apps across multiple frameworks, and starter templates so users can integrate particles quickly. It serves React developers who want configurable particle effects with strong TypeScript support and a maintained integration surface.

## Core Value

React developers can add and control tsParticles reliably with minimal setup while keeping full access to engine capabilities.

## Requirements

### Validated

- ✓ Provide a published React package with component and initialization API (`components/react/lib/index.ts`) — existing
- ✓ Support particles configuration through inline options and remote URL in React usage patterns (`README.md`, `components/react/lib/Particles.tsx`) — existing
- ✓ Provide TypeScript-compatible integration with engine types and props contracts (`components/react/lib/IParticlesProps.ts`) — existing
- ✓ Maintain working integration examples across CRA, Vite, Next.js Pages Router, and Next.js App Router (`apps/react`, `apps/react-vite`, `apps/nextjs`, `apps/nextjs-beta`) — existing
- ✓ Provide CRA starter templates for JavaScript and TypeScript adoption paths (`templates/react`, `templates/react-ts`) — existing

### Active

- [ ] Improve compatibility posture across current React and Next.js versions while preserving stable public API behavior
- [ ] Strengthen developer experience guidance so installation and initialization paths remain clear for both JavaScript and TypeScript users
- [ ] Keep demos/templates aligned with current package versions and runtime expectations to reduce onboarding friction

### Out of Scope

- Building a standalone particle engine in this repository — engine development belongs to the broader tsParticles engine packages
- Expanding into non-React framework wrappers here — this repository is focused on React integrations

## Context

This is a brownfield monorepo with an existing codebase map in `.planning/codebase/`. The architecture separates reusable package code (`components/react/lib/*`) from framework demos (`apps/*`) and CRA templates (`templates/*`). Existing examples already cover object-based and URL-based configuration patterns and show both JavaScript and TypeScript usage. The repository uses pnpm workspaces, Nx/Lerna orchestration, Vite for package/demo builds, and CI-based validation.

## Constraints

- **Compatibility**: Keep behavior stable for existing consumers of `@tsparticles/react` — breaking API changes create migration overhead
- **Ecosystem alignment**: Track React, Next.js, and tsParticles ecosystem version shifts — examples/templates become stale quickly
- **Monorepo consistency**: Coordinate changes across package, demos, and templates — drift causes confusion and integration bugs
- **Documentation quality**: README and examples must stay implementation-accurate — docs are primary onboarding surface

## Key Decisions

| Decision                                                                   | Rationale                                                                                  | Outcome   |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------- |
| Initialize as brownfield with inferred validated requirements              | Existing package, demos, and templates are already implemented and should anchor planning  | ✓ Good    |
| Use README.md as idea source for auto initialization                       | README is the canonical articulation of product purpose and usage patterns in this repo    | ✓ Good    |
| Plan in quick depth with parallel execution and all quality agents enabled | Preserve speed while still enforcing research, plan checks, and verification quality gates | — Pending |

---

_Last updated: 2026-04-10 after initialization_
