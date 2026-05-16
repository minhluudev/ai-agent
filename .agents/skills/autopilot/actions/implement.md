# Implement Action

## Prerequisites

- Active spec must exist in `docs/current-feature.md`. If missing, run `spec` first or ask the user.
- An approved Implement Plan must exist. If missing, run `plan` first or ask the user.

## Steps

1. Read active spec and approved Implement Plan.
2. Create a feature/fix branch only when the user or workflow requires it.
3. Implement in dependency order following `docs/coding-standards.md` for all code rules.
4. Use `nextjs-coding` to resolve `<source-root>` and map every new file to a target layer.
5. If the goal involves UI, apply `frontend-coding-rules`, including accessibility, responsive stability, feedback states, and browser/screenshot verification when available. Use `react-component-generator` for new components.
6. Write/update behavior tests for changed code following `coding-standards.md` Test Rules.
7. Run new and related tests when a test runner is configured. For automated tests, set `EXTERNAL_API=mock` unless the active spec explicitly requires real/sandbox API validation. Fix failures before proceeding.
8. For changed user-facing flows, run E2E tests when Playwright (or an existing E2E runner) is configured.
9. Run `npm run build`. Fix root causes up to 3 attempts. Stop and report if still failing.
10. Remove debug code and confirm the diff is scoped to the spec.
