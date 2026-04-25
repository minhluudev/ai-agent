---
name: domain-driven-design
description: Laravel backend module design using DDD layers, Actions, DTOs, repositories, and events.
---

# Domain Driven Design

Use for Laravel backend modules only.

## Workflow

1. Extract business behavior, trigger, state transition, and side effects.
2. Identify the bounded context/module.
3. Generate only the needed slice: Entity, Action, DTO, Model, Provider, Repository, Event, UseCase, Handler, Controller.
4. Same module coordinates through its UseCase/Action; cross-module side effects use Domain Events.
5. Read only needed templates from `templates/` and replace every placeholder.
6. Test Domain with unit tests, Application with integration tests, HTTP with feature tests.

## Hard Rules

- Business logic lives in `Domain/Actions/*Action`.
- Domain Actions accept primitives, Value Objects, or Domain objects; they must not import Application DTOs.
- `Application/UseCases/*UseCase` accepts DTOs, calls one Action, and dispatches recorded Domain Events when needed.
- Application DTOs are transport-neutral; build them from arrays, not HTTP Request objects.
- Domain code must not depend on Eloquent, HTTP, Facades, or concrete infrastructure.
- Eloquent models live only in `Infrastructure/Models` and are not Domain Entities.
- Cross-module imports are limited to published Domain Events.
- Controllers return via `api-response`; never `response()->json()`.

## References

- `references/architecture.md`: responsibilities, paths, tests, anti-patterns.
- `references/templates.md`: template catalog.

## Layout

`Modules/{Module}/Domain`, `Application`, `Infrastructure`, `Interfaces`. Never place module domain code under `app/`.
