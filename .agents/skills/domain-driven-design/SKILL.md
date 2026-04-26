---
name: domain-driven-design
description: Laravel backend module design using DDD layers, Actions, DTOs, repositories, and events.
---

# Domain Driven Design

Use for Laravel backend modules only. General code rules are in `docs/coding-standards.md`.

## Workflow

1. Extract business behavior, trigger, state transition, and side effects.
2. Identify the bounded context/module.
3. Generate only the needed slice: Entity, Action, DTO, Model, Provider, Repository, Event, UseCase, Handler, Controller.
4. Same module coordinates through its UseCase/Action; cross-module side effects use Domain Events.
5. Read only needed templates from `templates/` and replace every placeholder.
6. Test by layer (see `references/domain.md`, `references/application.md`).

## DDD-Specific Rules

- Domain Actions accept primitives, Value Objects, or Domain objects; they must not import Application DTOs.
- `Application/UseCases/*UseCase` accepts DTOs, calls one Action, and dispatches recorded Domain Events when needed.
- Application DTOs are transport-neutral; build them from arrays, not HTTP Request objects.
- Every DTO constructor property must have a `#[Rules([...])]` attribute for validation. DTOs without Rules attributes are invalid. See `templates/DTO.template` and `templates/RulesAttribute.template`.

## References

- `references/architecture.md`: paths and layer index.
- `references/domain.md`: Domain layer responsibilities and constraints.
- `references/application.md`: Application layer responsibilities and constraints.
- `references/infrastructure.md`: Infrastructure layer responsibilities and constraints.
- `references/interfaces.md`: Interfaces layer responsibilities and constraints.
- `references/cross-cutting.md`: event flow, imports, anti-patterns.
- `references/templates.md`: template catalog.

## Layout

`Modules/{Module}/Domain`, `Application`, `Infrastructure`, `Interfaces`. Never place module domain code under `app/`.
