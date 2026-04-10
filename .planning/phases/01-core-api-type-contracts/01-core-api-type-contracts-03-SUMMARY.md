---
phase: 01-core-api-type-contracts
plan: "03"
subsystem: infra
tags: [package-json, compatibility, monorepo, tsparticles]
requires:
  - phase: 01
    provides: stable API and runtime contracts from plans 01 and 02
provides:
  - Core package peer dependency policy aligned to beta engine line with broad React support
  - App/template consumer manifests aligned on engine beta major line
  - Verified workspace compatibility smoke output evidence
affects:
  [phase-02-runtime-reliability, phase-03-docs-examples, phase-04-templates]
tech-stack:
  added: []
  patterns:
    [monorepo dependency line alignment, smoke-driven template lockstep updates]
key-files:
  created: []
  modified:
    - components/react/package.json
    - apps/react/package.json
    - apps/react-vite/package.json
    - apps/nextjs/package.json
    - apps/nextjs-beta/package.json
    - templates/react/package.json
    - templates/react-ts/package.json
    - templates/react/template.json
    - templates/react-ts/template.json
    - .gitignore
key-decisions:
  - "Set @tsparticles/engine peer range to ^4.0.0-beta while retaining React >=16.8.0 <20 compatibility floor."
  - "Committed template.json deltas produced by required smoke prebuild scripts as verification artifacts."
patterns-established:
  - "When workspace build regenerates template dependency manifests, commit resulting template.json files alongside manifest policy updates."
requirements-completed: [CORE-01, CORE-04, TYPE-01]
duration: 3min
completed: 2026-04-10
---

# Phase 1 Plan 03: Core API Type Contracts Summary

**Monorepo dependency contracts now target the `@tsparticles/engine` 4 beta line consistently across library, apps, and templates with CI smoke verification evidence.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-10T13:49:54Z
- **Completed:** 2026-04-10T13:52:39Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments

- Preserved broad React peer compatibility and aligned library peer engine range to `^4.0.0-beta`.
- Updated all specified app/template manifests to compatible `@tsparticles/engine` beta versions without removing framework dependencies.
- Executed package and workspace CI smoke builds and captured generated template dependency artifacts.

## Task Commits

1. **Task 1: Align core package dependency policy to Phase 1 decisions** - `5296d66` (chore)
2. **Task 2: Propagate engine compatibility alignment to apps and templates** - `4e076a4` (chore)
3. **Task 3: Run compatibility smoke validation across consumer matrix** - `b954cac` (chore)

## Files Created/Modified

- `components/react/package.json` - Relaxed engine peer declaration to `^4.0.0-beta` while preserving React peer range and entrypoint fields.
- `apps/react/package.json` - Updated engine dependency to beta line.
- `apps/react-vite/package.json` - Updated engine dependency to beta line.
- `apps/nextjs/package.json` - Updated engine dependency to beta line.
- `apps/nextjs-beta/package.json` - Updated engine dependency to beta line.
- `templates/react/package.json` - Updated engine dependency to beta line.
- `templates/react-ts/package.json` - Updated engine dependency to beta line.
- `templates/react/template.json` - Updated generated template dependency snapshot from smoke prebuild.
- `templates/react-ts/template.json` - Updated generated template dependency snapshot from smoke prebuild.
- `.gitignore` - Added `.nx/` ignore for local build cache output.

## Decisions Made

- Kept D-02 as authoritative by aligning all consumer manifests on the 4 beta engine major line.
- Included generated template snapshots because smoke commands mutate them and they represent the validated dependency state.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Ignored generated `.nx/` cache produced by workspace CI build**

- **Found during:** Task 3 (Run compatibility smoke validation across consumer matrix)
- **Issue:** Workspace smoke build produced untracked `.nx/` cache artifacts that would leave working tree dirty after required verification commands.
- **Fix:** Added `.nx/` to `.gitignore`.
- **Files modified:** .gitignore
- **Verification:** `git status --short` clean after committing task outputs.
- **Committed in:** `b954cac`

---

**Total deviations:** 1 auto-fixed (Rule 3)
**Impact on plan:** No scope creep; fix was required to complete task atomically with clean repository state.

## Issues Encountered

- Template prebuild scripts intentionally rewrite `template.json`; these generated files were committed as part of verification evidence.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 1 core/type contracts and compatibility alignment are complete and verified.
- Ready to begin Phase 2 runtime reliability tasks.

## Threat Flags

| Flag                            | File                             | Description                                                                  |
| ------------------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| threat_flag: generated-manifest | templates/react/template.json    | Smoke prebuild rewrites dependency snapshot consumed by scaffolded projects. |
| threat_flag: generated-manifest | templates/react-ts/template.json | Smoke prebuild rewrites dependency snapshot consumed by scaffolded projects. |

## Self-Check: PASSED

---

_Phase: 01-core-api-type-contracts_
_Completed: 2026-04-10_
