---
name: nextjs-coding
description: Build and refactor Next.js App Router features in the current repository. Use when tasks involve creating or updating routes (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, route groups), wiring providers, adding feature logic, integrating shared utilities and services, or mapping code into the repository's Target architecture. Include automation E2E tests for real user flows using Playwright. Treat the Target architecture as the default source of truth for new code placement and only deviate when the user or an explicit local convention requires it.
---

# Next.js Coding

Implement Next.js App Router code for the target repository.
This skill is now split into 2 parts:
- `rules/`: one rule file per directory/file concern.
- `templates/`: starter templates mapped to each target location.

## Step 1 - Detect repo layout

Before writing any file:

1. Check whether App Router root is `src/app/` or `app/`.
2. Set `<source-root>` = `src/` if using `src/app/`; otherwise `<source-root>` = repo root.
3. Confirm architecture anchors exist: `containers/`, `components/`, `utils/`, `constants/`, `services/mockApi/`, `services/`, `config/`, `types/`.
4. Match import alias/path style used by nearby files.

## Step 2 - Target architecture tree

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (private)/
│   │   └── <url-path-name>/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── error.tsx
│   └── (public)/
│       └── <url-path-name>/
│           └── page.tsx
├── containers/
│   ├── <url-path-name-container>/
│   │   ├── types/
│   │   ├── components/
│   │   ├── controller.ts
│   │   └── index.tsx
│   └── <url-path-name-container>/
├── components/
│   └── <component-name>/
├── utils/
├── constants/
├── services/
│   ├── mockApi/
│   │   └── <service-name>.mock.ts
│   ├── api-client.ts
│   └── <service-name>.service.ts
├── tests/
│   └── e2e/
├── styles/
├── config/
│   └── env.ts
└── types/
```

Naming requirement: all placeholder path segments in this architecture (for example `<url-path-name>`, `<url-path-name-container>`, `<component-name>`, `<service-name>`) must be `kebab-case` when creating new folders/files.

## Step 3 - Map changed files to rules/templates

- Use `rules/README.md` as the mapping index (path -> rule -> template).
- Load only the rule files required by the files you are changing.
- Reuse templates only for the paths you actually create.
- If a file cannot be mapped from `rules/README.md`, stop and load more repo context before writing.

## Step 4 - Component generation requirement

When creating components inside:
- `<source-root>/containers/<url-path-name-container>/components/`
- `<source-root>/components/<component-name>/`

You must apply `.agents/skills/react-component-generator/SKILL.md`.

## Step 5 - Data flow

```text
app/.../page.tsx
  -> containers/<url-path-name-container>/index.tsx
    -> containers/<url-path-name-container>/controller.ts
      -> services/<service-name>.service.ts
        -> if EXTERNAL_API=mock: services/mockApi/<service-name>.mock.ts
        -> if EXTERNAL_API=api (or missing): services/api-client.ts
```

## Guardrails

- Never mix Pages Router (`pages/`) with this architecture.
- Never split App Router across both `app/` and `src/app/`.
- Never place feature pages at app root; only `app/page.tsx` can stay at root.
- Never place business orchestration in route `page.tsx`; keep it in container `controller.ts`.
- Never call external APIs directly from pages/components; call through services.
- Never scatter `EXTERNAL_API` checks across pages/components/controllers; keep source switching in `services/<service-name>.service.ts`.
- Never create components in `containers/**/components` or `components/**` without `react-component-generator`.
- For E2E generation, never add scenarios outside active spec scope before covering `docs/specs` test cases.

## Pre-finish checklist

- [ ] Every changed file maps to one path in the table.
- [ ] New folders/files use `kebab-case` path segments unless the filename is framework-fixed (for example `page.tsx`, `index.tsx`).
- [ ] Relevant rule files under `rules/` were applied.
- [ ] Template reuse was considered before writing custom code.
- [ ] Feature routes are only under `(public)` or `(private)`.
- [ ] Route pages delegate to containers; controllers own orchestration.
- [ ] Service layer applies one source switch (`EXTERNAL_API=mock|api`) and defaults to `api` when missing.
- [ ] Mock service file in `services/mockApi/` keeps response contract aligned with real service path.
- [ ] E2E scenarios map to `docs/specs` test cases (prioritize P0/P1 first when defined).
- [ ] E2E tests added/updated for changed user flows.
- [ ] `npm run lint` executed when changes are substantial.
