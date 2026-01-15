# Skill Best Practices Reference

Advanced patterns and detailed guidance for skill authors.

## Table of Contents
1. [Bundled Resources](#bundled-resources)
2. [Script Best Practices](#script-best-practices)
3. [Reference File Organization](#reference-file-organization)
4. [Advanced Workflow Patterns](#advanced-workflow-patterns)
5. [Security and Permissions](#security-and-permissions)
6. [Skill Archetypes](#skill-archetypes)
7. [Machine-Readable Output](#machine-readable-output)

---

## Bundled Resources

### scripts/ Directory
Use when code gets rewritten repeatedly or reliability is critical.

**Benefits:**
- Token efficient (not regenerated each time)
- Deterministic behavior
- Consistent across invocations

**In SKILL.md, distinguish:**
- **Execution** (common): "Run `scripts/validate.py`"
- **Reference** (rare): "See `scripts/validate.py` for implementation details"

### references/ Directory
Documentation Claude loads while working.

**Guidelines:**
- Organize by domain or feature
- Include table of contents for files >10,000 words
- One level deep maximum (SKILL.md → reference.md, never → another.md)

### assets/ Directory
Files used in output, not loaded into context.
- Templates Claude modifies
- Sample outputs
- Configuration files

---

## Script Best Practices

### Path Portability
```bash
# Good - portable
{baseDir}/scripts/validate.py

# Bad - hardcoded
/Users/alice/skills/pdf/scripts/validate.py
```

### Exit Code Standardization
Define consistent codes for automation:

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid input |
| 3 | Not found |
| 4 | Permission denied |
| 5 | Timeout |

### Error Handling
Handle errors explicitly in scripts. Do not defer error handling to Claude—it's unreliable.

---

## Reference File Organization

### Simple Skill
```
skill/
├── SKILL.md
└── scripts/
```

### Medium Skill
```
skill/
├── SKILL.md           # Overview + pointers
├── scripts/
└── references/
    ├── workflows.md
    └── troubleshooting.md
```

### Complex Skill
```
skill/
├── SKILL.md           # Domain selection
├── scripts/           # Unified
└── references/
    ├── domain-a.md
    ├── domain-b.md
    └── domain-c.md
```

---

## Advanced Workflow Patterns

### The "Exact Prompt" Pattern
Encode reproducible prompts in ALL-CAPS for agent-to-agent handoff:

```markdown
## THE EXACT PROMPT
ANALYZE THE FOLLOWING CODE FOR SECURITY VULNERABILITIES. FOR EACH
VULNERABILITY FOUND, PROVIDE: (1) LOCATION, (2) SEVERITY, (3) FIX.
```

**Benefits:** Copy-paste ready, automation-friendly, unambiguous

### "Why This Exists" Section
Front-load motivation before instructions:

```markdown
## Why This Exists
Teams waste hours debugging intermittent test failures caused by shared
state between test runs. This skill enforces isolation patterns.

## Instructions
...
```

### Iteration Protocol
For refinement workflows, specify iteration counts:

```markdown
## Review Process
Iterate up to 3 times until:
- All tests pass
- No linting errors
- Coverage meets threshold

If not converged after 3 iterations, report blockers.
```

### ASCII State Diagrams
Visualize complex workflows:

```
┌─────────┐    pass    ┌─────────┐
│  Draft  │ ─────────► │ Review  │
└─────────┘            └─────────┘
     │                      │
     │ fail                 │ approve
     ▼                      ▼
┌─────────┐            ┌─────────┐
│  Fix    │            │  Ship   │
└─────────┘            └─────────┘
```

---

## Security and Permissions

### Tool Scoping
Apply principle of least privilege:

```yaml
allowed-tools: Read,Write,Bash(git:*)
```

Only include tools necessary for the skill's function.

### Risk Tiering
For safety/security skills, classify actions:

| Tier | Actions | Approval |
|------|---------|----------|
| Safe | Read, List | Auto-execute |
| Moderate | Write to project | Confirm once |
| Dangerous | Delete, Force push | Always confirm |

---

## Skill Archetypes

### CLI Reference Skill
Structure: Authentication → Core Operations → Common Workflows

```markdown
## Authentication
`tool auth login`

## Core Operations
### List resources
`tool list [options]`

### Create resource
`tool create <name> [options]`

## Common Workflows
### Deploy to production
1. `tool build`
2. `tool test`
3. `tool deploy --env prod`
```

### Methodology Skill
Structure: Philosophy → Why It Matters → Exact Prompt → Examples

```markdown
## Core Philosophy
[What this methodology achieves]

## Why It Matters
[Problems it solves]

## THE EXACT PROMPT
[Reproducible instructions in ALL-CAPS]

## Before/After Examples
[Concrete demonstrations]
```

### Safety Tool Skill
Structure: Purpose → Principles → Allow/Block Rules → Security Notes

### Orchestration Tool Skill
Structure: Purpose → Quick Start → Commands → Robot Mode → Integrations

---

## Machine-Readable Output

For automation and orchestration, document JSON/NDJSON APIs:

```markdown
## Robot Mode
Output structured data for automation:

\`\`\`bash
tool analyze --format json
\`\`\`

\`\`\`json
{
  "status": "success",
  "findings": [...],
  "metadata": {...}
}
\`\`\`
```

### NDJSON for Streaming
```json
{"event": "start", "timestamp": "..."}
{"event": "finding", "data": {...}}
{"event": "complete", "summary": {...}}
```

---

## Configuration Hierarchy

Document precedence for skills with configuration:

```
Priority (lowest to highest):
1. Built-in defaults
2. User config (~/.config/tool/config.yaml)
3. Project config (.tool/config.yaml)
4. Environment variables (TOOL_*)
5. CLI flags (--option)
```

---

## Content Guidelines

### Consistent Terminology
Pick one term, use it everywhere:

| Instead of | Use |
|------------|-----|
| URL, route, path | API endpoint |
| box, element, control | field |
| pull, get, retrieve | extract |

### Time-Sensitive Information
Use "Current method" as default. Put legacy approaches in collapsible sections:

```markdown
## Current Method
[Active instructions]

<details>
<summary>Legacy approach (pre-v2.0)</summary>

[Old instructions]

</details>
```

### Examples Over Explanations
Concrete demonstrations beat abstract descriptions:

```markdown
## Bad
The function transforms input data into a normalized format.

## Good
### Before
{"firstName": "John", "lastName": "Doe"}

### After
{"name": "John Doe", "normalized": true}
```
