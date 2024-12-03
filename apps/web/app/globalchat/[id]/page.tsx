"use client";

import ChatNav from "@/components/chat/ChatNav";
import fetchChats from "fetch/fetchChats";
import { fetchChatGroupUsers, fetchGroup } from "fetch/fetchGroups";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageType } from "types";
import ChatSkeleton from "@/components/skeletons/ChatSkeleton";
import GlobalChatBase from "@/components/chat/globalchat/GlobalChatBase";
import { useSession } from "next-auth/react";

interface Props {
    params: {
        id: string;
    };
}

export default function ChatPage({ params }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState<Array<MessageType>>([]);
    const [chatGroupUsers, setChatGroupUsers] = useState<any[]>([]);
    const [group, setGroup] = useState<any>(null);
    const { data: session, status } = useSession();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "loading") return;

        if (!session?.user?.token) {
            return;
        }
        const fetchData = async () => {
            try {
                const groupData = await fetchGroup(session.user.token, params.id);
                if (!groupData) {
                    setError("Group not found");
                    return;
                }

                const [chatGroupUsers, chats] = await Promise.all([
                    fetchChatGroupUsers(params.id),
                    fetchChats(params.id),
                ]);

                setGroup(groupData);
                setChatGroupUsers(chatGroupUsers);
                setChats(chats);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load group or chats. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [status, session?.user?.token, params.id, router]);

    if (loading || status === "loading") {
        return <ChatSkeleton />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <ChatNav />
            <GlobalChatBase users={chatGroupUsers} group={group} olderChats={chats} />
        </div>
    );
}
