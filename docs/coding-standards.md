# Coding Standards

Source of truth for code, test, and commit rules in target applications using this kit. Skills add domain-specific rules; workflows route work and define gates. Agent behavior rules live in `AGENTS.md`.

## Commit Rules

- Ask before committing. Use conventional commits (`feat:`, `fix:`, `chore:`, etc.).
- Stage only files changed for the task; never `git add .`.
- No AI attribution in commits.
- Run `npm run build` before committing; fix all errors first.

## TypeScript

- Strict mode enabled.
- No `any` types — use proper typing or `unknown`.
- Define interfaces for all props, API responses, and data models.
- Use type inference where obvious, explicit types where helpful.

## React

- Functional components only (no class components).
- Use hooks for state and side effects.
- Keep components focused — one job per component.
- Extract reusable logic into custom hooks.

## Next.js

- Server components by default.
- Only use `'use client'` when needed (interactivity, hooks, browser APIs).
- Use Server Actions for form submissions and simple mutations.
- Use API routes when you need:
  - Webhooks (Stripe, GitHub, etc.)
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Otherwise, fetch data directly in server components.
- Dynamic routes for item/collection pages.
- File placement follows `nextjs-coding` skill target architecture.

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3).
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`.
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed.

Example v4 configuration:

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
}
```

## Naming

- Components: PascalCase (`ItemCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- UI stack priority: **shadcn/ui → Tailwind CSS → CSS Module**. See `frontend-coding-rules` for details.
- No inline styles.

## Database

- Use Prisma ORM for all database operations.
- Always use `prisma migrate dev` for schema changes (not `db push`).
- Run `prisma migrate status` before committing to verify migrations are in sync.
- Production deployments must run `prisma migrate deploy` before the app starts.

## Data Fetching

- Server components fetch directly with Prisma.
- Client components use Server Actions.
- Validate all inputs with Zod.

## Error Handling

- Use try/catch in Server Actions.
- Return `{ success, data, error }` pattern from actions.
- Display user-friendly error messages via toast.
- After 3 failed attempts at the same fix, stop and report root cause, attempts, and blocker.

## Test Rules

- Prefer the repository's existing test runner. For this kit's target stack, use Vitest when configuring tests.
- Tests cover behavior, not implementation details.
- Unit: isolated logic with no DB or HTTP.
- Integration: real test DB, full action/service flow.
- Feature/E2E: user-facing workflows and HTTP responses.
- Prioritize tests by business/regression risk, not coverage percentage.
- New behavior and bug fixes should include tests when practical; refactors should run existing related tests.
- If a test harness is absent or a focused test is impractical, document the gap and run the strongest available check.
- Run related tests before `npm run build` when a test runner is configured.

## Code Quality

- No commented-out code unless specified.
- No unused imports or variables.
- Keep functions under 50 lines when possible.
