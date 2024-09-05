"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function UserDropdown() {
    const [dropDown, setDropDown] = useState(false);
    const { data: session } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropDown(false);
        }
    };
    const handleLogout = async () => {
        signOut({
            redirect: true,
            callbackUrl: "/"
        })
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            <div>
                {
                    session?.user && (
                        <Image
                            onClick={() => setDropDown(prev => !prev)}
                            className="rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
                            src={session.user.image!}
                            width={32}
                            height={32}
                            alt="user"
                        />
                    )
                }
            </div>
            <div>
                {
                    dropDown && (
                        <div className="absolute right-8 mt-2 w-36 font-light bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                                <div className="block px-4 py-2 text-xs font-thin text-gray-700">
                                    <i>Hi {session?.user?.name}</i>
                                </div>
                                <a href="https://github.com/kant-github/trsx" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100">
                                    Github
                                </a>
                                <div onClick={handleLogout} className="block px-4 py-2 text-xs text-red-600 bg-red-50 hover:bg-red-100">
                                    Logout
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
