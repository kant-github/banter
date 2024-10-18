// globalRoomHandler.ts
import axios from "axios";
import { CHAT_GROUP_USERS, FRONTEND_BASE_URL } from "@/lib/apiAuthRoutes";
import { toast } from "sonner";
import { clearCache } from "actions/common";
import {  useRouter } from 'next/navigation'; 


export async function globalRoomHandler(globalGroupId: string, user_id: string, router: ReturnType<typeof useRouter>) {
    if (!globalGroupId || !user_id) {
        toast.error("Invalid group or user information");
        return;
    }

    try {
        const response = await axios.post(`${CHAT_GROUP_USERS}`, {
            user_id: user_id,
            group_id: globalGroupId,
        });

        if (response.data.message === "User already in the group" || response.data.message === "User added to group successfully") {
            clearCache("chat-group-users");
            localStorage.setItem(globalGroupId, JSON.stringify(response.data.data));
            router.push(`${FRONTEND_BASE_URL}/globalchat/${globalGroupId}`);
            toast.success("You have joined the group successfully!");
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.error("Error joining the group:", error);
        toast.error("Something went wrong, please try again!");
    }
}
