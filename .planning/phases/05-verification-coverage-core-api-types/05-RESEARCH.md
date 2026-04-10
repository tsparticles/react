# Phase 5 Research — Verification Coverage for Core API & Types

**Date:** 2026-04-10
**Goal:** Close Phase 1 audit blocker by restoring requirement-level verification evidence.

## What exists now

- Milestone audit reports all Phase 1 requirements (`CORE-01..CORE-05`, `TYPE-01..TYPE-02`) as **orphaned** because `.planning/phases/01-core-api-type-contracts/01-VERIFICATION.md` is missing.
- Evidence sources already exist and are usable:
  - Phase 1 plans: `01-01-PLAN.md`, `01-02-PLAN.md`, `01-03-PLAN.md`
  - Phase 1 summaries: `01-core-api-type-contracts-01/02/03-SUMMARY.md`
  - Requirements definitions: `.planning/REQUIREMENTS.md`
  - Current blocker report: `.planning/v1.0-v1.0-MILESTONE-AUDIT.md`

## Recommended implementation approach

1. Create a complete `01-VERIFICATION.md` for Phase 1 using the GSD verification-report structure.
2. Include a requirements coverage table with one row per requirement ID (`CORE-01..CORE-05`, `TYPE-01..TYPE-02`), with explicit evidence links to concrete files and summary artifacts.
3. Re-run milestone audit generation so orphaned statuses are recalculated from the now-present phase verification table.

## Evidence mapping constraints

- Each requirement row must include:
  - Requirement ID and description (from `REQUIREMENTS.md`)
  - Source plan(s) and summary artifact(s)
  - Status and evidence strings that mention specific files/behaviors
- Avoid generic statements (e.g., “implemented in phase 1”); use exact path-level evidence.

## Common pitfalls

- Adding VERIFICATION without covering all 7 requirement IDs leaves partial/orphaned entries.
- Using vague evidence without file paths risks checker rejection.
- Forgetting to update milestone audit after verification file creation leaves stale blocker output.

## Security and trust boundaries (planning inputs)

- Boundary: planning artifacts (`PLAN/SUMMARY/VERIFICATION`) → audit verdict.
- Main risk class for this phase is **Repudiation** (inadequate audit evidence). Mitigation: deterministic, path-specific evidence in verification tables.

## Validation Architecture

This phase validates documentation/evidence integrity rather than runtime code changes.

- **Fast check command:**
  - `rg "CORE-0[1-5]|TYPE-0[1-2]" .planning/phases/01-core-api-type-contracts/01-VERIFICATION.md`
- **Full check command:**
  - `rg "orphaned|unsatisfied" .planning/v1.0-v1.0-MILESTONE-AUDIT.md`
- **Pass condition:**
  - Verification file contains all 7 REQ IDs.
  - Milestone audit no longer reports those REQ IDs as orphaned due to missing Phase 1 verification.

## Output target

- Main artifact for execution: `.planning/phases/01-core-api-type-contracts/01-VERIFICATION.md`
- Supporting refreshed artifact: `.planning/v1.0-v1.0-MILESTONE-AUDIT.md`
