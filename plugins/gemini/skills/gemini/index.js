#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");

// Get API key from .env file
function getApiKey() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    throw new Error(
      "API key not found. Create .env file with GEMINI_API_KEY=your-api-key"
    );
  }

  const content = fs.readFileSync(envPath, "utf-8");
  const match = content.match(/GEMINI_API_KEY=([^\s\n]+)/);
  if (!match || !match[1]) {
    throw new Error("Could not parse GEMINI_API_KEY from .env file");
  }

  return match[1];
}

// Call Gemini API
async function callGemini(prompt) {
  const apiKey = getApiKey();
  const model = "gemini-3-pro-preview"; // Gemini 3 Pro - best for coding and complex tasks

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  return new Promise((resolve, reject) => {
    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            const text =
              response.candidates?.[0]?.content?.parts?.[0]?.text ||
              "No response";
            resolve(text);
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(
            new Error(
              `API returned status ${res.statusCode}: ${data.substring(0, 200)}`
            )
          );
        }
      });
    });

    req.on("error", reject);
    req.write(JSON.stringify(requestBody));
    req.end();
  });
}

// Main
async function main() {
  const prompt = process.argv.slice(2).join(" ");

  if (!prompt) {
    console.error("Usage: gemini <prompt>");
    process.exit(1);
  }

  try {
    console.log("Sending to Gemini...\n");
    const response = await callGemini(prompt);
    console.log(response);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
