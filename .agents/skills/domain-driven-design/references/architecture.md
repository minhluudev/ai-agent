# Architecture Reference

## Responsibilities

- `UseCase`: accept DTO, call one Domain Action, return result. No repository calls, no business logic.
- `Action`: own the business flow — load/save via Repository contracts, manipulate Entities, invoke Domain Services, emit Events.
- `Model`: database persistence shape only — casts, relations, scopes, ORM concerns.
- `Provider`: bind repository implementations, event publishers, and infrastructure services into the container.
- Cross-domain: never inject another domain's Action, Repository, or Entity. Emit an event; the receiving domain reacts via its own Handler and Action.

## Event Flow

1. Controller/Listener → UseCase (with DTO)
2. UseCase → Action
3. Action executes business rule, saves via Repository
4. Action dispatches Domain Event
5. Infrastructure publishes to queue/broker when needed
6. Handler consumes idempotently → calls its own domain's Action

## Testing Rules

**Unit tests — Domain layer only.**

- Scope: Actions, Entities, Domain Services, Specifications.
- Mock Repository contracts; no Eloquent, no DB, no framework.
- Assert business outcomes: entity state, events emitted, exceptions thrown.
- Never test Controllers, UseCases, or Infrastructure in unit tests.

**Integration tests — Application layer only.**

- Scope: UseCases.
- Use a real repository against a test database — no mocks for persistence.
- Assert the full flow: DB state after UseCase execution, side effects, event dispatch.
- Never test Domain Actions directly in integration tests — that is the unit test's job.

**Other layers.**

- Controllers: covered by feature/HTTP tests (outside this skill's scope).
- EventHandlers: test idempotency — run the handler twice with the same event; assert the outcome is identical.

## Directory Structure Rules

`Modules/` is at the project root. Never generate files under `app/`.

- Routes (`routes/api.php`) reference Controllers via fully-qualified class names.
- Register `{Module}ServiceProvider` in `bootstrap/providers.php` (Laravel 11+) or `config/app.php`.

### File Placement Map

| Component | Path | Naming |
| --- | --- | --- |
| Entity | `Modules/{Module}/Domain/Entities/` | `{Entity}.php` |
| Domain Action | `Modules/{Module}/Domain/Actions/` | `{Verb}{Entity}Action.php` |
| Domain Event | `Modules/{Module}/Domain/Events/` | `{Entity}{PastTense}.php` |
| Repository interface | `Modules/{Module}/Domain/Repositories/` | `{Entity}Repository.php` |
| DTO | `Modules/{Module}/Application/DTOs/` | `{Verb}{Entity}DTO.php` |
| UseCase | `Modules/{Module}/Application/UseCases/` | `{Verb}{Entity}UseCase.php` |
| EventHandler | `Modules/{Module}/Application/EventHandlers/` | `{Entity}{PastTense}Handler.php` |
| Eloquent Model | `Modules/{Module}/Infrastructure/Models/` | `{Entity}Model.php` |
| Repository impl | `Modules/{Module}/Infrastructure/Repositories/` | `{Entity}RepositoryImpl.php` |
| Service Provider | `Modules/{Module}/Infrastructure/Providers/` | `{Module}ServiceProvider.php` |
| Queue/Kafka adapter | `Modules/{Module}/Infrastructure/Messaging/` | `{Entity}{Transport}Publisher.php` |
| External API client | `Modules/{Module}/Infrastructure/External/` | `{Service}Client.php` |
| HTTP Controller | `Modules/{Module}/Interfaces/Controllers/` | `{Verb}{Entity}Controller.php` |
| Form Request | `Modules/{Module}/Interfaces/Requests/` | `{Verb}{Entity}Request.php` |
| Event Listener | `Modules/{Module}/Interfaces/Listeners/` | `On{Entity}{PastTense}.php` |
| API Resource | `Modules/{Module}/Interfaces/Resources/` | `{Entity}Resource.php` |

### Layer Constraints

**`Domain/`** — Allowed: Entities, Actions, Events, Repository interfaces, Domain Services, Value Objects. Forbidden: Eloquent, Laravel facades, HTTP, `use Illuminate\...` (except contracts).

**`Application/`** — Allowed: UseCases, DTOs, EventHandlers. Forbidden: business logic, repository calls, Eloquent, HTTP objects.

**`Infrastructure/`** — Allowed: Eloquent Models, Repository impls, Providers, publishers, external clients. Forbidden: business logic, Domain entities as ORM objects, cross-domain imports.

**`Interfaces/`** — Allowed: Controllers, Requests, Resources, Listeners. Forbidden: business logic, direct repository calls, Eloquent queries.

### Naming Conventions

- Actions: imperative verb — `CreateOrderAction`, `CancelOrderAction`
- Events: past tense — `OrderCreated`, `PaymentApproved`
- UseCases + DTOs: mirror the Action verb — `CreateOrderUseCase`, `CreateOrderDTO`
- Controllers: single-action invokable — `CreateOrderController` with `__invoke`
- Eloquent Models: always suffix `Model` — `OrderModel`, never `Order`
- Repository impls: always suffix `Impl` — `OrderRepositoryImpl`

### Cross-Module Import Rules

- Within a module: any direction is allowed.
- Cross-module: only via `Domain/Events/` — emit an event, handle in the receiving module's `Application/EventHandlers/`.
- Never import another module's `Domain/`, `Application/`, or `Infrastructure/` directly.

## Anti-Patterns

- Business logic in Controllers, UseCases, or Providers
- UseCase calling Repository directly
- Missing Action layer
- Eloquent Models used as Domain Entities
- Domain importing framework code
- Domain A calling Domain B via Action or Repository injection
