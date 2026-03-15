import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { CameraController } from "./CameraController";

export function Player() {
  const ref = useRef();

  const velocity = useRef(new THREE.Vector3());
  const direction = useMemo(() => new THREE.Vector3(), []);
  const frontVector = useMemo(() => new THREE.Vector3(), []);
  const sideVector = useMemo(() => new THREE.Vector3(), []);

  const [, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
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

    ref.current.position.x += velocity.current.x * delta;
    ref.current.position.z += velocity.current.z * delta;

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
    <group ref={ref} position={[0, 1, 0]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.35, 1.1]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>

      <CameraController target={ref} />
    </group>
  );
}