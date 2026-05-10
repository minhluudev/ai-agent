# Testgen Action

1. Inspect target code and existing tests.
2. Identify behavior: inputs, outputs, side effects, failure modes, edge cases.
3. Prioritize tests by business/regression risk, not coverage percentage.
4. Write clear behavior-oriented tests using the repo's existing test runner; use Vitest when configuring a new test harness. Avoid implementation-detail assertions and over-mocking.
5. For frontend code, prefer tests around actions, transforms, hooks, validation, routing contracts, and user-visible behavior. Add component render tests only when an existing harness supports them and the behavior risk justifies it.
6. Run new tests first, then related/full suite when reasonable.
7. Summarize tests added and remaining gaps.
