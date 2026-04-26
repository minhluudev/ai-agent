@AGENTS.md

## Claude Code Specifics

- Follow the Context Loading Contract in AGENTS.md before starting any task.
- Use `docs/coding-standards.md` as the single source of truth for all rules — do not re-derive rules from skills or workflows.
- When running `/autopilot` commands, load the matching action file from `.agents/skills/autopilot/actions/` and respect its Prerequisites section before executing steps.
- Prefer concise responses. Use the Output Format from AGENTS.md; do not add extra sections.
- Do not create or modify files outside the task scope. If unsure whether a file is in scope, ask.
- When multiple agents (Claude Code, Codex, Cursor) work on the same repo, each agent should work on its own branch. Do not modify `docs/current-feature.md` if another agent may be using it concurrently.
