import { CHATS_URL } from "@/lib/apiAuthRoutes";

export default async function fetchChats(group_id: string) {
    try {
        if (!group_id) {
            return [];
        }
        const response = await fetch(`${CHATS_URL}/${group_id}`, {
            cache: "no-cache",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data")
        }
        const chats = await response.json();
        if (chats?.data) {
            return chats?.data;
        }
    } catch (err) {
        console.log("Error in fetching chats from from frontend");
    }
}