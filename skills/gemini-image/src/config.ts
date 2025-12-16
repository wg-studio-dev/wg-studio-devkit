import { config as dotenvConfig } from "dotenv";

// Load environment variables from .env file
dotenvConfig();

export interface GeminiConfig {
  apiKey: string;
  textModel: string;
  imageModel: string;
  nanoBananaProModel: string;
}

export function getConfig(): GeminiConfig {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY environment variable is required.\n" +
        "Get your API key from: https://aistudio.google.com/app/apikey\n" +
        "Then set it in your .env file or export it: export GEMINI_API_KEY=your_key"
    );
  }

  return {
    apiKey,
    textModel: process.env.GEMINI_MODEL || "gemini-2.0-flash-exp",
    imageModel: process.env.IMAGEN_MODEL || "imagen-3.0-generate-001",
    nanoBananaProModel: process.env.NANO_BANANA_PRO_MODEL || "gemini-3-pro-image-preview",
  };
}
