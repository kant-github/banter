"use client";  // This makes only the WhiteBtn a client component

import { ReactNode } from "react";

interface ButtonProps {
    onClick: () => void
    children: ReactNode;
}

export default function({ onClick, children }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            type="button"
            className="bg-[#ffffff] w-full px-3 py-2 text-sm rounded-[3px] font-light hover:bg-[#ededed]"
        >
            {children}
        </button>
    );
};
