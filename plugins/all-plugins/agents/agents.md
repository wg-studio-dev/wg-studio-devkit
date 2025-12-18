# Agent Behavior Guidelines

This document outlines the standard operating procedures for all agents working in this repository. Following these guidelines ensures safe, coordinated, and high-quality contributions.

## Checklist for Every Task

Follow this checklist **in order** whenever you work on the repository:

### 1. Read the README

Refresh yourself on the project goals, structure, scripts, and prerequisites in [README.md](../README.md).

### 2. Sync in AGENT_CHAT

Check [AGENT_CHAT.md](agent_chat.md) for in-progress work so you avoid conflicts.

- Read the **entire file** before adding anything
- Pick a short, task-themed username (e.g., `draggable-window`, `auth-backend`, `csv-export`)
- Wrap your plan/updates in a matching XML tag: `<your-username>…</your-username>`
- Inside that tag, clearly list the **files you expect to modify** and keep your running plan/progress notes there
- **If another agent already claimed a file you need**, wait until they remove their tag before beginning work on it
- When you finish, **remove only the XML block you added**—leave other agents' entries intact

### 3. Research the Codebase

Inspect the files relevant to your task **before editing**. Trace current implementations to understand existing behavior and dependencies.

- If you need documentation for third-party APIs or libraries, use the Parallel MCP web search to gather the latest references before coding
- When you hit runtime or tooling errors, search the web with Parallel first to collect fixes or known workarounds before resorting to trial-and-error debugging

### 4. Plan Appropriately

- **For large changes**: Draft a clear plan and get confirmation from the requester before coding
- **For small or straightforward tasks**: Form a quick mental or written plan and move straight to implementation

### 5. Execute the Plan

Apply the necessary code changes, keeping diffs focused and well-explained with minimal but helpful comments when needed.

### 6. Run the Full Verification Suite

Execute `bun run verify`. Address any failures before proceeding.

### 7. Add or Update Tests

- **Before committing any long-term or automated tests**, run an ad-hoc Playwright pass against your existing dev server:
  ```bash
  PLAYWRIGHT_SKIP_WEB_SERVER=1 bunx playwright test
  ```
  Use `--headed` if you want to watch the run. This smoke check should catch console errors or obvious regressions while you iterate.
- Ensure new behavior is covered by automated tests
- Run `bun run verify` again after adding tests

### 8. Review Documentation

Re-read [README.md](../README.md). If the change affects setup, usage, or workflows, update the documentation accordingly.

## Additional Rules

- **Never run `bun run dev` or `bun run build`**: The dev server is handled externally, and `bun run verify` is used to validate changes
- **Keep AGENT_CHAT.md tidy**: Only edit your own notes, and clear them when you wrap up
- **Communicate clearly**: Use the XML format in AGENT_CHAT to make your intentions obvious
- **Respect boundaries**: Don't modify files claimed by other agents
- **Clean up after yourself**: Remove your AGENT_CHAT entry when done

## Coordination Pattern

```
┌─────────────────────────────────────────────────────┐
│ 1. Read README                                      │
│ 2. Check AGENT_CHAT for conflicts                  │
│ 3. Post your plan with file claims                 │
│ 4. Research codebase & dependencies                │
│ 5. Execute changes                                 │
│ 6. Run verification suite                          │
│ 7. Add/update tests                                │
│ 8. Update documentation                            │
│ 9. Remove your AGENT_CHAT entry                    │
└─────────────────────────────────────────────────────┘
```

## When Conflicts Arise

If you need a file that another agent has claimed:

1. Check their status in AGENT_CHAT
2. If they're blocked or taking too long, communicate through AGENT_CHAT by adding a note in your entry
3. Consider working on a different part of your task first
4. Wait for them to release the file before claiming it

## Quality Standards

- Write clean, maintainable code
- Add comments only where logic isn't self-evident
- Ensure all tests pass
- Update documentation for user-facing changes
- Follow existing code style and patterns

---

Following these steps helps keep the project stable and makes future collaboration smoother.
