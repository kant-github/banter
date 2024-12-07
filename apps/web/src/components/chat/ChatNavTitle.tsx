"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { RedBtn } from "../buttons/RedBtn";
import BigWhiteBtn from "../buttons/BigWhiteBtn";
import { useState } from "react";
import ExitRoomDialogBox from "../utility/ExitRoomDialogBox";
import { iconMappings } from "../ui/PhotoUploadIcon";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImage from "../ui/GroupImage";
import { Proza_Libre } from "next/font/google"
import { WhiteBtn } from "../buttons/WhiteBtn";

const font = Proza_Libre({
    subsets: ['latin'],
    weight: '700',
    display: 'swap',
});

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
                <GroupImage groupImage={groupImage!} groupTitle={groupTitle!} />
                <p className={`${font.className} text-xl font-black mt-1`}>{groupTitle}</p>
            </h1>

            <div className="mr-4 flex items-center justify-center gap-x-6 w-[240px] group">
                <WhiteBtn onClick={() => router.back()}>
                    <IoIosArrowBack size={18} className="stroke-[2px] transition-transform transform group-hover:-translate-x-[1px]" />
                    <span>Home</span>
                </WhiteBtn>
                <RedBtn onClick={() => setExitRoomDialogBox(true)}>Exit Room</RedBtn>
                {/* <BsThreeDotsVertical size={48} /> */}
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
