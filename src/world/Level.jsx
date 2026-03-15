import React from "react";
import { Grid } from "@react-three/drei";

const obstaclePositions = [
  [6, 1, 0],
  [-6, 1, -8],
  [10, 1, 10],
  [-10, 1, 8],
  [0, 1, -14],
];

export function Level() {
  return (
    <group>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      <Grid
        args={[200, 200]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#374151"
        sectionSize={10}
        sectionThickness={1.2}
        sectionColor="#6b7280"
        fadeDistance={120}
        fadeStrength={1}
        infiniteGrid
      />

      {obstaclePositions.map((position, i) => (
        <mesh key={i} castShadow receiveShadow position={position}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>
      ))}
    </group>
  );
}