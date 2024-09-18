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

export default function ChatBase({ groupId, group, users, olderChats }: props) {
    const [permissionDialogBox, setPermissionDialogBox] = useState(true);
    const [chatUser, setChatUser] = useState<GroupChatUserType>();
    useEffect(() => {
        const data = localStorage.getItem(group.id);
        if (data) {
            const pData = JSON.parse(data);
            setChatUser(pData.data);
        }
    }, [group.id]);
    return (
        <>
            {
                permissionDialogBox && <GroupPermissionDialogBox group={group} permissionDialogBox={permissionDialogBox} setPermissionDialogBox={setPermissionDialogBox} />
            }
            <div className="flex flex-row w-screen bg-[#f2f2f2]">
                <ChatSideBar users={users} />
                <div className="w-full mr-6">
                    <ChatNavTitle groupTitle={group.title} />
                    <Chat chatUser={chatUser} olderChats={olderChats} group={group}/>
                </div>
            </div>
        </>
    );
}
