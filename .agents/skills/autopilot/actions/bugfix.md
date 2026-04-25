# Bug Fix Workflow

Find and fix a bug with minimal safe changes.

## Steps

### Step 1: Reproduce Bug

1. Read the bug description from $ARGUMENTS or the active spec in @docs/current-feature.md
2. Identify:
   - **Expected behavior**: what should happen
   - **Actual behavior**: what is happening
   - **Steps to reproduce**: how to trigger the bug
3. Look for logs, failing tests, or error messages
4. List assumptions if something is unclear

### Step 2: Locate Root Cause

1. Inspect only files related to the bug — do not scan unrelated folders
2. Trace the data flow from trigger to failure point
3. Identify where the behavior becomes wrong
4. **Do not change code before root cause is clear**
5. Report the root cause before proceeding

### Step 3: Write Regression Test

1. Add a test that describes the bug clearly
2. The test should **fail before the fix** is applied
3. Name the test descriptively: `it_should_not_[bug_behavior]` or `it_correctly_[expected_behavior]`

### Step 4: Fix Bug

1. Make the smallest safe change that fixes the root cause
2. Do not refactor unrelated code
3. Do not change more than necessary

### Step 5: Run Tests

1. Run the regression test first
2. Run the related test suite
3. Run full test suite: `php artisan test`

### Step 6: Fix Loop (max 3 attempts)

```
attempt = 0
while tests_fail AND attempt < 3:
    a. Read the failure message
    b. Fix the root cause, not just the symptom
    c. Re-run relevant tests after each fix
    d. attempt++
```

If still failing after 3 attempts: STOP and summarize the issue.

### Step 7: Summarize

Output in this format:

```
## Root Cause
{what was causing the bug}

## Fix
{what was changed and why}

## Files Changed
- {file}: {what changed}

## Tests
- {test name}: {pass/fail}

## Risk
{any side effects or things to watch}

## Next Step
{suggested next action}
```

Ask: "Ready to commit this fix?"
