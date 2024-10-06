"use client";
import { useEffect, useState } from "react";
import ChatSideBar from "./ChatSideBar";
import ChatNavTitle from "./ChatNavTitle";
import Chat from "./Chat";
import GroupPermissionDialogBox from "../utility/groupPermissionDialogBox";
import { GroupChatType, GroupChatUserType, MessageType, UserType } from "types";

interface Props {
  groupId: string;
  group: GroupChatType;
  users: GroupChatUserType[];
  olderChats: MessageType[];
}

const ChatBase: React.FC<Props> = ({ groupId, group, users, olderChats }: Props) => {
  const [permissionDialogBox, setPermissionDialogBox] = useState(true);
  const [chatUser, setChatUser] = useState<UserType | null>(null); // Set chatUser as null initially

  useEffect(() => {
    const fetchChatUserFromLocalStorage = () => {
      const data = localStorage.getItem(group.id);
      if (data) {
        const pData = JSON.parse(data);
        console.log("Parsed data is:", pData.user);
        setChatUser(pData.user); // Assuming pData contains user details
      }
    };
    fetchChatUserFromLocalStorage();

    window.addEventListener("chatUserUpdated", fetchChatUserFromLocalStorage);

    return () => {
      window.removeEventListener("chatUserUpdated", fetchChatUserFromLocalStorage);
    };
  }, [group.id]);

  useEffect(() => {
    if (chatUser) {
      console.log("Chat user is:", chatUser.name);
    }
  }, [chatUser]);

  return (
    <>
      {permissionDialogBox && (
        <GroupPermissionDialogBox
          group={group}
          permissionDialogBox={permissionDialogBox}
          setPermissionDialogBox={setPermissionDialogBox}
        />
      )}
      <div className="flex flex-row w-screen bg-[#f2f2f2] dark:bg-[#1c1c1c]">
        <ChatSideBar users={users} />
        <div className="w-full mr-6">
          <ChatNavTitle groupTitle={group.title} />
          <Chat chatUser={chatUser} olderChats={olderChats} group={group} />
        </div>
      </div>
    </>
  );
};

export default ChatBase;
