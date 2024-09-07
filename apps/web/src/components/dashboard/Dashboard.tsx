import Image from "next/image";
import ChatCards from "../base/ChatCards";
import CreateChatCard from "./CreateChatCard";

export default function () {


    return (
        <div className="w-full h-screen bg-[#f2f2f2]">
            <div className="pl-12 w-full flex flex-row justify-center gap-x-60 items-center">
                <CreateChatCard />
                <div className="mr-36 pt-4">
                    <Image src="/images/dashboard-conversation.png" width={400} height={400} className="" alt="dashboard-conversation" />
                </div>
            </div>
            <div>
                <ChatCards />
            </div>
        </div>
    )
}