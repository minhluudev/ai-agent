# Rule 07 - `containers/<url-path-name-container>/`

## Purpose
Route-level feature container boundary.

## Must
- One folder represents one screen/use case.
- Keep structure explicit: `index.tsx`, `controller.ts`, `types/`, `components/`.

## Must Not
- Mix multiple unrelated screens in one container.
- Duplicate common UI that belongs in `components/`.
