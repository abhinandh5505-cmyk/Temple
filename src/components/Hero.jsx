import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

/**
 * 100% Preserved Hero Section
 * Retains the approved exterior artwork:
 * - Original SREERANGANADHA typography
 * - Magnificent ivory-white temple Gopuram
 * - Cloudy sky background
 * - Temple's water reflection
 * - Original color palette and composition
 *
 * Smoothly scales and dissolves toward the gateway portal as scroll begins,
 * transitioning seamlessly into the live 3D temple environment without abrupt jumps.
 */
export function Hero({ progress = 0, onStartJourney }) {
  // Smooth continuous transition from exterior into 3D interior (progress 0.0 -> 0.18)
  const fadeProgress = Math.min(1, Math.max(0, progress / 0.18));
  const opacity = 1 - fadeProgress;
  const scale = 1 + fadeProgress * 0.85;

  if (opacity <= 0.005) {
    return null;
  }

  return (
    <div
      className="hero-wrapper"
      style={{
        opacity,
        pointerEvents: opacity < 0.2 ? 'none' : 'auto',
        transform: `scale(${scale})`,
        transformOrigin: '50% 68%',
        transition: 'opacity 0.1s ease-out'
      }}
    >
      <main className="hero" aria-label="Sreeranganadha temple hero">
        <img
          className="hero-artwork"
          src="/images/hero-reference.jpg"
          alt="Ivory Sri Ranganathaswamy temple gopuram beneath soft clouds, reflected in still water, with the title SREERANGANADHA"
          draggable="false"
        />
      </main>

      {/* Elegant Devotional Scroll Cue */}
      <button
        className="hero-scroll-cue"
        onClick={onStartJourney}
        type="button"
        aria-label="Enter Sri Ranganathaswamy Temple 3D Walkthrough"
      >
        <div className="cue-sanskrit">ॐ श्री रङ्गनाथाय नमः</div>
        <div className="cue-label-row">
          <Sparkles size={14} className="cue-sparkle" />
          <span className="cue-label">ENTER THE SACRED TEMPLE</span>
          <Sparkles size={14} className="cue-sparkle" />
        </div>
        <div className="cue-icon">
          <ChevronDown size={20} />
        </div>
      </button>
    </div>
  );
}

export default Hero;
