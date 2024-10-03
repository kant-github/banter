"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { RedBtn } from "../buttons/RedBtn";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { toast } from "sonner";
import BigWhiteBtn from "../buttons/BigWhiteBtn";

interface Props {
    groupTitle: string;
}

export default function ChatNavTitle({ groupTitle }: Props) {
    const router = useRouter();
    const params = useParams();
    const data = localStorage.getItem(params["id"] as string);

    let user_id: string | null = null;
    if (data) {
        try {
            const parsedData = JSON.parse(data);
            user_id = parsedData.data.id;
        } catch (err) {
            console.error("Error parsing localStorage data:", err);
        }
    }

    async function exitRoomHandler() {
        if (!user_id) {
            console.error("No user_id found in localStorage.");
            return;
        }
        try {
            await axios.delete(`${CHAT_GROUP_USERS}?user_id=${user_id}`)
            localStorage.clear();
            router.push("/dashboard");
            toast.success("Exitted room successfully");
        } catch (err) {
            console.error("Error exiting the room:", err);
        }
    }

    return (
        <div className="flex items-center justify-between bg-[#f2f2f2] dark:bg-[#1c1c1c] h-[82px] dark:text-gray-300">
            <h1 className="font-bold text-2xl pl-12 py-6">
                {groupTitle}
            </h1>
            <div className="mr-4 flex items-center justify-center gap-x-6 w-[250px] group">
                <BigWhiteBtn onClick={() => router.push("/dashboard")}>
                        <IoIosArrowBack size={18} className="stroke-[2px] transition-transform transform group-hover:-translate-x-[1px]" /> 
                        <span>Dashboard</span>
                </BigWhiteBtn>
                <RedBtn onClick={exitRoomHandler}>Exit Room</RedBtn>
            </div>
        </div>
    );
}
