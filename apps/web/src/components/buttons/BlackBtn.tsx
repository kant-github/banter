export default function BlackBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            className="px-5 w-full py-2 text-xs font-thin rounded-[5px] select-none 
                bg-black text-white hover:bg-gray-800
                dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-[#1c1c1c]
                transition-colors duration-300"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
