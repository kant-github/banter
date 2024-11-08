"use client";
import { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatNavTitle from "./ChatNavTitle";
import Chat from "./Chat";
import { GroupChatType, GroupChatUserType, MessageType, UserType } from "types";

interface Props {
  groupId: string;
  group: GroupChatType | null;
  users: GroupChatUserType[];
  olderChats: MessageType[];
}

export default function ({ groupId, group, users, olderChats }: Props) {
  const [chatUser, setChatUser] = useState<UserType | null>(null);
  const [ chatSidebarOpen, setChatSidebarOpen] = useState<boolean>(false);

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
  }, [group?.id, chatUser]);

  return (
    <div className="flex flex-row w-screen bg-[#f2f2f2] dark:bg-[#1c1c1c]">
      <ChatSideBar chatSidebarOpen={chatSidebarOpen} setChatSidebarOpen={setChatSidebarOpen} users={users} />
      <div className="w-full mx-6">
        <ChatNavTitle groupId={groupId} groupImage={group?.groupImage!} groupTitle={group?.title!} />
        <Chat users={users} chatUser={chatUser} olderChats={olderChats} group={group!} />
      </div>
    </div>
  );
};


