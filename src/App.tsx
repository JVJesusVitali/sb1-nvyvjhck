import React, { useState, useEffect } from 'react';
import { TeamName } from './components/TeamName';
import { CustomTimeInput } from './components/CustomTimeInput';
import { ScoreControl } from './components/ScoreControl';
import { useTimer } from './hooks/useTimer';
import { useFullscreen } from './hooks/useFullscreen';
import { playBuzzer, playVoz } from './utils/sound';
import { Maximize2 } from 'lucide-react';

function App() {
  const [localScore, setLocalScore] = useState(0);
  const [visitorScore, setVisitorScore] = useState(0);
  const [localFouls, setLocalFouls] = useState(0);
  const [visitorFouls, setVisitorFouls] = useState(0);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (isFullscreen) {
        const viewportHeight = window.innerHeight;
        const contentHeight = document.getElementById('scoreboard-content')?.scrollHeight || 0;
        const newScale = Math.min(viewportHeight / contentHeight, 1);
        setScale(newScale * 0.95); // 95% to ensure some margin
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isFullscreen]);

  const mainTimer = useTimer({ 
    initialTime: 600,
    onTimeEnd: playBuzzer
  });

  const possessionTimer = useTimer({ 
    initialTime: 24,
    onTimeEnd: playBuzzer,
    onFiveSeconds: playVoz
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2">
      <button
        onClick={toggleFullscreen}
        className="fixed top-2 right-2 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors z-50"
        title="Pantalla Completa"
      >
        <Maximize2 size={20} />
      </button>

      <div 
        id="scoreboard-content"
        className="w-full max-w-4xl mx-auto transition-transform origin-top"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {/* Team Names */}
          <TeamName initialName="LOCAL" />
          <div className="text-white text-xl sm:text-2xl text-center"></div>
          <TeamName initialName="VISITA" />

          {/* Scores */}
          <div className="text-white text-5xl sm:text-8xl font-bold border-2 p-2 sm:p-6">
            <ScoreControl value={localScore} onChange={setLocalScore} />
          </div>
          
          {/* Main Timer */}
          <div 
            className="text-yellow-300 text-4xl sm:text-7xl font-bold border-2 flex items-center justify-center cursor-pointer"
            onClick={mainTimer.toggleTimer}
          >
            <span className="text-[3rem] sm:text-[4.5rem] leading-none">{formatTime(mainTimer.time)}</span>
          </div>
          
          <div className="text-white text-5xl sm:text-8xl font-bold border-2 p-2 sm:p-6">
            <ScoreControl value={visitorScore} onChange={setVisitorScore} />
          </div>

          {/* Timer Controls */}
          <div className="col-span-3 flex justify-center gap-2 my-2">
            <button 
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              onClick={() => mainTimer.resetTime(600)}
            >
              10:00
            </button>
            <button 
              className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              onClick={() => mainTimer.resetTime(300)}
            >
              5:00
            </button>
            <CustomTimeInput onTimeSet={mainTimer.resetTime} />
          </div>

          {/* Fouls */}
          <div className="text-blue-500 text-4xl sm:text-6xl font-bold border-2 h-14 sm:h-20">
            <ScoreControl value={localFouls} onChange={setLocalFouls} />
          </div>

          {/* Possession Clock */}
          <div className="flex flex-col gap-1">
            <div 
              className="text-red-500 text-5xl sm:text-7xl font-bold border-2 p-2 sm:p-6 text-center cursor-pointer"
              onClick={possessionTimer.toggleTimer}
            >
              {possessionTimer.time}
            </div>
            <div className="flex justify-center gap-2">
              <button 
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                onClick={() => possessionTimer.resetTime(14)}
              >
                14
              </button>
              <button 
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                onClick={() => possessionTimer.resetTime(24)}
              >
                24
              </button>
            </div>
          </div>

          <div className="text-blue-500 text-4xl sm:text-6xl font-bold border-2 h-14 sm:h-20">
            <ScoreControl value={visitorFouls} onChange={setVisitorFouls} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;