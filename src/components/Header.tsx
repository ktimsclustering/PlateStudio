import React from "react";
import { Sparkles, Layers, ShieldCheck, HelpCircle } from "lucide-react";

interface HeaderProps {
  onShowApiInfo: () => void;
}

export default function Header({ onShowApiInfo }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#0F0F0F]/95 backdrop-blur sticky top-0 z-40 px-8 py-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Logo / Branded Greeting */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-brand flex items-center justify-center text-xl font-bold select-none text-black hover:scale-105 transition-transform">
            <span>🍌</span>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h1 className="font-display text-2xl font-black tracking-tighter uppercase">
                Marketing <span className="text-brand">Materials</span>
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 bg-white/5 border border-white/10 px-2 py-0.5">
                Nano Banana Model
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mt-0.5">
              Multi-medium visual consistency matrix. zero human intervention.
            </p>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
          <button
            onClick={onShowApiInfo}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:border-brand hover:text-brand px-4 py-2.5 transition duration-150"
            id="btn-api-info"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>API Specs</span>
          </button>
          
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#EBFF00] bg-[#EBFF00]/5 border border-[#EBFF00]/20 px-3 py-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Filter Active: No Humans</span>
          </div>
        </div>
      </div>
    </header>
  );
}
