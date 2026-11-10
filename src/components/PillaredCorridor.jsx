import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getGraniteTexture, getCarvedPillarTexture, getTeakwoodTexture } from '../utils/textureGenerator';
import { KuthuVilakku } from './KuthuVilakku';
import { GaneshaShrine } from './GaneshaShrine';
import { SubrahmanyaShrine } from './SubrahmanyaShrine';

/**
 * Hanging Bronze Temple Bell (Ghanta) with ornate chain and clapper
 */
function HangingBell({ position }) {
  return (
    <group position={position}>
      {/* Heavy Bronze Hanging Chain */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 2.4, 8]} />
        <meshStandardMaterial color="#6a4c28" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Bell Body */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.45, 0.65, 20]} />
        <meshStandardMaterial color="#96723b" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Bell Lip */}
      <mesh position={[0, -0.52, 0]}>
        <torusGeometry args={[0.44, 0.05, 12, 24]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#b38947" roughness={0.28} metalness={0.82} />
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
 * Authentic Dravidian Monolithic Pillar with Potika (Bracket Capital) and Yali Sculpture
 */
function DravidianPillar({ position, isRightSide = false }) {
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);

  // Yali faces toward the corridor aisle
  const inwardX = isRightSide ? -1 : 1;

  return (
    <group position={position}>
      {/* 1. MOLDED BASE (Adhishthana) */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.65, 0.8, 1.65]} />
        <meshStandardMaterial map={graniteTex} roughness={0.82} color="#b9b3a8" />
      </mesh>
      {/* Tiered Padma (Lotus) base ring */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.72, 0.82, 0.3, 18]} />
        <meshStandardMaterial map={carvedTex} roughness={0.8} color="#bdb5a8" />
      </mesh>

      {/* 2. LOWER SQUARE SHAFT WITH CARVED DEITY RELIEF */}
      <mesh position={[0, 2.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.9, 1.2]} />
        <meshStandardMaterial map={carvedTex} roughness={0.82} color="#c0b9ad" />
      </mesh>

      {/* 3. OCTAGONAL RIBBED MIDDLE SHAFT */}
      <mesh position={[0, 4.35, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.54, 2.7, 8]} />
        <meshStandardMaterial map={carvedTex} roughness={0.82} color="#b5afa4" />
      </mesh>
      {/* Decorative Gold-Bronze Ring Band */}
      <mesh position={[0, 3.85, 0]}>
        <torusGeometry args={[0.56, 0.055, 12, 18]} />
        <meshStandardMaterial color="#897750" roughness={0.62} metalness={0.38} />
      </mesh>

      {/* 4. UPPER CAPITAL & MEDALLION BLOCK (Kalasa & Kumbha) */}
      <mesh position={[0, 5.95, 0]} castShadow>
        <cylinderGeometry args={[0.68, 0.48, 0.5, 14]} />
        <meshStandardMaterial map={carvedTex} roughness={0.82} color="#bdb5a8" />
      </mesh>
      <mesh position={[0, 6.4, 0]} castShadow>
        <boxGeometry args={[1.35, 0.4, 1.35]} />
        <meshStandardMaterial map={graniteTex} roughness={0.82} color="#c0b7a7" />
      </mesh>

      {/* 5. ICONIC DRAVIDIAN POTIKA (Pushpa-Potika / Corbelled Bracket Capital) */}
      <group position={[0, 6.85, 0]}>
        {/* Longitudinal beam support */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.5, 2.8]} />
          <meshStandardMaterial map={carvedTex} roughness={0.84} color="#aaa397" />
        </mesh>
        {/* Corbel arm extending into aisle */}
        <mesh position={[inwardX * 0.52, -0.1, 0]} castShadow>
          <boxGeometry args={[1.15, 0.42, 1.15]} />
          <meshStandardMaterial map={carvedTex} roughness={0.84} color="#aaa397" />
        </mesh>
        {/* Lotus-bud pendant drop (Pushpa-Bodegai) */}
        <mesh position={[inwardX * 0.98, -0.42, 0]} castShadow>
          <coneGeometry args={[0.2, 0.48, 10]} rotation={[Math.PI, 0, 0]} />
          <meshStandardMaterial color="#897750" roughness={0.62} metalness={0.38} />
        </mesh>
      </group>

      {/* 6. MONOLITHIC REARING YALI SCULPTURE */}
      <group position={[inwardX * 0.78, 2.65, 0]}>
        {/* Kneeling Elephant base (Gaja) */}
        <mesh position={[0, -0.9, 0]} castShadow>
          <boxGeometry args={[0.52, 0.72, 0.85]} />
          <meshStandardMaterial map={graniteTex} roughness={0.7} color="#ebdcc8" />
        </mesh>
        {/* Rearing Yali Body */}
        <mesh position={[inwardX * 0.16, 0.52, 0]} rotation={[0, 0, inwardX * -0.2]} castShadow>
          <boxGeometry args={[0.58, 1.95, 0.75]} />
          <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f5eee3" />
        </mesh>
        {/* Yali Head with open roaring jaws and crest */}
        <mesh position={[inwardX * 0.38, 1.65, 0]} castShadow>
          <boxGeometry args={[0.68, 0.72, 0.65]} />
          <meshStandardMaterial map={carvedTex} roughness={0.65} color="#faf5eb" />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Grand Pillared Corridor (Maha Prakaram & Inner Mandapam Colonnades)
 * Houses the symmetrical rows of Dravidian carved pillars,
 * Kuthu Vilakku oil lamps, crossbeams, hanging bells,
 * Lord Ganesha shrine (left), and Lord Subrahmanya shrine (right).
 */
export function PillaredCorridor() {
  const graniteTex = useMemo(() => getGraniteTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);
  const teakTex = useMemo(() => getTeakwoodTexture(), []);

  // Pillar positions along the corridor from Z = -6 to Z = -86 (spaced every 6.8m)
  const pillarZCoords = useMemo(() => {
    const list = [];
    for (let z = -6; z >= -86; z -= 6.8) {
      list.push(z);
    }
    return list;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. SYMMETRICAL COLONNADE PILLARS */}
      {pillarZCoords.map((z, idx) => (
        <React.Fragment key={`pillar-bay-${idx}`}>
          {/* Left Colonnade Pillar */}
          <DravidianPillar position={[-4.2, 0, z]} isRightSide={false} />

          {/* Right Colonnade Pillar */}
          <DravidianPillar position={[4.2, 0, z]} isRightSide={true} />

          {/* Longitudinal Architraves connecting adjacent pillars */}
          <mesh position={[-4.2, 7.35, z]} castShadow>
            <boxGeometry args={[1.2, 0.65, 7.2]} />
            <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f4ede1" />
          </mesh>
          <mesh position={[4.2, 7.35, z]} castShadow>
            <boxGeometry args={[1.2, 0.65, 7.2]} />
            <meshStandardMaterial map={carvedTex} roughness={0.65} color="#f4ede1" />
          </mesh>

          {/* Transverse Crossbeams across Aisle (Every other bay) */}
          {idx % 2 === 0 && (
            <group position={[0, 7.35, z]}>
              <mesh castShadow>
                <boxGeometry args={[9.2, 0.55, 0.9]} />
                <meshStandardMaterial map={carvedTex} roughness={0.84} color="#a49d91" />
              </mesh>
              {/* Gold border accent on crossbeam */}
              <mesh position={[0, -0.28, 0]}>
                <boxGeometry args={[9.0, 0.06, 0.85]} />
                <meshStandardMaterial color="#897750" roughness={0.62} metalness={0.38} />
              </mesh>
              {/* Hanging Bronze Temple Bell in Center */}
              <HangingBell position={[0, -0.6, 0]} />
            </group>
          )}

          {/* Tall Traditional Brass Kuthu Vilakku Oil Lamps along aisle */}
          {idx % 2 === 1 && (
            <>
              <KuthuVilakku position={[-2.8, 0, z]} scale={1.0} withLight={idx === 1 || idx === 5 || idx === 9} />
              <KuthuVilakku position={[2.8, 0, z]} scale={1.0} withLight={idx === 1 || idx === 5 || idx === 9} />
            </>
          )}
        </React.Fragment>
      ))}

      {/* Exposed teak tie-beams and longitudinal roof members. */}
      {[-4.2, 4.2].map((x) => (
        <mesh key={`teak-runner-${x}`} position={[x, 7.82, -48]} castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.42, 94]} />
          <meshStandardMaterial map={teakTex} color="#d0b894" roughness={0.78} />
        </mesh>
      ))}
      {pillarZCoords.filter((_, idx) => idx % 2 === 0).map((z, idx) => (
        <mesh key={`teak-tie-${idx}`} position={[0, 7.86, z]} castShadow receiveShadow>
          <boxGeometry args={[8.6, 0.3, 0.38]} />
          <meshStandardMaterial map={teakTex} color="#c9ae88" roughness={0.78} />
        </mesh>
      ))}

      {/* 2. Perimeter walls in naturally varied temple granite. */}
      {/* Left Wall */}
      <mesh position={[-7.4, 4.2, -48]} receiveShadow>
        <boxGeometry args={[0.8, 8.4, 94]} />
        <meshStandardMaterial map={graniteTex} roughness={0.86} color="#b4aea2" />
      </mesh>
      {/* Right Wall */}
      <mesh position={[7.4, 4.2, -48]} receiveShadow>
        <boxGeometry args={[0.8, 8.4, 94]} />
        <meshStandardMaterial map={graniteTex} roughness={0.86} color="#b4aea2" />
      </mesh>

      {/* 3. SACRED DEITY SHRINES */}
      {/* Lord Ganesha Shrine on Left Side */}
      <GaneshaShrine position={[-5.6, 0, -48]} />

      {/* Lord Subrahmanya (Murugan with Vel & Peacock) Shrine on Right Side */}
      <SubrahmanyaShrine position={[5.6, 0, -48]} />
    </group>
  );
}

export default PillaredCorridor;
