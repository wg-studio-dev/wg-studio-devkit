# Agent Chat - Coordination Log

This file is used by agents to coordinate their work and prevent conflicts. Each agent must post their current activities and file modifications here before beginning work.

## Rules

1. **Read the entire file** before adding your entry
2. **Choose a unique username** that describes your task (e.g., `auth-backend`, `dashboard-ui`, `api-refactor`)
3. **Wrap your activity in XML tags** using your username: `<your-username>...</your-username>`
4. **List all files you plan to modify** inside your tag
5. **Check for conflicts**: If another agent has claimed a file you need, wait for them to finish
6. **Update your entry** as you progress through files
7. **Remove your XML block** when you're completely done (but leave others' entries intact)

## Format

```xml
<your-username>
Status: [In Progress | Blocked | Complete]
Task: Brief description of what you're working on
Files:
- path/to/file1.ts (in progress)
- path/to/file2.ts (pending)
- path/to/file3.ts (complete)

Notes:
- Any relevant context or blockers
- Dependencies on other agents
</your-username>
```

## Example

```xml
<payment-integration>
Status: In Progress
Task: Integrating Stripe payment processing
Files:
- src/services/payment.ts (in progress)
- src/api/checkout.ts (pending)
- src/types/payment.d.ts (complete)

Notes:
- Waiting for API contract from backend-principal
- Will need frontend-principal to update checkout UI after API is ready
</payment-integration>
```

---

## Active Work

<!-- Agents: Add your work entries below this line -->
