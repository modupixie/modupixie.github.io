import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function InteractiveRevealAndVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const iframeId = "youtube-looping-player-cinematic";

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollYProgressState, setScrollYProgressState] = useState(0);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Monitor continuous scroll progress inside container natively
  // This guarantees perfect reliability even inside the sandboxed preview iframe!
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Sticky scrolling range calculation
      // Begins when the container's top is aligned at index 0 (rect.top <= 0)
      const stickyHeight = rect.height - viewportHeight;
      if (stickyHeight <= 0) return;
      
      const scrolled = -rect.top;
      const progress = Math.min(1.0, Math.max(0.0, scrolled / stickyHeight));
      setScrollYProgressState(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Trigger on initial loads to populate state correctly
    handleScroll();
    const t = setTimeout(handleScroll, 100);
    const t2 = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  // Calculate rise progress (video climbs from bottom to the middle after the background is fully revealed)
  // Rise starts at 0.35 scroll progress and ends at 0.70
  const riseStart = 0.35;
  const riseEnd = 0.70;
  const riseProgress = scrollYProgressState <= riseStart 
    ? 0.0 
    : scrollYProgressState >= riseEnd 
      ? 1.0 
      : (scrollYProgressState - riseStart) / (riseEnd - riseStart);
  
  // Calculate size expansion progress (video expands to full screen from 0.70 to 1.00 scroll progress)
  const expandStart = 0.70;
  const expandEnd = 1.00;
  const expandProgress = scrollYProgressState <= expandStart 
    ? 0.0 
    : scrollYProgressState >= expandEnd 
      ? 1.0 
      : (scrollYProgressState - expandStart) / (expandEnd - expandStart);

  // Video Opacity: transparent before rise starts, then fades in gracefully as it climbs up
  const videoOpacity = riseProgress === 0 ? 0.0 : Math.min(1.0, riseProgress * 2.5);

  // 16:9 box sizing for starting transition state
  const smallW = isMobile ? "240px" : "480px";
  const smallH = isMobile ? "135px" : "270px";

  // Interpolated Styles for the Video Shutter Box to achieve perfect fluid "enter + grow" animation
  const activeWidth = `calc(${smallW} + (${expandProgress} * (100vw - ${smallW})))`;
  const activeHeight = `calc(${smallH} + (${expandProgress} * (100vh - ${smallH})))`;
  const activeRadius = `${(1.0 - expandProgress) * 24}px`;
  
  // "밑에서 올라오면서" - Starts far down (90vh) and ascends center-stage seamlessly during the rise phase
  const activeY = `${(1.0 - riseProgress) * 90}vh`; 
  const dimOpacity = expandProgress * 0.95;
  const scaleRatio = 1.1 + (expandProgress * 0.22); // Elegant zoom depth effect

  const togglePlayPause = () => {
    const videoObj = videoRef.current;
    if (videoObj) {
      if (videoObj.paused) {
        videoObj.play().catch(err => console.log("Play interrupted: ", err));
        setIsPlaying(true);
      } else {
        videoObj.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const videoObj = videoRef.current;
    if (videoObj) {
      videoObj.muted = !videoObj.muted;
      setIsMuted(videoObj.muted);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[300vh] bg-transparent select-none z-10 mt-[-100vh]"
    >
      {/* Viewport fixed cinematic container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent z-10 flex items-center justify-center">

        {/* Elite Google Drive Background Image Underlay */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
          <img 
            src="https://lh3.googleusercontent.com/d/1Myw9t2IhsbDrrRlkvmZFIuge_a6B2kwR"
            alt="Cinematic Background Backdrop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 z-[1]" />
        </div>

        {/* Ambient Dark Dim overlay linking the expand transition */}
        <div 
          style={{ opacity: dimOpacity }}
          className="absolute inset-0 w-full h-full bg-black z-[2] pointer-events-none transition-opacity duration-300"
        />

        {/* ======================================================= */}
        {/* CINEMATIC ZOOM EXPANSION VIDEO CONTAINER                 */}
        {/* ======================================================= */}
        <div
          style={{
            width: activeWidth,
            height: activeHeight,
            borderRadius: activeRadius,
            transform: `translateY(${activeY})`,
            opacity: videoOpacity,
            willChange: 'width, height, border-radius, transform, opacity'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-[10] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.95)] bg-black flex items-center justify-center border border-neutral-800/10 pointer-events-auto select-none transition-all duration-75 ease-out"
        >
          {/* Custom click interaction plane overlay */}
          <div 
            onClick={togglePlayPause} 
            className="absolute inset-0 z-40 pointer-events-auto cursor-pointer bg-transparent" 
          />

          {/* Native loop video wrapper */}
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              src="https://raw.githubusercontent.com/SemPark/my-video-host/main/1234.mp4"
              loop
              muted
              playsInline
              autoPlay
              className="absolute w-full h-full object-cover"
              style={{ 
                filter: 'none',
                transform: `scale(${scaleRatio})`,
                transition: 'transform 75ms ease-out'
              }}
            />
          </div>

          {/* ======================================================= */}
          {/* HIGH-END OVERLAYS & PLAYER CONTROLLER GRAPHICS          */}
          {/* ======================================================= */}
          
          {/* A. Clean distraction-free view with no overlay elements or controllers */}

        </div>
        
      </div>
    </div>
  );
}
