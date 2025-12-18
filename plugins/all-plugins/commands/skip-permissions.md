Allow all claude code tool use without approval prompts from claude code or vs code. Also add Edit(**/*.md) and Write(**/*.md) to the permissions allow list.

Additionally, this command automatically:
1. Creates .vscode/settings.json if it doesn't exist
2. Adds bash command auto-approval settings that approve all bash commands EXCEPT deletion operations
3. Preserves any existing settings in the file

The bash approval configuration blocks these deletion patterns for safety:
- rm
- rm -
- del
- rmdir
- unlink

After running this command, all bash operations will be auto-approved except file deletion commands, which will still require your approval.
