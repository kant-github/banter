import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import BigBlackButton from "../buttons/BigBlackButton";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { GroupChatType } from "types";
import { toast } from "sonner";
import { clearCache } from "actions/common";

interface Props {
    permissionDialogBox: boolean;
    setPermissionDialogBox: (value: boolean) => void;
    group: GroupChatType;
}

export default function ChatPermissionDialog({ permissionDialogBox, setPermissionDialogBox, group }: Props) {
    const [name, setName] = useState<string>("");
    const [passcode, setPasscode] = useState<string>("");
    const params = useParams();

    useEffect(() => {
        const data = localStorage.getItem(params["id"] as string);
        if (data) {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            if (jsonData?.data?.name && jsonData?.data?.group_id) {
                setPermissionDialogBox(false);
            }
        }
    }, [params, setPermissionDialogBox]);

    const joinRoomHandler = async () => {
        if (group.passcode !== passcode) {
            console.log("---> ",group.passcode);
            toast.error("Enter the correct passcode");
            return;
        }

        const localData = localStorage.getItem(params["id"] as string);
        if (!localData) {
            try {
                const user = await axios.post(`${CHAT_GROUP_USERS}`, {
                    name: name,
                    group_id: group.id,
                });
                clearCache("chat-group-users");
                localStorage.setItem(params["id"] as string, JSON.stringify(user.data));
                toast.success("Hurray");
                setPermissionDialogBox(false);
            } catch (err) {
                toast.error("Something went wrong, please try again!");
                console.error("Error creating user:", err);
            }
        } else {
            setPermissionDialogBox(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-[400px] relative">
                <div>
                    <p className="text-md font-bold mb-1">Join the Room</p>
                    <p className="text-xs font-light mb-4">Enter your name and passcode to continue</p>
                    <div>
                        <InputBox label="Your Name" input={name} setInput={setName} />
                    </div>
                    <div className="mt-4">
                        <InputBox type="password" label="Room Passcode" input={passcode} setInput={setPasscode} />
                    </div>
                    <div className="mt-4">
                        <BigBlackButton onClick={joinRoomHandler}>Join</BigBlackButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
