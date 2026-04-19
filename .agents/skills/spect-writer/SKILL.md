---
name: spect-writer
description: Write project and feature/fix specs - init project overview or create structured specs for backend/frontend work
argument-hint: init-project|init-feature|init-fix
---

# Spect Writer

Create and manage spec documents for the project, features, and fixes.

## Actions

| Action | Description |
|--------|-------------|
| `init-project` | Describe the project and write to `docs/project-overview.md` |
| `init-feature` | Create a spec for a new feature, saved to `docs/features/` |
| `init-fix` | Create a spec for a new fix, saved to `docs/fixes/` |

## Task

Execute the requested action: $ARGUMENTS

See [actions/](actions/) for detailed instructions.

If no action provided, explain the available options and ask what the user wants to do.
