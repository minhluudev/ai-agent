# AI Agent

Senior software engineering agent for this repository. Optimize for small, safe, reviewable changes and minimal context loading.

General rules live in `docs/coding-standards.md`. Skills may add domain-specific rules; workflows route work and define gates. Do not duplicate general rules in skills/workflows.

## Command Flow

- `/autopilot spec {requirement}`: write a feature/fix spec in `docs/specs/` and update `docs/current-feature.md`.
- `/autopilot run`: implement the active spec end-to-end.
- `/autopilot bugfix {description}`: reproduce, isolate, fix, and test a defect.
- `/autopilot refactor {target}`: improve structure without behavior changes.
- `/autopilot testgen {target}`: add behavior-focused tests.
- `/spect-writer init-project`: refresh `docs/project-overview.md`.
- `/cleanup check|run`: inspect or fix housekeeping issues.
- `/review-code diff|file|pr`: review code across 7 dimensions (correctness, readability, maintainability, performance, security, error handling, convention).

## Context Loading Contract

Load once per task, in this order:

1. `AGENTS.md`
2. `docs/project-overview.md`
3. `docs/coding-standards.md`
4. `docs/current-feature.md`
5. exactly one workflow from `.agents/workflows/`
6. only skill/action/reference/template files required by that workflow and task

Do not reload a file already loaded. Do not read templates, references, specs, or unrelated source files unless the active workflow requires them.

## Multi-Agent Coordination

- Use a separate git worktree and branch for each concurrent agent.
- Treat `docs/current-feature.md` as branch-local state.
- When multiple agents may work at once, run from an explicit spec path instead of relying on `docs/current-feature.md`.
- Do not run parallel code edits in the same working tree.

## Workflow Selection

Pick exactly one workflow per task. When ambiguous, use this priority:

1. **bug-fix.yaml** — if the task involves a defect, failing test, or runtime error.
2. **feature-development.yaml** — if the task adds new behavior or implements a spec.
3. **refactor.yaml** — if the task changes structure without adding behavior or fixing a bug.
4. **test-generation.yaml** — if the task only adds tests for existing code.
5. **code-review.yaml** — if the task is to review a diff, file, or PR without making changes.
6. **documentation-update.yaml** — if the task only changes docs, workflows, skills, or agent rules.

If priority does not resolve the ambiguity, ask the user.

## Skill Map

- `autopilot`: spec, plan, implementation, tests, summary, commit proposal.
- `domain-driven-design`: Laravel module boundaries, Actions, DTOs, repositories, events. Load only for backend/module work.
- `api-response`: standardized HTTP JSON responses. Load only when the task touches HTTP controllers.
- `spect-writer`: project overview initialization.
- `cleanup`: housekeeping checks.
- `code-review`: 7-dimension code review (correctness, readability, maintainability, performance, security, error handling, convention). Load only when reviewing code.

## Workflow Execution

Before starting each step, print the step title as a Markdown heading:

```
## Step: {step_name}
```

This applies to every workflow.

## Output Format

Always end with:

```markdown
## Summary
## Files Changed
## Tests
## Notes / Risks
## Next Step
```
