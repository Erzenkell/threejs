import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useInteractions(playerRef, interactables) {
  const activeSet = useRef(new Set());
  const pressedKeys = useRef(new Set());
  const interactLock = useRef(new Set());
  const temp = useRef(new THREE.Vector3());

  useEffect(() => {
    const onKeyDown = (e) => {
      pressedKeys.current.add(e.code);
    };

    const onKeyUp = (e) => {
      pressedKeys.current.delete(e.code);
      interactLock.current.delete(e.code);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const updateInteractions = () => {
    if (!playerRef.current) return;

    const playerPos = playerRef.current.position;
    const nextActive = new Set();

    for (const item of interactables) {
      temp.current.set(item.position[0], item.position[1], item.position[2]);

      const distance = playerPos.distanceTo(temp.current);
      const isNear = distance <= item.radius;

      if (isNear) {
        nextActive.add(item.id);

        if (!activeSet.current.has(item.id)) {
          item.onEnter?.(item);
        }

        const key = item.key ?? "KeyE";
        const keyPressed = pressedKeys.current.has(key);
        const locked = interactLock.current.has(key);

        if (keyPressed && !locked) {
          item.onInteract?.(item);
          interactLock.current.add(key);
        }
      } else {
        if (activeSet.current.has(item.id)) {
          item.onLeave?.(item);
        }
      }
    }

    activeSet.current = nextActive;
  };

  return { updateInteractions };
}