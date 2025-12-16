import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { GeminiConfig } from "./config.js";

export class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private config: GeminiConfig;
  private textModel: GenerativeModel;

  constructor(config: GeminiConfig) {
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.textModel = this.genAI.getGenerativeModel({
      model: config.textModel,
    });
  }

  /**
   * Generate text content using Gemini
   */
  async generateText(prompt: string): Promise<string> {
    const result = await this.textModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  }

  /**
   * Generate HTML content using Gemini
   */
  async generateHTML(prompt: string): Promise<string> {
    const htmlPrompt = `Generate clean, valid HTML code for the following request.
Only output the HTML code, no explanations or markdown code blocks.
If CSS is needed, include it in a <style> tag within the HTML.
If JavaScript is needed, include it in a <script> tag.

Request: ${prompt}`;

    const result = await this.textModel.generateContent(htmlPrompt);
    const response = result.response;
    let html = response.text();

    // Clean up markdown code blocks if present
    html = html.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "");

    return html;
  }

  /**
   * Generate an image using Imagen via the Gemini API
   * Note: Imagen 3 is available through Google AI Studio
   */
  async generateImage(
    prompt: string,
    options: ImageGenerationOptions = {}
  ): Promise<GeneratedImage> {
    const {
      numberOfImages = 1,
      aspectRatio = "1:1",
      negativePrompt,
    } = options;

    // Use the REST API directly for Imagen as the SDK may not fully support it yet
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.config.imageModel}:predict?key=${this.config.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: prompt,
            },
          ],
          parameters: {
            sampleCount: numberOfImages,
            aspectRatio: aspectRatio,
            ...(negativePrompt && { negativePrompt }),
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json() as Record<string, unknown>;
      throw new Error(
        `Image generation failed: ${(error.error as Record<string, unknown>)?.message || JSON.stringify(error)}`
      );
    }

    const data = (await response.json()) as ImagenResponse;

    if (!data.predictions || data.predictions.length === 0) {
      throw new Error("No images were generated");
    }

    return {
      images: data.predictions.map((pred) => ({
        base64: pred.bytesBase64Encoded,
        mimeType: pred.mimeType || "image/png",
      })),
      prompt,
    };
  }

  /**
   * Generate an image using Gemini 2.0 Flash experimental image generation
   * This is an alternative method that uses the newer Gemini model
   */
  async generateImageWithGemini(prompt: string): Promise<GeneratedImage> {
    const imageModel = this.genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
    });

    const result = await imageModel.generateContent(prompt);
    const response = result.response;

    const images: { base64: string; mimeType: string }[] = [];

    // Extract inline data (images) from the response
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if ("inlineData" in part && part.inlineData) {
          images.push({
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType,
          });
        }
      }
    }

    if (images.length === 0) {
      // If no images found, try alternative parsing
      const text = response.text();
      throw new Error(
        `No images in response. Model returned: ${text.substring(0, 200)}`
      );
    }

    return {
      images,
      prompt,
    };
  }

  /**
   * Generate an image using Nano Banana Pro (Gemini 3 Pro Image)
   * Google's latest image generation model with:
   * - 2K/4K resolution support
   * - Superior text rendering
   * - Up to 14 reference images for style guidance
   */
  async generateImageWithNanoBananaPro(
    prompt: string,
    options: NanoBananaProOptions = {}
  ): Promise<GeneratedImage> {
    const {
      resolution = "2k",
      aspectRatio = "1:1",
      referenceImages = [],
      style,
      negativePrompt,
    } = options;

    // Build the request parts
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    // Add reference images first (up to 14 supported)
    const maxReferenceImages = Math.min(referenceImages.length, 14);
    for (let i = 0; i < maxReferenceImages; i++) {
      const ref = referenceImages[i];
      parts.push({
        inlineData: {
          mimeType: ref.mimeType,
          data: ref.base64,
        },
      });
    }

    // Build the prompt with style and negative prompt if provided
    let fullPrompt = prompt;
    if (style) {
      fullPrompt = `Style: ${style}\n\n${fullPrompt}`;
    }
    if (negativePrompt) {
      fullPrompt += `\n\nAvoid: ${negativePrompt}`;
    }

    parts.push({ text: fullPrompt });

    // Map resolution to uppercase K format (required by API)
    const resolutionMap: Record<string, string> = {
      "1k": "1K",
      "2k": "2K",
      "4k": "4K",
    };

    // Use REST API for Nano Banana Pro (Gemini 3 Pro Image)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${this.config.nanoBananaProModel}:generateContent?key=${this.config.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: parts,
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
            imageConfig: {
              aspectRatio: aspectRatio,
              imageSize: resolutionMap[resolution] || "2K",
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json() as Record<string, unknown>;
      throw new Error(
        `Nano Banana Pro image generation failed: ${(error.error as Record<string, unknown>)?.message || JSON.stringify(error)}`
      );
    }

    const data = await response.json() as Record<string, unknown>;
    const images: { base64: string; mimeType: string }[] = [];

    // Extract images from the response
    const candidates = (data.candidates as Array<Record<string, unknown>>) || [];
    for (const candidate of candidates) {
      const content = candidate.content as Record<string, unknown>;
      const parts = (content.parts as Array<Record<string, unknown>>) || [];
      for (const part of parts) {
        const inlineData = part.inlineData as Record<string, unknown>;
        if (inlineData) {
          images.push({
            base64: inlineData.data as string,
            mimeType: (inlineData.mimeType as string) || "image/png",
          });
        }
      }
    }

    if (images.length === 0) {
      throw new Error(
        "No images were generated. The model may have returned text instead."
      );
    }

    return {
      images,
      prompt,
    };
  }

  /**
   * Chat with Gemini - useful for conversational HTML generation
   */
  async chat(
    messages: ChatMessage[],
    systemPrompt?: string
  ): Promise<string> {
    const chat = this.textModel.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      ...(systemPrompt && {
        systemInstruction: systemPrompt,
      }),
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    return result.response.text();
  }
}

// Types
export interface ImageGenerationOptions {
  numberOfImages?: number;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  negativePrompt?: string;
}

export interface NanoBananaProOptions {
  /** Image resolution: 1k (1024x1024), 2k (2048x2048), or 4k (4096x4096) */
  resolution?: "1k" | "2k" | "4k";
  /** Aspect ratio for the generated image */
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  /** Reference images for style guidance (up to 14 images) */
  referenceImages?: Array<{
    base64: string;
    mimeType: string;
  }>;
  /** Style description (e.g., "watercolor", "photorealistic", "anime") */
  style?: string;
  /** What to avoid in the generated image */
  negativePrompt?: string;
}

export interface GeneratedImage {
  images: Array<{
    base64: string;
    mimeType: string;
  }>;
  prompt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ImagenResponse {
  predictions: Array<{
    bytesBase64Encoded: string;
    mimeType?: string;
  }>;
}
