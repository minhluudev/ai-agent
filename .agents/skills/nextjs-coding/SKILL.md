---
name: nextjs-coding
description: Build and refactor Next.js App Router features in the current repository. Use when tasks involve creating or updating routes (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, route groups), wiring providers, adding feature logic, integrating shared utilities and services, or mapping code into the repository's Target architecture. Treat the Target architecture as the default source of truth for new code placement and only deviate when the user or an explicit local convention requires it.
---

# Next.js Coding

Implement Next.js 16 App Router code. Treat the Target architecture below as a mandatory placement contract — not a loose example. Every new file must map to exactly one target layer before writing code.

## Step 1 — Detect repo layout

Before writing any file:

1. Check whether the App Router root is `src/app/` or `app/`.
2. Set `<source-root>` = `src/` if using `src/app/`; otherwise `<source-root>` = repo root.
3. Check which architecture anchors already exist: `modules/`, `shared/`, `services/`, `config/`, `types/`.
4. Read `CLAUDE.md` or `AGENTS.md` for project-specific overrides.
5. Match the import alias and path style already used in nearby files.

## Step 2 — Map every file to a layer

| Concern | Target layer |
|---------|-------------|
| Route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) | `<source-root>/app/...` |
| Domain business logic | `<source-root>/modules/<domain>/` |
| External API calls for a domain | `<source-root>/modules/<domain>/api/` |
| Business rules and data transforms | `<source-root>/modules/<domain>/services/` |
| Module-scoped React hooks | `<source-root>/modules/<domain>/hooks/` |
| Module-private UI components | `<source-root>/modules/<domain>/components/` |
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
├── styles/
├── config/
│   └── env.ts
└── types/
```

> Route groups `(private)` and `(public)` are organization-only — they do not appear in URLs.

## Step 3 — Apply App Router conventions

- `params` and `searchParams` are **async** (promises) in App Router `page.tsx` / `layout.tsx`.
- `error.tsx` **must** be a Client Component (`'use client'`) and call `unstable_retry()`.
- `loading.tsx` is a Suspense boundary fallback — keep it lightweight.
- `page.tsx` composes hooks/components from `modules/<domain>` — no heavy business logic inline.

### Data flow (follow this order)

```
app/.../page.tsx
  → modules/<domain>/hooks  or  modules/<domain>/services
    → modules/<domain>/api
      → services/api-client.ts
```

## Guardrails

- **Never** mix Pages Router (`pages/`) files into this architecture.
- **Never** split App Router across `app/` and `src/app/` — `app/` at root takes precedence and `src/app/` is silently ignored.
- **Never** create `features/` or `lib/` when equivalent target layers already exist.
- **Never** hide business logic in route-private helpers (`_lib`) — put it in `modules/` or `shared/`.
- **Never** create parallel architecture roots (`src/modules/` and `modules/` in the same task).
- Keep `'use client'` minimal — add only when interactivity, hooks, or browser APIs are required.
- Keep import paths consistent with `tsconfig.json` path aliases.

## Pre-finish checklist

- [ ] Every new file path is justified against the Target architecture table.
- [ ] No duplicate architecture roots or ad-hoc top-level folders introduced.
- [ ] Root `layout.tsx` defines `<html>` and `<body>`.
- [ ] `error.tsx` is a Client Component with `unstable_retry()`.
- [ ] Business logic lives in `modules/` or `services/`, not in route files.
- [ ] Shared code is genuinely cross-domain (used by ≥ 2 domains).
- [ ] Run `npm run lint` if changes are substantial.
