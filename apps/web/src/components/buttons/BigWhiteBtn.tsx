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
            className="flex items-center justify-center gap-1 bg-[#ffffff] px-3 py-2 text-xs rounded-[3px] font-thin hover:bg-[#ededed] hover:shadow-lg transition-all duration-100 ease-in-out"
        >
            {children}
        </button>
    );
};
