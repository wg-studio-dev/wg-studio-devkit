---
name: execute
description: Execute the plan in todo.md using parallel subagents with coordination
---

# /execute - Execute Parallel Task Plan

Orchestrates execution of tasks defined in `todo.md` using a coordinated multi-agent approach. Tasks are executed in parallel where dependencies allow, with all agents following the coordination guidelines in `.claude/agents/agents.md` and using `docs/agent_chat.md` for deconfliction.

## Execution Model

### Task Extraction

1. Read `todo.md` to identify all pending tasks
2. Parse task metadata:
   - Task ID and description
   - Assigned agent
   - Dependencies (parallel vs. sequential)
   - Acceptance criteria
3. Build execution graph based on dependency indicators

### Parallel Execution

Tasks are executed according to their dependency structure:

- **Parallel Work**: Tasks marked "Parallel work with Task X.X" launch simultaneously
- **Sequential Work**: Tasks marked "Sequential, after Task X.X is complete" wait for dependencies
- **Agent Coordination**: All agents check `docs/agent_chat.md` before starting work

### Agent Behavior During Execution

Each agent executing a task must follow this checklist **in order**:

1. **Read the README** - Refresh on project goals and structure
2. **Sync in agent_chat.md** - Check for in-progress work to avoid conflicts
   - Pick a task-themed username (e.g., `api-endpoints`, `dashboard-ui`)
   - Wrap your plan in XML tags: `<your-username>...</your-username>`
   - List all files you expect to modify
   - If another agent claimed a file you need, wait for them to finish
3. **Research the Codebase** - Inspect files relevant to your task before editing
4. **Execute the Task** - Apply necessary changes following the task requirements
5. **Update todo.md** - Mark task complete with [x] and add completion summary
6. **Remove agent_chat.md entry** - Clean up when done

## Coordination Guidelines

All agents must follow `.claude/agents/agents.md`:

- **Avoid conflicts** by checking `docs/agent_chat.md` before starting
- **Claim files** in your XML block to prevent simultaneous modifications
- **Communicate blockers** if you need a file another agent is using
- **Remove your entry** from agent_chat.md only when completely done
- **Update documentation** if changes affect project setup, usage, or workflows

## Task Completion Format

When a task is complete:

```
- [x] Task 1.1: Description of work

  **Completion Summary**: Brief summary of what was completed, key files modified, and any notes for downstream tasks.
```

## Execution Steps

1. **Parse todo.md** - Identify all pending tasks and their dependencies
2. **Build execution plan** - Create directed acyclic graph (DAG) of tasks
3. **Launch parallel waves** - Execute independent tasks simultaneously
4. **Monitor coordination** - Watch `docs/agent_chat.md` for conflicts
5. **Sequential execution** - Wait for blockers before launching dependent tasks
6. **Update tracking** - Mark tasks complete and document summaries in todo.md
7. **Verify completion** - Confirm all tasks in plan are checked off

## Success Criteria

- [ ] All pending tasks in todo.md are identified and parsed
- [ ] Parallel tasks execute simultaneously without conflicts
- [ ] Agents properly coordinate via agent_chat.md
- [ ] Each task is marked [x] upon completion
- [ ] Completion summaries are added for each task
- [ ] All dependencies (sequential/parallel) are respected
- [ ] Agent_chat.md entries are cleaned up when agents finish
- [ ] All tasks in todo.md are marked complete when execution finishes
