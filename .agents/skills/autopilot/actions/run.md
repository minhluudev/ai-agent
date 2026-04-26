# Run Action

Pipeline: `analyze -> plan -> gate(plan_approval when required) -> implement -> test/fix -> summary -> gate(commit_approval when required)`.

Gate policy comes from the active workflow (`GATE.WORKFLOW_OWNERSHIP`).

## Stop Conditions

- No active spec and no requirement provided.
- Tests still fail after 3 root-cause fix attempts.
- Git diff includes unrelated or unsafe changes.

## Resume

If stopped, resume with the next action: `plan`, `implement`, `summary`, or `commit`.
