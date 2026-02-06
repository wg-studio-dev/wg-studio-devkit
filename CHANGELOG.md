# Changelog

All notable changes to the 0wg Studio DevKit plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-12

### Added
- Initial plugin release for Claude Code marketplace
- Multi-agent orchestration system with 7 specialized agents:
  - Product Manager: PRD creation with ultra-thinking
  - Project Manager: Task delegation across developer agents (renamed from Orchestrator)
  - Architect: System architecture and technical design
  - Frontend Principal: Frontend architecture leadership
  - Backend Principal: Backend architecture leadership
  - Product Interviewer: MVP refinement through interviews
  - Program Manager: Cross-functional coordination
- 6 workflow automation commands:
  - `/plan` - Two-phase PRD and execution plan generation
  - `/execute` - Parallel subagent execution with coordination
  - `/product-interview` - Conduct MVP refinement interviews
  - `/spec` - Create detailed specifications
  - `/feature-driven-development` - FDD workflow automation
  - `/skip-permissions` - Rapid development mode
- 3 advanced skills:
  - `gemini` - Google Gemini API integration for extended thinking
  - `frontend-design` - Distinctive, production-grade interface creation
  - `frontend-imitate` - Design adaptation from references
- Lazy-context pattern for optimized context loading
- Development templates for creating new skills
- Comprehensive documentation:
  - README.md with quick start guide
  - CHANGELOG.md for version tracking
  - LICENSE for MIT licensing
  - docs/lazy-context-pattern.md for context optimization
  - docs/tools-explanation.md for available tools
  - agents/agents.md for coordination guidelines
- Plugin marketplace configuration
- Standard plugin directory structure

### Changed
- Renamed Orchestrator agent to Project Manager for clarity
- Reorganized `.claude/` folder to match Claude Code plugin standards
- Created root-level directories: `commands/`, `agents/`, `skills/`, `templates/`
- Updated agent coordination to focus on task delegation across developer agents

### Technical
- Plugin metadata in `.claude-plugin/plugin.json`
- Marketplace configuration in `.claude-plugin/marketplace.json`
- MIT License
- GitHub repository: wilsongramer/0wg_studio_devkit

## [2.0.0] - 2026-02-06

### Changed
- **BREAKING**: Reduced marketplace from 11 plugins to 6 focused plugins
- Restructured as a curated toolkit instead of a monolithic bundle

### Added
- **plan-heavy** plugin: Deep planning with Opus extended thinking (self-contained with product-manager and orchestrator agents)
- Populated **cc-research** plugin with full skill implementation (SKILL.md, README.md, fetch_cc_reddit.py)
- Populated **nano-banana** plugin with full skill implementation (TypeScript source, build artifacts, config)

### Removed
- **all-plugins** bundle (install plugins individually now)
- **dev-team** plugin (7 agents)
- **builder-commands** plugin (6 commands)
- **designer** plugin
- **pmm-plugins** plugin
- **building-skills** plugin
- Root agents: agents.md, architect.md, backend-principal.md, designer.md, frontend-principal.md, product-interviewer.md, program-manager.md, project-manager.md
- Root commands: cc-research.md, execute.md, feature-driven-development.md, new-project.md, plan-lite.md, plan.md, product-interview.md, release-notes.md, skip-permissions.md, spec-heavy.md, spec-lite.md, spec-persona.md, spec.md
- Root skills: auth-builder, frontend-design

## [Unreleased]

---

## Release Notes Format

Each release documents:
- **Added**: New features, commands, agents, or skills
- **Changed**: Changes to existing functionality
- **Deprecated**: Features marked for removal in future versions
- **Removed**: Features removed in this version
- **Fixed**: Bug fixes
- **Security**: Security improvements or vulnerability fixes
- **Technical**: Implementation details and infrastructure changes

## Version Numbering

This plugin follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version: Incompatible API changes or significant restructuring
- **MINOR** version: New functionality in a backward-compatible manner
- **PATCH** version: Backward-compatible bug fixes

## Contributing

See our [contributing guidelines](CONTRIBUTING.md) for information on how to propose changes and contribute to this project.
