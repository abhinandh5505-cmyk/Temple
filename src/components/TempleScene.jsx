import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Doorway } from './Doorway';
import { PillaredCorridor } from './PillaredCorridor';
import { OrnamentalCeiling } from './OrnamentalCeiling';
import { SacredSanctum } from './SacredSanctum';
import { TempleFloor } from './TempleFloor';
import { Particles } from './Particles';

/**
 * Interactive First-Person Camera Controller
 * Translates scroll progress into continuous forward/backward walkthrough movement,
 * and mouse / touch movement into silky yaw & pitch camera rotation for full 3D exploration:
 * - Left / Right: Look toward both colonnades, Ganesha shrine, Subrahmanya shrine
 * - Up / Down: Look toward the decorated lotus ceiling and polished reflective marble floor
 * - Scroll: Travel forward through the entrance and down the temple aisle to the Sanctum Sanctorum
 */
function CameraController({ progress = 0, mousePos, freeLookEnabled = false }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 3.4, 14));
  const currentAngles = useRef({ yaw: 0, pitch: 0 });
  const lookTarget = useRef(new THREE.Vector3(0, 3.2, -30));

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Compute Walkthrough Camera Position along Z based on scroll progress
    let desiredZ;
    let desiredY = 3.2;

    if (progress <= 0.12) {
      // Exterior Approach (Z: 14.0 -> 5.5)
      const p = progress / 0.12;
      desiredZ = THREE.MathUtils.lerp(14.0, 5.5, p);
      desiredY = THREE.MathUtils.lerp(3.6, 3.3, p);
    } else if (progress <= 0.26) {
      // Passing through the Mahadvaram Portal (Z: 5.5 -> -2.0)
      const p = (progress - 0.12) / 0.14;
      desiredZ = THREE.MathUtils.lerp(5.5, -2.0, p);
      desiredY = 3.25;
    } else if (progress <= 0.50) {
      // Grand Pillared Corridor Walkthrough (Z: -2.0 -> -35.0)
      const p = (progress - 0.26) / 0.24;
      desiredZ = THREE.MathUtils.lerp(-2.0, -35.0, p);
      desiredY = 3.2;
    } else if (progress <= 0.75) {
      // Approaching Shrines of Lord Ganesha & Lord Subrahmanya (Z: -35.0 -> -65.0)
      const p = (progress - 0.50) / 0.25;
      desiredZ = THREE.MathUtils.lerp(-35.0, -65.0, p);
      desiredY = 3.2;
    } else {
      // Sacred Sanctum Sanctorum Garbhagriha Approach (Z: -65.0 -> -94.0)
      const p = (progress - 0.75) / 0.25;
      desiredZ = THREE.MathUtils.lerp(-65.0, -94.0, p);
      desiredY = 3.2;
    }

    // Subtle natural walking cadence / breathing sway
    const swayX = Math.sin(time * 0.7) * 0.035;
    const swayY = Math.cos(time * 1.1) * 0.025;

    const targetPos = new THREE.Vector3(swayX, desiredY + swayY, desiredZ);
    currentPos.current.lerp(targetPos, 0.075);
    camera.position.copy(currentPos.current);

    // 2. Interactive First-Person Mouse Look (Yaw & Pitch)
    // Multiplier increases when Free Look is toggled for extra wide inspection
    const lookSensitivity = freeLookEnabled ? 1.4 : 1.0;
    const mx = (mousePos.current.x || 0) * lookSensitivity;
    const my = (mousePos.current.y || 0) * lookSensitivity;

    // Yaw: Rotate left/right up to ~65 degrees
    const targetYaw = -mx * (Math.PI * 0.36);
    // Pitch: Rotate up (to ceiling) and down (to floor) up to ~45 degrees
    const targetPitch = my * (Math.PI * 0.24);

    // Exponential lerp dampening for silky cinematic rotation
    currentAngles.current.yaw = THREE.MathUtils.lerp(currentAngles.current.yaw, targetYaw, 0.08);
    currentAngles.current.pitch = THREE.MathUtils.lerp(currentAngles.current.pitch, targetPitch, 0.08);

    const yaw = currentAngles.current.yaw;
    const pitch = currentAngles.current.pitch;

    // Convert spherical angles to directional vector
    const dirX = Math.sin(yaw) * Math.cos(pitch);
    const dirY = Math.sin(pitch);
    const dirZ = -Math.cos(yaw) * Math.cos(pitch);

    lookTarget.current.set(
      camera.position.x + dirX * 10,
      camera.position.y + dirY * 10,
      camera.position.z + dirZ * 10
    );

    camera.lookAt(lookTarget.current);
  });

  return null;
}

/**
 * Dynamic Golden Temple Lighting Controller
 * Provides rich warm ambient illumination, directional daylight outside,
 * warm architectural point lights throughout the corridor, and glowing sanctum brilliance.
 */
function DynamicLighting({ progress = 0 }) {
  const daylightIntensity = Math.max(0.42, 1.0 - progress * 0.58);

  return (
    <group>
      {/* Neutral daylight fill keeps stone and timber legible throughout the hall. */}
      <ambientLight color="#eee9df" intensity={0.48} />

      {/* Soft daylight enters from the open entrance and side clerestories. */}
      <directionalLight
        position={[10, 18, 22]}
        color="#f6f2e8"
        intensity={1.55 * daylightIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />

      {/* Subtle reflected daylight gives the long stone mandapam even exposure. */}
      <pointLight position={[0, 5.8, -20]} color="#e9e5dc" intensity={0.55} distance={34} decay={2} />
      <pointLight position={[0, 5.8, -50]} color="#e9e5dc" intensity={0.65} distance={36} decay={2} />
      <pointLight position={[0, 5.8, -78]} color="#e9e5dc" intensity={0.7} distance={36} decay={2} />
      <pointLight position={[0, 4.8, -96]} color="#f0d9b4" intensity={0.9} distance={26} decay={2} />

      <hemisphereLight skyColor="#dce7e9" groundColor="#777064" intensity={0.72} />
    </group>
  );
}

/**
 * Main 3D Temple Environment Scene
 */
export function TempleScene({ progress = 0, mousePos, freeLookEnabled = false }) {
  return (
    <>
      {/* Interactive Camera Controller */}
      <CameraController
        progress={progress}
        mousePos={mousePos}
        freeLookEnabled={freeLookEnabled}
      />

      {/* Balanced natural daylight */}
      <DynamicLighting progress={progress} />

      {/* 1. Reflective Polished Stone Floor */}
      <TempleFloor />

      {/* 2. Entrance Portal with 3D Opening Teakwood Doors */}
      <Doorway progress={progress} />

      {/* 3. Grand Pillared Colonnade with Ganesha & Subrahmanya Shrines */}
      <PillaredCorridor />

      {/* 4. Traditional Decorated Coffered Lotus Ceiling */}
      <OrnamentalCeiling />

      {/* 5. Sree Ranganadha Main Sanctum Sanctorum (Garbhagriha) */}
      <SacredSanctum position={[0, 0, -96]} />

      {/* 6. Sacred Atmospheric Incense Smoke & Golden Dust Particles */}
      <Particles />

      {/* Light atmospheric depth without obscuring the architecture. */}
      <fog attach="fog" args={['#c8c8be', 82, 205]} />
    </>
  );
}

export default TempleScene;
