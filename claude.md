# *Instructions that Claude Code will always follow.*

## Project Overview

This is the **wg-studio DevKit** - a Claude Code plugin marketplace published at:
- **Repository**: https://github.com/wg-studio-dev/wg-studio-devkit
- **Organization**: wg-studio-dev
- **Marketplace**: `wg-studio`

### Published Plugins

This repository contains **4 modular plugins**:

1. **dev-team** - Software developer team in a box (7 agents)
2. **builder-commands** - Specs, plans, and builds your project (6 commands)
3. **gemini** - Use Gemini 3 inside Claude Code! (1 skill)
4. **frontend-imitate** - Imitating a website is the sincerest form of flattery (1 skill)

Users install with: `/plugin marketplace add wg-studio-dev/wg-studio-devkit`

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

## Plugin Development & Publishing

### Directory Structure

```
wg-studio-devkit/
├── .claude-plugin/
│   ├── plugin.json           # Main plugin metadata (legacy)
│   └── marketplace.json      # Marketplace with all 4 plugins
├── plugins/
│   ├── dev-team/
│   │   ├── .claude-plugin/plugin.json
│   │   └── agents/
│   ├── builder-commands/
│   │   ├── .claude-plugin/plugin.json
│   │   └── commands/
│   ├── gemini/
│   │   ├── .claude-plugin/plugin.json
│   │   └── skills/gemini/
│   └── frontend-imitate/
│       ├── .claude-plugin/plugin.json
│       └── skills/frontend-imitate/
├── agents/                   # Root-level copies
├── commands/                 # Root-level copies
├── skills/                   # Root-level copies
└── docs/                     # Documentation
```

### Publishing Workflow

1. **Make changes** to plugins in `plugins/` directory
2. **Update version** in respective `plugin.json` files
3. **Commit and push** to GitHub
4. Users get updates via `/plugin marketplace update wg-studio`

### Adding New Plugins

To add a new plugin to the marketplace:

1. Create `plugins/new-plugin/.claude-plugin/plugin.json`
2. Add plugin content (agents/, commands/, skills/)
3. Update `.claude-plugin/marketplace.json` with new plugin entry
4. Commit and push

### Personal Global Install

All plugins are also copied to `~/.claude/` for personal global use across all projects.