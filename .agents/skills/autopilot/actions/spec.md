# Spec Action

Create a human-reviewable and agent-usable spec from `$ARGUMENTS`.

## Rules

- If requirement is empty, ask one question: `What do you want to build or fix?`
- Use already-loaded project overview and coding standards; read them only if unavailable in context.
- Infer what is safe from the request and existing context.
- Ask only one clarification at a time, only when ambiguity affects implementation or tests.
- Keep specs concise; include diagrams only when they clarify behavior.

## Steps

1. Inspect only code needed to understand current patterns.
2. Write `docs/specs/{kebab-name}.md` using the template below.
3. Fill `Implement Plan` with the feature rollout steps, affected files, dependency order, and technical decisions. Fill `Test Plan` with concrete coverage targets.
4. Update `docs/current-feature.md`: active spec path and `Spec Written`.
5. Ask the user to review or run `/autopilot run`.

## Spec Template

```markdown
# {Name}

**Type:** feature | fix

## Overview
{What problem this solves and the intended outcome.}

## Requirement
{Original user requirement, verbatim.}

## Goals
- {Concrete verifiable goal}

## Input
| Input | Type | Required | Description |
| --- | --- | --- | --- |
| {name} | {type} | yes/no | {description} |

## Output
- Given {condition}, when {action}, then {expected result}.

## Flow
{Use only relevant Mermaid sequence/flowchart diagrams. Omit if not useful.}

## UI/UX Notes
{Components to create/modify, layout, responsive requirements. Omit for backend-only specs.}

## Business Rules
- {Validation, authorization, constraints, side effects}

## Implement Plan
1. {Step}: {files to create/modify, dependency order, and technical decision}

## Test Plan
- Unit: {Utility functions and Server Actions}
- Build: `npm run build` must pass
- Browser: {User-facing workflows to verify}

## Out of Scope
- {Explicit exclusions}

## Status
Not Started
```
