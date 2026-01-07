# Spec Persona

Comprehensive PMM specification analysis. This command performs an in-depth analysis of product marketing requirements, generating persona profiles and a messaging framework that power all downstream content creation.

## Prerequisites

- `docs/transcript.md` must exist with initial requirements, product context, or brain dump

## Execution Plan

### Phase 0: Context Gathering

Before launching agents, do the following:

1. **Read** `docs/transcript.md` to understand the project context

2. **Scan** the `docs/` folder for other relevant files (existing personas, messaging docs, product info, competitive intel, etc.)

3. **Ask the user**: "I found these files in docs/. Should I incorporate any of them into the analysis?"
   - List the files found
   - Let user select which to include
   - If user says none, proceed with just transcript.md

### Phase 1: Parallel Agent Analysis

Launch two agents in parallel to analyze their respective domains:

#### 1. Persona Analyst Agent

Deep analysis of target audiences using the `persona-analyst` agent.

**Input context:**
- Contents of `docs/transcript.md`
- Any additional docs user selected
- Target personas to analyze:
  - Head of RevOps
  - VP of Sales
  - Chief Revenue Officer (CRO)
  - Frontline Sales Manager

**Agent instructions:**
```
You are the persona-analyst agent. Analyze the provided context and create comprehensive persona profiles for these four personas:

1. Head of RevOps
2. VP of Sales
3. Chief Revenue Officer (CRO)
4. Frontline Sales Manager

For each persona, document:
- Role & responsibilities (what they do day-to-day)
- What they're measured on (KPIs, success metrics)
- Primary pain points (top 3, with evidence where available)
- Aspirations (what success looks like)
- Fears (what failure looks like)
- Buying behavior (triggers, research process, decision criteria)
- Communication preferences (content formats, tone, proof points they trust)
- Language to use / language to avoid

Focus on B2B SaaS sales/revenue context. If information is limited, clearly flag assumptions vs. validated insights.

Write comprehensive analysis to docs/personas.md
```

#### 2. Messaging Strategist Agent

Deep analysis of messaging framework using the `messaging-strategist` agent.

**Input context:**
- Contents of `docs/transcript.md`
- Any additional docs user selected

**Agent instructions:**
```
You are the messaging-strategist agent. Analyze the provided context and create a comprehensive messaging framework.

Produce:

1. **Positioning Statement**
   - For [target customer]
   - Who [statement of need]
   - [Product] is a [category]
   - That [key benefit]
   - Unlike [alternatives]
   - We [primary differentiation]

2. **Core Value Propositions** (3-5 pillars)
   For each:
   - The claim (one sentence)
   - Why it matters (customer problem this solves)
   - Proof points (evidence, flagged by strength)
   - Persona resonance (how to emphasize for each of the 4 personas)

3. **Proof Point Library**
   - Customer results (metrics, outcomes)
   - Third-party validation (analysts, awards)
   - Product capabilities (unique features)
   - Company credibility (logos, scale)

4. **Voice & Tone Guidelines**
   - Brand personality (we are / we are not)
   - Tone by context (thought leadership, product marketing, sales enablement)
   - Language preferences (use / avoid)
   - Writing principles

If proof points or evidence are sparse, clearly flag what's assumed vs. validated, and note what additional information would strengthen the framework.

Write comprehensive messaging framework to docs/messaging.md
```

### Phase 2: Synthesis

After both agents complete:

#### Content Strategist Synthesis

Launch a synthesis agent to integrate the outputs:

**Input context:**
- `docs/personas.md` (from Phase 1)
- `docs/messaging.md` (from Phase 1)
- Original `docs/transcript.md`

**Agent instructions:**
```
You are a content strategist synthesizing persona and messaging analysis into an actionable content strategy.

Read docs/personas.md and docs/messaging.md, then produce:

1. **Executive Summary**
   - Key personas (prioritized)
   - Core messaging pillars
   - Primary content opportunities

2. **Persona-Message Matrix**
   | Persona | Primary Pain to Address | Lead Value Prop | Key Proof Points |
   |---------|------------------------|-----------------|------------------|
   | Head of RevOps | ... | ... | ... |
   | VP of Sales | ... | ... | ... |
   | CRO | ... | ... | ... |
   | Frontline Sales Manager | ... | ... | ... |

3. **Content Priorities**
   Recommended content types/assets based on persona needs and messaging pillars.
   Prioritized by impact.

4. **Message Adaptation Guide**
   Quick reference for how to adapt core messaging for each persona.

5. **Gaps & Recommendations**
   - What's missing (proof points, persona insights, etc.)
   - Recommended next steps to strengthen the foundation

Write to docs/content-strategy.md
```

### Phase 3: Completion Report

After all agents complete, report:

1. **Files Generated:**
   - `docs/personas.md` - Persona profiles for 4 target personas
   - `docs/messaging.md` - Messaging framework with value props and proof points
   - `docs/content-strategy.md` - Synthesized content strategy

2. **Key Insights** (3-5 bullet summary of most important findings)

3. **Recommended Next Steps:**
   - Use `/persona-adapt` to customize assets for specific personas
   - Use `/messaging-refine` to polish draft content against the framework
   - Fill gaps identified in content-strategy.md

## Output Files

| File | Contents |
|------|----------|
| `docs/personas.md` | 4 persona profiles with pain points, motivations, buying behavior |
| `docs/messaging.md` | Positioning, value props, proof points, voice guidelines |
| `docs/content-strategy.md` | Synthesis with persona-message matrix and content priorities |

## Notes

- Agents use extended thinking for maximum depth
- If transcript.md is sparse, agents will flag assumptions clearly
- Run this command once to establish the foundation, then use skills for ongoing content work
- Re-run if significant new information becomes available (new personas, major positioning shift)
