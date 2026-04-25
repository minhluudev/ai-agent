# Analyze Action

Read spec and analyze the scope of changes needed.

## Steps

### Step 1: Load Spec

1. Check @docs/current-feature.md for `## Active Spec` — if set, read that spec file
2. If not set, check $ARGUMENTS:
   - If filename: look for `docs/specs/{name}.md`
   - If inline text: treat as a raw requirement — run the `spec` action first, then continue
   - If nothing: stop with error "No spec found. Run `/autopilot spec {requirement}` first."
3. Parse the spec: extract Goals, API Endpoints, Database Changes, Business Rules, Implementation Plan

### Step 2: Inspect Context

1. Read @docs/project-overview.md — tech stack, domain, modules
2. Read @docs/coding-standards.md — conventions
3. Read `domain-driven-design` references if this is backend work
4. Inspect only files related to the spec — do not scan the whole repo

### Step 3: Scope Analysis

For each goal in the spec, determine:
- Which modules/bounded contexts are affected
- Which existing files need modification
- Which new files need creation
- Cross-domain dependencies (events needed?)

### Step 4: Output Report

```
## Scope Analysis

### Modules
- {Module}: {what changes}

### New Files ({count})
- {path}: {purpose}

### Modified Files ({count})
- {path}: {what changes}

### Risk
- Complexity: Low | Medium | High
- Breaking changes: {yes/no}
```

### Step 5: Update State

- Update @docs/current-feature.md: set Status to "In Progress"
