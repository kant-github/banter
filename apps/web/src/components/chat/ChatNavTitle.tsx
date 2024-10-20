"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { RedBtn } from "../buttons/RedBtn";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { toast } from "sonner";
import BigWhiteBtn from "../buttons/BigWhiteBtn";
import Image from "next/image";
import { useState } from "react";
import ExitRoomDialogBox from "../utility/ExitRoomDialogBox";

interface Props {
    groupTitle: string | null;
    groupImage: string | null;
    groupId: string | null;
}

export default function ChatNavTitle({ groupTitle, groupImage, groupId }: Props) {
    const [exitRoomDialogBox, setExitRoomDialogBox] = useState(false);
    const router = useRouter();
    const params = useParams();
    let user_id: string | null = null;

    const data = localStorage.getItem(params["id"] as string);
    if (data) {
        try {
            const parsedData = JSON.parse(data);
            user_id = parsedData.id;
        } catch (err) {
            console.error("Error parsing localStorage data:", err);
        }
    }



    return (
        <div className="flex items-center justify-between bg-[#f2f2f2] dark:bg-[#1c1c1c] h-[82px] dark:text-gray-300">
            <h1 className="flex flex-row items-center gap-x-4 font-bold text-2xl ml-8 py-6">
                {
                    groupImage ? <Image src={groupImage} width={38} height={38} alt="logo" className="rounded-full" /> : <span>{groupTitle![0]}</span>
                }
                <p className="text-xl">{groupTitle}</p>
            </h1>

            <div className="mr-4 flex items-center justify-center gap-x-6 w-[250px] group">
                <BigWhiteBtn onClick={() => router.push("/dashboard")}>
                    <IoIosArrowBack size={18} className="stroke-[2px] transition-transform transform group-hover:-translate-x-[1px]" />
                    <span>Dashboard</span>
                </BigWhiteBtn>
                <RedBtn onClick={() => setExitRoomDialogBox(true)}>Exit Room</RedBtn>
            </div>
            {
                exitRoomDialogBox && <ExitRoomDialogBox groupId={groupId!} user_id={user_id} setExitRoomDialogBox={setExitRoomDialogBox} exitRoomDialogBox={exitRoomDialogBox} />
            }

        </div>
    );
}
