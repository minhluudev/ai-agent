# Spec Action

Create a human-reviewable and agent-usable spec from `$ARGUMENTS`.

## Rules

- If requirement is empty, ask one question: `What do you want to build or fix?`
- Use already-loaded project overview and coding standards; read them only if unavailable in context.
- Infer what is safe from the request and existing context.
- Ask only one clarification at a time, only when ambiguity affects implementation or tests.
- Keep specs concise; include diagrams only when they clarify behavior.
- If design input is provided (image/Figma/URL/reference), follow `SPEC.IMAGE_INPUT_ANALYSIS` and `SPEC.IMAGE_FACTS_VS_INFERENCES` before choosing simple vs epic path.
- Decompose aggressively (`SPEC.ATOMIC_STEPS`): each `Implement Plan` step must target exactly one production file. A step may include the paired test file only when it directly verifies that production file.
- Split on complexity (`SPEC.SPLIT_THRESHOLD`): use the Epic path if work has more than 3 distinct user flows, affects more than 1 domain module, or needs more than about 7 implementation steps.
- Test coverage planning must be explicit and detailed (`TEST.BEHAVIOR_FIRST`, `TEST.RISK_PRIORITIZATION`): include happy path, validation failures, authorization boundaries, edge cases, and regression-critical scenarios.

## Design Input Procedure

Use this procedure whenever the user provides design evidence such as screenshot, mockup, wireframe, Figma file/export, or URL reference:

1. Identify design source role: target implementation, style reference, current bug screenshot, or comparison/before-after.
2. Extract visible facts: screen type, route/page intent, major regions, navigation, forms, tables/lists/cards, controls, icons, copy, data shown, and visible states.
3. Infer implementation shape: likely components, server/client boundaries, data needs, validation, interactions, and reusable primitives from the existing design system.
4. Capture visual constraints: approximate layout hierarchy, spacing density, alignment, responsive behavior assumptions, overflow risk, empty/loading/error/disabled states, and accessibility concerns.
5. Extract style system details as explicitly as possible: color palette (primary/secondary/background/text/border states), gradients/shadows, typography scale (font family, size, weight, line-height), border radius, spacing rhythm, icon style, and motion/transition cues.
6. Build a component inventory from the design:
   - Identify screen-level components, reusable blocks, and primitives.
   - Check whether each component already exists in `components/`.
   - Check whether each component already exists in `containers/<current-page-container>/components/`.
   - Decide placement:
     - Prefer `components/` when the component is likely reusable across multiple routes/containers.
     - Use `containers/<current-page-container>/components/` only for page-private components.
   - Mark which components can be reused directly vs must be created.
7. Record uncertainty explicitly. If missing information changes behavior, files, or tests, ask one clarification. Otherwise make a conservative assumption and list it in the spec.
8. Do not copy an image blindly. Preserve intent, hierarchy, and visual language while adapting to `frontend-coding-rules`, shadcn/ui availability, existing repo patterns, and `UI.IMAGE_MATCH`.

## Steps

1. Inspect only code needed to understand current patterns.
2. Assess complexity against `SPEC.SPLIT_THRESHOLD` and choose a path.

### Simple Path

3. Write `docs/specs/{kebab-name}.md` using `../templates/spec-template.md`.
4. Fill `Implement Plan` with atomic steps, affected files, dependency order, and technical decisions. Fill `Test Plan` with concrete coverage targets and `Test Cases` with detailed scenarios.
5. Update `docs/current-feature.md`: active spec path, `Sub-spec Queue` as `N/A`, and status `Spec Written`.
6. Ask the user to review the spec, then ask: `Commit spec files before handing off to the run agent? (yes/no)` If yes, stage only the spec file and `docs/current-feature.md`, then commit with message `docs: add spec for {kebab-name}`. After commit (or if user declines), suggest running `/autopilot run`.

### Epic Path

3. Write `docs/specs/{kebab-name}-epic.md` using `../templates/epic-template.md`. List all sub-specs with scope and order.
4. Write each sub-spec as `docs/specs/{kebab-name}/part-{n}-{scope}.md` using `../templates/spec-template.md`. Sub-specs run sequentially; each must be a complete committable unit. A sub-spec may assume prior sub-specs are merged, but never another sub-spec that is still in progress.
5. Update `docs/current-feature.md`: set the epic path, fill `Sub-spec Queue`, set the first sub-spec as `Active`, and set status `Spec Written`.
6. Ask the user to review and confirm the sub-spec breakdown, then ask: `Commit epic and sub-spec files before handing off to the run agent? (yes/no)` If yes, stage only the epic file, all sub-spec files, and `docs/current-feature.md`, then commit with message `docs: add epic spec for {kebab-name}`. After commit (or if user declines), suggest running `/autopilot run`.
