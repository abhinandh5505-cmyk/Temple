import React, { useRef, useEffect, useState } from 'react';

/**
 * 100% Preserved Temple Interior View
 * Retains the approved interior reference artwork:
 * - Monolithic carved granite pillars with intricate divine sculptures
 * - Flanking golden shrines of Lord Ganesha and Lord Murugan
 * - Magnificent golden Makara Torana framing Lord Ranganatha in Sayana posture
 * - Polished reflective marble floor reflecting warm temple lamps
 * - Gilded coffered ceiling with sacred floral mandalas
 * - Authentic multi-tiered brass Kuthu Vilakku oil lamps
 *
 * Smoothly scales and dollies inward as scroll progress advances toward the Sanctum Sanctorum,
 * with real-time responsive mouse parallax / Free Look navigation and gentle sacred atmosphere.
 */
export function TempleInteriorView({ progress = 0, freeLookEnabled = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth mouse coordinates tracking with normalized device coordinates [-1, 1]
  useEffect(() => {
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Silky 60fps RAF loop for mouse interpolation, 3D parallax & sacred floating dust motes
  useEffect(() => {
    // Generate sacred incense & dust particles
    const particleCount = 42;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.6 + 0.6,
        speedY: -(Math.random() * 0.35 + 0.12),
        speedX: (Math.random() - 0.5) * 0.22,
        opacity: Math.random() * 0.5 + 0.25,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulseVal: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      // 1. Smooth lerp mouse position
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.055;
      m.y += (m.targetY - m.y) * 0.055;

      // 2. Compute parallax transform
      if (containerRef.current) {
        const lookMultiplier = freeLookEnabled ? 2.6 : 1.0;
        const tiltX = -m.y * 3.2 * lookMultiplier; // degrees
        const tiltY = m.x * 4.2 * lookMultiplier;  // degrees
        const panX = m.x * 16 * lookMultiplier;    // px
        const panY = m.y * 12 * lookMultiplier;    // px

        // Progress dolly trajectory:
        // Progress 0.00 -> 0.12: Exterior entrance approach
        // Progress 0.12 -> 1.00: Smooth cinematic glide into the Garbhagriha
        const journeyProgress = Math.max(0, (progress - 0.10) / 0.90);
        const scale = 1.0 + journeyProgress * 0.28;
        const dollyY = journeyProgress * -20; // gently centers sanctum on closer approach

        containerRef.current.style.transform = `
          perspective(1100px)
          rotateX(${tiltX.toFixed(2)}deg)
          rotateY(${tiltY.toFixed(2)}deg)
          translate3d(${panX.toFixed(1)}px, ${(panY + dollyY).toFixed(1)}px, 0px)
          scale(${scale.toFixed(3)})
        `;
      }

      // 3. Render sacred floating particles on overlay canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((p) => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.pulseVal += p.pulseSpeed;

            if (p.y < -10) {
              p.y = canvas.height + 10;
              p.x = Math.random() * canvas.width;
            }
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;

            const alpha = p.opacity * (0.65 + 0.35 * Math.sin(p.pulseVal));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 222, 140, ${alpha.toFixed(2)})`;
            ctx.shadowColor = 'rgba(255, 195, 75, 0.7)';
            ctx.shadowBlur = 4;
            ctx.fill();
          });
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Keep particle canvas matched to window dimensions
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [progress, freeLookEnabled]);

  return (
    <div
      className="temple-interior-viewport"
      aria-label="Sri Ranganathaswamy Temple Sanctum Interior View"
    >
      {/* Ambient Widescreen Atmosphere Blur (Fills widescreen displays seamlessly with matching warm temple tones) */}
      <img
        className="temple-interior-backdrop-blur"
        src="/images/temple-interior.jpg"
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      {/* 3D Cinematic Parallax & Walkthrough Rig */}
      <div
        ref={containerRef}
        className="temple-interior-rig"
        style={{
          transformOrigin: '50% 64%',
          willChange: 'transform'
        }}
      >
        {/* Exact, untouched interior reference artwork */}
        <img
          className={`temple-interior-artwork ${isLoaded ? 'loaded' : ''}`}
          src="/images/temple-interior.jpg"
          alt="Sri Ranganathaswamy Temple Interior Sanctum view with carved Dravidian columns, golden Ganesha and Murugan shrines, glowing brass deepams, and Sri Ranganatha in the Garbhagriha"
          onLoad={() => setIsLoaded(true)}
          draggable="false"
        />

        {/* Devotional Warm Ambient Deepam Lamp Glow Accent */}
        <div className="temple-interior-glow-overlay" aria-hidden="true" />
      </div>

      {/* Sacred Floating Golden Dust & Incense Overlay */}
      <canvas
        ref={canvasRef}
        className="temple-interior-particles"
        aria-hidden="true"
      />
    </div>
  );
}

export default TempleInteriorView;
