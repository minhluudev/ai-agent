---
name: autopilot
description: "Spec-first AI dev pipeline: requirement -> spec -> plan -> implementation -> tests -> optional commit."
argument-hint: spec|run|bugfix|refactor|testgen|analyze|plan|implement|summary|commit
---

# Autopilot

Execute `$ARGUMENTS`.

## Commands

- `spec`: create `docs/specs/{name}.md` from a requirement and set it active.
- `run`: analyze -> plan -> approval -> implement (including tests/fixes) -> summary -> commit approval.
- `bugfix`: reproduce -> root cause -> regression test -> fix -> verify.
- `refactor`: baseline -> plan -> change structure -> verify no behavior change.
- `testgen`: inspect behavior -> add useful tests -> run relevant suite.

Advanced actions: `analyze`, `plan`, `implement`, `summary`, `commit`. Read only the matching file in `actions/` when needed.

## Shared Rules

- All code rules are in `docs/coding-standards.md`. Do not duplicate them in actions.
- Source of truth for current work: active spec in `docs/current-feature.md` and files under `docs/specs/`.
- Load `nextjs-coding` for App Router architecture decisions.
- Load `react-component-generator` when scaffolding new components.
- Load `frontend-coding-rules` for UI/UX constraints.
- Commit always requires explicit user approval.
- Each advanced action has a Prerequisites section — check it before executing steps.
