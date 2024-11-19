import { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { GroupChatUserType } from "types";

type Props = {
    user: GroupChatUserType | null;
    className?: string;
};

export default function ({ user, className }: Props) {
    const [openInfoDialogBox, setOpenInfoDialogBox] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpenInfoDialogBox(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            <div
                ref={dropdownRef}
                onClick={() => setOpenInfoDialogBox(prev => !prev)}
                className={`cursor-pointer relative ${className}`}
            >
                <SlOptionsVertical size={10} className="absolute right-0" />

                {
                    openInfoDialogBox && (
                        <div className="absolute top-0 -right-40 w-40 bg-zinc-600 px-3 py-2 shadow-lg z-50 rounded-[4px]">
                            <div className="text-xs font-normal">
                                {user?.user.bio ? user?.user.bio : "No bio available"}
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}
