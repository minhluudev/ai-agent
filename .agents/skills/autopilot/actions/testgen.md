# Testgen Action

1. Inspect target code and existing tests.
2. Identify behavior: inputs, outputs, side effects, failure modes, edge cases.
3. Prioritize tests by business/regression risk, not coverage percentage.
4. Write clear behavior-oriented tests using Vitest; avoid implementation-detail assertions and over-mocking.
5. Focus on Server Actions and utility functions — not component render tests.
6. Run new tests first, then related/full suite when reasonable.
7. Summarize tests added and remaining gaps.
