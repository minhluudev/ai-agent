# Implement Action

Code the feature, write tests, run tests, and auto-fix bugs in a loop.

## Steps

### Phase 1: Setup

1. **Read spec** — Get active spec from @docs/current-feature.md, read the spec file for goals and plan
2. **Create branch** — If not on a feature/fix branch:
   - Derive name from spec title
   - `git checkout -b feature/{name}` or `fix/{name}`

### Phase 2: Code

3. **Implement step by step** — Follow the implementation plan:
   - Use `domain-driven-design` skill templates and conventions
   - Use `api-response` skill for controller responses
   - Keep controllers thin — validate, delegate, respond
   - Business logic in Action classes
   - After each step, briefly state what was done

### Phase 3: Test

4. **Write tests:**
   - **Unit** — Domain layer (Actions, Entities). Mock repositories only.
   - **Integration** — Application layer (UseCases). Real DB with RefreshDatabase.
   - **API** — Endpoints: status codes, response shape, validation errors, auth failures.
   - Cover: success, validation failure, auth failure, important edge cases.

5. **Run tests** — `php artisan test`

### Phase 4: Fix Loop (max 3 attempts)

6. If tests pass → Phase 5
7. If tests fail:

```
attempt = 0
while tests_fail AND attempt < 3:
    a. Read failure message
    b. Identify root cause (not symptom)
    c. Apply minimal fix
    d. Run `php artisan test`
    e. attempt++
```

8. After 3 attempts still failing → STOP and report what failed, what was tried, likely root cause.

### Phase 5: Verify

9. `php artisan test` one final time
10. Quick cleanup: remove debug logs (dd, dump), unused imports
11. Report: files created/modified, tests passing, warnings
