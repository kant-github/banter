"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LogOutDialogBox from "../utility/LogOutDialogBox";

export default function () {
    const [dropDown, setDropDown] = useState<boolean>(false);
    const [logoutDropdown, setLogoutDropDown] = useState<boolean>(false);
    const { data: session } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropDown(false);
        }
    };

    function handleLogout() {
        setLogoutDropDown(true);
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
                        <div className="absolute cursor-pointer right-8 mt-2 w-36 font-light bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                                <div className="block px-4 py-2 text-xs font-thin text-gray-700">
                                    <i>Hi {session?.user?.name?.split(" ")[0]}</i>
                                </div>
                                <a href="https://github.com/kant-github/chat-app" target="_blank" rel="noopener noreferrer" className="flex flex-row justify-between px-4 py-2 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100">
                                    Github
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 128 128"
                                        width="16"
                                        height="16"
                                        enableBackground="new 0 0 128 128"
                                    >
                                        <g id="Social_Icons">
                                            <g id="_x31__stroke">
                                                <g id="Github_1_">
                                                    <rect clipRule="evenodd" fill="none" height="128" width="128" />
                                                    <path
                                                        fill="#3E75C3"
                                                        clipRule="evenodd"
                                                        fillRule="evenodd"
                                                        d="M63.996,1.333C28.656,1.333,0,30.099,0,65.591 c0,28.384,18.336,52.467,43.772,60.965c3.2,0.59,4.368-1.394,4.368-3.096c0-1.526-0.056-5.566-0.088-10.927 c-17.804,3.883-21.56-8.614-21.56-8.614c-2.908-7.421-7.104-9.397-7.104-9.397c-5.812-3.988,0.44-3.907,0.44-3.907 c6.42,0.454,9.8,6.622,9.8,6.622c5.712,9.819,14.98,6.984,18.628,5.337c0.58-4.152,2.236-6.984,4.064-8.59 c-14.212-1.622-29.152-7.132-29.152-31.753c0-7.016,2.492-12.75,6.588-17.244c-0.66-1.626-2.856-8.156,0.624-17.003 c0,0,5.376-1.727,17.6,6.586c5.108-1.426,10.58-2.136,16.024-2.165c5.436,0.028,10.912,0.739,16.024,2.165 c12.216-8.313,17.58-6.586,17.58-6.586c3.492,8.847,1.296,15.377,0.636,17.003c4.104,4.494,6.58,10.228,6.58,17.244 c0,24.681-14.964,30.115-29.22,31.705c2.296,1.984,4.344,5.903,4.344,11.899c0,8.59-0.08,15.517-0.08,17.626 c0,1.719,1.152,3.719,4.4,3.088C109.68,118.034,128,93.967,128,65.591C128,30.099,99.344,1.333,63.996,1.333"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                                <div onClick={handleLogout} className=" flex justify-between px-4 py-2 text-xs text-red-600 bg-red-50 hover:bg-red-100">
                                    Logout
                                    <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" /></svg>
                                </div>
                                <>
                                    {
                                        logoutDropdown && <LogOutDialogBox logoutDropdown={logoutDropdown} setLogoutDropDown={setLogoutDropDown} />
                                    }
                                </>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
