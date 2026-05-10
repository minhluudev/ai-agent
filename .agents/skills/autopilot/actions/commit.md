# Commit Action

## Prerequisites

- Code changes must exist in the working tree. If no changes, inform the user there is nothing to commit.
- Read `docs/current-feature.md` to determine active spec type and status.
- Run tests related to this task: read the active spec's Test Plan if in context, otherwise identify test files from `git diff --name-only`. Stop if any fail.

## Steps

1. Show files to stage and proposed conventional commit message.
2. Update `docs/current-feature.md` based on current Status:
   - Status `In Progress`, simple spec, all work done: clear Active Spec, set Sub-spec Queue to `N/A`, set Status to `Not Started`, move the feature to History.
   - Status `In Progress`, epic sub-spec: mark sub-spec as `Complete` in the Sub-spec Queue.
   - Status `Complete` (all epic sub-specs done): clear Active Spec, set Sub-spec Queue to `N/A`, set Status to `Not Started`, move the epic entry to History.
3. Stage only files changed for this task plus `docs/current-feature.md` if updated in step 2; never `git add .`.
4. Run `git commit` with the proposed message. If it fails, report the error and stop.
5. Report commit hash and branch.
