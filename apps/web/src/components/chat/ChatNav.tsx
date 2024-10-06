"use client";
import { useSession } from "next-auth/react";
import DarkMode from "../base/DarkMode";
import ProfileDropDown from "../dashboard/ProfileDropDown";
import AppLogo from "../heading/AppLogo";
import { Cedarville_Cursive } from "next/font/google"

const font = Cedarville_Cursive({ weight: '400', subsets: ['latin'] })

export default function () {

    const { data: session } = useSession();
    return (
        <div className="flex bg-white flex-row justify-between items-center w-full px-8 h-16 dark:bg-[#171717]">
            <AppLogo />
            <div className="flex flex-row justify-center items-center gap-x-6">
                <span className={`text-center mr-6 dark:text-gray-200 text-[17px] ${font.className}`}>Hey {session?.user.name?.split(" ")[0]}</span>
                <DarkMode />
                <ProfileDropDown />
            </div>
        </div>
    );
}
