import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { LikedUser } from "types";
import AppLogo from "../heading/AppLogo";

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
                    <h1 className="text-2xl font-bold tracking-wide">See all liked Users</h1>
                </div>
                <p className="mx-8 text-xs text-gray-500">
                    See all the users who have upvoted / liked this message below
                </p>
                <div className="flex mt-4 flex-col justify-start mx-8 h-[500px] overflow-y-auto text-zinc-600 dark:text-zinc-400">
                    {
                        likedUsers.map((user, index) => (
                            <div key={index} className="flex flex-col mb-1">
                                <div className="text-xs">
                                    <span>{index + 1 + ". "}</span>
                                    <span>{user.username}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-2  mx-4">
                    <AppLogo />
                    <p className="text-[11px] font-thin mx-3 my-2 mb-4 italic">
                        Banter is the go-to solution for managing group chats and rooms. Customize, organize, and stay connected with ease.
                    </p>
                </div>
            </div>
        </>
    )
}