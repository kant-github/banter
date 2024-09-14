"use client";
import { getSocket } from "@/lib/socket.config";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";
import ChatSideBar from "./ChatSideBar";
import ChatNavTitle from "./ChatNavTitle";
import Chat from "./Chat";

export default function ChatBase({ groupId }: { groupId: string }) {
    const [permissionDialogBox, setPermissionDialogBox] = useState(false);

    return (
        <div className="flex flex-row w-screen bg-[#f2f2f2]">
            <ChatSideBar />

            <div className="w-full mr-6">
                <ChatNavTitle />
                <Chat/>
            </div>
        </div>
    );
}
