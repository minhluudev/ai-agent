# Plan Action

Create or refine the `Implement Plan` from the active spec.

Include:

- Ordered rollout steps and file paths.
- Dependency order and technical decisions.
- Test plan: unit, integration, API/feature tests as applicable.
- Risks or unknowns that affect implementation.

For Laravel backend work, follow `domain-driven-design`: migration -> Domain -> Infrastructure -> Application -> Interfaces -> tests.

Gate is owned by the active workflow (`GATE.WORKFLOW_OWNERSHIP`); do not re-trigger here.
If this action runs standalone (without workflow orchestration), ask once:
`Proceed with implementation? (yes/no/adjust)`.
