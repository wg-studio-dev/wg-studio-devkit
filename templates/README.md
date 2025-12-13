# Claude Code Templates

This directory contains reusable templates for creating new Claude Code components following project conventions.

## Available Templates

### lazy-skill-template.md
Template for creating new Agent Skills that follow the lazy context pattern.

**Usage:**
```bash
mkdir -p .claude/skills/new-skill
cp .claude/templates/lazy-skill-template.md .claude/skills/new-skill/SKILL.md
```

Then customize the SKILL.md file with your skill's details.

**Key principles:**
- Keep SKILL.md under ~100 lines
- Put detailed docs in README.md
- Follow lazy context pattern (minimal, with references)

## Creating New Templates

When adding new templates:
1. Follow the lazy context pattern
2. Include clear inline comments/instructions
3. Document the template in this README
4. Keep templates practical and battle-tested

## Resources

- Lazy context pattern: [docs/lazy-context-pattern.md](../../docs/lazy-context-pattern.md)
- Claude Code docs: https://code.claude.com/docs
