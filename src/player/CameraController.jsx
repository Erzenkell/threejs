import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export function CameraController({ target }) {
  const { camera } = useThree();
  const idealOffset = useMemo(() => new THREE.Vector3(0, 3.5, 7), []);
  const lookAtOffset = useMemo(() => new THREE.Vector3(0, 1.2, 0), []);
  const worldOffset = useMemo(() => new THREE.Vector3(), []);
  const worldLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!target.current) return;

    worldOffset.copy(idealOffset).applyQuaternion(target.current.quaternion);
    worldOffset.add(target.current.position);

    worldLookAt.copy(lookAtOffset).add(target.current.position);

    camera.position.lerp(worldOffset, 1 - Math.exp(-delta * 8));
    camera.lookAt(worldLookAt);
  });

  return null;
}