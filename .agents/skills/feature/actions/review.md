# Review Action

1. Read `current-feature.md` to understand the goals.
2. Run `git diff main --name-only` to get the list of changed files.
3. Read each changed file and check the following:

## Goals check

- ✅ Goal met — implementation matches the spec
- ❌ Goal missing or incomplete
- ⚠️ Goal met but with issues (see below)
- 🚫 Scope creep — code added beyond what goals require

## Architecture check (`nextjs-coding` rules)

- [ ] Every new file belongs to the correct layer: `app/`, `modules/<domain>/`, `shared/`, `services/`, `config/`, or `types/`
- [ ] Route files (`page.tsx`, `layout.tsx`) contain no heavy business logic
- [ ] Business logic lives in `modules/<domain>/hooks` or `modules/<domain>/services`
- [ ] No alternate architecture roots created (`features/`, `lib/`, etc.)
- [ ] `'use client'` used only where required (hooks, event handlers, browser APIs)
- [ ] `error.tsx` is a Client Component with `unstable_retry()`

## UI stack check (`frontend-coding-rules`)

- [ ] shadcn/ui primitives used where a matching component exists
- [ ] Tailwind used for layout/spacing/typography gaps — not arbitrary values
- [ ] CSS Module created only when Tailwind was genuinely insufficient
- [ ] No inline styles
- [ ] Components scaffolded via `react-component-generator` (no empty `IProps`, no empty destructures)

## Code quality check

- [ ] No unused imports or variables
- [ ] No `any` types — proper typing or `unknown`
- [ ] Functions under ~50 lines
- [ ] No commented-out code
- [ ] `npm run build` passes

## Final verdict

State one of:
- **Ready to complete** — all goals met, no issues
- **Needs changes** — list specific items to fix before completing
