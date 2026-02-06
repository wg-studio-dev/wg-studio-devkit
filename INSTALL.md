# Installation Guide

Quick guide to install plugins from the 0wg Studio DevKit marketplace.

## Prerequisites

- Claude Code CLI installed and configured
- Git (for cloning the repository)

## Installation Methods

### Method 1: From Marketplace (Recommended)

```bash
# Add the wg-studio marketplace
/plugin marketplace add wg-studio-dev/wg-studio-devkit

# Install individual plugins
/plugin install plan-heavy@wg-studio
/plugin install gemini@wg-studio
/plugin install frontend-imitate@wg-studio
```

### Method 2: Local Installation

For development or testing:

```bash
git clone https://github.com/wg-studio-dev/wg-studio-devkit.git
cd wg-studio-devkit

/plugin marketplace add ./
/plugin install plan-heavy@wg-studio
```

## Post-Installation Setup

### Configure Gemini (Optional)

If you installed the Gemini or Nano Banana plugin:

```bash
# Get API key from https://ai.google.dev
echo "GEMINI_API_KEY=your-api-key-here" > .env
echo ".env" >> .gitignore
```

### Verify Installation

```bash
/help

# You should see installed commands like:
# - /plan-heavy
# - /ralph-heavy
```

## Available Plugins

| Plugin | Type | Description |
|--------|------|-------------|
| **cc-research** | skill | Scrape r/ClaudeCode for tips and techniques |
| **frontend-imitate** | skill | Imitate website designs |
| **gemini** | skill | Google Gemini integration |
| **nano-banana** | skill | Gemini Nano Banana image generation |
| **ralph-heavy** | command | Ralph with learning loops |
| **plan-heavy** | command + agents | Deep planning with Opus extended thinking |

## Troubleshooting

### Plugin Not Loading

```bash
/plugin list
/plugin marketplace list

# Reinstall if needed
/plugin uninstall plan-heavy@wg-studio
/plugin install plan-heavy@wg-studio
```

## Updating

```bash
/plugin update plan-heavy@wg-studio
```

## Support

- Issues: [GitHub Issues](https://github.com/wg-studio-dev/wg-studio-devkit/issues)
- Email: wilson@0wg.studio
