---
name: domain-driven-design
description: Design and scaffold Laravel backend modules using DDD with action-based architecture and event-driven communication
---

# Domain Driven Design

## Workflow

1. Understand the requirement — extract business behavior, trigger, state transition, side effects
2. Identify the bounded context / module
3. Define minimum slice: Entity, Action, DTO, Model, Provider, Repository, Domain Event, UseCase, EventHandler, Controller
4. Communication: same domain → Action; cross-domain → Domain Event
5. Generate code from `templates/` — read only the needed files, replace every placeholder
6. Write tests: unit (Domain) + integration (Application)
7. Run `php artisan test` — fix all failures

## Key Rules

- Business logic in `*Action` only. `*UseCase` is orchestration-only.
- Domain is framework-independent — no Eloquent, no Facades.
- Every DTO extends `BaseDTO` with `#[Rules(...)]` attributes. Check `Modules/Shared/DTOs/BaseDTO.php` exists before scaffolding.
- Eloquent Models in Infrastructure only — never as Domain Entities.
- Cross-domain: emit Event, never inject another domain's Action/Repository.
- **Controller responses must use the `api-response` skill** — never `response()->json()`.

## References

Read these before implementing:
- [references/architecture.md](references/architecture.md) — layer responsibilities, naming, file placement, anti-patterns
- [references/templates.md](references/templates.md) — template catalog

## Module Layout

`Modules/` at project root. Never place domain code in `app/`.

```
Modules/{Module}/
├── Domain/         (Entities, Actions, Events, Repositories)
├── Application/    (UseCases, DTOs, EventHandlers)
├── Infrastructure/ (Models, Providers, Repositories, Messaging, External)
└── Interfaces/     (Controllers, Requests, Resources, Listeners)
```
