import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ScoreControlProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function ScoreControl({ value, onChange, className = '' }: ScoreControlProps) {
  return (
    <div className={`relative group flex items-center justify-center h-full ${className}`}>
      <div className="text-center">{value.toString().padStart(2, '0')}</div>
      <div className="absolute right-0 inset-y-0 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onChange(value + 1)}
          className="bg-green-600/80 hover:bg-green-500 text-white p-1 rounded-l"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="bg-red-600/80 hover:bg-red-500 text-white p-1 rounded-l"
        >
          <Minus size={16} />
        </button>
      </div>
    </div>
  );
}