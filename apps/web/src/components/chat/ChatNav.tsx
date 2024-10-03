"use client";
import DarkMode from "../base/DarkMode";
import ProfileDropDown from "../dashboard/ProfileDropDown";
import AppLogo from "../heading/AppLogo";

export default function () {

    return (
        <div className="flex bg-white flex-row justify-between items-center w-full px-8 h-16 dark:bg-[#171717]">
            <AppLogo />
            <div className="flex flex-row justify-center items-center gap-x-6">
                <DarkMode />
                <ProfileDropDown />
            </div>
        </div>
    );
}
