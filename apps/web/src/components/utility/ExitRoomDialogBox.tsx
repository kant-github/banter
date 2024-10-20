"use client";
import { RedBtn } from "../buttons/RedBtn";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import BigWhiteBtn from "../buttons/BigWhiteBtn";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { useRouter } from "next/navigation";

interface Props {
    groupId: string;
    user_id: string | null;
    exitRoomDialogBox: boolean;
    setExitRoomDialogBox: (value: boolean) => void;
}

export default function ({
    groupId,
    user_id,
    exitRoomDialogBox,
    setExitRoomDialogBox,

}: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function exitRoomHandler() {
        setLoading(true);
        if (!user_id) {
            console.error("No user_id found in localStorage.");
            return;
        }
        try {
            await axios.delete(`${CHAT_GROUP_USERS}?user_id=${user_id}`)
            localStorage.removeItem(groupId!)
            router.push("/dashboard");
            toast.success("Exitted room successfully");
        } catch (err) {
            console.error("Error exiting the room:", err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${!exitRoomDialogBox ? 'hidden' : ''}`}>
            <div className="bg-white dark:bg-[#262629] dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-lg relative">
                <div className="w-[400px]">
                    <p className="text-sm font-bold mb-4">
                        Danger Zone
                    </p>
                    <p className="text-xs font-light mb-4">
                        Are you sure you want to exit this room? Remember you have to re-enter the room passcode to get inside the room
                    </p>
                    <div className="flex items-center justify-end gap-4 pt-4 pr-2 w-full">
                        <BigWhiteBtn onClick={() => setExitRoomDialogBox(false)}>Cancel</BigWhiteBtn>
                        <RedBtn onClick={exitRoomHandler} disabled={loading}>
                            {loading ? "Deleting..." : "Delete"}
                        </RedBtn>
                    </div>
                </div>
            </div>
        </div>
    );
}
