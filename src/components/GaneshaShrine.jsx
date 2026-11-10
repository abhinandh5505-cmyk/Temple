import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getGraniteTexture, getCarvedPillarTexture, getFlameTexture } from '../utils/textureGenerator';

/**
 * Lord Ganesha Shrine (Left Side of Temple Aisle)
 * Authentic South Indian Dravidian stone shrine housing Lord Sri Vighnaharta Ganesha
 * with golden sculpted idol, four arms, modak, broken tusk, golden Prabhavali arch,
 * floral garlands, flanking brass deepams, and warm niche illumination.
 */
export function GaneshaShrine({ position = [-5.6, 0, -48] }) {
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);
  const flameTex = useMemo(() => getFlameTexture(), []);

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
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
            key={`ganesha-ray-${idx}`}
            position={[Math.sin(angle) * 1.15, 0.4 + Math.cos(angle) * 1.15, 0]}
            rotation={[0, 0, -angle]}
          >
            <coneGeometry args={[0.06, 0.22, 8]} />
            <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* 4. SCULPTED GOLDEN LORD GANESHA IDOL */}
      <group position={[0, 1.15, 0]}>
        {/* Double-Lotus Base (Vishva Padma Pitha) */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.75, 0.85, 0.24, 20]} />
          <meshStandardMaterial color="#d4af37" roughness={0.28} metalness={0.82} />
        </mesh>

        {/* Seated Folded Legs (Lalitasana posture) */}
        <mesh position={[0, 0.38, 0.08]} castShadow>
          <torusGeometry args={[0.55, 0.22, 12, 24, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
        </mesh>

        {/* Large Rounded Belly (Lambodara) with sacred snake belt (Naga Bandha) */}
        <mesh position={[0, 0.65, 0.1]} castShadow>
          <sphereGeometry args={[0.48, 20, 20]} />
          <meshStandardMaterial color="#8b8377" roughness={0.92} metalness={0.02} />
        </mesh>
        {/* Golden Snake Band around belly */}
        <mesh position={[0, 0.65, 0.15]}>
          <torusGeometry args={[0.49, 0.035, 8, 24]} rotation={[0.2, 0, 0]} />
          <meshStandardMaterial color="#ffd269" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Torso & Sacred Thread (Yajnopavita) */}
        <mesh position={[0, 1.1, 0.05]} castShadow>
          <cylinderGeometry args={[0.38, 0.45, 0.65, 16]} />
          <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
        </mesh>
        {/* Sacred Thread running diagonally across chest */}
        <mesh position={[0, 1.05, 0.22]} rotation={[0, 0, 0.55]}>
          <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
          <meshStandardMaterial color="#fffbf0" roughness={0.6} />
        </mesh>

        {/* Elephant Head with Broad Forehead (Kumbha) */}
        <mesh position={[0, 1.55, 0.1]} castShadow>
          <sphereGeometry args={[0.34, 18, 18]} />
          <meshStandardMaterial color="#8b8377" roughness={0.92} metalness={0.02} />
        </mesh>

        {/* Wide Flaring Ears (Suppakarna) */}
        {/* Left Ear */}
        <mesh position={[-0.38, 1.58, 0.05]} rotation={[0, -0.3, 0.2]} castShadow>
          <boxGeometry args={[0.28, 0.35, 0.06]} />
          <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
        </mesh>
        {/* Right Ear */}
        <mesh position={[0.38, 1.58, 0.05]} rotation={[0, 0.3, -0.2]} castShadow>
          <boxGeometry args={[0.28, 0.35, 0.06]} />
          <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
        </mesh>

        {/* Curving Trunk (Vakratunda) curving left holding Modak */}
        <group position={[0, 1.48, 0.35]}>
          <mesh position={[0, -0.15, 0]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.08, 0.38, 12]} />
            <meshStandardMaterial color="#8b8377" roughness={0.92} metalness={0.02} />
          </mesh>
          {/* Trunk curl holding Modaka */}
          <mesh position={[-0.12, -0.32, 0.06]} rotation={[0, 0, 1.1]}>
            <cylinderGeometry args={[0.07, 0.05, 0.24, 10]} />
            <meshStandardMaterial color="#8b8377" roughness={0.92} metalness={0.02} />
          </mesh>
          {/* Golden Sweet Modaka */}
          <mesh position={[-0.22, -0.26, 0.08]} castShadow>
            <coneGeometry args={[0.075, 0.12, 12]} />
            <meshStandardMaterial color="#ffd84d" roughness={0.3} metalness={0.7} />
          </mesh>
        </group>

        {/* Sacred Broken Tusk (Ekadanta - right) & Full Tusk (left) */}
        <mesh position={[0.12, 1.4, 0.28]} rotation={[-0.4, 0, 0.3]}>
          <cylinderGeometry args={[0.025, 0.015, 0.12, 8]} />
          <meshStandardMaterial color="#fffef7" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[-0.12, 1.4, 0.28]} rotation={[-0.4, 0, -0.3]}>
          <cylinderGeometry args={[0.025, 0.02, 0.07, 8]} />
          <meshStandardMaterial color="#fffef7" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Tall Sacred Crown (Kirita Mukuta) */}
        <group position={[0, 1.95, 0.08]} castShadow>
          <cylinderGeometry args={[0.18, 0.26, 0.52, 16]} />
          <meshStandardMaterial color="#ffd269" roughness={0.2} metalness={0.9} />
          {/* Crown finial */}
          <mesh position={[0, 0.35, 0]}>
            <coneGeometry args={[0.1, 0.28, 12]} />
            <meshStandardMaterial color="#ffe885" roughness={0.18} metalness={0.92} />
          </mesh>
        </group>

        {/* Four Sacred Arms (Chaturbhuja) */}
        {/* Upper Right Arm holding Ankusha (Goad) */}
        <group position={[0.48, 1.25, 0]}>
          <mesh position={[0.12, 0.2, 0]} rotation={[0, 0, -0.4]} castShadow>
            <cylinderGeometry args={[0.07, 0.09, 0.45, 10]} />
            <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
          </mesh>
          {/* Golden Ankusha */}
          <mesh position={[0.22, 0.48, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.4, 8]} />
            <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0.24, 0.65, 0]} rotation={[0, 0, -0.8]}>
            <coneGeometry args={[0.04, 0.14, 8]} />
            <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        {/* Upper Left Arm holding Pasha (Noose) */}
        <group position={[-0.48, 1.25, 0]}>
          <mesh position={[-0.12, 0.2, 0]} rotation={[0, 0, 0.4]} castShadow>
            <cylinderGeometry args={[0.07, 0.09, 0.45, 10]} />
            <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
          </mesh>
          {/* Golden Pasha (Noose Ring) */}
          <mesh position={[-0.22, 0.48, 0]}>
            <torusGeometry args={[0.09, 0.018, 8, 16]} />
            <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        {/* Lower Right Hand in Abhaya Mudra (Blessing & Protection) */}
        <group position={[0.38, 0.9, 0.32]}>
          <mesh rotation={[0.4, 0.3, -0.2]} castShadow>
            <cylinderGeometry args={[0.065, 0.075, 0.38, 10]} />
            <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
          </mesh>
          {/* Palm facing forward */}
          <mesh position={[0.06, 0.2, 0.06]}>
            <boxGeometry args={[0.12, 0.14, 0.04]} />
            <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
          </mesh>
        </group>

        {/* Lower Left Hand holding bowl of Modakas */}
        <group position={[-0.38, 0.85, 0.32]}>
          <mesh rotation={[0.4, -0.3, 0.2]} castShadow>
            <cylinderGeometry args={[0.065, 0.075, 0.38, 10]} />
            <meshStandardMaterial color="#81796d" roughness={0.92} metalness={0.02} />
          </mesh>
          {/* Golden Bowl (Modaka Patra) */}
          <mesh position={[-0.05, 0.16, 0.08]} castShadow>
            <cylinderGeometry args={[0.12, 0.06, 0.08, 12]} />
            <meshStandardMaterial color="#ffd269" roughness={0.22} metalness={0.88} />
          </mesh>
        </group>

        {/* Auspicious Orange Marigold & White Jasmine Floral Garland (Mala) */}
        <group position={[0, 1.05, 0.28]}>
          {/* Marigold Garland */}
          <mesh rotation={[0.35, 0, 0]}>
            <torusGeometry args={[0.46, 0.075, 8, 24]} />
            <meshStandardMaterial color="#f2700d" roughness={0.75} />
          </mesh>
          {/* Jasmine Inner Garland */}
          <mesh position={[0, -0.15, 0.04]} rotation={[0.25, 0, 0]}>
            <torusGeometry args={[0.38, 0.055, 8, 20]} />
            <meshStandardMaterial color="#fcf9ec" roughness={0.85} />
          </mesh>
        </group>

        {/* Divine Mooshika (Mouse Vahana) attentively seated at Ganesha's feet */}
        <group position={[0.42, 0.18, 0.65]} rotation={[0, -0.8, 0]} castShadow>
          <mesh position={[0, 0.06, 0]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color="#c59d38" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Head & Ears */}
          <mesh position={[0.08, 0.08, 0]}>
            <coneGeometry args={[0.05, 0.09, 8]} rotation={[0, 0, -Math.PI / 2]} />
            <meshStandardMaterial color="#c59d38" roughness={0.3} metalness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 5. FLANKING BRASS OIL AARTI LAMPS */}
      {[-1.1, 1.1].map((xOffset, idx) => (
        <group key={`ganesha-lamp-${idx}`} position={[xOffset, 1.05, 0.65]}>
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

export default GaneshaShrine;
