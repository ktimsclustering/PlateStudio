import React, { useState } from "react";
import { GeneratedMedium, ProductDetails } from "../types";
import { Heart, MessageCircle, Send, Bookmark, Maximize2, FileText, Palette, Copy, Check, Download, ExternalLink, AlertTriangle, Info } from "lucide-react";

interface MediumCardProps {
  key?: string;
  medium: GeneratedMedium;
  product: ProductDetails;
}

export default function MediumCard({ medium, product }: MediumCardProps) {
  const [activeTab, setActiveTab] = useState<"mockup" | "prompt">("mockup");
  const [copied, setCopied] = useState(false);
  const [showErrorOverlay, setShowErrorOverlay] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(medium.prompt || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    if (!medium.imageUrl) return;
    const a = document.createElement("a");
    a.href = medium.imageUrl;
    a.download = `${product.name.replace(/\s+/g, "_")}_${medium.type}_ad.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Helper to generate dynamic product SVGs based on category tags
  const getProductSVG = (accent: string) => {
    const nameLower = (product.name || "").toLowerCase();
    const descLower = (product.description || "").toLowerCase();
    const catLower = (product.category || "").toLowerCase();

    const isAudio = catLower.includes("audio") || catLower.includes("headphone") || catLower.includes("sound") || catLower.includes("speaker");
    const isGamepad = catLower.includes("game") || catLower.includes("pad") || catLower.includes("console") || nameLower.includes("game") || descLower.includes("game") || descLower.includes("joystick") || descLower.includes("trigger");

    if (isGamepad) {
      return (
        <svg viewBox="0 0 200 200" className="w-40 h-40">
          {/* Cyber HUD circle indicators */}
          <circle cx="100" cy="105" r="76" fill="none" stroke={accent} strokeWidth="0.5" strokeDasharray="3 6" className="opacity-25" />
          <circle cx="100" cy="105" r="70" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="40 80" className="animate-spin opacity-35" style={{ transformOrigin: "100px 105px", animationDuration: "20s" }} />

          {/* Trigger Line Indicators representing adjustable trigger travel */}
          <path d="M 55,42 L 72,48" stroke={accent} strokeWidth="2.5" strokeLinecap="round" className="opacity-80 animate-pulse" />
          <path d="M 145,42 L 128,48" stroke={accent} strokeWidth="2.5" strokeLinecap="round" className="opacity-80 animate-pulse" />
          
          {/* Gamepad Main Cybernetic Controller Body Shield */}
          <path 
            d="M 40,75 C 40,52 160,52 160,75 C 160,82 172,125 155,148 C 145,162 122,143 110,125 C 105,115 95,115 90,125 C 78,143 55,162 45,148 C 28,125 40,82 40,75 Z" 
            fill="url(#lensGrad)" 
            stroke={accent} 
            strokeWidth="3.5" 
            className="relative z-10" 
          />

          {/* Inner body detailing grooves */}
          <path d="M 54,80 C 65,72 135,72 146,80" fill="none" stroke="#fff" strokeWidth="0.75" className="opacity-35" />
          <path d="M 45,110 C 50,132 60,140 52,144" fill="none" stroke={accent} strokeWidth="1" className="opacity-50" />
          <path d="M 155,110 C 150,132 140,140 148,144" fill="none" stroke={accent} strokeWidth="1" className="opacity-50" />

          {/* Glowing Pill-shaped AMOLED OLED Screen with active Anime Cute Eye animations */}
          <rect x="80" y="65" width="40" height="20" rx="3.5" fill="#000" stroke={accent} strokeWidth="1.5" className="shadow-lg" />
          
          {/* Cute Anime Blink Loop on OLED screen */}
          <g className="animate-pulse">
            {/* Left Cute Anime eye */}
            <path d="M 88,73 C 88,71 94,71 94,73" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="91" cy="75.5" r="1.5" fill={accent} />
            <circle cx="92" cy="74.5" r="0.6" fill="#fff" />
            
            {/* Right Cute Anime eye */}
            <path d="M 106,73 C 106,71 112,71 112,73" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="109" cy="75.5" r="1.5" fill={accent} />
            <circle cx="110" cy="74.5" r="0.6" fill="#fff" />
            
            {/* Anime happy smile */}
            <path d="M 98,77.5 Q 100,79 102,77.5" fill="none" stroke={accent} strokeWidth="1" strokeLinecap="round" />
            
            {/* Tiny battery/voltage custom display stats context */}
            <rect x="84" y="81.5" width="4" height="2" fill={accent} className="opacity-90" />
            <rect x="112" y="81.5" width="4" height="2" fill="#fff" className="opacity-40" />
          </g>

          {/* Customizable RGB light indicator strips */}
          <line x1="86" y1="89" x2="114" y2="89" stroke={accent} strokeWidth="1" strokeDasharray="3 2" className="opacity-70" />

          {/* High-accuracy Adjustable D-Pad (Left Side) */}
          <g transform="translate(56, 85)" stroke={accent} strokeWidth="1.5" fill="none">
            <path d="M -8,0 L 8,0 M 0,-8 L 0,8" strokeWidth="2.5" strokeLinecap="round" className="opacity-80" />
            <circle cx="0" cy="0" r="3" fill="#000" stroke={accent} strokeWidth="1" />
          </g>

          {/* ABXY Action Buttons (Right Side) in standard diamond pattern */}
          <g transform="translate(144, 85)" fill={accent} className="opacity-90">
            {/* Y button (top) */}
            <circle cx="0" cy="-7" r="1.8" />
            {/* A button (bottom) */}
            <circle cx="0" cy="7" r="1.8" />
            {/* X button (left) */}
            <circle cx="-7" cy="0" r="1.8" />
            {/* B button (right) */}
            <circle cx="7" cy="0" r="1.8" />
          </g>

          {/* Left Customizable Joystick with glowing base bezel */}
          <g transform="translate(74, 114)">
            {/* Bezel */}
            <circle cx="0" cy="0" r="11" fill="#111" stroke={accent} strokeWidth="1" />
            <circle cx="0" cy="0" r="9" fill="none" stroke={accent} strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" style={{ transformOrigin: "0px 0px", animationDuration: "10s" }} />
            {/* Thumbstick top cap */}
            <circle cx="-1.5" cy="-1" r="5" fill="#202025" stroke="#fff" strokeWidth="0.75" className="shadow-md" />
            <circle cx="-1.5" cy="-1" r="1.5" fill={accent} />
          </g>

          {/* Right Customizable Joystick with glowing base bezel */}
          <g transform="translate(126, 114)">
            {/* Bezel */}
            <circle cx="0" cy="0" r="11" fill="#111" stroke={accent} strokeWidth="1" />
            <circle cx="0" cy="0" r="9" fill="none" stroke={accent} strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" style={{ transformOrigin: "0px 0px", animationDuration: "14s" }} />
            {/* Thumbstick top cap */}
            <circle cx="1" cy="1.5" r="5" fill="#202025" stroke="#fff" strokeWidth="0.75" className="shadow-md" />
            <circle cx="1" cy="1.5" r="1.5" fill={accent} />
          </g>

          <defs>
            <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={product.primaryColor || "#0f0f11"} stopOpacity="0.96" />
              <stop offset="30%" stopColor="#121217" stopOpacity="0.95" />
              <stop offset="50%" stopColor={accent} stopOpacity="0.15" />
              <stop offset="70%" stopColor="#121217" stopOpacity="0.95" />
              <stop offset="100%" stopColor={product.primaryColor || "#0f0f11"} stopOpacity="0.96" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (isAudio) {
      return (
        <svg viewBox="0 0 200 200" className="w-36 h-36">
          {/* Glowing orbital rays */}
          <circle cx="100" cy="115" r="50" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4 8" className="animate-spin" style={{ transformOrigin: "center", animationDuration: "12s" }} />
          {/* Headphone arc */}
          <path d="M45,115 C45,55 155,55 155,115" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" className="opacity-90" />
          <path d="M48,115 C48,60 152,60 152,115" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" className="opacity-45" />
          {/* Left Earcup */}
          <rect x="35" y="100" width="16" height="35" rx="8" fill={product.primaryColor || "#0f0f11"} stroke={accent} strokeWidth="2.5" />
          <circle cx="43" cy="117" r="4" fill={accent} className="animate-pulse" />
          {/* Right Earcup */}
          <rect x="149" y="100" width="16" height="35" rx="8" fill={product.primaryColor || "#0f0f11"} stroke={accent} strokeWidth="2.5" />
          <circle cx="157" cy="117" r="4" fill={accent} className="animate-pulse" />
          {/* Interior technical indicators */}
          <line x1="60" y1="115" x2="140" y2="115" stroke={accent} strokeWidth="1" strokeDasharray="2 3" className="opacity-40" />
        </svg>
      );
    } else {
      // Default / Smart Glasses SVG (e.g. Iris One AR Glasses)
      return (
        <svg viewBox="0 0 200 200" className="w-40 h-40">
          {/* Cyber HUD backing rings */}
          <circle cx="100" cy="100" r="70" fill="none" stroke={accent} strokeWidth="0.75" strokeDasharray="3 6" className="opacity-25" />
          <circle cx="100" cy="100" r="60" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="40 100" className="animate-spin opacity-40" style={{ transformOrigin: "center", animationDuration: "25s" }} />
          <circle cx="100" cy="100" r="54" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="8 4" className="opacity-20" />
          
          {/* Outer temple lines */}
          <path d="M25,85 C40,84 50,90 60,95 L140,95 C150,90 160,84 175,85" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" className="opacity-80" />
          
          {/* Main Glowing Lenses / Shield Visor */}
          <path d="M40,98 C45,125 75,125 96,108 C98,105 102,105 104,108 C125,125 155,125 160,98 C162,90 150,92 140,93 C115,95 85,95 60,93 C50,92 38,90 40,98 Z" 
            fill="url(#lensGrad)" stroke={accent} strokeWidth="3" className="relative z-10" />
          
          {/* Lens horizontal laser line */}
          <line x1="44" y1="108" x2="156" y2="108" stroke={accent} strokeWidth="1.5" className="animate-pulse opacity-90" />
          
          {/* Nose bridge highlight */}
          <path d="M92,102 C96,96 104,96 108,102" fill="none" stroke="#fff" strokeWidth="2.5" className="opacity-70" />
          
          {/* Micro HUD technical reticles */}
          <path d="M45,108 L55,108 M145,108 L155,108 M100,80 L100,70" stroke={accent} strokeWidth="1" className="opacity-90" />
          <circle cx="100" cy="108" r="3" fill="#fff" className="animate-ping" style={{ transformOrigin: "100px 108px" }} />

          <defs>
            <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={product.primaryColor || "#0f0f11"} stopOpacity="0.95" />
              <stop offset="40%" stopColor={accent} stopOpacity="0.4" />
              <stop offset="60%" stopColor={accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={product.primaryColor || "#0f0f11"} stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
  };

  // Renders the realistic premium Billboard mockup
  const renderBillboardMockup = () => {
    const accentColor = product.accentColor || "#EBFF00";
    return (
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#151515] to-[#0a0a0a] rounded-none overflow-hidden shadow-2xl border border-white/10 group flex flex-col justify-between p-4">
        {/* Sky background highlights with visual ambient glow */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Billboard Frame scaffold */}
        <div className="w-full h-[84%] bg-[#121319] rounded-none border-2 border-white/10 p-1.5 pb-2.5 shadow-2xl relative">
          
          {/* Spotlight fixtures at the top glowing down */}
          <div className="absolute -top-1.5 left-0 right-0 flex justify-around px-8 pointer-events-none z-10">
            <div className="w-3.5 h-1.5 bg-[#444] rounded-none border-b border-white/30 relative">
              <div className="absolute top-1 -left-1.5 w-6 h-6 bg-brand/20 rounded-full blur-sm animate-pulse"></div>
            </div>
            <div className="w-3.5 h-1.5 bg-[#444] rounded-none border-b border-white/30 relative">
              <div className="absolute top-1 -left-1.5 w-6 h-6 bg-brand/20 rounded-full blur-sm animate-pulse"></div>
            </div>
            <div className="w-3.5 h-1.5 bg-[#444] rounded-none border-b border-white/30 relative">
              <div className="absolute top-1 -left-1.5 w-6 h-6 bg-brand/20 rounded-full blur-sm animate-pulse"></div>
            </div>
          </div>

          {/* Actual generated image or our beautiful visual fallback */}
          <div className="w-full h-full bg-neutral-900 rounded-none overflow-hidden relative">
            {medium.imageUrl ? (
              <img
                src={medium.imageUrl}
                alt={`${product.name} Billboard Presentation`}
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
            ) : medium.error ? (
              /* Staggeringly beautiful real-time vector presentation */
              <div className="w-full h-full bg-gradient-to-tr from-neutral-900 via-[#101015] to-[#12121e] flex items-center justify-between px-6 relative overflow-hidden font-sans select-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 left-[38%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"></div>
                
                {/* Radial ambient spotlight backglow in their custom accent color */}
                <div className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-25 pointer-events-none" style={{ backgroundColor: accentColor }}></div>

                {/* Left Brand Copy Panel */}
                <div className="relative z-10 max-w-[48%] text-left space-y-1.5 pr-2">
                  <span className="text-[7px] font-mono font-bold tracking-[0.2em] text-brand/90 uppercase block">CORE SPEC SHEET // SERIES-1</span>
                  <h1 className="font-display font-black text-xl text-white tracking-widest uppercase leading-none">
                    {product.name}
                  </h1>
                  <p className="text-[9px] text-white/50 leading-relaxed font-mono line-clamp-2 max-w-sm">
                    {product.description}
                  </p>
                  <div className="flex gap-2.5 pt-1 uppercase font-mono text-[8px] font-bold text-white/40">
                    <span className="text-brand">#{product.designStyle.replace(/\s+/g, "")}</span>
                    <span>|</span>
                    <span style={{ color: accentColor }}>{accentColor}</span>
                  </div>
                </div>

                {/* Right Floating Holographic Vector product in Electromagnetic Suspension */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full mr-4 w-[40%]">
                  <div className="relative flex items-center justify-center h-36 w-36 mb-[-15px] animate-pulse">
                    {getProductSVG(accentColor)}
                  </div>
                  {/* Angled cement/metallic presentation pedestal */}
                  <div className="w-24 h-16 bg-gradient-to-b from-neutral-800 to-neutral-950 border-t border-x border-neutral-700/60 rounded-none relative overflow-hidden" style={{ transform: "perspective(60px) rotateX(40deg)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/30"></div>
                  </div>
                </div>

                {/* Diagnostic technical prompt label */}
                <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[7px] font-mono text-white/20 select-none">
                  <span>LATENCY_STABLE_V2</span>
                  <span>PREVIEW: COG_RENDER_OFFLINE</span>
                </div>

                {/* API Quota limitation subtle notification bar */}
                <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                  <button 
                    onClick={() => setShowErrorOverlay(!showErrorOverlay)}
                    className="bg-red-950/95 hover:bg-red-900 border border-red-500/30 text-red-200 uppercase font-mono text-[7px] font-bold tracking-[0.15em] px-2 py-1 rounded-none shadow-sm flex items-center gap-1 cursor-pointer transition"
                  >
                    <AlertTriangle className="h-2.5 w-2.5 text-red-400 animate-pulse" />
                    <span>Demo Simulation (Click details)</span>
                  </button>
                </div>

                {/* Expandable full technical error report popup panel */}
                {showErrorOverlay && (
                  <div className="absolute inset-0 z-40 bg-black/95 p-4 flex flex-col justify-between font-mono border border-red-500/20 text-left">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-red-400 text-[10px] font-black uppercase tracking-widest border-b border-red-500/20 pb-1.5">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle className="h-3 w-3" />
                          Gemini Image API 429 Quota Exceeded
                        </span>
                        <button 
                          onClick={() => setShowErrorOverlay(false)}
                          className="text-white/40 hover:text-white uppercase text-[8px] font-bold border border-white/20 px-1 py-0.2"
                        >
                          ✕ Close
                        </button>
                      </div>
                      <p className="text-[9px] text-red-200/90 leading-relaxed font-mono line-clamp-5 whitespace-pre-wrap">
                        {medium.error}
                      </p>
                    </div>
                    <div className="text-[8px] text-white/50 border-t border-white/10 pt-2 flex justify-between items-center">
                      <span>KEY: process.env.GEMINI_API_KEY</span>
                      <span className="text-brand">Settings &gt; Secrets menu</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900/40 text-white/40">
                <span className="text-[10px] font-mono uppercase tracking-widest">Render Pending...</span>
              </div>
            )}
            
            {/* Minimal brand overlay on Billboard */}
            {medium.imageUrl && (
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none drop-shadow-md">
                <div className="bg-[#0c0c0c] px-3 py-2 rounded-none border border-white/15">
                  <span className="text-[8px] uppercase font-mono tracking-widest text-brand block mb-0.5">NEXT_GEN ENERGY</span>
                  <span className="text-xs font-display font-black text-white tracking-widest uppercase">{product.name}</span>
                </div>
                <div className="bg-brand text-black font-display font-black text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-none shadow-sm">
                  {product.designStyle}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Heavy metal pole support structure underneath */}
        <div className="flex flex-col items-center flex-1 justify-end mt-1">
          <div className="w-1/4 h-1.5 bg-neutral-800 border-x border-neutral-700"></div>
        </div>
      </div>
    );
  };

  // Renders the realistic premium Social Media layout
  const renderSocialMockup = () => {
    const accentColor = product.accentColor || "#EBFF00";
    return (
      <div className="w-full bg-black border border-white/10 rounded-none overflow-hidden shadow-2xl max-w-md mx-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-none bg-brand flex items-center justify-center font-display font-black text-xs text-black">
              {product.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-white tracking-wider">
                  {product.name.toLowerCase().replace(/\s+/g, "_")}
                </span>
                <span className="w-3.5 h-3.5 bg-brand flex items-center justify-center text-[8px] text-black font-black select-none" title="Verified Brand">
                  ✓
                </span>
              </div>
              <span className="text-[9px] uppercase font-mono text-white/40 block -mt-0.5 tracking-wider">Sponsored ad</span>
            </div>
          </div>
          <button className="text-white/40 hover:text-brand transition">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* 1:1 Image frame */}
        <div className="aspect-square bg-neutral-900 w-full relative border-b border-white/10">
          {medium.imageUrl ? (
            <img
              src={medium.imageUrl}
              alt={`${product.name} Social Media Feed`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : medium.error ? (
            /* Perfectly proportioned vector display for Instagram square */
            <div className="w-full h-full bg-neutral-950 relative overflow-hidden flex flex-col items-center justify-between p-6 group select-none">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
              
              {/* Backlight halo glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[70px] opacity-20 pointer-events-none" style={{ backgroundColor: accentColor }}></div>

              <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/[0.04] pointer-events-none flex flex-col justify-between p-1.5 font-mono text-[7px] text-white/20">
                <div className="flex justify-between">
                  <span>SYS_STABLE_V4</span>
                  <span>ACCENT_ALIGNED</span>
                </div>
                <div className="flex justify-between">
                  <span>SCALE: 1:1_HQ</span>
                  <span>PRESET: LIFESTYLE_STUDIO</span>
                </div>
              </div>

              {/* Header Title segment */}
              <div className="relative z-10 text-center space-y-1 pt-1">
                <span className="text-[8px] font-mono tracking-[0.2em] text-brand/90 uppercase font-black block">NEW DISPOSAL DESIGN</span>
                <h2 className="font-display font-black text-lg text-white tracking-widest uppercase">
                  {product.name}
                </h2>
              </div>

              {/* Main Vector graphic with diagnostic lines */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="animate-pulse">
                  {getProductSVG(accentColor)}
                </div>
                <div className="absolute -left-5 font-mono text-[6px] text-white/20 border-l border-white/15 h-16 flex flex-col justify-center pl-1.5">
                  <span>GRID_ALIGN: OK</span>
                  <span>REF_W: 142MM</span>
                </div>
                <div className="absolute -right-5 font-mono text-[6px] text-white/20 border-r border-white/15 h-16 flex flex-col justify-center pr-1.5 text-right">
                  <span>PULSE: TRUE</span>
                  <span style={{ color: accentColor }}>{accentColor}</span>
                </div>
              </div>

              {/* Footer specs banner */}
              <div className="relative z-10 w-full flex items-center justify-between border-t border-white/10 pt-2.5">
                <span className="text-[8px] font-mono font-bold text-white/40 uppercase tracking-widest">
                  PHILOSOPHY: {product.designStyle}
                </span>
                <span className="text-[8px] font-mono font-bold text-brand uppercase tracking-widest">
                  ISO_STANDALONE
                </span>
              </div>

              {/* API rate limit warning label */}
              <div className="absolute top-3 right-3 z-30 flex items-center">
                <button 
                  onClick={() => setShowErrorOverlay(!showErrorOverlay)}
                  className="bg-black/95 border border-red-500/40 hover:bg-red-950 text-red-300 uppercase font-mono text-[7px] font-bold tracking-widest px-2 py-0.5 rounded-none shadow-md flex items-center gap-1 cursor-pointer transition"
                >
                  <AlertTriangle className="h-2.5 w-2.5 text-red-400" />
                  <span>Quota Met (Demo mode)</span>
                </button>
              </div>

              {/* Overlay full tech specs of error */}
              {showErrorOverlay && (
                <div className="absolute inset-x-0 bottom-0 top-0 z-40 bg-black/95 p-4 flex flex-col justify-between font-mono border-t border-red-500/20 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-red-400 text-[10px] font-black uppercase tracking-widest border-b border-red-500/20 pb-1.5">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Rate limit 429 detail
                      </span>
                      <button 
                        onClick={() => setShowErrorOverlay(false)}
                        className="text-white/40 hover:text-white uppercase text-[8px] font-bold border border-white/20 px-1 py-0.2"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <p className="text-[9px] text-red-200/90 leading-relaxed font-mono line-clamp-8 overflow-y-auto whitespace-pre-wrap max-h-44">
                      {medium.error}
                    </p>
                  </div>
                  <div className="text-[8px] text-white/40 pt-2 border-t border-white/15 flex justify-between">
                    <span>Model: gemini-2.5-flash-image</span>
                    <span className="text-brand">Requires billing enabled</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30">
              <span className="text-[10px] font-mono uppercase tracking-widest">Feed Render Pending...</span>
            </div>
          )}
        </div>

        {/* Interaction buttons bar */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 text-white/85">
            <div className="flex items-center gap-4">
              <Heart className="h-4 w-4 hover:text-red-500 hover:scale-110 active:scale-90 cursor-pointer transition-colors" />
              <MessageCircle className="h-4 w-4 hover:text-brand cursor-pointer transition-colors" />
              <Send className="h-4 w-4 hover:text-brand cursor-pointer transition-colors" />
            </div>
            <Bookmark className="h-4 w-4 hover:text-brand cursor-pointer transition-colors" />
          </div>

          {/* Social Stats and caption */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">
              14,204 likes
            </span>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              <span className="font-bold text-brand uppercase mr-1.5">
                #{product.name.toLowerCase().replace(/\s+/g, "")}
              </span>
              Introducing the new {product.name}. Refined around a {product.designStyle.toLowerCase()} aesthetic. Powered with gorgeous tones of {product.primaryColor} and {product.accentColor}. Pure form, no distractions.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 uppercase font-mono text-[9px] tracking-wider font-bold">
              <span className="text-brand">#{product.name.replace(/\s+/g, "")}</span>
              <span className="text-white/40">#{product.category.replace(/\s+/g, "")}</span>
              <span className="text-white/40">#purephysics</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renders the realistic luxury Newspaper mockup
  const renderNewspaperMockup = () => {
    const formattedDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div className="w-full bg-[#D1D1D1] text-black border border-white/10 p-5 shadow-2xl relative overflow-hidden select-none" id="news-mock">
        {/* Newspaper content columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Article side column */}
          <div className="md:col-span-4 border-r border-black/15 pr-4 space-y-4 font-serif hidden md:block">
            <h4 className="font-serif font-black italic text-lg leading-tight uppercase text-black border-b border-black/15 pb-1.5">
              Refining Pure Objects
            </h4>
            <p className="text-[10px] text-black/75 leading-relaxed text-justify">
              In an era dominated by noise, engineers are returning toward the absolute quietness of standalone objects. 
              The newly designed <strong className="text-black font-black">{product.name}</strong> exemplifies this paradigm shift perfectly.
            </p>
            <p className="text-[10px] text-black/75 leading-relaxed text-justify">
              By removing any human context, visual consistency is prioritized alone. Observers note the exquisite metallic accents, matte surfaces, and clean light-reflection patterns.
            </p>
          </div>

          {/* Core Ad Column */}
          <div className="md:col-span-8 flex flex-col justify-between">
            {/* The Ad placement */}
            <div className="border border-black/20 p-2 mb-3">
              <div className="flex justify-between items-center mb-1.5 font-sans">
                <span className="text-[9px] font-black tracking-widest text-black/60 uppercase">SPECIAL EDITORIAL FEATURE</span>
                <span className="text-[9px] font-black tracking-widest text-[#000] uppercase">PAGE 10</span>
              </div>
              
              {/* Product 4:3 Image with newspaper style border */}
              <div className="aspect-[4/3] w-full bg-black border border-black overflow-hidden relative group">
                {medium.imageUrl ? (
                  <img
                    src={medium.imageUrl}
                    alt={`${product.name} Print Advertisement`}
                    className="w-full h-full object-cover filter contrast-125 saturate-50 grayscale"
                    referrerPolicy="no-referrer"
                  />
                ) : medium.error ? (
                  /* Halftone aesthetic technical layout schematic */
                  <div className="w-full h-full bg-[#D6D6D6] text-black relative p-5 overflow-hidden flex flex-col justify-between font-serif select-none" style={{ filter: "contrast(1.1) saturate(0.85)" }}>
                    <div className="absolute inset-0 bg-[radial-gradient(#00000018_1.2px,transparent_1.2px)] bg-[size:6px_6px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_45%,#00000028_95%) pointer-events-none"></div>

                    {/* Schematic grid line backing */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="w-full h-[1px] bg-black"></div>
                      <div className="h-full w-[1px] bg-black"></div>
                    </div>

                    <div className="flex justify-between items-start relative z-10">
                      <div className="text-left space-y-1 max-w-[55%]">
                        <span className="text-[7px] font-mono font-black tracking-widest text-black/50 uppercase block">FIGURE 4A // TECHNICAL LAYOUT</span>
                        <h2 className="font-sans font-black text-xs leading-none uppercase text-black mb-1">{product.name}</h2>
                        <p className="text-[8px] leading-tight text-neutral-800 line-clamp-3">
                          {product.description}
                        </p>
                      </div>

                      {/* Diagnostic label trigger details */}
                      <button 
                        onClick={() => setShowErrorOverlay(!showErrorOverlay)}
                        className="bg-black text-[7px] font-sans font-black text-white hover:bg-neutral-850 px-2 py-0.5 rounded-none uppercase tracking-widest cursor-pointer transition select-none flex items-center gap-1 relative z-20"
                      >
                        <AlertTriangle className="h-2.5 w-2.5 text-yellow-500" />
                        <span>PLATE_OFFLINE</span>
                      </button>
                    </div>

                    {/* Centers high contrast print black blueprint silhouette vector of our product */}
                    <div className="relative z-10 flex h-28 my-auto items-center justify-center">
                      <div className="opacity-80 scale-90">
                        {getProductSVG("#000000")}
                      </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-black/30 pt-1.5 font-mono text-[6.5px] uppercase tracking-wider text-black/70">
                      <span>FORM_STYLE: {product.designStyle}</span>
                      <span>PRIMARY_TONE: {product.primaryColor}</span>
                    </div>

                    {/* Pop-up explaining error over newspaper plate */}
                    {showErrorOverlay && (
                      <div className="absolute inset-0 z-40 bg-zinc-150 p-4 flex flex-col justify-between font-mono text-left text-neutral-900 border border-black/20">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-black text-[9px] font-black uppercase tracking-widest border-b border-black/25 pb-1 flex justify-between">
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              PLATE REJECTION (CODE 429)
                            </span>
                            <button 
                              onClick={() => setShowErrorOverlay(false)}
                              className="text-black/50 hover:text-black uppercase text-[8px] font-bold border border-black/20 px-1 py-0.2"
                            >
                              ✕ Close
                            </button>
                          </div>
                          <p className="text-[8.5px] text-neutral-800 leading-relaxed font-mono line-clamp-6 whitespace-pre-wrap max-h-36 overflow-y-auto">
                            {medium.error}
                          </p>
                        </div>
                        <div className="text-[7.5px] text-neutral-600 border-t border-black/15 pt-1.5 flex justify-between items-center">
                          <span>API QUOTA EXHAUSTED</span>
                          <span>Settings &gt; Secrets menu to fix</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white/50">
                    <span className="text-xs font-serif italic uppercase tracking-wider">HALFTONE PLATE PENDING...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom headline inside Ad */}
            <div className="text-center font-serif py-2.5 border-t border-black/15">
              <h2 className="text-base font-black italic uppercase leading-none text-black">
                AN UNMATCHED VISION OF THE {product.name.toUpperCase()}
              </h2>
              <div className="flex justify-between mt-2 text-[9px] font-bold uppercase tracking-wider font-sans text-black/60">
                <span>VOL. IV / ISSUE 82</span>
                <span>LONDON GAZETTE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-none overflow-hidden shadow-2xl hover:border-brand/40 transition-colors duration-300" id={`medium-card-${medium.type}`}>
      
      {/* Title block with Medium Badge */}
      <div className="p-5 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-none bg-brand"></div>
          <div>
            <span className="text-[10px] font-mono text-brand uppercase tracking-widest block font-bold">Medium Delivery</span>
            <h3 className="font-display font-black text-white tracking-widest capitalize text-xs sm:text-sm uppercase">
              {medium.title} ({medium.aspectRatio} format)
            </h3>
          </div>
        </div>

        {/* Tab triggers */}
        <div className="flex items-center bg-black p-1 border border-white/10 rounded-none text-[10px] uppercase font-bold tracking-widest">
          <button
            onClick={() => setActiveTab("mockup")}
            className={`px-3 py-1.5 transition-all ${
              activeTab === "mockup" ? "bg-brand text-black font-black" : "text-white/40 hover:text-white"
            }`}
            id={`tab-mockup-${medium.type}`}
          >
            Mockup View
          </button>
          <button
            onClick={() => setActiveTab("prompt")}
            className={`px-3 py-1.5 transition-all ${
              activeTab === "prompt" ? "bg-brand text-black font-black" : "text-white/40 hover:text-white"
            }`}
            id={`tab-prompt-${medium.type}`}
          >
            Nano Prompt
          </button>
        </div>
      </div>

      {/* Main interactive visualization block */}
      <div className="p-5">
        {activeTab === "mockup" ? (
          <div className="w-full">
            {medium.type === "billboard" && renderBillboardMockup()}
            {medium.type === "social" && renderSocialMockup()}
            {medium.type === "newspaper" && renderNewspaperMockup()}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Prompt text area */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block font-bold">Auto-Synthesized Model Prompt:</span>
              <div className="bg-black border border-white/10 rounded-none p-4 font-mono text-xs text-brand/90 leading-relaxed max-h-48 overflow-y-auto select-text break-words">
                {medium.prompt || "Pending synthesis..."}
              </div>
            </div>

            {/* Prompt configuration specifications */}
            <div className="grid grid-cols-2 gap-3 text-[10px] uppercase tracking-wider font-mono">
              <div className="bg-white/5 p-3 rounded-none border border-white/10">
                <span className="text-white/40 block mb-1">Aspect Ratio</span>
                <span className="font-bold text-white">{medium.aspectRatio}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-none border border-white/10">
                <span className="text-white/40 block mb-1">Sub-Model Engine</span>
                <span className="font-bold text-brand">V_IMAGE_2.5</span>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopyPrompt}
              disabled={!medium.prompt}
              className="w-full text-xs font-black uppercase tracking-widest py-3 border border-white/10 bg-white/5 hover:bg-brand text-white hover:text-black rounded-none transition duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
              id={`btn-copy-prompt-${medium.type}`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied Prompt</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Prompt to Notepad</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Footer bar with actions */}
      <div className="px-5 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider">
        <span className="text-white/40">
          Target Size: 1K (approx)
        </span>
        <div className="flex items-center gap-3">
          {medium.imageUrl && (
            <>
              <a
                href={medium.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-brand hover:underline transition-all flex items-center gap-1.5 px-2.5 py-1.5"
                title="View Full Resolution"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Full Res</span>
              </a>
              <button
                onClick={handleDownloadImage}
                className="text-black bg-brand hover:bg-brand-hover transition-colors flex items-center gap-1.5 px-4 py-2 font-black"
                id={`btn-download-${medium.type}`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Save Asset</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
