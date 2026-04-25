# Init Feature Action

Goal: Create a spec file for a new feature, saved to `docs/features/`.

## Steps

1. Check $ARGUMENTS (after "init-feature"):
   - If a feature name is provided: use it as the spec name
   - If not: ask the user "What is the name of this feature?"

2. **Analyze first, ask only when needed.**

   Read all information provided in $ARGUMENTS and the user's description carefully. Infer as much as possible from context. Then:

   - Auto-fill every section you can confidently derive from what was given.
   - For sections that are **ambiguous or missing**, ask **one question at a time** — wait for the user's answer before asking the next.
   - If everything is clear, skip asking entirely and proceed to writing the spec.

   Sections to derive or ask about:
   - **Type**: Infer from context (`frontend` / `backend` / `fullstack`). Ask only if truly unclear.
   - **Overview**: Derive from the user's description. Confirm with a one-sentence summary only if the intent is ambiguous.
   - **Input**: Identify from the description. Ask if inputs are not mentioned.
   - **Output**: Derive expected results and frame as test cases. Ask if success criteria are unclear.
   - **Flow**: Reconstruct from the description. Ask only if the sequence or logic is not inferable.
   - **Usecases**: Derive from context. Ask if actors or scenarios are not mentioned.

3. Create the file at: `docs/features/{kebab-case-name}.md`

   Use the following template regardless of feature type, adapting sections to what's relevant:

   ```markdown
   # Feature: {Feature Name}

   **Type:** {frontend | backend | fullstack}

   ## Overview

   {A concise summary of what this feature is, what problem it solves, and why it matters.}

   ## Input

   {Describe all inputs: user actions, API request payloads, form fields, events, environment conditions, etc.}

   | Input | Type | Description |
   |-------|------|-------------|
   | {input name} | {type} | {description} |

   ## Output

   {Describe expected outputs like test cases — what must be true when the feature works correctly.}

   - **Given** {condition}, **when** {action}, **then** {expected result}
   - **Given** {condition}, **when** {action}, **then** {expected result}

   ## Flow

   {Choose the appropriate Mermaid diagram(s) based on the feature type:}

   ### Logic Flow
   {Use for conditional logic, branching, decision trees}

   ```mermaid
   flowchart TD
       A[Start] --> B{Condition}
       B -- Yes --> C[Action]
       B -- No --> D[Other Action]
   ```

   ### Sequence / Time-based Calls
   {Use when multiple systems or actors interact over time — e.g. frontend → API → DB}

   ```mermaid
   sequenceDiagram
       participant User
       participant Frontend
       participant API
       participant DB
       User->>Frontend: Action
       Frontend->>API: Request
       API->>DB: Query
       DB-->>API: Result
       API-->>Frontend: Response
       Frontend-->>User: Display
   ```

   ### Database Schema
   {Use when there are database entities or relationships involved}

   ```mermaid
   erDiagram
       ENTITY_A {
           int id
           string field
       }
       ENTITY_B {
           int id
           int entity_a_id
       }
       ENTITY_A ||--o{ ENTITY_B : has
   ```

   ## Usecases

   - **{Actor}**: {describes what they do and what outcome they expect}
   - **{Actor}**: {describes what they do and what outcome they expect}

   ## Implementation Plan

   <!-- Generated in step 4 -->
   ```

   > Only include the Mermaid diagram types that are relevant to the feature. Skip any that don't apply.

4. After writing the spec, **generate an Implementation Plan** by analyzing the feature requirements and the existing codebase:
   - Break down the implementation into ordered steps
   - Identify files to create or modify
   - Note key technical decisions and trade-offs
   - Flag any risks or unknowns
   - Fill in the `## Implementation Plan` section with the result

5. Confirm with the user: show the file path and summary, ask if any changes are needed.
