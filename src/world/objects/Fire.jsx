import React, { useEffect, useMemo } from "react";
import { Clone, useGLTF, useAnimations } from "@react-three/drei";


export function Fire({ position = [0, 0, 0], scale = 1, ...props }) {

  const { scene, animations } = useGLTF("/models/fire/scene.gltf");
  const fire = useMemo(() => scene.clone(true), [scene]);

  const { actions } = useAnimations(animations, fire);

  useEffect(() => {
    if (actions?.["Scene"]) {
        actions["Scene"].play();
    }
  }, [actions]);

  useEffect(() => {
    fire.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [fire]);

  return (
    <Clone
      object={fire}
      position={position}
      scale={scale}
      {...props}
    >
      <mesh userData={{ fadeable: true }}></mesh>
    </Clone>
  );
}

useGLTF.preload("/models/fire/scene.gltf");