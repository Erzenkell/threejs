import React from "react";
import { Grid } from "@react-three/drei";

export function Level() {
  const obstacles = [
    [6, 1, 0],
    [-6, 1, -8],
    [10, 1, 10],
    [-10, 1, 8],
    [0, 1, -14],
  ];

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      <Grid
        args={[200, 200]}
        cellSize={1}
        sectionSize={10}
        infiniteGrid
      />

      {obstacles.map((p, i) => (
        <mesh key={i} position={p} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      ))}
    </group>
  );
}