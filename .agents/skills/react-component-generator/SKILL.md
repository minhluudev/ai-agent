---
name: react-component-generator
description: Create or refactor small-to-medium React components for the current repository. Use when the user asks for a component or UI block; always create `index.tsx`, and add `controller.ts` or `style.module.css` only when the component actually needs logic separation or scoped CSS. Resolve the component path through `nextjs-coding` instead of assuming a fixed component root.
---

# React Component Generator

Generate component files that match current repository conventions.

## When to use this skill

- User asks to create, add, update, or refactor a component or UI block.
- Work is localized to the component folder and needs repo-aligned scaffolding.

## When NOT to use this skill

- Task is route/architecture work (`app/`, providers, config, module layout).
- Request is a broad design-system overhaul spanning many areas.

## Tech stack

- Next.js `16.x` + React `19.x` + TypeScript strict
- **shadcn/ui** first — use matching primitives before writing custom markup
- **Tailwind CSS v4** second — utilities for layout, spacing, typography, color
- **CSS Module** only when shadcn/ui + Tailwind are not enough
- Path alias `@/*` available via `tsconfig.json`

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
- Import style and `@/` alias usage
- Export style (default export vs named)
- Tailwind usage patterns

### Step 4 — Decide which files to create

| File | Create when |
|------|-------------|
| `index.tsx` | **Always** |
| `controller.ts` | Component needs: state, API calls, form handling, non-trivial event handlers, or side effects |
| `style.module.css` | Layout too complex for Tailwind, needs `@keyframes`, `::before`/`::after`, or advanced pseudo-states |

### Step 5 — Generate files

Use the closest template from `templates/` as scaffolding — **never leave placeholders in finished files**.

- `templates/index.tsx` → no controller, no CSS module
- `templates/index-with-controller.tsx` → client component + controller hook
- `templates/index-with-all.tsx` → client component + controller hook + CSS module
- `templates/controller.ts` → hook logic
- `templates/style.module.css` → CSS module base

Replace all placeholders: `ComponentName`, empty `IProps`, `// props` comments, empty destructures.

### Step 6 — Write to resolved location

- `<resolved-folder>/index.tsx`
- `<resolved-folder>/controller.ts` (if needed)
- `<resolved-folder>/style.module.css` (if needed)

If the folder already exists, patch only relevant files — do not rewrite unchanged files.

### Step 7 — Self-check before finishing

- [ ] No unused imports, variables, or hooks
- [ ] No empty `IProps` interface (omit entirely if no props)
- [ ] No empty destructure `const {} = useController()` — use returned values or omit until API is defined
- [ ] `'use client'` present when component uses hooks, event handlers, or browser APIs
- [ ] `index.tsx` only uses values returned by `controller.ts` (no direct state in view)
- [ ] `style.module.css` only created if CSS classes are actually used
- [ ] Component location matches `nextjs-coding` placement decision
- [ ] shadcn/ui used before custom markup
- [ ] Run `npm run lint` for substantial changes

---

## Naming rules

| Item | Convention |
|------|-----------|
| Component | `PascalCase` |
| Hook | always `useController` |
| CSS class names | `camelCase` in `.module.css` |
| File export | default export |
| Component style | plain function (`function Foo`) preferred over `React.FC` unless existing file uses `FC` |

## Props rules

- Create `IProps` **only when props exist** — omit entirely for zero-prop components.
- Required props: no `?`. Optional props: add `?`.
- Infer props from context: `"ProductCard displays a product"` → add `product: Product` to `IProps`.
- Add `children?: React.ReactNode` only when children are actually rendered.

## Client/Server boundary

Add `"use client"` at the top of `index.tsx` when the component uses **any** of:
- Event handlers (`onClick`, `onChange`, `onSubmit`, ...)
- React hooks (`useState`, `useEffect`, `useRef`, ...)
- shadcn/ui interactive components (Dialog, Dropdown, etc.)
- Browser APIs

If `index.tsx` imports `./controller` and the controller uses React hooks → `index.tsx` **must** be `'use client'`.

Omit `"use client"` for purely static, data-display components with no interactivity.

## Controller rules

- Create `controller.ts` only when logic should be separated from the view.
- Signature without props: `export const useController = () => { ... }`
- Signature with props: `export const useController = (props: IProps) => { ... }` — import `IProps` from `./index`.
- Import only the hooks actually used (`useState`, `useEffect`, ...).
- Return the minimum API the view needs — nothing more.
- Use `async/await` with a `loading` state for API calls.

## Styling rules

1. **shadcn/ui** — use primitives and compose with `className` overrides.
2. **Tailwind** — utilities for spacing, color, layout, typography.
3. **CSS Module** — only for animations, complex selectors, or pseudo-elements.
4. Import CSS module as: `import styles from "./style.module.css"`, apply as `className={styles.foo}`.
5. Do not create unused or redundant CSS classes.

## Import rules

- Same folder: relative imports (`./controller`, `./style.module.css`).
- Cross-module: use `@/` alias consistent with existing codebase.
- Use `import type` for type-only imports.

---

## Quick decision reference

| Component | Files needed | Notes |
|-----------|-------------|-------|
| `ProductCard` | `index.tsx` only | Props-only display — use shadcn/ui `Card` + Tailwind |
| `LoginForm` | `index.tsx` + `controller.ts` | Validation + submit + loading — use shadcn/ui `Form`, `Input`, `Button` |
| `DashboardShell` | `index.tsx` + `style.module.css` | Complex layout + animation |
| `FilterPanel` | All 3 files | State + handlers + complex layout |
