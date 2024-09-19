"use client";
import Image from "next/image";
import ProfileDropDown from "../dashboard/ProfileDropDown";
import AppLogo from "../heading/AppLogo";

export default function() {

    return (
        <div className="flex bg-white flex-row justify-between items-center w-full px-8 h-16">
            <AppLogo/>
            <div className="flex flex-row justify-center items-center gap-x-8">
                
                <ProfileDropDown />
            </div>
        </div>
    );
}
