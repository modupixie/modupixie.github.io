import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, Paintbrush, Save, Check, ShoppingBag, 
  RotateCcw, ShieldCheck, Truck, ArrowLeft, Mail, 
  Heart, Cpu, FileText, Sparkles, Layers
} from 'lucide-react';
import { GuitarSelection } from '../types';

interface GuitarCustomizerProps {
  onBackToLanding: () => void;
  guitarImage: string;
}

// 10 Premium 3D-Printer Filament Colors (PLA / PETG / ABS blends)
const FILAMENTS = [
  { id: 'neon_pink', name: 'Hyper Acid Pink (PLA)', hex: '#EC4899', thumbnail: '💖', desc: 'Vibrant UV-reactive neon pink' },
  { id: 'cobalt_blue', name: 'Cobalt Translucent (PETG)', hex: '#06B6D4', thumbnail: '🔵', desc: 'Deep glossy translucent teal-blue' },
  { id: 'indigo_violet', name: 'Galaxy Silk Indigo', hex: '#4F46E5', thumbnail: '🟣', desc: 'Shimmering deep purple-blue twilight' },
  { id: 'arctic_white', name: 'Arctic Matte White', hex: '#F9FAFB', thumbnail: '⚪', desc: 'Satin matte white - clean, crisp' },
  { id: 'cosmic_black', name: 'Cosmic Carbon Black', hex: '#111827', thumbnail: '⚫', desc: 'Carbon fiber filled - structural, stealth' },
  { id: 'crimson_red', name: 'Aero Crimson (ABS)', hex: '#DC2626', thumbnail: '🔴', desc: 'High impact matte red' },
  { id: 'neon_green', name: 'Toxic Volt (PETG)', hex: '#22C55E', thumbnail: '🟢', desc: 'High visibility fluorine green' },
  { id: 'sunburst_orange', name: 'Satin Sunburst (PLA)', hex: '#F97316', thumbnail: '🟠', desc: 'Warm structural solar range' },
  { id: 'slate_grey', name: 'Textured Slate (Carbon)', hex: '#4B5563', thumbnail: '🔘', desc: 'Industrial matte gray cement' },
  { id: 'silk_gold', name: 'Imperial Silk (PLA)', hex: '#EAB308', thumbnail: '🟡', desc: 'Shimmering metallic yellow-gold' }
];

const SHOWCASE_PRESETS = [
  {
    id: 'baseline_pink_cyan',
    name: 'Modu Signature Jigsaw',
    description: 'The archetype Modu puzzle guitar design. Interlocking hyper-acid pink, translucent cyan, and twilight deep indigo segments.',
    image: 'https://lh3.googleusercontent.com/d/1lJBVLAvWCvUlfDOO0onUcdJ4iGSinMsL',
    settings: {
      bodyStyle: 'stratocaster' as const,
      colorMode: 'multi' as const,
      colors: ['#EC4899', '#06B6D4', '#4F46E5']
    }
  }
];

// Precision Outline coordinates used from high-fidelity user-provided SVG source
const BODY_PATHS = {
  stratocaster: "M177 108.424C157.61 111.013 142.238 123.413 128.989 137.004C118.405 147.862 110.859 160.75 103.691 174C88.282 202.485 77.4463 232.407 70.5455 264C66.4686 282.665 62.8791 301.823 62.0394 321C60.3778 358.944 67.9504 397.369 76.9645 434C89.2429 483.897 105.045 532.865 120.039 582C134.434 629.169 147.708 675.62 151.09 725C151.779 735.061 153.234 744.868 152.985 755C151.872 800.444 142.229 844.717 128.653 888C118.909 919.066 105.887 949.155 95.5162 980C65.4028 1069.56 40.6859 1165.94 43.0147 1261C43.726 1290.04 48.501 1320.08 56.5579 1348C61.7078 1365.85 69.8782 1382.72 78.6265 1399C101.962 1442.44 139.116 1476.7 181 1501.76C265.574 1552.35 365.157 1565.72 462 1569.96C482.848 1570.87 504.117 1571.88 525 1570.96C532.339 1570.64 539.661 1569.36 547 1569.04C556.32 1568.63 565.68 1569.37 575 1568.96C606.261 1567.59 638.141 1564.94 669 1559.74C700.593 1554.42 732.156 1546.09 762 1534.51C776.436 1528.9 791.848 1523.14 805 1514.88C834.562 1496.31 862.228 1475.73 883.985 1448C923.244 1397.97 939.261 1338.09 945.17 1276C952.176 1202.38 942.139 1127.15 919.166 1057C901.977 1004.51 875.333 955.616 858.569 903C847.598 868.564 841.456 831.166 843.039 795C846.008 727.206 874.914 665.432 895.642 602C909.869 558.464 918 513.812 918 468C918 427.977 912.097 381.353 887.907 348C881.947 339.781 875.058 332.157 865.83 327.564C849.35 319.361 829.333 324.97 819.058 340C811.436 351.148 808.947 365.968 806.679 379C804.192 393.289 801.037 408.191 796.54 422C782.182 466.095 754.482 510.042 707 523.216C691.132 527.619 675.436 528.707 659 527.961C648.624 527.49 637.416 524.511 628 520.231C618.035 515.701 609.21 511.242 601 503.829C568.141 474.163 575 425.831 575 386C575 368.773 577.07 350.026 574.41 333C573.187 325.174 571.108 317.849 563 314.853C554.688 311.783 544.774 312.773 536 311.834C523.081 310.451 509.996 311 497 311C482.564 311 468.296 310.525 454 312.572C444.012 314.002 431.456 310.082 423.214 317.532C418.128 322.13 418.487 328.786 417.714 335C416.461 345.065 414.488 355.648 410.448 365C407.611 371.566 403.92 377.478 399.384 383C375.965 411.513 338.282 406.708 308.039 393.62C285.022 383.658 267.243 362.475 255.424 341C236.615 306.822 228.795 266.596 226.09 228C224.859 210.441 226.416 192.598 225.985 175C225.862 169.949 224.651 165.016 224.17 160C222.135 138.788 216.798 113.439 192 108.478C187.22 107.522 181.805 107.783 177 108.424Z",
  les_paul: LP_BODY_PATH
};

const getVDividerPath = (colIndex: number, y1: number, y2: number, reverse = false) => {
  const x = colIndex === 1 ? 150 : 300;
  let dir = 0;
  if (y1 === 0 && y2 === 230) dir = colIndex === 1 ? 1 : -1;
  else if (y1 === 230 && y2 === 470) dir = colIndex === 1 ? -1 : 1;
  else dir = colIndex === 1 ? 1 : -1;

  const ym = (y1 + y2) / 2;
  const lift = 22;
  const depth = 25 * dir;
  const neck = 10 * dir;

  if (!reverse) {
    return `L ${x} ${ym - lift} ` +
           `C ${x} ${ym - lift/2} ${x - neck} ${ym - lift/2} ${x - neck} ${ym - lift/3} ` +
           `C ${x - neck} ${ym - lift * 1.05} ${x + depth} ${ym - lift * 0.9} ${x + depth} ${ym} ` +
           `C ${x + depth} ${ym + lift * 0.9} ${x - neck} ${ym + lift * 1.05} ${x - neck} ${ym + lift/3} ` +
           `C ${x - neck} ${ym + lift/2} ${x} ${ym + lift/2} ${x} ${ym + lift} ` +
           `L ${x} ${y2} `;
  } else {
    return `L ${x} ${ym + lift} ` +
           `C ${x} ${ym + lift/2} ${x - neck} ${ym + lift/2} ${x - neck} ${ym + lift/3} ` +
           `C ${x - neck} ${ym + lift * 1.05} ${x + depth} ${ym + lift * 0.9} ${x + depth} ${ym} ` +
           `C ${x + depth} ${ym - lift * 0.9} ${x - neck} ${ym - lift * 1.05} ${x - neck} ${ym - lift/3} ` +
           `C ${x - neck} ${ym - lift/2} ${x} ${ym - lift/2} ${x} ${ym - lift} ` +
           `L ${x} ${y1} `;
  }
};

const getHDividerPath = (rowIndex: number, x1: number, x2: number, reverse = false) => {
  const y = rowIndex === 1 ? 230 : 470;
  let dir = 0;
  if (x1 === 0 && x2 === 150) dir = rowIndex === 1 ? 1 : -1;
  else if (x1 === 150 && x2 === 300) dir = rowIndex === 1 ? -1 : 1;
  else dir = rowIndex === 1 ? 1 : -1;

  const xm = (x1 + x2) / 2;
  const lift = 22;
  const depth = 25 * dir;
  const neck = 10 * dir;

  if (!reverse) {
    return `L ${xm - lift} ${y} ` +
           `C ${xm - lift/2} ${y} ${xm - lift/2} ${y - neck} ${xm - lift/3} ${y - neck} ` +
           `C ${xm - lift * 1.05} ${y - neck} ${xm - lift * 0.9} ${y + depth} ${xm} ${y + depth} ` +
           `C ${xm + lift * 0.9} ${y + depth} ${xm + lift * 1.05} ${y - neck} ${xm + lift/3} ${y - neck} ` +
           `C ${xm + lift/2} ${y - neck} ${xm + lift/2} ${y} ${xm + lift} ${y} ` +
           `L ${x2} ${y} `;
  } else {
    return `L ${xm + lift} ${y} ` +
           `C ${xm + lift/2} ${y} ${xm + lift/2} ${y - neck} ${xm + lift/3} ${y - neck} ` +
           `C ${xm + lift * 1.05} ${y - neck} ${xm + lift * 0.9} ${y + depth} ${xm} ${y + depth} ` +
           `C ${xm - lift * 0.9} ${y + depth} ${xm - lift * 1.05} ${y - neck} ${xm - lift/3} ${y - neck} ` +
           `C ${xm - lift/2} ${y - neck} ${xm - lift/2} ${y} ${xm - lift} ${y} ` +
           `L ${x1} ${y} `;
  }
};

import { STRAT_PUZZLE_PIECES, STRAT_PUZZLE_LINES } from './StratocasterData';
import { LP_BODY_PATH, LP_PUZZLE_PIECES, LP_PUZZLE_LINES } from './LesPaulData';

// Map generated pieces dynamically so component usage stays fully preserved
const PUZZLE_PIECES = {
  stratocaster: STRAT_PUZZLE_PIECES,
  les_paul: LP_PUZZLE_PIECES
};

const PUZZLE_LINES = {
  stratocaster: STRAT_PUZZLE_LINES,
  les_paul: LP_PUZZLE_LINES
};

export default function GuitarCustomizer({ onBackToLanding }: GuitarCustomizerProps) {
  const [bodyStyle, setBodyStyle] = useState<'stratocaster' | 'les_paul'>('stratocaster');
  const [colors, setColors] = useState<string[]>(['#EC4899', '#06B6D4', '#4F46E5']);
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  
  // Order modal states
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', email: '', notes: '' });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleColorUpdate = (hex: string) => {
    const updated = [...colors];
    updated[activeSlot] = hex;
    setColors(updated);
  };

  const handleColorCountChange = (count: number) => {
    let updated = [...colors];
    if (count > colors.length) {
      // Hex colors for extra modules
      const defaultPalette = ['#EC4899', '#06B6D4', '#4F46E5', '#F97316'];
      for (let i = colors.length; i < count; i++) {
        updated.push(defaultPalette[i] || '#EC4899');
      }
    } else if (count < colors.length) {
      updated = updated.slice(0, count);
    }
    setColors(updated);
    if (activeSlot >= count) {
      setActiveSlot(0);
    }
    triggerNotification(`Set to ${count} modular colors`);
  };

  const loadPreset = (preset: typeof SHOWCASE_PRESETS[0]) => {
    setBodyStyle(preset.settings.bodyStyle);
    setColors(preset.settings.colors);
    triggerNotification(`Preset loaded: ${preset.name}`);
  };

  const handleReset = () => {
    setBodyStyle('stratocaster');
    setColors(['#EC4899', '#06B6D4', '#4F46E5']);
    setActiveSlot(0);
    triggerNotification('Restored to signature configuration.');
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
    setTimeout(() => {
      setShowOrderModal(false);
      setOrderSubmitted(false);
      setOrderForm({ name: '', email: '', notes: '' });
      triggerNotification('Specification query transmitted! Spec sheet delivered to inbox.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 sm:px-6 md:px-12 flex flex-col justify-between text-white select-none">
      
      {/* Toast Notifications */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 z-[100] bg-neutral-900 border border-neutral-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 text-xs font-mono"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase">Custom Modular Studio</span>
            <h1 className="text-2xl md:text-3xl font-sans tracking-tight uppercase font-light text-neutral-300 mt-1">
              Design <span className="font-bold text-white text-glow">YOUR INTERLOCKING BODY</span>
            </h1>
          </div>
        </div>

        {/* Customizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT PANEL: Canvas stage */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-900/40 border border-neutral-900 rounded-3xl p-6 sm:p-8 relative overflow-hidden min-h-[500px] lg:min-h-[660px]">
            
            {/* Ambient Background decoration */}
            <div className="absolute inset-x-0 top-0 h-full bg-grid-pattern opacity-5 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
            
            <div className="flex items-center justify-between z-10 w-full">
              <div className="text-left">
                <span className="text-[9px] font-mono tracking-widest text-[#d4af37] uppercase">Interactive Stage</span>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Tap filament pills and replace the interlocking grid colors below
                </p>
              </div>

              <div className="flex items-center space-x-1 z-20">
                <button 
                  onClick={handleReset} 
                  className="p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 rounded-lg cursor-pointer text-neutral-500 hover:text-white transition-all"
                  title="Reset Customizer"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="relative flex-1 flex items-center justify-center py-6 select-none min-h-[380px]">
              <div className="relative w-full max-w-[340px] md:max-w-[380px] h-full flex items-center justify-center">
                  
                  {/* High Quality Perfect SVG with discrete puzzle piece rendering */}
                  <svg 
                    viewBox={bodyStyle === 'stratocaster' ? "0 0 974 1674" : "0 0 928 1602"} 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-full h-auto max-h-[55vh] filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)] relative z-20 transition-transform duration-500 hover:scale-105"
                  >
                    <defs>
                      {/* Define unique clip path per guitar style so puzzle pieces have standard perfect outer edges */}
                      <clipPath id="guitar-shape-clip">
                        <path d={BODY_PATHS[bodyStyle]} />
                      </clipPath>
                    </defs>

                    {/* Puzzle Body pieces, clipped to the accurate guitar outline shape */}
                    <g id="pure-puzzle-body" clipPath="url(#guitar-shape-clip)">
                      {/* Subtle backplate underneath to handle tiny gaps */}
                      <rect x="0" y="0" width={bodyStyle === 'stratocaster' ? 974 : 928} height={bodyStyle === 'stratocaster' ? 1674 : 1602} fill="#0c0a09" />
                      
                      {/* Separate physical interlocking puzzle paths rendered dynamically */}
                      {(PUZZLE_PIECES[bodyStyle] || []).map((piecePath, idx) => {
                        const color = colors[idx % colors.length];
                        const isStrat = bodyStyle === 'stratocaster';
                        // Keep first piece as base (full outline) for Stratocaster, so everything fills perfectly
                        if (isStrat && idx === 0) {
                          return (
                            <path
                              key={idx}
                              d={piecePath}
                              fill={colors[0] || '#EC4899'}
                              stroke="#111111"
                              strokeWidth="2.4"
                              strokeLinejoin="round"
                            />
                          );
                        }
                        return (
                          <path
                            key={idx}
                            d={piecePath}
                            fill={color || '#EC4899'}
                            className="transition-colors duration-500 hover:brightness-110 cursor-pointer"
                            stroke="#111111"
                            strokeWidth={isStrat ? "2.4" : "1.2"}
                            strokeLinejoin="round"
                          />
                        );
                      })}
                    </g>

                    {/* Perfect high-fidelity outline border around the guitar body */}
                    <path 
                      d={BODY_PATHS[bodyStyle]} 
                      fill="none" 
                      stroke="#111111"
                      strokeWidth={bodyStyle === 'stratocaster' ? "6.4" : "3.2"}
                      strokeLinejoin="round"
                      className="pointer-events-none"
                    />

                    {/* Precise jigsaw interlocking seam-lines drawn directly over the pieces for realistic shadows/crevices */}
                    {(PUZZLE_LINES[bodyStyle] || []).map((linePath, idx) => {
                      const isStrat = bodyStyle === 'stratocaster';
                      // For Stratocaster, the first element represents the base, so we don't draw it as a seam line
                      if (isStrat && idx === 0) return null;
                      return (
                        <path
                          key={idx}
                          d={linePath}
                          stroke="#111111"
                          strokeWidth={isStrat ? "6.4" : "3.2"}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          opacity="0.9"
                          className="pointer-events-none"
                        />
                      );
                    })}
                  </svg>
                  
                  <div className="absolute bottom-2 inset-x-0 text-center font-mono text-[8px] text-neutral-600 uppercase tracking-widest pointer-events-none">
                    MODU Interlocking Body Active
                  </div>

                </div>
            </div>

            {/* Config Specs Info bar */}
            <div className="border-t border-neutral-900 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-10">
              <div className="flex items-center space-x-3.5">
                <span className="p-3 bg-neutral-900 text-[#d4af37] rounded-xl border border-neutral-800">
                  <Sliders size={18} />
                </span>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#d4af37] uppercase block">ACTIVE BODY SPEC</span>
                  <p className="text-sm font-bold text-white capitalize">
                    {bodyStyle} • <span className="text-[#d4af37]">{colors.length === 1 ? 'Solid Print' : `${colors.length} Interlocking Colors`}</span>
                  </p>
                </div>
              </div>

              {/* Pattern Color layout preview */}
              <div className="flex items-center space-x-1.5 bg-neutral-900/60 py-2 px-3 rounded-full border border-neutral-800/60 font-mono text-[10px]">
                {colors.map((col, i) => (
                  <span 
                    key={i}
                    onClick={() => setActiveSlot(i)}
                    style={{ backgroundColor: col }}
                    className={`w-5 h-5 rounded-full border cursor-pointer block transform hover:scale-110 transition-all ${
                      activeSlot === i 
                        ? 'border-white scale-125 shadow-md shadow-white/20 ring-2 ring-[#d4af37]' 
                        : 'border-neutral-800'
                    }`}
                  />
                ))}
                <span className="text-[10px] text-neutral-400 pl-1">Slot setting</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Customizer Sidebar Controls */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* 1. Body silhouette style */}
            <div className="bg-neutral-900/80 border border-neutral-900/60 hover:border-neutral-900 rounded-3xl p-6 transition-all">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block mb-3.5">1. Choose Jigsaw Silhouette</span>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'stratocaster', name: 'Stratocaster' },
                  { id: 'les_paul', name: 'Les Paul' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setBodyStyle(style.id as any);
                    }}
                    className={`py-4 px-2 border text-center flex flex-col items-center justify-center cursor-pointer rounded-2xl transition-all duration-300 ${
                      bodyStyle === style.id
                        ? 'border-[#d4af37] bg-neutral-900 text-white shadow-xl shadow-black/40 scale-[1.02]'
                        : 'border-neutral-800/80 hover:border-neutral-700 bg-neutral-950/40 text-neutral-400'
                     }`}
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider">{style.name}</h4>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Printing Scheme configuration */}
            <div className="bg-neutral-900/80 border border-neutral-900/60 hover:border-neutral-900 rounded-3xl p-6 transition-all">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block mb-3.5">2. Print Color Mode</span>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Select Number of Colors</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => handleColorCountChange(num)}
                        className={`py-2 px-1 text-center border rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                          colors.length === num
                            ? 'border-[#d4af37] bg-neutral-950 text-white ring-1 ring-[#d4af37]'
                            : 'border-neutral-800 bg-neutral-950/20 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {num === 1 ? 'Solid' : `${num} Colors`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub control settings for Jigsaw pattern mode */}
                <div className="space-y-2 p-3 bg-neutral-950/60 rounded-2xl border border-neutral-900">
                  <p className="text-[10px] font-mono text-neutral-400">
                    {colors.length === 1 
                      ? 'Selected color slot' 
                      : 'Select color slot to customize:'}
                  </p>
                  <div className="flex space-x-2">
                    {colors.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlot(idx)}
                        className={`flex-1 py-1.5 px-2 rounded-xl border text-[11px] font-mono transition-all flex items-center justify-center space-x-1.5 ${
                          activeSlot === idx 
                            ? 'border-[#d4af37] bg-neutral-900 font-bold text-[#d4af37]' 
                            : 'border-neutral-800/80 bg-neutral-950 text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-neutral-800 inline-block" 
                          style={{ backgroundColor: col }} 
                        />
                        <span>{colors.length === 1 ? 'Default' : `Slot ${idx + 1}`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Predefined Filaments colors palatte */}
            <div className="bg-neutral-900/80 border border-neutral-900/60 rounded-3xl p-6">
              <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block mb-3.5">3. Precision 3D filament selection</span>
              
              <div className="grid grid-cols-5 gap-2.5">
                {FILAMENTS.map(fil => {
                  const isActive = colors[activeSlot] === fil.hex;
                  return (
                    <button
                      key={fil.id}
                      onClick={() => {
                        handleColorUpdate(fil.hex);
                      }}
                      className={`relative aspect-square rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer group ${
                        isActive 
                          ? 'border-white bg-neutral-900 scale-105 shadow-md shadow-white/10 ring-2 ring-[#d4af37]' 
                          : 'border-neutral-800 hover:border-neutral-600 bg-neutral-950/20'
                      }`}
                      title={`${fil.name} - ${fil.desc}`}
                    >
                      <span className="text-xl">{fil.thumbnail}</span>
                      <span className="absolute bottom-1 text-[7px] font-mono text-neutral-500 group-hover:text-neutral-300 scale-90 truncate max-w-[85%]">
                        {fil.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-start space-x-2 text-[10px] text-neutral-400 bg-neutral-950/40 p-3 rounded-xl border border-neutral-900">
                <span className="text-amber-500">💡</span>
                <p className="leading-normal">
                  Our recommended PLA/PETG materials are rigid physical compounds tailored to resist structural neck tension. Beautiful, eye-safe premium finishes.
                </p>
              </div>
            </div>

            {/* 4. Pricing and Inquiry triggers */}
            <div className="p-5 border border-dashed border-neutral-800 bg-neutral-950/60 rounded-3xl flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4af37]">Estimated Cost</span>
                  <p className="text-sm font-semibold text-neutral-300 mt-0.5">Calculated upon Spec sheet</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                    Made to Order
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowOrderModal(true)}
                className="w-full bg-[#d4af37] hover:bg-[#b0902c] active:scale-[0.98] text-neutral-950 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-[#d4af37]/10"
              >
                <ShoppingBag size={14} />
                <span>Submit Custom Print Spec Spec Sheet</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Production certifications badges */}
      <div className="w-full max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-neutral-500 gap-6 text-[10px] font-mono">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck size={14} className="text-[#d4af37] opacity-80" />
            <span>Chassis structural warranty print certification</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Truck size={14} className="text-[#d4af37] opacity-80" />
            <span>Worldwide express air cargo safeflight packaging</span>
          </span>
        </div>
        <button 
          onClick={onBackToLanding}
          className="text-neutral-500 hover:text-white font-bold uppercase tracking-widest text-[10px] underline underline-offset-4 cursor-pointer flex items-center space-x-1 transition-colors"
        >
          <ArrowLeft size={12} />
          <span>Back to homepage</span>
        </button>
      </div>

      {/* order spec transmission dialog modal */}
      <AnimatePresence>
        {showOrderModal && (
          <div className="fixed inset-0 bg-black/85 z-[150] flex items-center justify-center p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 md:p-8 relative overflow-hidden select-text"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-neutral-900 rounded-full blur-[80px] pointer-events-none opacity-40" />
              
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase">Custom Build Sheet</span>
                <h3 className="text-xl md:text-2xl font-sans uppercase tracking-tight font-light text-white mt-1">
                  Transmit Specifications
                </h3>
                <div className="h-[1px] w-12 bg-[#d4af37] mx-auto mt-3.5" />
              </div>

              {/* simplified printed specification summary list */}
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-900 mb-6 text-left text-xs font-mono text-neutral-400 space-y-1.5">
                <p className="text-[10px] uppercase text-[#d4af37] tracking-wider mb-2 font-bold flex items-center space-x-1">
                  <FileText size={12} />
                  <span>Build Specification Sheet</span>
                </p>
                <div className="flex justify-between border-b border-neutral-900 pb-1 capitalize">
                  <span>Body Style:</span>
                  <span className="text-white font-bold">{bodyStyle}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-1 capitalize">
                  <span>Printing Scheme:</span>
                  <span className="text-white font-bold">
                    {colors.length === 1 ? 'Solid Color' : `${colors.length}-Color Jigsaw`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Selected Colors:</span>
                  <div className="flex items-center space-x-1">
                    {colors.map((col, idx) => (
                      <span key={idx} className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: col }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    onChange={(e) => setOrderForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-900 hover:border-neutral-800 focus:border-[#d4af37] rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all placeholder:text-neutral-700 font-mono"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={orderForm.email}
                    onChange={(e) => setOrderForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-900 hover:border-neutral-800 focus:border-[#d4af37] rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all placeholder:text-neutral-700 font-mono"
                    placeholder="example@gmail.com"
                  />
                  <p className="text-[9px] text-neutral-600 mt-1">Your final spec sheet and personalized pricing estimate will be delivered here.</p>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Custom Notes</label>
                  <textarea
                    rows={2}
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm(p => ({ ...p, notes: e.target.value }))}
                    className="w-full bg-neutral-950 border border-neutral-900 hover:border-neutral-800 focus:border-[#d4af37] rounded-xl py-2.5 px-4 text-xs text-white outline-none transition-all placeholder:text-neutral-700 font-sans leading-relaxed resize-none"
                    placeholder="Specify custom requirements..."
                  />
                </div>

                <div className="flex space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 border border-neutral-900 hover:border-neutral-800 text-neutral-500 hover:text-white py-3 rounded-full text-xs font-mono uppercase transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={orderSubmitted}
                    className="flex-1 bg-white hover:bg-neutral-100 disabled:bg-neutral-800 text-black disabled:text-neutral-500 py-3 rounded-full text-xs font-mono uppercase font-bold transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {orderSubmitted ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Mail size={12} />
                        <span>Transmit Spec</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
