import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getGraniteTexture,
  getCarvedPillarTexture,
  getLotusCeilingTexture,
  getFlameTexture
} from '../utils/textureGenerator';

/**
 * Traditional South Indian Kuthu Vilakku (Tiered Brass Oil Lamp)
 * with authentic baluster shaft, oil reservoirs, and glowing warm flame.
 */
function KuthuVilakku({ position }) {
  const flameTex = useMemo(() => getFlameTexture(), []);

  return (
    <group position={position}>
      {/* 1. Base pedestal */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.42, 0.52, 0.24, 20]} />
        <meshStandardMaterial color="#cba239" roughness={0.35} metalness={0.75} />
      </mesh>
      {/* 2. Molded lower bowl */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.36, 0.2, 0.18, 16]} />
        <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* 3. Slender baluster pillar shaft */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.07, 0.11, 1.4, 16]} />
        <meshStandardMaterial color="#d4af37" roughness={0.28} metalness={0.82} />
      </mesh>
      {/* Central decorative bead nodes */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#e5c158" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#e5c158" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* 4. Main Multi-Wick Oil Plate (Deepam Thattu) */}
      <mesh position={[0, 1.82, 0]}>
        <cylinderGeometry args={[0.48, 0.25, 0.16, 24]} />
        <meshStandardMaterial color="#d4af37" roughness={0.28} metalness={0.8} />
      </mesh>

      {/* 5. Auspicious Hamsa / Peacock Finial (Prabhavali) atop lamp */}
      <mesh position={[0, 2.12, 0]}>
        <coneGeometry args={[0.16, 0.44, 12]} />
        <meshStandardMaterial color="#f0cb5a" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* 6. Glowing Flame Sprite & Luminous Flame Core */}
      <sprite position={[0, 2.02, 0]} scale={[0.65, 0.85, 1]}>
        <spriteMaterial map={flameTex} transparent blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#ffe866" />
      </mesh>
    </group>
  );
}

/**
 * Hanging Bronze Temple Bell (Ghanta) with ornate chain and clapper
 */
function HangingBell({ position }) {
  return (
    <group position={position}>
      {/* Heavy Bronze Hanging Chain */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
        <meshStandardMaterial color="#6a4c28" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Bell Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.16, 0.45, 0.65, 20]} />
        <meshStandardMaterial color="#96723b" roughness={0.32} metalness={0.78} />
      </mesh>
      {/* Bell Lip */}
      <mesh position={[0, -0.52, 0]}>
        <torusGeometry args={[0.44, 0.05, 12, 24]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#b38947" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Bell Clapper */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#6a4c28" roughness={0.5} metalness={0.75} />
      </mesh>
    </group>
  );
}

/**
 * Respectful Traditional South Indian Sacred Vigraha Shrine
 * Authentic Dravidian stone iconography, sacred prabhavali (aureole),
 * adorned with marigold floral garlands and brass lamps.
 */
function SacredVigrahaShrine({ position, isRightSide = false }) {
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);

  // Facing inward toward the aisle
  const rotY = isRightSide ? -Math.PI / 2 : Math.PI / 2;

  return (
    <group position={position} rotation={[0, rotY, 0]}>
      {/* Elevated Tiered Granite Altar / Pitha */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.4, 1.0, 1.8]} />
        <meshStandardMaterial map={graniteTex} roughness={0.88} color="#635445" />
      </mesh>
      {/* Carved Padma (Lotus) base */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.3, 16]} />
        <meshStandardMaterial map={carvedTex} roughness={0.8} color="#786653" />
      </mesh>

      {/* Monolithic Dark Schist Stone Vigraha (Traditional standing Samabhanga form) */}
      <group position={[0, 1.35, 0]}>
        {/* Sacred Prabhavali (Carved Aureole Arch behind the Vigraha) */}
        <mesh position={[0, 1.6, -0.15]}>
          <boxGeometry args={[1.5, 2.8, 0.15]} />
          <meshStandardMaterial color="#947432" roughness={0.35} metalness={0.7} />
        </mesh>
        {/* Flaming crest atop prabhavali */}
        <mesh position={[0, 3.1, -0.15]}>
          <coneGeometry args={[0.22, 0.45, 12]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Monolithic Dark Stone Sacred Murti Silhouette */}
        {/* Lower dhoti / pitambara */}
        <mesh position={[0, 0.7, 0.05]}>
          <cylinderGeometry args={[0.26, 0.32, 1.3, 16]} />
          <meshStandardMaterial color="#1a1715" roughness={0.55} metalness={0.3} />
        </mesh>
        {/* Torso with divine ornaments */}
        <mesh position={[0, 1.6, 0.05]}>
          <cylinderGeometry args={[0.32, 0.25, 0.9, 16]} />
          <meshStandardMaterial color="#1a1715" roughness={0.55} metalness={0.3} />
        </mesh>
        {/* Four Sacred Arms (Chaturbhuja) holding Sankha and Chakra */}
        <mesh position={[-0.45, 1.7, 0]}>
          <boxGeometry args={[0.14, 0.7, 0.14]} />
          <meshStandardMaterial color="#1a1715" roughness={0.6} />
        </mesh>
        <mesh position={[0.45, 1.7, 0]}>
          <boxGeometry args={[0.14, 0.7, 0.14]} />
          <meshStandardMaterial color="#1a1715" roughness={0.6} />
        </mesh>
        {/* Golden Chakra (Discus) in upper right hand */}
        <mesh position={[-0.45, 2.15, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.04, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Golden Sankha (Conch) in upper left hand */}
        <mesh position={[0.45, 2.15, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#eae4d4" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Head with Majestic Kiritamukuta (Towering South Indian Sacred Crown) */}
        <mesh position={[0, 2.22, 0.05]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#1a1715" roughness={0.5} />
        </mesh>
        {/* Towering Kirita Mukuta */}
        <mesh position={[0, 2.65, 0.05]}>
          <cylinderGeometry args={[0.12, 0.18, 0.75, 16]} />
          <meshStandardMaterial color="#e5c158" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Auspicious Marigold and Jasmine Floral Garlands (Mala) draped over shoulders */}
        <mesh position={[0, 1.35, 0.22]}>
          <torusGeometry args={[0.4, 0.06, 8, 16]} rotation={[0.4, 0, 0]} />
          <meshStandardMaterial color="#e6680a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.05, 0.24]}>
          <torusGeometry args={[0.35, 0.05, 8, 16]} rotation={[0.3, 0, 0]} />
          <meshStandardMaterial color="#f7f3e4" roughness={0.8} />
        </mesh>
      </group>

      {/* Flanking Small Brass Aarti Lamps with luminous glowing flames */}
      <group position={[-0.9, 1.05, 0.6]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.14, 0.15, 12]} />
          <meshStandardMaterial color="#d4af37" roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ffc454" />
        </mesh>
      </group>
      <group position={[0.9, 1.05, 0.6]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.14, 0.15, 12]} />
          <meshStandardMaterial color="#d4af37" roughness={0.35} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ffc454" />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Inner Mandapam (Garuda Mandapam / Ranga Mandapam)
 * Widens into the ceremonial hall, adorned with golden pillars,
 * hanging bronze bells, sacred symmetric Vigraha shrines, and glowing Kuthu Vilakkus.
 */
export function InnerMandapam() {
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);
  const lotusTex = useMemo(() => getLotusCeilingTexture(), []);

  // Mandapam Z span: Z = -72 to Z = -106
  const mandapamBays = [-76, -84, -92, -100];

  return (
    <group>
      {/* ELEVATED MANDAPAM PLATFORM (Jagati) */}
      <mesh position={[0, 0.2, -88]} receiveShadow>
        <boxGeometry args={[15, 0.4, 34]} />
        <meshStandardMaterial map={graniteTex} roughness={0.88} color="#5e4f40" />
      </mesh>

      {/* CEREMONIAL GOLDEN COLUMNS (Suvarna Stambhas) lining the Mandapam */}
      {mandapamBays.map((z, idx) => (
        <group key={`mandapam-bay-${idx}`}>
          {/* Left Golden Column at X = -4.2 */}
          <group position={[-4.2, 0.4, z]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[1.5, 0.8, 1.5]} />
              <meshStandardMaterial color="#c5a044" roughness={0.35} metalness={0.7} />
            </mesh>
            <mesh position={[0, 4.0, 0]}>
              <cylinderGeometry args={[0.48, 0.54, 6.4, 16]} />
              <meshStandardMaterial color="#e5c158" roughness={0.28} metalness={0.82} />
            </mesh>
            <mesh position={[0, 7.3, 0]}>
              <boxGeometry args={[1.6, 0.6, 1.6]} />
              <meshStandardMaterial color="#c5a044" roughness={0.35} metalness={0.7} />
            </mesh>
          </group>

          {/* Right Golden Column at X = +4.2 */}
          <group position={[4.2, 0.4, z]}>
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[1.5, 0.8, 1.5]} />
              <meshStandardMaterial color="#c5a044" roughness={0.35} metalness={0.7} />
            </mesh>
            <mesh position={[0, 4.0, 0]}>
              <cylinderGeometry args={[0.48, 0.54, 6.4, 16]} />
              <meshStandardMaterial color="#e5c158" roughness={0.28} metalness={0.82} />
            </mesh>
            <mesh position={[0, 7.3, 0]}>
              <boxGeometry args={[1.6, 0.6, 1.6]} />
              <meshStandardMaterial color="#c5a044" roughness={0.35} metalness={0.7} />
            </mesh>
          </group>

          {/* Transverse Golden Arch Beam */}
          <mesh position={[0, 7.7, z]}>
            <boxGeometry args={[9.8, 0.6, 0.9]} />
            <meshStandardMaterial map={carvedTex} roughness={0.8} color="#7d6a54" />
          </mesh>
          <mesh position={[0, 7.35, z]}>
            <boxGeometry args={[8.8, 0.12, 0.6]} />
            <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Hanging Temple Bell from center of transverse beam */}
          <HangingBell position={[0, 7.2, z]} />

          {/* Marigold and Jasmine Floral Garland draped across the arch */}
          <mesh position={[0, 6.7, z]}>
            <torusGeometry args={[3.2, 0.08, 8, 24]} rotation={[0.2, 0, 0]} />
            <meshStandardMaterial color="#f07812" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* SYMMETRICAL SACRED VIGRAHA SHRINES ON BOTH SIDES */}
      {/* Shrine Pair 1 at Z = -80 */}
      <SacredVigrahaShrine position={[-5.8, 0.4, -80]} isRightSide={false} />
      <SacredVigrahaShrine position={[5.8, 0.4, -80]} isRightSide={true} />

      {/* Shrine Pair 2 at Z = -96 */}
      <SacredVigrahaShrine position={[-5.8, 0.4, -96]} isRightSide={false} />
      <SacredVigrahaShrine position={[5.8, 0.4, -96]} isRightSide={true} />

      {/* TALL BRASS KUTHU VILAKKU OIL LAMPS FLANKING THE CENTRAL AISLE */}
      <KuthuVilakku position={[-2.7, 0.4, -77]} />
      <KuthuVilakku position={[2.7, 0.4, -77]} />

      <KuthuVilakku position={[-2.7, 0.4, -85]} />
      <KuthuVilakku position={[2.7, 0.4, -85]} />

      <KuthuVilakku position={[-2.7, 0.4, -93]} />
      <KuthuVilakku position={[2.7, 0.4, -93]} />

      <KuthuVilakku position={[-2.7, 0.4, -101]} />
      <KuthuVilakku position={[2.7, 0.4, -101]} />

      {/* MANDAPAM ORNAMENTAL HIGH CEILING (Raised dome / coffer structure) */}
      <group position={[0, 8.2, -88]}>
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[14, 0.4, 32]} />
          <meshStandardMaterial map={graniteTex} roughness={0.9} color="#352c23" />
        </mesh>
        {/* Central grand lotus medallion */}
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7.5, 7.5]} />
          <meshStandardMaterial map={lotusTex} roughness={0.7} color="#ebd8b5" />
        </mesh>
        {/* Golden Central Mukuta Pendant Drop */}
        <mesh position={[0, -0.6, 0]}>
          <coneGeometry args={[0.4, 1.1, 12]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color="#f0cb5a" roughness={0.25} metalness={0.85} />
        </mesh>
      </group>
    </group>
  );
}
