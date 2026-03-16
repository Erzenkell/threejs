import React, { useEffect, useMemo } from "react";
import { Clone, useGLTF } from "@react-three/drei";

export function Firepit({ position = [0, 0, 0], scale = 1, ...props }) {
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
    <Clone
      object={firepitScene}
      position={position}
      scale={scale}
      {...props}
    />
  );
}

useGLTF.preload("/models/firepit/firepit.gltf");