import { LuPencilLine } from "react-icons/lu";
import { IoIosCopy } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { FRONTEND_BASE_URL } from "@/lib/apiAuthRoutes";
import { useSession } from "next-auth/react";

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
    const { data: session } = useSession();
    const userCheck = Number(session?.user?.id) === item.user_id;

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
                className="cursor-pointer dark:text-zinc-100 text-zinc-100"
                onClick={toggleMenu}
            />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute rounded-[4px] right-0 w-28 bg-white dark:bg-zinc-700 shadow-lg z-50"
                    >
                        <div className="py-0.5 text-sm text-zinc-900 dark:text-zinc-100">
                            <div
                                onClick={() => {
                                    navigator.clipboard.writeText(`${FRONTEND_BASE_URL}/chat/${item.id}`).then(() => {
                                        toast.success("Room link copied to clipboard");
                                        setIsOpen(false);
                                    })
                                }}
                                className="flex items-center justify-between px-4 py-2 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-[#262629] cursor-pointer text-xs"
                            >
                                <span>Copy</span>
                                <IoIosCopy />
                            </div>
                            <button
                                type="button"
                                disabled={!userCheck}
                                onClick={() => {
                                    setSelectedItemId(item.id);
                                    setEditDialogBox(true);
                                }}
                                className={`flex items-center justify-between w-full px-4 py-2 dark:bg-zinc-700 text-xs ${
                                    !userCheck
                                        ? "cursor-not-allowed text-gray-400 dark:text-zinc-500"
                                        : "hover:bg-gray-200 dark:hover:bg-[#262629] cursor-pointer"
                                }`}
                            >
                                <span>Edit</span>
                                <LuPencilLine />
                            </button>
                            <button
                                type="button"
                                disabled={!userCheck}
                                onClick={() => {
                                    setSelectedItemId(item.id);
                                    setDeleteDialogBox(true);
                                }}
                                className={`flex items-center justify-between w-full px-4 py-2 text-xs bg-red-50 dark:bg-red-700 ${
                                    !userCheck
                                        ? "cursor-not-allowed text-red-400 dark:text-red-300"
                                        : "hover:bg-red-200 dark:hover:bg-red-600 cursor-pointer"
                                }`}
                            >
                                <span>Delete</span>
                                <MdDelete className="text-red-500 dark:text-red-200" size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
