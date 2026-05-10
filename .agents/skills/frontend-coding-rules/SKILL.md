---
name: frontend-coding-rules
description: "Enforce frontend implementation rules for the current repository. Use when tasks involve building or refactoring React/Next.js UI, choosing between shadcn/ui, Tailwind CSS, or CSS Module, or creating/updating components. Apply strict priority: shadcn/ui first, Tailwind CSS second, CSS Module last; and require `react-component-generator` whenever creating a component."
---

# Frontend Coding Rules

Follow the UI stack in strict priority order. Do not skip levels. Also follow the UI rule IDs in `docs/coding-standards.md`: `UI.EXISTING_SYSTEM_FIRST`, `UI.ACTUAL_EXPERIENCE_FIRST`, `UI.ACCESSIBLE_CONTROLS`, `UI.RESPONSIVE_STABLE`, `UI.FEEDBACK_STATES`, `UI.VISUAL_VERIFY`, and `UI.IMAGE_MATCH`.

## Product Fit

- Match the existing application before inventing a new style: density, spacing, typography, navigation, and feedback patterns.
- Build the actual requested workflow as the first screen. Do not create a landing page, hero, or explanatory feature page unless the user explicitly asks for one.
- Make workflows complete enough to use: provide clear entry points, form validation feedback, loading/empty/error states, and success confirmation where relevant.
- Use cards only for repeated items, dialogs, and genuinely framed tools. Do not put cards inside cards or turn every page section into a floating card.

## Image-Based UI Work

- Treat provided images as implementation evidence, not decoration. Preserve visible hierarchy, layout rhythm, component intent, and important copy.
- Map image elements to existing shadcn/ui primitives and local components before creating custom markup.
- Separate visible facts from assumptions in the spec; do not invent hidden behavior unless it is the conservative default for the workflow.
- If the image shows only one viewport, define safe responsive behavior for mobile and desktop in the spec before implementation.
- After implementation, compare the rendered UI against the image for hierarchy, spacing, alignment, states, and text fit.

## UI Stack Priority

### 1. shadcn/ui — always try first

- Use shadcn/ui primitives when a matching component exists: `Button`, `Input`, `Dialog`, `Card`, `Select`, `Checkbox`, `Form`, `Table`, etc.
- Compose and extend shadcn/ui components before writing any custom markup.
- Pass `className` to override styles with Tailwind — do not wrap in an extra div just to apply styles.
- Keep installed shadcn/ui registry components in the configured project path; do not move them into feature modules.

### 2. Tailwind CSS — when shadcn/ui has no matching primitive

- Use Tailwind utilities for layout (`flex`, `grid`), spacing, typography, color, and responsive breakpoints.
- Keep additions minimal and scoped to the unmet requirement.
- Do not use arbitrary values (`w-[123px]`) unless unavoidable.
- Use stable dimensions for controls, boards, grids, tiles, counters, and toolbars so hover, loading, and dynamic text states do not resize the layout.

### 3. CSS Module — only when Tailwind cannot express the requirement

- Acceptable use cases: complex selectors, `::before`/`::after`, `@keyframes`, advanced `:hover` states with transitions, or anything hard to express as utilities.
- Name the file `style.module.css`. Create only the classes that are actually used.
- Do not create a CSS module just for simple layout or color.

## Interaction and Accessibility

- Prefer native controls and semantic HTML before custom div-based interactions.
- Icon-only buttons need accessible labels and tooltips when the icon is not self-evident.
- Use `lucide-react` icons when the app already has it installed; otherwise match the repo's existing icon library.
- Every interactive state must be keyboard reachable and keep a visible focus style.
- Text must fit in its container at mobile and desktop sizes. Use wrapping, truncation, or responsive layout changes; do not scale fonts by viewport width.

## Component Creation Rule

When the task requires creating a new component, **always use the `react-component-generator` skill**.

- Do not scaffold components by hand.
- `react-component-generator` decides which of `index.tsx`, `controller.ts`, `style.module.css` are needed.

## Completion Checklist

- [ ] shadcn/ui was considered and used where a matching primitive exists.
- [ ] Tailwind was used only for gaps shadcn/ui could not fill.
- [ ] CSS Module was created only when Tailwind was genuinely insufficient.
- [ ] New components were created via `react-component-generator`.
- [ ] UI has loading, empty, error, disabled, and success states where the workflow needs them.
- [ ] Mobile and desktop layouts avoid overlap, clipping, and unstable resizing.
- [ ] Icon-only and custom controls have labels, keyboard access, and visible focus.
- [ ] Browser or screenshot verification was run for user-facing UI when available; otherwise the unverified risk was reported.
- [ ] If implemented from an image, visible facts and assumptions were captured in the spec and the final UI was compared against the reference.
