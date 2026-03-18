import React, { useEffect, useMemo } from "react";
import { Clone, useGLTF } from "@react-three/drei";

import {Fire} from "./Fire";

export function Firepit({ position = [0, 0, 0], scale = 1, isLit = false, ...props }) {
  const { scene } = useGLTF("/models/firepit/firepit.gltf");

  const firepitScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    firepitScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [firepitScene]);

  return (
    <>
      <Clone
        object={firepitScene}
        position={position}
        scale={scale}
        {...props}
      >
        <mesh userData={{ fadeable: true }}></mesh>
      </Clone>
      {isLit ? <Fire position={[-0.2, 0.4, 0]} scale={10} /> : null}
    </>
  );
}

useGLTF.preload("/models/firepit/firepit.gltf");