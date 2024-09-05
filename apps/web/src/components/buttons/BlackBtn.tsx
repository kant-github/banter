"use client"
export default function({onClick, children}: {onClick: () => void, children: React.ReactNode}) {
    return (
        <>
            <button className="bg-black w-full hover:bg-gray-800 text-white px-3 py-2 text-xs rounded-md font-thin" onClick={onClick}>{children}</button>
        </>
    )
}