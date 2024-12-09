"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { toast } from "sonner";
import Image from "next/image";
import BigWhiteBtn from "@/components/buttons/BigWhiteBtn";
import { WhiteBtn } from "@/components/buttons/WhiteBtn";
import { GiJigsawPiece } from "react-icons/gi";
import { MdOutlineOnlinePrediction } from "react-icons/md";

interface Props {
    groupTitle: string;
    groupImage: string;
    onlineUsersCount: number
}

export default function ({ groupTitle, groupImage, onlineUsersCount }: Props) {
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
                <GiJigsawPiece
                    size={34}
                    className="transition-transform transform group-hover:-translate-x-[2px] text-[#f2a633] dark:text-[#f2a633]"
                />
                <p className="text-xl">{groupTitle}</p>
                <span className="text-[11px] font-medium mt-1 flex items-center gap-x-1 ">
                    <MdOutlineOnlinePrediction size={16} className="text-green-500" />
                    {onlineUsersCount + " online.."}
                </span>
            </h1>

            <div className="mr-4 flex items-center justify-center gap-x-6 group">
                <WhiteBtn onClick={() => router.push("/dashboard")}>
                    <IoIosArrowBack size={18} className="stroke-[2px] transition-transform transform group-hover:-translate-x-[1px]" />
                    <span>Home</span>
                </WhiteBtn>
            </div>
        </div>
    );
}
