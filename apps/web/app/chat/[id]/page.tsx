"use client";
import ChatBase from "@/components/chat/ChatBase";
import ChatNav from "@/components/chat/ChatNav";
import ChatSkeleton from "@/components/skeletons/ChatSkeleton";
import GroupPermissionDialogBox from "@/components/utility/groupPermissionDialogBox";
import fetchChats from "fetch/fetchChats";
import { fetchChatGroupUsers, fetchGroup } from "fetch/fetchGroups";
import { useEffect, useState } from "react";
import { MessageType } from "types";
import { useSession } from "next-auth/react";

export default function ChatComponent({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<MessageType[]>([]);
  const [chatGroupUsers, setChatGroupUsers] = useState<any[]>([]);
  const [group, setGroup] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false); // Initially false
  const [permissionChecked, setPermissionChecked] = useState<boolean>(false); // New
  const { data: session, status } = useSession();

  // Check localStorage for permission
  useEffect(() => {
    const storedData = localStorage.getItem(params.id);
    setHasPermission(!!storedData); // True if stored
  }, [params.id]);

  // Fetch data regardless of permission
  useEffect(() => {
    if (status === "loading") {
      console.log("Waiting for session...");
      return;
    }

    if (!session?.user?.token) {
      console.log("No valid session token");
      setLoading(false); // Stop loading if no session token
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const token = session.user.token;

        const [groupData, chatGroupUsersData, chatsData] = await Promise.all([
          fetchGroup(token, params.id),
          fetchChatGroupUsers(params.id),
          fetchChats(params.id),
        ]);

        setGroup(groupData);
        setChatGroupUsers(chatGroupUsersData);
        setChats(chatsData);

        setPermissionChecked(true); // Set after fetch
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status, session?.user?.token, params.id]);

  if (loading) {
    return <ChatSkeleton />;
  }

  if (!hasPermission && permissionChecked) {
    // Pass group data for password validation
    return (
      <GroupPermissionDialogBox
        group={group}
        setPermissionDialogBox={setHasPermission} // Update permission based on user input
      />
    );
  }

  return (
    <div>
      <ChatNav />
      <ChatBase
        users={chatGroupUsers}
        group={group}
        groupId={params.id}
        olderChats={chats}
      />
    </div>
  );
}
