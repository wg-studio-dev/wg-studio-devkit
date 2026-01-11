---
name: ralph-heavy
description: "Wolf Wiggum - disciplined Ralph loop with learnings, progress tracking, and feature-by-feature execution"
argument-hint: "[TASK_DESCRIPTION] [--max-iterations N]"
---

# Ralph Heavy (Wolf Wiggum)

This command combines Ralph Wiggum's persistence with the agent memory disciplined scaffolding:
- **learnings.md**: Cumulative knowledge to prevent repeating mistakes
- **progress.md**: Session history and state tracking
- **features.json**: Feature-by-feature focus (one at a time)
- **init.sh**: Consistent environment setup
- **Git commits**: Rollback points after each feature

## Phase 1: Setup Agent Memory Scaffolding

First, check if agent memory scaffolding exists:

```!
if [[ -d .agent-memory ]]; then
  echo "AGENT_MEMORY_EXISTS=true"
  echo ""
  echo "Existing agent memory scaffolding found:"
  ls -la .agent-memory/
else
  echo "AGENT_MEMORY_EXISTS=false"
fi
```

**If AGENT_MEMORY_EXISTS=false**, create the scaffolding:

```bash
mkdir -p .agent-memory

# Create learnings file (cumulative knowledge)
cat > .agent-memory/learnings.md << 'EOF'
# Learnings

<!--
Record friction points, failed approaches, and solutions here.
Format: brief, actionable insights (not session logs).
Example: "Auth header requires 'Bearer ' prefix with trailing space"
-->

EOF

# Create progress file (session tracking)
cat > .agent-memory/progress.md << 'EOF'
# Agent Progress Log

## Session History
<!-- Append session summaries here -->

## Current State
- Last working commit: (none)
- Features completed: 0
- Features remaining: (see features.json)
EOF

# Create empty features file
cat > .agent-memory/features.json << 'EOF'
{
  "features": []
}
EOF

# Create init script
cat > .agent-memory/init.sh << 'EOF'
#!/bin/bash
set -euo pipefail

# Project-specific initialization
# Uncomment and customize as needed:
# npm install 2>/dev/null || true
# npm run dev &
# sleep 2

echo "Agent memory environment ready"
EOF
chmod +x .agent-memory/init.sh

# Initialize git if needed
git init 2>/dev/null || true
git add -A && git commit -m "Agent: Initial scaffolding" 2>/dev/null || echo "Git already initialized or no changes"

echo "agent memory scaffolding created in .agent-memory/"
```

## Phase 2: Define Features

Now help the user define their features. Based on the task "$ARGUMENTS", generate a features.json with:

1. Break down the task into discrete, testable features
2. Each feature should have:
   - `id`: Short kebab-case identifier
   - `description`: What the user should be able to do
   - `priority`: Order of implementation (1 = first)
   - `verification`: List of steps to verify completion
   - `passes`: false (initially)

Write the features to `.agent-memory/features.json`. Example format:

```json
{
  "features": [
    {
      "id": "feature-name",
      "description": "User can do X",
      "priority": 1,
      "verification": [
        "Step 1 to verify",
        "Step 2 to verify"
      ],
      "passes": false
    }
  ]
}
```

Ask the user to confirm or modify the features before proceeding.

## Phase 3: Customize init.sh

Ask the user what environment setup is needed and update `.agent-memory/init.sh` accordingly. Common patterns:
- Web apps: `npm install && npm run dev &`
- Python: `pip install -r requirements.txt`
- Rails: `bundle install && rails db:migrate`

## Phase 4: Launch Ralph Heavy Loop

Once scaffolding is ready, construct and execute the Ralph Heavy loop:

```bash
/ralph-loop "
# Ralph Heavy Loop: [TASK NAME]

## Environment
Run .agent-memory/init.sh at start of each iteration.

## Progress Protocol
1. Read .agent-memory/learnings.md for known gotchas (FIRST)
2. Read .agent-memory/progress.md for session history
3. Read .agent-memory/features.json for current state
4. Check git log --oneline -5

## Work Rules
- Work on ONE feature at a time (lowest priority incomplete)
- Run ALL verification steps before marking complete
- After each feature:
  1. Update features.json (passes: true)
  2. git add -A && git commit -m 'Agent: Complete [feature-id]'
  3. Append session summary to progress.md
  4. Add any discoveries to learnings.md

## Learning Protocol
When you discover something unexpected:
- Add it to learnings.md IMMEDIATELY
- Format: one line, present tense, actionable

## Failure Mitigation
| If you notice... | Do this... |
|------------------|------------|
| Multiple features changing | STOP. Revert. Pick ONE. |
| Tests failing | Fix before proceeding |
| Repeating a mistake | Check learnings.md |
| Stuck 3+ iterations | Document in learnings.md, move on |
| Environment broken | Run .agent-memory/init.sh, git checkout . |

## Completion
Output <promise>ALL FEATURES PASSING</promise> when every feature has passes: true.
" --completion-promise "ALL FEATURES PASSING" --max-iterations 30
```

Substitute the actual task name and adjust max-iterations based on feature count (roughly 5-6 iterations per feature).

## Quick Reference

**Monitor progress:**
```bash
cat .agent-memory/progress.md
cat .agent-memory/features.json | jq '.features[] | select(.passes == false) | .id'
```

**Cancel loop:**
```bash
/cancel-ralph
```

**Key files:**
- `.agent-memory/learnings.md` - Cumulative knowledge (read first!)
- `.agent-memory/progress.md` - Session history
- `.agent-memory/features.json` - Feature list and status
- `.agent-memory/init.sh` - Environment setup script
