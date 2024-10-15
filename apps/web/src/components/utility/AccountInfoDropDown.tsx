import { CustomSession } from "app/api/auth/[...nextauth]/options";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import CrossButton from "./CrossButton";

interface Props {
    session: any;
    setAccountInfoDropDown: Dispatch<SetStateAction<boolean>>
}


export default function AccountInfoModal({ session, setAccountInfoDropDown }: Props) {
    console.log("logging session : ", session);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-[#262629] dark:text-gray-200 p-6 rounded-lg shadow-lg w-8/12 relative">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">
                        Account Information
                    </p>
                    <CrossButton setOpen={setAccountInfoDropDown} />
                </div>
                <p className="text-sm font-light">
                    See all your account details below
                </p>

                <div className="mt-6 flex w-full">
                    <Image
                        className="rounded-full mr-4"
                        src={session?.user?.image!}
                        width={80}
                        height={80}
                        alt="User Profile Image"
                    />
                    <div className="mb-2 w-full">
                        <label className="block text-sm font-medium">Name</label>
                        <div className="w-full border-[1px] border-zinc-700 px-4 py-2 rounded-[4px] font-thin text-sm">
                            {session?.user?.name || "No Name Available"}
                        </div>
                    </div>
                </div>
                <div className="flex-1">


                    <div className="mb-2 gap-x-8">
                        <label className="block text-sm font-medium w-20">Email : </label>
                        <div className="w-full border-[1px] border-zinc-700 px-4 py-2 rounded-[4px] font-thin text-sm">
                            {session?.user?.email || "No Email Available"}
                        </div>
                    </div>
                    <div className="mb-2 gap-x-8">
                        <label className="block text-sm font-medium w-20">Email : </label>
                        <div className="w-full border-[1px] border-zinc-700 px-4 py-2 rounded-[4px] font-thin text-sm">
                            {session?.user?.created_at || "No Email Available"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
