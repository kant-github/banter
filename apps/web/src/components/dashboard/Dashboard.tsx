import Image from "next/image";
import ChatCards from "../base/ChatCards";
import CreateChatCard from "./CreateChatCard";
import { getServerSession } from "next-auth";
import { authOption } from "app/api/auth/[...nextauth]/options";
import { fetchGroups } from "fetch/fetchGroups";

export default async function () {
    const session = await getServerSession(authOption);
    const groups = await fetchGroups(session?.user?.token || null);
    
    return (
        <div className="w-full h-screen bg-[#f2f2f2]">
            <div className="pl-12 w-full flex flex-row justify-center gap-x-40 items-center">
                <CreateChatCard user={session?.user} />
                <div className="mr-36 pt-4">
                    <Image src="/images/dashboard-conversation.png" width={400} height={400} className="" alt="dashboard-conversation" />
                </div>
            </div>
            <div>
                <ChatCards groups={groups.splice(0, 6)} />
            </div>
        </div>
    );
}