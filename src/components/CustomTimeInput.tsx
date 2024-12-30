import React, { useState } from 'react';

interface CustomTimeInputProps {
  onTimeSet: (seconds: number) => void;
}

export function CustomTimeInput({ onTimeSet }: CustomTimeInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSeconds = (parseInt(minutes || '0') * 60) + parseInt(seconds || '0');
    if (totalSeconds > 0) {
      onTimeSet(totalSeconds);
    }
    setIsEditing(false);
    setMinutes('');
    setSeconds('');
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-1 items-center">
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="min"
          className="w-12 px-1 py-1 text-sm bg-gray-800 text-white rounded"
          min="0"
          max="99"
          autoFocus
        />
        <span className="text-white">:</span>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          placeholder="seg"
          className="w-12 px-1 py-1 text-sm bg-gray-800 text-white rounded"
          min="0"
          max="59"
        />
        <button 
          type="submit"
          className="bg-gray-700 text-white px-2 py-1 rounded text-sm hover:bg-gray-600"
        >
          OK
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="bg-gray-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-600 transition-colors"
    >
      Custom
    </button>
  );
}