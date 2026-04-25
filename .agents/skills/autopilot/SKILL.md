---
name: autopilot
description: Automated AI dev pipeline — from requirement to commit in one command
argument-hint: spec|run|bugfix|refactor|testgen|analyze|plan|implement|summary|commit
---

# Autopilot

Automated dev pipeline: requirement → spec → implement → test → commit.

## Standard Flow

```
/autopilot spec {requirement}     ← AI writes spec
    ↓ user reviews
/autopilot run                    ← AI implements end-to-end
```

## Task

Execute: $ARGUMENTS

### Workflows

| Command | Use when |
|---------|----------|
| `spec` | Write spec from a requirement (start here) |
| `run` | Implement active spec end-to-end |
| `bugfix` | Fix a bug |
| `refactor` | Improve structure without changing behavior |
| `testgen` | Add test coverage |

### Individual Actions

| Action | Description |
|--------|-------------|
| `analyze` | Read spec, inspect context, analyze scope |
| `plan` | Create implementation plan |
| `implement` | Code + test + fix loop (max 3 attempts) |
| `summary` | Change summary + production checklist |
| `commit` | Commit (requires explicit approval) |

See [actions/](actions/) for details. No argument → show options.

## Conventions

- Specs live in `docs/specs/` — source of truth for each feature/fix
- Active spec tracked in @docs/current-feature.md
- Use `domain-driven-design` skill for backend code
- Use `api-response` skill for controller responses
- All rules from AGENTS.md apply
