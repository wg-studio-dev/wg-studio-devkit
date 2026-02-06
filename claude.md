# *Instructions that Claude Code will always follow.*

## Project Overview

This is the **wg-studio DevKit** - a Claude Code plugin marketplace published at:
- **Repository**: https://github.com/wg-studio-dev/wg-studio-devkit
- **Organization**: wg-studio-dev
- **Marketplace**: `wg-studio`

### Published Plugins

This repository contains **6 modular plugins**:

1. **cc-research** - Scrape r/ClaudeCode for tips and techniques (1 skill)
2. **frontend-imitate** - Imitating a website is the sincerest form of flattery (1 skill)
3. **gemini** - Use Gemini 3 inside Claude Code! (1 skill)
4. **nano-banana** - Use Gemini Nano Banana to generate images (1 skill)
5. **ralph-heavy** - Ralph, with learning loops (1 command)
6. **plan-heavy** - Deep planning with Opus extended thinking (1 command, 2 agents)

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
│   ├── plugin.json           # Root plugin metadata
│   └── marketplace.json      # Marketplace with 6 plugins
├── plugins/
│   ├── cc-research/          # Reddit research skill
│   ├── frontend-imitate/     # Website imitation skill
│   ├── gemini/               # Gemini integration skill
│   ├── nano-banana/          # Image generation skill
│   ├── ralph-heavy/          # Ralph with learning loops
│   └── plan-heavy/           # Deep planning (command + agents)
├── agents/                   # Root-level agents (product-manager, orchestrator)
├── commands/                 # Root-level commands (plan-heavy, ralph-heavy)
├── skills/                   # Root-level skills (cc-research, frontend-imitate, gemini, nano-banana)
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

<!-- BEGIN FLOW-NEXT -->
## Flow-Next

This project uses Flow-Next for task tracking. Use `.flow/bin/flowctl` instead of markdown TODOs or TodoWrite.

**Quick commands:**
```bash
.flow/bin/flowctl list                # List all epics + tasks
.flow/bin/flowctl epics               # List all epics
.flow/bin/flowctl tasks --epic fn-N   # List tasks for epic
.flow/bin/flowctl ready --epic fn-N   # What's ready
.flow/bin/flowctl show fn-N.M         # View task
.flow/bin/flowctl start fn-N.M        # Claim task
.flow/bin/flowctl done fn-N.M --summary-file s.md --evidence-json e.json
```

**Rules:**
- Use `.flow/bin/flowctl` for ALL task tracking
- Do NOT create markdown TODOs or use TodoWrite
- Re-anchor (re-read spec + status) before every task

**More info:** `.flow/bin/flowctl --help` or read `.flow/usage.md`
<!-- END FLOW-NEXT -->