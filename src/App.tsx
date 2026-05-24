import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import MediumCard from "./components/MediumCard";
import GenerationProgress from "./components/GenerationProgress";
import { ProductDetails, MarketingCampaign } from "./types";
import { Sparkles, EyeOff, Check, Cpu, Image as ImageIcon, Award, Info, RefreshCw, AlertTriangle, X } from "lucide-react";

export default function App() {
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState({ billboard: false, social: false, newspaper: false });
  const [campaign, setCampaign] = useState<MarketingCampaign | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showApiInfo, setShowApiInfo] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "billboard" | "social" | "newspaper">("all");

  // Check backend server connection and API Key status on load
  const [apiStatus, setApiStatus] = useState<{ checked: boolean; hasKey: boolean; error?: string }>({
    checked: false,
    hasKey: false,
  });

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("Backend server check failed");
        return res.json();
      })
      .then((data) => {
        setApiStatus({ checked: true, hasKey: data.hasApiKey });
        if (!data.hasApiKey) {
          setError("GEMINI_API_KEY is not defined. Please add Gemini API keys inside Settings > Secrets panel before starting.");
        }
      })
      .catch((err) => {
        setApiStatus({ checked: true, hasKey: false, error: err.message });
      });
  }, []);

  const handleGenerateCampaign = async (details: ProductDetails) => {
    setError(null);
    setIsGeneratingPrompts(true);
    setCampaign(null);

    try {
      // 1. Generate Prompts via /api/generate-prompts
      const promptRes = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      if (!promptRes.ok) {
        const errData = await promptRes.json();
        throw new Error(errData.error || "Failed to generate brand-consistent prompts. Please verify your GEMINI_API_KEY on the server.");
      }

      const prompts = await promptRes.json();
      setIsGeneratingPrompts(false);

      // Immediately construct campaign structure with loading states so previews can render the generated prompts
      const initialCampaign: MarketingCampaign = {
        id: Date.now().toString(),
        product: details,
        prompts,
        mediums: {
          billboard: {
            type: "billboard",
            title: "Roadside Scenic Billboard Display",
            aspectRatio: "16:9",
            prompt: prompts.billboardPrompt,
            loading: true,
          },
          social: {
            type: "social",
            title: "Square Social Media Lifestyle Feed",
            aspectRatio: "1:1",
            prompt: prompts.socialPrompt,
            loading: true,
          },
          newspaper: {
            type: "newspaper",
            title: "Gazette Daily News Print Advertisement",
            aspectRatio: "4:3",
            prompt: prompts.newspaperPrompt,
            loading: true,
          },
        },
        createdAt: new Date().toISOString(),
      };

      setCampaign(initialCampaign);

      // 2. Fire off all 3 image generation requests in parallel
      setIsGeneratingImages({ billboard: true, social: true, newspaper: true });

      const generateMediumImage = async (type: "billboard" | "social" | "newspaper", promptText: string, ratio: "16:9" | "1:1" | "4:3") => {
        try {
          const imgRes = await fetch("/api/generate-medium-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: promptText, aspectRatio: ratio }),
          });

          if (!imgRes.ok) {
            const errData = await imgRes.json();
            throw new Error(errData.error || `Failed to render image for ${type}`);
          }

          const imgData = await imgRes.json();

          setCampaign((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              mediums: {
                ...prev.mediums,
                [type]: {
                  ...prev.mediums[type],
                  imageUrl: imgData.imageUrl,
                  loading: false,
                },
              },
            };
          });
        } catch (err: any) {
          console.error(`Error rendering medium ${type}:`, err);
          setCampaign((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              mediums: {
                ...prev.mediums,
                [type]: {
                  ...prev.mediums[type],
                  error: err.message || "Failed during scene composition",
                  loading: false,
                },
              },
            };
          });
        } finally {
          setIsGeneratingImages((prev) => ({ ...prev, [type]: false }));
        }
      };

      // Trigger parallel resolution using nano banana model outputs
      await Promise.all([
        generateMediumImage("billboard", prompts.billboardPrompt, "16:9"),
        generateMediumImage("social", prompts.socialPrompt, "1:1"),
        generateMediumImage("newspaper", prompts.newspaperPrompt, "4:3"),
      ]);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during campaign visualization.");
      setIsGeneratingPrompts(false);
      setIsGeneratingImages({ billboard: false, social: false, newspaper: false });
    }
  };

  const handleResetCampaign = () => {
    setCampaign(null);
    setError(null);
  };

  const activePromoSet = campaign ? [
    campaign.mediums.billboard,
    campaign.mediums.social,
    campaign.mediums.newspaper
  ] : [];

  const filteredPromoSet = activeTab === "all" 
    ? activePromoSet 
    : activePromoSet.filter((m) => m.type === activeTab);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans selection:bg-brand selection:text-black">
      
      {/* Header Bar */}
      <Header onShowApiInfo={() => setShowApiInfo(true)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        
        {/* API Error Warning */}
        {error && (
          <div className="mb-8 p-5 rounded-none bg-red-950/20 border border-red-500/30 text-red-200 flex items-start gap-4 relative overflow-hidden" id="err-banner">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500"></div>
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h5 className="font-display font-black text-xs uppercase tracking-widest text-red-400">Generation Impediment Alert</h5>
              <p className="text-xs text-red-200/80 mt-1.5 leading-relaxed font-mono">{error}</p>
              
              <div className="mt-4 flex gap-2.5">
                <button
                  onClick={() => setError(null)}
                  className="text-[10px] font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/35 hover:bg-red-500/20 px-4 py-2 rounded-none text-red-200 transition"
                >
                  Dismiss Warning
                </button>
                <button
                  onClick={() => setShowApiInfo(true)}
                  className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:border-white/30 px-4 py-2 rounded-none text-white transition"
                >
                  Configure API Keys
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Form and configuration guidelines */}
          <section className="lg:col-span-5 space-y-6">
            <ProductForm 
              onSubmit={handleGenerateCampaign} 
              isLoading={isGeneratingPrompts || isGeneratingImages.billboard || isGeneratingImages.social || isGeneratingImages.newspaper} 
            />

            {/* Campaign Guide Card */}
            <div className="bg-[#151515] border border-white/10 rounded-none p-6 space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                <Info className="h-4 w-4 text-brand" />
                Consistency Constraints
              </h4>
              <ul className="space-y-3.5 text-xs text-white/60 leading-relaxed font-mono uppercase tracking-wider">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span><strong>Zero Humans Rule:</strong> Pre-validated prompt filters prevent rendering any human body features.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span><strong>Format Isolation:</strong> Configures custom aspect ratios (16:9, 1:1, 4:3) on image-level nodes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span><strong>Visual Sync:</strong> Single-seed descriptor alignment keeps textures & finishes mathematically consistent.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* RIGHT PANEL: Dynamic Showcase presentation */}
          <section className="lg:col-span-7 space-y-6" id="showcase-section">
            
            {/* 1. Loading active process stepper */}
            {(isGeneratingPrompts || isGeneratingImages.billboard || isGeneratingImages.social || isGeneratingImages.newspaper) && (
              <GenerationProgress 
                isLoadingPrompts={isGeneratingPrompts} 
                isLoadingImages={isGeneratingImages} 
              />
            )}

            {/* 2. Default state: No campaign yet generated */}
            {!campaign && !isGeneratingPrompts && (
              <div className="border-2 border-dashed border-white/10 rounded-none p-10 text-center flex flex-col items-center justify-center min-h-[480px] bg-white/[0.01] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black pointer-events-none"></div>

                {/* Aesthetic floating shape */}
                <div className="w-12 h-12 bg-brand text-black flex items-center justify-center text-xl mb-6 hover:scale-105 transition-transform duration-300 font-bold">
                  🍍
                </div>

                <h3 className="font-display font-black text-xs uppercase tracking-widest text-white mb-2">
                  Awaiting Brand Specs Configuration
                </h3>
                <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed mb-8 font-sans">
                  Choose an active preset on the left or design a custom structural description to compose uniform product marketing renders.
                </p>

                {/* Visual outline of the 3 mediums */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-5 border-t border-white/10 text-[10px] uppercase font-mono tracking-widest">
                  <div className="text-center p-3 rounded-none bg-white/5 border border-white/10">
                    <span className="block text-white font-bold">16:9 Ratio</span>
                    <span className="block text-[8px] text-brand font-semibold mt-1">Billboard</span>
                  </div>
                  <div className="text-center p-3 rounded-none bg-white/5 border border-white/10">
                    <span className="block text-white font-bold">1:1 Ratio</span>
                    <span className="block text-[8px] text-brand font-semibold mt-1">Social Feed</span>
                  </div>
                  <div className="text-center p-3 rounded-none bg-white/5 border border-white/10">
                    <span className="block text-white font-bold">4:3 Ratio</span>
                    <span className="block text-[8px] text-brand font-semibold mt-1">Newspaper</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Completed Campaign state */}
            {campaign && (
              <div className="space-y-6">
                
                {/* Active Campaign Info Header */}
                <div className="bg-[#111] border border-white/10 rounded-none p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-black bg-brand px-2 py-0.5 rounded-none">
                        CAMPAIGN ACTIVE
                      </span>
                      <span className="text-[10px] text-white/40 font-mono font-bold tracking-widest">
                        JOB_ID: {campaign.id}
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-black uppercase tracking-widest text-white mt-2">
                      Package: {campaign.product.name}
                    </h2>
                    
                    <p className="text-[10px] text-white/40 mt-1 uppercase font-mono tracking-wider font-bold">
                      Category: <span className="text-white font-black">{campaign.product.category}</span> &nbsp;|&nbsp; Style matrix: <span className="text-white font-black">{campaign.product.designStyle}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={handleResetCampaign}
                      className="px-4 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:border-brand hover:text-brand rounded-none transition duration-150 flex items-center gap-1.5"
                      id="btn-edit-specs"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Configure New</span>
                    </button>
                  </div>
                </div>

                {/* Visual Consistency Summary Card */}
                <div className="bg-white/5 border border-white/10 rounded-none p-5 space-y-2">
                  <h4 className="text-[10px] font-mono text-white/50 uppercase tracking-widest font-black flex items-center gap-1.5">
                    <Award className="h-4 w-4 text-brand" />
                    Synthesized Form Attributes
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    {campaign.prompts.refinedProductDescription}
                  </p>
                </div>

                {/* Filter tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3 gap-3">
                  <div className="flex bg-black p-1 border border-white/10 rounded-none text-[10px] uppercase font-bold tracking-widest">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-3.5 py-1.5 transition-all ${
                        activeTab === "all" ? "bg-brand text-black font-black" : "text-white/40 hover:text-white"
                      }`}
                      id="tab-filter-all"
                    >
                      All Mediums
                    </button>
                    <button
                      onClick={() => setActiveTab("billboard")}
                      className={`px-3.5 py-1.5 transition-all ${
                        activeTab === "billboard" ? "bg-brand text-black font-black" : "text-white/40 hover:text-white"
                      }`}
                      id="tab-filter-billboard"
                    >
                      Billboard
                    </button>
                    <button
                      onClick={() => setActiveTab("social")}
                      className={`px-3.5 py-1.5 transition-all ${
                        activeTab === "social" ? "bg-brand text-black font-black" : "text-white/40 hover:text-white"
                      }`}
                      id="tab-filter-social"
                    >
                      Social
                    </button>
                    <button
                      onClick={() => setActiveTab("newspaper")}
                      className={`px-3.5 py-1.5 transition-all ${
                        activeTab === "newspaper" ? "bg-brand text-black font-black" : "text-white/40 hover:text-white"
                      }`}
                      id="tab-filter-newspaper"
                    >
                      Newspaper
                    </button>
                  </div>

                  <span className="text-[10px] text-white/45 font-mono uppercase tracking-wider font-bold">
                    Rendering {filteredPromoSet.length} OF 3 formats
                  </span>
                </div>

                {/* Medium cards list */}
                <div className="space-y-6">
                  {filteredPromoSet.map((medium) => (
                    <MediumCard
                      key={medium.type}
                      medium={medium}
                      product={campaign.product}
                    />
                  ))}
                </div>

              </div>
            )}

          </section>

        </div>

      </main>

      {/* API Requirements Info Modal */}
      {showApiInfo && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" id="api-modal">
          <div className="bg-[#111] border border-white/10 rounded-none p-6 max-w-md w-full shadow-2xl relative overflow-hidden">
            
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand"></div>

            <button
              onClick={() => setShowApiInfo(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition"
              id="close-api-modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">🔑</span>
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-white">
                API Key & Model Specifications
              </h3>
            </div>

            <div className="space-y-4 text-xs text-white/80 leading-relaxed font-sans">
              
              <div className="bg-black/60 border border-white/10 p-4 rounded-none space-y-2 font-mono uppercase tracking-wider text-[10px]">
                <span className="text-brand font-bold block mb-1">PROMPT MATRICE MODEL</span>
                <p className="leading-relaxed">
                  USES THE HIGH CONTRACT <strong className="text-white">v_image_2.5</strong> (NANO BANANA AD ENGINE) FOR MULTI-MEDIUM IMAGE CONSISTENCY RESOLVES.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-none space-y-1.5">
                <span className="font-bold text-white block text-[10px] uppercase tracking-wider">Secrets Injection:</span>
                <p>
                  API key is handled server-side under: <strong className="text-brand font-mono text-xs">GEMINI_API_KEY</strong>. 
                </p>
                <p className="mt-2 text-white/40">
                  Provide this key inside AI Studio workspace settings tab.
                </p>
              </div>

              <div className="space-y-1 p-2 rounded-none text-[9px] uppercase tracking-wider font-mono bg-brand/5 text-brand border border-brand/20">
                <span>✓ SERVER_SIDE: SECURED & MASKED</span>
                <span className="block">✓ STRICT RE-INFERENCE CYCLES ACTIVE</span>
              </div>
            </div>

            <button
              onClick={() => setShowApiInfo(false)}
              className="w-full mt-6 bg-brand hover:bg-brand-hover text-black font-display font-black uppercase text-xs tracking-wider py-3.5 rounded-none shadow-md"
              id="btn-close-api"
            >
              Comprehended & Ready
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
