import React, { useState } from 'react';

interface TeamNameProps {
  initialName: string;
}

export function TeamName({ initialName }: TeamNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  if (isEditing) {
    return (
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
        className="bg-transparent text-white text-2xl text-center border border-white rounded px-2"
        autoFocus
      />
    );
  }

  return (
    <div 
      className="text-white text-2xl text-center cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {name}
    </div>
  );
}