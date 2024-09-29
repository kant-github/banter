import { LuPencilLine } from "react-icons/lu";
import { IoIosCopy } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { FRONTEND_BASE_URL } from "@/lib/apiAuthRoutes";


interface OptionsMenuProps {
    className?: string;
    setDeleteDialogBox: (value: boolean) => void;
    setEditDialogBox: (value: boolean) => void;
    setSelectedItemId: (id: string | null) => void;
    item: Item;
    color?: string;
}

interface Item {
    id: string;
    user_id: number;
    title: string;
    passcode: string;
    created_at: string;
}

export function OptionsMenu({
    className,
    setDeleteDialogBox,
    setEditDialogBox,
    setSelectedItemId,
    item,
    color
}: OptionsMenuProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} className={`relative ${className}`}>
            <SlOptionsVertical
                size={12}
                className="cursor-pointer text-zinc-100"
                onClick={toggleMenu}
                color={color || "white"}

            />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute rounded-[4px] right-0  w-28 bg-white dark:bg-slate-800 shadow-lg z-50"
                    >
                        <div className="py-0.5 text-sm text-zinc-900 dark:text-zinc-100">
                            <div
                                onClick={() => {
                                    navigator.clipboard.writeText(`${FRONTEND_BASE_URL}/chat/${item.id}`).then(() => {
                                        toast.success("Copied to clipboard");
                                        setIsOpen(false);
                                    })
                                }}
                                className=" flex items-center justify-between px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer text-xs">
                                <span>Copy</span>
                                <IoIosCopy />
                            </div>
                            <div onClick={() => {
                                setSelectedItemId(item.id);
                                setEditDialogBox(true);
                            }} className="flex items-center justify-between px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer text-xs">
                                <span>Edit</span>
                                <LuPencilLine />
                            </div>
                            <div
                                onClick={() => {
                                    setSelectedItemId(item.id);
                                    setDeleteDialogBox(true);
                                }}
                                className="px-4 py-2 hover:bg-red-200 dark:hover:bg-slate-700 cursor-pointer text-xs bg-red-50 flex flex-row items-center justify-between"
                            >
                                Delete
                                <MdDelete color="red" size={14} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
