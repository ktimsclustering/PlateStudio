import React, { useState } from "react";
import { ProductDetails } from "../types";
import { Sparkles, Palette, PenTool, Compass, HelpCircle, Laptop, Settings, Sliders } from "lucide-react";

interface ProductFormProps {
  onSubmit: (details: ProductDetails) => void;
  isLoading: boolean;
}

// Creative multi-shot presets to guide the user towards consistent image compositions
const PRODUCT_PRESETS: Array<{ label: string; details: ProductDetails }> = [
  {
    label: "🕶️ Augmented Reality AI Glasses",
    details: {
      name: "Iris One",
      category: "Smart Gadgets",
      description: "Sleek matte-black wraparound augmented reality sports glasses with iridescent glowing blue lenses. The titanium temples have thin golden circuitry detailing. Designed with minimalist aerodynamic lines and dynamic digital HUD projections near the outer frame, showing no people or face, sitting isolated on a modern concrete pedestal.",
      primaryColor: "#0f0f11",
      accentColor: "#EBFF00",
      designStyle: "Industrial Cyberpunk",
    },
  },
  {
    label: "🌌 Cyberpunk Cyber-Monitor Headphones",
    details: {
      name: "Aether One",
      category: "Audio Technology",
      description: "Sleek matte-black over-ear headphones with delicate bronze laser-etched circuit lines running along the earcups. Features a geometric carbon-fiber headband wrapped in breathable grey grip meshes. No text, sitting isolated.",
      primaryColor: "#0f0f12",
      accentColor: "#ea580c",
      designStyle: "Industrial Cyberpunk",
    },
  },
  {
    label: "✨ Premium Geometric Perfume Bottle",
    details: {
      name: "Lumina Bloom",
      category: "Luxury Cosmetics",
      description: "An elegant, heavy geometric glass perfume flacon with structural diamond corners. Inside is a glowing amber twilight liquid perfume. The thick gold metallic spray topper is hexagonal. Brand logo is engraved flat, with zero front labels.",
      primaryColor: "#ffffff",
      accentColor: "#eab308",
      designStyle: "Heritage Luxury",
    },
  },
  {
    label: "🏔️ Technical Eco-Trail Water Flask",
    details: {
      name: "Svalbard Glacier",
      category: "Outdoor Equipment",
      description: "A rugged, thick matte-olive insulated stainless steel water flask. The exterior has a high-integrity sandblasted gravel texture. It features a modern wide-mouth magnetic lid in sand-beige and an integrated anodized aluminum loop.",
      primaryColor: "#1e3a1e",
      accentColor: "#d1a153",
      designStyle: "Organic / Neo-Eco",
    },
  },
  {
    label: "⚡ Solar Chronograph Watch Block",
    details: {
      name: "Apex Solar",
      category: "Timepieces",
      description: "A heavy brushed titanium watch with an minimalist circular bezel, displaying a dark obsidian solar dial and bright orange watch hands. Connected to a structured olive vulcanized rubber strap with custom matte-black steel buckles.",
      primaryColor: "#171717",
      accentColor: "#ea580c",
      designStyle: "Modern Minimalist",
    },
  },
];

const STYLE_SETTINGS = [
  { value: "Modern Minimalist", label: "Modern Minimalist", desc: "Clean lines, wide empty spaces, studio shadows" },
  { value: "Industrial Cyberpunk", label: "Industrial Cyberpunk", desc: "High contrast, dark metallic finishes, ambient lights" },
  { value: "Heritage Luxury", label: "Heritage Luxury", desc: "Warm stone, rich velvet, rich textures, golden ratios" },
  { value: "Organic / Neo-Eco", label: "Organic / Eco-friendly", desc: "Earth-toned clays, natural textures, soft sun rays" },
  { value: "Retro Futuristic", label: "Retro Futuristic", desc: "Matte plastics, rounded offsets, warm analog pastel hues" },
];

const PRESET_COLORS = [
  { name: "Matte Black", hex: "#0f0f11", text: "text-white" },
  { name: "Arctic Ice", hex: "#e2e8f0", text: "text-neutral-900" },
  { name: "Sand Dune", hex: "#e4d0b7", text: "text-neutral-900" },
  { name: "Glacier Spruce", hex: "#2b4c3f", text: "text-white" },
  { name: "Sunset Crimson", hex: "#991b1b", text: "text-white" },
  { name: "Solar Orange", hex: "#ea580c", text: "text-white" },
];

export default function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
  // Mode selector: "guided" for step form, "freeform" for raw typing
  const [inputMode, setInputMode] = useState<"guided" | "freeform">("guided");

  const [details, setDetails] = useState<ProductDetails>({
    name: "Iris One",
    category: "Smart Gadgets",
    description: "Sleek matte-black wraparound augmented reality sports glasses with iridescent glowing blue lenses. The titanium temples have thin golden circuitry detailing. Designed with minimalist aerodynamic lines and dynamic digital HUD projections near the outer frame, showing no people or face, sitting isolated on a modern concrete pedestal.",
    primaryColor: PRESET_COLORS[0].hex,
    accentColor: "#EBFF00",
    designStyle: "Industrial Cyberpunk",
  });

  const handleApplyPreset = (preset: ProductDetails) => {
    setDetails({ ...preset });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (field: "primaryColor" | "accentColor", hex: string) => {
    setDetails((prev) => ({ ...prev, [field]: hex }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name.trim() || !details.description.trim()) return;
    onSubmit(details);
  };

  const selectCustomCategory = (cat: string) => {
    setDetails((prev) => ({ ...prev, category: cat }));
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-none p-6 shadow-2xl relative overflow-hidden" id="product-form-container">
      {/* Decorative stark header line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand"></div>

      {/* Main Title Section */}
      <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <PenTool className="h-4 w-4 text-brand" />
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-white">
            1. Define Product Concept
          </h2>
        </div>
        <span className="text-[8px] font-mono text-brand font-bold bg-brand/5 border border-brand/20 px-2 py-0.5 tracking-wider">
          V_IMAGE_2.5_COMPATIBLE
        </span>
      </div>

      {/* Interactive Mode Tabs to grant custom open-ended freedom */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-black border border-white/10 rounded-none mb-6">
        <button
          type="button"
          onClick={() => setInputMode("guided")}
          className={`flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase font-bold tracking-widest transition-all ${
            inputMode === "guided" 
              ? "bg-brand text-black font-black" 
              : "text-white/40 hover:text-white"
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          Guided Form
        </button>
        <button
          type="button"
          onClick={() => setInputMode("freeform")}
          className={`flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase font-bold tracking-widest transition-all ${
            inputMode === "freeform" 
              ? "bg-brand text-black font-black" 
              : "text-white/40 hover:text-white"
          }`}
        >
          <Laptop className="h-3.5 w-3.5" />
          Freeform Text
        </button>
      </div>

      {/* Presets segment only is showcased if in Guided Mode */}
      {inputMode === "guided" && (
        <div className="mb-6 bg-white/5 p-4 rounded-none border border-white/10">
          <div className="flex items-center gap-1.5 mb-3">
            <Compass className="h-3.5 w-3.5 text-brand" />
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Quick-Launch Creative Presets:</span>
          </div>
          <div className="flex flex-col gap-2">
            {PRODUCT_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p.details)}
                disabled={isLoading}
                className={`text-xs text-left px-3 py-2.5 rounded-none border transition-all duration-150 ${
                  details.name === p.details.name && inputMode === "guided"
                    ? "bg-brand/5 border-brand text-brand font-bold"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30"
                }`}
                id={`preset-btn-${idx}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {inputMode === "freeform" && (
        <div className="mb-6 bg-brand/5 p-4 rounded-none border border-brand/20">
          <div className="flex items-start gap-2 text-brand">
            <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-black block">Absolute Open-Ended Mode</span>
              <p className="text-[10px] text-white/70 leading-relaxed font-sans normal-case">
                Type any custom product description with absolute freedom. You are not limited by preset specs. Express your creative vision down to textures, glowing parameters, and materials.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actual Form submission area */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custom Product Name */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2" htmlFor="product-name">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              name="name"
              value={details.name}
              onChange={handleChange}
              placeholder="e.g. My Custom Gear-X"
              required
              disabled={isLoading}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand rounded-none px-4 py-3 text-sm text-white focus:outline-none transition duration-150 font-mono"
            />
          </div>

          {/* Fully open text input for Industry Category to avoid limitation */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2" htmlFor="product-category">
              Industry / Concept Category
            </label>
            {inputMode === "freeform" ? (
              <input
                type="text"
                id="product-category"
                name="category"
                value={details.category}
                onChange={handleChange}
                placeholder="e.g. Cybernetic Gear"
                required
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand rounded-none px-4 py-3 text-sm text-white focus:outline-none transition duration-150 font-mono"
              />
            ) : (
              <div className="relative">
                <select
                  id="product-category"
                  name="category"
                  value={details.category}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-[#111] border border-white/10 hover:border-white/20 focus:border-brand rounded-none px-4 py-3 text-sm text-neutral-300 focus:outline-none transition duration-150 appearance-none cursor-pointer font-mono"
                >
                  <option value="Audio Technology">Audio Technology</option>
                  <option value="Luxury Cosmetics">Luxury Cosmetics</option>
                  <option value="Outdoor Equipment">Outdoor Equipment</option>
                  <option value="Timepieces">Timepieces</option>
                  <option value="Beverages">Beverages & Spirits</option>
                  <option value="Smart Gadgets">Smart Tech Gadgets</option>
                  <option value="Luxury Apparel">Apparel & Accessories</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                  <span className="text-[10px]">▼</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Category Suggestions in Freeform Mode to assist user */}
        {inputMode === "freeform" && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[8px] font-mono uppercase tracking-widest text-white/30 mr-1">Suggestions:</span>
            {["Smart Gadgets", "Audio Devices", "Wearables", "Automotive", "Cybergear", "AeroTech"].map((suggest) => (
              <button
                key={suggest}
                type="button"
                onClick={() => selectCustomCategory(suggest)}
                className={`text-[9px] font-mono tracking-wider border px-2 py-0.5 uppercase transition ${
                  details.category === suggest
                    ? "bg-brand/10 border-brand text-brand"
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                }`}
              >
                {suggest}
              </button>
            ))}
          </div>
        )}

        {/* Product Physical Description - Becomes a freeform concept prompt box for unlimited options */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold" htmlFor="product-description">
              {inputMode === "freeform" ? "Describe Anything (Open-Ended Concept Specifications)" : "Physical Description & Material Finishes"}
            </label>
            <span className="text-[9px] font-mono text-brand tracking-wider uppercase font-bold">
              {inputMode === "freeform" ? "INFINITE CREATIVE RANGE" : "SPECIFICITY REQD"}
            </span>
          </div>
          <textarea
            id="product-description"
            name="description"
            value={details.description}
            onChange={handleChange}
            placeholder={
              inputMode === "freeform"
                ? "Describe your custom product in absolute raw terms. Example: Sleek cyberpunk holographic sunglasses made of lightweight alloy, with electric amber circuit paths on the temples and glowing golden display visor on a clean laboratory base. No text, zero people."
                : "Describe the physical form: e.g. A cylindrical titanium flask in matte-sand gravel texture with an integrated copper-colored lock screw-cap. Sitting purely isolated on a studio surface. No text labels."
            }
            required
            rows={inputMode === "freeform" ? 5 : 4}
            disabled={isLoading}
            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-brand rounded-none px-4 py-3 text-sm text-white focus:outline-none transition duration-150 resize-y leading-relaxed"
          />
          <p className="mt-2 text-[10px] text-white/40 tracking-wider uppercase font-mono">
            ⚠️ HUMAN_DETECTION_FILTER: ACTIVE / HUMAN SHAPES WILL AUTOMATICALLY FAIL RENDER
          </p>
        </div>

        {/* Brand Theme Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Primary Color */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2.5">
              Primary Finish / Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primaryColor"
                value={details.primaryColor}
                onChange={handleChange}
                disabled={isLoading}
                className="w-10 h-10 rounded-none bg-neutral-950 border border-white/10 cursor-pointer overflow-hidden p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0"
              />
              <div className="flex-1 flex gap-1.5">
                {PRESET_COLORS.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleColorSelect("primaryColor", c.hex)}
                    disabled={isLoading}
                    className={`w-6 h-6 rounded-none hover:scale-110 active:scale-95 transition-all text-[8px] flex items-center justify-center font-bold border border-white/10 ${c.text}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {details.primaryColor === c.hex ? "✓" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2.5">
              Branding Accent Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="accentColor"
                value={details.accentColor}
                onChange={handleChange}
                disabled={isLoading}
                className="w-10 h-10 rounded-none bg-neutral-950 border border-white/10 cursor-pointer overflow-hidden p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0"
              />
              <div className="flex-1 flex gap-1.5">
                {PRESET_COLORS.map((c, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleColorSelect("accentColor", c.hex)}
                    disabled={isLoading}
                    className={`w-6 h-6 rounded-none hover:scale-110 active:scale-95 transition-all text-[8px] flex items-center justify-center font-bold border border-white/10 ${c.text}`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {details.accentColor === c.hex ? "✓" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Design Vibe / Style Preset */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2.5">
            Overall Design Vibe & Environment Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {STYLE_SETTINGS.map((style) => (
              <button
                key={style.value}
                type="button"
                onClick={() => setDetails((prev) => ({ ...prev, designStyle: style.value }))}
                disabled={isLoading}
                className={`text-left p-3.5 rounded-none border transition-all duration-150 flex flex-col justify-between ${
                  details.designStyle === style.value
                    ? "bg-brand/5 border-brand text-white ring-1 ring-brand/10"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-white/50"
                }`}
                id={`vibe-btn-${style.value.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <span className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                  <Palette className={`h-3.5 w-3.5 ${details.designStyle === style.value ? "text-brand" : "text-white/40"}`} />
                  {style.label}
                </span>
                <span className="text-[10px] text-white/40 leading-tight block font-sans">
                  {style.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isLoading || !details.name.trim() || !details.description.trim()}
          className={`w-full font-display font-black text-xs uppercase tracking-widest py-4 rounded-none border transition-all duration-150 ${
            isLoading
              ? "bg-[#222] border-white/10 text-white/20 cursor-not-allowed"
              : "bg-brand border-brand text-black hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99] font-bold"
          }`}
          id="btn-generate-campaign"
        >
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>{isLoading ? "CALIBRATING BRAND CONSISTENCY..." : "COORDINATE MULTI-MEDIUM CAMPAIGN"}</span>
        </button>
      </form>
    </div>
  );
}
