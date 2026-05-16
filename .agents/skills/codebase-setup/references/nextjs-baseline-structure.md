# Next.js Baseline - Structure

Use this reference when the task is about target folders, architecture boundaries, or placement rules.

## Target structure (default)

```text
<source-root>/
├── app/
│   ├── (private)/
│   └── (public)/
├── containers/
├── components/
├── utils/
├── constants/
├── services/
│   └── mockApi/
├── styles/
├── config/
├── types/
└── tests/
```

## Placement notes

- `<source-root>` is `src/` when app router is under `src/app`, otherwise repo root.
- Keep route-level feature code under `containers/<url-path-name-container>/...`.
- Keep reusable UI under `components/<component-name>/`.
- Keep automation tests under `<source-root>/tests/` (recommended E2E specs in `<source-root>/tests/e2e/`).
- Feature pages should stay under route groups `(public)` / `(private)` in `app/`.
- Never split App Router across both `app/` and `src/app/`.

## Guardrails

- Do not create `modules/`, `shared/`, `features/`, or `lib/` as parallel architecture roots when `containers/` + `components/` are in use.
- Do not call real API directly from route/component files.
- Keep business orchestration in `containers/**/controller.ts` and `services/`, not in `app/.../page.tsx`.
