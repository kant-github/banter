"use client";
import { getSocket } from "@/lib/socket.config";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";
import ChatSideBar from "./ChatSideBar";
import ChatNavTitle from "./ChatNavTitle";
import Chat from "./Chat";
import GroupPermissionDialogBox from "../utility/groupPermissionDialogBox";
import { GroupChatType, GroupChatUserType } from "types";

interface props {
    groupId: string;
    group: GroupChatType
    users: Array<GroupChatUserType> | []
}

export default function ChatBase({ groupId, group, users }: props) {
    const [permissionDialogBox, setPermissionDialogBox] = useState(true);

    return (
        <>
            {
                permissionDialogBox && <GroupPermissionDialogBox group={group} permissionDialogBox={permissionDialogBox} setPermissionDialogBox={setPermissionDialogBox} />
            }
            <div className="flex flex-row w-screen bg-[#f2f2f2]">
                <ChatSideBar users={users} />

                <div className="w-full mr-6">
                    <ChatNavTitle groupTitle={group.title}/>

                    <Chat />
                </div>
            </div>
        </>
    );
}
