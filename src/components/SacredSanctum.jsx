import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getGraniteTexture, getCarvedPillarTexture, getFlameTexture } from '../utils/textureGenerator';
import { KuthuVilakku } from './KuthuVilakku';

/**
 * Small Glowing Brass / Clay Deepam Oil Lamp
 */
function Deepam({ position }) {
  const flameTex = useMemo(() => getFlameTexture(), []);

  return (
    <group position={position}>
      {/* Terracotta/brass small deepam bowl */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#ba5f1c" roughness={0.7} />
      </mesh>
      {/* Flame sprite */}
      <sprite position={[0, 0.14, 0]} scale={[0.26, 0.36, 1]}>
        <spriteMaterial map={flameTex} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>
      {/* Luminous flame core */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#ffe680" />
      </mesh>
    </group>
  );
}

/**
 * Sree Ranganadha Main Sanctum Sanctorum (Garbhagriha & Ananda Vimana)
 * The sacred culmination of the temple journey:
 * - Colossal golden Makara Torana arch framing the sanctum threshold
 * - Golden sanctum protective railings and open ceremonial gate
 * - Consecrated elevated altar (Pitha)
 * - Lord Sri Ranganatha reclining in Yoga Nidra upon the coiled serpent Adi Shesha
 * - Adi Shesha's multi-headed flared serpent hood canopy crowned over the deity
 * - Rows of eternal deepam oil lamps, Kuthu Vilakkus, and fragrant incense burners
 * - Warm golden divine radiance spilling down the corridor
 */
export function SacredSanctum({ position = [0, 0, -96] }) {
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);

  // Row of small glowing deepams along the sanctum threshold
  const deepamPositions = useMemo(() => {
    const list = [];
    for (let x = -3.2; x <= 3.2; x += 0.32) {
      list.push([x, 0.48, 0.6]);
    }
    return list;
  }, []);

  return (
    <group position={position}>
      {/* 1. SANCTUM FACADE WALLS (Left, Right, Lintel — Center is OPEN for Darshan) */}
      {/* Left Wall in Luminous Ivory Stone */}
      <mesh position={[-5.8, 5.0, 0]} receiveShadow castShadow>
        <boxGeometry args={[6.2, 10, 1.8]} />
        <meshStandardMaterial map={graniteTex} roughness={0.7} color="#f7f2ea" />
      </mesh>
      {/* Right Wall in Luminous Ivory Stone */}
      <mesh position={[5.8, 5.0, 0]} receiveShadow castShadow>
        <boxGeometry args={[6.2, 10, 1.8]} />
        <meshStandardMaterial map={graniteTex} roughness={0.7} color="#f7f2ea" />
      </mesh>
      {/* Upper Lintel Wall above Doorway */}
      <mesh position={[0, 8.8, 0]} receiveShadow castShadow>
        <boxGeometry args={[5.6, 2.6, 1.8]} />
        <meshStandardMaterial map={graniteTex} roughness={0.7} color="#f7f2ea" />
      </mesh>

      {/* 2. MAGNIFICENT GOLDEN MAKARA TORANA (Sanctum Portal Frame) */}
      <group position={[0, 4.4, 0.8]}>
        {/* Golden Doorframe Left Jamb */}
        <mesh position={[-2.6, 0, 0]} castShadow>
          <boxGeometry args={[0.65, 8.2, 0.55]} />
          <meshStandardMaterial map={carvedTex} color="#a49b8b" roughness={0.82} metalness={0.04} />
        </mesh>
        {/* Golden Doorframe Right Jamb */}
        <mesh position={[2.6, 0, 0]} castShadow>
          <boxGeometry args={[0.65, 8.2, 0.55]} />
          <meshStandardMaterial map={carvedTex} color="#a49b8b" roughness={0.82} metalness={0.04} />
        </mesh>

        {/* Golden Lintel Beam */}
        <mesh position={[0, 4.0, 0]} castShadow>
          <boxGeometry args={[6.0, 0.85, 0.65]} />
          <meshStandardMaterial map={carvedTex} color="#a49b8b" roughness={0.82} metalness={0.04} />
        </mesh>

        {/* Huge Makara Torana Arch (Carved Golden Aureole above door) */}
        <mesh position={[0, 4.8, 0]} castShadow>
          <torusGeometry args={[2.5, 0.42, 16, 36, Math.PI]} />
          <meshStandardMaterial color="#8b744b" roughness={0.62} metalness={0.38} />
        </mesh>
        {/* Secondary inner beaded golden arch */}
        <mesh position={[0, 4.8, 0.1]}>
          <torusGeometry args={[2.0, 0.16, 12, 32, Math.PI]} />
          <meshStandardMaterial color="#a08350" roughness={0.58} metalness={0.38} />
        </mesh>

        {/* Kirtimukha (Face of Glory) Finial at apex of arch */}
        <group position={[0, 7.4, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.7, 0.9, 16]} />
          <meshStandardMaterial color="#ffd269" roughness={0.2} metalness={0.9} />
          {/* Kalasa finials */}
          <mesh position={[0, 0.7, 0]}>
            <coneGeometry args={[0.2, 0.55, 12]} />
            <meshStandardMaterial color="#ffe885" roughness={0.18} metalness={0.92} />
          </mesh>
        </group>

        {/* Sacred Floral Garlands draped across the golden portal */}
        <mesh position={[0, 3.4, 0.35]}>
          <torusGeometry args={[2.4, 0.1, 8, 28, Math.PI]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color="#f07812" roughness={0.75} />
        </mesh>
        <mesh position={[0, 3.1, 0.38]}>
          <torusGeometry args={[2.2, 0.08, 8, 28, Math.PI]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color="#fcf9ec" roughness={0.85} />
        </mesh>
      </group>

      {/* 3. GOLDEN SANCTUM PROTECTIVE RAILINGS (Brass Balustrade with Open Center Gate) */}
      <group position={[0, 0.8, 1.2]}>
        {/* Left Railing Section */}
        <group position={[-2.1, 0, 0]}>
          {/* Top brass rail */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1.8, 12]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
          </mesh>
          {/* Vertical brass balusters */}
          {[-0.7, -0.35, 0, 0.35, 0.7].map((bx, i) => (
            <mesh key={`rail-left-${i}`} position={[bx, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.04, 0.9, 10]} />
              <meshStandardMaterial color="#ffd269" roughness={0.22} metalness={0.88} />
            </mesh>
          ))}
        </group>

        {/* Right Railing Section */}
        <group position={[2.1, 0, 0]}>
          {/* Top brass rail */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1.8, 12]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
          </mesh>
          {/* Vertical brass balusters */}
          {[-0.7, -0.35, 0, 0.35, 0.7].map((bx, i) => (
            <mesh key={`rail-right-${i}`} position={[bx, 0.25, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.04, 0.9, 10]} />
              <meshStandardMaterial color="#ffd269" roughness={0.22} metalness={0.88} />
            </mesh>
          ))}
        </group>

        {/* Central Gate Posts */}
        <mesh position={[-1.1, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 12]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[1.1, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 12]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* 4. SANCTUM THRESHOLD STEPS (Udumbaram & Sopanam in Ivory Marble) */}
      <mesh position={[0, 0.22, 0.6]} receiveShadow>
        <boxGeometry args={[6.8, 0.45, 1.6]} />
        <meshStandardMaterial map={graniteTex} roughness={0.7} color="#f4ede1" />
      </mesh>
      {/* Golden threshold plate */}
      <mesh position={[0, 0.46, 0.6]} receiveShadow>
        <boxGeometry args={[5.8, 0.06, 1.0]} />
        <meshStandardMaterial color="#e5c158" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Glowing Deepams along threshold */}
      {deepamPositions.map((pos, idx) => (
        <Deepam key={`sanctum-deepam-${idx}`} position={pos} />
      ))}

      {/* 5. INNER SACRED GARBHAGRIHA CHAMBER (Beyond Z = 0) */}
      <group position={[0, 0, -8.0]}>
        {/* Chamber Back Wall in Warm Ivory */}
        <mesh position={[0, 4.5, -6.5]} receiveShadow>
          <boxGeometry args={[10, 9.5, 0.8]} />
          <meshStandardMaterial map={graniteTex} roughness={0.75} color="#f5eee3" />
        </mesh>
        {/* Left & Right Chamber Walls */}
        <mesh position={[-5.0, 4.5, -2.0]} receiveShadow>
          <boxGeometry args={[0.8, 9.5, 10]} />
          <meshStandardMaterial map={graniteTex} roughness={0.75} color="#f5eee3" />
        </mesh>
        <mesh position={[5.0, 4.5, -2.0]} receiveShadow>
          <boxGeometry args={[0.8, 9.5, 10]} />
          <meshStandardMaterial map={graniteTex} roughness={0.75} color="#f5eee3" />
        </mesh>
        {/* Ceiling of Sanctum */}
        <mesh position={[0, 9.2, -2.0]}>
          <boxGeometry args={[10, 0.6, 10]} />
          <meshStandardMaterial color="#241b14" roughness={0.9} />
        </mesh>

        {/* Sacred Elevated Pedestal (Pitha) */}
        <mesh position={[0, 0.85, -4.5]} castShadow receiveShadow>
          <boxGeometry args={[6.6, 1.5, 3.2]} />
          <meshStandardMaterial color="#221a14" roughness={0.75} />
        </mesh>
        {/* Golden pedestal trim */}
        <mesh position={[0, 1.62, -4.5]} receiveShadow>
          <boxGeometry args={[6.3, 0.08, 2.9]} />
          <meshStandardMaterial color="#d4af37" roughness={0.28} metalness={0.85} />
        </mesh>

        {/* 6. CONSECRATED DEITY: LORD SREE RANGANADHA RECLINING IN YOGA NIDRA */}
        <group position={[0, 1.7, -4.5]}>
          {/* ADI SHESHA: The Thousand-Headed Cosmic Serpent Bed */}
          {/* Coiled Serpent Rings (3 Coils under Lord Ranganatha) */}
          <group position={[0, 0.35, 0]}>
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[2.6, 2.8, 0.45, 32]} />
              <meshStandardMaterial color="#e5d8b8" roughness={0.3} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[2.4, 2.5, 0.35, 32]} />
              <meshStandardMaterial color="#fff6d6" roughness={0.28} metalness={0.45} />
            </mesh>
          </group>

          {/* ADI SHESHA'S MULTI-HEADED FLARED HOOD CANOPY */}
          {/* Positioned over Lord Ranganatha's head on the west/left end */}
          <group position={[-1.7, 1.6, 0]} rotation={[0, 0, -0.25]}>
            {/* Flared Serpent Hood Arch */}
            <mesh position={[0, 0.4, 0]} castShadow>
              <boxGeometry args={[0.3, 1.5, 1.8]} />
              <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
            </mesh>
            {/* 7 Golden Serpent Heads Spreading like a Divine Fan */}
            {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((offsetZ, i) => (
              <group key={`shesha-head-${i}`} position={[0.1, 1.1 + Math.abs(offsetZ) * -0.2, offsetZ]}>
                <mesh castShadow>
                  <coneGeometry args={[0.09, 0.32, 10]} rotation={[0, 0, Math.PI / 2]} />
                  <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
                </mesh>
                {/* Ruby Crest Gem on each serpent head */}
                <mesh position={[0.08, 0.08, 0]}>
                  <sphereGeometry args={[0.03, 8, 8]} />
                  <meshStandardMaterial color="#d50000" roughness={0.15} metalness={0.8} />
                </mesh>
              </group>
            ))}
          </group>

          {/* LORD SRI RANGANATHA RECLINING IN SAYANA POSTURE */}
          <group position={[0, 0.85, 0]}>
            {/* Reclining Torso & Legs (stretching from X = -1.5 to X = 1.8) */}
            <mesh position={[0.2, 0.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.42, 0.48, 2.8, 18]} />
              <meshStandardMaterial color="#1f1a16" roughness={0.5} metalness={0.3} />
            </mesh>

            {/* Sacred Golden Pitambara Dhoti & Divine Silk Wrap */}
            <mesh position={[0.5, 0.36, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.44, 0.46, 1.8, 18]} />
              <meshStandardMaterial color="#ffd700" roughness={0.25} metalness={0.85} />
            </mesh>

            {/* Lord's Head crowned in Kirita Mukuta turned southward in blessing */}
            <group position={[-1.35, 0.65, 0]}>
              {/* Crowned Head */}
              <mesh castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#1f1a16" roughness={0.5} metalness={0.3} />
              </mesh>
              {/* Towering Sacred Gold Kirita-Mukuta Crown */}
              <mesh position={[-0.45, 0.1, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.2, 0.32, 0.85, 16]} />
                <meshStandardMaterial color="#ffd269" roughness={0.2} metalness={0.9} />
              </mesh>
              {/* Auspicious Kasturi Tilakam / Vaishnava Namam on Forehead */}
              <mesh position={[0.18, 0.12, 0]}>
                <boxGeometry args={[0.04, 0.14, 0.08]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>

            {/* Right Arm bent under head supporting the crowned head */}
            <mesh position={[-1.2, 0.3, 0.3]} rotation={[0.4, 0.5, 0.8]} castShadow>
              <cylinderGeometry args={[0.11, 0.13, 0.85, 10]} />
              <meshStandardMaterial color="#1f1a16" roughness={0.5} />
            </mesh>

            {/* Left Arm extended gracefully resting along the thigh */}
            <mesh position={[0.2, 0.45, 0.32]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.1, 0.12, 1.6, 10]} />
              <meshStandardMaterial color="#1f1a16" roughness={0.5} />
            </mesh>

            {/* Golden Vanamala & Fresh Rose Garlands draped over Lord Ranganatha */}
            <mesh position={[0.0, 0.45, 0.28]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 2.2, 16]} />
              <meshStandardMaterial color="#e65100" roughness={0.7} />
            </mesh>
            <mesh position={[0.1, 0.45, 0.32]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.18, 0.18, 2.0, 16]} />
              <meshStandardMaterial color="#fffde7" roughness={0.8} />
            </mesh>

            {/* Lotus Feet of the Lord (Sri Pada) at the east/right end */}
            <group position={[1.75, 0.35, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.3, 0.2, 0.35]} />
                <meshStandardMaterial color="#1f1a16" roughness={0.5} />
              </mesh>
              {/* Auspicious Lotus Offering at the Lord's Feet */}
              <mesh position={[0.22, 0, 0]}>
                <cylinderGeometry args={[0.22, 0.28, 0.14, 16]} />
                <meshStandardMaterial color="#f06292" roughness={0.6} />
              </mesh>
            </group>
          </group>

          {/* Golden Utsava Murti Shrines flanking the main sanctum altar */}
          <group position={[-2.4, 0.6, 0.4]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.18, 0.24, 0.9, 12]} />
              <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
          <group position={[2.4, 0.6, 0.4]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.18, 0.24, 0.9, 12]} />
              <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        </group>

        {/* Tall Flanking Kuthu Vilakku Oil Lamps inside Garbhagriha */}
        <KuthuVilakku position={[-3.6, 0, -4.2]} scale={1.15} withLight={true} />
        <KuthuVilakku position={[3.6, 0, -4.2]} scale={1.15} withLight={true} />

        {/* Divine Golden Sanctum Core Radiance */}
        <pointLight position={[0, 3.5, -4.5]} color="#e9c98f" intensity={0.9} distance={14} decay={2} castShadow={false} />
        <pointLight position={[0, 1.8, -2.5]} color="#dcbf89" intensity={0.45} distance={9} decay={2} castShadow={false} />
      </group>

      {/* Incense Smoke Burners (Dhoop-Daan) at Threshold */}
      <group position={[-2.8, 0.5, 0.9]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.12, 0.7, 14]} />
          <meshStandardMaterial color="#6a4e28" roughness={0.35} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#8d6836" roughness={0.35} metalness={0.75} />
        </mesh>
      </group>
      <group position={[2.8, 0.5, 0.9]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.12, 0.7, 14]} />
          <meshStandardMaterial color="#6a4e28" roughness={0.35} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#8d6836" roughness={0.35} metalness={0.75} />
        </mesh>
      </group>
    </group>
  );
}

export default SacredSanctum;
