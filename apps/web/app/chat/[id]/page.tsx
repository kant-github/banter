import ChatBase from "@/components/chat/ChatBase";
import ChatNav from "@/components/chat/ChatNav";
import fetchChats from "fetch/fetchChats";
import { fetchChatGroupUsers, fetchGroup } from "fetch/fetchGroups";
import { notFound } from "next/navigation";
import { MessageType } from "types";

export default async function({ params }: { params: { id: string }}) {
    const group = await fetchGroup(params.id);
    if(!group) {
        return notFound();
    }
    const chatGroupUsers = await fetchChatGroupUsers(params.id);
    const chats: Array<MessageType> | [] = await fetchChats(params.id);
    
    return (
        <div>
            <ChatNav/>
            <ChatBase users={chatGroupUsers} group={group} groupId={params.id} olderChats={chats}/>
        </div>
    )
}