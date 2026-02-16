"use client";

import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  duration?: string;
  compact?: boolean;
}

export function AudioPlayer({ duration = "1:32", compact = true }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) {
      setIsPlaying(true);
      // Simulate playback
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return p + 2;
        });
      }, 100);
    } else {
      setIsPlaying(false);
    }
  };

  if (compact) {
    return (
      <button onClick={togglePlay} className="flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group">
        {isPlaying ? (
          <Pause className="w-3 h-3 text-gray-600 dark:text-gray-300" />
        ) : (
          <Play className="w-3 h-3 text-gray-600 dark:text-gray-300" />
        )}
        {/* Waveform visualization */}
        <div className="flex items-center gap-[2px] h-4">
          {[3, 5, 8, 6, 9, 4, 7, 5, 8, 6, 3, 7, 5, 9, 4].map((h, i) => (
            <div key={i} className={`w-[2px] rounded-full transition-all duration-150 ${
              isPlaying && (progress / 100) * 15 > i
                ? "bg-green-500 dark:bg-green-400"
                : "bg-gray-300 dark:bg-gray-500 group-hover:bg-gray-400 dark:group-hover:bg-gray-400"
            }`} style={{ height: `${h * 1.5}px` }} />
          ))}
        </div>
        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">{duration}</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center hover:scale-105 transition-transform">
        {isPlaying ? <Pause className="w-4 h-4 text-white dark:text-gray-900" /> : <Play className="w-4 h-4 text-white dark:text-gray-900 ml-0.5" />}
      </button>
      <div className="flex-1">
        <div className="h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{duration}</span>
      <Volume2 className="w-4 h-4 text-gray-400" />
    </div>
  );
}
