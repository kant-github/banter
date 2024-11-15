import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CrossButton from "./CrossButton";
import { fetchUser, updateUser } from "fetch/fetchUser";
import { FaEdit } from "react-icons/fa";
import { CustomSession } from "app/api/auth/[...nextauth]/options";
import { format } from "date-fns";
import { UserType } from "types";
import AppLogo from "../heading/AppLogo";
import { MdEditNote } from "react-icons/md";
import BlackBtn from "../buttons/BlackBtn";
import Spinner from "../loaders/Spinner";

interface Props {
    session: CustomSession;
    setAccountInfoDropDown: Dispatch<SetStateAction<boolean>>;
}

export default function AccountInfoModal({ session, setAccountInfoDropDown }: Props) {
    const [userData, setUserData] = useState<UserType | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserType | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function get() {
        if (session?.user?.id && session?.user?.token) {
            setLoading(true);
            const data = await fetchUser(session.user.id, session.user.token);
            setLoading(false);
            setUserData(data);
            setFormData(data); // Initialize formData with fetched data
        }
    }

    useEffect(() => {
        get();
    }, [session]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value } as UserType);
    };

    const saveChanges = async () => {
        if (!formData) return;

        // Basic validation example
        if (!formData.email || !formData.email.includes("@")) {
            setError("Invalid email format");
            return;
        }

        try {
            // Update user data on the server
            await updateUser(session?.user?.id, formData, session?.user?.token);
            setUserData(formData);
            setEditMode(false);
            setError(null); // Clear any existing errors
        } catch (error) {
            setError("Failed to save changes. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-[#ededed] dark:bg-zinc-900 dark:text-gray-200 p-6 rounded-lg shadow-lg w-6/12 relative">
                <div className="flex flex-row justify-between relative">
                    <p className="text-lg font-semibold">Account Information</p>
                    <div className="flex gap-x-4 items-center">
                        <BlackBtn
                            className="flex items-center justify-center gap-x-2 mr-12"
                            onClick={() => setEditMode(!editMode)}
                        >
                            {/* {editMode ? "Cancel" : <MdEditNote size={18} />} */}
                            {editMode ? "Cancel" : (<span className="flex items-center gap-x-2"><MdEditNote size={18} />Edit Profile</span>)}
                        </BlackBtn>
                        {editMode && (
                            <BlackBtn
                                className="mr-12 gap-x-2"
                                onClick={saveChanges}
                            >
                                Save
                            </BlackBtn>
                        )}
                    </div>
                    <CrossButton className="absolute top-2 right-3" setOpen={setAccountInfoDropDown} />
                </div>
                <p className="text-sm font-light">See all your account details below</p>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                {
                    loading ? (<div className="dark:bg-zinc-800 bg-zinc-300 rounded-[4px] mt-4 h-[320px] flex items-center justify-center">
                        <Spinner />
                    </div>) : (
                        <div className="dark:bg-zinc-800 bg-zinc-300 rounded-[4px] p-2 pl-8 mt-4">
                            <div className="mt-6 flex w-full">
                                <Image
                                    className="rounded-full mr-4"
                                    src={userData?.image || "/default-profile.png"}
                                    width={80}
                                    height={80}
                                    alt="User Profile Image"
                                />
                                <div className="w-4/5 bg-zinc-700 font-thin text-[12px] px-4 py-2 relative">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi blanditiis error exercitationem reiciendis facere provident ab minus dolor cumque vero!
                                    <FaEdit className="absolute bottom-2 right-2 cursor-pointer" size={16} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2 my-3 pl-2">
                                <div className="my-1">
                                    <div className="text-md font-medium">Name</div>
                                    {editMode ? (
                                        <input
                                            name="name"
                                            value={formData?.name || ""}
                                            onChange={handleInputChange}
                                            className="font-thin text-sm bg-zinc-800 outline-none w-full"
                                            aria-label="Name"
                                        />
                                    ) : (
                                        <div className="font-thin text-sm dark:bg-zinc-800">
                                            {userData?.name || session.user?.name || "No Name Available"}
                                        </div>
                                    )}
                                </div>
                                <div className="my-1">
                                    <div className="text-md font-medium">Email</div>
                                    {editMode ? (
                                        <input
                                            name="email"
                                            value={formData?.email || ""}
                                            onChange={handleInputChange}
                                            className="font-thin text-sm bg-zinc-800 outline-none w-full"
                                            aria-label="Email"
                                        />
                                    ) : (
                                        <div className="font-thin text-sm">
                                            {userData?.email || session.user?.email || "No Email Available"}
                                        </div>
                                    )}
                                </div>
                                <div className="my-1">
                                    <div className="text-md font-medium">Joined At</div>
                                    <div className="font-thin text-sm">
                                        {userData?.created_at
                                            ? `Joined at: ${format(new Date(userData.created_at), "MMMM dd, yyyy")}`
                                            : "No Date Available"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <AppLogo className="mt-4" />
            </div>
        </div>
    );
}
