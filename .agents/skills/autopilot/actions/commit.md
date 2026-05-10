# Commit Action

## Prerequisites

- Code changes must exist in the working tree. If no changes, inform the user there is nothing to commit.
- `npm run build` must pass. Run it before proceeding; stop if failing.

## Steps

1. If the commit represents completed spec work, update `docs/current-feature.md` and the active spec status before staging so the state change is included in the commit.
2. Show files to stage and proposed conventional commit message.
3. Ask: `Commit these changes? (yes/no/edit message)`.
4. If approved, stage and commit following `COMMIT.APPROVAL`, `COMMIT.SCOPED_STAGE`, `COMMIT.NO_AI_ATTRIBUTION`, and `COMMIT.BUILD_GATE`.
5. Report commit hash and branch.
