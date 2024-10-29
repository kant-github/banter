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
import { globalRoomHandler } from "@/lib/globalRoomHandler";

const font = Cedarville_Cursive({ weight: '400', subsets: ['latin'] });

interface Props {
    groups: any;
}

export const globalGroupId: string = "0564c5cf-dc7b-4d9d-83e2-5b9b8a492c0c";
export default function Header({ groups }: Props) {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<GroupChatType[] | []>([]);
    const [searchResultDialogBox, setSearchResultDialogBox] = useState<boolean>(false);
    const { data: session } = useSession();
    const router = useRouter(); // Move useRouter inside the component

    async function getSearchInputChatGroups() {
        try {
            const response = await axios.get(`${CHAT_GROUP}-by-search?group_id=${searchInput}`);
            setSearchResults(response.data.data);
        } catch (err) {
            console.error("Error in searching chat groups:", err);
        }
    }

    async function globalRoomButtonHandler() {
        if (!session?.user.id) {
            toast.error("User not authenticated");
            return;
        }
        await globalRoomHandler(globalGroupId, session.user.id, router);
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
        <div className="flex bg-white dark:bg-[#171717] flex-row justify-between items-center w-full px-8 py-4 border-b dark:border-zinc-700 dark:shadow-[40px]">
            <div className="flex items-center gap-x-2">
                <AppLogo />
                <Version />
            </div>
            <div className="flex flex-row justify-center items-center gap-x-4">
                <span className={`mr-4 text-center dark:text-gray-200 text-[17px] ${font.className}`}>Hey {session?.user.name?.split(" ")[0]}</span>
                <WhiteBtn onClick={globalRoomButtonHandler}>Global room</WhiteBtn>
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