# Claude Code Tools Explanation

A comprehensive guide to understanding tools in Claude Code, based on a conversation exploring the difference between built-in integrations and project conventions.

## What Are Tools?

**Tools** are functions that Claude (the LLM) can invoke to interact with your system. Claude doesn't directly access files or run commands - instead, it calls tools that Claude Code provides.

### The Flow

```
User Request → Claude (LLM) → Tool Invocation → Claude Code → System Action → Result → Claude → Response
```

**Example:**
1. User: "Create hello.txt with 'Hello World'"
2. Claude thinks: "I need to create a file"
3. Claude invokes: `Write(file_path="hello.txt", content="Hello World")`
4. Claude Code executes the Write function
5. Returns result to Claude
6. Claude responds: "Created hello.txt"

## Available Tools in Claude Code

### File Operations
- **Read** - Read file contents
- **Write** - Create/overwrite files
- **Edit** - Make specific edits to existing files
- **Glob** - Find files by pattern (e.g., `**/*.js`)
- **Grep** - Search file contents with regex

### System Operations
- **Bash** - Execute shell commands
- **BashOutput** - Check output from background commands
- **KillShell** - Stop background processes

### Claude Code Specific Tools
- **Task** - Launch specialized agents (subagents)
- **Skill** - Execute Agent Skills
- **SlashCommand** - Run custom slash commands
- **EnterPlanMode** / **ExitPlanMode** - Planning workflow
- **TodoWrite** - Task management

### Notebook Operations
- **NotebookRead** - Read Jupyter notebooks
- **NotebookEdit** - Edit notebook cells

### Web Operations
- **WebFetch** - Fetch and analyze web content
- **WebSearch** - Search the web

### Agent Management
- **AgentOutputTool** - Get output from background agents

## Built-in Integration vs Project Convention

This is a crucial distinction for understanding Claude Code's architecture.

### Built-in Integration

**Definition:** Features with dedicated tools in Claude Code.

**Examples:**
- `.claude/agents/` → Uses `Task` tool
- `.claude/skills/` → Uses `Skill` tool
- `.claude/commands/` → Uses `SlashCommand` tool

**Characteristics:**
1. **Auto-discovery** - Claude Code scans these folders at startup
2. **Special tools** - Dedicated tool for invoking them
3. **Validation** - Claude Code validates file formats
4. **Integration** - Wired into Claude Code's runtime
5. **Consistent** - Works the same across all projects

**How it works:**
```
1. Claude Code starts up
2. Claude Code scans .claude/agents/
3. Claude Code: "I have agents: my-agent, other-agent"
4. User: "Use my-agent to do X"
5. Claude (LLM) uses Task tool with subagent_type="my-agent"
6. Claude Code routes to that agent
```

### Project Convention

**Definition:** Organizational patterns without dedicated tools.

**Examples:**
- `.claude/templates/` - Template storage
- Custom folders like `.claude/my-custom-docs/`
- Any documentation structure you define

**Characteristics:**
1. **No auto-discovery** - Claude Code ignores these folders
2. **Generic tools** - Uses Read, Write, Glob, etc.
3. **No validation** - Claude Code doesn't care about contents
4. **Documentation-driven** - Must be documented in CLAUDE.md
5. **Flexible** - You define the convention

**How it works:**
```
1. Claude Code starts up
2. Claude Code ignores .claude/templates/ (doesn't care)
3. New conversation starts
4. Claude (LLM) reads CLAUDE.md
5. Claude (LLM): "Oh, templates are in .claude/templates/"
6. User: "Create a skill from template"
7. Claude (LLM) reads .claude/templates/lazy-skill-template.md
8. Claude (LLM) copies/modifies it using Read/Write tools
```

## The Key Test

**Does it have a dedicated tool in Claude Code?**
- **Yes** → Built-in integration
- **No** → Project convention

Or more simply:
- **Agents, skills, commands** → Built-in (special tools)
- **Templates, custom folders** → Convention (generic file tools)

## Why This Matters

### For Built-in Integrations

**Pros:**
- Consistent behavior across projects
- Automatic discovery and validation
- Part of Claude Code's official API
- Better integration with the tool

**Cons:**
- Limited to what Claude Code supports
- Can't customize the behavior
- Must follow Claude Code's conventions

### For Project Conventions

**Pros:**
- Complete flexibility
- You define the structure
- Can create any organizational pattern
- No waiting for Claude Code updates

**Cons:**
- Must document in CLAUDE.md
- Claude (LLM) must be told about them
- No validation or auto-discovery
- Not guaranteed to work across projects
- Relies on Claude following instructions

## Tool Permissions

Tools can be controlled via settings:

```json
{
  "permissions": {
    "allow": [
      "Bash(*)",
      "Edit(*)",
      "Write(*)",
      "Read(*)",
      "Task(*)"
    ]
  }
}
```

This controls which tools Claude can use without asking permission.

**Permission patterns:**
- `Tool(*)` - Allow all uses of this tool
- `Tool(path/*)` - Allow for specific paths
- `Tool(command:*)` - Allow for specific commands (Bash)

## Practical Examples

### Example 1: Using Built-in Integration (Agents)

**Project structure:**
```
.claude/
└── agents/
    └── code-reviewer.md
```

**Usage:**
```
User: "Review this code with the code-reviewer agent"
Claude: [Uses Task tool with subagent_type="code-reviewer"]
```

Claude Code handles discovery and routing automatically.

### Example 2: Using Project Convention (Templates)

**Project structure:**
```
.claude/
└── templates/
    └── lazy-skill-template.md
```

**In CLAUDE.md:**
```markdown
When creating new skills, use .claude/templates/lazy-skill-template.md
```

**Usage:**
```
User: "Create a new skill using the template"
Claude: [Reads CLAUDE.md]
Claude: [Uses Read tool on .claude/templates/lazy-skill-template.md]
Claude: [Uses Write tool to create new skill]
```

Claude follows instructions from CLAUDE.md using generic tools.

### Example 3: Combining Both

Templates (convention) feeds into skills (built-in):

1. Templates provide starting structure (convention)
2. New skill goes in `.claude/skills/` (built-in)
3. Claude Code discovers the new skill automatically
4. Skill becomes available via Skill tool

## The Power of Tools

Tools are what differentiate Claude Code from regular ChatGPT:

**ChatGPT:**
- Text in, text out
- No system access
- Can't modify files
- Can't run commands

**Claude Code:**
- Can read/write files
- Can run shell commands
- Can manage projects
- Can invoke specialized agents
- Can search web, access notebooks, etc.

**Every action Claude takes goes through a tool.** No tools = Claude can only chat.

## Creating Custom Integrations

You **cannot** create new tools (that requires modifying Claude Code itself), but you **can** create powerful conventions:

### Pattern: Custom Documentation Structure

```
.claude/
└── docs/
    ├── architecture.md
    ├── api-conventions.md
    └── deployment.md
```

**In CLAUDE.md:**
```markdown
## Project Documentation

For detailed information:
- Architecture: .claude/docs/architecture.md
- API conventions: .claude/docs/api-conventions.md
- Deployment: .claude/docs/deployment.md

Read these files only when relevant to your task.
```

Claude uses Read tool when needed, following your instructions.

### Pattern: Template Library

```
.claude/
└── templates/
    ├── lazy-skill-template.md
    ├── agent-template.md
    ├── command-template.md
    └── README.md
```

Document in CLAUDE.md, Claude uses Read/Write tools to copy and customize.

### Pattern: Script Library

```
.claude/
└── scripts/
    ├── deploy.sh
    ├── test.sh
    └── README.md
```

Claude uses Bash tool to execute these when needed.

## Best Practices

### For Built-in Integrations

1. **Follow official conventions** - Use recommended file structures
2. **Validate format** - Ensure YAML frontmatter is correct
3. **Keep organized** - One agent/skill per file
4. **Document in place** - Instructions in the file itself

### For Project Conventions

1. **Document in CLAUDE.md** - Claude must know about it
2. **Be specific** - Exact paths, clear purposes
3. **Keep it simple** - Don't over-organize
4. **Follow lazy context** - Reference, don't inline everything
5. **Add README files** - Explain the convention for humans

## Common Gotchas

### Gotcha 1: Assuming Custom Folders Are Auto-discovered

❌ **Wrong assumption:**
```
I created .claude/my-agents/, Claude Code will find them
```

✅ **Reality:**
```
Only .claude/agents/ is auto-discovered
Custom folders require CLAUDE.md documentation
```

### Gotcha 2: Thinking Tools Are Customizable

❌ **Wrong assumption:**
```
I can create a new tool for my specific use case
```

✅ **Reality:**
```
Tools are built into Claude Code
You can only use existing tools in creative ways
```

### Gotcha 3: Expecting Conventions to Work Automatically

❌ **Wrong assumption:**
```
I put templates in .claude/templates/, Claude will use them
```

✅ **Reality:**
```
You must document the convention in CLAUDE.md
Claude only knows what you tell it
```

## Mental Model

Think of Claude Code like this:

```
┌─────────────────────────────────────────┐
│         Claude Code (The Tool)          │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │     Built-in Integrations         │ │
│  │  - Agents (Task tool)             │ │
│  │  - Skills (Skill tool)            │ │
│  │  - Commands (SlashCommand tool)   │ │
│  │  [Auto-discovered, validated]     │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │     Generic Tools                 │ │
│  │  - Read, Write, Edit              │ │
│  │  - Bash, Glob, Grep               │ │
│  │  - WebFetch, WebSearch            │ │
│  │  [Work with any files]            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │     Claude (LLM)                  │ │
│  │  - Reads CLAUDE.md                │ │
│  │  - Follows your instructions      │ │
│  │  - Invokes tools as needed        │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘

Your Project Conventions (templates, docs, etc.)
[Claude reads these via generic tools when instructed]
```

## Summary

**Tools** = Claude's interface to your system

**Built-in integrations** = Features with dedicated tools (agents, skills, commands)
- Auto-discovered by Claude Code
- Special tools for invocation
- Consistent across projects

**Project conventions** = Organizational patterns you define (templates, custom docs)
- Documented in CLAUDE.md
- Use generic tools (Read, Write, etc.)
- Flexible but require documentation

**The test:** If it has a dedicated tool → built-in. If Claude uses Read/Write → convention.

**The power:** Claude Code's tools enable system interaction that regular LLMs can't do.

---

*Documented from conversation on 2025-12-09*
*Key insight: Understanding tools clarifies the difference between what Claude Code provides vs what you can create*
