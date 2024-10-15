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
            className="bg-[#ffffff] dark:bg-[#f5a331] dark:border-[1px] dark:hover:bg-orange-300 dark:border-gray-700 py-2 px-5 text-xs rounded-[5px] font-light hover:bg-[#ededed] hover:shadow-lg transition-all duration-200 ease-in-out select-none">
            {children}
        </button>
    );
};
