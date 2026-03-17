import React, { Suspense, useState } from "react";
import { Level } from "../world/Level";
import { Player } from "../player/Player";
import { InteractionUI } from "../ui/InteractionUI";


export function Scene() {
  const [interactables, setInteractables] = useState([]);

  return (
    <>
      <color attach="background" args={["#08110d"]} />

      <hemisphereLight
        intensity={0.55}
        groundColor="#06110a"
        color="#b8ffd0"
      />

      <directionalLight
        position={[8, 14, 9]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={null}>
        <Level setInteractables={setInteractables} />
        <Player interactables={interactables} />
        <InteractionUI />
      </Suspense>
    </>
  );
}