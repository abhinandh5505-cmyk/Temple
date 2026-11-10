import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Hero } from './components/Hero';
import { TempleCanvas } from './components/TempleCanvas';
import { NavigationHUD } from './components/NavigationHUD';
import { ArchitectureCard } from './components/ArchitectureCard';
import { TempleDetailsSection } from './components/TempleDetailsSection';
import { Footer } from './components/Footer';

export function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [freeLookEnabled, setFreeLookEnabled] = useState(false);
  const trackRef = useRef(null);

  // Scroll listener that normalizes scroll progress within the 3D journey track
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight - window.innerHeight;

    if (trackHeight <= 0) return;

    const scrolled = scrollY - trackTop;
    const progress = Math.min(1, Math.max(0, scrolled / trackHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Smoothly seek to a specific progress (0 to 1) and update 3D view immediately
  const handleSeekProgress = useCallback((targetProgress) => {
    setScrollProgress(targetProgress);

    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight - window.innerHeight;
    const targetY = trackTop + targetProgress * trackHeight;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, []);

  // Keyboard navigation for effortless walkthrough
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setScrollProgress((prev) => {
          const next = Math.min(1, prev + 0.15);
          handleSeekProgress(next);
          return next;
        });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setScrollProgress((prev) => {
          const next = Math.max(0, prev - 0.15);
          handleSeekProgress(next);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSeekProgress]);

  const handleStartJourney = () => {
    handleSeekProgress(0.22);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleOpenDetails = () => {
    const detailsElem = document.getElementById('temple-details');
    if (detailsElem) {
      detailsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      {/* 3D SCROLL JOURNEY SECTION */}
      <section ref={trackRef} className="journey-scroll-track">
        <div className="journey-sticky-viewport">
          {/* 1. Fully Immersive Interactive 3D WebGL Temple Environment */}
          <TempleCanvas
            progress={scrollProgress}
            freeLookEnabled={freeLookEnabled}
          />

          {/* 2. 100% Preserved Hero Section (Starts at progress 0, smoothly dissolves into 3D portal) */}
          <Hero
            progress={scrollProgress}
            onStartJourney={handleStartJourney}
          />

          {/* 3. Interactive Navigation HUD (Top bar, progress track, audio toggle) */}
          <NavigationHUD
            progress={scrollProgress}
            onSeekProgress={handleSeekProgress}
            freeLookEnabled={freeLookEnabled}
            onToggleFreeLook={() => setFreeLookEnabled((prev) => !prev)}
            onOpenDetails={handleOpenDetails}
          />

          {/* 4. Elegant Architecture Highlight Overlay Card (Appears as journey unfolds) */}
          {scrollProgress > 0.05 && (
            <ArchitectureCard
              progress={scrollProgress}
              onLearnMore={handleOpenDetails}
            />
          )}
        </div>
      </section>

      {/* COMPREHENSIVE TEMPLE ARCHITECTURE & SPIRITUAL GUIDE SECTION */}
      <TempleDetailsSection id="temple-details" />

      {/* SACRED FOOTER */}
      <Footer onScrollToTop={handleScrollToTop} />
    </div>
  );
}

export default App;

