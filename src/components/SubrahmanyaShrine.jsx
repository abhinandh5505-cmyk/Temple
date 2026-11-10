import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getGraniteTexture, getCarvedPillarTexture, getFlameTexture } from '../utils/textureGenerator';

/**
 * Lord Subrahmanya Shrine (Right Side of Temple Aisle)
 * Authentic South Indian Dravidian stone shrine housing Lord Sri Subrahmanya (Murugan / Kartikeya)
 * with golden sculpted idol, divine Vel spear, royal peacock (Mayil) vahana,
 * golden Prabhavali arch, fresh floral garlands, brass lamps, and warm niche lighting.
 */
export function SubrahmanyaShrine({ position = [5.6, 0, -48] }) {
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);
  const flameTex = useMemo(() => getFlameTexture(), []);

  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      {/* 1. ELEVATED TIERED GRANITE ALTAR & PEDESTAL (Adhishthana in Ivory Marble) */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.9, 2.2]} />
        <meshStandardMaterial map={graniteTex} roughness={0.7} color="#f4ede1" />
      </mesh>
      {/* Molded Padma (Lotus) altar lip */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.5, 0.25, 24]} />
        <meshStandardMaterial map={carvedTex} roughness={0.65} color="#fbf6ee" />
      </mesh>
      {/* Golden stepped pedestal top */}
      <mesh position={[0, 1.1, 0]} receiveShadow>
        <cylinderGeometry args={[1.15, 1.25, 0.1, 24]} />
        <meshStandardMaterial color="#e5c158" roughness={0.25} metalness={0.82} />
      </mesh>

      {/* 2. ORNATE WALL NICHE & SHRINE SURROUND (Devakoshta) */}
      <group position={[0, 3.2, -0.6]}>
        {/* Niche Back Wall in Ivory Stone */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[2.8, 4.2, 0.4]} />
          <meshStandardMaterial map={graniteTex} roughness={0.7} color="#f6f0e5" />
        </mesh>
        {/* Left & Right Flanking Carved Niche Pilasters */}
        <mesh position={[-1.3, 0, 0.35]} castShadow>
          <boxGeometry args={[0.35, 4.2, 0.4]} />
          <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f4eee2" />
        </mesh>
        <mesh position={[1.3, 0, 0.35]} castShadow>
          <boxGeometry args={[0.35, 4.2, 0.4]} />
          <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f4eee2" />
        </mesh>
        {/* Niche Lintel Beam */}
        <mesh position={[0, 2.1, 0.35]} castShadow>
          <boxGeometry args={[3.2, 0.45, 0.5]} />
          <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f4eee2" />
        </mesh>
        {/* Arched Torana Crest above Niche */}
        <mesh position={[0, 2.65, 0.35]} castShadow>
          <torusGeometry args={[1.1, 0.22, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Kalasa Crest Finial */}
        <mesh position={[0, 3.8, 0.35]} castShadow>
          <cylinderGeometry args={[0.15, 0.3, 0.5, 12]} />
          <meshStandardMaterial color="#f0cb5a" roughness={0.25} metalness={0.85} />
        </mesh>
      </group>

      {/* 3. GOLDEN PRABHAVALI (Aureole Arch behind Deity) */}
      <group position={[0, 2.6, -0.3]}>
        {/* Golden Arch Ring */}
        <mesh position={[0, 0.4, 0]}>
          <torusGeometry args={[1.05, 0.12, 12, 28, Math.PI]} />
          <meshStandardMaterial color="#f0cb5a" roughness={0.22} metalness={0.85} />
        </mesh>
        {/* Radiating Flame Rays around Arch */}
        {[-0.8, -0.5, -0.2, 0.2, 0.5, 0.8].map((angle, idx) => (
          <mesh
            key={`subrahmanya-ray-${idx}`}
            position={[Math.sin(angle) * 1.15, 0.4 + Math.cos(angle) * 1.15, 0]}
            rotation={[0, 0, -angle]}
          >
            <coneGeometry args={[0.06, 0.22, 8]} />
            <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* 4. SCULPTED GOLDEN LORD SUBRAHMANYA IDOL */}
      <group position={[0, 1.15, 0]}>
        {/* Double-Lotus Base (Vishva Padma Pitha) */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.8, 0.2, 20]} />
          <meshStandardMaterial color="#d4af37" roughness={0.28} metalness={0.82} />
        </mesh>

        {/* Regal Standing Slender Legs (Dravidian Samabhanga/Tribhanga posture) */}
        <mesh position={[-0.14, 0.7, 0.05]} castShadow>
          <cylinderGeometry args={[0.11, 0.14, 1.0, 14]} />
          <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
        </mesh>
        <mesh position={[0.14, 0.7, 0.05]} castShadow>
          <cylinderGeometry args={[0.11, 0.14, 1.0, 14]} />
          <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
        </mesh>

        {/* Golden Pitambara Dhoti & Hip Ornaments (Katisutra) */}
        <mesh position={[0, 1.1, 0.06]} castShadow>
          <cylinderGeometry args={[0.26, 0.32, 0.65, 16]} />
          <meshStandardMaterial color="#746047" roughness={0.88} metalness={0.04} />
        </mesh>
        {/* Hanging pleated sash */}
        <mesh position={[0, 0.85, 0.18]} castShadow>
          <boxGeometry args={[0.16, 0.6, 0.05]} />
          <meshStandardMaterial color="#806a4a" roughness={0.88} metalness={0.04} />
        </mesh>

        {/* Slender Youthful Torso with Golden Armor & Sacred Jewels */}
        <mesh position={[0, 1.7, 0.05]} castShadow>
          <cylinderGeometry args={[0.3, 0.24, 0.8, 16]} />
          <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
        </mesh>
        {/* Golden Chest Plate Ornament (Kavacha) */}
        <mesh position={[0, 1.75, 0.18]} castShadow>
          <boxGeometry args={[0.38, 0.45, 0.06]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Divine Serene Face */}
        <mesh position={[0, 2.3, 0.06]} castShadow>
          <sphereGeometry args={[0.22, 18, 18]} />
          <meshStandardMaterial color="#8b8377" roughness={0.92} metalness={0.02} />
        </mesh>

        {/* Majestic Towering Golden Crown (Kirita Mukuta) */}
        <group position={[0, 2.65, 0.06]} castShadow>
          <cylinderGeometry args={[0.15, 0.22, 0.65, 16]} />
          <meshStandardMaterial color="#ffd269" roughness={0.2} metalness={0.9} />
          {/* Kalasa Crown Finial */}
          <mesh position={[0, 0.42, 0]}>
            <coneGeometry args={[0.08, 0.25, 12]} />
            <meshStandardMaterial color="#ffe885" roughness={0.18} metalness={0.92} />
          </mesh>
        </group>

        {/* THE SACRED DIVINE VEL SPEER (Jnana Shaktyayudha) */}
        {/* Held firmly by Lord Subrahmanya extending high into the air */}
        <group position={[0.42, 1.6, 0.25]} rotation={[0, 0, -0.1]} castShadow>
          {/* Slender Long Golden Shaft */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 2.8, 12]} />
            <meshStandardMaterial color="#ffd700" roughness={0.18} metalness={0.92} />
          </mesh>
          {/* Leaf-shaped Broad Sacred Vel Blade (Spiritual Wisdom) */}
          <group position={[0, 1.85, 0]}>
            {/* Broad flame-leaf blade */}
            <mesh castShadow>
              <coneGeometry args={[0.18, 0.65, 16]} />
              <meshStandardMaterial color="#fff1a8" roughness={0.15} metalness={0.95} />
            </mesh>
            {/* Central spine of the Vel */}
            <mesh position={[0, 0, 0.02]}>
              <cylinderGeometry args={[0.025, 0.025, 0.65, 8]} />
              <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Luminous Tip */}
            <mesh position={[0, 0.38, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        </group>

        {/* Arms of Lord Subrahmanya */}
        {/* Right Hand holding the Vel Spear */}
        <group position={[0.3, 1.65, 0.12]}>
          <mesh rotation={[0.2, 0, -0.3]} castShadow>
            <cylinderGeometry args={[0.06, 0.07, 0.55, 10]} />
            <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
          </mesh>
        </group>
        {/* Left Hand in Kati-Hastha (resting on hip) */}
        <group position={[-0.32, 1.65, 0.1]}>
          <mesh rotation={[-0.2, 0, 0.5]} castShadow>
            <cylinderGeometry args={[0.06, 0.07, 0.55, 10]} />
            <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
          </mesh>
        </group>

        {/* Auspicious Orange Marigold & White Jasmine Floral Garland (Mala) */}
        <group position={[0, 1.6, 0.22]}>
          <mesh rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.38, 0.065, 8, 22]} />
            <meshStandardMaterial color="#f2700d" roughness={0.75} />
          </mesh>
          <mesh position={[0, -0.22, 0.05]} rotation={[0.25, 0, 0]}>
            <torusGeometry args={[0.32, 0.05, 8, 20]} />
            <meshStandardMaterial color="#fcf9ec" roughness={0.85} />
          </mesh>
        </group>

        {/* ROYAL PEACOCK VAHANA (Mayil) Standing Beside Lord Subrahmanya */}
        <group position={[-0.55, 0.12, 0.25]} rotation={[0, 0.7, 0]} castShadow>
          {/* Peacock Body (Rich Royal Blue) */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#0d47a1" roughness={0.25} metalness={0.65} />
          </mesh>
          {/* Slender Graceful S-Curved Neck */}
          <mesh position={[0.12, 0.65, 0]} rotation={[0, 0, -0.3]} castShadow>
            <cylinderGeometry args={[0.065, 0.11, 0.45, 12]} />
            <meshStandardMaterial color="#0277bd" roughness={0.25} metalness={0.7} />
          </mesh>
          {/* Peacock Head with Golden Crest (Chooda) */}
          <mesh position={[0.22, 0.9, 0]} castShadow>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#01579b" roughness={0.25} metalness={0.7} />
          </mesh>
          {/* Golden Crest atop head */}
          <mesh position={[0.24, 1.0, 0]}>
            <coneGeometry args={[0.04, 0.12, 8]} />
            <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.85} />
          </mesh>
          {/* Beak */}
          <mesh position={[0.3, 0.88, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.035, 0.1, 8]} />
            <meshStandardMaterial color="#f57f17" roughness={0.4} />
          </mesh>
          {/* Majestic Long Tail Feathers (Iridescent Emerald & Turquoise) */}
          <mesh position={[-0.32, 0.35, -0.1]} rotation={[0.4, -0.4, 0.6]} castShadow>
            <cylinderGeometry args={[0.18, 0.05, 0.9, 12]} />
            <meshStandardMaterial color="#00897b" roughness={0.3} metalness={0.6} />
          </mesh>
        </group>
      </group>

      {/* 5. FLANKING BRASS OIL AARTI LAMPS */}
      {[-1.1, 1.1].map((xOffset, idx) => (
        <group key={`subrahmanya-lamp-${idx}`} position={[xOffset, 1.05, 0.65]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.14, 0.18, 0.18, 16]} />
            <meshStandardMaterial color="#d4af37" roughness={0.28} metalness={0.8} />
          </mesh>
          {/* Glowing Flame */}
          <sprite position={[0, 0.22, 0]} scale={[0.32, 0.45, 1]}>
            <spriteMaterial map={flameTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
          </sprite>
          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffe785" />
          </mesh>
        </group>
      ))}

      {/* Warm Golden Devotional Spotlight Illuminating the Niche */}
      <pointLight position={[0, 3.2, 1.2]} color="#e6d1aa" intensity={0.5} distance={7} decay={2} />
    </group>
  );
}

export default SubrahmanyaShrine;
