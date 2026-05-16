# Next.js Baseline - Dependencies

Use this reference when the task is selecting or installing dependency groups.

Install only groups approved by the user.

## Core safety/runtime

- `zod` for input/env validation
- optional: `dotenv` (only if runtime requires manual env loading)

## Lint and format

- ESLint (Next.js compatible)
- Prettier
- optional plugins used by team convention (for example imports/tailwind sorting)

## Unit/integration tests

- Prefer existing runner in repo.
- If no runner exists, baseline preference in this kit is Vitest.
- For React testing:
  - `@testing-library/react`
  - `@testing-library/jest-dom`

## E2E tests

- Playwright (recommended for real flow E2E in Next.js).
- Initialization command:

```bash
npm init playwright@latest
```

## Automation hooks (optional, approval required)

- Husky + lint-staged
- commit message linting
