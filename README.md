# 0wg Studio DevKit

A curated Claude Code plugin marketplace — deep planning, research, image generation, frontend design, and workflow automation.

## Plugins

| Plugin | Description | Contents |
|--------|-------------|----------|
| **cc-research** | Scrape r/ClaudeCode for tips and techniques | 1 skill |
| **frontend-imitate** | Imitating a website is the sincerest form of flattery | 1 skill |
| **gemini** | Use Gemini 3 inside Claude Code! | 1 skill |
| **nano-banana** | Use Gemini Nano Banana to generate images | 1 skill |
| **ralph-heavy** | Ralph, with learning loops | 1 command |
| **plan-heavy** | Deep planning with Opus extended thinking | 1 command, 2 agents |

## Installation

### From Marketplace

```bash
# Add the wg-studio marketplace
/plugin marketplace add wg-studio-dev/wg-studio-devkit

# Install a plugin
/plugin install plan-heavy@wg-studio
```

### Local Development

```bash
git clone https://github.com/wg-studio-dev/wg-studio-devkit.git
cd wg-studio-devkit

/plugin marketplace add ./
/plugin install plan-heavy@wg-studio
```

## Quick Start

### Deep Planning with Opus

```bash
/plan-heavy
```

Two-phase workflow:
1. **Phase 1**: Product manager agent creates comprehensive `docs/prd.md`
2. **Approval**: You review and approve the PRD
3. **Phase 2**: Orchestrator agent creates `todo.md` with phased tasks

### Ralph with Learning Loops

```bash
/ralph-heavy
```

Disciplined execution loop with progress tracking, learnings persistence, and feature-by-feature delivery.

### Gemini Integration

```bash
# Access Gemini for alternative perspective
Ask Gemini to [your prompt]
```

Setup: Get an API key from [Google AI Studio](https://ai.google.dev), set `GEMINI_API_KEY` in `.env`.

### Frontend Imitation

Use the frontend-imitate skill to replicate design patterns from reference websites.

### Claude Code Research

Use the cc-research skill to fetch and analyze r/ClaudeCode discussions for tips and techniques.

### Image Generation

Use the nano-banana skill to generate images via Gemini Nano Banana.

## Plugin Structure

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
├── agents/                   # product-manager, orchestrator
├── commands/                 # plan-heavy, ralph-heavy
├── skills/                   # cc-research, frontend-imitate, gemini, nano-banana
├── docs/                     # Documentation
└── templates/                # Skill templates
```

## Configuration

### Environment Variables
- `GEMINI_API_KEY` - Required for Gemini and Nano Banana skills

## Documentation

- [Lazy Context Pattern](docs/lazy-context-pattern.md) - Context optimization guidelines
- [Skill Template](templates/lazy-skill-template.md) - Create new skills

## License

MIT License - See LICENSE for details

## Author

**Wilson Gramer**
- Website: [0wg.studio](https://0wg.studio)
- GitHub: [@wilsongramer](https://github.com/wilsongramer)
- Email: wilson@0wg.studio

---

Built with Claude Code
