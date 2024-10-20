import React, { useRef, useState, useEffect, useMemo } from "react";
import BigBlackButton from "../buttons/BigBlackButton";
import { GroupChatType, MessageType, UserType } from "types";
import { getSocket, sendMessage } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import Messages from "./messages/Messages";
import ChatMessageInput from "./ChatMessageInput";
import { EmptyConversation } from "./EmptyConversation";
import BlackBtn from "../buttons/BlackBtn";

interface Props {
    olderChats: MessageType[];
    chatUser?: UserType | null;
    group: GroupChatType;
}

export default function ChatComponent({ chatUser, olderChats, group }: Props) {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageType[]>(olderChats);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const socket = useMemo(() => getSocket(group.id), [group.id]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const data: MessageType = JSON.parse(event.data);

            // Check if the message already exists to avoid duplicates
            const messageExists = messages.some(msg => msg.id === data.id);

            if (!messageExists) {
                setMessages((prevMessages) => [...prevMessages, data]);
                scrollToBottom();
            } else {
                console.warn('Duplicate message received:', data);
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket, messages]); // Added messages to dependency array for updated state

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
            user: chatUser,
        };

        // Send the message and update state
        console.log("Sending new message:", newMessage);
        sendMessage(newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
        scrollToBottom();
    };

    return (
        <div className="flex flex-col h-[82vh] p-4 bg-white dark:bg-[#262629] rounded-[6px]">
            <div className="mt-4">
                {messages.length < 1 && <EmptyConversation />}
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col-reverse">
                <div ref={messagesEndRef} />
                <div className="flex flex-col gap-2 px-2">
                    {messages.map((msg, index) => (
                        <Messages key={msg.id} msg={msg} chatUser={chatUser!} />
                    ))}
                </div>
            </div>
            <form
                className="mt-2 flex justify-between items-center gap-x-4 w-full"
                onSubmit={handleSendMessage}
            >
                <div className="ml-2 gap-x-6 flex items-center w-full mb-2">
                    <ChatMessageInput message={message} setMessage={setMessage} />
                    <BlackBtn>Send</BlackBtn>
                </div>
            </form>
        </div>
    );
}
