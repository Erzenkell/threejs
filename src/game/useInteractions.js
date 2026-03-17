import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useInteractions(playerRef, interactables) {
  const currentTarget = useRef(null);
  const pressedKeys = useRef(new Set());
  const interactLock = useRef(false);
  const temp = useRef(new THREE.Vector3());

  useEffect(() => {
    const onKeyDown = (e) => {
      pressedKeys.current.add(e.code);
    };

    const onKeyUp = (e) => {
      pressedKeys.current.delete(e.code);
      interactLock.current = false;
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

    let closest = null;
    let closestDistance = Infinity;

    for (const item of interactables) {
      temp.current.set(item.position[0], item.position[1], item.position[2]);

      const distance = playerPos.distanceTo(temp.current);

      if (distance <= item.radius && distance < closestDistance) {
        closest = item;
        closestDistance = distance;
      }
    }

    if (currentTarget.current?.id !== closest?.id) {
      if (currentTarget.current) {
        currentTarget.current.onLeave?.(currentTarget.current);
      }

      if (closest) {
        closest.onEnter?.(closest);
      }

      currentTarget.current = closest;
    }

    if (closest) {
      const key = closest.key ?? "KeyE";
      const keyPressed = pressedKeys.current.has(key);

      if (keyPressed && !interactLock.current) {
        closest.onInteract?.(closest);
        interactLock.current = true;
      }
    }
  };

  return { updateInteractions };
}