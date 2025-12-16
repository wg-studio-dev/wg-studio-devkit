You are tasked with researching the latest Claude Code techniques, tips, and discussions, and creating a concise daily summary.

## Your Task

1. **Fetch Raw Data**: Run the Python script to fetch filtered posts from r/ClaudeCode:
   ```bash
   python3 /Users/wilson/brain/scripts/fetch_cc_reddit.py
   ```

2. **Analyze Content**: Review the JSON output containing filtered Reddit posts. Look for:
   - Novel techniques or workflows
   - Useful slash command patterns
   - Claude.md configuration tips
   - Productivity hacks
   - Integration patterns (MCP servers, hooks, etc.)
   - Bug workarounds or solutions

3. **Create Summary Document**: Generate a summary file at:
   `/Users/wilson/brain/cc_reddit/YYYY-MM-DD_cc_summary.md`

   Use this structure:
   ```markdown
   # Claude Code Updates - YYYY-MM-DD

   **Sources**: r/ClaudeCode (Reddit)
   **Posts Analyzed**: [count]
   **Key Findings**: [count]

   ## 🎯 Top Techniques & Tips

   ### [Technique Name]
   **Source**: [Reddit post title with link]
   **What**: Brief description of the technique
   **Why It Matters**: Why this is useful
   **How**: Quick implementation steps if applicable

   ## 💡 Interesting Discussions

   ### [Discussion Topic]
   **Source**: [Link]
   **Summary**: Key points from the discussion
   **Takeaway**: What you should know

   ## 📚 Resources & Tools

   [Any new tools, repos, or resources mentioned]

   ## ⚡ Quick Wins

   [Simple, immediately actionable tips]

   ---

   **Reading Time**: ~5 minutes
   **Next Steps**: [If any techniques warrant deeper exploration]
   ```

4. **Update Index**: Update `/Users/wilson/brain/cc_reddit/cc_updates_index.md` by:
   - Adding a new entry with the date and link to the summary file
   - Updating the "Last Updated" timestamp
   - Keep entries in reverse chronological order (newest first)

   Index entry format:
   ```markdown
   - **[YYYY-MM-DD](YYYY-MM-DD_cc_summary.md)** - [Brief one-line summary of key finding]
   ```

## Important Guidelines

- **Conciseness**: Target ~5 minute read time. Be selective about what to include.
- **Actionability**: Focus on techniques that can be applied immediately.
- **Signal over Noise**: Skip generic discussions or support questions.
- **No Duplicates**: If a technique was covered in a previous summary, just note "Previously covered" unless there's significant new information.
- **Context**: Explain why something matters, not just what it is.

## If No New Content

If the script returns 0 new posts, create a brief note:

```markdown
# Claude Code Updates - YYYY-MM-DD

**No significant new updates today.**

Check back tomorrow or browse [r/ClaudeCode](https://reddit.com/r/ClaudeCode) directly.
```

And still update the index with this note.

## Error Handling

If the fetch script fails:
- Report the error clearly
- Suggest troubleshooting (check internet, verify RSS feed URL)
- Do not create a summary file

---

Begin by running the fetch script and analyzing the results.