---
name: plan-lite
description: Lightweight planning workflow optimized for free-tier users
argument-hint: "[optional: project context or additional requirements]"
---

# /plan-lite - Fast Planning with Haiku

A lightweight version of `/plan` that generates a Product Requirements Document and execution plan quickly using Haiku (no extended thinking).

**Phase 1:** A product-manager agent analyzes documentation in `docs/` and creates `docs/prd.md`.

**Phase 2:** After your approval, an orchestrator agent creates `todo.md` with the execution plan.

## Workflow

### Phase 1: Generate Product Requirements Document

The product-manager agent will:
- Read existing documentation in the `docs/` folder
- Create a focused `docs/prd.md` with:
  - Product Vision & Goals
  - Core Requirements & Features
  - User Flows & Personas
  - Acceptance Criteria
  - Technical Considerations
  - Success Metrics

### User Approval Checkpoint

After the PRD is created, you will review and approve it before proceeding to Phase 2.

### Phase 2: Generate Execution Plan

Once approved, the orchestrator agent will:
- Read all documentation in `docs/` (including the new prd.md)
- Create `todo.md` with the following structure:

#### todo.md Structure

**Top Instructions Section:**
- Clear guidance that all agents should use `docs/` as context
- Instructions to check off tasks with `[x]` when complete
- Instructions to add completion summaries beneath each task

**Phases & Tasks:**
- Organized into sequential phases (Phase 1, Phase 2, etc.)
- Each phase contains subtasks labeled as `Task 1.1`, `Task 1.2`, etc.
- Each task includes:
  - [ ] Checkbox for completion tracking
  - Full description of objectives
  - Detailed acceptance criteria
  - Agent assignment (which agent should execute)
  - Dependency indicator:
    - "Parallel work with Task X.X" for concurrent execution
    - "Sequential, after Task X.X is complete" for dependent tasks
  - Space for completion summary (filled in when agent completes task)

## Steps

1. **Initiating Phase 1**
   - The product-manager agent launches automatically
   - Agent reads all files in `docs/`
   - Agent creates `docs/prd.md`

2. **Approval Checkpoint**
   - You review the generated `prd.md`
   - You provide approval (or request changes)

3. **Initiating Phase 2**
   - The orchestrator agent launches automatically
   - Agent reads `docs/` including the new `prd.md`
   - Agent creates `todo.md` with structured execution plan

4. **Ready for Execution**
   - `todo.md` is ready for agent teams to execute
   - Each task can be checked off and summarized as work progresses

## Success Criteria

- [ ] Product requirements document (`docs/prd.md`) is created with clear vision and requirements
- [ ] PRD is reviewed and approved by user
- [ ] Execution plan (`todo.md`) is created with all phases, tasks, and assignments
- [ ] todo.md includes clear checkboxes and completion summary spaces
- [ ] All tasks have proper dependency indicators for parallel/sequential execution
- [ ] Instructions at top of todo.md are clear and actionable for all agents
