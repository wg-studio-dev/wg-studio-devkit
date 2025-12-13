name: feature-driven-development
description: Generate feature list and execution plan with agent approval

---

## /plan - Generate Feature List and Execution Plan

Orchestrates a comprehensive two-phase workflow to generate a Feature List (`docs/features.md`) and then a detailed execution plan (`todo.md`) for your project.

**Phase 1:** A product-manager agent analyzes all documentation in `docs/` and creates a prioritized feature list organized by user value.

**Phase 2:** After your approval, an orchestrator agent uses everything in `docs/` (including the new feature list) to create a detailed, phased execution plan with task assignments and checkboxes.

---

### Workflow

#### Phase 1: Generate Feature List

The product-manager agent will:

- Read all existing documentation in the `docs/` folder
- Use ultra-thinking to deeply analyze from the user's perspective
- Identify distinct user outcomes (not technical tasks)
- Create a comprehensive `docs/features.md` with:

**Feature List Structure:**

Each feature follows the FDD naming convention:
> `<action> the <result> <by|for|of|to> a <object>`

For each feature, document:
- **Feature Statement:** One sentence describing the user outcome
- **User Value:** Why this matters to the user (the "so that...")
- **Acceptance Criteria:** How we know it's done (from user's perspective)
- **Size Estimate:** Small (< 1 day), Medium (1-3 days), Large (3-5 days), or Epic (break down further)
- **Dependencies:** Other features this relies on
- **Priority:** Must-have, Should-have, Nice-to-have

**Feature Organization:**
- Group features by user goal or workflow area
- Flag any "feature" that is actually a technical task (these go in a separate "Technical Enablers" section)
- Identify the Minimum Viable Feature Set for first release

---

### 🛑 CHECKPOINT 1: Feature List Review

**Stop and wait for user approval before proceeding.**

Present the completed `docs/features.md` and ask the user to verify:

**Feature Quality Checklist:**
- [ ] Each feature statement uses the FDD format: `<action> the <result> <by|for|of|to> a <object>`
- [ ] Every feature describes what a USER can do, not what the SYSTEM does
- [ ] No feature is purely technical (database, API, refactor) without a user-facing parent
- [ ] Each feature could be demoed to a non-technical stakeholder

**Scope & Size Checklist:**
- [ ] No feature is estimated larger than 5 days (Epics are broken down)
- [ ] The Minimum Viable Feature Set is clearly identified
- [ ] Dependencies between features make logical sense
- [ ] Priority rankings reflect actual user/business value

**Completeness Checklist:**
- [ ] All major user workflows are represented
- [ ] Acceptance criteria are testable (you could write a test for each one)
- [ ] Nothing critical is missing from the original requirements

**User Action Required:**
- Approve to proceed to Phase 2
- OR request specific changes (agent will revise and return to this checkpoint)

---

#### Phase 2: Generate Execution Plan

Once approved, the orchestrator agent will:

- Read all documentation in `docs/` (including the new `features.md`)
- Think hard about optimal feature sequencing based on dependencies and user value
- Create `todo.md` with the following structure:

**todo.md Structure:**

**Top Instructions Section:**
- Clear guidance that all agents should reference `docs/features.md` for context on user intent
- Instructions to check off tasks with `[x]` when complete
- Instructions to add completion summaries beneath each task
- Reminder: Each task should trace back to a feature—if it doesn't, question whether it's needed
- Checkpoint instructions for verifying feature completion

**Phases & Tasks:**
- Phases organized by feature delivery (not technical layers)
- Phase 1 should deliver the minimum viable feature set
- Each phase contains tasks labeled as `Task 1.1`, `Task 1.2`, etc.
- Each task includes:
  - Checkbox for completion tracking
  - **Parent Feature:** Which feature from `features.md` this task serves
  - Full description of objectives
  - Acceptance criteria (derived from the parent feature)
  - Agent assignment (which agent should execute)
  - Dependency indicator:
    - "Parallel work with Task X.X" for concurrent execution
    - "Sequential, after Task X.X is complete" for dependent tasks
  - Space for completion summary (filled in when agent completes task)

**Feature Completion Checkpoints:**
- After all tasks for a feature are complete, include a Feature Checkpoint
- Each Feature Checkpoint includes specific test instructions for the user

---

### 🛑 CHECKPOINT 2: Execution Plan Review

**Stop and wait for user approval before marking plan as ready.**

Present the completed `todo.md` and ask the user to verify:

**Structure Checklist:**
- [ ] Every task maps to a parent feature from `features.md`
- [ ] No orphan tasks exist (tasks without a feature parent)
- [ ] Phase 1 delivers a complete, usable minimum feature set
- [ ] Task sequencing respects feature dependencies

**Traceability Checklist:**
- [ ] You can trace any task back to a user outcome
- [ ] Technical tasks (if any) are justified by the features they enable
- [ ] Acceptance criteria in tasks match their parent feature's criteria

**Executability Checklist:**
- [ ] Tasks are small enough for a single agent session
- [ ] Parallel vs. sequential indicators are accurate
- [ ] Agent assignments make sense for the task type
- [ ] Feature Checkpoints include clear, testable verification steps

**User Action Required:**
- Approve to mark plan as ready for execution
- OR request specific changes (agent will revise and return to this checkpoint)

---

### 🛑 CHECKPOINT 3: Feature Completion Checkpoints (During Execution)

**Embedded in `todo.md` after each feature's tasks are complete.**

Each Feature Checkpoint in the execution plan will include:

**For the User to Test:**

1. **Functional Verification**
   - Step-by-step instructions to exercise the feature as an end user
   - Specific inputs to try and expected outputs
   - Edge cases to test (empty states, errors, boundaries)

2. **Acceptance Criteria Validation**
   - Checklist of each acceptance criterion from `features.md`
   - How to verify each criterion is met
   - What "done" looks like for this feature

3. **Integration Check**
   - Does this feature work with previously completed features?
   - Any regressions in existing functionality?
   - Does the user flow feel coherent?

4. **User Value Confirmation**
   - Can you actually accomplish the user goal this feature enables?
   - Would you demo this to a stakeholder right now?
   - Is anything missing that would block real usage?

**Feature Checkpoint Format in todo.md:**