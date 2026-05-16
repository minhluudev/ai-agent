---
name: react-component-generator
description: Create or refactor small-to-medium React components for the current repository. Use when the user asks for a component or UI block; always create `index.tsx`, and add `controller.ts` or `style.module.css` only when the component actually needs logic separation or scoped CSS. When creating a component, always create/update Unit/Component Test files. Resolve the component path through `nextjs-coding` instead of assuming a fixed component root.
---

# React Component Generator

Generate component files that match current repository conventions.

## When to use this skill

- User asks to create, add, update, or refactor a component or UI block.
- Work is localized to the component folder and needs repo-aligned scaffolding.

## When NOT to use this skill

- Task is route/architecture work (`app/`, providers, config, module layout).
- Request is a broad design-system overhaul spanning many areas.

## Rules from other sources

- **UI stack priority**: follows `frontend-coding-rules` (shadcn/ui → Tailwind → CSS Module).
- **Client/Server boundary**: follows `coding-standards.md` Next.js section.
- **File placement**: follows `nextjs-coding` target architecture.

---

## Execution workflow

### Step 1 — Collect input

Extract from the user request:
- **Component name** (PascalCase)
- **Responsibility** (display, form, layout, control, etc.)
- **Key props** (if mentioned)

If name or responsibility is unclear, ask: `What is the component name (PascalCase) and its main responsibility?`

### Step 2 — Resolve target folder

Use `nextjs-coding` to determine where the component belongs:
- Domain-specific UI → `<source-root>/modules/<domain>/components/`
- Reused across domains → `<source-root>/shared/components/`
- Do not assume a fixed path — always derive it from the current repo tree.
- If refactoring an existing component, keep its current folder unless asked to move it.

### Step 3 — Inspect existing components

Read 1–2 existing components near the resolved location and match their:
- Import style and project alias usage (prefer `~/` when configured)
- Export style (default export vs named)
- Tailwind usage patterns
- Accessibility and feedback-state patterns

### Step 4 — Decide which files to create

| File | Create when |
|------|-------------|
| `index.tsx` | **Always** |
| `index.test.tsx` | **Always when creating a component**; when refactoring, update existing tests or add missing tests |
| `controller.ts` | Component needs: state, API calls, form handling, non-trivial event handlers, or side effects |
| `style.module.css` | Layout too complex for Tailwind, needs `@keyframes`, `::before`/`::after`, or advanced pseudo-states |

### Step 5 — Generate files

Use the closest template from `templates/` as scaffolding — **never leave placeholders in finished files**.

- `templates/index.tsx` → no controller, no CSS module
- `templates/index-with-controller.tsx` → client component + controller hook
- `templates/index-with-all.tsx` → client component + controller hook + CSS module
- `templates/index.test.tsx` → Unit/Component test scaffold (runner-agnostic Testing Library)
- `templates/controller.ts` → hook logic
- `templates/style.module.css` → CSS module base

Templates are minimal scaffolds. Add `IProps`, `useController(props)`, and returned controller values only when the target component actually needs them. Replace `ComponentName` and remove any unused controller call before finishing. If props + controller wiring is still unclear, read `references/props-controller-pattern.md`.

Generated components must include user-facing states the component owns: loading, empty, error, disabled, and success where relevant. Do not create placeholder text explaining how the component works.

When creating tests, cover component behavior (render output, user interactions, and conditional states) rather than internal implementation details.

### Step 6 — Write to resolved location

- `<resolved-folder>/index.tsx`
- `<resolved-folder>/index.test.tsx`
- `<resolved-folder>/controller.ts` (if needed)
- `<resolved-folder>/style.module.css` (if needed)

If the folder already exists, patch only relevant files — do not rewrite unchanged files.

### Step 7 — Self-check before finishing

- [ ] No unused imports, variables, or hooks.
- [ ] No empty `IProps` interface (omit entirely if no props).
- [ ] No empty destructure `const {} = useController()` — use returned values or omit until API is defined.
- [ ] `'use client'` present when component uses hooks, event handlers, or browser APIs.
- [ ] `index.tsx` only uses values returned by `controller.ts` (no direct state in view).
- [ ] `style.module.css` only created if CSS classes are actually used.
- [ ] Component location matches `nextjs-coding` placement decision.
- [ ] shadcn/ui used before custom markup.
- [ ] Interactive controls are semantic, keyboard reachable, and accessible by name.
- [ ] Text fits across mobile and desktop constraints without overlap or clipped controls.
- [ ] `index.test.tsx` exists for new components and covers rendering + key interactions/states.

### Step 8 — Validate tests for components

- Run component tests after generation/update using the repository's existing test runner (`TEST.RELATED_FIRST`).
- If the repo has no component-test setup yet, follow `docs/coding-standards.md` defaults (prefer Vitest for new setup).
- If the user explicitly requests Jest, install Jest + Testing Library with:

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

- Prefer behavior-focused assertions (what user sees/can do), not implementation-detail checks.

---

## Naming rules

| Item | Convention |
|------|-----------|
| Component | `PascalCase` |
| Hook | always `useController` |
| CSS class names | `camelCase` in `.module.css` |
| File export | default export |
| Component style | `FC` with `IProps` only when props exist |

## Props rules

- Create `IProps` **only when props exist** — omit entirely for zero-prop components.
- Required props: no `?`. Optional props: add `?`.
- Infer props from context: `"ProductCard displays a product"` → add `product: Product` to `IProps`.
- Add `children?: React.ReactNode` only when children are actually rendered.

## Controller rules

- Create `controller.ts` only when logic should be separated from the view.
- Signature without props: `export const useController = () => { ... }`
- Signature with props: `export const useController = (props: IProps) => { ... }` — import `IProps` from `./index`.
- When using props, pass the whole `props` object to `useController(props)` unless the existing component style clearly destructures earlier.
- Import only the hooks actually used (`useState`, `useEffect`, ...).
- Return the minimum API the view needs — nothing more.
- Use `async/await` with a `loading` state for API calls.

## Import rules

- Same folder: relative imports (`./controller`, `./style.module.css`).
- Cross-module: use `~/` alias when configured (or the active alias in `tsconfig.json` if different).
- Use `import type` for type-only imports.

## Testing rules

- Every newly created component must include `index.test.tsx`.
- Component tests should verify:
  - Initial render output.
  - Required props rendering and optional props behavior.
  - Main interaction flows (click/input/submit/toggle if applicable).
  - State-based UI changes: loading, empty, error, disabled, success (only states owned by the component).
- For refactors, update existing tests to keep behavior expectations accurate.

---

## Quick decision reference

| Component | Files needed | Notes |
|-----------|-------------|-------|
| `ProductCard` | `index.tsx` + `index.test.tsx` | Props-only display — use shadcn/ui `Card` + Tailwind |
| `LoginForm` | `index.tsx` + `controller.ts` + `index.test.tsx` | Validation + submit + loading — use shadcn/ui `Form`, `Input`, `Button` |
| `DashboardShell` | `index.tsx` + `style.module.css` + `index.test.tsx` | Complex layout + animation |
| `FilterPanel` | All 3 files + `index.test.tsx` | State + handlers + complex layout |
