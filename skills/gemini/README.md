# Gemini Skill

Send prompts and tasks to Google Gemini using your API key. Provides an alternative AI provider directly from Claude Code for extended thinking, multimodal analysis, and specialized tasks.

## Dependencies

This skill uses only Node.js built-in modules and requires **no external npm dependencies**:
- `fs` (built-in)
- `path` (built-in)
- `https` (built-in)

## Setup

1. **Get a Gemini API key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key

2. **Configure the API key**
   - Create a `.env` file in your project root
   - Add your API key:
     ```
     GEMINI_API_KEY=your-api-key-here
     ```
   - **Important:** Add `.env` to your `.gitignore` to prevent committing your API key:
     ```bash
     echo ".env" >> .gitignore
     ```

3. **Make the script executable** (optional, for direct execution)
   ```bash
   chmod +x .claude/skills/gemini/index.js
   ```

## Usage

Use the skill through Claude Code:

```
Can you ask Gemini to explain this code?
```

Or invoke directly from command line:

```bash
node .claude/skills/gemini/index.js "Your prompt here"
```

## Model

Currently uses `gemini-3-pro-preview` - Google's best model for coding and complex tasks.

## Notes

- The skill reads the API key from a `.env` file in the current working directory
- Make sure not to commit your `.env` file to version control (add it to `.gitignore`)
