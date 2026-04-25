# Run Action — Full Pipeline

Execute the entire automated dev pipeline from spec to commit.

## Pipeline Flow

```
analyze → plan → [approval] → implement (code + test + fix loop) → summary → commit → [approval]
```

## Steps

### Stage 1: Analyze (auto)

1. Execute the `analyze` action with $ARGUMENTS
2. Print the scope analysis
3. Continue automatically to Stage 2

### Stage 2: Plan (auto → gate)

4. Execute the `plan` action
5. Print the implementation plan
6. **GATE — Ask developer:** "Approve this plan? (yes/no/adjust)"
   - If **no**: stop the pipeline
   - If **adjust**: modify plan based on feedback, ask again
   - If **yes**: continue to Stage 3

### Stage 3: Implement (auto)

7. Execute the `implement` action
8. This includes: coding, writing tests, running tests, and the auto-fix loop
9. If fix loop exhausts (3 attempts): STOP pipeline, report to developer
10. If all tests pass: continue automatically to Stage 4

### Stage 4: Summary + Commit (auto → gate)

11. Execute the `summary` action — print change summary and production checklist
12. Execute the `commit` action — show proposed commit
13. **GATE — Ask developer:** "Commit these changes? (yes/no/adjust)"
    - If **no**: stop — developer will review manually
    - If **adjust**: make requested changes, re-run tests, regenerate summary
    - If **yes**: commit and complete

## Pipeline Rules

- **Two gates only**: after plan (Stage 2) and before commit (Stage 4)
- **Auto-stop on failure**: if tests can't be fixed after 3 attempts, stop and report
- **Never skip commit approval**: even in "run" mode, commit always requires explicit yes
- **Resumable**: if stopped at any gate, resume with the next action (e.g., `/autopilot implement`)
- **Spec is source of truth**: all state tracked via spec file in `docs/specs/`
