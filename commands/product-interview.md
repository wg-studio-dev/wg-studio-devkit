---
name: product-interview
description: Conduct a product interview to refine the MVP concept based on docs/transcript.md
---

# /product-interview - Product Discovery Interview

Conduct a structured product interview to refine and validate your MVP concept before development begins.

## Overview

This command launches the product-interviewer agent to conduct a thorough discovery interview based on the contents of `docs/transcript.md`. The interview surfaces assumptions, identifies gaps, and strengthens your product concept.

## Workflow

### Step 1: Launch Product Interview

Use the Task tool to launch the product-interviewer agent:

```
Task tool with:
- subagent_type: "product-interviewer"
- prompt: |
    Read docs/transcript.md and conduct a thorough product discovery interview.

    Your goal is to help refine the product concept for a successful MVP by:
    1. Understanding the core product idea from the transcript
    2. Asking probing questions about problem validation, target users, value proposition, MVP scope, competition, go-to-market, business model, and technical feasibility
    3. Challenging assumptions and surfacing gaps
    4. Providing actionable recommendations

    Conduct an interactive interview - ask questions one at a time and follow up based on responses.

    When the interview is complete, provide a structured summary with:
    - **Summary**: 2-3 sentence summary of the product concept
    - **Strengths**: What's clear and compelling
    - **Areas Needing Clarification**: Unanswered questions and untested assumptions
    - **Recommended Next Steps**: Concrete actions to strengthen the concept
    - **MVP Recommendation**: Your suggestion for minimal viable product scope
```

### Step 2: Append Results to Transcript

After the interview completes, append the results to `docs/transcript.md`:

1. Read the current contents of `docs/transcript.md`
2. Append a new section at the bottom:

```markdown
## Product Interview Results

*Interview conducted on [current date]*

### Summary
[Agent's summary of the product concept]

### Strengths
[What's clear and compelling about the concept]

### Areas Needing Clarification
[Questions that remain unanswered or assumptions needing validation]

### Recommended Next Steps
[Concrete actions to strengthen the concept before building]

### MVP Recommendation
[Suggested minimal viable product scope]

### Key Insights from Interview
[Notable Q&A exchanges and discoveries from the interview]
```

3. Use the Edit tool to append this section to `docs/transcript.md`

## Success Criteria

- [ ] Product-interviewer agent reads and understands docs/transcript.md
- [ ] Interactive interview conducted with probing questions
- [ ] Assumptions challenged and gaps identified
- [ ] Structured results summary generated
- [ ] Results appended to docs/transcript.md under "## Product Interview Results"
- [ ] Date stamp included in results

## Prerequisites

- `docs/transcript.md` should contain product concept details (not just placeholder text)
- The more context in the transcript, the better the interview questions

## Output

The interview results will be permanently recorded in `docs/transcript.md`, creating a documented record of product discovery that can inform PRD creation and development planning.
