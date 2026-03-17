import { useRef, useEffect } from "react";

export function useSound(src, { loop = false } = {}) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.1;
    audioRef.current.loop = loop;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src, loop]);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return { play, stop };
}