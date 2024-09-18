"use client"; // Add this directive at the top of the file
import { useEffect, useState } from "react";
import SearchInput from "../utility/SearchInput";
import ProfileDropDown from "./ProfileDropDown";
import Image from "next/image";
import axios from "axios";
import { CHAT_GROUP } from "@/lib/apiAuthRoutes";
import { GroupChatType } from "types";

export default function NavBar() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<GroupChatType[] | []>([]);
    async function getSearchInputChatGroups() {
        try {
            const response = await axios.get(`${CHAT_GROUP}-by-search?group_id=${searchInput}`);
            console.log("Search results:", response.data.data);
            setSearchResults(response.data.data)
        } catch (err) {
            console.error("Error in searching chat groups:", err);
        }
    }

    useEffect(() => {
       const debounedTimeout = setTimeout(() => {
        getSearchInputChatGroups();
        }, 600);

        () => {
            clearTimeout(debounedTimeout);
        }
    }, [searchInput]);

    return (
        <div className="flex bg-white flex-row justify-between items-center w-full px-8 h-16">
            <div className="flex flex-row gap-2 items-center cursor-pointer">
                <Image src="/images/icon_192x192.png" width={32} height={32} alt="logo" />
                <div className="text-xl md:text-md font-extrabold">ChatApp</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-x-8">
                <div className="w-[300px]">
                    <SearchInput input={searchInput} setInput={setSearchInput}/>
                </div>
                <ProfileDropDown />
            </div>
        </div>
    );
}
