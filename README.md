# AI Agent

Automated programming workflow powered by AI agents (Claude Code, Codex, etc.).

Give a requirement, AI writes the spec. Review the spec, AI implements end-to-end.

## Setup

```bash
bash init.sh
```

This links `.agents/skills/` into `.claude/skills/` so Claude Code can discover the skills.

## Quick Start

### 1. Init project (first time only)

```
/spect-writer init-project
```

AI asks about your project (tech stack, domain, modules) and writes `docs/project-overview.md`.

### 2. Write spec from requirement

```
/autopilot spec Tạo CRUD API cho category với name và description
```

AI generates a complete spec at `docs/specs/{name}.md` with:
- Overview, Input/Output tables, Given/When/Then test cases
- Flow diagrams (Mermaid), Usecases, Business Rules
- Implementation Plan, Test Plan

Review the spec. Adjust if needed.

### 3. Implement end-to-end

```
/autopilot run
```

AI reads the spec and runs the full pipeline:

```
analyze → plan → [approval] → implement → test → fix loop → summary → commit → [approval]
```

Two approval gates: after plan and before commit.

## All Commands

| Command | Description |
|---------|-------------|
| `/autopilot spec {requirement}` | Write spec from requirement |
| `/autopilot run` | Implement active spec end-to-end |
| `/autopilot bugfix {description}` | Find and fix a bug |
| `/autopilot refactor {target}` | Improve code structure |
| `/autopilot testgen {target}` | Add test coverage |
| `/spect-writer init-project` | Init project overview |
| `/cleanup check` | Report housekeeping issues |
| `/cleanup run` | Fix housekeeping issues |

### Individual Actions (advanced)

If the pipeline stops at a gate, resume with individual actions:

| Command | Description |
|---------|-------------|
| `/autopilot analyze` | Read spec, analyze scope |
| `/autopilot plan` | Create implementation plan |
| `/autopilot implement` | Code + test + fix loop |
| `/autopilot summary` | Generate change summary |
| `/autopilot commit` | Commit (requires approval) |

## Pipeline Details

### `/autopilot spec` — Write Spec

- Takes raw requirement text, AI infers everything
- Only asks questions when truly ambiguous (one at a time)
- Spec format: Overview, Input table, Output (Given/When/Then), Flow (Mermaid), Usecases, Business Rules, Implementation Plan, Test Plan
- Saved to `docs/specs/{name}.md`
- Updates `current-feature.md`: sets Active Spec path + Status = "Spec Written"

### `/autopilot run` — Full Pipeline

```
Stage 1: Analyze    ← read spec, inspect context, scope analysis
                      → current-feature.md Status = "In Progress"
Stage 2: Plan       ← implementation plan with file list
         [GATE]     ← "Approve plan?" — yes/no/adjust
Stage 3: Implement  ← code + write tests + run tests
         Fix Loop   ← auto-fix failures (max 3 attempts)
Stage 4: Summary    ← change summary + production checklist
         Commit     ← propose commit message
         [GATE]     ← "Commit?" — yes/no/adjust
                      → current-feature.md Status = "Complete", add to History
```

### `/autopilot commit` — Commit Code

- Runs `php artisan test` first — refuses to commit if tests fail
- Checks for files that should NOT be committed (`.env`, credentials, debug files)
- Shows list of files to stage + proposed commit message
- **Always requires explicit approval** — never auto-commits
- Uses conventional commit format: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`
- Only stages files that AI created or modified for this task — never unrelated changes
- No AI attribution in commit messages
- After commit: updates `current-feature.md` status and history, marks spec as complete

### `/autopilot bugfix` — Fix a Bug

```
Reproduce → Locate root cause → Write regression test → Fix → Run tests → Summarize
```

### `/autopilot refactor` — Refactor

```
Understand behavior → Run baseline tests → Plan → Apply incrementally → Verify tests → Summarize
```

## Project Structure

```
project-root/
├── AGENTS.md                 # AI agent rules and workflow
├── CLAUDE.md                 # Entry point (references AGENTS.md)
├── init.sh                   # Setup script
├── docs/
│   ├── project-overview.md   # Project context (tech stack, domain)
│   ├── coding-standards.md   # Code conventions
│   ├── current-feature.md    # Active spec tracker + history
│   └── specs/                # Feature/fix specs
└── .agents/
    └── skills/
        ├── autopilot/        # Core automation pipeline
        │   ├── SKILL.md
        │   └── actions/      # spec, run, analyze, plan, implement,
        │                     # summary, commit, bugfix, refactor, testgen
        ├── domain-driven-design/  # Laravel DDD architecture
        │   ├── SKILL.md
        │   ├── references/   # Architecture rules, template catalog
        │   └── templates/    # 13 PHP code templates
        ├── api-response/     # HTTP response standardization
        ├── cleanup/          # Housekeeping checks
        └── spect-writer/     # Project init
```

## Skills Reference

### autopilot
Core automation skill. Handles the full dev lifecycle from spec to commit.

### domain-driven-design
Laravel backend architecture with DDD layers:
- **Domain**: Entities, Actions, Events, Repository interfaces
- **Application**: UseCases, DTOs, EventHandlers
- **Infrastructure**: Models, Providers, Repository impls
- **Interfaces**: Controllers, Requests, Resources

### api-response
Standardized HTTP responses via `ApiResponse::success()`, `::problem()`, `::validation()`.

### cleanup
Housekeeping: unused imports, stale TODOs, orphaned files, env variable checks.

### spect-writer
Project initialization: generates `docs/project-overview.md` from user input.
