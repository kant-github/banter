"use client";
import { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatNavTitle from "./ChatNavTitle";
import Chat from "./Chat";
import GroupPermissionDialogBox from "../utility/groupPermissionDialogBox";
import { GroupChatType, GroupChatUserType, MessageType } from "types";

interface props {
    groupId: string;
    group: GroupChatType;
    users: Array<GroupChatUserType> | [];
    olderChats: Array<MessageType> | [];
}

type UserType = {
    id: number;
    name: string;
    image: string;
    email: string;
    provider: string;
    oauth_id: string;
    created_at: string;
}

export default function ChatBase({ groupId, group, users, olderChats }: props) {
    const [permissionDialogBox, setPermissionDialogBox] = useState(true);
    const [chatUser, setChatUser] = useState<UserType>();
    useEffect(() => {
        const fetchChatUserFromLocalStorage = () => {
            const data = localStorage.getItem(group.id);
            if (data) {
                const pData = JSON.parse(data);
                console.log("parsed data is : ", pData.user);
                setChatUser(pData.user);
            }
        };
        fetchChatUserFromLocalStorage();
        window.addEventListener('chatUserUpdated', fetchChatUserFromLocalStorage);
        return () => {
            window.removeEventListener('chatUserUpdated', fetchChatUserFromLocalStorage);
        };
    }, [groupId]);

    useEffect(() => {
        if (chatUser) {
            console.log("chat suer is : ", chatUser?.name);
        }
    }, [])

    return (
        <>
            {
                permissionDialogBox && <GroupPermissionDialogBox group={group} permissionDialogBox={permissionDialogBox} setPermissionDialogBox={setPermissionDialogBox} />
            }
            <div className="flex flex-row w-screen bg-[#f2f2f2] dark:bg-[#1c1c1c]">
                <ChatSideBar users={users} />
                <div className="w-full mr-6">
                    <ChatNavTitle groupTitle={group.title} />
                    <Chat chatUser={chatUser} olderChats={olderChats} group={group} />
                </div>
            </div>
        </>
    );
}