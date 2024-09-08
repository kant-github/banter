"use client"

export default function({onClick, children, disabled}: {onClick: () => void, children: React.ReactNode, disabled:boolean}) {
    return (
        <>
            <button 
                disabled={disabled}
                className="bg-black w-full hover:bg-gray-800 text-white px-3 py-3 text-xs rounded-[5px] font-thin"
                onClick={onClick}
            >
                {children}
            </button>
        </>
    )
}
