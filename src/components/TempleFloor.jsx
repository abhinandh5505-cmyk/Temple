import React, { useMemo } from 'react';
import * as THREE from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';
import { getTempleFloorTexture } from '../utils/textureGenerator';

/**
 * Traditionally polished granite flagstones with a restrained natural sheen.
 */
export function TempleFloor() {
  const floorTex = useMemo(() => {
    const tex = getTempleFloorTexture();
    tex.repeat.set(3, 24);
    return tex;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Polished granite floor with soft, imperfect reflections. */}
      <mesh position={[0, -0.01, -55]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 170]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mirror={0.2}
          mixBlur={0.86}
          mixStrength={0.48}
          roughness={0.34}
          depthScale={0.45}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#a7a49b"
          metalness={0.04}
          map={floorTex}
        />
      </mesh>

      {/* Raised stone aisle borders in warm grey granite. */}
      <mesh position={[-5.6, 0.05, -55]} receiveShadow>
        <boxGeometry args={[1.2, 0.1, 170]} />
        <meshStandardMaterial color="#8f897e" roughness={0.82} />
      </mesh>
      <mesh position={[5.6, 0.05, -55]} receiveShadow>
        <boxGeometry args={[1.2, 0.1, 170]} />
        <meshStandardMaterial color="#8f897e" roughness={0.82} />
      </mesh>
    </group>
  );
}

export default TempleFloor;
