import { useState, useEffect } from 'react';

interface UseTimerProps {
  initialTime: number;
  onTimeEnd?: () => void;
  onFiveSeconds?: () => void;
}

export function useTimer({ initialTime, onTimeEnd, onFiveSeconds }: UseTimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime(prev => {

          if (prev === 1) {
            onTimeEnd?.();
          }

          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          
          // Check for 5 seconds remaining
          if (prev === 6) {
            onFiveSeconds?.();
          }
          
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimeEnd, onFiveSeconds]);

  const resetTime = (newTime: number) => {
    setTime(newTime);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  return {
    time,
    isRunning,
    resetTime,
    toggleTimer
  };
}