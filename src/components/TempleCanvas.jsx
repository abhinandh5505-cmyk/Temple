import React, { Suspense, useRef, useEffect, useState, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { TempleScene } from './TempleScene';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Temple Canvas error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#faf6ef',
            color: '#2a1e14',
            padding: '24px',
            textAlign: 'center',
            zIndex: 10
          }}
        >
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', color: '#b38927', marginBottom: '8px' }}>
            Temple 3D Environment
          </p>
          <p style={{ fontSize: '0.9rem', color: '#685440', maxWidth: '420px', marginBottom: '16px' }}>
            Initializing WebGL rendering context for Sri Ranganathaswamy Temple.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '10px 22px',
              background: '#d4af37',
              color: '#241a10',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: 700,
              letterSpacing: '0.08em'
            }}
          >
            Re-enter Temple
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * 3D WebGL Canvas Container
 * Handles mouse tracking, mobile touch-drag rotation, and renders the 3D Temple scene.
 */
export function TempleCanvas({ progress = 0, freeLookEnabled = false }) {
  const mousePos = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(false);

  // Mouse & Touch interaction listeners
  useEffect(() => {
    // Mouse movement: Normalized device coordinates [-1, 1]
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Touch controls for mobile / tablet devices
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartRef.current.x = e.touches[0].clientX;
        touchStartRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const deltaX = (e.touches[0].clientX - touchStartRef.current.x) / window.innerWidth;
        const deltaY = (e.touches[0].clientY - touchStartRef.current.y) / window.innerHeight;

        mousePos.current.x = Math.min(1.2, Math.max(-1.2, mousePos.current.x + deltaX * 1.8));
        mousePos.current.y = Math.min(1.0, Math.max(-1.0, mousePos.current.y - deltaY * 1.8));

        touchStartRef.current.x = e.touches[0].clientX;
        touchStartRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Display helpful hint when user enters temple
  useEffect(() => {
    if (progress > 0.15 && progress < 0.35) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 4500);
      return () => clearTimeout(timer);
    } else if (progress <= 0.12 || progress >= 0.9) {
      setShowHint(false);
    }
  }, [progress]);

  return (
    <div className="temple-canvas-container" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* Interactive 3D Exploration Hint */}
      {showHint && (
        <div className="temple-explore-hint" aria-live="polite">
          <span className="hint-pulse" />
          <span>Move mouse or drag to look left, right, up & down in 3D</span>
        </div>
      )}

      <CanvasErrorBoundary>
        <Canvas
          shadows
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.38
          }}
          camera={{
            fov: 54,
            near: 0.1,
            far: 250,
            position: [0, 3.4, 14]
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#faf4ea']} />
          <Suspense fallback={null}>
            <TempleScene
              progress={progress}
              mousePos={mousePos}
              freeLookEnabled={freeLookEnabled}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}

export default TempleCanvas;
