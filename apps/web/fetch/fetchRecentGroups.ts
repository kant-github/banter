import { RECENT_CHAT_GROUP } from "@/lib/apiAuthRoutes";

export async function fetchRecentGroup(
  token: string | null,
  fetchAll: boolean
) {

  if (!token) {
    console.error("No token provided.");
    return null;
  }
  const URL = `${RECENT_CHAT_GROUP}?fetchAll=${fetchAll}`;
  try {
    const response = await fetch(`${URL}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("An error occurred while fetching recent groups:", err);
    return null;
  }
}
