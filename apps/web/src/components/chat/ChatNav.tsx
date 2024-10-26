"use client";
import { useSession } from "next-auth/react";
import DarkMode from "../base/DarkMode";
import ProfileDropDown from "../dashboard/ProfileDropDown";
import AppLogo from "../heading/AppLogo";
import { Cedarville_Cursive } from "next/font/google"
import Version from "../buttons/Version";

const font = Cedarville_Cursive({ weight: '400', subsets: ['latin'] })

export default function () {

    const { data: session } = useSession();
    return (
        <div className="flex bg-white dark:bg-[#171717] flex-row justify-between items-center w-full px-8 py-4 border-b dark:border-zinc-700 dark:shadow-[40px]">
            <div className="flex items-center gap-x-2">
                <AppLogo />
                <Version />
            </div>
            <div className="flex flex-row justify-center items-center gap-x-6">
                <span className={`text-center mr-6 dark:text-gray-200 text-[17px] select-none ${font.className}`}>Hey {session?.user.name?.split(" ")[0]}</span>
                <DarkMode />
                <ProfileDropDown />
            </div>
        </div>
    );
}
