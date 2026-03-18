import React, { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function SnapToGround({
  children,
  position = [0, 0, 0],
  enabled = true,
  offsetY = 0,
}) {
  const groupRef = useRef();
  const { scene } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const origin = useMemo(() => new THREE.Vector3(), []);
  const down = useMemo(() => new THREE.Vector3(0, -1, 0), []);

  useEffect(() => {
    if (!groupRef.current) return;

    if (!enabled) {
      groupRef.current.position.set(position[0], position[1], position[2]);
      return;
    }

    origin.set(position[0], position[1] + 100, position[2]);
    raycaster.set(origin, down);
    raycaster.far = 200;

    const hits = raycaster.intersectObjects(scene.children, true);
    const groundHit = hits.find((hit) => hit.object?.userData?.walkable);

    if (groundHit) {
      groupRef.current.position.set(
        position[0],
        groundHit.point.y + offsetY,
        position[2]
      );
    } else {
      groupRef.current.position.set(position[0], position[1], position[2]);
    }
  }, [enabled, offsetY, position, raycaster, scene, origin, down]);

  return <group ref={groupRef}>{children}</group>;
}