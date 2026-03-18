import React, {useState, useMemo, useEffect} from "react";
import * as THREE from "three";

import { Firepit } from "./objects/Firepit";
import { Tree } from "./objects/Tree";
import { Guitar } from "./objects/Guitar";
import { Ground } from "./objects/Ground";
import { SnapToGround } from "./SnapToGround";

import { useSound } from "../game/sound";
import { displayText, hideText } from "../game/displayText";


export const TREE_COLLIDERS = [
  { x: -8, z: -8, radius: 2.2 },
  { x: 0, z: -10, radius: 2.4 },
  { x: 8, z: -8, radius: 2.2 },
  { x: -12, z: 0, radius: 2.5 },
  { x: 12, z: 0, radius: 2.5 },
  { x: -9, z: 8, radius: 2.3 },
  { x: 0, z: 10, radius: 2.6 },
  { x: 9, z: 8, radius: 2.3 },
  { x: -4, z: -13, radius: 1.9 },
  { x: 4, z: -13, radius: 1.9 },
  { x: -14, z: 6, radius: 1.9 },
  { x: 14, z: 6, radius: 1.9 },
];

function Trees({ x, z }) {
  return (
    <group position={[x, 0, z]}>
      <Tree position={[0, 0, 0]} scale={0.01} />
    </group>
  );
}

export function Level({ setInteractables }) {
  const [isFireLit, setIsFireLit] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const music = useSound("/audio/Secret of the Forest.mp3", { loop: true });

  useEffect(() => {
    if (isPlayingMusic) {
      music.play();
    } else {
      music.stop();
    }
  }, [isPlayingMusic]);

  const interactables = useMemo(() => [
    {
      id: "firepit",
      position: [0, 0, 0],
      radius: 3,
      key: "KeyE",
      onInteract: () => {
        setIsFireLit((prev) => !prev);
      },
      onEnter: () => {
        displayText("Press E to light fire", { position: [1, 0, 0] });
      },
      onLeave: () => {
        hideText();
      },
    },
    {
      id: "guitar",
      position: [-3, 0, -3],
      radius: 2,
      key: "KeyE",
      onInteract: () => {
        setIsPlayingMusic((prev) => !prev);
      },
      onEnter: () => {
        displayText("Press E to toggle music", { position: [-3, 0, -3] });
      },
      onLeave: () => {
        hideText();
      }
    }
  ], []);

  useEffect(() => {
    setInteractables(interactables);
  }, [interactables, setInteractables]);

  return (
    <group>
      <Ground />
      <fog attach="fog" args={["#111827", 20, 80]} />
      <SnapToGround >
        <Firepit position={[0, 0, 0]} scale={0.8} isLit={isFireLit} />

        <Guitar position={[-3, 1, -3]} scale={0.5} />

        {TREE_COLLIDERS.map((tree, i) => (
          <Trees key={i} {...tree} />
        ))}
      </SnapToGround>
    </group>
  );
}