"use client";  // This makes only the WhiteBtn a client component

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
            className="bg-[#ffffff] px-3 py-1 text-sm rounded-md font-thin hover:bg-[#ededed]"
        >
            {children}
        </button>
    );
};
