import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer, ChevronDown, Sparkles } from 'lucide-react';
import { useTransparentImage } from '../utils/transparentImage';

const bgGuitarImage = "https://lh3.googleusercontent.com/d/1VxK7moao4gpf6SWDabw_qjrbUN_CbduH";

interface InteractiveScrollSectionProps {
  onDesignClick: () => void;
  guitarImage: string;
}

export default function InteractiveScrollSection({ onDesignClick, guitarImage }: InteractiveScrollSectionProps) {
  const { src: transparentBgGuitarImage, isReady: isBgGuitarReady } = useTransparentImage(bgGuitarImage, 'black');
  const [scrollProgress, setScrollProgress] = useState(0); // Continuous progress from 0.0 to 4.5
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const scrollProgressRef = useRef(scrollProgress);
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Synchronize scroll progress when navigation or links are clicked
  useEffect(() => {
    const handleSetProgress = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (typeof customEvent.detail === 'number') {
        setScrollProgress(customEvent.detail);
      }
    };
    window.addEventListener('set-hero-scroll-progress', handleSetProgress);
    return () => {
      window.removeEventListener('set-hero-scroll-progress', handleSetProgress);
    };
  }, []);

  // Handle continuous smooth scrolling via mouse wheel and touches natively
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const isScrollingDown = e.deltaY > 0;
      const currentProgress = scrollProgressRef.current;
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;

      if (isScrollingDown) {
        if (currentProgress < 4.5) {
          e.preventDefault();
          setScrollProgress(prev => Math.min(4.5, prev + e.deltaY * 0.0016));
        }
      } else {
        if (currentScrollY <= 5) {
          if (currentProgress > 0) {
            e.preventDefault();
            setScrollProgress(prev => Math.max(0, prev + e.deltaY * 0.0016));
          }
        }
      }
    };

    let touchStart = 0;

    const handleTouchStartNative = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchMoveNative = (e: TouchEvent) => {
      if (touchStart === 0) return;
      const currentY = e.touches[0].clientY;
      const diff = touchStart - currentY; // diff > 0 is swiping up (scrolling down)
      
      const isMovingDown = diff > 0;
      const currentProgress = scrollProgressRef.current;
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;

      if (isMovingDown) {
        if (currentProgress < 4.5) {
          if (e.cancelable) e.preventDefault();
          setScrollProgress(prev => Math.min(4.5, prev + diff * 0.0035));
        }
      } else {
        if (currentScrollY <= 5) {
          if (currentProgress > 0) {
            if (e.cancelable) e.preventDefault();
            setScrollProgress(prev => Math.max(0, prev + diff * 0.0035));
          }
        }
      }
      touchStart = currentY;
    };

    const handleTouchEndNative = () => {
      touchStart = 0;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStartNative, { passive: true });
    container.addEventListener('touchmove', handleTouchMoveNative, { passive: false });
    container.addEventListener('touchend', handleTouchEndNative, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStartNative);
      container.removeEventListener('touchmove', handleTouchMoveNative);
      container.removeEventListener('touchend', handleTouchEndNative);
    };
  }, []);

  // Subtle Mouse Parallax active in the first phase
  const handleMouseMove = (e: React.MouseEvent) => {
    if (scrollProgress < 0.15) {
      const { clientX, clientY, currentTarget } = e;
      const { width, height, left, top } = currentTarget.getBoundingClientRect();
      const factor = 1 - (scrollProgress / 0.15);
      const x = ((clientX - left - width / 2) / 35) * factor;
      const y = ((clientY - top - height / 2) / 35) * factor;
      setMousePos({ x, y });
    } else {
      setMousePos({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // ---------------------------------------------------------------------------
  // SEQUENTIAL TIMELINE CALCULATIONS (scrollProgress ranges from 0.0 to 4.5)
  // ---------------------------------------------------------------------------

  // 1. Background Color / Opacity (White Curtain transition to Solid Black)
  // Pure solid white [0.0 to 1.8], transitions smoothly to solid black [1.8 to 2.3]
  let bgStyle = '#ffffff';
  if (scrollProgress >= 1.8 && scrollProgress <= 2.3) {
    const p = (scrollProgress - 1.8) / 0.5; // 0 to 1
    const val = Math.round(255 * (1 - p));
    bgStyle = `rgb(${val}, ${val}, ${val})`;
  } else if (scrollProgress > 2.3) {
    bgStyle = '#000000';
  }



  // 2. Modu Pixie Text (Phase 1)
  // 0.0 to 0.5: moves from original top position (-180px) down to the center (0px)
  // 0.5 to 1.1: stays at the center (y = 0px) but magnifies/grows significantly (scale goes from 1.0 to 3.2) and fades out completely
  let p1TextY = -180;
  let p1TextScale = 1.0;
  let p1TextOpacity = 1.0;

  if (scrollProgress <= 0.5) {
    p1TextY = -180 + (scrollProgress / 0.5) * 180; // Moves smoothly from -180px to 0px
    p1TextScale = 1.0;
    p1TextOpacity = 1.0;
  } else if (scrollProgress <= 1.1) {
    p1TextY = 0;
    const progressFactor = (scrollProgress - 0.5) / 0.6; // 0.0 to 1.0
    p1TextScale = 1.0 + progressFactor * 2.2; // Scale grows beautifully and largely to 3.2
    p1TextOpacity = Math.max(0, 1.0 - progressFactor); // Fades out completely by 1.1
  } else {
    p1TextY = 0;
    p1TextScale = 3.2;
    p1TextOpacity = 0;
  }

  // 3. Original Guitar (Phase 1)
  // Starts lower down base position (y = 115px) so they don't look cramped with the centered text at all.
  // Fades out and flies up between 0.0 and 0.85
  const baseGuitarY = 115;
  const guitarY = baseGuitarY - scrollProgress * 780;
  const guitarScale = 1.02 - scrollProgress * 0.45;
  const guitarOpacity = Math.max(0, 1.0 - scrollProgress * 1.55);
  const guitarRotate = -15 - scrollProgress * 10;
  const p1ShadowOpacity = Math.max(0, 0.3 * (1.0 - scrollProgress * 1.55));

  // 4. "Future of Portability" TITLE text
  // Fades in starting from 1.1 (after Modu Pixie has fully disappeared), with scale growing slightly (0.9 -> 1.0)
  let parentTimelineOpacity = 0;
  let fopTitleScale = 1.0;

  if (scrollProgress >= 1.1 && scrollProgress <= 1.6) {
    // Stage A: Fade in
    parentTimelineOpacity = (scrollProgress - 1.1) / 0.5;
    fopTitleScale = 0.9 + ((scrollProgress - 1.1) / 0.5) * 0.1;
  } else if (scrollProgress > 1.6 && scrollProgress <= 3.1) {
    // Stage B: Calm in-place (no scale, full opacity)
    parentTimelineOpacity = 1.0;
    fopTitleScale = 1.0;
  } else if (scrollProgress > 3.1 && scrollProgress <= 3.8) {
    // Stage C: Blink/flicker in-place (flickers and pulses, scale is strictly locked at 1.0 on the spot!)
    parentTimelineOpacity = 1.0; 
    fopTitleScale = 1.0; 
  } else if (scrollProgress > 3.8 && scrollProgress <= 4.5) {
    // Stage D: Grow large and fade away
    const progressFactor = (scrollProgress - 3.8) / 0.7; // 0.0 to 1.0
    parentTimelineOpacity = Math.max(0, 1.0 - progressFactor);
    fopTitleScale = 1.0 + progressFactor * 1.6; // Grows up to 2.6
  } else if (scrollProgress > 4.5) {
    parentTimelineOpacity = 0;
    fopTitleScale = 2.6;
  } else {
    parentTimelineOpacity = 0;
    fopTitleScale = 0.9;
  }

  // Elegant single organic blink of the title text (scroll progress 3.1 to 3.8)
  let flashGlowIntensity = 0;
  let blinkOpacityFactor = 1.0;
  if (scrollProgress >= 3.1 && scrollProgress <= 3.8) {
    const p = (scrollProgress - 3.1) / 0.7; // normalized 0 to 1 over blink duration
    if (p < 0.25) {
      blinkOpacityFactor = 1.0;
      flashGlowIntensity = 0;
    } else if (p >= 0.25 && p < 0.35) {
      // Quick dip to completely dark (1 blink cycle only)
      const localP = (p - 0.25) / 0.10;
      blinkOpacityFactor = 1.0 - localP;
      flashGlowIntensity = 0;
    } else if (p >= 0.35 && p < 0.45) {
      // Snappy turn-on with bright visual halo flare
      const localP = (p - 0.35) / 0.10;
      blinkOpacityFactor = localP;
      flashGlowIntensity = localP * 1.8;
    } else {
      blinkOpacityFactor = 1.0;
      // Soft lingering glow halo that vanishes back to standard solid white text
      const localP = (p - 0.45) / 0.55;
      flashGlowIntensity = Math.max(0, 1.8 * (1.0 - localP));
    }
  }

  // Multiply only for the title text's own specific opacity so subtext does NOT blink!
  const titleTextOpacity = parentTimelineOpacity * blinkOpacityFactor;

  // Title text color: Starts black on white background, fades to white between 1.8 and 2.3
  let fopTextColor = 'rgb(10, 10, 10)';
  if (scrollProgress < 1.8) {
    fopTextColor = 'rgb(10, 10, 10)';
  } else if (scrollProgress >= 1.8 && scrollProgress <= 2.3) {
    const p = (scrollProgress - 1.8) / 0.5;
    const val = Math.round(10 + p * 245);
    fopTextColor = `rgb(${val}, ${val}, ${val})`;
  } else if (scrollProgress > 2.3) {
    fopTextColor = 'rgb(255, 255, 255)';
  }

  // Y Shift for text: Starts ONLY after blinking is complete (at scrollProgress >= 3.8)
  let fopTextY = 0;
  if (scrollProgress >= 3.8 && scrollProgress <= 4.2) {
    fopTextY = -((scrollProgress - 3.8) / 0.4) * 60;
  } else if (scrollProgress > 4.2) {
    fopTextY = -60; // Remains static while scaling out
  }

  // 5. Uploaded Background Image (Custom Colorful Jigsaw Guitar)
  // Emerges smoothly inside a soft circle *only* when the background is fully pitch black (>= 2.3)
  let bgImageOpacity = 0;
  if (scrollProgress >= 2.3 && scrollProgress <= 2.9) {
    bgImageOpacity = (scrollProgress - 2.3) / 0.6;
  } else if (scrollProgress > 2.9 && scrollProgress <= 3.8) {
    bgImageOpacity = 1.0;
  } else if (scrollProgress > 3.8 && scrollProgress <= 4.6) {
    // Gradually fades as it scrolls up
    bgImageOpacity = Math.max(0, 1.0 - (scrollProgress - 3.8) / 0.8);
  }

  // Background image travels/scrolls upwards out of view between 3.8 and 4.6 (y: 0 -> -750px)
  let bgImageY = 0;
  if (scrollProgress >= 3.8 && scrollProgress <= 4.6) {
    bgImageY = -((scrollProgress - 3.8) / 0.8) * 750;
  } else if (scrollProgress > 4.6) {
    bgImageY = -750;
  }

  // 6. Subtext Sentence
  // Fades in beautifully *after* the custom background image has appeared, between 3.0 and 3.5
  let subtextOpacity = 0;
  if (scrollProgress >= 3.0 && scrollProgress <= 3.5) {
    subtextOpacity = (scrollProgress - 3.0) / 0.5;
  } else if (scrollProgress > 3.5 && scrollProgress <= 3.8) {
    subtextOpacity = 1.0;
  } else if (scrollProgress > 3.8 && scrollProgress <= 4.5) {
    subtextOpacity = Math.max(0, 1.0 - (scrollProgress - 3.8) / 0.7);
  }

  let subtextScale = 1.0;
  if (scrollProgress > 3.9 && scrollProgress <= 4.6) {
    subtextScale = 1.0 + ((scrollProgress - 3.9) / 0.7) * 1.2;
  }

  return (
    <div 
      id="scroll-explorer"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: bgStyle }}
      className="relative z-20 w-full h-screen overflow-hidden select-none flex flex-col items-center justify-center transition-all duration-300"
    >
      {/* decorative Grid Line System (fades out as screen gets dark) */}
      <div 
        style={{ opacity: Math.max(0, 0.6 * (1 - scrollProgress)) }}
        className="absolute inset-0 bg-grid-pattern pointer-events-none" 
      />



      {/* Elegant minimalist boundaries - Left-side vertical line has been removed per user preference for left-top brand area */}
      {/* Visual text decorations removed per user instructions */}

      {/* ========================================================= */}
      {/* BACKGROUND PORTABILITY IMAGE (Center masked circle style) */}
      {/* ========================================================= */}
      {scrollProgress >= 2.3 && isBgGuitarReady && (
        <motion.div
          style={{ 
            opacity: bgImageOpacity,
            y: bgImageY,
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          {/* Centered organic transparent container with NO border-radius boundary to allow infinite feathering */}
          <div 
            style={{
              width: '540px',
              height: '540px',
              maxWidth: '90vw',
              maxHeight: '90vw',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              // Elegant multi-stage custom soft feathered mask to guarantee no edge lines appear
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 95%)',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 95%)',
            }}
            className="bg-transparent"
          >
            {/* Elegant dark jigsaw guitar image cropped perfectly soft */}
            <img
              src={transparentBgGuitarImage}
              alt="Modu Pixie Background Colorful Jigsaw Guitar"
              referrerPolicy="no-referrer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'brightness(0.55) contrast(1.15) saturate(1.0)',
              }}
              className="select-none pointer-events-none"
            />
          </div>
        </motion.div>
      )}

      {/* ========================================================= */}
      {/* TEXT AREA ("Future of Portability" Sequence)             */}
      {/* ========================================================= */}
      {scrollProgress >= 0.65 && (
        <motion.div
          style={{ 
            opacity: parentTimelineOpacity,
            y: fopTextY,
          }}
          className="absolute z-10 text-center flex flex-col items-center justify-center pointer-events-none w-full px-6 max-w-3xl"
        >
          {/* Title text with custom scale, color, light font-weight, and dynamic flash brightness */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.h2 
              style={{ 
                color: fopTextColor,
                scale: fopTitleScale,
                opacity: blinkOpacityFactor, // Only the h2 element blinks!
                textShadow: flashGlowIntensity > 0 
                  ? `0 0 ${flashGlowIntensity * 30}px rgba(255, 255, 255, 0.8), 0 0 ${flashGlowIntensity * 10}px rgba(255, 255, 255, 0.5)`
                  : 'none'
              }}
              className="text-3xl md:text-5xl font-sans font-light tracking-[0.14em] uppercase whitespace-nowrap"
            >
              Future of Portability
            </motion.h2>

            {/* Subtext description in exactly 2 rows as requested - positioned absolutely below so it doesn't shift the title's vertical center */}
            <motion.p 
              style={{ 
                opacity: subtextOpacity,
                scale: subtextScale,
              }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-8 text-[11px] md:text-xs font-sans font-light text-neutral-400 w-screen max-w-xl text-center leading-relaxed tracking-[0.12em] uppercase whitespace-nowrap"
            >
              Our most evolved pickup system and rigid<br />
              structure in our most portable design.
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* ========================================================= */}
      {/* INTRO CANVAS AREA (Phase 1 Modu Pixie Text & Jigsaw)     */}
      {/* ========================================================= */}
      {scrollProgress < 1.2 && (
        <div className="absolute inset-0 w-full h-screen flex items-center justify-center flex-col z-10 pointer-events-none">
          
          {/* Animated "Modu Pixie" text - moves to center first, then magnifies and grows */}
          <motion.div
            style={{
              y: p1TextY,
              scale: p1TextScale,
              opacity: p1TextOpacity,
            }}
            className="absolute z-10 text-center flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl font-sans tracking-[0.24em] text-neutral-950 select-none pb-2 flex items-center justify-center gap-4">
              <span className="font-light animate-fade-in uppercase">Modu</span>
              <span className="font-bold animate-fade-in text-neutral-900 uppercase">Pixie</span>
            </h1>
          </motion.div>

          {/* Original Guitar Floating Component - Initial Position sits lower at bottom third */}
          <div className="relative flex items-center justify-center w-full max-w-2xl h-full">
            <motion.div
              style={{
                y: scrollProgress === 0 ? (baseGuitarY + mousePos.y) : guitarY,
                x: mousePos.x,
                scale: guitarScale,
                opacity: guitarOpacity,
                rotate: scrollProgress === 0 ? -15 : guitarRotate,
              }}
              animate={scrollProgress === 0 ? {
                y: [baseGuitarY + mousePos.y - 8, baseGuitarY + mousePos.y + 8, baseGuitarY + mousePos.y - 8],
                rotate: [-16, -14, -16]
              } : {}}
              transition={scrollProgress === 0 ? {
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              } : {}}
              className="relative z-25 w-full flex items-center justify-center"
            >
              <img
                src={guitarImage}
                alt="Modu Pixie Guitar"
                referrerPolicy="no-referrer"
                className="w-[85%] md:w-[75%] h-auto object-contain select-none max-h-[50vh]"
              />
            </motion.div>

            {/* Premium Soft Shadow Anchor aligned with the lowered initial position */}
            <motion.div
              style={{
                opacity: p1ShadowOpacity,
                y: scrollProgress === 0 ? (baseGuitarY + 160) : (guitarY + 160),
              }}
              animate={scrollProgress === 0 ? {
                scale: [1, 1.05, 1],
              } : { scale: 0 }}
              transition={scrollProgress === 0 ? {
                scale: { repeat: Infinity, duration: 5, ease: "easeInOut" }
              } : { duration: 0.4 }}
              className="absolute bottom-16 w-60 h-10 bg-neutral-900/30 rounded-[100%] blur-xl z-0 pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FINAL DESIGN STUDIO CTA ENTRANCE                         */}
      {/* ========================================================= */}
      {scrollProgress >= 3.8 && (
        <motion.button
          onClick={onDesignClick}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: Math.min(1.0, (scrollProgress - 3.8) / 0.5), 
            scale: 1 
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="absolute bottom-16 bg-white text-black hover:bg-neutral-200 font-medium text-xs tracking-widest uppercase py-4 px-10 rounded-full transition-all duration-300 cursor-pointer shadow-lg hover:shadow-white/10 z-30 whitespace-nowrap opacity-100 hover:scale-105 active:scale-95"
        >
          <span>Go to Design Studio</span>
        </motion.button>
      )}

      {/* Navigation Instruction Hint */}
      <AnimatePresence>
        {scrollProgress === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-24 right-16 hidden lg:flex items-center space-x-2 text-xs font-mono text-neutral-400 pointer-events-none"
          >
            <MousePointer size={14} className="animate-pulse" />
            <span>Hover to tilt & rotate</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
