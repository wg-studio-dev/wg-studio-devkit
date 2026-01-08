---
name: release-notes
description: Write release notes from PRDs, Jira exports, and style guides
argument-hint: "[optional: feature name or additional context]"
model: opus
---

# /release-notes - Generate Professional Release Notes

Transform product documentation (PRDs, Jira exports, feature specs) into polished release notes using a corporate style guide.

## Overview

This command guides you through gathering source documents and style preferences, then generates professionally written release notes ready for publication.

## Workflow

### Step 1: Gather Source Documents

Ask the user for their source documentation:

```
Can you tell me what the source documents are, such as a Jira .csv export or PRD?

Examples of accepted formats:
- PRD files (e.g., docs/prd.md)
- Jira export (.csv)
- Feature specification documents
- Sprint summary documents
- Changelog files
```

Wait for the user to provide file names/paths. They can name multiple files.

### Step 2: Gather Style Guide

Ask the user for their voice/style guide:

```
Do you have a style guide I should use for writing these release notes?

This could be:
- A corporate style guide (.md file)
- Brand voice guidelines
- Previous release notes to match tone
- Or just describe your preferred style
```

Wait for the user's response. The style guide is optional - if none provided, use professional, clear, user-focused language.

### Step 3: Check for Additional Context

Before beginning work, confirm all inputs:

```
Is there any other documentation I should review before writing the release notes?

For example:
- User-facing documentation
- Technical specifications
- Marketing messaging guidelines
- Target audience information
```

Wait for user confirmation or additional files.

### Step 4: Read and Analyze All Documents

Once you have all inputs:

1. Use the Read tool to read each source document provided
2. If a style guide was provided, read it thoroughly
3. Identify:
   - Key features and changes
   - User-facing benefits
   - Technical details that need translation to user language
   - Any breaking changes or migration notes

### Step 5: Generate Release Notes

Write release notes following this structure (adapt based on style guide if provided):

```markdown
# Release Notes - [Feature/Version Name]

*Released: [YYYY-MM-DD]*

## Highlights

[2-3 sentence summary of the most impactful changes]

## What's New

### [Feature Category 1]
- **[Feature Name]**: [User-focused description of benefit]
- **[Feature Name]**: [User-focused description of benefit]

### [Feature Category 2]
- **[Feature Name]**: [User-focused description of benefit]

## Improvements

- [Improvement description]
- [Improvement description]

## Bug Fixes

- Fixed [issue description]
- Resolved [issue description]

## Breaking Changes (if applicable)

- [Description of breaking change and migration path]

## Getting Started

[Brief guidance on how to access/use the new features]

---

*Questions? Contact [support channel]*
```

### Step 6: Output the Release Notes

1. Create the `outputs/` directory if it doesn't exist
2. Generate the filename using today's date: `releasenotes-YYYY-MM-DD.md`
3. Write the release notes to `outputs/releasenotes-YYYY-MM-DD.md`

Use Bash to create the directory:
```bash
mkdir -p outputs
```

Then use the Write tool to create the file.

### Step 7: Present Summary

After writing the file, inform the user:

```
Release notes have been written to: outputs/releasenotes-YYYY-MM-DD.md

Summary of what was included:
- [Number] new features documented
- [Number] improvements highlighted
- [Number] bug fixes noted
- [Any breaking changes mentioned]

Would you like me to make any adjustments to the tone, detail level, or structure?
```

## Success Criteria

- [ ] Source documents gathered from user
- [ ] Style guide applied (if provided)
- [ ] All relevant features/changes extracted
- [ ] Release notes written in user-focused language
- [ ] Output saved to `outputs/releasenotes-YYYY-MM-DD.md`
- [ ] Summary presented to user

## Tips for Best Results

- **Be specific about files**: Provide exact file paths when possible
- **Style guides matter**: A good style guide produces more consistent output
- **Review and iterate**: Release notes may need refinement for your audience
- **Consider your audience**: Technical vs. non-technical users need different detail levels

## Example Usage

```
User: /release-notes

Claude: Can you tell me what the source documents are, such as a Jira .csv export or PRD?

User: docs/prd-authentication.md and exports/sprint-42.csv

Claude: Do you have a style guide I should use for writing these release notes?

User: Use docs/style-guide.md

Claude: Is there any other documentation I should review before writing the release notes?

User: No, that's everything

Claude: [Reads all documents, generates release notes, saves to outputs/releasenotes-2026-01-08.md]
```
