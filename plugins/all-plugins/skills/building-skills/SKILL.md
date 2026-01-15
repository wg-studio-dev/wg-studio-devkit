---
name: building-skills
description: >-
  Create and refine Claude Code skills following best practices. Generates SKILL.md files
  with proper structure, frontmatter, and workflow patterns. Use when creating new skills,
  improving existing skills, or asking how to structure a skill.
---

# Building Skills

Build Claude Code skills that actually work. Skills are modular instruction packages that transform Claude from general-purpose to domain-expert.

## Quick Start

When asked to create a skill:

1. **Clarify the domain** — What specific task or workflow does this skill address?
2. **Identify gaps** — What procedural knowledge does Claude lack for this task?
3. **Draft minimal SKILL.md** — Start lean, add only what Claude needs
4. **Test with fresh context** — Verify triggers and instructions work

## Required Structure

```
skill-name/
├── SKILL.md          # Main instructions (required)
├── scripts/          # Executable code (optional)
├── references/       # Documentation Claude loads (optional)
└── assets/           # Output files, templates (optional)
```

## SKILL.md Anatomy

### Frontmatter (YAML)

```yaml
---
name: processing-pdfs
description: >-
  Extract text and tables from PDF files, fill forms, merge documents.
  Use when working with PDF files or mentions of PDFs, forms, or document extraction.
---
```

**Rules:**
- `name`: Lowercase, hyphens only, max 64 chars. Prefer gerund form (analyzing-data, not data-analyzer)
- `description`: Third person. Include trigger phrases and synonyms. Max 1,024 chars

### Body (Markdown)

Keep under 500 lines. Challenge each line: "Does Claude need this instruction?"

## Writing Effective Descriptions

The description determines when the skill triggers. Vague descriptions = skill never triggers.

**Good:**
```yaml
description: >-
  Generate descriptive commit messages by analyzing git diffs. Use when user asks
  for help writing commit messages, creating commits, or reviewing changes.
```

**Bad:**
```yaml
description: Helps with git stuff.
```

**Checklist:**
- [ ] Third person voice?
- [ ] Specific trigger phrases included?
- [ ] Synonyms for discoverability?
- [ ] Action verbs describing capabilities?

## Degrees of Freedom

Match specificity to task fragility:

| Task Type | Freedom | Instruction Style |
|-----------|---------|-------------------|
| Code review | High | Guidelines, not rules |
| Report generation | Medium | Template with flexibility |
| Database migrations | Low | Exact steps, no deviation |

## Workflow Patterns

### Checklist Pattern
For multi-step workflows requiring validation:
```markdown
## Workflow
1. [ ] Validate input exists
2. [ ] Process data
3. [ ] Verify output
4. [ ] Report results
```

### Feedback Loop Pattern
For quality-critical tasks:
```markdown
1. Make changes
2. Validate immediately
3. Review errors
4. Fix and revalidate
5. Proceed only when clean
```

### Conditional Pattern
For branching workflows:
```markdown
**Creating new?** → Follow Section A
**Editing existing?** → Follow Section B
```

## Anti-Patterns to Avoid

| Avoid | Why | Fix |
|-------|-----|-----|
| Vague descriptions | Never triggers | Add specific triggers |
| Deep reference nesting | Partial-read fails | One level deep max |
| Windows backslash paths | Breaks on Unix | Use forward slashes |
| Multiple options, no default | Confusion | Default + escape hatch |
| Over-explanation | Token waste | Claude is intelligent |
| Inconsistent terminology | Confusion | Pick one term, use it |

## Creating a New Skill

When user requests a skill:

1. **Ask:** What specific task or workflow?
2. **Ask:** What does Claude currently get wrong or miss?
3. **Draft:** Create minimal SKILL.md addressing gaps
4. **Structure:**
   - Frontmatter with descriptive triggers
   - Quick start section
   - Core workflow
   - Only necessary details
5. **Review:** Does every line earn its place?

Use the template at `assets/skill-template.md` as a starting point.

## Advanced Features

For comprehensive guidance on these topics, see `references/best-practices.md`:
- Script bundling and execution
- Reference file organization
- Robot mode / machine-readable output
- Exit code standardization
- Iteration protocols
- The "Exact Prompt" pattern

## Testing Checklist

Before finalizing any skill:

- [ ] Description triggers on expected user phrases
- [ ] Description does NOT trigger on unrelated requests
- [ ] Instructions are model-appropriate (not over-explained for Opus, not under-explained for Haiku)
- [ ] All paths use forward slashes
- [ ] References are one level deep maximum
- [ ] Every instruction line earns its place
