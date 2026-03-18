import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function fadeObject(object, opacity) {
  object.traverse((child) => {
    if (child.isMesh) {
      if (!child.material) return;

      child.material.transparent = true;
      child.material.opacity = opacity;
    }
  });
}

export function useOcclusionFade(playerRef) {
  const { camera, scene } = useThree();

  const raycaster = new THREE.Raycaster();
  const faded = new Set();

  useFrame(() => {
    if (!playerRef.current) return;

    const playerPos = playerRef.current.position.clone();
    const camPos = camera.position.clone();

    const direction = playerPos.clone().sub(camPos).normalize();
    const distance = camPos.distanceTo(playerPos);

    raycaster.set(camPos, direction);
    raycaster.far = distance;

    const intersects = raycaster.intersectObjects(scene.children, true);

    const currentHits = new Set();

    for (const hit of intersects) {
      const obj = hit.object;

      if (!obj.userData.fadeable) continue;

      currentHits.add(obj);

      if (!faded.has(obj)) {
        fadeObject(obj, 0.2);
        faded.add(obj);
      }
    }

    for (const obj of faded) {
      if (!currentHits.has(obj)) {
        fadeObject(obj, 1);
        faded.delete(obj);
      }
    }
  });
}