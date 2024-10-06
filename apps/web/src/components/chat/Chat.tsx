import React, { useRef, useState, useEffect, useMemo } from "react";
import BigBlackButton from "../buttons/BigBlackButton";
import { GroupChatType, MessageType, UserType } from "types";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { EmptyConversation } from "./EmptyConversation";
import Image from "next/image";

interface Props {
    olderChats: MessageType[];
    chatUser: UserType | null; // chatUser can be null initially
    group: GroupChatType;
}

const ChatComponent: React.FC<Props> = ({ chatUser, olderChats, group }: Props) => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageType[]>(olderChats);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const socket = useMemo(() => {
        const socketInstance = getSocket();
        socketInstance.auth = { room: group.id };
        return socketInstance.connect();
    }, [group.id]);

    useEffect(() => {
        socket.on("message", (data: MessageType) => {
            setMessages((prevMessages) => [...prevMessages, data]);
            scrollToBottom();
        });

        return () => {
            socket.off("message");
        };
    }, [socket]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim() || !chatUser) return;

        const newMessage: MessageType = {
            id: uuidv4(),
            message: message,
            name: chatUser?.name ?? "Unknown",
            group_id: group.id,
            user_id: chatUser?.id ?? 0,
            created_at: new Date().toISOString(),
            user: chatUser, // Include the entire user object here, including profile picture
        };

        socket.emit("message", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
    };

    return (
        <div className="flex flex-col h-[82vh] p-4 bg-white dark:bg-[#262629] rounded-[6px]">
            <div className="mt-4">
                {messages.length < 1 && <EmptyConversation />}
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col-reverse">
                <div ref={messagesEndRef} />
                <div className="flex flex-col gap-2 px-2">
                    {messages.map((msg) => (
                        <>
                            {
                                msg.user_id === chatUser?.id ? (
                                    <div className="flex items-start gap-2 max-w-sm self-end mb-0.5">
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-sm font-light bg-gradient-to-r from-zinc-900 to-black text-white rounded-[5px] py-1.5 px-4">{msg.message}</span>
                                            <Image alt="rk" src={msg.user?.image!} width={32} height={32} className="rounded-full" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-2 max-w-sm self-start mb-0.5">
                                        <div className="flex items-center gap-x-2">
                                            <Image alt="rk" src={msg.user?.image!} width={32} height={32} className="rounded-full" />
                                            <span className="rounded-[3px] py-1.5 px-4 text-sm font-light bg-gradient-to-r from-zinc-200 to-gray-300 text-black">{msg.message}</span>
                                        </div>
                                    </div>)
                            }
                        </>
                    ))}
                </div>
            </div>
            <form
                className="mt-2 flex justify-between items-center gap-x-4 w-full"
                onSubmit={handleSendMessage}
            >
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    className="flex-1 p-2 pl-4 font-light text-sm border rounded-[4px] outline-none placeholder:text-black dark:bg-zinc-800 dark:text-gray-200 dark:placeholder:text-gray-200 placeholder:font-light"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="ml-2 w-[120px]">
                    <BigBlackButton>Send</BigBlackButton>
                </div>
            </form>
        </div>
    );
};

export default ChatComponent;

// {messages.map((msg) => (
//     <div
//       key={msg.id}
//       className={`flex items-start gap-2 max-w-sm rounded-[3px] py-2 px-4 text-sm font-light ${
//         msg.user_id === chatUser?.id // Compare user_id instead of name
//           ? "bg-gradient-to-r from-[#1f282e] to-black text-white self-end"
//           : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
//       } `}
//     >
//       {msg.user?.image && (
//         <Image
//           width={20}
//           height={20}
//           src={msg.user.image}
//           alt={msg.user.name}
//           className="w-8 h-8 rounded-full"
//         />
//       )}
//       <div>
//         {msg.message}
//       </div>
//     </div>
//   ))}