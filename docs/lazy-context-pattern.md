# Lazy Context Pattern

A convention for managing Claude Code context efficiently by keeping frequently-loaded files minimal and referencing detailed documentation only when needed.

## The Problem

Claude Code loads certain files into context automatically:
- **CLAUDE.md** - loaded in every conversation
- **SKILL.md files** - loaded when skills are referenced
- **Common slash commands** - loaded when invoked

Loading heavy documentation in these files wastes tokens and degrades performance. Most detailed docs aren't needed for every task.

## The Solution: Lazy Context

Keep frequently-loaded files lean with pointers to detailed docs. Claude reads referenced files on-demand, only when needed for the current task.

**Benefits:**
- Saves thousands of tokens per conversation
- Faster response times
- Stays under context limits
- More focused, relevant context
- Better Claude performance

## Token Economics

**Example savings:**
- Bloated SKILL.md (30KB) = ~7,500 tokens
- Lean SKILL.md (3KB) = ~750 tokens
- **Savings: 6,750 tokens per use**

For CLAUDE.md (loaded every conversation):
- Bloated (500 lines) = ~10,000 tokens
- Lean (50 lines) = ~1,000 tokens
- **Savings: 9,000 tokens × every conversation**

Over 1000 conversations: ~9M tokens saved = $27 + better performance

## Implementation Guide

### Files That Should Be Lean

**Always keep minimal:**
- `CLAUDE.md` - Project instructions
- `.claude/skills/*/SKILL.md` - Skill definitions
- Common slash commands in `.claude/commands/`
- Frequently-used agent prompts

**Can be detailed:**
- `README.md` - For human readers
- `docs/*.md` - Reference documentation
- Architecture guides
- API specifications
- Rarely-used slash commands

### Pattern Template

#### Before (Eager Context - Bad)
```markdown
# CLAUDE.md

## API Conventions

All API endpoints follow REST principles...
[300 lines of detailed API documentation]

## Database Schema

Users table:
- id: primary key
- email: unique, not null
[200 lines of schema details]

## Deployment Process

1. Run tests with `npm test`
[150 lines of deployment steps]
```

**Problems:**
- 650 lines loaded every conversation
- ~16,000 tokens wasted
- Most isn't relevant to current task

#### After (Lazy Context - Good)
```markdown
# CLAUDE.md

## Project Context

This is a React/Node.js task management app.

## Reference Documentation

For detailed information, read these files only when needed:
- API conventions: `docs/api-guide.md`
- Database schema: `docs/schema.md`
- Deployment: `docs/deployment-guide.md`

Only load these files when they're relevant to your current task.
```

**Benefits:**
- ~50 lines in CLAUDE.md
- ~1,000 tokens
- Details available on-demand

### SKILL.md Example

#### Before (Eager - 596 lines)
```markdown
# Gemini Skill

[Detailed API documentation]
[Code examples for every use case]
[Complete pricing breakdown]
[Troubleshooting guide]
[Best practices]
[Error handling patterns]
[Advanced features]
```

#### After (Lazy - 90 lines)
```markdown
# Gemini Skill

Send prompts to Google Gemini API from Claude Code.

## Quick Start
1. Get API key from [Google AI Studio](https://ai.google.dev)
2. Create `.env` with GEMINI_API_KEY
3. Use the skill

## Setup & Usage
[Brief essential info only]

## Resources
- Full docs: See README.md in this directory
- API docs: https://ai.google.dev/gemini-api/docs
```

### Writing Lazy Context Files

**Good practices:**

1. **Start with essentials only**
   - What is it?
   - How do I set it up? (minimal steps)
   - How do I use it? (basic examples)

2. **Use clear references**
   ```markdown
   For detailed deployment steps, read `docs/deployment.md`
   ```
   Not vague like "see other docs" - be specific.

3. **Add explicit instructions**
   ```markdown
   Only read the referenced files when they're relevant to your current task.
   ```

4. **Group related references**
   ```markdown
   ## Backend Documentation
   - API design: `docs/api-guide.md`
   - Database: `docs/schema.md`
   - Authentication: `docs/auth-guide.md`
   ```

5. **Keep the most-used info inline**
   If something is needed in 90% of tasks, inline it. If it's niche, reference it.

### Anti-Patterns (Don't Do This)

❌ **Inlining everything**
```markdown
# CLAUDE.md
[Entire codebase architecture]
[Complete API documentation]
[Full database schema]
```

❌ **Vague references**
```markdown
See the docs for more info
```
Where? Which docs?

❌ **Over-referencing trivial info**
```markdown
For the project name, read `docs/project-name.md`
```
Just inline trivial info.

❌ **No guidance on when to load**
```markdown
Related docs: api.md, schema.md, deploy.md, testing.md, ...
```
When should Claude read these? Unclear.

## Applying to New Workflows/Agents

When creating new agents or slash commands:

1. **Start lean** - Write the minimal prompt/instructions
2. **Identify heavy sections** - What's detailed but not always needed?
3. **Extract to docs** - Move heavy content to `docs/` or separate files
4. **Add references** - Point to the extracted docs with clear context
5. **Test** - Does the agent still work? Can it find info when needed?

### Agent Example

```markdown
# .claude/agents/api-reviewer.md

You are an API code reviewer. Review API endpoints for:
- REST conventions
- Error handling
- Security issues

For detailed API conventions, read `docs/api-guide.md` when reviewing endpoints.
For security checklist, read `docs/security-checklist.md` when you spot potential issues.
```

### Slash Command Example

```markdown
# .claude/commands/deploy.md

Deploy the application to production.

Steps:
1. Run tests: `npm test`
2. Build: `npm run build`
3. Deploy: `npm run deploy`

For troubleshooting deployment issues, read `docs/deployment-guide.md`
```

## When NOT to Use Lazy Context

**Don't over-optimize:**
- One-off docs (only read once anyway)
- Already-short files (<100 lines)
- Critical info needed in 90%+ of tasks
- Simple projects with minimal docs

**Use judgment:**
If a file is already lean and frequently needed, keep it inline. Don't create artificial indirection for tiny files.

## Meta Note

Yes, we're practicing what we preach here. This detailed pattern guide lives in `docs/` and is referenced from CLAUDE.md with a brief pointer. CLAUDE.md stays lean, this doc gets loaded only when you need to understand or apply lazy context.

Ironic? No. Consistent.

## Quick Reference

**Keep lean (frequently loaded):**
- CLAUDE.md
- SKILL.md files
- Common slash commands
- Agent prompts used often

**Can be detailed (loaded on-demand):**
- README.md
- docs/ directory
- Rare slash commands
- Reference guides

**When creating new files:**
1. Is this loaded automatically/frequently? → Keep it minimal with references
2. Is this read on-demand by humans or Claude? → Can be detailed
3. When in doubt → Start lean, expand if needed

---

*Pattern discovered independently by Wilson, 2025-12-09*
*Formalized as "Lazy Context" for Claude Code ecosystem*
