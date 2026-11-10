import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getSmokeTexture } from '../utils/textureGenerator';

/**
 * Atmospheric Particles:
 * 1. Golden sacred dust motes drifting through light shafts
 * 2. Subtle incense smoke rising gently from temple burners
 * 
 * Built with full safety guards to prevent any undefined attribute crashes.
 */
export function Particles() {
  const dustRef = useRef();
  const smokeRef = useRef();
  const smokeTex = useMemo(() => getSmokeTexture(), []);

  // 1. Golden Dust Motes buffer setup
  const dustCount = 350;
  const [dustPositions, dustVelocities] = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    const vel = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const idx = i * 3;
      pos[idx] = (Math.random() - 0.5) * 8.0;
      pos[idx + 1] = 0.8 + Math.random() * 6.2;
      pos[idx + 2] = 4 - Math.random() * 125;

      vel[idx] = (Math.random() - 0.5) * 0.002;
      vel[idx + 1] = 0.002 + Math.random() * 0.004;
      vel[idx + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, []);

  // 2. Incense Smoke Particles setup
  const smokeCount = 30;
  const smokeData = useMemo(() => {
    const items = [];
    for (let i = 0; i < smokeCount; i++) {
      const isLeft = i % 2 === 0;
      const baseX = isLeft ? -2.2 : 2.2;
      items.push({
        baseX,
        x: baseX + (Math.random() - 0.5) * 0.3,
        y: 1.0 + Math.random() * 5.0,
        z: -113.8 + (Math.random() - 0.5) * 0.3,
        scale: 0.6 + Math.random() * 0.8,
        speedY: 0.008 + Math.random() * 0.012,
        driftPhase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    // Animate Golden Dust Motes safely
    const posAttr = dustRef.current?.geometry?.attributes?.position;
    if (posAttr && posAttr.array) {
      const positions = posAttr.array;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < dustCount; i++) {
        const idx = i * 3;
        positions[idx] += dustVelocities[idx] + Math.sin(time * 0.5 + i) * 0.001;
        positions[idx + 1] += dustVelocities[idx + 1];
        positions[idx + 2] += dustVelocities[idx + 2];

        if (positions[idx + 1] > 7.4) {
          positions[idx + 1] = 0.8;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Animate Smoke instances safely
    if (smokeRef.current && smokeRef.current.children) {
      const time = state.clock.getElapsedTime();
      smokeRef.current.children.forEach((child, i) => {
        const d = smokeData[i];
        if (!d || !child) return;

        d.y += d.speedY;
        d.rot += d.rotSpeed;
        const drift = Math.sin(time * 0.8 + d.driftPhase) * 0.22;

        child.position.set(d.baseX + drift, d.y, d.z);
        child.rotation.z = d.rot;

        const ageNorm = Math.min(1, Math.max(0, (d.y - 1.0) / 5.5));
        const curScale = d.scale * (1.0 + ageNorm * 1.6);
        child.scale.set(curScale, curScale, 1);

        if (child.material) {
          child.material.opacity = Math.max(0, 0.3 * (1.0 - ageNorm));
        }

        if (d.y > 6.4) {
          d.y = 1.0;
          d.rot = Math.random() * Math.PI * 2;
        }
      });
    }
  });

  return (
    <group>
      {/* 1. Dust Particles Points */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustCount}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#ffe299"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Incense Smoke Sprites */}
      <group ref={smokeRef}>
        {smokeData.map((d, i) => (
          <sprite key={`smoke-${i}`} position={[d.x, d.y, d.z]}>
            <spriteMaterial
              map={smokeTex}
              transparent
              opacity={0.25}
              depthWrite={false}
              blending={THREE.NormalBlending}
            />
          </sprite>
        ))}
      </group>
    </group>
  );
}
