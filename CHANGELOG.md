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

## [Unreleased]

### Planned
- Additional workflow commands for common development tasks
- More specialized agents for testing, DevOps, and documentation
- Enhanced Gemini integration with streaming support
- Additional frontend skills for accessibility and performance
- Example projects demonstrating plugin usage
- Video tutorials and documentation site

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
