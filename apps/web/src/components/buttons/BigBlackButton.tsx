"use client"

export default function({onClick, children, disabled}: {onClick?: () => void, children: React.ReactNode, disabled?:boolean}) {
    return (
        <>
            <button 
                disabled={disabled}
                className="bg-black select-none w-full dark:hover:bg-[#1c1c1c] hover:bg-gray-800 text-white px-3 py-3 text-xs rounded-[5px] font-thin"
                onClick={onClick}
            >
                {children}
            </button>
        </>
    )
}
