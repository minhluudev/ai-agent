# Summary Action

## Prerequisites

- Implementation must be complete (code changes exist in the working tree). If no changes, inform the user there is nothing to summarize.

## Steps

Gather active spec goals plus `git status` and relevant `git diff`.

Output using the format defined in `AGENTS.md` Output Format section.

Also check:
- No unrelated files in the diff.
- No secrets or `.env` values exposed.
- No unnecessary dependencies added.
- `npm run build` passes.
- No obvious N+1 queries (Prisma `findMany` inside loops).
- Architecture stays within `nextjs-coding` layer boundaries.
