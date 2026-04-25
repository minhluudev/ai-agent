# Architecture Reference

## Responsibilities

- `Entity`: framework-free state, invariant behavior, and recorded Domain Events when needed.
- `Action`: owns business flow, repository contracts, and state transitions. It does not import Application DTOs or HTTP objects.
- `UseCase`: accepts Application DTO, calls one Action, returns result, and dispatches recorded Domain Events at the Application boundary.
- `DTO`: transport-neutral input/output shape built from arrays or primitives; no Request dependency.
- `Model`: Eloquent persistence shape only.
- `Provider`: binds contracts to infrastructure implementations.
- `Handler`: consumes events idempotently and calls its own module UseCase.

## Event Flow

Controller/Listener -> DTO -> UseCase -> Action -> Repository -> Entity records Domain Event -> UseCase dispatches -> Handler -> receiving module UseCase.

## Testing

- Unit: Domain Actions, Entities, Services. Mock repository contracts; no DB/framework.
- Integration: Application UseCases with real test DB/repositories and event dispatch assertions.
- Feature/API: Controllers, requests, response shape, auth/validation.
- EventHandlers: run twice with same event and assert idempotent outcome.

## Paths

| Component | Path | Naming |
| --- | --- | --- |
| Entity | `Modules/{Module}/Domain/Entities/` | `{Entity}.php` |
| Action | `Modules/{Module}/Domain/Actions/` | `{Verb}{Entity}Action.php` |
| Event | `Modules/{Module}/Domain/Events/` | `{Entity}{PastTense}.php` |
| Repository contract | `Modules/{Module}/Domain/Repositories/` | `{Entity}Repository.php` |
| DTO | `Modules/{Module}/Application/DTOs/` | `{Verb}{Entity}DTO.php` |
| UseCase | `Modules/{Module}/Application/UseCases/` | `{Verb}{Entity}UseCase.php` |
| EventHandler | `Modules/{Module}/Application/EventHandlers/` | `{Entity}{PastTense}Handler.php` |
| Model | `Modules/{Module}/Infrastructure/Models/` | `{Entity}Model.php` |
| Repository impl | `Modules/{Module}/Infrastructure/Repositories/` | `{Entity}RepositoryImpl.php` |
| Provider | `Modules/{Module}/Infrastructure/Providers/` | `{Module}ServiceProvider.php` |
| Controller | `Modules/{Module}/Interfaces/Controllers/` | `{Verb}{Entity}Controller.php` |
| Request | `Modules/{Module}/Interfaces/Requests/` | `{Verb}{Entity}Request.php` |
| Resource | `Modules/{Module}/Interfaces/Resources/` | `{Entity}Resource.php` |

## Layer Constraints

- `Domain`: Entities, Actions, Events, Repository contracts, Domain Services, Value Objects. No Eloquent/HTTP/Facades/Application DTOs/concrete infrastructure.
- `Application`: UseCases, DTOs, EventHandlers. No business rules, Eloquent, or HTTP objects.
- `Infrastructure`: Models, repository implementations, providers, messaging, external clients. No business rules.
- `Interfaces`: Controllers, Requests, Resources, Listeners. No business rules, direct repository calls, or Eloquent queries.
- `Interfaces/Requests`: FormRequests may call `Application/DTOs/*DTO::rules()` for validation rules, then Controllers pass `$request->validated()` to `DTO::fromArray()`.

## Imports

- Follow the layer constraints inside a module.
- Cross-module direct imports are forbidden except stable `Domain/Events` consumed by handlers.
- Register service providers in `bootstrap/providers.php` for Laravel 11+ or `config/app.php` for older apps.

## Anti-Patterns

- Business logic in Controller, UseCase, Provider, Model, DTO, or Request.
- Domain Action importing Application DTO or HTTP Request.
- UseCase calling Repository directly.
- Eloquent Model used as Domain Entity.
- Domain importing framework/infrastructure code.
- Module A calling Module B Action or Repository directly.
