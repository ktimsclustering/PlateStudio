/**
 * Shared types for the Marketing Materials Generator
 */

export interface ProductDetails {
  name: string;
  category: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  designStyle: string; // e.g. "Minimalist", "Cyberpunk", "Vintage Luxury", "Organic / Eco"
}

export interface PromptSet {
  refinedProductDescription: string;
  billboardPrompt: string;
  socialPrompt: string;
  newspaperPrompt: string;
}

export interface GeneratedMedium {
  type: "billboard" | "social" | "newspaper";
  title: string;
  aspectRatio: "16:9" | "1:1" | "4:3";
  prompt: string;
  imageUrl?: string;
  loading: boolean;
  error?: string;
}

export interface MarketingCampaign {
  id: string;
  product: ProductDetails;
  prompts: PromptSet;
  mediums: {
    billboard: GeneratedMedium;
    social: GeneratedMedium;
    newspaper: GeneratedMedium;
  };
  createdAt: string;
}
