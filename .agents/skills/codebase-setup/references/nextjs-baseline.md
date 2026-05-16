# Next.js Baseline Setup Reference

Use this reference when the target codebase is Next.js App Router.

## 1. Target structure (default)

```text
<source-root>/
├── app/
├── modules/
├── shared/
├── services/
├── styles/
├── config/
├── types/
└── tests/
```

Notes:
- `<source-root>` is `src/` when app router is under `src/app`, otherwise repo root.
- Keep domain code under `modules/<domain>/...`.
- Keep automation tests under `<source-root>/tests/` (recommended E2E specs in `<source-root>/tests/e2e/`).
- Route groups such as `(public)` / `(private)` are optional but should stay under `app/`.
- Never split App Router across both `app/` and `src/app/`.

## 2. Baseline dependency groups

Install only groups approved by the user.

### A) Core safety/runtime

- `zod` for input/env validation
- optional: `dotenv` (only if runtime requires manual env loading)

### B) Lint and format

- ESLint (Next.js compatible)
- Prettier
- optional plugins used by team convention (for example imports/tailwind sorting)

### C) Unit/integration tests

- Prefer existing runner in repo.
- If no runner exists, baseline preference in this kit is Vitest.
- For React testing:
  - `@testing-library/react`
  - `@testing-library/jest-dom`

### D) E2E tests

- Playwright (recommended for real flow E2E in Next.js).
- Initialization command:

```bash
npm init playwright@latest
```

### E) Automation hooks (optional, approval required)

- Husky + lint-staged
- commit message linting

## 3. Baseline scripts (package.json)

Use existing script names when present. Otherwise prefer:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

## 4. Config baseline checklist

- `tsconfig.json`: strict mode, path aliases aligned to folder structure
- `tsconfig.json` alias baseline for this repo:
  - set `compilerOptions.baseUrl` to project root (`"."`)
  - set `compilerOptions.paths["~/*"]`:
    - `["./src/*"]` when app router is `src/app`
    - `["./*"]` when app router is root `app`
  - use `~/` as default internal import prefix after setup
- lint config: no conflict with Next defaults
- formatter config: stable formatting and import order policy
- test config: jsdom/node environments as needed
- E2E config: base URL, retries (CI), trace/screenshot policy
- env handling:
  - define required env keys in a typed schema
  - provide safe defaults when acceptable
  - never commit secret values

## 5. API source switching (when external APIs exist)

If project follows `nextjs-coding` API switch rules:

- Keep API access in `modules/<domain>/api/`
- Provide both mock and real implementations when required
- Switch by `EXTERNAL_API`:
  - `mock` -> mock API
  - `api` -> real API
- Runtime default is `api` in this repo setup baseline.
- For automated tests, prefer `mock` unless spec requires real/sandbox verification.
- Ensure mock and real API share the same response contract type.
- Keep env-switch logic centralized in the domain API layer (do not scatter checks in route/components).

## 5.1 Architecture guardrails to enforce

- Do not create `features/` or `lib/` as parallel architecture roots when `modules/` + `shared/` are in use.
- Do not call real API directly from route/component files.
- Keep business logic in `modules/`/`services`, not in `app/.../page.tsx`.

## 6. Verification order

Run in this order where applicable:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`
5. `npm run test:e2e` (or scoped playwright command)

If any command is unavailable, report missing setup explicitly.
Also verify at least one `~/` import resolves successfully in both typecheck and build.
