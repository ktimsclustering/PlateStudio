import React, { useEffect, useState } from "react";
import { Sparkles, EyeOff, Check, Cpu, Image as ImageIcon } from "lucide-react";

interface GenerationProgressProps {
  isLoadingPrompts: boolean;
  isLoadingImages: { billboard: boolean; social: boolean; newspaper: boolean };
}

const STICKY_MESSAGES = [
  "Structuring physical product geometry...",
  "Running strict human-exclusion algorithms...",
  "Applying specific texture definitions...",
  "Simulating professional spotlight arrangements...",
  "Calibrating chromatic contrast values...",
  "Translating lighting ratios for print-mediums...",
  "Sanitizing scene for isolated product focus...",
];

export default function GenerationProgress({ isLoadingPrompts, isLoadingImages }: GenerationProgressProps) {
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % STICKY_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111] border border-white/10 rounded-none p-6 shadow-2xl relative overflow-hidden" id="generation-progress">
      {/* Stark top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display font-black text-sm uppercase tracking-widest text-white mb-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-none h-2 w-2 bg-brand"></span>
            </span>
            Assembling Cohesive Marketing Shots
          </h3>
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">
            Synthesizing consistent features using the Nano Banana image model.
          </p>
        </div>
        <div className="text-[10px] font-mono text-brand bg-brand/5 border border-brand/20 px-3 py-1.5 rounded-none flex items-center gap-1.5 uppercase font-bold">
          <Cpu className="h-3.5 w-3.5 animate-spin text-brand" />
          <span>{STICKY_MESSAGES[ticker]}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Step 1: Prompt Restructuring */}
        <div className="flex items-start gap-4 p-4 rounded-none bg-white/5 border border-white/10">
          <div className="flex-shrink-0 mt-0.5">
            {isLoadingPrompts ? (
              <div className="h-6 w-6 rounded-none border border-brand border-t-transparent animate-spin flex items-center justify-center"></div>
            ) : (
              <div className="h-6 w-6 rounded-none bg-brand/10 border border-brand/30 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-brand" />
              </div>
            )}
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1.5">
              Phase 1: Creative Direction & Consistency Prompts
            </h4>
            <p className="text-xs text-white/60">
              {isLoadingPrompts
                ? "Engaging Gemini-3.5-Flash to draft precise, consistent visual features and negative prompt tags..."
                : "Created brand guidelines, detailed asset features, and layout descriptors."}
            </p>
          </div>
        </div>

        {/* Step 2: Billboard Image */}
        <div className="flex items-start gap-4 p-4 rounded-none bg-white/5 border border-white/10">
          <div className="flex-shrink-0 mt-0.5">
            {isLoadingPrompts ? (
              <div className="h-6 w-6 rounded-none bg-neutral-900 border border-white/10"></div>
            ) : isLoadingImages.billboard ? (
              <div className="h-6 w-6 rounded-none border border-brand border-t-transparent animate-spin flex items-center justify-center"></div>
            ) : (
              <div className="h-6 w-6 rounded-none bg-brand/10 border border-brand/30 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-brand" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Phase 2: Billboard Display Shot (16:9)</span>
              {isLoadingImages.billboard && !isLoadingPrompts && (
                <span className="text-[9px] text-brand font-mono animate-pulse uppercase">Rendering...</span>
              )}
            </h4>
            <p className="text-xs text-white/60">
              {isLoadingPrompts
                ? "Pending Phase 1..."
                : isLoadingImages.billboard
                ? "Drafting landscape wide-angle commercial composition at majestic elevation. Spotlight array active."
                : "Billboard rendering completed successfully."}
            </p>
          </div>
        </div>

        {/* Step 3: Social Media Image */}
        <div className="flex items-start gap-4 p-4 rounded-none bg-white/5 border border-white/10">
          <div className="flex-shrink-0 mt-0.5">
            {isLoadingPrompts ? (
              <div className="h-6 w-6 rounded-none bg-neutral-900 border border-white/10"></div>
            ) : isLoadingImages.social ? (
              <div className="h-6 w-6 rounded-none border border-brand border-t-transparent animate-spin flex items-center justify-center"></div>
            ) : (
              <div className="h-6 w-6 rounded-none bg-brand/10 border border-brand/30 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-brand" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Phase 3: Social Media Flat-Lay Shot (1:1)</span>
              {isLoadingImages.social && !isLoadingPrompts && (
                <span className="text-[9px] text-brand font-mono animate-pulse uppercase">Composing...</span>
              )}
            </h4>
            <p className="text-xs text-white/60">
              {isLoadingPrompts
                ? "Pending Phase 1..."
                : isLoadingImages.social
                ? "Scattering warm shadow angles on clean surface. Arranging lifestyle close-up layout."
                : "Social media post shot rendered successfully."}
            </p>
          </div>
        </div>

        {/* Step 4: Newspaper Image */}
        <div className="flex items-start gap-4 p-4 rounded-none bg-white/5 border border-white/10">
          <div className="flex-shrink-0 mt-0.5">
            {isLoadingPrompts ? (
              <div className="h-6 w-6 rounded-none bg-neutral-900 border border-white/10"></div>
            ) : isLoadingImages.newspaper ? (
              <div className="h-6 w-6 rounded-none border border-brand border-t-transparent animate-spin flex items-center justify-center"></div>
            ) : (
              <div className="h-6 w-6 rounded-none bg-brand/10 border border-brand/30 flex items-center justify-center">
                <Check className="h-3.5 w-3.5 text-brand" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1.5 flex items-center justify-between">
              <span>Phase 4: Newspaper Print-Ad Shot (4:3)</span>
              {isLoadingImages.newspaper && !isLoadingPrompts && (
                <span className="text-[9px] text-brand font-mono animate-pulse uppercase">Printing...</span>
              )}
            </h4>
            <p className="text-xs text-white/60">
              {isLoadingPrompts
                ? "Pending Phase 1..."
                : isLoadingImages.newspaper
                ? "Generating high-texture editorial contrast profile. Matching physical newspaper frame lighting."
                : "Newspaper print-ad shot completed successfully."}
            </p>
          </div>
        </div>
      </div>

      {/* Safety message */}
      <div className="mt-5 flex items-center gap-2 text-[10px] text-white/40 bg-black/60 p-3 rounded-none border border-white/10 font-mono uppercase tracking-wider">
        <EyeOff className="h-3.5 w-3.5 text-brand shrink-0" />
        <span>
          <strong>Pro-Active Filter Status:</strong> Each shot is explicitly embedded with strict physical negative controls to ensure NO people/hands ever breach composition rules.
        </span>
      </div>
    </div>
  );
}
