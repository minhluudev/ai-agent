# Rule 09 - `containers/<url-path-name-container>/controller.ts`

## Purpose
Hold orchestration logic for one container.

## Must
- Own state, effects, event handlers, and service integration.
- Return only data/actions required by `index.tsx`.

## Must Not
- Render JSX.
- Access route file internals.
