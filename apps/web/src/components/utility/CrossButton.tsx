import { Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";

interface crossButtonProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    className?: string | null
}

export default function ({setOpen, className}: crossButtonProps) {
    return (
        <div onClick={() => {
            setOpen(false);
        }} className={`cursor-pointer p-1 rounded-[4px] transition-all duration-300 ${className}`}>
            <RxCross2 />
        </div>
    )
}