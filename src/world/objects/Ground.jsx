import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export function Ground({ position = [0, -5, 0], scale = 1, ...props }) {
  const { scene } = useGLTF("/models/ground/ground.gltf");
  const ground = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    ground.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = true;
        child.material = child.material.clone();
        child.userData.walkable = true;
      }
    });
  }, [ground]);

  return (
    <primitive
      object={ground}
      position={position}
      scale={scale}
      {...props}
    />
  );
}

useGLTF.preload("/models/ground/ground.gltf");