"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LogOutDialogBox from "../utility/LogOutDialogBox";
import MyRooms from "./MyRooms";
import { GroupChatType } from "types";

interface props {
    groups: GroupChatType[];
}

export default function UserMenu({ groups }: props) {
    const [dropDown, setDropDown] = useState<boolean>(false);
    const [logoutDropdown, setLogoutDropDown] = useState<boolean>(false);
    const [myRoomDropdown, setMyRoomDropDown] = useState<boolean>(false);
    const { data: session } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropDown(false);
        }
    };

    function handleLogout() {
        setLogoutDropDown(true);
        setDropDown(false);
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
                {session?.user && (
                    <Image
                        onClick={() => setDropDown(prev => !prev)}
                        className="rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
                        src={session.user.image!}
                        width={32}
                        height={32}
                        alt="user"
                    />
                )}
            </div>

            {dropDown && (
                <div className="absolute cursor-pointer right-8 mt-2 w-36 font-light bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <div className="block px-4 py-2 text-xs font-thin text-gray-700">
                            <i>Hi {session?.user?.name?.split(" ")[0]}</i>
                        </div>
                        <hr className="bg-black" />

                        <div
                            onClick={() => {
                                setDropDown(false);
                                setMyRoomDropDown(true);
                            }}
                            className="px-4 py-2 text-xs font-extralight text-gray-700 hover:bg-gray-200"
                        >
                            My rooms
                        </div>
                        <a
                            href="https://github.com/kant-github/chat-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-row justify-between px-4 py-2 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100"
                        >
                            Github
                            <GithubSvg />
                        </a>
                        <div
                            onClick={handleLogout}
                            className="flex justify-between px-4 py-2 text-xs text-red-600 bg-red-50 hover:bg-red-100"
                        >
                            Logout
                            <LogOutSvg />
                        </div>
                    </div>
                </div>
            )}
            <MyRooms
                myRoomDropdown={myRoomDropdown}
                setMyRoomDropDown={setMyRoomDropDown}
                groups={groups}
            />
            {logoutDropdown && (
                <LogOutDialogBox
                    logoutDropdown={logoutDropdown}
                    setLogoutDropDown={setLogoutDropDown}
                />
            )}
        </div>
    );
}

function GithubSvg() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            width="16"
            height="16"
        >
            {/* SVG Path */}
            <path fill="#3E75C3" d="M63.996,1.333..." />
        </svg>
    );
}

function LogOutSvg() {
    return (
        <svg fill="none" height="16" viewBox="0 0 24 24" width="16">
            <path
                d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                stroke="red"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
            />
        </svg>
    );
}
