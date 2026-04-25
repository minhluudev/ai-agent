# Commit Action

Commit code after explicit developer approval.

## Steps

1. **Pre-flight**
   - Run `php artisan test` — if failing, STOP
   - Run `git status` — verify there are changes
   - Check for files that should NOT be committed (.env, credentials, debug files)

2. **Ask permission** — Show:
   - Files to be staged
   - Proposed commit message (conventional format)
   - "Commit these changes? (yes/no/edit message)"
   - **NEVER commit without explicit "yes"**

3. **Commit** — If approved:
   - **Only stage files that AI created or modified for this task** — never `git add .` or `git add -A`
   - Do NOT stage unrelated changes, pre-existing modifications, or files touched by other work
   - If unsure whether a file belongs to this task, ask the developer
   - Conventional message: `feat:` or `fix:` — no AI attribution

4. **Update tracker** — In @docs/current-feature.md:
   - Set Status to "Complete"
   - Add feature name to History
   - Clear Active Spec

5. **Update spec** — Set `## Status` to `Complete` in the spec file

6. **Report:**
   - Commit hash and message
   - Branch name
   - Suggest: "Push and create PR? Delete branch after merge?"
