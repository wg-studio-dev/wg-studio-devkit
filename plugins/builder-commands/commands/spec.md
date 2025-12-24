# Spec Analysis Command

This command performs a comprehensive specification analysis of the current project by having specialized agents analyze the backend and frontend separately, then synthesizing those insights into an overall architecture.

## Execution Plan

### Phase 1: Parallel Agent Analysis

Launch two agents in parallel to analyze their respective domains:

1. **Backend Agent** - Analyze backend architecture:
   - Examine the project structure and requirements
   - Consider scalability, performance, data models, and API design
   - Identify key technical decisions and patterns
   - Write comprehensive analysis to `docs/backend.md`

2. **Frontend Agent** - Analyze frontend architecture:
   - Examine the project structure and requirements
   - Consider user experience, component architecture, and state management
   - Identify UI/UX patterns and component structure
   - Write comprehensive analysis to `docs/frontend.md`

### Phase 2: Architect Synthesis

After both agents complete:

1. **Architect Agent** - Synthesize the architecture:
   - Read both `docs/backend.md` and `docs/frontend.md`
   - Consider how backend and frontend integrate
   - Consider overall system architecture, data flow, and integration points
   - Write comprehensive architecture specification to `docs/architecture.md`

## Next Steps

Execute this command by using the Task tool to orchestrate:
1. Launch backend-agent and frontend-agent in parallel
2. Wait for completion
3. Launch architect agent with full context from phase 1
4. Report completion status with paths to generated documents
