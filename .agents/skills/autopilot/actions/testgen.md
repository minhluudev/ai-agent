# Test Generation Workflow

Add useful tests for existing code.

## Steps

### Step 1: Inspect Behavior

1. Read the target code from $ARGUMENTS or identify untested code
2. For each function/class to test, identify:
   - **Inputs**: parameters, dependencies
   - **Outputs**: return values, side effects
   - **Expected behavior**: what it should do
   - **Edge cases**: boundaries, null values, errors

### Step 2: Identify Test Cases

List test cases in three categories:

1. **Success cases** — happy path, normal usage
2. **Failure cases** — validation errors, auth failures, not found
3. **Edge cases** — empty input, max values, concurrent access, duplicates

Prioritize by importance — don't write tests just for coverage numbers.

### Step 3: Write Tests

1. Follow project testing conventions:
   - **Unit tests** for Domain layer (Actions, Entities) — mock repository interfaces only
   - **Feature/Integration tests** for Application layer (UseCases) — use real database with `RefreshDatabase`
   - **API tests** for endpoints — test HTTP status, response shape, validation
2. Use clear, descriptive test names: `it_creates_order_with_valid_data`
3. Avoid over-mocking — prefer testing behavior over implementation details
4. Each test should test one thing

### Step 4: Run Tests

1. Run new tests: `php artisan test --filter={TestClass}`
2. Fix test issues if needed (max 3 attempts)
3. Run full suite: `php artisan test`

### Step 5: Summarize

Output in this format:

```
## Tests Added
- {TestClass}: {count} tests
  - {test name}: {what it covers}

## Coverage
- Success cases: {covered/total}
- Failure cases: {covered/total}
- Edge cases: {covered/total}

## Remaining Gaps
- {any important behavior still untested}

## Next Step
{suggested next action}
```
