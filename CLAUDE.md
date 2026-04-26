# Dev

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

@AGENTS.md

## Claude Code Specifics

- Follow the Context Loading Contract in AGENTS.md before starting any task.
- Use `docs/coding-standards.md` for general rules. Skills may add domain-specific rules; workflows route work and define gates.
- When running `/autopilot` or `/spect-writer` commands, load the matching action file from `.agents/skills/` and respect its Prerequisites section before executing steps.
- Prefer concise responses. Use the Output Format from AGENTS.md; do not add extra sections.
- Do not create or modify files outside the task scope. If unsure whether a file is in scope, ask.
- When multiple agents (Claude Code, Codex, Cursor) work on the same repo, each agent must use its own git worktree and branch. Treat `docs/current-feature.md` as branch-local state; when concurrency is possible, run from an explicit spec path instead of relying on the active pointer.
- **IMPORTANT:** Do not add Claude to any commit messages.
