import { create } from "zustand";

export const useUIStore = create((set) => ({
  text: null,
  position: [0, 0, 0],

  showText: (text, position) =>
    set({
      text,
      position,
    }),

  hideText: () =>
    set({
      text: null,
    }),
}));