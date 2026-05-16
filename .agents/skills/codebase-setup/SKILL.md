---
name: codebase-setup
description: "Setup or normalize a project codebase: restructure folders, install required dependencies, add baseline configs, and enable quality/test/CI gates with small, reviewable changes."
argument-hint: plan|run|verify
---

# Codebase Setup

Use this skill when the user asks to bootstrap a codebase, standardize architecture, or add missing project foundations (dependencies, configs, scripts, quality gates, CI, and developer workflow).

For Next.js App Router projects, this skill must comply with `nextjs-coding` as a mandatory architecture contract.

## When to use

- New project is missing baseline structure/config.
- Existing project needs normalization to shared conventions.
- Team asks for "setup from scratch", "prepare production baseline", or "cleanup project foundation".

## When not to use

- Single-feature implementation that does not need repo-wide setup.
- Bugfixes isolated to one module/file.

## Safety and scope rules

- Follow `AGENT.MINIMAL_CHANGE`, `AGENT.SCOPED_READS`, `AGENT.UNRELATED_FILES`, `AGENT.SAFE_OPERATIONS`.
- Follow `AGENT.KEBAB_CASE_PATHS` for new folder/file names unless a tool/framework requires a fixed filename.
- Do not install dependencies or rewrite architecture without explicit user approval.
- Stage setup changes in small batches (structure -> dependencies -> config -> verify).
- Preserve public behavior unless the user explicitly requests breaking changes (`AGENT.CONTRACT_STABILITY`).
- For Next.js setup, enforce `nextjs-coding` guardrails:
  - no mixed `app/` and `src/app/`
  - no ad-hoc `features/`/`lib/` when target layers exist
  - no direct real API calls from page/component files

## Execution workflow

### 1. Profile current codebase

- Detect runtime stack, package manager, test runner, lint/format tools, CI provider, and deployment target.
- Snapshot current state:
  - directory tree roots
  - `package.json` scripts/dependencies
  - key configs (`tsconfig`, lint, formatter, test, build, env)
- Identify gaps and propose a minimal setup plan.

### 2. Plan target structure

- Define folder ownership before moving files.
- For Next.js projects, resolve `<source-root>` exactly as `nextjs-coding` defines, then align all paths to its target layers.
- When creating new path segments during setup/normalization, use `kebab-case`.
- Prepare a move map (source -> destination) and keep migration incremental.
- Avoid unrelated renames/churn.

### 3. Dependency baseline

- Install only packages required by approved setup scope.
- Prefer existing stack choices first; avoid replacing working tools unless requested.
- Group install changes by capability:
  - type safety and validation
  - lint/format
  - unit/integration testing
  - E2E testing
  - automation hooks

For Next.js baseline details, load only the section you need:
- `references/nextjs-baseline-structure.md`
- `references/nextjs-baseline-dependencies.md`
- `references/nextjs-baseline-config.md`
- `references/nextjs-baseline-verification.md`

### 4. Config baseline

- Add/update only required configs for approved capabilities.
- Keep config files minimal and deterministic.
- Typical config areas:
  - TypeScript
  - ESLint + Prettier
  - test runner + test environment
  - E2E runner
  - automation test path (`<source-root>/tests/` by default; keep existing path if repo already standardizes differently)
  - env schema and defaults
  - path alias and import boundaries
- Require import alias prefix `~/` for app code:
  - set `compilerOptions.baseUrl` and `compilerOptions.paths` in `tsconfig.json`
  - map `~/*` to `<source-root>/*` (`./src/*` when using `src/app`, otherwise `./*`)
  - keep all new internal imports consistent with `~/...` after setup
- When external APIs exist, configure API source switch in the domain API layer:
  - `EXTERNAL_API=mock` -> mock API
  - `EXTERNAL_API=api` -> real API
  - default: `EXTERNAL_API=api`
  - for automated tests: use `EXTERNAL_API=mock` unless spec requires real/sandbox verification

### 5. Quality and automation gates

- Ensure scripts exist and are runnable:
  - lint
  - typecheck
  - unit/integration test
  - build
  - E2E (when enabled)
- Ensure E2E files are rooted in one consistent location:
  - preferred: `<source-root>/tests/` (E2E specs under `<source-root>/tests/e2e/`)
  - fallback: existing repo E2E path without creating duplicate test roots
- Add pre-commit / commit message checks only when approved.
- Add or update CI to run the same gates as local scripts.

### 6. Verify and report

- Run the smallest relevant checks first, then full checks.
- For Next.js setup, include a dedicated architecture compliance check against `nextjs-coding`.
- Include alias validation: `~/` imports resolve in typecheck/build and no new absolute project imports bypass alias convention.
- Report:
  - files changed
  - dependencies added/removed
  - scripts/config introduced
  - remaining risks/gaps

## Output contract

When using this skill, always provide:

1. Setup plan (batched and reviewable)
2. Exact dependency commands
3. Config files to add/change
4. Verification commands
5. Rollback notes for risky changes
6. Next.js compliance notes (only when target is Next.js)
