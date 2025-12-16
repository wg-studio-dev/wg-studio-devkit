# CC Research Skill

Fetch and analyze r/ClaudeCode discussions to create comprehensive, actionable summaries of community techniques, tools, and insights.

## What It Does

This skill:
- Fetches the latest 30 days of posts from r/ClaudeCode
- Analyzes posts for actionable techniques, tools, and discussions
- Creates structured summaries with emoji-organized sections
- Maintains an index of all generated summaries
- Reports top findings to you

## Quick Start

### Prerequisites

```bash
pip3 install feedparser
```

### Invoke the Skill

Ask Claude Code to "research Claude Code updates" or "fetch and summarize r/ClaudeCode" and this skill will activate automatically.

You can also explicitly invoke it by name: "Use the cc-research skill"

### Where Output Goes

- **Summaries**: `/Users/wilson/brain/cc_knowledge/YYYY-MM-DD_cc_summary.md`
- **Index**: `/Users/wilson/brain/cc_knowledge/cc_updates_index.md`

## File Structure

```
~/.claude/skills/cc-research/
├── SKILL.md              # Detailed skill instructions
├── README.md             # This file
└── fetch_cc_reddit.py    # Python script to fetch posts
```

## What Gets Generated

### Individual Summary Files

Each run creates a summary with:
- **🎯 Top Techniques & Tips**: Most valuable techniques (3-7 items)
- **💡 Interesting Discussions**: Notable debates and pain points
- **📚 Resources & Tools**: Links to repos, MCPs, and utilities
- **⚡ Quick Wins**: 5 immediately actionable tips

Example:
```markdown
# Claude Code Updates - 2025-12-16

**Sources**: r/ClaudeCode (Reddit)
**Posts Analyzed**: 28
**Time Period**: Last 30 days

## 🎯 Top Techniques & Tips

### 1. MCP Server Configuration Management
**Source**: [Open sourced my repo...](https://reddit.com/r/ClaudeCode/...)
**What**: Layered .claude config system using claudekit
**Why It Matters**: MCP configuration is confusing; standardized approach
**How**: Install scripts deploy configs at project or user level
```

### Index File

Auto-updated index of all summaries:
```markdown
# Claude Code Updates Index

**Last Updated**: 2025-12-16

- **[2025-12-16](./2025-12-16_cc_summary.md)** - AgentsKB MCP, configuration issues, full-stack builds (28 posts)
- **[2025-12-15](./2025-12-15_cc_summary.md)** - Slash command patterns, workflow optimization (22 posts)
```

## Parameters

The Python script fetches the last **30 days** of posts. To change this:

Edit `fetch_cc_reddit.py` line 74:
```python
posts = fetch_reddit_posts(days_back=30)  # Change 30 to desired number
```

## Troubleshooting

### Script Fails with "No module named feedparser"

Install the required library:
```bash
pip3 install feedparser
```

### "No new posts found"

- Reddit RSS feed might be slow
- Wait a few minutes and try again
- Check your internet connection

### Output directory doesn't exist

The skill creates `/Users/wilson/brain/cc_knowledge/` automatically if it doesn't exist.

### Previous summaries disappeared

All summaries are saved in `/Users/wilson/brain/cc_knowledge/`. Check the directory:
```bash
ls -la /Users/wilson/brain/cc_knowledge/
```

## Portability

This skill is designed to be copied to other projects. All components are self-contained:

1. Copy the entire `~/.claude/skills/cc-research/` directory
2. Ensure `feedparser` is installed: `pip3 install feedparser`
3. The skill will create output in the new project's structure

You can customize the output path in SKILL.md instructions if needed for other projects.

## Performance Notes

- Fetching typically takes 2-5 seconds
- Analysis of 20-30 posts takes 10-30 seconds depending on model
- Total runtime: ~30 seconds to 2 minutes

## Example Usage

**User**: "Research recent Claude Code discussions and create a summary"

**Skill performs**:
1. Runs `fetch_cc_reddit.py` to get latest posts
2. Analyzes posts for techniques, tools, and discussions
3. Creates structured summary markdown file
4. Updates index file
5. Reports findings to user

**Output**:
```
Analyzed 28 posts from r/ClaudeCode (last 30 days)

📊 Summary saved to: /Users/wilson/brain/cc_knowledge/2025-12-16_cc_summary.md

🔝 Top Highlights:
- New AgentsKB MCP for edge programming with precise library docs
- MCP configuration inconsistency between project and global levels
- Users building full-stack apps end-to-end with Claude Code

💡 Next: Check AgentsKB if you work with cutting-edge APIs
```

## Advanced

### Modifying Summary Format

The summary structure is defined in SKILL.md. Edit the "Create Structured Summary" section to customize emoji usage, section order, or output format.

### Extending the Script

To fetch from other subreddits:

```python
# In fetch_cc_reddit.py, change subreddit parameter
posts = fetch_reddit_posts(subreddit="LazyWeb", days_back=30)
```

### Customizing Output Location

Edit SKILL.md's "File Organization" section to change where summaries are saved.

## Feedback & Updates

The skill will:
- Report if no posts match filters
- Alert if feedparser isn't installed
- Show post count and date range in output
- Update the index automatically

## Files This Skill Uses

**Reads**:
- `~/.claude/skills/cc-research/fetch_cc_reddit.py` (self)
- Reddit RSS feed (external)

**Writes**:
- `/Users/wilson/brain/cc_knowledge/YYYY-MM-DD_cc_summary.md` (new summary)
- `/Users/wilson/brain/cc_knowledge/cc_updates_index.md` (updated index)

**Creates** (if needed):
- `/Users/wilson/brain/cc_knowledge/` directory
