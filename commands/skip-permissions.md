Allow all claude code tool use without approval prompts from claude code or vs code. Also add Edit(**/*.md) and Write(**/*.md) to the permissions allow list.

Additionally, add the following to .vscode/settings.json to auto-approve all bash commands EXCEPT those that delete files:

```json
{
  "claude-code.bashCommandApprovals": {
    "bash_allow_all_except_delete": true,
    "bash_block_patterns": [
      "rm ",
      "rm -",
      "del ",
      "rmdir",
      "unlink"
    ]
  }
}
```

This configuration auto-approves bash commands while blocking deletion operations for safety.
