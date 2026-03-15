import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function CameraController({ target }) {
  const { camera } = useThree();

  const deadZoneX = 0.22;
  const deadZoneY = 0.18;

  const offset = useMemo(() => new THREE.Vector3(0, 14, 14), []);
  const lookAt = useRef(new THREE.Vector3());
  const center = useRef(new THREE.Vector3());

  const temp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!target.current) return;

    const pos = target.current.position;

    temp.copy(pos).project(camera);

    if (temp.x > deadZoneX) center.current.x += (temp.x - deadZoneX) * delta * 10;
    if (temp.x < -deadZoneX) center.current.x += (temp.x + deadZoneX) * delta * 10;

    if (temp.y > deadZoneY) center.current.z -= (temp.y - deadZoneY) * delta * 10;
    if (temp.y < -deadZoneY) center.current.z -= (temp.y + deadZoneY) * delta * 10;

    lookAt.current.lerp(
      new THREE.Vector3(center.current.x, 1, center.current.z),
      0.1
    );

    const camPos = lookAt.current.clone().add(offset);

    camera.position.lerp(camPos, 0.1);
    camera.lookAt(lookAt.current);
  });

  return null;
}