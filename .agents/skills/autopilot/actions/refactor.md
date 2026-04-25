# Refactor Workflow

Improve code structure without changing behavior.

## Rules

- Do not change business behavior
- Do not change public API contract unless requested
- Tests must pass before and after refactor
- Keep changes small and reviewable

## Steps

### Step 1: Understand Current Behavior

1. Read the refactor target from $ARGUMENTS or the active spec in @docs/current-feature.md
2. Identify current behavior of the code being refactored
3. Identify existing tests covering this behavior
4. **If no tests exist, add characterization tests first** — tests that capture current behavior so regressions are caught

### Step 2: Run Tests (baseline)

1. Run `php artisan test` to establish a passing baseline
2. If tests are already failing, STOP and report — do not refactor broken code

### Step 3: Plan Refactor

1. Explain what will be improved and why
2. Explain why the refactor is safe (behavior preserved)
3. List files that will be changed
4. Keep the plan small — prefer multiple small refactors over one large one
5. Ask for approval before proceeding

### Step 4: Apply Refactor

1. Refactor incrementally — one change at a time
2. Follow existing architecture rules (`domain-driven-design` skill)
3. Avoid unrelated formatting changes
4. Avoid renaming things that don't need renaming

### Step 5: Run Tests (verify)

1. Run `php artisan test` after each incremental change
2. If tests fail:
   - Check if the refactor broke behavior (revert if so)
   - Check if the test itself needs updating (only for structural changes, not behavior)

### Step 6: Summarize

Output in this format:

```
## Refactor Summary
{what was improved and why}

## Behavior Change
Should be: none
{if any behavior changed, explain why it was necessary}

## Files Changed
- {file}: {what changed}

## Tests
- {command}: {result}

## Risk
{any areas that need extra attention}

## Next Step
{suggested next action}
```
