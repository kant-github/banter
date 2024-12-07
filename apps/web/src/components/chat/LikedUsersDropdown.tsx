import { Dispatch, SetStateAction } from "react";
import CrossButton from "../utility/CrossButton";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ({ open, setOpen }: Props) {
    return (
        <div className={`fixed top-0 right-0 h-screen w-[350px] bg-[#f2f2f2] border-l-[1px] dark:border-zinc-800 dark:bg-[#1c1c1c] dark:text-gray-200 shadow-xl z-50 rounded-xl transform transition-transform duration-400 ${open ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex items-center justify-start gap-x-3 ml-4 mt-4 p-4 cursor-pointer">
                <CrossButton setOpen={setOpen} />
                <h1 className="text-2xl font-bold tracking-wide">All rooms</h1>
            </div>
        </div>
    )
}