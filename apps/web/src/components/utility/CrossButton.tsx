import { RxCross2 } from "react-icons/rx";

interface crossButtonProps {
    setOpen: (value: boolean) => void
}

export default function ({setOpen}: crossButtonProps) {
    return (
        <div onClick={() => {
            setOpen(false);
        }} className="cursor-pointer p-1 dark:hover:text-zinc-700 rounded-[4px] transition-all duration-300">
            <RxCross2 />
        </div>
    )
}