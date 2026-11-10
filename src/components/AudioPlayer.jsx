import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return soundEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
    });
  }, []);

  const handleToggle = () => {
    soundEngine.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      className={`audio-toggle-btn ${isPlaying ? 'playing' : ''}`}
      title={isPlaying ? 'Mute Sacred Ambiance' : 'Play Sacred Ambiance (Tanpura & Temple Bells)'}
      aria-label="Toggle Sacred Temple Audio"
    >
      {isPlaying ? (
        <>
          <Volume2 className="icon" size={18} />
          <span className="audio-label">Sacred Ambiance</span>
          <span className="audio-bars">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="icon" size={18} />
          <span className="audio-label">Sound Off</span>
        </>
      )}
    </button>
  );
}

