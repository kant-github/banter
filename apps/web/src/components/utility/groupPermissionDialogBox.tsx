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
    group: GroupChatType;
    setPermissionDialogBox: (value: boolean) => void;
}

export default function ({ setPermissionDialogBox, group }: Props) {
    const [passcode, setPasscode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();
    const { data: session } = useSession();
    useEffect(() => {
        console.log(passcode);
    }, [passcode]);


    useEffect(() => {
        const data = localStorage.getItem(params["id"] as string);
        if (data) {
            const jsonData = JSON.parse(data);
            if (jsonData?.id && jsonData?.group_id) {
                setPermissionDialogBox(true);
            }
        }
    }, [params, setPermissionDialogBox]);


    const joinRoomHandler = async () => {
        setLoading(true);
        console.log("checking password");
        
        if (group.passcode !== passcode) {
            toast.error("Incorrect passcode");
            setLoading(false);
            return;
        }
        console.log("password checked");

        try {
            const response = await axios.post(`${CHAT_GROUP_USERS}`, {
                user_id: session?.user?.id,
                group_id: group.id,
            });
            console.log("prisnting response");
            console.log(response);

            if (response.data.message === "User is already in the group" || response.data.message === "User added to group successfully") {
                clearCache("chat-group-users");
                clearCache("recentgroups");
                console.log("cached clear");
                localStorage.setItem(params["id"] as string, JSON.stringify(response.data.data));
                toast.success("Successfully joined the group!");
                setPermissionDialogBox(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error joining group:", error);
            toast.error("Something went wrong. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 dark:bg-black bg-zinc-300 bg-opacity-200 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#262629] dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-xl w-[400px] relative">
                <p className="text-md font-bold mb-1">Enter Room's Passcode</p>
                <div className="mt-2">
                    <InputBox type="password" label="Passcode" input={passcode} setInput={setPasscode} />
                </div>
                <div className="mt-4">
                    <BigBlackButton disabled={loading} onClick={joinRoomHandler}>
                        {loading ? "Joining..." : "Join"}
                    </BigBlackButton>
                </div>
            </div>
        </div>
    );
}
