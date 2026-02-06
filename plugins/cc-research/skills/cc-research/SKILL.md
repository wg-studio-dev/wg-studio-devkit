---
name: cc-research
description: Fetch and analyze r/ClaudeCode discussions to extract actionable techniques, tools, and insights. Use PROACTIVELY when user wants to research Claude Code community updates or generate comprehensive summaries of Reddit discussions.
allowed-tools: Bash, Read, Write, Grep, Glob
model: sonnet
---

# Claude Code Reddit Research Skill

## Overview

This skill autonomously fetches posts from r/ClaudeCode and creates structured, actionable summaries that highlight techniques, tools, discussions, and resources valuable to Claude Code users.

The skill is designed to:
- **Discover** novel techniques and workflows
- **Analyze** community discussions and trends
- **Synthesize** insights into structured summaries
- **Organize** resources for easy reference

## Core Process

### Step 1: Fetch Reddit Posts

Run the bundled Python script to fetch posts from r/ClaudeCode RSS feed:

```bash
python3 "$(dirname "$0")/fetch_cc_reddit.py"
```

This outputs JSON with posts from the last 30 days. The script:
- Fetches from r/ClaudeCode/new/.rss
- Filters posts to last 30 days
- Removes low-value posts (basic help questions)
- Returns structured post data (title, link, author, summary)

**Expected output format**:
```json
{
  "fetch_time": "2025-12-16T...",
  "post_count": N,
  "posts": [
    {
      "title": "...",
      "link": "https://reddit.com/r/ClaudeCode/...",
      "published": "2025-...",
      "author": "...",
      "summary": "..."
    },
    ...
  ]
}
```

### Step 2: Analyze Posts and Identify Themes

As you read through the JSON posts, identify:

1. **Actionable Techniques**: Specific methods, workflows, or configurations users are implementing
   - Look for "how I use Claude Code", "workflow", "setup", "configuration"
   - Include implementation details and benefits

2. **Tools & Resources**: New MCP servers, plugins, libraries, or external tools mentioned
   - Extract links to GitHub repos, websites, documentation
   - Note what problems they solve

3. **Interesting Discussions**: Debates, challenges, or important conversations
   - Notable community questions
   - Emerging pain points
   - Success stories and scale examples

4. **Common Patterns**: Techniques appearing in multiple posts
   - These indicate strongest community interest
   - Prioritize these highly

### Step 3: Create Structured Summary

Create a Markdown file using this structure:

```markdown
# Claude Code Updates - YYYY-MM-DD

**Sources**: r/ClaudeCode (Reddit)
**Posts Analyzed**: N
**Time Period**: Last 30 days
**Key Findings**: 3-5 word summary

---

## 🎯 Top Techniques & Tips

### 1. [Technique Name]
**Source**: [Post Title](Reddit URL)
**What**: One sentence describing what it is
**Why It Matters**: One sentence on significance
**How**: 1-2 sentences on implementation
**Link**: [GitHub/docs link if applicable]

### 2. [Technique Name]
...

---

## 💡 Interesting Discussions

### [Discussion Theme]
**Source**: Post title or "Multiple posts"
**Summary**: What was discussed
**Takeaway**: Key insight or recommendation

### [Another Discussion]
...

---

## 📚 Resources & Tools

### New Tools/MCPs
- **[Name]**: Brief description (Link)
- **[Name]**: Brief description (Link)

### Config & Patterns
- **[Name]**: Brief description (Link)

### Community Highlights
- Brief note on important projects or initiatives

---

## ⚡ Quick Wins

1. **[Action]**: Brief description of immediately useful tip
2. **[Action]**: ...
3. **[Action]**: ...
4. **[Action]**: ...
5. **[Action]**: ...

---

**Reading Time**: ~5-6 minutes
**Next Steps**:
- Recommended actions based on content
- Tools to install or try
- Workflows to experiment with
```

## Key Guidelines for Analysis

### Quality Criteria

- **Focus on actionable insights**: Include specific implementations, not just announcements
- **Prioritize novelty**: Highlight techniques appearing for first time or significant updates
- **Extract evidence**: Include actual quotes from posts or specific examples
- **Connect dots**: Note when multiple posts discuss related topics
- **Be concise**: Target ~5 minute read length

### What to Include

- Specific Claude Code features being used
- MCP servers and their use cases
- Workflow improvements and productivity techniques
- Integration patterns with other tools
- Performance optimization strategies
- Configuration management approaches
- Successful project examples (with scale/complexity)

### What to Skip

- Generic help requests or troubleshooting threads
- Redundant posts saying same thing differently
- Off-topic discussions not about Claude Code
- Low-effort complaints without solutions
- Content already covered in previous summaries

### Section Prioritization

**Top Techniques & Tips**: This is the most valuable section. Include 3-7 techniques sorted by:
1. Techniques appearing in multiple posts (indicates strong signal)
2. Novel techniques not previously covered
3. Directly applicable to Claude Code workflow

## File Organization

### File Naming
- Location: `/Users/wilson/brain/cc_knowledge/`
- Format: `YYYY-MM-DD_cc_summary.md`
- Example: `2025-12-16_cc_summary.md`

### Index Management

Update the index file at: `/Users/wilson/brain/cc_knowledge/cc_updates_index.md`

Add new entry in the Summaries section:
```markdown
- **[YYYY-MM-DD](./YYYY-MM-DD_cc_summary.md)** - Brief one-line summary (N posts)
```

Keep entries in reverse chronological order (newest first).

Also update the "Last Updated" field at top:
```markdown
**Last Updated**: YYYY-MM-DD
```

## Output Reporting

After creating the summary, report to user:

1. **Number of posts analyzed**: X posts from last 30 days
2. **File path**: Full path to created summary file
3. **Top highlights**: 2-3 sentence summary of most important findings
4. **Next steps**: Recommendation on what to explore or try based on content

**Example report**:
```
Analyzed 28 posts from r/ClaudeCode (last 30 days)

📊 Summary saved to: /Users/wilson/brain/cc_knowledge/2025-12-16_cc_summary.md

🔝 Top Highlights:
- New AgentsKB MCP provides edge programming knowledge with precise library docs
- Community discovering MCP configuration consistency issues between project and global levels
- Multiple users building full-stack applications end-to-end with Claude Code

💡 Recommended next step: Install AgentsKB if working with cutting-edge APIs
```

## Directory Structure

The skill creates and maintains:

```
/Users/wilson/brain/cc_knowledge/
├── cc_updates_index.md          # Main index of all summaries
├── 2025-12-16_cc_summary.md     # Individual summary
├── 2025-12-15_cc_summary.md
└── ...
```

If `/Users/wilson/brain/cc_knowledge/` doesn't exist, create it automatically.

## Dependencies

- Python 3.x
- `feedparser` library (install with `pip3 install feedparser`)
- Standard libraries: json, datetime, urllib

## Error Handling

If the Python script fails:
- Check feedparser is installed: `pip3 install feedparser`
- Check internet connectivity
- Check Reddit is accessible
- Script will output errors to stderr

If no posts found:
- Reddit RSS might be slow to update
- Try again in a few minutes
- Previous summaries are preserved in cc_knowledge/

## Tips for Best Results

1. **Read summaries of recent weeks** for context on ongoing discussions
2. **Pay attention to "Takeaway" sections** in discussions - these highlight actionable insights
3. **Extract exact code examples** when posts mention specific implementations
4. **Note performance comparisons** if multiple posts discuss speed/efficiency
5. **Link to original posts liberally** so users can dive deeper

## Autonomy

This skill should operate independently. You decide:
- Which posts are most valuable
- How to categorize and structure content
- What constitutes a "Quick Win"
- Whether multiple posts should be combined into one theme
- Reading time estimate based on content volume

Make good judgment calls about what matters most to Claude Code users, similar to professional tech newsletter editing.
