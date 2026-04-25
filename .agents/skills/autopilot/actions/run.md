# Run Action

Pipeline: `analyze -> plan -> approval -> implement -> summary -> commit approval`.

## Gates

- Plan approval is required unless the user already approved implementation.
- Commit approval is always required.

## Stop Conditions

- No active spec and no requirement provided.
- Tests still fail after 3 root-cause fix attempts.
- Git diff includes unrelated or unsafe changes.

## Resume

If stopped, resume with the next action: `plan`, `implement`, `summary`, or `commit`.
