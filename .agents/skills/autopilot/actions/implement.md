# Implement Action

## Prerequisites

- Active spec must exist in `docs/current-feature.md`. If missing, run `spec` first or ask the user.
- An approved Implement Plan must exist. If missing, run `plan` first or ask the user.

## Steps

1. Read active spec and approved Implement Plan.
2. Create a feature/fix branch only when the user or workflow requires it.
3. Implement in dependency order following `docs/coding-standards.md` for all code rules.

### Architecture — invoke `nextjs-coding`

- Use `nextjs-coding` to resolve `<source-root>` and map every new file to a target layer.
- Confirm placement before creating any file: route file, domain module, shared, services, config, or types.

### UI work — invoke `frontend-coding-rules`

- If the goal involves UI, apply `frontend-coding-rules` before writing markup.
- Stack priority: **shadcn/ui → Tailwind CSS → CSS Module**.
- When creating a new component, invoke `react-component-generator` — do not scaffold by hand.

4. Add/update behavior tests for changed code.
5. Run `npm run build` after each implementation step. Fix all errors before proceeding.
6. Fix root causes up to 3 attempts. Stop and report if still failing.
7. Remove debug code and confirm the diff is scoped to the spec.
