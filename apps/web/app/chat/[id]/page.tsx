import ChatBase from "@/components/chat/ChatBase";
import NavBar from "@/components/dashboard/DashNav";

export default function({ params }: { params: { id: string }}) {
    return (
        <div>
            <NavBar/>
            <ChatBase groupId={params.id}/>
        </div>
    )
}