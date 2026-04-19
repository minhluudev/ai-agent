# Init Fix Action

Goal: Create a spec file for a bug fix, saved to `docs/fixes/`.

## Steps

1. Check $ARGUMENTS (after "init-fix"):
   - If a fix name is provided: use it as the spec name
   - If not: ask the user "What is the name of this fix?"

2. Ask the user for the following:
   - **Type**: `backend` or `frontend`? (if not clear from $ARGUMENTS)
   - **Bug description**: What is the bug?
   - **Steps to reproduce**: How can the bug be reproduced?
   - **Expected behavior**: How should it work?
   - **Current behavior**: How is it currently behaving?
   - **Root cause** (if known): What is causing the bug?
   - **Fix approach**: What is the planned fix?

3. Create the file at: `docs/fixes/{kebab-case-name}.md`

   **If `frontend`:**
   ```markdown
   # Fix: {Fix Name}

   ## Type

   Frontend

   ## Bug Description

   {bug description}

   ## Steps to Reproduce

   1. {step 1}
   2. {step 2}

   ## Expected Behavior

   {expected behavior}

   ## Current Behavior

   {current behavior}

   ## Root Cause

   {root cause if known, or "Under investigation"}

   ## Fix Approach

   {planned fix}

   ## Affected Components

   {components/files affected}

   ## Testing

   - [ ] {test case 1}
   - [ ] {test case 2}
   ```

   **If `backend`:**
   ```markdown
   # Fix: {Fix Name}

   ## Type

   Backend

   ## Bug Description

   {bug description}

   ## Steps to Reproduce

   1. {step 1}
   2. {step 2}

   ## Expected Behavior

   {expected behavior}

   ## Current Behavior

   {current behavior}

   ## Root Cause

   {root cause if known, or "Under investigation"}

   ## Fix Approach

   {planned fix}

   ## Affected Files / Modules

   {files, services, endpoints affected}

   ## Testing

   - [ ] {test case 1}
   - [ ] {test case 2}
   ```

4. Confirm with the user: show the file path and summary, ask if any changes are needed.

5. Suggest: "Run `/feature load {filename}` to load this spec into current-feature.md and start fixing."
