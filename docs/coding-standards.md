# Coding Standards

Source of truth for general agent and project rules. Skills may add domain-specific rules; workflows route work and define gates.

## Agent Rules

- Prefer the smallest change that satisfies the requirement.
- Read only relevant files; avoid repo-wide scans unless the task is cleanup or architecture review.
- Keep instructions in one place: workflows route work, skills define domain rules, templates provide code skeletons.
- Preserve public contracts unless the user explicitly asks for a breaking change.
- Do not scan, reformat, or change unrelated files.
- Do not add dependencies, change `.env`, alter public API shape, or run destructive DB operations without approval.

## Commit Rules

- Ask before committing. Use conventional commits.
- Stage only files changed for the task; never `git add .`.
- No AI attribution in commits.

## Laravel Backend Rules

- Controllers are thin: FormRequest validation → DTO creation → UseCase call → ApiResponse return.
- Domain `*Action` classes own business rules and state transitions.
- `*UseCase` classes orchestrate one Action and contain no business logic.
- Use `ApiResponse`; do not call `response()->json()` in controllers.
- Infrastructure contains Eloquent models, repository implementations, providers, external clients, and messaging adapters.
- Cross-domain communication happens through Domain Events, not direct imports.
- Cross-module imports are limited to published Domain Events.
- Domain code must not depend on Eloquent, HTTP, Facades, or concrete infrastructure.
- Eloquent models live only in `Infrastructure/Models` and are not Domain Entities.

## Test Rules

- Tests cover behavior, not implementation details.
- Domain: unit tests (mock repository contracts, no DB/framework).
- Application: integration tests (real test DB, event dispatch assertions).
- HTTP: feature tests (controllers, request validation, response shape, auth).
- Event handlers: run twice with same event and assert idempotent outcome.
- Prioritize tests by business/regression risk, not coverage percentage.

## Error Handling

- After 2–3 failed attempts at the same fix, stop and report root cause, attempts, and blocker.
