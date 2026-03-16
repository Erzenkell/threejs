import React, { useEffect, useMemo } from "react";
import { Clone, useGLTF } from "@react-three/drei";

export function Tree({ position = [0, 0, 0], scale = 0.01, ...props }) {
  const { scene } = useGLTF("/models/tree/tree.gltf");
  const treeScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    treeScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [treeScene]);

  return (
    <Clone
      object={treeScene}
      position={position}
      scale={scale}
      {...props}
    />
  );
}

useGLTF.preload("/models/tree/tree.gltf");