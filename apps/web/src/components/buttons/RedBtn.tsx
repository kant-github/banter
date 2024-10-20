"use client";

interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

export const RedBtn = ({ onClick, children }: ButtonProps) => {
    return (
        <div className="w-full">
            <button
                className="bg-red-600 w-full px-4 py-2 text-xs rounded-[4px] font-thin text-white shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none transition-all duration-100 ease-in-out"
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
};
