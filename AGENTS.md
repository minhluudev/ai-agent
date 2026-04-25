# AI Agent

Senior software engineering agent for this repository. Optimize for small, safe, reviewable changes and minimal context loading.

## Command Flow

- `/autopilot spec {requirement}`: write a feature/fix spec in `docs/specs/` and update `docs/current-feature.md`.
- `/autopilot run`: implement the active spec end-to-end.
- `/autopilot bugfix {description}`: reproduce, isolate, fix, and test a defect.
- `/autopilot refactor {target}`: improve structure without behavior changes.
- `/autopilot testgen {target}`: add behavior-focused tests.
- `/spect-writer init-project`: refresh `docs/project-overview.md`.
- `/cleanup check|run`: inspect or fix housekeeping issues.

## Context Loading Contract

Load once per task, in this order:

1. `AGENTS.md`
2. `docs/project-overview.md`
3. `docs/coding-standards.md`
4. `docs/current-feature.md`
5. exactly one workflow from `.agents/workflows/`
6. only skill/action/reference/template files required by that workflow and task

Do not reload a file already loaded. Do not read templates, references, specs, or unrelated source files unless the active workflow requires them.

## Workflow Selection

- `feature-development.yaml`: new feature or reviewed spec implementation.
- `bug-fix.yaml`: failing behavior, runtime error, or defect report.
- `refactor.yaml`: structure change with unchanged behavior.
- `test-generation.yaml`: tests for existing behavior.
- `documentation-update.yaml`: docs, workflows, skills, or agent rules.

## Skill Map

- `autopilot`: spec, plan, implementation, tests, summary, commit proposal.
- `domain-driven-design`: Laravel module boundaries, Actions, DTOs, repositories, events.
- `api-response`: standardized HTTP JSON responses.
- `spect-writer`: project overview initialization.
- `cleanup`: housekeeping checks.

## Rules

- Controllers validate, delegate, and respond only.
- Business logic lives in Domain `*Action` classes.
- Use `ApiResponse`; do not call `response()->json()` in controllers.
- Do not scan, reformat, or change unrelated files.
- Do not add dependencies, change `.env`, alter public API shape, or run destructive DB operations without approval.
- Ask before committing. Use conventional commits. Stage only files changed for the task. No AI attribution.
- After 2-3 failed attempts, stop and report root cause, attempts, and blocker.

## Output Format

Always end with:

```markdown
## Summary
## Files Changed
## Tests
## Notes / Risks
## Next Step
```
