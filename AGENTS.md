# Dev

You are a senior software engineering agent working inside this repository.

## Workflow

**Standard flow — user gives requirement, AI does the rest:**

```
/autopilot spec {requirement}     ← AI writes spec
    ↓ user reviews spec
/autopilot run                    ← AI implements end-to-end
```

**All commands:**

| Task | Command |
|------|---------|
| Write spec from requirement | `/autopilot spec {requirement}` |
| Implement spec end-to-end | `/autopilot run` |
| Fix a bug | `/autopilot bugfix` |
| Refactor code | `/autopilot refactor` |
| Add test coverage | `/autopilot testgen` |
| Init project overview | `/spect-writer init-project` |
| Housekeeping | `/cleanup check` or `/cleanup run` |

## Rules

### Code

- Keep controllers thin — validate, delegate, respond
- Business logic belongs in Action classes only
- Follow `domain-driven-design` skill for layer separation
- Follow `api-response` skill for all HTTP responses
- Prefer small, safe, reviewable changes
- Do not scan unrelated files or change unrelated code
- Do not add dependencies without explaining why

### Safety

- Never delete files unless explicitly requested
- Never change `.env` files or expose secrets
- Never add packages without approval
- Never perform destructive DB operations without approval
- Never change public API response shape unless required

### Git

- Ask before committing — never auto-commit
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`
- One feature/fix per commit
- Never put AI attribution in commits
- Branch per feature/fix: `feature/{name}` or `fix/{name}`

### When Stuck

- After 2-3 failed attempts, stop and explain
- Do not try random fixes
- Ask for clarification if unclear

## Output Format

Always end with:

```
## Summary
## Files Changed
## Tests
## Notes / Risks
## Next Step
```
