import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload limit for potential image uploads or large requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Lazy initializer for Google GenAI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST Endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

/**
 * Endpoint to structure and expand simple product details into physical features
 * and generate medium-specific prompts that guarantee consistency and no people.
 */
app.post("/api/generate-prompts", async (req, res) => {
  try {
    const { name, category, description, primaryColor, accentColor, designStyle } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: "Product name and description are required" });
    }

    const ai = getAI();

    // Construct prompt to guide Gemini in generating the detailed prompt set
    const systemInstruction = 
      "You are an elite, senior advertising prompt designer and creative director. " +
      "Your goal is to take a product description and write three separate, highly effective, visually-detailed image generation prompts for different marketing mediums: Billboard (16:9), Social Post (1:1), and Newspaper Ad (4:3).\n\n" +
      "CRITICAL MUTATIVE DIRECTIVES to enforce across all prompts:\n" +
      "1. NO PEOPLE: No human figures, models, body parts, hands, arms, silhouettes, faces, or fingers must ever appear in any image. The product is the solitary subject.\n" +
      "2. STRICT BRAND CONSISTENCY: Every medium of generation must focus on the SAME physical product with consistent details (color, material, aesthetic, branding accents). Describe the product as an exquisite physical sculpture/object itself so that the visual output matches exactly between individual shots.\n" +
      "3. FOCUS ON THE PRODUCT ONLY: Ensure the product is the hero. There should be zero decorative slop, no distracting clutter or unrelated text elements.\n" +
      "4. MEDIUM CONTEXT:\n" +
      "   - Billboard: Epic, commercial studio or ultra-premium landscape placement. Wide angles, stunning key/fill light with spotlight effects.\n" +
      "   - Social Post: Minimalist aesthetic table/surface lifestyle, pristine top-down flat-lay or diagonal desk-setup. Natural morning lighting, soft organic shadows, soft focus background.\n" +
      "   - Newspaper Ad: Elegant, highly structured, classic luxury editorial photo style, crisp professional product presentation, dramatic light-contrast, newsprint-compatible classy vignette, cinematic tone.";

    const contents = `Refine and expand the following product into a set of perfectly consistent prompts for the 'gemini-2.5-flash-image' model:
Product Name: "${name}"
Category: "${category}"
Base Description: "${description}"
Primary Palette: "${primaryColor || "Neutral Slate"}"
Accent Palette: "${accentColor || "Metallic Gold"}"
Design Vibe/Style: "${designStyle || "Minimalist Modern"}"

Provide a detailed physical product description that isolates color schemes, finishes, texture, and shape, followed by three target descriptions. Ensure you DO NOT include people or hands in any of the prompts. Ensure all results are highly focused on the object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refinedProductDescription: {
              type: Type.STRING,
              description: "A comprehensive physical description of the standalone product detailing textures, forms, branding elements, and primary colors to keep it perfectly consistent.",
            },
            billboardPrompt: {
              type: Type.STRING,
              description: "An detailed 16:9 landscape image generation prompt for a billboard ad, emphasizing studio lighting or high-end product display. Must state 'No people, no hands' and focus on the standalone product.",
            },
            socialPrompt: {
              type: Type.STRING,
              description: "An detailed 1:1 image generation prompt for a social post (flat-lay or tabletop display), emphasizing aesthetic design and clean focus. Must state 'No people, no hands' and focus on the standalone product.",
            },
            newspaperPrompt: {
              type: Type.STRING,
              description: "An detailed 4:3 newspaper editorial print advertising prompt, emphasizing sharp composition, strong lighting contrast, and high-fidelity textures. Must state 'No people, no hands' and focus on the standalone product.",
            },
          },
          required: ["refinedProductDescription", "billboardPrompt", "socialPrompt", "newspaperPrompt"],
        },
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error generating prompts:", error);
    res.status(500).json({ error: error.message || "Failed to generate prompts" });
  }
});

/**
 * Endpoint to generate a single medium advertisement image using the nano banana model (gemini-2.5-flash-image)
 */
app.post("/api/generate-medium-image", async (req, res) => {
  try {
    const { prompt, aspectRatio } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getAI();

    // Map the incoming medium ratio to supported Gemini aspect ratios
    const ratioToUse = aspectRatio === "16:9" || aspectRatio === "1:1" || aspectRatio === "4:3" || aspectRatio === "3:4" || aspectRatio === "9:16"
      ? aspectRatio
      : "1:1";

    console.log(`Generating image using gemini-2.5-flash-image. Aspect Ratio: ${ratioToUse}, prompt: ${prompt.substring(0, 100)}...`);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            text: `${prompt}. Extremely high-quality commercial photo, pristine details, professional camera focus, rich texture. Solo standalone product. Strictly NO people, NO hands, NO human parts.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: ratioToUse,
        },
      },
    });

    // Extract the image part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || "image/png";
          return res.json({ imageUrl: `data:${mimeType};base64,${base64Data}` });
        }
      }
    }

    return res.status(500).json({ error: "No image element returned from the Nano Banana model" });
  } catch (error: any) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: error.message || "Failed to generate image" });
  }
});

// Vite & Static file configurations
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

initializeServer();
