import React from 'react';
import { Eye, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

const WAYPOINTS = [
  { id: 'gopuram', target: 0.0, label: 'Rajagopuram', sanskrit: 'गोपुरम्' },
  { id: 'doors', target: 0.22, label: 'Mahadvaram', sanskrit: 'द्वारम्' },
  { id: 'corridor', target: 0.42, label: 'Prakaram', sanskrit: 'प्राकार' },
  { id: 'ceiling', target: 0.60, label: 'Vitanam', sanskrit: 'वितानम्' },
  { id: 'mandapam', target: 0.76, label: 'Mandapam', sanskrit: 'मण्डप' },
  { id: 'sanctum', target: 0.95, label: 'Garbhagriha', sanskrit: 'गर्भगृह' }
];

export function NavigationHUD({
  progress,
  onSeekProgress,
  freeLookEnabled,
  onToggleFreeLook,
  onOpenDetails
}) {
  // Compute previous and next waypoint targets
  const currentIndex = WAYPOINTS.findIndex((wp, idx) => {
    const nextWp = WAYPOINTS[idx + 1];
    if (!nextWp) return true;
    return progress < nextWp.target - 0.05;
  });

  const handlePrev = () => {
    const prevIdx = Math.max(0, currentIndex - 1);
    onSeekProgress(WAYPOINTS[prevIdx].target);
  };

  const handleNext = () => {
    const nextIdx = Math.min(WAYPOINTS.length - 1, currentIndex + 1);
    onSeekProgress(WAYPOINTS[nextIdx].target);
  };

  return (
    <div className="navigation-hud">
      {/* Top Bar */}
      <header className="hud-top-bar">
        <div className="hud-brand">
          <div className="hud-namam-emblem">
            <span className="namam-t-left"></span>
            <span className="namam-t-center"></span>
            <span className="namam-t-right"></span>
          </div>
          <div className="hud-brand-text">
            <h1 className="hud-site-title">SRI RANGANATHASWAMY TEMPLE</h1>
            <p className="hud-site-subtitle">Srirangam • Bhooloka Vaikuntham</p>
          </div>
        </div>

        <div className="hud-actions">
          {/* Free Look Toggle */}
          <button
            className={`hud-btn ${freeLookEnabled ? 'active' : ''}`}
            onClick={onToggleFreeLook}
            title={freeLookEnabled ? 'Disable Free Look Mode' : 'Enable Free Look (Explore with mouse)'}
            aria-label="Toggle Free Look Mode"
          >
            <Eye size={16} />
            <span className="btn-label">{freeLookEnabled ? 'Free Look Active' : 'Free Look'}</span>
          </button>

          {/* Sound Ambiance Toggle */}
          <AudioPlayer />

          {/* Architecture Guide Link */}
          <button
            className="hud-btn guide-btn"
            onClick={onOpenDetails}
            title="Read Complete Temple Architecture Guide"
            aria-label="Open Temple Architecture Guide"
          >
            <BookOpen size={16} />
            <span className="btn-label">Architecture</span>
          </button>
        </div>
      </header>

      {/* Side / Bottom Waypoint Track */}
      <nav className="hud-waypoints-nav" aria-label="Journey Waypoint Navigator">
        <div className="waypoints-track">
          <div
            className="waypoints-fill"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>

        <div className="waypoints-controls-row">
          {/* Step Backward Button */}
          <button
            className="waypoint-step-btn"
            onClick={handlePrev}
            disabled={progress <= 0.05}
            title="Step back in temple journey"
            aria-label="Step back in temple journey"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Waypoints List */}
          <div className="waypoints-list">
            {WAYPOINTS.map((wp, idx) => {
              const isActive =
                Math.abs(progress - wp.target) < 0.1 ||
                (idx === 0 && progress < 0.12) ||
                (idx === WAYPOINTS.length - 1 && progress > 0.88);

              return (
                <button
                  key={wp.id}
                  className={`waypoint-node ${isActive ? 'active' : ''}`}
                  onClick={() => onSeekProgress(wp.target)}
                  title={`Jump to ${wp.label} (${wp.sanskrit})`}
                >
                  <span className="node-dot"></span>
                  <div className="node-text">
                    <span className="node-sanskrit">{wp.sanskrit}</span>
                    <span className="node-label">{wp.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step Forward Button */}
          <button
            className="waypoint-step-btn"
            onClick={handleNext}
            disabled={progress >= 0.95}
            title="Step forward into temple journey"
            aria-label="Step forward into temple journey"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </nav>
    </div>
  );
}
