import React from 'react';
import { motion } from 'motion/react';

export default function SpecsSection() {
  return (
    <section className="bg-neutral-950 text-white py-24 px-6 md:px-12 relative z-30 overflow-hidden">
      {/* Soft background ambient lights */}
      <div className="absolute top-[20%] left-[-100px] w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-40">

        {/* ========================================================= */}
        {/* ROW 1: Modu Puzzle Series                                */}
        {/* Left Image (Slides left -> right) | Right Specs (Unboxed) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image sliding from left to right - No box, no clipping */}
          <motion.div 
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-[420px] md:max-w-full flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1GKVmwSopnYl5REnALzYD4NXj9VwJXcic" 
                alt="Modu Puzzle Series Raw"
                referrerPolicy="no-referrer"
                className="w-full max-h-[580px] md:max-h-[660px] object-contain select-none pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Right Column: Unboxed Specs */}
          <div className="md:col-span-7 space-y-8 select-none">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#d4af37] uppercase font-bold">
                Premium Edition
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-light uppercase tracking-wide text-white">
                Modu <span className="font-bold">Puzzle Series</span>
              </h3>
              <div className="h-[2px] w-12 bg-[#d4af37] mt-3" />
            </div>

            {/* Structured specifications without boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4 font-sans">
              
              {/* Body */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Body Specs
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Material:</span> <span className="text-neutral-200">Bio-plastic + carbon fiber</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Shape:</span> <span className="text-neutral-200">Single-cut (Les Paul style)</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Finish:</span> <span className="text-neutral-200">Puzzle pattern structural dev</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Weight:</span> <span className="text-neutral-200">Approx. 2.8 - 3.2 kg</span></p>
                </div>
              </div>

              {/* Neck */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Neck & Fretboard
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Material:</span> <span className="text-neutral-200">Maple wood or composite</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Joint:</span> <span className="text-neutral-200">Bolt-on (Set-neck available)</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Scale Length:</span> <span className="text-neutral-200">24.75" (Gibson spec)</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Inlays:</span> <span className="text-neutral-200">Custom puzzle block</span></p>
                </div>
              </div>

              {/* Hardware */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Hardware Custom
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Bridge:</span> <span className="text-neutral-200">Tune-O-Matic metal</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Pickups:</span> <span className="text-neutral-200">Dual humbuckers (Alnico V)</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Controls:</span> <span className="text-neutral-200">2 Vol / 2 Tone / 3-way</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Tuners:</span> <span className="text-neutral-200">Die-cast (18:1 ratio)</span></p>
                </div>
              </div>

              {/* Electronics */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Electronics
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Pickup Output:</span> <span className="text-neutral-200">Neck 7.8kn / Bridge 8.5kn</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Wiring:</span> <span className="text-neutral-200">Premium OFC shielded copper</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Output jack:</span> <span className="text-neutral-200">Standard 1/4" (gold-plated)</span></p>
                </div>
              </div>

            </div>

            {/* Highlights list without visual bounding borders */}
            <div className="pt-6 border-t border-neutral-900">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-3 font-semibold">Highlighted Assets</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-xs text-neutral-400 leading-relaxed font-sans">
                <p>• <span className="text-neutral-350">Customization: Fully customizable color and pattern</span></p>
                <p>• <span className="text-neutral-350">Eco-Friendly: Option to use recycled filaments</span></p>
                <p>• <span className="text-neutral-350">Durability: Lightweight honeycomb strength core</span></p>
                <p>• <span className="text-neutral-350">Maintenance: Easily replaceable body elements</span></p>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* ROW 2: Modu Color Series                                  */}
        {/* Left Specs (Unboxed) | Right Image (Slides right -> left) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Unboxed specs (flows order-2 on mobile, order-1 on desktop) */}
          <div className="md:col-span-7 space-y-8 select-none order-2 md:order-1">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#d4af37] uppercase font-bold">
                Chroma High Gloss
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-light uppercase tracking-wide text-white">
                Modu <span className="font-bold">Color Series</span>
              </h3>
              <div className="h-[2px] w-12 bg-[#d4af37] mt-3" />
            </div>

            {/* Specifications list without boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-4 font-sans">
              
              {/* Body */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Body Specs
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Material:</span> <span className="text-neutral-200">Bio-plastic + carbon fiber</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Shape:</span> <span className="text-neutral-200">Single-cut (Les Paul inspired)</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Finish:</span> <span className="text-neutral-200">Multicolor high-gloss puzzle</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Weight:</span> <span className="text-neutral-200">Approx. 2.8 ~ 3.2 kg</span></p>
                </div>
              </div>

              {/* Neck */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Neck & Fretboard
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Material:</span> <span className="text-neutral-200">Maple neck with composite core</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Joint:</span> <span className="text-neutral-200">Bolt-on joint system</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Scale Length:</span> <span className="text-neutral-200">24.75"</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Inlays:</span> <span className="text-neutral-200">Standard block inlays</span></p>
                </div>
              </div>

              {/* Hardware */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Hardware Gold
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Bridge:</span> <span className="text-neutral-200">Tune-O-Matic, gold finish</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Pickups:</span> <span className="text-neutral-200">Dual humbuckers (gold covers)</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Controls:</span> <span className="text-neutral-200">2 Vol / 2 Tone / 3-way</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Tuners:</span> <span className="text-neutral-200">Die-cast black (18:1 ratio)</span></p>
                </div>
              </div>

              {/* Electronics */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-[#d4af37] tracking-widest uppercase font-bold border-b border-neutral-800 pb-2">
                  Electronics
                </h4>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Pickup Output:</span> <span className="text-neutral-200">Neck ~7.8kn / Bridge ~8.5kn</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Wiring:</span> <span className="text-neutral-200">OFC copper with high shielding</span></p>
                  <p className="flex justify-between border-b border-neutral-900 pb-1.5"><span className="text-neutral-500">Output jack:</span> <span className="text-neutral-200">Standard 1/4" (gold-plated)</span></p>
                </div>
              </div>

            </div>

            {/* Highlights list without visual bounding borders */}
            <div className="pt-6 border-t border-neutral-900">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-3 font-semibold">Chroma Features</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-xs text-neutral-400 leading-relaxed font-sans">
                <p>• <span className="text-neutral-350">Customization: Fully customizable color palettes</span></p>
                <p>• <span className="text-neutral-350">Eco-Friendly: Option to print with bio-plastics</span></p>
                <p>• <span className="text-neutral-350">Stability: Aerospace strength honeycomb base</span></p>
                <p>• <span className="text-neutral-350">Maintenance: Interchangeable puzzle structures</span></p>
              </div>
            </div>

          </div>

          {/* Right Column: Image sliding from right to left (flows order-1 on mobile, order-2 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex justify-center order-1 md:order-2"
          >
            <div className="w-full max-w-[420px] md:max-w-full flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1lJBVLAvWCvUlfDOO0onUcdJ4iGSinMsL" 
                alt="Modu Color Series Raw"
                referrerPolicy="no-referrer"
                className="w-full max-h-[580px] md:max-h-[660px] object-contain select-none pointer-events-none"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
