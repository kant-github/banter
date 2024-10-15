import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import BigBlackButton from "../buttons/BigBlackButton";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { GroupChatType } from "types";
import { toast } from "sonner";
import { clearCache } from "actions/common";
import { useSession } from "next-auth/react";

interface Props {
    permissionDialogBox: boolean;
    setPermissionDialogBox: (value: boolean) => void;
    group: GroupChatType;
}

export default function ChatPermissionDialog({ setPermissionDialogBox, group }: Props) {
    const [passcode, setPasscode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();
    const { data: session } = useSession();

    useEffect(() => {
        const data = localStorage.getItem(params["id"] as string);
        if (data) {
            const jsonData = JSON.parse(data);
            if (jsonData?.id && jsonData?.group_id) {
                setPermissionDialogBox(false);
            }
        }
    }, [params, setPermissionDialogBox]);

    const joinRoomHandler = async () => {
        setLoading(true);
        if (group.passcode !== passcode) {
            toast.error("Enter the correct passcode");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${CHAT_GROUP_USERS}`, {
                user_id: session?.user?.id,
                group_id: group.id,
            });

            if (response.data.message === "User already in the group" || response.data.message === "User added to group successfully") {
                clearCache("chat-group-users");
                localStorage.setItem(params["id"] as string, JSON.stringify(response.data.data));
                toast.success("You have joined the group successfully!");
                setLoading(false);
                setPermissionDialogBox(false);
            } else {
                toast.error(response.data.message);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error joining the group:", error);
            toast.error("Something went wrong, please try again!");
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-200 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#262629] dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-xl w-[400px] relative">
                <div>
                    <p className="text-md font-bold mb-1">Joining Credentials</p>
                    <div className="mt-4">
                        <InputBox type="password" label="Room's Passcode" input={passcode} setInput={setPasscode} />
                    </div>
                    <div className="mt-4">
                        <BigBlackButton disabled={loading} onClick={joinRoomHandler}>{loading ? "Joining" : "Join"}</BigBlackButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
