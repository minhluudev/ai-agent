---
name: react-component-generator
description: Create or refactor small-to-medium React components for the current repository. Use when the user asks for a component or UI block; always create `index.tsx`, and add `controller.ts` or `style.module.css` only when the component actually needs logic separation or scoped CSS. When creating a component, always create/update Unit/Component Test files. Resolve the component path through `nextjs-coding` instead of assuming a fixed component root.
---

# React Component Generator

Generate component files that match current repository conventions.

## When to use this skill

- User asks to create, add, update, or refactor a component or UI block.
- Work is localized to a component folder and needs repo-aligned scaffolding.

## When NOT to use this skill

- Task is route/architecture work (`app/`, providers, config, module layout).
- Request is a broad design-system overhaul spanning many areas.

## Rules from other sources

- UI stack priority: follow `frontend-coding-rules` (shadcn/ui -> Tailwind -> CSS Module).
- Shadcn gate and evidence: follow `UI.SHADCN_GATE`, `UI.SHADCN_FALLBACK_ONLY`, `UI.SHADCN_EVIDENCE`.
- Client/Server boundary: follow `docs/coding-standards.md` Next.js rules.
- File placement: follow `nextjs-coding` target architecture.

## Execution workflow

### Step 1 - Collect minimal input

Extract:
- component name (PascalCase)
- main responsibility
- key props (if provided)

If unclear, ask: `What is the component name (PascalCase) and its main responsibility?`

### Step 2 - Resolve target folder

Use `nextjs-coding`:
- Container-private UI -> `<source-root>/containers/<url-path-name-container>/components/`
- Reusable UI -> `<source-root>/components/<component-name>/`
- Keep existing folder on refactor unless user asks to move.
- New folder names must be `kebab-case`.

### Step 3 - Check nearby patterns

Read 1-2 nearby components to match:
- import style and alias usage
- export style
- accessibility and feedback-state patterns

### Step 4 - Decide files

- Always create/update `index.tsx`.
- Always create/update `index.test.tsx` for new components.
- For refactors, update existing component tests when behavior changes; add missing tests when coverage is insufficient.
- Add `controller.ts` when the component has any of: more than one `useState`, any `useEffect`, service or store calls, or derived state requiring more than 2 lines of logic. For purely presentational components, keep all logic in `index.tsx`.
- Add `style.module.css` only when Tailwind is insufficient.

### Step 5 - Apply shadcn gate for primitives

If the component uses primitives (`input`, `button`, `select`, `textarea`, `dialog`, `checkbox`, `table`):
- Do not use raw HTML primitives when shadcn is available.
- Prefer wrappers in `components/*` composed from `~/components/ui/*`.
- Raw HTML primitives are allowed only with explicit fallback reason: `shadcn not initialized`, `no registry match`, or `add/install failure`.

### Step 6 - Generate and write files

Use templates in `templates/` and remove all placeholders/TODOs before finishing.
Write only relevant files under `<resolved-folder>/`:
- `index.tsx`
- `index.test.tsx`
- `controller.ts` (if needed)
- `style.module.css` (if needed)

### Step 7 - Self-check

- No unused imports/variables/hooks.
- No empty `IProps` interface.
- `'use client'` present when hooks/events/browser APIs are used.
- `index.tsx` consumes `controller.ts` outputs only (if controller exists).
- `style.module.css` exists only when actually used.
- Primitive controls are not raw HTML when shadcn is available.
- Fail-fast: if direct `<button>` or `<input>` is used, include explicit fallback reason in output.
- Tests cover render behavior and key interactions/states owned by the component.
- No placeholder assertions/TODOs remain in final tests.

## On-demand references (load only when needed)

- `references/component-authoring-reference.md` for naming/props/controller/import/testing conventions and quick examples.
- `references/props-controller-pattern.md` when props-controller wiring is non-trivial.
