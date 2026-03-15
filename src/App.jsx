import React from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Scene } from "./scene/Scene";
import { keyboardMap } from "./game/Input";

export default function App() {
  return (
    <div className="w-full h-screen bg-slate-950 text-white">
      <div className="absolute left-4 top-4 z-10 rounded-2xl bg-black/40 px-4 py-3 backdrop-blur">
        <div className="text-lg font-semibold">React Three.js Starter</div>
        <div className="text-sm text-slate-200">Move: WASD / Arrows</div>
        <div className="text-sm text-slate-200">Run: Shift</div>
      </div>

      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ fov: 50, position: [0, 4, 8] }}>
          <Scene />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}