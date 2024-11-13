import { RECENT_CHAT_GROUP } from "@/lib/apiAuthRoutes";

export async function fetchRecentGroup(token: string | null) {
    console.log("Fetching recent chat groups...");

    if (!token) {
        console.error("No token provided.");
        return null;
    }

    try {
        const response = await fetch(`${RECENT_CHAT_GROUP}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: 60*60,
                tags: ["recentgroups"]
            }
        });
        const data = await response.json();
        return data.data;

    } catch (err) {
        console.error("An error occurred while fetching recent groups:", err);
        return null; // Return null or handle the error as needed
    }
}
