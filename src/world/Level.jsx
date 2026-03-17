import React, {useState, useMemo, useEffect} from "react";
import * as THREE from "three";

import { Firepit } from "./objects/Firepit";
import { Tree } from "./objects/Tree";

export const TREE_COLLIDERS = [
  { x: -8, z: -8, radius: 2.2 },
  { x: 0, z: -10, radius: 2.4 },
  { x: 8, z: -8, radius: 2.2 },
  { x: -12, z: 0, radius: 2.5 },
  { x: 12, z: 0, radius: 2.5 },
  { x: -9, z: 8, radius: 2.3 },
  { x: 0, z: 10, radius: 2.6 },
  { x: 9, z: 8, radius: 2.3 },
  { x: -4, z: -13, radius: 1.9 },
  { x: 4, z: -13, radius: 1.9 },
  { x: -14, z: 6, radius: 1.9 },
  { x: 14, z: 6, radius: 1.9 },
];

function Trees({ x, z }) {
  return (
    <group position={[x, 0, z]}>
      <Tree position={[0, 0, 0]} scale={0.01} />
    </group>
  );
}

function GroundRing() {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 5.5, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(0, 0, 2.1, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]} receiveShadow>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color="#6b5f2a" />
    </mesh>
  );
}

export function Level({ setInteractables }) {
  const [isFireLit, setIsFireLit] = useState(true);

  const interactables = useMemo(() => [
    {
      id: "firepit",
      position: [0, 0, 0],
      radius: 3,
      key: "KeyE",
      onInteract: () => {
        setIsFireLit((prev) => !prev);
      },
    },
  ], []);

  useEffect(() => {
    setInteractables(interactables);
  }, [interactables, setInteractables]);

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#10281f" />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} position={[0, 0.005, 0]} receiveShadow>
        <circleGeometry args={[5.2, 48]} />
        <meshStandardMaterial color="#314a2a" />
      </mesh>

      <GroundRing />
      <Firepit position={[0, 0, 0]} scale={0.8} isLit={isFireLit} />

      {TREE_COLLIDERS.map((tree, i) => (
        <Trees key={i} {...tree} />
      ))}
    </group>
  );
}