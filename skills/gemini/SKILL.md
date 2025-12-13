---
name: gemini
description: Send prompts and tasks to Google Gemini using your API key. Provides an alternative AI provider directly from Claude Code for extended thinking, multimodal analysis, and specialized tasks.
license: MIT
---

# GEMINI Skill

Send prompts and tasks to Google Gemini API directly from Claude Code.

## Quick Start

1. Get API key from [Google AI Studio](https://ai.google.dev)
2. Create a `.env` file in your project root with: `GEMINI_API_KEY=your-api-key-here`
3. Add `.env` to your `.gitignore`
4. Use the skill through Claude Code

## Setup

### Get Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev)
2. Click "Get API key"
3. Copy your API key (starts with `AIzaSy`)

**Free Tier:** 5 requests/min, 25 requests/day, 1M token context

### Store Your API Key

Create `.env` in project root:

```
GEMINI_API_KEY=AIzaSy[YOUR_KEY_HERE]
```

Add to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

## Usage Examples

### Basic prompt
```
Ask Gemini to explain quantum entanglement in simple terms
```

### Code analysis
```
Ask Gemini to review this React component for performance issues
```

### Problem solving
```
Ask Gemini to break down how to implement user authentication in Node.js
```

## Available Models

- `gemini-3-pro-preview` - Best for coding and complex tasks (default)
- `gemini-2.5-pro` - Advanced reasoning and code analysis
- `gemini-2.5-flash` - Fast general-purpose tasks
- `gemini-2.5-flash-lite` - High-volume, cost-sensitive tasks

## Troubleshooting

### "API key not found"

Check your `.env` file exists and contains:
```
GEMINI_API_KEY=your-key-here
```

### Rate limit errors (429)

Free tier limits: 5 requests/min, 25 requests/day. Wait a minute or upgrade to paid tier.

## Resources

- **Get API Key**: https://ai.google.dev
- **Documentation**: https://ai.google.dev/gemini-api/docs
- **Pricing**: https://ai.google.dev/gemini-api/docs/pricing

## Notes

- API key stored in `.env` (add to `.gitignore`)
- Free tier resets daily at midnight Pacific
- Gemini 2.5 Pro is ~20x cheaper than GPT-4.5
