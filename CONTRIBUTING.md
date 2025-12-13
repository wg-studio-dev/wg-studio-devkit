# Contributing to 0wg Studio DevKit

Thank you for your interest in contributing to the 0wg Studio DevKit! This document provides guidelines for contributing to this Claude Code plugin.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check [existing issues](https://github.com/wilsongramer/0wg_studio_devkit/issues) to avoid duplicates
2. Create a new issue with:
   - Clear, descriptive title
   - Detailed description of the problem or feature
   - Steps to reproduce (for bugs)
   - Expected vs. actual behavior
   - Claude Code version
   - Relevant error messages or logs

### Suggesting New Features

We welcome feature suggestions! When proposing a new feature:

1. Explain the use case and problem it solves
2. Describe the proposed solution
3. Consider alternatives you've thought about
4. Discuss potential impact on existing functionality

## Development Setup

### Prerequisites

- Claude Code CLI installed
- Git for version control
- Text editor or IDE

### Local Development

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/0wg_studio_devkit.git
   cd 0wg_studio_devkit
   ```

2. **Create Development Marketplace**
   ```bash
   mkdir ../dev-marketplace
   cd ../dev-marketplace
   mkdir .claude-plugin

   cat > .claude-plugin/marketplace.json << 'EOF'
   {
     "name": "dev-test",
     "owner": {"name": "Developer"},
     "plugins": [{
       "name": "0wg-studio-devkit",
       "source": "../0wg_studio_devkit",
       "description": "Development version"
     }]
   }
   EOF
   ```

3. **Install Locally**
   ```bash
   /plugin marketplace add ./dev-marketplace
   /plugin install 0wg-studio-devkit@dev-test
   ```

4. **Make Changes**
   - Edit files in your local clone
   - Changes are immediately available (reload Claude Code if needed)

5. **Test Your Changes**
   - Test commands: Try your modified slash commands
   - Test agents: Invoke modified agents
   - Test skills: Use modified skills
   - Verify no regressions in existing functionality

## Contribution Guidelines

### Code Style

- **Markdown formatting**: Use consistent heading levels, bullet points, and code blocks
- **Agent definitions**: Follow the structure in existing agent files
- **Command files**: Include frontmatter with name, description, and argument-hint
- **Skill files**: Follow the lazy-skill-template.md structure

### Lazy-Context Pattern

This project uses the lazy-context pattern. When contributing:

- **Keep files concise**: Frequently-loaded files should be minimal
- **Reference detailed docs**: Link to comprehensive documentation instead of embedding it
- **Load context conditionally**: Only load heavy documentation when needed
- See [docs/lazy-context-pattern.md](docs/lazy-context-pattern.md) for details

### Adding New Commands

1. Create `commands/your-command.md` with frontmatter:
   ```markdown
   ---
   name: your-command
   description: Brief description
   argument-hint: "[optional: hints]"
   ---

   # /your-command - Title

   Detailed description and usage...
   ```

2. Update `.claude-plugin/plugin.json` to include the new command

3. Test the command thoroughly

4. Document in README.md if it's a major feature

### Adding New Agents

1. Create `agents/your-agent.md` following this structure:
   - Clear role and responsibilities
   - Expertise areas
   - Approach and methodology
   - Decision framework
   - Communication style

2. Update `.claude-plugin/plugin.json` to include the new agent

3. Consider agent coordination in `agents/agents.md`

4. Test agent behavior in various scenarios

### Adding New Skills

1. Use `templates/lazy-skill-template.md` as starting point

2. Create `skills/your-skill/SKILL.md` with:
   - Frontmatter with name, description, license
   - Quick start guide
   - Usage examples
   - Configuration requirements

3. Keep SKILL.md concise, link to detailed docs if needed

4. Update `.claude-plugin/plugin.json`

5. Test skill functionality

### Documentation

When changing functionality:

- Update README.md for user-facing changes
- Update CHANGELOG.md following Keep a Changelog format
- Update relevant docs/ files
- Add inline documentation where helpful

## Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow contribution guidelines above
   - Keep commits focused and atomic
   - Write clear commit messages

3. **Test Thoroughly**
   - Test all modified functionality
   - Verify no regressions
   - Test in a fresh Claude Code session

4. **Update Documentation**
   - Update CHANGELOG.md under [Unreleased]
   - Update README.md if needed
   - Add/update relevant docs

5. **Submit Pull Request**
   - Clear title describing the change
   - Detailed description of what and why
   - Reference any related issues
   - List testing performed
   - Screenshots if UI-related

6. **Code Review**
   - Respond to feedback promptly
   - Make requested changes
   - Keep discussion constructive

7. **Merge**
   - Maintainer will merge when approved
   - Delete your feature branch after merge

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
Add: New feature description
Fix: Bug fix description
Update: Change to existing feature
Docs: Documentation changes
Refactor: Code restructuring
Test: Testing changes
```

Examples:
- `Add: /debug-context command for troubleshooting`
- `Fix: Gemini skill API key validation`
- `Update: Project Manager agent task delegation`
- `Docs: Add examples to lazy-context-pattern.md`

## Release Process

For maintainers:

1. Update version in `.claude-plugin/plugin.json`
2. Move [Unreleased] changes in CHANGELOG.md to new version section
3. Update README.md if needed
4. Create git tag: `git tag -a v1.1.0 -m "Release v1.1.0"`
5. Push with tags: `git push origin main --tags`
6. Create GitHub release with changelog

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Unprofessional conduct

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to wilson@0wg.studio

## Questions?

- Open an issue for questions about contributing
- Email wilson@0wg.studio for private concerns
- Check [README.md](README.md) for general usage questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to 0wg Studio DevKit! 🎉
