# Spec Action

Take a raw requirement from the user and generate a complete spec document.

The spec must be readable by **both humans and AI** — structured enough for autopilot to parse, clear enough for a developer to review.

## Steps

### Step 1: Receive Requirement

Read $ARGUMENTS as the raw requirement. If empty, ask ONE question: "What do you want to build or fix?"

Do NOT ask follow-up questions. Generate the entire spec from the requirement. The user will review and adjust afterward.

### Step 2: Analyze Requirement

From the requirement text, determine:
- Feature name (short, descriptive)
- Is this a feature or a fix?
- What are the goals?
- What modules/areas of the codebase are affected?
- What API endpoints are needed?
- What data/schema changes are needed?
- What edge cases or constraints exist?
- What is out of scope?

Read @docs/project-overview.md and @docs/coding-standards.md for project context.
Inspect relevant existing code to understand current patterns.

### Step 3: Write Spec

Save to `docs/specs/{kebab-case-name}.md` using this format:

```markdown
# {Feature/Fix Name}

## Type
feature | fix

## Requirement
{Original requirement from user — preserved verbatim}

## Goals
- {goal 1 — concrete, testable}
- {goal 2}

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/{resource} | {what it does} |

(Skip this section if no API changes)

## Database Changes
- {table}: {what changes — new table, new column, index, etc.}

(Skip this section if no DB changes)

## Business Rules
- {rule 1 — validation, authorization, constraints}
- {rule 2}

## Implementation Plan
1. {step 1}: {files to create/modify}
2. {step 2}: {files to create/modify}
...

## Test Plan
- Unit: {what to test in Domain layer}
- Integration: {what to test in Application layer}
- API: {endpoint tests}

## Out of Scope
- {explicitly excluded items}

## Status
Not Started
```

### Step 4: Update Tracker

Update @docs/current-feature.md:
- Set `## Active Spec` to the spec file path
- Set `## Status` to "Spec Written"

### Step 5: Present to User

Print the spec and ask: "Review this spec. Adjust anything, or run `/autopilot run` to start implementation."
