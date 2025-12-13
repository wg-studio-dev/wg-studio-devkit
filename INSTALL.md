# Installation Guide

Quick guide to install the 0wg Studio DevKit plugin for Claude Code.

## Prerequisites

- Claude Code CLI installed and configured
- Git (for cloning the repository)
- GitHub account (for publishing to marketplace)

## Installation Methods

### Method 1: From Marketplace (Recommended)

Once published to GitHub:

```bash
# Add the 0wg-studio marketplace
/plugin marketplace add wilsongramer/0wg_studio_devkit

# Install the plugin
/plugin install 0wg-studio-devkit@0wg-studio
```

### Method 2: Local Installation

For development or testing:

```bash
# Clone the repository
git clone https://github.com/wilsongramer/0wg_studio_devkit.git
cd 0wg_studio_devkit

# Add as local marketplace
/plugin marketplace add ./

# Install locally
/plugin install 0wg-studio-devkit@0wg-studio
```

### Method 3: Direct .claude Folder Copy

Your project files have already been copied to `~/.claude/`:
- Commands: `~/.claude/commands/`
- Agents: `~/.claude/agents/`
- Skills: `~/.claude/skills/`

These are now available globally in all your Claude Code projects!

## Post-Installation Setup

### 1. Configure Gemini (Optional)

If you want to use the Gemini skill:

```bash
# Get API key from https://ai.google.dev
# Create .env in your project root
echo "GEMINI_API_KEY=your-api-key-here" > .env

# Add to .gitignore
echo ".env" >> .gitignore
```

### 2. Verify Installation

Test that commands are available:

```bash
# List available commands
/help

# You should see:
# - /plan
# - /execute
# - /product-interview
# - /spec
# - /feature-driven-development
# - /skip-permissions
```

### 3. Test a Command

```bash
# Create a simple test
/plan
```

## Available Components

### Commands (6)
- `/plan` - Generate PRD and execution plan
- `/execute` - Execute todo.md with parallel agents
- `/product-interview` - Conduct MVP interviews
- `/spec` - Create detailed specifications
- `/feature-driven-development` - FDD workflow
- `/skip-permissions` - Rapid development mode

### Agents (7)
- `product-manager` - PRD creation
- `project-manager` - Task delegation (formerly orchestrator)
- `architect` - System architecture
- `frontend-principal` - Frontend leadership
- `backend-principal` - Backend leadership
- `product-interviewer` - MVP refinement
- `program-manager` - Program coordination

### Skills (3)
- `gemini` - Google Gemini integration
- `frontend-design` - Distinctive UI creation
- `frontend-imitate` - Design adaptation

## Troubleshooting

### Commands Not Found

If commands aren't available after installation:

```bash
# Reload Claude Code
exit
claude

# Or restart your terminal
```

### Gemini Skill Issues

```bash
# Check .env file exists
cat .env

# Verify API key format
# Should start with: AIzaSy...

# Test the skill
Ask Gemini to explain quantum computing
```

### Plugin Not Loading

```bash
# List installed plugins
/plugin list

# Check marketplace
/plugin marketplace list

# Reinstall if needed
/plugin uninstall 0wg-studio-devkit@0wg-studio
/plugin install 0wg-studio-devkit@0wg-studio
```

## Updating

### Update from Marketplace

```bash
# Update to latest version
/plugin update 0wg-studio-devkit@0wg-studio
```

### Update Local Installation

```bash
cd /path/to/0wg_studio_devkit
git pull origin main

# Reinstall
/plugin uninstall 0wg-studio-devkit@0wg-studio
/plugin install 0wg-studio-devkit@0wg-studio
```

## Uninstallation

### Remove Plugin

```bash
/plugin uninstall 0wg-studio-devkit@0wg-studio
```

### Remove from Global .claude

If you copied files to `~/.claude/`:

```bash
# Remove commands
rm ~/.claude/commands/plan.md
rm ~/.claude/commands/execute.md
rm ~/.claude/commands/product-interview.md
rm ~/.claude/commands/spec.md
rm ~/.claude/commands/feature-driven-development.md
rm ~/.claude/commands/skip-permissions.md

# Remove agents
rm ~/.claude/agents/project-manager.md
rm ~/.claude/agents/product-manager.md
rm ~/.claude/agents/product-interviewer.md
rm ~/.claude/agents/architect.md
rm ~/.claude/agents/frontend-principal.md
rm ~/.claude/agents/backend-principal.md
rm ~/.claude/agents/program-manager.md

# Remove skills
rm -rf ~/.claude/skills/gemini
rm -rf ~/.claude/skills/frontend-design
rm -rf ~/.claude/skills/frontend-imitate
```

## Next Steps

After installation:

1. Read [README.md](README.md) for feature overview
2. Try the [Quick Start](README.md#quick-start) guide
3. Check [docs/lazy-context-pattern.md](docs/lazy-context-pattern.md) to understand the pattern
4. Explore [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## Support

- Issues: [GitHub Issues](https://github.com/wilsongramer/0wg_studio_devkit/issues)
- Email: wilson@0wg.studio
- Documentation: [docs/](docs/)

---

Happy building! 🚀
