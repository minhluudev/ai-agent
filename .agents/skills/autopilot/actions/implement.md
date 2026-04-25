# Implement Action

1. Read active spec and approved `Implement Plan`.
2. Create a feature/fix branch only when the user or workflow requires it.
3. Implement in dependency order. Keep controllers thin, business logic in Actions, and HTTP JSON via ApiResponse.
4. Add/update behavior tests for changed code.
5. Run the smallest relevant test command first, then broader tests when reasonable.
6. Fix root causes up to 3 attempts. Stop and report if still failing.
7. Remove debug code and confirm the diff is scoped.
