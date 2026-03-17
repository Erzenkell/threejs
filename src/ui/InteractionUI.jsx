import { Html } from "@react-three/drei";
import { useUIStore } from "../game/uiStore";

export function InteractionUI() {
  const { text, position } = useUIStore();

  if (!text) return null;

  return (
    <Html position={[position[0], position[1] + 2, position[2]]} center>
      <div
        style={{
          color: "white",
          background: "rgba(0,0,0,0.7)",
          padding: "6px 10px",
          borderRadius: "8px",
          fontSize: "12px",
          pointerEvents: "none",
        }}
      >
        {text}
      </div>
    </Html>
  );
}