export async function fetchGroups(token: string | null) {
    try {
        const res = await fetch("http://localhost:7001/api/chat-group", {
            headers: {
                authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: 60 * 60,
                tags: ["dashboard"],
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const groups = await res.json();
        if(groups.data){
            return groups.data;
        } else{
            return [];
        }
    } catch (error) {
        console.error("Error fetching groups:", error);
        return [];
    }
}
