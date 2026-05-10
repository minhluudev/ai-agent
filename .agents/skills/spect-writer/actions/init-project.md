# Init Project Action

Goal: Gather project information from the user and write it to `docs/project-overview.md` without drifting from the compact context shape expected by `AGENTS.md`.

## Steps

1. Read `docs/project-overview.md` if it exists. If it has content, ask whether to refresh it in place; do not replace it with an unrelated template shape unless the user explicitly asks.

2. Ask the user for only missing information (use info from $ARGUMENTS and existing docs when already provided):
   - **Project name**
   - **Short description** (1-2 sentences): What does this project do?
   - **Tech stack**: Main languages, frameworks, databases, tools?
   - **Main goals** of the project?
   - **Main areas/modules** of the system?

3. Write to `docs/project-overview.md` using this compact template:

```markdown
# Project Overview

## Description

{short description}

## Goals

- {goal 1}
- {goal 2}

## Tech Stack

- **Agents**: {agent providers/tools}
- **Target apps**: {target framework/stack}
- **Repo content**: {docs/workflows/skills/templates/etc.}

## Main Areas

- **{Area 1}**: {short description}
- **{Area 2}**: {short description}
```

4. Confirm with the user: show a concise summary of the changes and ask if any corrections are needed.
