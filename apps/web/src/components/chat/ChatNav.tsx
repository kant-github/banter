"use client";
import Image from "next/image";
import ProfileDropDown from "../dashboard/ProfileDropDown";

export default function() {

    return (
        <div className="flex bg-white flex-row justify-between items-center w-full px-8 h-16">
            <div className="flex flex-row gap-2 items-center cursor-pointer">
                <Image src="/images/icon_192x192.png" width={32} height={32} alt="logo" />
                <div className="text-xl md:text-md font-extrabold">ChatApp</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-x-8">
                
                <ProfileDropDown />
            </div>
        </div>
    );
}
