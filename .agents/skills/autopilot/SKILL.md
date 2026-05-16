---
name: autopilot
description: "Spec-first AI dev pipeline: requirement -> spec -> plan -> implementation -> tests -> optional commit."
argument-hint: spec|run|bugfix|refactor|testgen|analyze|plan|implement|summary|commit
---

# Autopilot

Execute `$ARGUMENTS`.

## Commands

- `spec`: create `docs/specs/{kebab-name}.md` from a requirement and set it active.
- `run`: analyze -> plan -> approval -> implement (including tests/fixes) -> summary -> commit approval.
  - Skill preload policy for `run` is defined in `actions/run.md`.
- `bugfix`: reproduce -> root cause -> regression test -> fix -> verify.
- `refactor`: baseline -> plan -> change structure -> verify no behavior change.
- `testgen`: inspect behavior -> add useful tests -> run relevant suite.

Advanced actions: `analyze`, `plan`, `implement`, `summary`, `commit`. Read only the matching file in `actions/` when needed.

## Shared Rules

- All shared rule IDs and code rules are in `docs/coding-standards.md`. Do not duplicate them in actions.
- Source of truth for current work: active spec in `docs/current-feature.md` and files under `docs/specs/`.
- Use skill loading rules from each action file and keep loading scoped (`AGENT.SCOPED_READS`).
- New folders/files created by this skill must follow `AGENT.KEBAB_CASE_PATHS`.
- Commit always follows `COMMIT.APPROVAL`.
- Each advanced action has a Prerequisites section — check it before executing steps.
