import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getLotusCeilingTexture,
  getCarvedPillarTexture,
  getTeakwoodTexture
} from '../utils/textureGenerator';

/**
 * Decorated Traditional Dravidian Temple Ceiling (Vitanam)
 * Features recessed stone coffers, Sahasrara lotus medallions, stepped corbelled moldings,
 * antique gold trims, and 3D central golden lotus pendant drops (Pushpa-Mukuta).
 */
export function OrnamentalCeiling() {
  const lotusTex = useMemo(() => getLotusCeilingTexture(), []);
  const carvedTex = useMemo(() => getCarvedPillarTexture(), []);
  const teakTex = useMemo(() => getTeakwoodTexture(), []);

  // Coffer bays along the aisle from Z = -2 to Z = -92 (every 6.8m)
  const cofferZPositions = useMemo(() => {
    const list = [];
    for (let z = -2; z >= -92; z -= 6.8) {
      list.push(z);
    }
    return list;
  }, []);

  return (
    <group position={[0, 7.6, 0]}>
      {/* 1. Dark teak roof substrate visible between the carved coffers. */}
      <mesh position={[0, 1.15, -48]}>
        <boxGeometry args={[16, 0.45, 98]} />
        <meshStandardMaterial map={teakTex} roughness={0.86} color="#c7ad88" />
      </mesh>

      {/* 2. RECESSED COFFERS WITH SAHASRARA LOTUS MEDALLIONS */}
      {cofferZPositions.map((z, idx) => (
        <group key={`coffer-bay-${idx}`} position={[0, 0, z]}>
          {/* Central Aisle Lotus Coffer (5.8m x 5.8m) */}
          <group position={[0, 0.72, 0]}>
            {/* Stepped Coffer Frame Outer in Warm Cream Stone */}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[6.6, 0.38, 5.6]} />
              <meshStandardMaterial map={carvedTex} roughness={0.84} color="#b1a58f" />
            </mesh>
            {/* Stepped Coffer Frame Inner with Golden Lip */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[5.6, 0.35, 4.6]} />
              <meshStandardMaterial map={carvedTex} roughness={0.84} color="#b8aa91" />
            </mesh>
            <mesh position={[0, -0.16, 0]}>
              <boxGeometry args={[5.7, 0.04, 4.7]} />
              <meshStandardMaterial color="#88734b" roughness={0.68} metalness={0.32} />
            </mesh>

            {/* Recessed Lotus Medallion Panel */}
            <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[5.2, 4.2]} />
              <meshStandardMaterial
                map={lotusTex}
                roughness={0.55}
                metalness={0.25}
                color="#d8c4a4"
              />
            </mesh>

            {/* 3D Carved Central Golden Lotus Bud (Pushpa-Mukuta) projecting downward */}
            <group position={[0, -0.16, 0]}>
              {/* Petal tier 1 */}
              <mesh>
                <cylinderGeometry args={[0.5, 0.65, 0.28, 16]} />
                <meshStandardMaterial color="#816d49" roughness={0.72} metalness={0.28} />
              </mesh>
              {/* Petal tier 2 */}
              <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.28, 0.48, 0.24, 14]} />
                <meshStandardMaterial color="#816d49" roughness={0.72} metalness={0.28} />
              </mesh>
              {/* Central pendant drop */}
              <mesh position={[0, -0.45, 0]}>
                <coneGeometry args={[0.16, 0.4, 10]} rotation={[Math.PI, 0, 0]} />
                <meshStandardMaterial color="#816d49" roughness={0.72} metalness={0.28} />
              </mesh>
            </group>
          </group>

          {/* Left Side Aisle Coffer Panel */}
          <group position={[-5.6, 0.52, 0]}>
            <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[3.0, 4.4]} />
              <meshStandardMaterial map={lotusTex} roughness={0.82} color="#d1bc9a" />
            </mesh>
          </group>

          {/* Right Side Aisle Coffer Panel */}
          <group position={[5.6, 0.52, 0]}>
            <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[3.0, 4.4]} />
              <meshStandardMaterial map={lotusTex} roughness={0.82} color="#d1bc9a" />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

export default OrnamentalCeiling;
