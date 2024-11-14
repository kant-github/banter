import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CrossButton from "./CrossButton";
import { fetchUser } from "fetch/fetchUser";
import { FaEdit } from "react-icons/fa";
import { CustomSession } from "app/api/auth/[...nextauth]/options";

import { format } from 'date-fns'; import { UserType } from "types";
import AppLogo from "../heading/AppLogo";
import { WhiteBtn } from "../buttons/WhiteBtn";
import BlackBtn from "../buttons/BlackBtn";

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
            <div className="bg-white dark:bg-zinc-900 dark:text-gray-200 p-6 rounded-lg shadow-lg w-6/12 relative">
                <div className="flex justify-between relative">
                    <p className="text-lg font-semibold">
                        Account Information
                    </p>
                    <BlackBtn className={"mr-12"}>Edit Profile</BlackBtn>
                    <CrossButton className={"absolute top-2 right-3"} setOpen={setAccountInfoDropDown} />
                </div>
                <p className="text-sm font-light">
                    See all your account details below
                </p>

                <div className="bg-zinc-800 rounded-[4px] p-2 pl-8 mt-4">
                    <div className="mt-6 flex w-full">
                        <Image
                            className="rounded-full mr-4"
                            src={userData?.image!}
                            width={80}
                            height={80}
                            alt="User Profile Image"
                        />
                        <div className="w-4/5 bg-zinc-700 font-thin text-[12px] px-4 py-2 relative">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi blanditiis error exercitationem reiciendis facere provident ab minus dolor cumque vero!
                            <FaEdit className="absolute bottom-2 right-2 cursor-pointer" size={16} />
                        </div>

                    </div>

                    <div className="flex flex-col gap-y-2">
                        <div className="my-2">
                            <div className="text-md font-medium">Name</div>
                            <div className="font-thin text-sm">
                                {userData?.name || session.user?.name || "No Name Available"}
                            </div>
                        </div>
                        <div className="my-2">
                            <div className="text-md font-medium">Email</div>
                            <div className="font-thin text-sm">
                                {userData?.email || session.user?.email || "No Email Available"}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="text-md font-medium">Joined At</div>
                            <div className="font-thin text-sm">
                                {userData?.created_at
                                    ? `Joined at: ${format(new Date(userData.created_at), 'MMMM dd, yyyy')}`
                                    : "No Date Available"}
                            </div>
                        </div>
                    </div>
                </div>
                <AppLogo className="mt-4"/>
            </div>
        </div>
    );
}
