---
name: pace
description: Calculate percentage progress through weekly Claude Code usage period
---

My weekly Claude Code usage resets on **Thursday at noon Pacific**.

## Instructions

Complete these steps in order:

### Step 1: Get Current Time
IMPORTANT: NEVER assume what the current clock time is. You MUST run a bash command to get the actual current time in Pacific timezone before doing any calculations.

### Step 2: Calculate Week Progress
Calculate what percentage of the way through the weekly period we are:
- Period runs from Thursday noon Pacific to the following Thursday noon Pacific (168 hours total)
- Calculate hours elapsed since the last Thursday noon reset
- Convert to percentage

### Step 3: Ask for Usage Data
Ask the user directly in plain text (do NOT use AskUserQuestion tool):
"What's your current usage %? (Run /usage to check)"

Then wait for their response before continuing.

### Step 4: Calculate Pace Delta
Once you have the usage %, compare week progress vs actual usage:
- **Under pace**: If usage % < week progress % (you have budget room)
- **Over pace**: If usage % > week progress % (burning faster than time)
- Calculate the delta (difference between the two percentages)

### Step 5: Display Results
Show a clear summary:

```
📊 PACE CHECK
═══════════════════════════════════════

⏱️  Week Progress:  XX.X%  (X days, X hours since reset)
📈  Actual Usage:   XX.X%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📉  Delta:          +/-X.X%  [UNDER/OVER PACE]

[Visual bar showing both week progress and usage]

Next reset: Thursday, [DATE] at noon Pacific (~X hours)
```

Include a brief interpretation:
- If under pace by >10%: "Plenty of runway - you can push harder"
- If under pace by 5-10%: "Healthy buffer remaining"
- If roughly even (within 5%): "Right on track"
- If over pace by 5-10%: "Slightly ahead - maybe ease up"
- If over pace by >10%: "Burning hot - consider pacing yourself"
