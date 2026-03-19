import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Clone, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Fire({ position = [0, 0, 0], scale = 1, ...props }) {
  const { scene, animations } = useGLTF("/models/fire/scene.gltf");
  const fire = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, fire);

  const lightRef = useRef();

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

        if (child.material) {
          child.material = child.material.clone();

          if ("emissive" in child.material) {
            child.material.emissive = new THREE.Color("#ff6b1a");
            child.material.emissiveIntensity = 2.5;
          }
        }
      }
    });
  }, [fire]);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.random() * 0.8;
    }
  });

  return (
    <group position={position} scale={scale} {...props}>
      <Clone object={fire} />

      <pointLight
        position={[0, 0, 0]}
        intensity={40}
        distance={15}
        decay={1.5}
        color="#ff7a1a"
        castShadow
      />
    </group>
  );
}

useGLTF.preload("/models/fire/scene.gltf");