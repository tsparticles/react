# Testing Patterns

**Analysis Date:** 2026-04-10

## Test Framework

**Runner:**

- Jest via `react-scripts test` in `apps/react/package.json`.
- Config: No standalone `jest.config.*` is detected; CRA defaults are used with per-app setup file `apps/react/src/setupTests.js`.

**Assertion Library:**

- `@testing-library/react` for rendering/assertion queries (`apps/react/src/App.test.js`, `templates/react/template/src/App.test.js`, `templates/react-ts/template/src/App.test.tsx`).
- `@testing-library/jest-dom` matchers via setup files (`apps/react/src/setupTests.js`, `templates/react/template/src/setupTests.js`, `templates/react-ts/template/src/setupTests.ts`).

**Run Commands:**

```bash
pnpm --filter react-demo test                 # Run tests in CRA demo app
pnpm --filter react-demo test --watch         # Watch mode
pnpm --filter react-demo test --coverage      # Coverage
```

## Test File Organization

**Location:**

- Co-located with source files in app/template `src/` directories.
- Examples: `apps/react/src/App.test.js`, `templates/react/template/src/App.test.js`, `templates/react-ts/template/src/App.test.tsx`.

**Naming:**

- Use `*.test.js` and `*.test.tsx` suffixes.

**Structure:**

```
apps/react/src/*.test.js
templates/react/template/src/*.test.js
templates/react-ts/template/src/*.test.tsx
```

## Test Structure

**Suite Organization:**

```typescript
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

Pattern appears in `apps/react/src/App.test.js` and `templates/react-ts/template/src/App.test.tsx`.

**Patterns:**

- Setup pattern: global matcher setup through `setupTests` file imported automatically by CRA (`apps/react/src/setupTests.js`).
- Teardown pattern: Not explicitly defined; rely on Testing Library/Jest default cleanup behavior.
- Assertion pattern: DOM text query + `toBeInTheDocument()` matcher.

## Mocking

**Framework:** Jest (CRA default)

**Patterns:**

```typescript
// No explicit jest.mock(...) patterns detected in current tests.
// Tests render real components and assert visible output.
```

**What to Mock:**

- Not defined in repository tests. Existing tests favor simple render checks without mocks.

**What NOT to Mock:**

- Not defined in repository tests.

## Fixtures and Factories

**Test Data:**

```typescript
// No fixture/factory utilities detected.
// Current tests use inline expectations only.
```

**Location:**

- Not applicable; no fixture/factory directories are detected.

## Coverage

**Requirements:** None enforced (no coverage threshold config detected).

**View Coverage:**

```bash
pnpm --filter react-demo test --coverage
```

## Test Types

**Unit Tests:**

- Present as component render smoke tests in `apps/react/src/App.test.js`, `templates/react/template/src/App.test.js`, and `templates/react-ts/template/src/App.test.tsx`.

**Integration Tests:**

- Not detected.

**E2E Tests:**

- Not used (no Playwright/Cypress config detected).

## Common Patterns

**Async Testing:**

```typescript
// Async test utilities (waitFor/findBy/async test blocks) are not detected
// in current test files.
```

**Error Testing:**

```typescript
// Error-path assertions (throw/reject checks) are not detected
// in current test files.
```

---

_Testing analysis: 2026-04-10_
