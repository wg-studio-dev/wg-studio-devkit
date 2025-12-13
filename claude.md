# *Instructions that Claude Code will always follow.*

You can enter coding preferences, project overview, next steps, anything you want Claude Code to stay aware of throughout the project.

## Context Management

This project uses **lazy context** - keep frequently-loaded files minimal with references to detailed docs.

**Files that should be lean:**
- CLAUDE.md (this file)
- skills/*/SKILL.md
- Common slash commands

**When creating new workflows/agents:**
- Keep initial prompts concise
- Reference detailed docs when needed (e.g., "For API conventions, read docs/api-guide.md")
- Only load context when required for the task

See [docs/lazy-context-pattern.md](docs/lazy-context-pattern.md) for detailed guidelines.
(and yes, we're using lazy-context in pracitce to help claude learn about "lazy context" as a concept. See what I did there? - WG)

**When creating new skills:** Use [templates/lazy-skill-template.md](templates/lazy-skill-template.md) as a starting point.

## Available AI Models

You can generate code from multiple AI providers:
- **Anthropic models** (default) - Claude Sonnet/Opus/Haiku
- **Gemini 3** - Use the Gemini skill installed in this project for alternative perspective or extended thinking