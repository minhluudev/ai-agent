# Commit Action

## Prerequisites

- Code changes must exist in the working tree. If no changes, inform the user there is nothing to commit.
- `npm run build` must pass. Run it before proceeding; stop if failing.

## Steps

1. Show files to stage and proposed conventional commit message.
2. Ask: `Commit these changes? (yes/no/edit message)`.
3. If approved, stage only files changed for this task; never `git add .`.
4. Update `docs/current-feature.md` and active spec status only when the commit represents completed spec work.
5. Report commit hash and branch.
