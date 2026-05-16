# Rule 16 - `services/<service-name>.service.ts`

## Purpose
Feature/domain service integration layer.

## Must
- Encapsulate API calls and response mapping.
- Keep external contract typing explicit.
- Centralize API source switching (`EXTERNAL_API=mock|api`) in this file.
- Default to real API path when `EXTERNAL_API` is missing.

## Must Not
- Render UI.
- Depend on route files.
- Scatter API source selection logic into routes, containers, or components.
