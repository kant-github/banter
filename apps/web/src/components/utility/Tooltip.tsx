import React, { useState } from 'react';

interface HoverTextProps {
  text: string;
  hoverText: string;
  className?: string;
}

export default function HoverText({ text, hoverText, className }: HoverTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}

      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-gray-800 text-white text-sm p-2 rounded shadow-lg">
          {hoverText}
        </div>
      )}
    </div>
  );
}
