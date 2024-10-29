import { USER_URL } from "@/lib/apiAuthRoutes";

export async function fetchUser(
  user_id: string | null | undefined,
  token: string | null | undefined
) {
  if (!user_id) {
    console.error("User ID is required");
    return null;
  }

  if (!token) {
    console.error("Token is required");
    return null;
  }

  try {
    const response = await fetch(`${USER_URL}/${user_id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user data:", response.statusText);
      return null;
    }

    const pData = await response.json();

    if (!pData) {
      console.error("No data received");
      return null;
    }
    return pData.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
