---
description: Generate images using Google Gemini API with Nano Banana Pro, Imagen 3, or Gemini 2.0 Flash
skill_type: user
---

# Gemini Image Generation Skill

This skill allows Claude Code to generate images using Google's Gemini API. It supports multiple image generation models with different capabilities.

## Available Models

1. **Nano Banana Pro (Gemini 3 Pro Image)** - BEST quality
   - 2K/4K resolution support (up to 4096x4096)
   - Superior text rendering in images
   - Style guidance with up to 14 reference images
   - Multiple aspect ratios

2. **Imagen 3** - High quality, reliable
   - Standard 1024x1024 resolution
   - Multiple aspect ratios
   - Negative prompts

3. **Gemini 2.0 Flash** - Experimental, fast
   - Native Gemini image generation
   - Quick results

## User Request Examples

When the user asks to generate images, use this skill. Examples:
- "Generate an image of a sunset"
- "Create a logo for my coffee shop"
- "Make a 4K image of a futuristic city"
- "Generate an image in the style of watercolor"

## Instructions

When activated, you should:

1. **Determine the user's requirements**:
   - What should the image depict?
   - What model to use? (default: Nano Banana Pro for best quality)
   - What resolution? (1k, 2k, 4k - default: 2k)
   - What aspect ratio? (1:1, 3:4, 4:3, 9:16, 16:9 - default: 1:1)
   - Any style preferences?
   - Any negative prompts (what to avoid)?
   - Any reference images for style guidance?

2. **Check for API key**:
   - Verify that GEMINI_API_KEY is set in `.env` or environment
   - If not set, guide user to get one from https://aistudio.google.com/app/apikey

3. **Use the appropriate generation method**:

   **For Nano Banana Pro (recommended):**
   ```typescript
   import { generateImageWithNanoBananaPro } from './dist/index.js';

   const result = await generateImageWithNanoBananaPro(prompt, {
     resolution: "2k",  // "1k", "2k", or "4k"
     aspectRatio: "1:1",  // "1:1", "3:4", "4:3", "9:16", "16:9"
     style: "photorealistic, detailed",  // optional style description
     negativePrompt: "blurry, low quality",  // optional
     referenceImages: [  // optional, up to 14 images
       {
         base64: imageBuffer.toString('base64'),
         mimeType: 'image/png'
       }
     ]
   });
   ```

   **For Imagen 3:**
   ```typescript
   import { generateImage } from './dist/index.js';

   const result = await generateImage(prompt, {
     numberOfImages: 1,
     aspectRatio: "1:1",
     negativePrompt: "blurry, low quality"  // optional
   });
   ```

   **For Gemini 2.0 Flash:**
   ```typescript
   import { generateImageWithGemini } from './dist/index.js';

   const result = await generateImageWithGemini(prompt);
   ```

4. **Save the generated image**:
   ```typescript
   import { writeFileSync } from 'fs';

   for (let i = 0; i < result.images.length; i++) {
     const image = result.images[i];
     const buffer = Buffer.from(image.base64, 'base64');
     writeFileSync(`output-${i}.png`, buffer);
   }
   ```

5. **Report results**:
   - Inform the user where the image was saved
   - Show the prompt that was used
   - Mention the model and settings used

## CLI Alternative

You can also use the CLI commands directly:

```bash
# Nano Banana Pro (best quality)
npm run dev -- nano-banana "your prompt" -r 4k -a 16:9 -o output.png

# With style and negative prompt
npm run dev -- nano-banana "a logo" -s "minimalist, modern" --negative "complex, cluttered"

# With reference images
npm run dev -- nano-banana "a painting" --ref style1.png style2.png

# Imagen 3
npm run dev -- image "your prompt" -a 1:1 -o output.png

# Gemini 2.0 Flash
npm run dev -- image "your prompt" --use-gemini -o output.png
```

## Configuration

This skill is self-contained and includes:
- `src/config.ts` - Configuration module
- `src/gemini-client.ts` - Core Gemini client
- `src/index.ts` - Main exports
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript configuration

Environment variables (set in `.env` or shell):
- `GEMINI_API_KEY` - Required API key (get from https://aistudio.google.com/app/apikey)
- `GEMINI_MODEL` - Text generation model (default: gemini-2.0-flash-exp)
- `IMAGEN_MODEL` - Imagen model (default: imagen-3.0-generate-001)
- `NANO_BANANA_PRO_MODEL` - Nano Banana Pro model (default: gemini-3-pro-image-preview)

## Error Handling

Common errors and solutions:
- **Missing API key**: Guide user to set GEMINI_API_KEY
- **Invalid resolution**: Must be "1k", "2k", or "4k"
- **Invalid aspect ratio**: Must be one of the supported ratios
- **Too many reference images**: Maximum 14 reference images for Nano Banana Pro
- **API errors**: Check quota limits and API key validity

## Tips for Best Results

1. **Use Nano Banana Pro for**:
   - High-resolution needs (2K/4K)
   - Images with text
   - Style-guided generation
   - Professional/commercial use

2. **Use Imagen 3 for**:
   - Reliable, consistent results
   - Standard resolution needs
   - When you need negative prompts

3. **Use Gemini 2.0 Flash for**:
   - Quick prototyping
   - Experimental features

4. **Prompt writing tips**:
   - Be specific and detailed
   - Include style keywords (photorealistic, watercolor, etc.)
   - Use negative prompts to avoid unwanted elements
   - For Nano Banana Pro, leverage reference images for consistent style

## Example Workflows

### Generate a 4K logo with style reference
```typescript
import { generateImageWithNanoBananaPro } from './src/index.js';
import { readFileSync, writeFileSync } from 'fs';

// Load style reference
const styleRef = readFileSync('brand-colors.png');

const result = await generateImageWithNanoBananaPro(
  "A modern logo for 'TechFlow' startup, minimalist design with flowing lines",
  {
    resolution: "4k",
    aspectRatio: "1:1",
    style: "minimalist, modern, professional",
    negativePrompt: "cluttered, complex, vintage, ornate",
    referenceImages: [{
      base64: styleRef.toString('base64'),
      mimeType: 'image/png'
    }]
  }
);

writeFileSync('logo-4k.png', Buffer.from(result.images[0].base64, 'base64'));
```

### Quick batch generation
```typescript
import { generateImage } from './src/index.js';
import { writeFileSync } from 'fs';

const prompts = [
  "A serene mountain landscape",
  "A bustling city street at night",
  "A peaceful beach sunset"
];

for (const [index, prompt] of prompts.entries()) {
  const result = await generateImage(prompt, {
    numberOfImages: 1,
    aspectRatio: "16:9"
  });

  writeFileSync(
    `batch-${index + 1}.png`,
    Buffer.from(result.images[0].base64, 'base64')
  );
}
```
