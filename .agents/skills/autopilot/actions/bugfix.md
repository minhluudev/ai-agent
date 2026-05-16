# Bugfix Action

1. Capture expected behavior, actual behavior, and reproduction trigger.
2. Inspect only related files and identify the first wrong behavior before editing.
3. Write a regression test that reproduces the bug when a test runner is configured AND the bug is in application logic (not a third-party library, environment config, or CSS). The test should fail before the fix. Skip only when reproduction requires live infrastructure not available locally; document the gap in the summary.
4. Apply the smallest root-cause fix; avoid unrelated refactors.
5. Run the regression test and related tests when a test runner is configured; confirm the fix passes.
6. Run `npm run build`. Broaden test scope to the full relevant suite when the suite completes in under 2 minutes and is not known-flaky.
7. Summarize root cause, fix, files, tests, risk, and next step.
