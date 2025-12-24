# Spec Heavy Analysis Command

Comprehensive specification analysis with extended thinking. This command performs an in-depth analysis of the current project using Opus with extended thinking enabled for maximum depth and insight.

## Execution Plan

### Phase 1: Parallel Agent Analysis

Launch two agents in parallel to analyze their respective domains:

1. **Backend Agent** - Deep analysis with extended thinking on backend architecture:
   - Examine the project structure and requirements
   - Consider scalability, performance, data models, and API design
   - Identify key technical decisions and patterns
   - Write comprehensive analysis to `docs/backend.md`

2. **Frontend Agent** - Deep analysis with extended thinking on frontend architecture:
   - Examine the project structure and requirements
   - Consider user experience, component architecture, and state management
   - Identify UI/UX patterns and component structure
   - Write comprehensive analysis to `docs/frontend.md`

### Phase 2: Architect Synthesis

After both agents complete:

1. **Architect Agent** - Deep synthesis with extended thinking:
   - Read both `docs/backend.md` and `docs/frontend.md`
   - Consider overall system architecture, data flow, and integration points
   - Write comprehensive architecture specification to `docs/architecture.md`

## Next Steps

Execute this command by using the Task tool to orchestrate:
1. Launch backend-agent and frontend-agent in parallel with model: "opus"
2. Wait for completion
3. Launch architect agent with full context from phase 1 and model: "opus"
4. Report completion status with paths to generated documents
