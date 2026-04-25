# Commit Action

Commit only after explicit user approval.

1. Run relevant tests first; stop if failing.
2. Show files to stage and proposed conventional commit message.
3. Ask: `Commit these changes? (yes/no/edit message)`.
4. If approved, stage only files changed for this task; never `git add .`.
5. Update `docs/current-feature.md` and active spec status only when the commit represents completed spec work.
6. Report commit hash and branch.
