import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

function trimClip(clip, startTime = 3) {
  const tracks = clip.tracks
    .map((track) => {
      const times = [];
      const values = [];
      const valueSize = track.getValueSize();

      for (let i = 0; i < track.times.length; i++) {
        const t = track.times[i];
        if (t >= startTime) {
          times.push(t - startTime);
          for (let j = 0; j < valueSize; j++) {
            values.push(track.values[i * valueSize + j]);
          }
        }
      }

      if (times.length === 0) return null;

      return new track.constructor(track.name, times, values, track.getInterpolation());
    })
    .filter(Boolean);

  const duration = Math.max(0, clip.duration - startTime);
  return new THREE.AnimationClip(clip.name, duration, tracks);
}

export function Character({ animation = "idle", ...props }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/character/scene.gltf");

  const trimmedAnimations = useMemo(() => {
    const offsets = {
      idle: 3,
      walk: 3.2,
      run: 4.59,
    };

    return animations.map((clip) =>
      trimClip(clip, offsets[clip.name] ?? 0)
    );
  }, [animations]);

  const { actions } = useAnimations(trimmedAnimations, group);

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

    actions[animation]
      .reset()
      .setLoop(THREE.LoopRepeat, Infinity)
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.1)
      .play();

    return () => {
      actions[animation]?.fadeOut(0.1);
      actions[animation]?.stop();
    };
  }, [actions, animation]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/character/scene.gltf");