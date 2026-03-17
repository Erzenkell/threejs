export const interactables = [
  {
    id: "firepit",
    position: [0, 0, 0],
    radius: 3,
    key: "KeyE",
    onEnter: () => {
      console.log("Near firepit");
    },
    onLeave: () => {
      console.log("Left firepit");
    },
    onInteract: () => {
      console.log("Interacted with firepit");
    },
  },
  {
    id: "tree-1",
    position: [-8, 0, -8],
    radius: 2.5,
    key: "KeyE",
    onEnter: () => {
      console.log("Near tree");
    },
    onLeave: () => {
      console.log("Left tree");
    },
    onInteract: () => {
      console.log("Interacted with tree");
    },
  },
];