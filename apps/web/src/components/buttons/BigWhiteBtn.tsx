"use client";  // This makes only the WhiteBtn a client component

import { ReactNode } from "react";

interface ButtonProps {
    onClick: () => void
    children: ReactNode;
}

export default function ({ onClick, children }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="bg-[#ffffff] dark:bg-zinc-800 dark:text-gray-200 flex items-center justify-center w-full py-2 gap-1 text-xs rounded-[3px] font-thin hover:bg-[#ededed] hover:shadow-lg transition-all duration-100 ease-in-out"
        >
            {children}
        </button>
    );
};
