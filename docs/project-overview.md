# Project Overview

This repository is an AI-agent workflow kit for software projects. It provides agent rules, reusable skills, workflow selectors, and lightweight project context files.

## Goals

- Convert requirements into reviewed specs before implementation.
- Keep implementation work scoped, testable, and easy to review.
- Reduce token use by loading only the workflow, skill, reference, and template files needed for the current task.
- Support Laravel backend projects using DDD-style modules when applicable.

## Structure

- `AGENTS.md`: root operating rules for agents.
- `.agents/workflows/`: task-level routing and execution gates.
- `.agents/skills/`: reusable task instructions and code templates.
- `docs/current-feature.md`: active spec tracker and chronological history.
- `docs/specs/`: generated feature/fix specs.
