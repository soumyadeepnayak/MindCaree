import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Hello",
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      }
    });
    console.log("Success:", result.text);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
