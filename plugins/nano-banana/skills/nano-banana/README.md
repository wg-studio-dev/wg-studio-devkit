# Gemini Image Generation Skill

This is a self-contained Claude Code skill for generating images using Google's Gemini API. It supports multiple image generation models:

- **Nano Banana Pro (Gemini 3 Pro Image)** - Best quality with 2K/4K resolution
- **Imagen 3** - High-quality, reliable image generation
- **Gemini 2.0 Flash** - Fast experimental image generation

## Installation

### For a new project

1. Copy this entire folder (`.claude/skills/gemini-image`) to your project's `.claude/skills/` directory

2. Install dependencies:
```bash
cd .claude/skills/gemini-image
npm install
```

3. Set up your API key:
```bash
# Copy the example .env file
cp .env.example .env

# Edit .env and add your Gemini API key
GEMINI_API_KEY=your_actual_api_key_here
```

Get a free API key from: https://aistudio.google.com/app/apikey

4. Build the TypeScript code:
```bash
npm run build
```

## Usage in Claude Code

In your Claude Code project, you can import and use the functions from this skill:

```typescript
import { generateImageWithNanoBananaPro, generateImage, generateImageWithGemini } from './.claude/skills/gemini-image/dist/index.js';

// Generate a 4K image with Nano Banana Pro
const result = await generateImageWithNanoBananaPro("A sunset over mountains", {
  resolution: "4k",
  aspectRatio: "16:9"
});

// Save the image
const buffer = Buffer.from(result.images[0].base64, 'base64');
await writeFileSync('output.png', buffer);
```

## Available Functions

### `generateImageWithNanoBananaPro(prompt, options?)`

Generate high-quality images with 2K/4K support.

**Options:**
- `resolution`: "1k" | "2k" | "4k" (default: "2k")
- `aspectRatio`: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" (default: "1:1")
- `referenceImages`: Array of reference images (up to 14) for style guidance
- `style`: Style description (e.g., "photorealistic", "watercolor")
- `negativePrompt`: What to avoid in the image

### `generateImage(prompt, options?)`

Generate images using Imagen 3 model.

**Options:**
- `numberOfImages`: Number of images to generate (default: 1)
- `aspectRatio`: "1:1" | "3:4" | "4:3" | "9:16" | "16:9"
- `negativePrompt`: What to avoid in the image

### `generateImageWithGemini(prompt)`

Generate images using Gemini 2.0 Flash (experimental).

## Configuration

Environment variables can be set in `.env` or your shell:

- `GEMINI_API_KEY` - Required API key
- `GEMINI_MODEL` - Text model for processing (default: gemini-2.0-flash-exp)
- `IMAGEN_MODEL` - Imagen model to use (default: imagen-3.0-generate-001)
- `NANO_BANANA_PRO_MODEL` - Nano Banana Pro model (default: gemini-3-pro-image-preview)

## File Structure

```
.claude/skills/gemini-image/
├── SKILL.md              # Claude Code skill definition
├── README.md             # This file
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Example environment variables
├── .gitignore            # Files to ignore (includes .env and dist/)
└── src/
    ├── index.ts          # Main exports
    ├── config.ts         # Configuration loading
    └── gemini-client.ts   # Core Gemini API client
```

After building, the compiled JavaScript will be in the `dist/` folder.

## Dependencies

- `@google/generative-ai` - Google's Gemini API client
- `dotenv` - Environment variable loading
- `typescript` - TypeScript compiler (dev dependency)
- `@types/node` - Node.js type definitions (dev dependency)

## Troubleshooting

### "GEMINI_API_KEY environment variable is required"
- Make sure you have a valid API key from https://aistudio.google.com/app/apikey
- Check that your `.env` file exists and contains `GEMINI_API_KEY=your_key`
- If using shell environment, make sure to export: `export GEMINI_API_KEY=your_key`

### "No images were generated"
- Check that your API key has sufficient quota
- Try with a different model (Imagen 3 is more stable than Nano Banana Pro)
- Simplify your prompt

### TypeScript compilation errors
- Run `npm install` to ensure dependencies are installed
- Make sure `tsconfig.json` is present in the skill directory

## Tips for Best Results

1. **Use Nano Banana Pro for:**
   - High-resolution needs (2K/4K)
   - Images with text or fine details
   - Style-guided generation with reference images
   - Professional/commercial use

2. **Use Imagen 3 for:**
   - Reliable, consistent results
   - Standard resolution needs (1024x1024)
   - When you need negative prompts

3. **Write better prompts:**
   - Be specific and detailed
   - Include style keywords (photorealistic, watercolor, etc.)
   - Use negative prompts to avoid unwanted elements
   - For Nano Banana Pro, use reference images for consistent style

## License

MIT
