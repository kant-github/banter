"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { RedBtn } from "../buttons/RedBtn";
import BigWhiteBtn from "../buttons/BigWhiteBtn";
import { useState } from "react";
import ExitRoomDialogBox from "../utility/ExitRoomDialogBox";
import { iconMappings } from "../ui/PhotoUploadIcon";

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

    for (const key in iconMappings) {
        if (iconMappings.hasOwnProperty(key)) {
            console.log(`${key}: ${iconMappings[key]}`);
        }
    }

    const data = localStorage.getItem(params["id"] as string);
    if (data) {
        try {
            const parsedData = JSON.parse(data);
            user_id = parsedData.id;
        } catch (err) {
            console.error("Error parsing localStorage data:", err);
        }
    }

    const icon = groupImage && iconMappings[groupImage as keyof typeof iconMappings];

    return (
        <div className="flex items-center justify-between bg-[#f2f2f2] dark:bg-[#1c1c1c] h-[82px] dark:text-gray-300">
            <h1 className="flex flex-row items-center gap-x-4 font-bold text-2xl ml-8 py-6">
                {icon ? (
                    <span className="rounded-full text-3xl text-green-600">{icon}</span>
                ) : (
                    <span className="bg-blue-500 px-3.5 rounded-full">
                        {groupTitle ? groupTitle[0] : "?"}
                    </span>
                )}
                <p className="text-xl font-black mt-1">{groupTitle}</p>
            </h1>

            <div className="mr-4 flex items-center justify-center gap-x-6 w-[250px] group">
                <BigWhiteBtn onClick={() => router.push("/dashboard")}>
                    <IoIosArrowBack size={18} className="stroke-[2px] transition-transform transform group-hover:-translate-x-[1px]" />
                    <span>Dashboard</span>
                </BigWhiteBtn>
                <RedBtn onClick={() => setExitRoomDialogBox(true)}>Exit Room</RedBtn>
            </div>
            {
                exitRoomDialogBox && (
                    <ExitRoomDialogBox
                        groupId={groupId!}
                        user_id={user_id}
                        setExitRoomDialogBox={setExitRoomDialogBox}
                        exitRoomDialogBox={exitRoomDialogBox}
                    />
                )
            }
        </div>
    );
}
