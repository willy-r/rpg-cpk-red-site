"use client";

import { useState, useRef, useEffect } from "react";

export default function AmbientPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/cyberpunk-beat.mp3");
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 border border-[#00f5ff30] bg-[#0a0a0f]/95 backdrop-blur shadow-lg">
      <button
        onClick={toggle}
        title={playing ? "Pausar música" : "Tocar música cyberpunk"}
        className={`font-mono text-[10px] tracking-widest uppercase transition-colors whitespace-nowrap ${
          playing
            ? "text-[#00f5ff] neon-pulse"
            : "text-[#4a4a5a] hover:text-[#8a8a9a]"
        }`}
      >
        {playing ? "◼ MUSIC" : "▶ MUSIC"}
      </button>

      {playing && (
        <>
          <span className="text-[#1e1e2e] text-xs select-none">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#4a4a5a] text-[9px] font-mono tracking-widest">VOL</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={handleVolume}
              className="w-16 h-0.5 cursor-pointer appearance-none bg-[#1e1e2e] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#00f5ff] [&::-webkit-slider-thumb]:cursor-pointer"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>
        </>
      )}
    </div>
  );
}
