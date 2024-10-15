"use client";
import { useEffect, useState } from "react";
import SearchInput from "../utility/SearchInput";
import ProfileDropDown from "./ProfileDropDown";
import axios from "axios";
import { CHAT_GROUP, CHAT_GROUP_USERS, FRONTEND_BASE_URL } from "@/lib/apiAuthRoutes";
import { GroupChatType } from "types";
import SearchResultDialogBox from "../utility/SearchResultDialogBox";
import AppLogo from "../heading/AppLogo";
import DarkMode from "../base/DarkMode";
import { useSession } from "next-auth/react";
import { Cedarville_Cursive } from "next/font/google"
import { WhiteBtn } from "../buttons/WhiteBtn";
import Version from "../buttons/Version";
import { useRouter } from "next/navigation";
import { clearCache } from "actions/common";
import { toast } from "sonner";

const font = Cedarville_Cursive({ weight: '400', subsets: ['latin'] })
interface props {
    groups: any;
}

export const globalGroupId: string = "bd1a0a9f-dd78-4f18-b13b-d706df0ea3c3";

export default function ({ groups }: props) {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<GroupChatType[] | []>([]);
    const [searchResultDialogBox, setSearchResultDialogBox] = useState<boolean>(false);
    const router = useRouter();
    const { data: session } = useSession();

    async function getSearchInputChatGroups() {
        try {
            const response = await axios.get(`${CHAT_GROUP}-by-search?group_id=${searchInput}`);
            setSearchResults(response.data.data);
        } catch (err) {
            console.error("Error in searching chat groups:", err);
        }
    }

    async function globalRoomHandler() {

        try {
            const response = await axios.post(`${CHAT_GROUP_USERS}`, {
                user_id: session?.user?.id,
                group_id: globalGroupId,
            });

            if (response.data.message === "User already in the group" || response.data.message === "User added to group successfully") {
                clearCache("chat-group-users");
                localStorage.setItem(globalGroupId as string, JSON.stringify(response.data.data));
                router.push(`${FRONTEND_BASE_URL}/globalchat/${globalGroupId}`)
                toast.success("You have joined the group successfully!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error joining the group:", error);
            toast.error("Something went wrong, please try again!");
        }
    }

    useEffect(() => {
        const debouncedTimeout = setTimeout(() => {
            if (searchInput) {
                getSearchInputChatGroups();
            }
        }, 500);

        return () => {
            clearTimeout(debouncedTimeout);
        };
    }, [searchInput]);

    return (
        <div className="flex bg-white dark:bg-[#171717] flex-row justify-between items-center w-full px-8 h-16 border-b dark:border-zinc-700 dark:shadow-[40px]">
            <div className="flex items-center gap-x-2">
                <AppLogo />
                <Version />
            </div>
            <div className="flex flex-row justify-center items-center gap-x-4">
                <span className={`text-center dark:text-gray-200 text-[17px] ${font.className}`}>Hey {session?.user.name?.split(" ")[0]}</span>
                <WhiteBtn onClick={globalRoomHandler}>Global room</WhiteBtn>
                <DarkMode />
                <div className="w-[340px]">
                    <SearchInput setSearchResultDialogBox={setSearchResultDialogBox} input={searchInput} setInput={setSearchInput} />
                    {searchResultDialogBox && (
                        <SearchResultDialogBox
                            searchResultDialogBox={searchResultDialogBox}
                            setSearchResultDialogBox={setSearchResultDialogBox}
                            searchResults={searchResults}
                        />
                    )}
                </div>
                <ProfileDropDown groups={groups} />
            </div>
        </div>
    );
}