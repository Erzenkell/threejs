import { useUIStore } from "./uiStore";

export function displayText(text, { position }) {
  useUIStore.getState().showText(text, position);
}

export function hideText() {
  useUIStore.getState().hideText();
}