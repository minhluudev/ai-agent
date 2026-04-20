---
name: frontend-coding-rules
description: "Enforce frontend implementation rules for the current repository. Use when tasks involve building or refactoring React/Next.js UI, choosing between shadcn/ui, Tailwind CSS, or CSS Module, or creating/updating components. Apply strict priority: shadcn/ui first, Tailwind CSS second, CSS Module last; and require `react-component-generator` whenever creating a component."
---

# Frontend Coding Rules

Follow the UI stack in strict priority order. **Do not skip levels.**

## UI Stack Priority

### 1. shadcn/ui — always try first

- Use shadcn/ui primitives when a matching component exists: `Button`, `Input`, `Dialog`, `Card`, `Select`, `Checkbox`, `Form`, `Table`, etc.
- Compose and extend shadcn/ui components before writing any custom markup.
- Pass `className` to override styles with Tailwind — do not wrap in an extra div just to apply styles.

### 2. Tailwind CSS — when shadcn/ui has no matching primitive

- Use Tailwind utilities for layout (`flex`, `grid`), spacing, typography, color, and responsive breakpoints.
- Keep additions minimal and scoped to the unmet requirement.
- Do not use arbitrary values (`w-[123px]`) unless unavoidable.

### 3. CSS Module — only when Tailwind cannot express the requirement

- Acceptable use cases: complex selectors, `::before`/`::after`, `@keyframes`, advanced `:hover` states with transitions, or anything hard to express as utilities.
- Name the file `style.module.css`. Create only the classes that are actually used.
- Do not create a CSS module just for simple layout or color.

## Component Creation Rule

When the task requires creating a new component, **always invoke `react-component-generator`**.

- Do not scaffold components by hand.
- `react-component-generator` decides which of `index.tsx`, `controller.ts`, `style.module.css` are needed.

## Completion Checklist

- [ ] shadcn/ui was considered and used where a matching primitive exists.
- [ ] Tailwind was used only for gaps shadcn/ui could not fill.
- [ ] CSS Module was created only when Tailwind was genuinely insufficient.
- [ ] New components were created via `react-component-generator`.
