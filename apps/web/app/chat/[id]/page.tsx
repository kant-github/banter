"use client"
import ChatBase from "@/components/chat/ChatBase";
import ChatNav from "@/components/chat/ChatNav";
import ChatSkeleton from "@/components/skeletons/ChatSkeleton";
import fetchChats from "fetch/fetchChats";
import { fetchChatGroupUsers, fetchGroup } from "fetch/fetchGroups";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageType } from "types";

export default function ({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState<Array<MessageType> | []>([]);
    const [chatGroupUsers, setChatGroupUsers] = useState<any[]>([]);
    const [group, setGroup] = useState<any>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupData = await fetchGroup(params.id);
                if (!groupData) {
                    return;
                }
                const chatGroupUsers = await fetchChatGroupUsers(params.id);
                const chats: Array<MessageType> | [] = await fetchChats(params.id);
                setGroup(groupData);
                setChatGroupUsers(chatGroupUsers);
                setChats(chats);
            } catch (err) {
                console.log("Error in fetching data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [router, params.id])

    useEffect(() => {
        console.log(group);
    }, [])

    if (loading) {
        return <ChatSkeleton />
    }

    return (
        <div className="fixed">
            <ChatNav />
            <ChatBase users={chatGroupUsers} group={group} groupId={params.id} olderChats={chats} />
        </div>
    )
}