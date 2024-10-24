// TypingDots.tsx
import React from 'react';

const TypingDots: React.FC = () => {
    return (
        <div className="flex space-x-1">
            <div className="dot animate-bounce h-[4px] w-[4px] bg-yellow-500 rounded-full"></div>
            <div className="dot animate-bounce h-[4px] w-[4px] bg-yellow-500 rounded-full delay-200"></div>
            <div className="dot animate-bounce h-[4px] w-[4px] bg-yellow-500 rounded-full delay-400"></div>
        </div>
    );
};

export default TypingDots;
