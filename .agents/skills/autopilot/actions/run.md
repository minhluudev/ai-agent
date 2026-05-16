# Run Action

Pipeline: `analyze -> plan -> approval -> implement (including tests) -> summary -> commit approval`.

Gate policy and skill loading conditions come from the active workflow (`GATE.WORKFLOW_OWNERSHIP`). For feature work, follow `feature-development.yaml` context section for which skills to load on demand.

## Epic Detection

Before starting the pipeline, read `docs/current-feature.md`:

- If **Active Spec** points to an `*-epic.md` file: find the first `Active` sub-spec in the Sub-spec Queue and run the pipeline against that sub-spec only. Do not implement the epic file itself.
- After a sub-spec completes: the completing agent must update its status to `Complete` in `docs/current-feature.md` and set the next sub-spec to `Active`, then stop. Only the agent that just finished a sub-spec may advance the queue. Do not auto-advance without user confirmation.
- If the Sub-spec Queue is `N/A` or empty: the epic breakdown has not been confirmed; stop and ask the user to run `/autopilot spec` to generate sub-specs first.
- If all sub-specs are `Complete`: update `docs/current-feature.md` Status to `Complete` and report the epic as done. Do not move it to History; that happens at commit time.

## Stop Conditions

- No active spec and no requirement provided.
- `docs/current-feature.md` status is `Not Started` (spec has not been written yet; ask the user to run `/autopilot spec` first).
- Active spec is an epic but Sub-spec Queue is empty or has no `Active` entry.
- Tests or `npm run build` still fail after 3 root-cause fix attempts.
- Git diff includes unrelated or unsafe changes.

## Resume

If stopped, resume with the next action: `plan`, `implement`, `summary`, or `commit`.
