/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navigation from './components/Navigation';
import InteractiveScrollSection from './components/InteractiveScrollSection';
import GuitarCustomizer from './components/GuitarCustomizer';
import { 
  FeaturesSection, 
  GallerySection, 
  AboutSection, 
  CTASection
} from './components/AestheticBlocks';
import InteractiveRevealAndVideo from './components/InteractiveRevealAndVideo';
import SpecsSection from './components/SpecsSection';

const guitarImage = "https://lh3.googleusercontent.com/d/1voDFyqMiClligplKpUgXdnfo5y5AFxYv";

export default function App() {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [activeSection, setActiveSection] = useState('features');

  // Handle cross-component opening of the 3D Customizer via standard client custom events
  React.useEffect(() => {
    const handleOpenCustomizer = () => {
      setShowCustomizer(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('open-3d-customizer', handleOpenCustomizer);
    return () => window.removeEventListener('open-3d-customizer', handleOpenCustomizer);
  }, []);

  // Multi-section scroll observer to automatically update active navbar tab when scrolling
  React.useEffect(() => {
    if (showCustomizer) return;

    const handleScrollDetect = () => {
      const sections = ['features', 'product', 'about', 'gallery'];
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // If we are at the very top, always activate features
      if (scrollY < 50) {
        setActiveSection('features');
        return;
      }

      let active = 'features';
      let maxOverlap = -Infinity;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Calculate how much of this section overlaps with the center-view of viewport [30%, 70%]
          const overlapTop = Math.max(0, rect.top);
          const overlapBottom = Math.min(viewportHeight, rect.bottom);
          const overlapHeight = Math.max(0, overlapBottom - overlapTop);
          
          if (overlapHeight > maxOverlap && overlapHeight > 0) {
            maxOverlap = overlapHeight;
            active = id;
          }
        }
      }
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScrollDetect, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDetect);
  }, [showCustomizer]);

  // Unified navigator
  const handleNavigate = (id: string) => {
    setActiveSection(id);
    setShowCustomizer(false); // seamless return from customizer if navigating to landing sections
    
    // Set hero scroll progress depending on target section
    if (id !== 'features') {
      window.dispatchEvent(new CustomEvent('set-hero-scroll-progress', { detail: 4.5 }));
    } else {
      window.dispatchEvent(new CustomEvent('set-hero-scroll-progress', { detail: 0 }));
    }

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 overflow-x-clip antialiased">
      {/* Precision Top Navigation bar */}
      <Navigation 
        onDesignYoursClick={() => {
          setShowCustomizer(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        showCustomizer={showCustomizer}
      />

      {/* Main viewport router */}
      {showCustomizer ? (
        <GuitarCustomizer 
          guitarImage={guitarImage}
          onBackToLanding={() => {
            setShowCustomizer(false);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }}
        />
      ) : (
        <div className="relative bg-black text-white">

          {/* Scroll Parallax Story Screen (representing State 1, 2, 3 matching user instructions) */}
          <div id="features">
            <InteractiveScrollSection 
              guitarImage={guitarImage}
              onDesignClick={() => {
                setShowCustomizer(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Core Feature blocks */}
          <FeaturesSection />

          {/* Symmetrical Product Innovations Section: Blind-reveal, Growing original contrast Video, and Parts Breakdown */}
          <div id="product" className="relative bg-transparent">
            {/* Interactive blind reveal and growing video transition */}
            <InteractiveRevealAndVideo />

            {/* Premium specs comparison blocks for Puzzle and Color series */}
            <SpecsSection />
          </div>

          {/* Core brand concept & story info */}
          <AboutSection />

          {/* Beautiful interactive grid of customizable styles */}
          <div id="gallery">
            <GallerySection />
            <CTASection />
          </div>

          {/* Simple Elite Footer */}
          <footer className="bg-neutral-950 text-neutral-500 py-16 px-8 border-t border-neutral-900 font-mono text-xs">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <img 
                src="https://lh3.googleusercontent.com/d/11isFp_b2oFwEEJsGIS7OQXo6NMbjQjbT" 
                alt="Modu Brand Logo" 
                className="h-9 w-auto object-contain select-none pointer-events-none brightness-110"
              />
              <p>&copy; 2026 Modu Guitar Atelier Inc. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#features" onClick={() => handleNavigate('features')} className="hover:text-white transition-colors">Top</a>
                <a href="#product" onClick={() => handleNavigate('product')} className="hover:text-white transition-colors">Innovations</a>
                <a href="#about" onClick={() => handleNavigate('about')} className="hover:text-white transition-colors">About</a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

