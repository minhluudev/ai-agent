# Plan Action

Create or refine the `Implement Plan` from the active spec.

Include:

- Ordered rollout steps and file paths.
- Dependency order and technical decisions.
- Test plan: unit tests (Vitest for utilities/actions), build check (`npm run build`), and browser verification.
- Risks or unknowns that affect implementation.

For Next.js work, follow this dependency order:
`types → modules/<domain>/services → modules/<domain>/api → modules/<domain>/components → app/routes → tests`

Ask: `Proceed with implementation? (yes/no/adjust)` unless approval was already given.
