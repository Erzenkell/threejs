import React, { Suspense } from "react";
import { Level } from "../world/Level";
import { Player } from "../player/Player";

export function Scene() {
  return (
    <>
      <color attach="background" args={["#0f172a"]} />

      <hemisphereLight intensity={0.7} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.5}
        castShadow
      />

      <Suspense fallback={null}>
        <Level />
        <Player />
      </Suspense>
    </>
  );
}