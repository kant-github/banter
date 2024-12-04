import { handleClickOutside } from "@/lib/handleClickOutside";
import { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { GroupChatUserType } from "types";

type Props = {
    user: GroupChatUserType | null;
    className?: string;
};

export default function ({ user, className }: Props) {
    const [openInfoDialogBox, setOpenInfoDialogBox] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            handleClickOutside(event, ref, setOpenInfoDialogBox)
        }

        if (openInfoDialogBox) {
            document.addEventListener('mousedown', clickHandler)
        } else {
            document.removeEventListener('mousedown', clickHandler)
        }

        return () => {
            document.removeEventListener('mousedown', clickHandler)
        }
    }, [openInfoDialogBox])
    return (
        <>
            <div
                onClick={() => setOpenInfoDialogBox(prev => !prev)}
                className={`cursor-pointer relative ${className}`}
            >
                <SlOptionsVertical size={10} className="absolute -right-1" />

                {openInfoDialogBox && (
                    <div ref={ref} className="absolute top-0 -right-40 w-40 bg-zinc-600 px-3 py-2 shadow-lg z-50 rounded-[4px]">
                        <div className="text-[10px] font-normal flex items-center justify-center">
                            {
                                user?.user.bio.length === 0 ? "No bio available" : user?.user.bio
                            }
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
