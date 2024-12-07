import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import CrossButton from "../utility/CrossButton";
import { LikedUser } from "types";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    likedUsers: LikedUser[]
}

export default function ({ open, setOpen, likedUsers }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open, setOpen])

    return (
        <>
            <div
                ref={ref}
                className={`fixed top-0 right-0 h-screen w-[350px] bg-[#f2f2f2] border-l-[1px] dark:border-zinc-800 dark:bg-[#1c1c1c] dark:text-gray-200 shadow-xl z-50 rounded-xl transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full pointer-events-none"
                    }`}
            >

                <div className="flex items-center justify-start gap-x-3 ml-4 mt-4 p-4 cursor-pointer">
                    <CrossButton setOpen={setOpen} />
                    <h1 className="text-2xl font-bold tracking-wide">See all liked Users</h1>
                </div>
                <div className="px-12">
                    {
                        likedUsers.map((user) => (
                            <div className="flex flex-col mb-1">
                                <div className="text-sm">
                                    {user.username}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}