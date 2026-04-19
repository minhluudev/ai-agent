---
name: domain-driven-design
description: Design and scaffold Laravel backend modules using Domain-Driven Design with action-based architecture and event-driven communication. Use when creating or refactoring Laravel modules, RESTful APIs, or microservice slices with explicit Domain/Application/Infrastructure separation. Triggers on requests for DDD, bounded contexts, Domain Actions, UseCases, Domain Events, cross-domain communication, or any feature that needs clear layer separation.
---

# Domain Driven Design

## Workflow

1. Understand the requirement. Extract the business behavior, trigger, state transition, and side effects.
2. Identify the bounded context or module.
3. Define the minimum slice: Entity, Action, DTO, Model, Provider, Repository contract, Domain Event, UseCase, EventHandler or Controller.
4. Decide communication boundaries: same domain → Action; cross-domain → Domain Event; cross-service → queue or Kafka.
5. Decide sync vs async. Default sync for request-critical changes, async for retries and fan-out.
6. Generate code from `templates/`. Read only the files needed and replace every placeholder with domain-specific, compile-safe code.
7. Write tests:
   - **Unit test** — Domain layer only: Actions, Entities, Domain Services. Mock Repository contracts. No framework, no DB.
   - **Integration test** — Application layer only: UseCases with a real repository hitting a test DB. No mocks for persistence.
8. Run tests: `php artisan test` — fix all failures before considering the task done.

## Layer Rules

- Business logic in `*Action` only.
- `*UseCase` is orchestration-only — calls one Action, nothing else.
- Domain is framework-independent — no Eloquent, no Facades.
- Actions call only same-domain components: Entities, Repository contracts, Domain Services, Events.
- Every DTO must extend `BaseDTO` (`Modules\Shared\DTOs\BaseDTO`). Every constructor parameter must have a `#[Rules([...])]` PHP attribute. `BaseDTO::rules()` derives the validation array from those attributes via reflection — subclasses must not override it. `fromRequest()` calls `static::validate($request)` (provided by `BaseDTO`) before constructing. Before scaffolding, check if `Modules/Shared/DTOs/BaseDTO.php` already exists. If absent, scaffold `BaseDTO` and the `Rules` attribute from `BaseDTO.template` and `RulesAttribute.template`.
- Eloquent Models in Infrastructure for ORM mapping only — never as Domain Entities.
- Providers in Infrastructure for bindings and wiring only — no business logic.
- Repository interfaces in Domain; implementations in Infrastructure.
- Events are immutable, named in past tense, and handlers are idempotent.
- Cross-domain: emit an Event, never inject another domain's Action or Repository.
- Controllers and Listeners are thin: validate, translate, delegate.
- **All controller responses must use the `api-response` skill** — never `response()->json()` directly. Read the skill before writing any controller action.

## Default Layout

`Modules/` lives at the **project root**. Never place domain code inside `app/`.

```text
{project-root}/
├── Modules/
│   └── {Module}/
│       ├── Domain/
│       │   ├── Entities/
│       │   ├── Actions/
│       │   ├── Events/
│       │   └── Repositories/
│       ├── Application/
│       │   ├── UseCases/
│       │   ├── DTOs/
│       │   └── EventHandlers/
│       ├── Infrastructure/
│       │   ├── Models/
│       │   ├── Providers/
│       │   ├── Repositories/
│       │   ├── Messaging/
│       │   └── External/
│       └── Interfaces/
│           ├── Controllers/
│           ├── Requests/
│           ├── Resources/
│           └── Listeners/
├── app/               ← do NOT use for domain code
├── routes/
└── ...
```

## References

- Read [references/architecture.md](references/architecture.md) for responsibilities, event flow, directory rules, naming conventions, and anti-patterns.
- Read [references/templates.md](references/templates.md) for the template file catalog.
- Use the `api-response` skill when writing Controllers — covers `ApiResponse::success()`, `::problem()`, `::validation()`, status codes, and error code conventions.

## Response Shape

Design-only or ambiguous tasks: **Analysis → Design → Code → Events → Notes**.

Implementation tasks: write code first; use the structure above only if it adds clarity.
