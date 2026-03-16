import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { CameraController } from "./CameraController";
import { Character } from "../world/character/Character";

export function Player() {
  const ref = useRef();
  const visualRef = useRef();

  const velocity = useRef(new THREE.Vector3());
  const direction = useMemo(() => new THREE.Vector3(), []);
  const frontVector = useMemo(() => new THREE.Vector3(), []);
  const sideVector = useMemo(() => new THREE.Vector3(), []);
  const [, getKeys] = useKeyboardControls();
  const [animation, setAnimation] = useState("idle");

  useEffect(() => {
    if (!ref.current) return;
    ref.current.position.set(0, 0.9, 0);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || !visualRef.current) return;

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

      visualRef.current.rotation.y = THREE.MathUtils.lerp(
        visualRef.current.rotation.y,
        angle,
        1 - Math.exp(-delta * 12)
      );
    }

    const moving = direction.lengthSq() > 0.0001;
    const nextAnimation = moving ? (run ? "run" : "walk") : "idle";

    setAnimation((prev) => (prev === nextAnimation ? prev : nextAnimation));
  });

  return (
    <group ref={ref}>
      <group ref={visualRef}>
        <Character
          animation={animation}
          scale={0.05}
          rotation={[0, Math.PI, 0]}
        />
      </group>
      <CameraController target={ref} />
    </group>
  );
}