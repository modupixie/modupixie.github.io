import React from 'react';

const googleDriveLogo = "https://lh3.googleusercontent.com/d/11isFp_b2oFwEEJsGIS7OQXo6NMbjQjbT";

interface NavigationProps {
  onDesignYoursClick: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  showCustomizer?: boolean;
}

export default function Navigation({ onDesignYoursClick, activeSection, onNavigate, showCustomizer = false }: NavigationProps) {
  const navItems = [
    { label: 'Features', id: 'features' },
    { label: 'Product', id: 'product' },
    { label: 'About', id: 'about' },
    { label: 'Gallery', id: 'gallery' },
  ];

  const isDark = showCustomizer;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between transition-all duration-500 backdrop-blur-md border-b ${
      isDark 
        ? 'bg-neutral-950/85 border-neutral-900/80 text-white' 
        : 'bg-white/80 border-neutral-100/50 text-neutral-900'
    }`}>
      {/* Brand Logo */}
      <div 
        className="flex items-center space-x-2 cursor-pointer select-none group"
        onClick={() => onNavigate('features')}
      >
        <img 
          src={googleDriveLogo} 
          alt="Modu Logo" 
          className={`h-9 w-auto object-contain hover:scale-105 transition-transform duration-300 ${
            isDark ? 'brightness-110 hue-rotate-15' : ''
          }`}
        />
      </div>

      {/* Nav Menu */}
      <div className="flex items-center space-x-10">
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = !showCustomizer && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 relative py-1 cursor-pointer focus:outline-none ${
                  isActive 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-neutral-500 hover:text-neutral-200' : 'text-neutral-400 hover:text-black')
                }`}
              >
                {item.label}
                <span 
                  className={`absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  } ${isDark ? 'bg-white' : 'bg-black'}`}
                />
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <button
          onClick={onDesignYoursClick}
          className={`${
            isDark 
              ? 'bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 hover:bg-neutral-700' 
              : 'bg-black hover:bg-neutral-800 text-white'
          } text-xs font-semibold tracking-widest uppercase py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer`}
        >
          Design Yours
        </button>
      </div>
    </nav>
  );
}
