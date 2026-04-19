# Init Feature Action

Goal: Create a spec file for a new feature, saved to `docs/features/`.

## Steps

1. Check $ARGUMENTS (after "init-feature"):
   - If a feature name is provided: use it as the spec name
   - If not: ask the user "What is the name of this feature?"

2. Ask the user for the following:
   - **Type**: `backend` or `frontend`? (if not clear from $ARGUMENTS)
   - **Description**: What does this feature do?
   - **Goals**: What are the expected outcomes? (bullet points)
   - **Acceptance Criteria**: When is this feature considered done?
   - **Technical Notes**: Any technical constraints, APIs to use, or things to watch out for?
   - **Out of Scope**: What is explicitly not part of this feature?

3. Create the file at: `docs/features/{kebab-case-name}.md`

   **If `frontend`:**
   ```markdown
   # Feature: {Feature Name}

   ## Type

   Frontend

   ## Description

   {feature description}

   ## Goals

   - {goal 1}
   - {goal 2}

   ## Acceptance Criteria

   - [ ] {criteria 1}
   - [ ] {criteria 2}

   ## UI/UX Notes

   {UI description, components to create/modify, responsive requirements}

   ## Technical Notes

   {state management, API calls, dependencies, edge cases}

   ## Out of Scope

   - {item 1}

   ## Implementation Plan

   {AI-generated step-by-step plan for implementing this feature. Include: files to create/modify, order of implementation, key decisions, and any risks or unknowns.}
   ```

   **If `backend`:**
   ```markdown
   # Feature: {Feature Name}

   ## Type

   Backend

   ## Description

   {feature description}

   ## Goals

   - {goal 1}
   - {goal 2}

   ## Acceptance Criteria

   - [ ] {criteria 1}
   - [ ] {criteria 2}

   ## API / Endpoints

   {endpoints to create/modify if any}

   ## Data / Schema Changes

   {database or model changes if any}

   ## Technical Notes

   {business logic, validation, security, edge cases}

   ## Out of Scope

   - {item 1}

   ## Implementation Plan

   {AI-generated step-by-step plan for implementing this feature. Include: files to create/modify, order of implementation, key decisions, and any risks or unknowns.}
   ```

4. After writing the spec, **generate an Implementation Plan** by analyzing the feature requirements and the existing codebase:
   - Break down the implementation into ordered steps
   - Identify files to create or modify
   - Note key technical decisions and trade-offs
   - Flag any risks or unknowns
   - Fill in the `## Implementation Plan` section with the result

5. Confirm with the user: show the file path and summary, ask if any changes are needed.

6. Suggest: "Run `/feature load {filename}` to load this spec into current-feature.md and start implementing."
