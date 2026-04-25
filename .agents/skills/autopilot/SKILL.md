---
name: autopilot
description: Spec-first AI dev pipeline: requirement -> spec -> plan -> implementation -> tests -> optional commit.
argument-hint: spec|run|bugfix|refactor|testgen|analyze|plan|implement|summary|commit
---

# Autopilot

Execute `$ARGUMENTS`.

## Commands

- `spec`: create `docs/specs/{name}.md` from a requirement and set it active.
- `run`: analyze -> plan -> approval -> implement -> test/fix -> summary -> commit approval.
- `bugfix`: reproduce -> root cause -> regression test -> fix -> verify.
- `refactor`: baseline -> plan -> change structure -> verify no behavior change.
- `testgen`: inspect behavior -> add useful tests -> run relevant suite.

Advanced actions: `analyze`, `plan`, `implement`, `summary`, `commit`. Read only the matching file in `actions/` when needed.

## Shared Rules

- Source of truth: active spec in `docs/current-feature.md` and files under `docs/specs/`.
- Load `domain-driven-design` only for backend/module architecture.
- Load `api-response` only for HTTP JSON responses.
- Commit always requires explicit user approval.
