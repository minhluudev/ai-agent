# Init Project Action

Goal: Gather project information from the user and write it to `docs/project-overview.md`.

## Steps

1. Read `docs/project-overview.md` if it exists — if it has content, ask the user if they want to overwrite it.

2. Ask the user for the following (use info from $ARGUMENTS if already provided):
   - **Project name**
   - **Short description** (1-2 sentences): What does this project do?
   - **Tech stack**: Main languages, frameworks, databases, tools?
   - **Main goals** of the project?
   - **Target users** (if applicable)?
   - **Main modules/sections** of the system?

3. Write to `docs/project-overview.md` using this template:

```markdown
# Project Overview

## Description

{short description}

## Goals

- {goal 1}
- {goal 2}

## Tech Stack

- **Frontend**: {framework, UI libraries}
- **Backend**: {language, framework}
- **Database**: {type}
- **Other**: {tools, services}

## Target Users

{target users}

## Modules

- **{Module 1}**: {short description}
- **{Module 2}**: {short description}

## Notes

{additional notes if any}
```

4. Confirm with the user: show the written content and ask if any changes are needed.
