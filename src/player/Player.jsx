import React, { useEffect, useMemo, useRef } from "react";
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

  useEffect(() => {
    if (!ref.current) return;
    ref.current.position.set(0, 0.9, 0);
  }, []);

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

    ref.current.position.x += velocity.current.x * delta;
    ref.current.position.z += velocity.current.z * delta;

    if (direction.lengthSq() > 0.0001) {
      const angle = Math.atan2(direction.x, direction.z);
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        angle,
        1 - Math.exp(-delta * 12)
      );
    }
  });

  return (
    <group ref={ref}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.35, 1.1, 8, 16]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>

      <mesh castShadow position={[0, 1.85, 0.12]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#86efac" />
      </mesh>

      <mesh castShadow position={[0.15, 1.9, 0.34]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh castShadow position={[-0.15, 1.9, 0.34]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <CameraController target={ref} />
    </group>
  );
}