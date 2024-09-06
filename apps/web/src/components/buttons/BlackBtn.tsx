export default function BlackBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-xs rounded-[5px] font-thin min-w-[120px]"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
