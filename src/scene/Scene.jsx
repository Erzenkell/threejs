import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Level } from "../world/Level";
import { Player } from "../player/Player";

export function Scene() {
  return (
    <>
      <color attach="background" args={["#111827"]} />
      <fog attach="fog" args={["#111827", 18, 60]} />

      <hemisphereLight intensity={0.7} groundColor="#0f172a" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={null}>
        <Level />
        <Player />
      </Suspense>

      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </>
  );
}