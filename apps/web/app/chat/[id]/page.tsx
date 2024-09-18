import ChatBase from "@/components/chat/ChatBase";
import ChatNav from "@/components/chat/ChatNav";
import NavBar from "@/components/dashboard/DashNav";
import { fetchChatGroupUsers, fetchGroup } from "fetch/fetchGroups";
import { notFound } from "next/navigation";

export default async function({ params }: { params: { id: string }}) {
    const group = await fetchGroup(params.id);
    if(!group) {
        return notFound();
    }
    const chatGroupUsers = await fetchChatGroupUsers(params.id);
    
    return (
        <div>
            <ChatNav/>
            <ChatBase users={chatGroupUsers} group={group} groupId={params.id}/>
        </div>
    )
}