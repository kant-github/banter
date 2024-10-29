import { RECENT_CHAT_GROUP } from "@/lib/apiAuthRoutes";

export async function fetchRecentGroup(token: string | null) {
    console.log("Fetching recent chat groups...");

    if (!token) {
        console.error("No token provided.");
        return null; // Early exit if there's no token
    }

    try {
        const response = await fetch(`${RECENT_CHAT_GROUP}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        // Check if the response is ok (status in the range 200-299)
        // if (!response.ok) {
        //     const errorData = await response.json(); // Get error details
        //     console.error("Error fetching recent groups:", errorData);
        //     throw new Error(`Error: ${errorData.message || "Failed to fetch"}`);
        // }

        // Parse and return the data
        const data = await response.json();
        return data.data;

    } catch (err) {
        console.error("An error occurred while fetching recent groups:", err);
        return null; // Return null or handle the error as needed
    }
}
