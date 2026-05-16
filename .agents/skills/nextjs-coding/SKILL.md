---
name: nextjs-coding
description: Build and refactor Next.js App Router features in the current repository. Use when tasks involve creating or updating routes (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, route groups), wiring providers, adding feature logic, integrating shared utilities and services, or mapping code into the repository's Target architecture. Include automation E2E tests for real user flows using Playwright. Treat the Target architecture as the default source of truth for new code placement and only deviate when the user or an explicit local convention requires it.
---

# Next.js Coding

Implement Next.js App Router code for the target repository. Treat the Target architecture below as a mandatory placement contract — not a loose example. Every new file must map to exactly one target layer before writing code.

## Step 1 — Detect repo layout

Before writing any file:

1. Check whether the App Router root is `src/app/` or `app/`.
2. Set `<source-root>` = `src/` if using `src/app/`; otherwise `<source-root>` = repo root.
3. Check which architecture anchors already exist: `modules/`, `shared/`, `services/`, `config/`, `types/`.
4. Use the already-loaded agent instructions for project-specific overrides; read root instruction files only if they are not already in context.
5. Match the import alias and path style already used in nearby files.

## Step 2 — Map every file to a layer

| Concern | Target layer |
|---------|-------------|
| Route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) | `<source-root>/app/...` |
| Domain business logic | `<source-root>/modules/<domain>/` |
| External API calls for a domain | `<source-root>/modules/<domain>/api/` |
| Domain mock API implementation | `<source-root>/modules/<domain>/api/` |
| Business rules and data transforms | `<source-root>/modules/<domain>/services/` |
| Module-scoped React hooks | `<source-root>/modules/<domain>/hooks/` |
| Module-private UI components | `<source-root>/modules/<domain>/components/` |
| Installed shadcn/ui primitives | configured path from `components.json` (often `<source-root>/components/ui/`) |
| Domain TypeScript types / DTOs | `<source-root>/modules/<domain>/types/` |
| Reusable cross-domain code | `<source-root>/shared/` |
| Global API client, auth service | `<source-root>/services/` |
| Typed env config | `<source-root>/config/env.ts` |
| Global shared types | `<source-root>/types/` |

If a file cannot be justified against this table, read more repo context before generating it.

## Target architecture tree

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (private)/
│   │   └── orders/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   └── (public)/
│       └── home/
│           └── page.tsx
├── modules/
│   ├── order/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── components/
│   │   ├── types/
│   │   └── services/
│   └── voucher/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── constants/
├── services/
│   ├── api-client.ts
│   └── auth.service.ts
├── tests/
│   └── e2e/
├── styles/
├── config/
│   └── env.ts
└── types/
```

> Route groups `(private)` and `(public)` are organization-only — they do not appear in URLs.

## Step 3 — Apply App Router conventions

- `params` is async in `page.tsx` and `layout.tsx`; `searchParams` is async in `page.tsx` only. Layouts do not receive `searchParams`.
- `error.tsx` **must** be a Client Component (`'use client'`) and expose recovery through the supported Next.js error boundary prop for the installed version.
- `loading.tsx` is a Suspense boundary fallback — keep it lightweight.
- `page.tsx` composes hooks/components from `modules/<domain>` — no heavy business logic inline.

### Data flow (follow this order)

```
app/.../page.tsx
  → modules/<domain>/hooks  or  modules/<domain>/services
    → modules/<domain>/api
      → if EXTERNAL_API=mock: mockApi
      → if EXTERNAL_API=api: services/api-client.ts
```

### API source switch (mock vs real API)

- Every domain that calls external APIs must provide a mock API implementation inside `<source-root>/modules/<domain>/api/` (for example `mockApi.ts`).
- API access layer must switch source by env variable `EXTERNAL_API`:
  - `EXTERNAL_API=mock` -> use `mockApi`
  - `EXTERNAL_API=api` -> use real API implementation
- Default env value is `EXTERNAL_API=api` when the variable is missing or unspecified.
- Keep the switch logic centralized in the domain API layer (avoid scattering env checks across page/component files).
- `services/api-client.ts` is used only by the real API path (`EXTERNAL_API=api`).
- Mock and real API implementations must share one response contract/type source in `<source-root>/modules/<domain>/types/` to prevent drift.
- For automated tests (unit/integration/E2E/CI), set `EXTERNAL_API=mock` unless the spec explicitly requires validating real/sandbox API behavior.

## Guardrails

- **Never** mix Pages Router (`pages/`) files into this architecture.
- **Never** split App Router across `app/` and `src/app/` — `app/` at root takes precedence and `src/app/` is silently ignored.
- **Never** create `features/` or `lib/` when equivalent target layers already exist.
- **Never** hide business logic in route-private helpers (`_lib`) — put it in `modules/` or `shared/`.
- **Never** create parallel architecture roots (`src/modules/` and `modules/` in the same task).
- **Never** call real API directly from page/component files; always go through `modules/<domain>/api/` with the `EXTERNAL_API` switch.
- Keep `'use client'` minimal — add only when interactivity, hooks, or browser APIs are required.
- Keep import paths consistent with `tsconfig.json` path aliases.
- Do not relocate installed shadcn/ui primitives into domain modules; compose them from the configured registry path.

## Automation E2E Testing (Playwright)

- For user-facing flow changes (navigation, form submit, auth flow, checkout/order flow, multi-step interactions), create or update automation E2E tests.
- E2E tests must validate real flow behavior end-to-end (user action -> UI/state transition -> expected outcome), not implementation details.
- Prefer Playwright, following the official Next.js guide for Playwright E2E setup and usage.
- If Playwright is not set up yet, initialize with:

```bash
npm init playwright@latest
```

- Automation test path convention:
  - Preferred default: `<source-root>/tests/` (with E2E specs under `<source-root>/tests/e2e/`).
  - If the repo already uses another E2E folder convention, keep existing convention and do not duplicate roots.
- Keep naming consistent (for example `*.spec.ts`).
- Run E2E tests for affected flows before finishing (for example `npx playwright test` or project-specific `npm run test:e2e` when available).

## Pre-finish checklist

- [ ] Every new file path is justified against the Target architecture table.
- [ ] No duplicate architecture roots or ad-hoc top-level folders introduced.
- [ ] Root `layout.tsx` defines `<html>` and `<body>`.
- [ ] `error.tsx` is a Client Component with the supported recovery prop for the installed Next.js version.
- [ ] Business logic lives in `modules/` or `services/`, not in route files.
- [ ] Shared code is genuinely cross-domain (used by ≥ 2 domains).
- [ ] shadcn/ui primitives remain in the configured path and feature components compose them.
- [ ] Domain API layer includes `mockApi` and real API path with env switch (`EXTERNAL_API=mock|api`), defaulting to `api`.
- [ ] Mock and real API paths share the same typed contract (no response-shape drift).
- [ ] Automated tests set `EXTERNAL_API=mock` unless real API verification is explicitly required by spec.
- [ ] Automation test files are placed under `<source-root>/tests/` (or existing repo E2E path when already established).
- [ ] Run `npm run lint` if changes are substantial.
- [ ] E2E tests are added/updated for changed user-facing flows and pass for affected scenarios.
