import { USER_URL } from "@/lib/apiAuthRoutes";
import axios from "axios";

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

export async function updateUser(formData: any, token: string | null) {
  if (!token) return null;
  
  try {
    const { data } = await axios.put(`${USER_URL}`, formData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    console.log("Data is:", data);
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}
