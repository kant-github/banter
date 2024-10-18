import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CrossButton from "./CrossButton";
import { fetchUser } from "fetch/fetchUser";
import { CustomSession } from "app/api/auth/[...nextauth]/options";

import { format } from 'date-fns';import { UserType } from "types";

interface Props {
    session: CustomSession;
    setAccountInfoDropDown: Dispatch<SetStateAction<boolean>>
}

export default function AccountInfoModal({ session, setAccountInfoDropDown }: Props) {
    // State to hold fetched user data
    const [userData, setUserData] = useState<UserType | null>(null);

    // Fetch user data
    async function get() {
        if (session?.user?.id && session?.user?.token) {
            const data = await fetchUser(session.user.id, session.user.token);
            setUserData(data); // Update state with fetched data
        }
    }

    useEffect(() => {
        get();
    }, [session]);


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
                        src={userData?.image!}
                        width={80}
                        height={80}
                        alt="User Profile Image"
                    />
                    <div className="mb-2 w-full">
                        <label className="block text-sm font-medium">Name</label>
                        <div className="w-full border-[1px] border-zinc-700 px-4 py-2 rounded-[4px] font-thin text-sm">
                            {userData?.name || session.user?.name || "No Name Available"}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="mb-2 gap-x-8">
                        <label className="block text-sm font-medium w-20">Email:</label>
                        <div className="w-full border-[1px] border-zinc-700 px-4 py-2 rounded-[4px] font-thin text-sm">
                            {userData?.email || session.user?.email || "No Email Available"}
                        </div>
                    </div>
                    <div className="mb-2 gap-x-8">
                        <label className="block text-sm font-medium w-20">Created At:</label>
                        <div className="w-full border-[1px] border-zinc-700 px-4 py-2 rounded-[4px] font-thin text-sm">
                            {userData?.created_at
                                ? `Joined at: ${format(new Date(userData.created_at), 'MMMM dd, yyyy')}`
                                : "No Date Available"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
