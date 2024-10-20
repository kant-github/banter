"use client";
import { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatNavTitle from "./ChatNavTitle";
import Chat from "./Chat";
import { GroupChatType, GroupChatUserType, MessageType, UserType } from "types";

interface Props {
  groupId: string;
  group: GroupChatType | null; // Allow group to be null initially
  users: GroupChatUserType[];
  olderChats: MessageType[];
}

export default function ({ groupId, group, users, olderChats }: Props) {
  const [chatUser, setChatUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchChatUserFromLocalStorage = () => {
      if (group?.id && !chatUser) {
        const data = localStorage.getItem(group.id);
        if (data) {
          const pData = JSON.parse(data);
          setChatUser(pData.user);
        }
      }
    };

    fetchChatUserFromLocalStorage();
  }, [group?.id, chatUser]); // Add chatUser to dependencies to prevent infinite re-renders

  return (
    <div className="flex flex-row w-screen bg-[#f2f2f2] dark:bg-[#1c1c1c]">
      <ChatSideBar users={users} />
      <div className="w-full mr-6">
        <ChatNavTitle groupImage={group?.groupImage!} groupTitle={group?.title!} />
        <Chat chatUser={chatUser} olderChats={olderChats} group={group!} />
      </div>
    </div>
  );
};


