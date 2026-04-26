---
name: autopilot
description: "Spec-first AI dev pipeline: requirement -> spec -> plan -> implementation -> tests -> optional commit."
argument-hint: spec|run|bugfix|refactor|testgen|analyze|plan|implement|summary|commit
---

# Autopilot

Execute `$ARGUMENTS`.

## Commands

- `spec`: create `docs/specs/{name}.md` and set active spec.
- `run`: analyze -> plan -> gate(plan approval if required) -> implement -> test/fix -> summary -> gate(commit approval if required).
- `bugfix`: reproduce -> root cause -> regression test -> fix -> verify.
- `refactor`: baseline -> plan -> structure change -> verify no behavior change.
- `testgen`: inspect behavior -> add tests -> run relevant suite.

Advanced actions: `analyze`, `plan`, `implement`, `summary`, `commit`.
Load only the matching file in `actions/` when needed.

## Shared Rules

- Use `docs/coding-standards.md` as shared rule source.
- Source of truth for current work: `docs/current-feature.md` and `docs/specs/`.
- Load `domain-driven-design` only for backend/module architecture.
- Load `api-response` only for HTTP JSON responses.
- Approval gates are workflow-owned (`GATE.WORKFLOW_OWNERSHIP`).
