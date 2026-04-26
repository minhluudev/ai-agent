# Refactor Action

1. Identify current behavior, public contracts, and coverage.
2. Run existing related tests when a test runner is configured and `npm run build` as baseline. If already failing, stop and report.
3. Plan a small behavior-preserving change; ask before broad refactors.
4. Apply incrementally without unrelated formatting churn.
5. Run existing related tests when a test runner is configured to verify no behavior change.
6. Run `npm run build` and report behavior change as `none` unless explicitly requested.
