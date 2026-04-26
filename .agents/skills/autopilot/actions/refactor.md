# Refactor Action

1. Identify current behavior, public contracts, and coverage.
2. Run `npm run build` as baseline. If already failing, stop and report.
3. Plan a small behavior-preserving change; ask before broad refactors.
4. Apply incrementally without unrelated formatting churn.
5. Run `npm run build` again and report behavior change as `none` unless explicitly requested.
