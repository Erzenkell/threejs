import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Character({ animation = "idle", ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/character/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!actions?.[animation]) return;

    Object.values(actions).forEach((action) => {
      if (!action) return;
      action.stop();
      action.reset();
    });

    const action = actions[animation];
    action.reset();
    action.time = 0;
    action.enabled = true;
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(1);
    action.play();

    return () => {
      action.stop();
    };
  }, [actions, animation]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/character/scene.gltf");