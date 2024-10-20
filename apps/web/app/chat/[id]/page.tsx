"use client";
import ChatBase from "@/components/chat/ChatBase";
import ChatNav from "@/components/chat/ChatNav";
import ChatSkeleton from "@/components/skeletons/ChatSkeleton";
import GroupPermissionDialogBox from "@/components/utility/groupPermissionDialogBox";
import fetchChats from "fetch/fetchChats";
import { fetchChatGroupUsers, fetchGroup } from "fetch/fetchGroups";
import { useEffect, useState } from "react";
import { MessageType } from "types";

export default function ChatComponent({ params }: { params: { id: string } }) {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState<Array<MessageType> | []>([]);
    const [chatGroupUsers, setChatGroupUsers] = useState<any[]>([]);
    const [group, setGroup] = useState<any>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [permissionChecked, setPermissionChecked] = useState<boolean>(false);

    useEffect(() => {
        const checkPermission = () => {
            const storedData = localStorage.getItem(params.id);
            if (storedData) {
                setHasPermission(true);
            } else {
                setHasPermission(false);
            }
            setPermissionChecked(true);
        };
        checkPermission();
    }, [params.id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const groupData = await fetchGroup(params.id);

                if (!groupData) return;

                const chatGroupUsers = await fetchChatGroupUsers(params.id);
                const chats = await fetchChats(params.id);

                setGroup(groupData);
                setChatGroupUsers(chatGroupUsers);
                setChats(chats);
            } catch (err) {
                console.log("Error in fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hasPermission, permissionChecked, params.id]);
    
    if (!permissionChecked || loading) {
        return <ChatSkeleton />;
    }
    if (!hasPermission) {
        return (
            <GroupPermissionDialogBox
                group={group}
                setPermissionDialogBox={setHasPermission}
            />
        );
    }
    return (
        <div>
            <ChatNav />
            <ChatBase users={chatGroupUsers} group={group} groupId={params.id} olderChats={chats} />
        </div>
    );
}
