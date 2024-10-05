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

export default function ChatPermissionDialog({ permissionDialogBox, setPermissionDialogBox, group }: Props) {
    const [passcode, setPasscode] = useState<string>("");
    const params = useParams();
    const { data: session } = useSession();
    console.log("session is : ", session?.user?.id);

    useEffect(() => {
        const data = localStorage.getItem(params["id"] as string);
        if (data) {
            const jsonData = JSON.parse(data);
            console.log("local storage data is : ", jsonData);
            if (jsonData?.id && jsonData?.group_id) {
                console.log("reached");
                setPermissionDialogBox(false);
            }
        }
    }, [params, setPermissionDialogBox]);

    const joinRoomHandler = async () => {
        if (group.passcode !== passcode) {
            toast.error("Enter the correct passcode");
            return;
        }

        try {
            const response = await axios.post(`${CHAT_GROUP_USERS}`, {
                user_id: session?.user?.id,
                group_id: group.id,
            });
            console.log("response from backend is : ", response.data);
            if (response.data.message === "User added to group successfully") {
                localStorage.setItem(params["id"] as string, JSON.stringify(response.data.data));
                clearCache("chat-group-users");
                toast.success("You have joined the group successfully!");
                setPermissionDialogBox(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error joining the group:", error);
            toast.error("Something went wrong, please try again!");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#262629] dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-xl w-[400px] relative">
                <div>
                    <p className="text-md font-bold mb-1">Joining Credentials</p>
                    <div className="mt-4">
                        <InputBox type="password" label="Room's Passcode" input={passcode} setInput={setPasscode} />
                    </div>
                    <div className="mt-4">
                        <BigBlackButton onClick={joinRoomHandler}>Join</BigBlackButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
