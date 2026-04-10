---
phase: 01
slug: core-api-type-contracts
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-10
---

# Phase 01 - Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **Framework**          | Vitest 3.x + Testing Library                                                            |
| **Config file**        | `components/react/vitest.config.ts`                                                     |
| **Quick run command**  | `pnpm --filter @tsparticles/react test:ci`                                              |
| **Full suite command** | `pnpm --filter @tsparticles/react test:ci && pnpm --filter @tsparticles/react build:ci` |
| **Estimated runtime**  | ~45 seconds                                                                             |

---

## Sampling Rate

- **After every task commit:** Run `pnpm --filter @tsparticles/react test:ci`
- **After every plan wave:** Run `pnpm --filter @tsparticles/react test:ci && pnpm --filter @tsparticles/react build:ci`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID  | Plan | Wave | Requirement | Threat Ref | Secure Behavior                                                      | Test Type   | Automated Command                          | File Exists | Status   |
| -------- | ---- | ---- | ----------- | ---------- | -------------------------------------------------------------------- | ----------- | ------------------------------------------ | ----------- | -------- |
| 01-01-01 | 01   | 1    | TYPE-01     | T-01-01    | Callback aliases remain type-compatible without consumer casts       | unit/type   | `pnpm --filter @tsparticles/react test:ci` | ✅          | ✅ green |
| 01-01-02 | 01   | 1    | TYPE-02     | T-01-01    | `IParticlesProps.options` remains explicit and typed                 | unit/type   | `pnpm --filter @tsparticles/react test:ci` | ✅          | ✅ green |
| 01-01-03 | 01   | 1    | CORE-04     | T-01-02    | `initParticlesEngine` invokes typed callback with engine instance    | unit        | `pnpm --filter @tsparticles/react test:ci` | ✅          | ✅ green |
| 01-02-01 | 02   | 1    | CORE-01     | T-01-04    | `<Particles />` mount triggers engine load behavior                  | integration | `pnpm --filter @tsparticles/react test:ci` | ✅          | ✅ green |
| 01-02-02 | 02   | 1    | CORE-02     | T-01-04    | `options` input is passed through to `tsParticles.load`              | integration | `pnpm --filter @tsparticles/react test:ci` | ✅          | ✅ green |
| 01-02-03 | 02   | 1    | CORE-03     | T-01-06    | `url` input is passed through to `tsParticles.load`                  | integration | `pnpm --filter @tsparticles/react test:ci` | ✅          | ✅ green |
| 01-02-04 | 02   | 1    | CORE-05     | T-01-05    | Render props (`id`, `className`, `style`) are preserved on container | integration | `pnpm --filter @tsparticles/react test:ci` | ✅          | ✅ green |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

Existing infrastructure now covers all phase requirements.

---

## Manual-Only Verifications

All phase behaviors have automated verification.

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-10
