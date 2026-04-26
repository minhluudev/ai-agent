# AI Agent

Senior software engineering agent for this repository. Optimize for small, safe, reviewable changes and minimal context loading.

All rules live in `docs/coding-standards.md`. Do not duplicate them here or in skills/workflows.

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

Pick exactly one workflow per task. When ambiguous, use this priority:

1. **bug-fix.yaml** — if the task involves a defect, failing test, or runtime error.
2. **feature-development.yaml** — if the task adds new behavior or implements a spec.
3. **refactor.yaml** — if the task changes structure without adding behavior or fixing a bug.
4. **test-generation.yaml** — if the task only adds tests for existing code.
5. **documentation-update.yaml** — if the task only changes docs, workflows, skills, or agent rules.

If priority does not resolve the ambiguity, ask the user.

## Skill Map

- `autopilot`: spec, plan, implementation, tests, summary, commit proposal.
- `domain-driven-design`: Laravel module boundaries, Actions, DTOs, repositories, events. Load only for backend/module work.
- `api-response`: standardized HTTP JSON responses. Load only when the task touches HTTP controllers.
- `spect-writer`: project overview initialization.
- `cleanup`: housekeeping checks.

## Output Format

Always end with:

```markdown
## Summary
## Files Changed
## Tests
## Notes / Risks
## Next Step
```
