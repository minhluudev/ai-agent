# Coding Standards

## Agent Rules

- Prefer the smallest change that satisfies the requirement.
- Read only relevant files; avoid repo-wide scans unless the task is cleanup or architecture review.
- Keep instructions in one place: workflows route work, skills define domain rules, templates provide code skeletons.
- Preserve public contracts unless the user explicitly asks for a breaking change.

## Laravel Backend Rules

- Controllers are thin: FormRequest validation, DTO creation, UseCase call, ApiResponse return.
- Domain `*Action` classes own business rules and state transitions.
- `*UseCase` classes orchestrate one Action and contain no business logic.
- Infrastructure contains Eloquent models, repository implementations, providers, external clients, and messaging adapters.
- Cross-domain communication happens through Domain Events, not direct imports.
- Tests should cover behavior: Domain unit tests, Application integration tests, HTTP feature tests.
