import React, { useEffect, useMemo } from "react";
import { Clone, useGLTF } from "@react-three/drei";

export function Guitar({ position = [0, 0, 0], scale = 0.01, ...props }) {
  const { scene } = useGLTF("/models/guitar/scene.gltf");
  const guitarScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    guitarScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [guitarScene]);

  return (
    <Clone
      object={guitarScene}
      position={position}
      scale={scale}
      {...props}
    />
  );
}

useGLTF.preload("/models/guitar/scene.gltf");