import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Scene } from "./scene/Scene";
import { keyboardMap } from "./game/Input";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ fov: 50, position: [0, 14, 14] }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
        >
          <Scene />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}