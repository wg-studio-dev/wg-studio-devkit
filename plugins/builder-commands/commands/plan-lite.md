---
name: plan-lite
description: Lightweight planning optimized for free-tier users - fast and cost-effective PRD and execution plan
argument-hint: "[optional: project context or additional requirements]"
---

# /plan-lite - Fast PRD and Execution Plan

Lightweight two-phase workflow optimized for speed and cost using Haiku without extended thinking.

**Phase 1:** A product-manager agent analyzes documentation in `docs/` and creates a focused product requirements document.

**Phase 2:** After your approval, an orchestrator agent uses everything in `docs/` (including the new PRD) to create a structured execution plan with task assignments.

## Workflow

### Phase 1: Generate Product Requirements Document

The product-manager agent will:
- Read all existing documentation in the `docs/` folder
- Analyze product vision, requirements, and user flows
- Create a focused `docs/prd.md` with:
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
   - The product-manager agent launches automatically with model: "haiku"
   - Agent reads all files in `docs/`
   - Agent creates focused `docs/prd.md`

2. **Approval Checkpoint**
   - You review the generated `prd.md`
   - You provide approval (or request changes)

3. **Initiating Phase 2**
   - The orchestrator agent launches automatically with model: "haiku"
   - Agent reads `docs/` including the new `prd.md`
   - Agent creates `todo.md` with structured execution plan

4. **Ready for Execution**
   - `todo.md` is ready for agent teams to execute
   - Each task can be checked off and summarized as work progresses
