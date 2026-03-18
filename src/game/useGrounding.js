import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function useGrounding(playerRef, {
  hoverHeight = 0.9,
  rayStartHeight = 10,
  maxDrop = 30,
  smooth = 14,
} = {}) {
  const { scene } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const origin = useMemo(() => new THREE.Vector3(), []);
  const down = useMemo(() => new THREE.Vector3(0, -1, 0), []);

  useFrame((_, delta) => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    const x = player.position.x;
    const z = player.position.z;

    origin.set(x, player.position.y + rayStartHeight, z);
    raycaster.set(origin, down);
    raycaster.far = rayStartHeight + maxDrop;

    const hits = raycaster.intersectObjects(scene.children, true);

    const groundHit = hits.find((hit) => hit.object?.userData?.walkable);

    if (!groundHit) return;

    const targetY = groundHit.point.y + hoverHeight;

    player.position.y = THREE.MathUtils.lerp(
      player.position.y,
      targetY,
      1 - Math.exp(-delta * smooth)
    );
  });
}