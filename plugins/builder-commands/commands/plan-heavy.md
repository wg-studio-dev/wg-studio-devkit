---
name: plan-heavy
description: Deep planning with extended thinking - comprehensive PRD and execution plan using Opus
argument-hint: "[optional: project context or additional requirements]"
---

# /plan-heavy - Comprehensive PRD and Execution Plan

Advanced two-phase workflow using Opus with extended thinking for maximum depth and insight.

**Phase 1:** A product-manager agent analyzes all documentation in `docs/` and creates a comprehensive product requirements document with deep reasoning.

**Phase 2:** After your approval, an orchestrator agent uses everything in `docs/` (including the new PRD) to create a detailed, carefully sequenced execution plan.

## Workflow

### Phase 1: Generate Product Requirements Document

The product-manager agent will:
- Read all existing documentation in the `docs/` folder
- Use extended thinking to deeply analyze product vision, requirements, and user flows
- Create a comprehensive `docs/prd.md` with:
  - Product Vision & Goals
  - Core Requirements & Features
  - User Flows & Personas
  - Acceptance Criteria
  - Technical Considerations
  - Success Metrics

### User Approval Checkpoint

After the PRD is created, you will be asked to review and approve it before proceeding to Phase 2.

### Phase 2: Generate Execution Plan

Once approved, the orchestrator agent will:
- Read all documentation in `docs/` (including the new prd.md)
- Use extended thinking to deeply reason about optimal project structure and sequencing
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
   - The product-manager agent launches automatically with model: "opus"
   - Agent reads all files in `docs/`
   - Agent creates comprehensive `docs/prd.md` with extended thinking

2. **Approval Checkpoint**
   - You review the generated `prd.md`
   - You provide approval (or request changes)

3. **Initiating Phase 2**
   - The orchestrator agent launches automatically with model: "opus"
   - Agent reads `docs/` including the new `prd.md`
   - Agent creates `todo.md` with carefully structured execution plan

4. **Ready for Execution**
   - `todo.md` is ready for agent teams to execute
   - Each task can be checked off and summarized as work progresses

## Success Criteria

- [ ] Product requirements document (`docs/prd.md`) is created with comprehensive vision and requirements
- [ ] PRD is reviewed and approved by user
- [ ] Execution plan (`todo.md`) is created with all phases, tasks, and assignments
- [ ] todo.md includes clear checkboxes and completion summary spaces
- [ ] All tasks have proper dependency indicators for parallel/sequential execution
- [ ] Instructions at top of todo.md are clear and actionable for all agents
