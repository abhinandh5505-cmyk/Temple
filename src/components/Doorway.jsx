import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  getGraniteTexture,
  getTempleDoorTexture,
  getCarvedPillarTexture
} from '../utils/textureGenerator';

/**
 * Exterior Entrance Portal (Mahadvaram)
 * Massive carved Dravidian gateway with double-opening antique teakwood doors,
 * brass studs, torana arch, and flanking guardian dvarapalaka pilasters.
 * 
 * IMPORTANT: The central portal (between X = -2.15 and X = +2.15, Y = 0 to 8)
 * is completely open air so the interior pillared hall is vividly visible through the doors!
 */
export function Doorway({ progress }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();

  // Load procedural textures
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const doorTex = useMemo(() => getTempleDoorTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);

  // Compute door swing based on scroll progress:
  // Doors begin opening smoothly as camera approaches (progress 0.10 to 0.26)
  // Reaches full wide open angle (approx 85 deg) so visitor passes through unimpeded
  useFrame(() => {
    let openFactor = 0;
    if (progress >= 0.10 && progress <= 0.30) {
      openFactor = THREE.MathUtils.smoothstep(progress, 0.10, 0.26);
    } else if (progress > 0.30) {
      openFactor = 1;
    }

    const angle = openFactor * (Math.PI * 0.48);
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = angle;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = -angle;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. OUTER STONE FACADE WALLS (Left, Right, and Upper Lintel — Middle is OPEN) */}
      {/* Left Wall */}
      <mesh position={[-5.8, 6.0, 0]} receiveShadow>
        <boxGeometry args={[7.2, 12, 1.2]} />
        <meshStandardMaterial map={graniteTex} roughness={0.75} color="#f7f2ea" />
      </mesh>
      {/* Right Wall */}
      <mesh position={[5.8, 6.0, 0]} receiveShadow>
        <boxGeometry args={[7.2, 12, 1.2]} />
        <meshStandardMaterial map={graniteTex} roughness={0.75} color="#f7f2ea" />
      </mesh>
      {/* Upper Lintel Wall above doorway */}
      <mesh position={[0, 10.2, 0]} receiveShadow>
        <boxGeometry args={[4.5, 3.6, 1.2]} />
        <meshStandardMaterial map={graniteTex} roughness={0.75} color="#f7f2ea" />
      </mesh>

      {/* 2. DOORWAY REVEAL SURROUND (Jambs & Soffit — Middle is OPEN) */}
      {/* Left Jamb */}
      <mesh position={[-2.35, 4.2, 0]}>
        <boxGeometry args={[0.4, 8.4, 1.4]} />
        <meshStandardMaterial map={carvedTex} roughness={0.7} color="#f4ede1" />
      </mesh>
      {/* Right Jamb */}
      <mesh position={[2.35, 4.2, 0]}>
        <boxGeometry args={[0.4, 8.4, 1.4]} />
        <meshStandardMaterial map={carvedTex} roughness={0.7} color="#f4ede1" />
      </mesh>
      {/* Door Soffit / Ceiling */}
      <mesh position={[0, 8.35, 0]}>
        <boxGeometry args={[4.8, 0.35, 1.4]} />
        <meshStandardMaterial map={carvedTex} roughness={0.7} color="#f4ede1" />
      </mesh>

      {/* 3. INTRICATELY CARVED GATEWAY LINTELS & TORANA (Above Door) */}
      <group position={[0, 8.8, 0.3]}>
        {/* Tiered corbelled lintel */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6.6, 0.6, 1.6]} />
          <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f6efe4" />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[7.4, 0.5, 1.8]} />
          <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f3ebe0" />
        </mesh>
        {/* Sacred Kalasa / Torana Crest atop door */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.6, 0.8, 16]} />
          <meshStandardMaterial color="#c5a044" roughness={0.4} metalness={0.65} />
        </mesh>
        <mesh position={[-1.8, 1.0, 0]}>
          <cylinderGeometry args={[0.2, 0.45, 0.65, 12]} />
          <meshStandardMaterial color="#b38f38" roughness={0.45} metalness={0.6} />
        </mesh>
        <mesh position={[1.8, 1.0, 0]}>
          <cylinderGeometry args={[0.2, 0.45, 0.65, 12]} />
          <meshStandardMaterial color="#b38f38" roughness={0.45} metalness={0.6} />
        </mesh>
      </group>

      {/* 4. FLANKING GUARDIAN PILASTERS (Dvarapalaka reliefs) */}
      <group position={[-3.2, 4.2, 0.3]}>
        <mesh>
          <boxGeometry args={[1.2, 8.2, 1.2]} />
          <meshStandardMaterial map={carvedTex} roughness={0.85} color="#7d6d5a" />
        </mesh>
        {/* Guardian figure silhouette relief */}
        <mesh position={[0, -0.4, 0.62]}>
          <boxGeometry args={[0.7, 3.4, 0.12]} />
          <meshStandardMaterial color="#544537" roughness={0.8} />
        </mesh>
      </group>
      <group position={[3.2, 4.2, 0.3]}>
        <mesh>
          <boxGeometry args={[1.2, 8.2, 1.2]} />
          <meshStandardMaterial map={carvedTex} roughness={0.85} color="#7d6d5a" />
        </mesh>
        {/* Guardian figure silhouette relief */}
        <mesh position={[0, -0.4, 0.62]}>
          <boxGeometry args={[0.7, 3.4, 0.12]} />
          <meshStandardMaterial color="#544537" roughness={0.8} />
        </mesh>
      </group>

      {/* 5. STONE THRESHOLD (Udumbaram) with auspicious brass plate */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.3, 1.4]} />
        <meshStandardMaterial map={graniteTex} roughness={0.7} color="#483d32" />
      </mesh>
      <mesh position={[0, 0.31, 0]}>
        <boxGeometry args={[4.2, 0.04, 0.5]} />
        <meshStandardMaterial color="#d4af37" roughness={0.35} metalness={0.75} />
      </mesh>

      {/* 6. LEFT DOOR LEAF (Pivots from left edge at x = -2.15) */}
      <group position={[-2.15, 0.3, 0]}>
        <group ref={leftDoorRef}>
          <mesh position={[1.06, 3.9, 0]} castShadow>
            <boxGeometry args={[2.12, 7.8, 0.14]} />
            <meshStandardMaterial
              map={doorTex}
              roughness={0.7}
              metalness={0.25}
              bumpScale={0.08}
            />
          </mesh>
          {/* Heavy Antique Brass Door Handle / Ring */}
          <mesh position={[1.85, 3.6, 0.1]}>
            <torusGeometry args={[0.15, 0.035, 12, 24]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* 7. RIGHT DOOR LEAF (Pivots from right edge at x = +2.15) */}
      <group position={[2.15, 0.3, 0]}>
        <group ref={rightDoorRef}>
          <mesh position={[-1.06, 3.9, 0]} castShadow>
            <boxGeometry args={[2.12, 7.8, 0.14]} />
            <meshStandardMaterial
              map={doorTex}
              roughness={0.7}
              metalness={0.25}
              bumpScale={0.08}
            />
          </mesh>
          {/* Heavy Antique Brass Door Handle / Ring */}
          <mesh position={[-1.85, 3.6, 0.1]}>
            <torusGeometry args={[0.15, 0.035, 12, 24]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
