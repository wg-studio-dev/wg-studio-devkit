# 0wg Studio DevKit

A comprehensive Claude Code plugin for studio development workflows with multi-agent orchestration, lazy-context pattern, and AI model integration.

## Features

### Multi-Agent Orchestration
- **Product Manager**: Creates comprehensive PRDs with ultra-thinking
- **Orchestrator**: Generates detailed execution plans with task dependencies
- **Architect**: System architecture and technical design
- **Frontend/Backend Principals**: Domain-specific leadership
- **Product Interviewer**: Refines MVP concepts through structured interviews
- **Program Manager**: Cross-functional coordination

### Workflow Automation Commands
- **Planning**: `/plan-lite` (Haiku), `/plan` (Sonnet), `/plan-heavy` (Opus) - PRD and execution plan generation
- **Specifications**: `/spec-lite` (Haiku), `/spec` (Sonnet), `/spec-heavy` (Opus) - Architecture and design specifications
- `/execute` - Parallel subagent execution with coordination
- `/product-interview` - MVP refinement interviews
- `/feature-driven-development` - FDD workflow automation
- `/skip-permissions` - Rapid development mode

### Advanced Skills
- **Gemini Integration**: Access Google Gemini for extended thinking and multimodal analysis
- **Frontend Design**: Create distinctive, production-grade interfaces
- **Frontend Imitate**: Adapt designs from references

### Lazy Context Pattern
Optimized for minimal context loading with references to detailed documentation. See [docs/lazy-context-pattern.md](docs/lazy-context-pattern.md).

## Installation

### From Marketplace

```bash
# Add the 0wg-studio marketplace
/plugin marketplace add wilsongramer/0wg_studio_devkit

# Install the plugin
/plugin install 0wg-studio-devkit@0wg-studio
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/wilsongramer/0wg_studio_devkit.git
cd 0wg_studio_devkit

# Add as local marketplace
/plugin marketplace add ./

# Install locally
/plugin install 0wg-studio-devkit@0wg-studio
```

## Quick Start

### 1. Product Planning Workflow

Choose the right planning command for your needs:

```bash
# Quick, cost-effective planning
/plan-lite

# Balanced planning with Sonnet
/plan

# Deep planning with extended thinking (Opus)
/plan-heavy

# Execute the plan with parallel agents
/execute
```

The plan commands:
1. **Phase 1**: Product manager reads `docs/` and creates comprehensive `docs/prd.md`
2. **Approval**: You review and approve the PRD
3. **Phase 2**: Orchestrator creates `todo.md` with phased tasks and assignments

Use `/plan-lite` for free-tier users or quick iterations, `/plan` for balanced projects, and `/plan-heavy` for mission-critical planning requiring deep analysis.

### 2. Frontend Design

```bash
# Use the frontend-design skill
Ask Claude to build a [component/page] using the frontend-design skill
```

Creates distinctive, production-grade interfaces avoiding generic AI aesthetics.

### 3. Gemini Integration

```bash
# Access Gemini for alternative perspective
Ask Gemini to [your prompt]
```

Setup:
1. Get API key from [Google AI Studio](https://ai.google.dev)
2. Create `.env` with `GEMINI_API_KEY=your-key-here`
3. Add `.env` to `.gitignore`

### 4. Product Interviews

```bash
# Refine MVP concept
/product-interview
```

## Plugin Structure

```
0wg_studio_devkit/
├── .claude-plugin/
│   ├── plugin.json           # Plugin metadata
│   └── marketplace.json      # Marketplace configuration
├── commands/                 # Slash commands
│   ├── plan-lite.md
│   ├── plan.md
│   ├── plan-heavy.md
│   ├── spec-lite.md
│   ├── spec.md
│   ├── spec-heavy.md
│   ├── execute.md
│   ├── product-interview.md
│   ├── feature-driven-development.md
│   └── skip-permissions.md
├── agents/                   # Agent definitions
│   ├── product-manager.md
│   ├── orchestrator.md
│   ├── architect.md
│   ├── frontend-principal.md
│   ├── backend-principal.md
│   ├── product-interviewer.md
│   ├── program-manager.md
│   └── agents.md            # Agent guidelines
├── skills/                   # Agent skills
│   ├── gemini/
│   ├── frontend-design/
│   └── frontend-imitate/
├── templates/                # Development templates
│   ├── lazy-skill-template.md
│   └── README.md
├── docs/                     # Documentation
│   ├── lazy-context-pattern.md
│   ├── tools-explanation.md
│   └── agent_chat.md
└── CLAUDE.md                 # Project instructions
```

## Configuration

### Environment Variables
- `GEMINI_API_KEY` - Required for Gemini skill

## Documentation

- [Lazy Context Pattern](docs/lazy-context-pattern.md) - Context optimization guidelines
- [Tools Explanation](docs/tools-explanation.md) - Available tools and usage
- [Agent Guidelines](agents/agents.md) - Agent coordination patterns
- [Skill Template](templates/lazy-skill-template.md) - Create new skills

## Advanced Usage

### Agent Coordination

Agents follow a structured workflow:
1. Read README and project context
2. Check `docs/agent_chat.md` for conflicts
3. Post plan with file claims
4. Research codebase
5. Execute changes
6. Run verification
7. Update documentation
8. Clear agent_chat entry

See [agents/agents.md](agents/agents.md) for details.

### Creating Custom Skills

Use the lazy skill template:

```bash
cp templates/lazy-skill-template.md skills/my-skill/SKILL.md
```

Edit following lazy-context principles:
- Keep SKILL.md concise
- Reference detailed docs when needed
- Load context only when required

## Development

### Testing Locally

```bash
# Create development marketplace
mkdir dev-marketplace
cd dev-marketplace
mkdir .claude-plugin

# Create marketplace.json pointing to your plugin
cat > .claude-plugin/marketplace.json << 'EOF'
{
  "name": "dev-test",
  "owner": {"name": "You"},
  "plugins": [{
    "name": "0wg-studio-devkit",
    "source": "../0wg_studio_devkit",
    "description": "Test plugin"
  }]
}
EOF

# Test in Claude Code
/plugin marketplace add ./dev-marketplace
/plugin install 0wg-studio-devkit@dev-test
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following lazy-context principles
4. Test locally
5. Submit pull request

## License

MIT License - See LICENSE for details

## Author

**Wilson Gramer**
- Website: [0wg.studio](https://0wg.studio)
- GitHub: [@wilsongramer](https://github.com/wilsongramer)
- Email: wilson@0wg.studio

## Support

- Issues: [GitHub Issues](https://github.com/wilsongramer/0wg_studio_devkit/issues)
- Documentation: [docs/](docs/)

## Keywords

agent-orchestration, product-management, frontend-design, lazy-context, gemini-integration, workflow-automation, multi-agent, studio-tools

---

Built with Claude Code 🤖
