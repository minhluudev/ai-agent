# Plan Action

Create or refine the `Implement Plan` from the active spec.

Include:

- Ordered rollout steps and file paths.
- Dependency order and technical decisions.
- Test plan: unit tests (Vitest for utilities/actions), build check (`npm run build`), and browser/UI verification for user-facing changes.
- Risks or unknowns that affect implementation.

Atomicity (`SPEC.ATOMIC_STEPS`): each step targets exactly one production file. Include the paired test file only when it directly verifies that production file. Per step, include exact file path, one-line technical decision, dependency, and verification. If steps exceed about 7, stop and restructure the active spec as an epic before continuing.

For Next.js work, follow this dependency order:
`types → modules/<domain>/services → modules/<domain>/api → modules/<domain>/components → app/routes → tests`

For UI work, include the expected component source (`shadcn/ui`, custom Tailwind composition, or CSS Module), required states, accessibility checks, responsive viewports, and how `UI.VISUAL_VERIFY` will be satisfied.

Ask: `Proceed with implementation? (yes/no/adjust)` unless approval was already given.
