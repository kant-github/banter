import { GroupChatType, GroupChatUserType, MessageType, UserType } from "types";
import Chat from "../Chat";
import ChatSideBar from "../ChatSideBar";
import { useEffect, useState } from "react";
import GlobalChatNavTitle from "./GlobalChatNavTitle";
import { globalGroupId } from "@/components/dashboard/DashNav";

interface Props {
    groupId: string;
    group: GroupChatType;
    users: GroupChatUserType[];
    olderChats: MessageType[];
}

export default function ({ groupId, group, users, olderChats }: Props) {
    const [chatUser, setChatUser] = useState<UserType | null>(null);

    useEffect(() => {

        const fetchChatUserFromLocalStorage = () => {
            const data = localStorage.getItem(globalGroupId);
            if (data) {
                const pData = JSON.parse(data);
                setChatUser(pData.user);
            }
        };

        fetchChatUserFromLocalStorage();

    }, [group.id]);


    return (
        <div>
            <div className="flex flex-row w-screen bg-[#f2f2f2] dark:bg-[#1c1c1c]">
                <ChatSideBar users={users} />
                <div className="w-full mr-6">
                    <GlobalChatNavTitle groupImage={group.groupImage} groupTitle={group.title} />
                    <Chat users={users} chatUser={chatUser} olderChats={olderChats} group={group} />
                </div>
            </div>
        </div>
    )
}