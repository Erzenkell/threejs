import React, { Suspense, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Level } from "../world/Level";
import { Player } from "../player/Player";
import { InteractionUI } from "../ui/InteractionUI";


export function Scene() {
  const [interactables, setInteractables] = useState([]);

  function Exposure() {
  const { gl } = useThree();

    useEffect(() => {
      gl.toneMappingExposure = 0.6; // 🔥 try between 0.4–1
    }, [gl]);

    return null;
  }

  return (
    <>
      <color attach="background" args={["#020617"]} />

      <fog attach="fog" args={["#020617", 15, 70]} />

      <ambientLight intensity={0.15} color="#6b85ff" />

      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        color="#a9c4ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <hemisphereLight
        intensity={0.2}
        groundColor="#020617"
        color="#4c6fff"
      />
      
      <Exposure />

      <Suspense fallback={null}>
        <Level setInteractables={setInteractables} />
        <Player interactables={interactables} />
        <InteractionUI />
      </Suspense>
    </>
  );
}