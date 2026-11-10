import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getFlameTexture } from '../utils/textureGenerator';

/**
 * Traditional South Indian Kuthu Vilakku (Tiered Brass Oil Lamp)
 * Features authentic baluster shaft, oil reservoir plates, auspicious Hamsa/peacock finial,
 * and realistic animated flickering oil-lamp flames with dynamic golden lighting.
 */
export function KuthuVilakku({ position = [0, 0, 0], scale = 1, withLight = false }) {
  const flameSpriteRef = useRef();
  const flameCoreRef = useRef();
  const lightRef = useRef();
  const flameTex = useMemo(() => getFlameTexture(), []);

  // Subtle natural flame flickering animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const phase = position[0] * 3.7 + position[2] * 2.1;
    const flicker = Math.sin(time * 12 + phase) * 0.08 + Math.cos(time * 18 + phase * 1.5) * 0.05;

    if (flameSpriteRef.current) {
      flameSpriteRef.current.scale.x = (0.55 + flicker * 0.4) * scale;
      flameSpriteRef.current.scale.y = (0.78 + flicker * 0.6) * scale;
    }
    if (flameCoreRef.current) {
      flameCoreRef.current.scale.setScalar((1 + flicker * 0.3) * scale);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 1.4 + flicker * 0.4;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* 1. Ornate Circular Base Pedestal (Koorma/Padma Pitha) */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.55, 0.24, 24]} />
        <meshStandardMaterial color="#887148" roughness={0.58} metalness={0.42} />
      </mesh>
      {/* Molded lotus petal collar */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.22, 0.16, 20]} />
        <meshStandardMaterial color="#92784b" roughness={0.58} metalness={0.4} />
      </mesh>

      {/* 2. Lower Molded Baluster Shaft */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 0.72, 16]} />
        <meshStandardMaterial color="#92784b" roughness={0.58} metalness={0.4} />
      </mesh>
      {/* Central decorative golden bead node */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#9b8050" roughness={0.56} metalness={0.42} />
      </mesh>

      {/* 3. Upper Shaft */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.11, 0.65, 16]} />
        <meshStandardMaterial color="#92784b" roughness={0.58} metalness={0.4} />
      </mesh>

      {/* 4. Main Multi-Wick Oil Plate (Deepam Thattu / Agal) */}
      <mesh position={[0, 1.92, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.28, 0.18, 24]} />
        <meshStandardMaterial color="#92784b" roughness={0.58} metalness={0.4} />
      </mesh>
      {/* Oil surface */}
      <mesh position={[0, 1.98, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.04, 24]} />
        <meshStandardMaterial color="#543710" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* 5. Auspicious Hamsa / Peacock Finial (Prabhavali) atop lamp */}
      <mesh position={[0, 2.22, 0]} castShadow>
        <coneGeometry args={[0.18, 0.42, 12]} />
        <meshStandardMaterial color="#9b8050" roughness={0.56} metalness={0.42} />
      </mesh>
      {/* Finial tip */}
      <mesh position={[0, 2.45, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#ad925d" roughness={0.58} metalness={0.38} />
      </mesh>

      {/* 6. Glowing Animated Flame Sprite */}
      <sprite ref={flameSpriteRef} position={[0, 2.15, 0]} scale={[0.55 * scale, 0.78 * scale, 1]}>
        <spriteMaterial map={flameTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>

      {/* Luminous Flame Core */}
      <mesh ref={flameCoreRef} position={[0, 2.08, 0]}>
        <sphereGeometry args={[0.075 * scale, 12, 12]} />
        <meshBasicMaterial color="#fff3b0" />
      </mesh>

      {/* Small warm flame accent, not an architectural light source. */}
      {withLight && (
        <pointLight
          ref={lightRef}
          position={[0, 2.2, 0]}
          color="#ffb347"
          intensity={0.55}
          distance={8}
          decay={2}
          castShadow={false}
        />
      )}
    </group>
  );
}

export default KuthuVilakku;
