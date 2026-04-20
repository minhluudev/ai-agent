# Start Action

1. Read `current-feature.md` — verify Goals are populated.
2. If Goals are empty, stop: `"Run /feature load first"`
3. Set Status to `"In Progress"` in `current-feature.md`.
4. Create and checkout the feature branch (derive name from H1 heading, format: `feature/<name>` or `fix/<name>`).

## Implementation

For each goal, before writing code:

### Architecture — invoke `nextjs-coding`

- Use `nextjs-coding` to resolve `<source-root>` and map every new file to a target layer.
- Confirm placement: route file, domain module, shared, services, config, or types.
- Do not create files until the target layer is confirmed.

### UI work — invoke `frontend-coding-rules`

- If the goal involves UI, invoke `frontend-coding-rules` before writing markup.
- Stack priority: **shadcn/ui → Tailwind CSS → CSS Module**.
- When creating a new component, invoke `react-component-generator` — do not scaffold by hand.

### Implement

5. Implement goals one by one following architecture and UI rules above.
6. After implementation, run `npm run build` and fix any errors before proceeding.
