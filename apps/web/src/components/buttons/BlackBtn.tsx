export default function BlackBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            className="bg-black select-none w-full hover:bg-gray-800 text-white px-3 py-2 text-xs rounded-[5px] font-thin"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
