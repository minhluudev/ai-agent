# Spec Action

Create a human-reviewable and agent-usable spec from `$ARGUMENTS`.

## Rules

- If requirement is empty, ask one question: `What do you want to build or fix?`
- Use already-loaded project overview and coding standards; read them only if unavailable in context.
- Infer what is safe from the request and existing context.
- Ask only one clarification at a time, only when ambiguity affects implementation or tests.
- Keep specs concise; include diagrams only when they clarify behavior.
- If images are provided, follow `SPEC.IMAGE_INPUT_ANALYSIS` and `SPEC.IMAGE_FACTS_VS_INFERENCES` before choosing simple vs epic path.
- Decompose aggressively (`SPEC.ATOMIC_STEPS`): each `Implement Plan` step must target exactly one production file. A step may include the paired test file only when it directly verifies that production file.
- Split on complexity (`SPEC.SPLIT_THRESHOLD`): use the Epic path if work has more than 3 distinct user flows, affects more than 1 domain module, or needs more than about 7 implementation steps.
- Test coverage planning must be explicit and detailed (`TEST.BEHAVIOR_FIRST`, `TEST.RISK_PRIORITIZATION`): include happy path, validation failures, authorization boundaries, edge cases, and regression-critical scenarios.

## Image Input Procedure

Use this procedure whenever the user attaches a screenshot, mockup, wireframe, Figma export, photo of UI, or reference image:

1. Identify image role: target implementation, style reference, current bug screenshot, or comparison/before-after.
2. Extract visible facts: screen type, route/page intent, major regions, navigation, forms, tables/lists/cards, controls, icons, copy, data shown, and visible states.
3. Infer implementation shape: likely components, server/client boundaries, data needs, validation, interactions, and reusable primitives from the existing design system.
4. Capture visual constraints: approximate layout hierarchy, spacing density, alignment, responsive behavior assumptions, overflow risk, empty/loading/error/disabled states, and accessibility concerns.
5. Extract style system details as explicitly as possible: color palette (primary/secondary/background/text/border states), gradients/shadows, typography scale (font family, size, weight, line-height), border radius, spacing rhythm, icon style, and motion/transition cues.
6. Build a component inventory from the design: identify screen-level components, reusable blocks, and primitives; mark which shared components already exist in the codebase and which are missing and must be created.
7. Record uncertainty explicitly. If missing information changes behavior, files, or tests, ask one clarification. Otherwise make a conservative assumption and list it in the spec.
8. Do not copy an image blindly. Preserve intent, hierarchy, and visual language while adapting to `frontend-coding-rules`, shadcn/ui availability, existing repo patterns, and `UI.IMAGE_MATCH`.

## Steps

1. Inspect only code needed to understand current patterns.
2. Assess complexity against `SPEC.SPLIT_THRESHOLD` and choose a path.

### Simple Path

3. Write `docs/specs/{kebab-name}.md` using the Spec Template below.
4. Fill `Implement Plan` with atomic steps, affected files, dependency order, and technical decisions. Fill `Test Plan` with concrete coverage targets and `Test Cases` with detailed scenarios.
5. Update `docs/current-feature.md`: active spec path, `Sub-spec Queue` as `N/A`, and status `Spec Written`.
6. Ask the user to review or run `/autopilot run`.

### Epic Path

3. Write `docs/specs/{kebab-name}-epic.md` using the Epic Template below. List all sub-specs with scope and order.
4. Write each sub-spec as `docs/specs/{kebab-name}/part-{n}-{scope}.md` using the Spec Template below. Sub-specs run sequentially; each must be a complete committable unit. A sub-spec may assume prior sub-specs are merged, but never another sub-spec that is still in progress.
5. Update `docs/current-feature.md`: set the epic path, fill `Sub-spec Queue`, set the first sub-spec as `Active`, and set status `Spec Written`.
6. Ask the user to review and confirm the sub-spec breakdown before running `/autopilot run`.

## Epic Template

```markdown
# {Name} (Epic)

**Type:** epic

## Overview
{What problem this solves and the intended outcome.}

## Requirement
{Original user requirement, verbatim.}

## Goals
- {Concrete verifiable goal}

## Sub-specs

<!-- Status values: Not Started | Active | Complete -->

| # | File | Scope | Depends On | Status |
|---|------|-------|------------|--------|
| 1 | [part-1-{scope}](./{kebab-name}/part-1-{scope}.md) | {what this part covers} | none | Not Started |
| 2 | [part-2-{scope}](./{kebab-name}/part-2-{scope}.md) | {what this part covers} | part-1 | Not Started |

## Out of Scope
- {Explicit exclusions}

## Status
Not Started
```

## Spec Template

```markdown
# {Name}

**Type:** feature | fix
**Epic:** {link to epic spec | N/A}

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

## Image Analysis
<!-- Include only when image(s) were provided. Separate visible facts from assumptions. -->

### Visible Facts
- {Layout regions, controls, text, data, states, and visual hierarchy observed directly in the image.}

### Visual Style Breakdown
- {Color system: brand/primary/secondary/neutral/surface/text/border/semantic colors and state variants.}
- {Typography: font family, scale, weight, line-height, letter spacing, text emphasis hierarchy.}
- {Look and feel: corner radius, borders, elevation/shadows, gradients/patterns, icon style, density, whitespace rhythm.}
- {Motion cues: hover/active/focus/loading transitions and perceived interaction feedback.}

### Component Inventory (Design vs Codebase)
- {Components detected in design: page sections, cards, forms, tables, nav, modals, widgets.}
- {Shared components already available in codebase that can be reused directly.}
- {Shared components missing from codebase and required to be created.}
- {Mapping to shadcn/ui primitives vs custom components, with reuse priority.}

### Implementation Assumptions
- {Assumptions about routes, data, interactions, responsive behavior, design-system mappings, and token approximations when exact values are unknown.}

### Open Questions
- {Only questions that would change behavior, files, or tests. Use "None" if safe assumptions were made.}

## Flow
{Use only relevant Mermaid sequence/flowchart diagrams. Omit if not useful.}

## UI/UX Notes
{Components/routes to create/modify, primary user workflow, responsive requirements, accessibility needs, and loading/empty/error/success states. Omit for backend-only specs.}

## Business Rules
- {Validation, authorization, constraints, side effects}

## Implement Plan

<!-- Rule: one production file per step. Include a direct paired test file only when needed. Max ~7 steps; use Epic path if larger. -->

1. {Step}: `{exact/file/path}` — {one-line technical decision}
   - Depends on: {step N | none}
   - Verify: {how to confirm this step is complete}

## Test Plan
- Unit: {Utility functions and Server Actions}
- Build: `npm run build` must pass
- Browser/UI: {User-facing workflows, responsive viewports, and interaction states to verify}

## Test Cases
| ID | Level | Scenario | Preconditions | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| TC-01 | Unit/Integration/UI | {What behavior is verified} | {State, permissions, input data} | {Numbered test steps} | {Observable outcome and assertions} | P0/P1/P2 |

<!-- Include both success and failure paths. At minimum cover: happy path, input validation, auth/authz, edge cases, and one regression-risk scenario. -->

## Out of Scope
- {Explicit exclusions}

## Status

<!-- Valid values: Not Started | In Progress | Complete -->
<!-- Do not use "Active" here; that is only for Sub-spec Queue rows. -->

Not Started
```
