import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Puzzle, Magnet, Cpu, ArrowUpRight, CheckCircle2, 
  HelpCircle, ChevronDown, Sparkles, MessageCircle, Mail, Phone 
} from 'lucide-react';
import { useTransparentImage } from '../utils/transparentImage';
import guitarImage from '../assets/images/google_drive_guitar.png';

/* --- Features Section --- */
export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const products = [
    {
      id: "1",
      image: "https://lh3.googleusercontent.com/d/1Y1hzVTNTW4TqttqGpc21wIXOAaAKyogo",
      badge: "A BLANK CANVAS",
      title: "Fully Customizable Design",
      desc: "Pick your colors, parts, and style. Our 3D printing process allows for endless possibilities. Create a guitar that is 100% you, just like a fashion accessory."
    },
    {
      id: "2",
      image: "https://lh3.googleusercontent.com/d/1yMUwE4qAUFKflm-UVf-O0yY27k936wkX",
      badge: "LIGHT ON YOUR SHOULDERS, AND THE PLANET",
      title: "Eco-Friendly & Super Lightweight",
      desc: "Made with sustainable, bio-friendly materials and an innovative internal structure. It's easy to carry, hold, and play. Perfect for taking anywhere, from your bedroom to a friend's house."
    },
    {
      id: "3",
      image: "https://lh3.googleusercontent.com/d/1tEl0z0EiEdI55loi26TKlWx1AdczF3jd",
      badge: "BUILT TO LAST, EASY TO FIX",
      title: "Modular & Repairable",
      desc: "Swap parts, upgrade components, or make repairs with ease. Our modular design not only extends the life of your guitar but also encourages you to learn and experiment with its mechanics."
    },
    {
      id: "4",
      image: "https://lh3.googleusercontent.com/d/1kIOCr1raT-f4yJB4Uik3EGyCS6-scd8B",
      badge: "FOR THE DREAMERS AND THE PROS",
      title: "Perfect for All Levels",
      desc: "Whether you're just starting your musical journey or you're a seasoned professional, Modu Pixie is designed to inspire. Its comfortable playability and versatile sound make it the perfect companion for every musician."
    }
  ];

  // Robust client-side scroll position monitor targeting the trigger threshold perfectly
  React.useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll('.product-scroll-item');
      if (items.length === 0) return;

      const viewportHeight = window.innerHeight;
      const targetY = viewportHeight * 0.45; // 45% down the viewport

      let closestIdx = 0;
      let minDistance = Infinity;

      items.forEach((item, idx) => {
        const rect = item.getBoundingClientRect();
        // Calculate middle point of scroll text item relative to the viewport
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - targetY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial trigger to configure starting view
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="py-24 md:py-32 bg-black border-b border-neutral-900 relative z-20 px-6 md:px-12">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neutral-900/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Title Block */}
        <div className="text-center flex flex-col items-center mb-16 md:mb-24">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase font-bold">
            Modu Pixie Features
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-light text-neutral-300 mt-3 tracking-wide leading-none uppercase">
            Crafted for <span className="font-bold text-white">Next-gen players</span>
          </h2>
          <div className="h-[2px] w-12 bg-[#d4af37] mt-6" />
        </div>

        {/* Horizontal Sticky Grid system */}
        <div className="flex flex-row items-start gap-6 md:gap-20">
          
          {/* Sticky Left Column: Product Image frame with absolute crossfade */}
          <div className="sticky top-[100px] md:top-[140px] w-[45%] md:w-1/2 h-[260px] sm:h-[380px] md:h-[520px] flex items-center justify-center z-10">
            <motion.div 
              initial={{ opacity: 0, y: 80, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full rounded-[16px] md:rounded-[24px] bg-neutral-950/80 flex items-center justify-center overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
              style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 z-[1] pointer-events-none" />
              {products.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={item.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1.0 : 0.94,
                      y: isActive ? 0 : 25,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    style={{
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    className="absolute inset-0 flex items-center justify-center rounded-[16px] md:rounded-[24px] overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none rounded-[16px] md:rounded-[24px]"
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Scrolling Right Column: Product textual insights */}
          <div className="w-[55%] md:w-1/2 flex flex-col">
            {products.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={item.id}
                  data-index={idx}
                  className="product-scroll-item min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center py-12 md:py-24 border-b border-neutral-900 last:border-0"
                >
                  <motion.div
                    initial={{ opacity: 0.25, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-120px" }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="focus-smooth"
                    style={{
                      opacity: isActive ? 1.0 : 0.3,
                      transition: 'opacity 0.4s ease'
                    }}
                  >
                    <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.16em] text-[#d4af37] uppercase mb-3 md:mb-4 block">
                      {item.badge}
                    </span>
                    <h3 className="text-xl md:text-3xl font-sans tracking-tight text-white font-bold mb-3 md:mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-base font-sans font-light text-neutral-400 leading-relaxed max-w-lg mb-6 md:mb-8">
                      {item.desc}
                    </p>

                    {/* Accent number/step slider indicator */}
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 font-semibold uppercase tracking-widest">
                      <span className="w-4 md:w-6 h-[1px] bg-neutral-800" />
                      <span>{isActive ? <strong className="text-white">0{idx + 1}</strong> : `0${idx + 1}`} / 04</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

/* --- Gallery Section --- */
export function GallerySection() {
  const images = [
    { name: 'Modu Pixie - Frost Edition', spec: 'Pearl finish body', url: 'https://lh3.googleusercontent.com/d/1Ss0OJTjiALz1Pfar2GfC4D4r0_BXSYnN' },
    { name: 'Modu Pixie - Core Craft', spec: 'Aerospace structural core', url: 'https://lh3.googleusercontent.com/d/1GD2X2LMSo_x3jZsWraKK2BLKUdtS61Jh' },
    { name: 'Modu Pixie - Resonance Wood', spec: 'Heritage acoustic timber', url: 'https://lh3.googleusercontent.com/d/1vqUnJWZZBBeyYW7Vc0SdvhLjCG5q_kz0' },
    { name: 'Modu Pixie - Midnight Satin', spec: 'Obsidian black hardware', url: 'https://lh3.googleusercontent.com/d/17roBhRpT-0Dlig8oXQmovPAoGwMEFok4' },
    { name: 'Modu Pixie - Sonic Slate', spec: 'Modular pickguard shield', url: 'https://lh3.googleusercontent.com/d/1bEtMZY4mfrTmDzXlSLyLL7EUpR0KAJ7Q' },
    { name: 'Modu Pixie - Studio Aura', spec: 'Alnico custom pickups', url: 'https://lh3.googleusercontent.com/d/1r7lcYABrFNp0Rwwxo2ms7iC-B_DDFSGK' },
  ];

  return (
    <section className="py-24 bg-neutral-950 text-white px-8 relative z-20 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#d4af37] uppercase font-bold">Interactive Gallery</span>
            <h2 className="text-3xl md:text-5xl font-sans mt-2 tracking-wide text-white font-bold uppercase">
              Find Your Vibe
            </h2>
          </div>
          <p className="text-neutral-400 max-w-sm text-sm font-sans font-light leading-relaxed">
            Get inspired by designs from the Modu community. What will you create?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((item, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden bg-neutral-900 rounded-[16px] border border-neutral-900 shadow-xl cursor-pointer">
              <img
                src={item.url}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- About Story Panel --- */
export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-black px-8 relative z-20 overflow-hidden border-b border-neutral-900">
      {/* Background Accent glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neutral-900/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8 select-none">
        
        {/* Title / Badge */}
        <div className="space-y-2 text-center">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#d4af37] uppercase font-bold">
            The Vision
          </span>
          <div className="h-[2px] w-8 bg-[#d4af37] mx-auto mt-2" />
        </div>

        {/* Centerpiece Image - Compact & Raw */}
        <div className="w-full flex justify-center">
          <img 
            src="https://lh3.googleusercontent.com/d/18ntUo4XPTOzUl-t088XyQhG5AfuDyajs" 
            alt="Modu Core Centerpiece" 
            referrerPolicy="no-referrer"
            className="w-full max-w-[340px] md:max-w-[420px] h-auto object-contain select-none pointer-events-none"
          />
        </div>

        {/* Brand identity components: Symmetrical split layout balanced around center line */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center justify-center pt-4 w-full">
          
          {/* Left Column Brand design logo aligned to the right, touching the symmetrical center line */}
          <div className="flex justify-center md:justify-end md:pr-12 w-full animate-fade-in">
            <img 
              src="https://lh3.googleusercontent.com/d/11isFp_b2oFwEEJsGIS7OQXo6NMbjQjbT" 
              alt="Modu Brand Design Motif"
              referrerPolicy="no-referrer"
              className="w-full max-w-[280px] md:max-w-[420px] h-auto object-contain select-none pointer-events-none brightness-110"
            />
          </div>

          {/* Right Column Brand Essence Copy block aligned to the left, touching the symmetrical center line */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left md:pl-12 w-full space-y-4 mb-4 md:mb-0">
            <h3 className="text-2xl md:text-3xl font-sans uppercase tracking-tight leading-none font-extrabold text-white">
              Music for Everyone <span className="text-[#d4af37]">(모두)</span>
            </h3>
            
            <div className="space-y-4 text-xs md:text-sm font-sans font-light text-neutral-400 leading-relaxed max-w-[480px] mt-1 text-center md:text-left">
              <p>
                At Modu, we believe that music should be accessible to everyone-just like our name, which means "everyone" in Korean. Our mission is to redefine the electric guitar industry by offering affordable, customizable, and lightweight guitars made from eco-friendly materials.
              </p>
              <p>
                Through 3D printing technology and modular design, we empower musicians of all levels to create their own unique sound and style. Whether you're a beginner looking for your first instrument or a professional seeking an innovative, sustainable option, Modu makes it possible for everyone to play, create, and express themselves freely.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* --- Final Call to Action Section --- */
export function CTASection() {
  const triggerCustomizer = () => {
    window.dispatchEvent(new CustomEvent('open-3d-customizer'));
  };

  return (
    <section className="py-24 md:py-36 bg-black text-white text-center relative z-20 px-6 overflow-hidden border-t border-neutral-900 select-none">
      {/* Dynamic line accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-900" />
      
      <div className="max-w-2xl mx-auto space-y-10 relative z-10 flex flex-col items-center">
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#d4af37] uppercase font-bold">
          Start Your Journey
        </span>
        
        <h2 className="text-4xl md:text-6xl font-sans font-extralight tracking-tight text-white uppercase leading-none">
          Ready to <span className="font-bold block mt-3 text-[#d4af37]">Create?</span>
        </h2>

        <p className="text-neutral-500 text-xs md:text-sm font-sans font-light leading-relaxed max-w-md mx-auto">
          Redefine your playability. Join the Modu movement and design the guitar of your dreams today—crafted exactly for you, and built to stand out.
        </p>

        <div className="pt-6">
          <button
            onClick={triggerCustomizer}
            className="bg-white hover:bg-[#d4af37] hover:text-white text-black text-xs font-mono font-bold tracking-[0.2em] uppercase py-4 px-12 rounded-full transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Start Designing
          </button>
        </div>
      </div>
    </section>
  );
}
