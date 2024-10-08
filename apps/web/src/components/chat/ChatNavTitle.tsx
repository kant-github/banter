"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { RedBtn } from "../buttons/RedBtn";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { toast } from "sonner";
import BigWhiteBtn from "../buttons/BigWhiteBtn";
import Image from "next/image";

interface Props {
    groupTitle: string;
    groupImage: string;
}

export default function ChatNavTitle({ groupTitle, groupImage }: Props) {
    const router = useRouter();
    const params = useParams();
    const data = localStorage.getItem(params["id"] as string);

    let user_id: string | null = null;
    if (data) {
        try {
            const parsedData = JSON.parse(data);
            user_id = parsedData.id;
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
            <h1 className="flex flex-row items-center gap-x-4 font-bold text-2xl ml-8 py-6">
                {
                    groupImage ? <Image src={groupImage} width={30} height={30} alt="logo" className="rounded-full" /> : <span>{groupTitle[0]}</span>
                }
                <p className="text-xl mt-1">{groupTitle}</p>
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
