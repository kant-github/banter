"use client";

import { ReactNode } from "react";

interface ButtonProps {
    onClick: () => void
    children: ReactNode;
}

export const WhiteBtn = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="bg-[#ffffff] dark:bg-zinc-800 w-full px-3 py-1 text-sm rounded-[3px] font-thin hover:bg-[#ededed] hover:shadow-lg transition-all duration-100 ease-in-out"
        >
            {children}
        </button>
    );
};
