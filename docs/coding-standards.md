# Coding Standards

Source of truth for shared rule IDs plus code, test, and commit rules in target applications using this kit. Skills should reference these rule IDs instead of duplicating full text; workflows route work and define gates. Agent behavior rules live in `AGENTS.md`.

## Shared Rule IDs

### Agent Rules

- `AGENT.MINIMAL_CHANGE`: make the smallest change that satisfies the requirement.
- `AGENT.SCOPED_READS`: read only relevant files; avoid repo-wide scans unless needed.
- `AGENT.SINGLE_SOURCE`: keep routing in workflows, domain rules in skills, and skeletons in templates.
- `AGENT.CONTRACT_STABILITY`: preserve public contracts unless the user requests a breaking change.
- `AGENT.UNRELATED_FILES`: do not reformat or modify unrelated files.
- `AGENT.SAFE_OPERATIONS`: do not add dependencies, change `.env`, alter public APIs, or run destructive operations without approval.
- `GATE.WORKFLOW_OWNERSHIP`: approval gates are defined by the active workflow.

### Spec Rules

- `SPEC.ATOMIC_STEPS`: each `Implement Plan` step targets exactly one production file. Include the paired test file only when it directly verifies that production file.
- `SPEC.SPLIT_THRESHOLD`: use an epic plus sub-specs when work has more than 3 distinct user flows, affects more than 1 domain module, or needs more than about 7 implementation steps.
- `SPEC.IMAGE_INPUT_ANALYSIS`: when one or more images are provided, inspect them before writing the spec and capture visible structure, UI states, text, layout, responsive assumptions, reusable components, and open questions.
- `SPEC.IMAGE_FACTS_VS_INFERENCES`: separate what is directly visible in the image from implementation assumptions; ask a clarification only when an unknown would change files, behavior, or tests.
- `SPEC.SPEC_STATUS`: valid spec status values are `Not Started` | `In Progress` | `Complete`. Do not use `Active` inside a spec file.
- `SPEC.FEATURE_STATUS`: valid `docs/current-feature.md` status values are `Not Started` | `Spec Written` | `In Progress` | `Complete`.
- `SPEC.SUB_SPEC_STATUS`: valid sub-spec queue status values are `Not Started` | `Active` | `Complete`.

### Next.js Architecture Rules

- `NEXT.SERVER_DEFAULT`: use Server Components by default.
- `NEXT.CLIENT_ONLY_WHEN_NEEDED`: use `'use client'` only for interactivity, hooks, or browser APIs.
- `NEXT.DATA_DIRECT`: fetch data directly in Server Components when possible.
- `NEXT.SERVER_ACTIONS`: use Server Actions for form submissions and simple mutations.
- `NEXT.API_ROUTES_WHEN_HTTP_CONTRACT`: use API routes for webhooks, uploads with progress, long-running operations, specific HTTP status/header behavior, mobile/CLI clients, or third-party integrations.
- `NEXT.VALIDATE_WITH_ZOD`: validate all external input with Zod.

### Styling Rules

- `STYLE.STACK_PRIORITY`: use shadcn/ui first, Tailwind CSS second, CSS Modules last.
- `TAILWIND.V4_CSS_CONFIG`: Tailwind CSS v4 configuration belongs in CSS with `@theme`; do not create `tailwind.config.ts` or `tailwind.config.js`.
- `UI.EXISTING_SYSTEM_FIRST`: match the existing app layout, component density, spacing, typography, and interaction patterns before adding new visual language.
- `UI.ACTUAL_EXPERIENCE_FIRST`: build the requested usable screen or workflow first; do not replace app work with a marketing/landing page unless explicitly requested.
- `UI.ACCESSIBLE_CONTROLS`: interactive controls need semantic elements, visible focus states, keyboard access, and accessible labels when icon-only.
- `UI.RESPONSIVE_STABLE`: layouts must work on mobile and desktop without text overlap, clipped controls, or layout shift from dynamic labels/states.
- `UI.FEEDBACK_STATES`: user-facing flows need appropriate loading, empty, error, disabled, and success states.
- `UI.VISUAL_VERIFY`: when changing user-facing UI, verify in browser when a dev server/test harness is available and report any unverified viewport risk.
- `UI.IMAGE_MATCH`: when implementing from an image, preserve the visible hierarchy, layout rhythm, component intent, and interaction affordances while adapting to the repo's existing design system.

### Commit Rules

- `COMMIT.APPROVAL`: ask before committing; use conventional commits.
- `COMMIT.SCOPED_STAGE`: stage only task files; never `git add .`.
- `COMMIT.NO_AI_ATTRIBUTION`: no AI attribution or AI co-author trailers in commits.
- `COMMIT.BUILD_GATE`: run `npm run build` before committing; fix all errors first.

### Test Rules

- `TEST.BEHAVIOR_FIRST`: test behavior, not implementation details.
- `TEST.RELATED_FIRST`: run new and related tests before broad checks when a test runner is configured.
- `TEST.RISK_PRIORITIZATION`: prioritize by business and regression risk, not coverage percentage.
- `TEST.GAP_DISCLOSURE`: if a focused test is impractical, document the gap and run the strongest available check.

### Error Handling

- `ERROR.THREE_ATTEMPTS_STOP`: after 3 failed attempts at the same fix, stop and report root cause, attempts, and blocker.

## Commit Rules

- Use conventional commit format: `type(scope): subject` — types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.
- Write subject lines that describe the user-facing or technical intent, not implementation mechanics — save rationale for the commit body when needed.
- Stage only files touched by the task; never `git add .` or `git add -A`.
- Run `npm run build` and confirm it passes before staging.
- No AI attribution or co-author trailers in commit messages.
- Always ask the user before committing (`COMMIT.APPROVAL`).

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
- Prefer semantic HTML and controlled component boundaries over generic wrapper markup.

## Next.js

- Follow `NEXT.SERVER_DEFAULT`, `NEXT.CLIENT_ONLY_WHEN_NEEDED`, `NEXT.DATA_DIRECT`, `NEXT.SERVER_ACTIONS`, `NEXT.API_ROUTES_WHEN_HTTP_CONTRACT`, and `NEXT.VALIDATE_WITH_ZOD`.
- Use API routes when you need:
  - Webhooks (Stripe, GitHub, etc.)
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Dynamic routes for item/collection pages.
- File placement follows `nextjs-coding` skill target architecture.

## Tailwind CSS v4

- Follow `TAILWIND.V4_CSS_CONFIG`.
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

- UI stack priority follows `STYLE.STACK_PRIORITY`. See `frontend-coding-rules` for details.
- Follow `UI.EXISTING_SYSTEM_FIRST`, `UI.ACTUAL_EXPERIENCE_FIRST`, `UI.ACCESSIBLE_CONTROLS`, `UI.RESPONSIVE_STABLE`, `UI.FEEDBACK_STATES`, `UI.VISUAL_VERIFY`, and `UI.IMAGE_MATCH`.
- No inline styles.

## Database

- Use Prisma ORM for all database operations.
- Always use `prisma migrate dev` for schema changes (not `db push`).
- Run `prisma migrate status` before committing to verify migrations are in sync.
- Production deployments must run `prisma migrate deploy` before the app starts.

## Data Fetching

- Server Components fetch directly with Prisma when possible.
- Client Components use Server Actions for simple mutations.
- Validate all external input with Zod.

## Error Handling

- Use try/catch in Server Actions.
- Return `{ success, data, error }` pattern from actions.
- Display user-friendly error messages via toast.
- Follow `ERROR.THREE_ATTEMPTS_STOP`.

## Test Rules

- Prefer the repository's existing test runner. For this kit's target stack, use Vitest when configuring tests.
- Follow `TEST.BEHAVIOR_FIRST`, `TEST.RELATED_FIRST`, `TEST.RISK_PRIORITIZATION`, and `TEST.GAP_DISCLOSURE`.
- Unit: isolated logic with no DB or HTTP.
- Integration: real test DB, full action/service flow.
- Feature/E2E: user-facing workflows and HTTP responses.
- New behavior and bug fixes should include tests when practical; refactors should run existing related tests.
- Run related tests before `npm run build` when a test runner is configured.

## Code Quality

- No commented-out code unless specified.
- No unused imports or variables.
- Keep functions under 50 lines when possible.
