import React, { useState, useEffect } from 'react';
import Fireworks from './components/Fireworks';
import ParticleText from './components/ParticleText';
import SplashCursor from './components/SplashCursor';
import { Play, Pause, SkipForward } from 'lucide-react';

// The sequence of messages to display
const MESSAGES = [
  "To 妍大王",
  "祝妍大王",
  "身体健康",
  "佳人相伴",
  "幸福相随！",
  "❤"
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPlaying) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
      }, 4000); // Change text every 4 seconds
    }
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    // Reset timer effectively by triggering re-render
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* Top Layer: Fluid Splash Cursor (Visual overlay, input pass-through) */}
      <SplashCursor />
      
      {/* Background Layer: Fireworks */}
      <div className="absolute inset-0 z-0">
        <Fireworks />
      </div>

      {/* Foreground Layer: Interactive Text Particles */}
      <div className="absolute inset-0 z-10">
        <ParticleText text={MESSAGES[currentIndex]} />
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all transform hover:scale-110 pointer-events-auto"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={nextMessage}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all transform hover:scale-110 pointer-events-auto"
        >
          <SkipForward size={24} />
        </button>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/30 text-xs z-20 pointer-events-none">
        Hover over text and background to interact • Tap bottom for controls
      </div>
    </div>
  );
};

export default App;