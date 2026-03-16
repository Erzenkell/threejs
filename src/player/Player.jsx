import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { CameraController } from "./CameraController";
import { TREE_COLLIDERS } from "../world/Level";

const PLAYER_RADIUS = 0.45;

function resolveTreeCollisions(position) {
  for (const tree of TREE_COLLIDERS) {
    const dx = position.x - tree.x;
    const dz = position.z - tree.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    const minDistance = PLAYER_RADIUS + tree.radius * 0.42;

    if (distance < minDistance) {
      const safeDistance = distance || 0.0001;
      const push = (minDistance - safeDistance) / safeDistance;
      position.x += dx * push;
      position.z += dz * push;
    }
  }
}

export function Player() {
  const ref = useRef();
  const velocity = useRef(new THREE.Vector3());
  const direction = useMemo(() => new THREE.Vector3(), []);
  const frontVector = useMemo(() => new THREE.Vector3(), []);
  const sideVector = useMemo(() => new THREE.Vector3(), []);
  const nextPosition = useMemo(() => new THREE.Vector3(), []);
  const [, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
    if (!ref.current) return;

    const { forward, backward, left, right, run } = getKeys();
    const speed = run ? 7 : 4;

    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed);

    velocity.current.x = THREE.MathUtils.lerp(
      velocity.current.x,
      direction.x,
      1 - Math.exp(-delta * 12)
    );

    velocity.current.z = THREE.MathUtils.lerp(
      velocity.current.z,
      direction.z,
      1 - Math.exp(-delta * 12)
    );
 
    nextPosition.copy(ref.current.position);
    nextPosition.x += velocity.current.x * delta;
    nextPosition.z += velocity.current.z * delta;

    resolveTreeCollisions(nextPosition);

    ref.current.position.x = nextPosition.x;
    ref.current.position.z = nextPosition.z;

    if (direction.lengthSq() > 0.001) {
      const angle = Math.atan2(direction.x, direction.z);
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        angle,
        1 - Math.exp(-delta * 12)
      );
    }
  });

  return (
    <group ref={ref} position={[0, 1, 5.5]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.35, 1.1]} />
        <meshStandardMaterial color="#d6e85a" />
      </mesh>

      <mesh castShadow position={[0, 0.9, 0.3]}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshStandardMaterial color="#89a92a" />
      </mesh>

      <CameraController target={ref} />
    </group>
  );
}