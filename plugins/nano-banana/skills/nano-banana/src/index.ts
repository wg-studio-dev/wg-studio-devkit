// Main exports for programmatic use
export { GeminiClient } from "./gemini-client.js";
export { getConfig } from "./config.js";
export type {
  GeminiConfig,
} from "./config.js";
export type {
  ImageGenerationOptions,
  NanoBananaProOptions,
  GeneratedImage,
  ChatMessage,
} from "./gemini-client.js";

// Quick helper functions
import { getConfig } from "./config.js";
import { GeminiClient } from "./gemini-client.js";

let defaultClient: GeminiClient | null = null;

function getDefaultClient(): GeminiClient {
  if (!defaultClient) {
    defaultClient = new GeminiClient(getConfig());
  }
  return defaultClient;
}

/**
 * Generate text using Gemini
 */
export async function generateText(prompt: string): Promise<string> {
  return getDefaultClient().generateText(prompt);
}

/**
 * Generate HTML using Gemini
 */
export async function generateHTML(prompt: string): Promise<string> {
  return getDefaultClient().generateHTML(prompt);
}

/**
 * Generate an image using Imagen
 */
export async function generateImage(
  prompt: string,
  options?: {
    numberOfImages?: number;
    aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
    negativePrompt?: string;
  }
) {
  return getDefaultClient().generateImage(prompt, options);
}

/**
 * Generate an image using Gemini 2.0 Flash
 */
export async function generateImageWithGemini(prompt: string) {
  return getDefaultClient().generateImageWithGemini(prompt);
}

/**
 * Generate an image using Nano Banana Pro (Gemini 3 Pro Image)
 * Google's latest and most capable image generation model
 */
export async function generateImageWithNanoBananaPro(
  prompt: string,
  options?: {
    resolution?: "1k" | "2k" | "4k";
    aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
    referenceImages?: Array<{ base64: string; mimeType: string }>;
    style?: string;
    negativePrompt?: string;
  }
) {
  return getDefaultClient().generateImageWithNanoBananaPro(prompt, options);
}
