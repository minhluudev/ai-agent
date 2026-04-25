# Plan Action

Create a detailed implementation plan from the spec.

## Steps

1. **Read spec** — Get the active spec from @docs/current-feature.md `## Active Spec`, then read the spec file. Use the Goals, Input, Output, Flow, Usecases, Business Rules, and existing Implementation Plan as input.

2. **Design architecture** — For each affected module:
   - Domain: Entities, Actions, Events, Repository interfaces
   - Application: UseCases, DTOs, EventHandlers
   - Infrastructure: Models, Repository impls, Providers, Migrations
   - Interface: Controllers, Requests, Resources
   - Follow `domain-driven-design` skill conventions

3. **Define order** — Respect dependencies:
   - Migrations first → Domain → Infrastructure → Application → Interface
   - Tests alongside each layer

4. **Output plan:**

```
## Implementation Plan

### Step 1: {description}
- Files: {list}
- Details: {what to implement}

### Step 2: ...

### Test Plan
- Unit: {Domain layer tests}
- Integration: {Application layer tests}
- API: {endpoint tests}
```

5. **Ask for approval:** "Proceed with implementation? (yes/no/adjust)"
