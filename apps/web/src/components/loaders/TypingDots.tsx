// TypingDots.tsx
import React from 'react';

const TypingDots: React.FC = () => {
    return (
        <div className="flex space-x-0.5 px-1.5 py-1.5">
            <div className="dot animate-bounce h-[3px] w-[3px] bg-yellow-500 rounded-full"></div>
            <div className="dot animate-bounce h-[3px] w-[3px] bg-yellow-500 rounded-full delay-200"></div>
            <div className="dot animate-bounce h-[3px] w-[3px] bg-yellow-500 rounded-full delay-400"></div>
        </div>
    );
};

export default TypingDots;
