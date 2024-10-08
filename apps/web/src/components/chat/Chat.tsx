import React, { useRef, useState, useEffect, useMemo } from "react";
import BigBlackButton from "../buttons/BigBlackButton";
import { GroupChatType, MessageType, UserType } from "types";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { EmptyConversation } from "./EmptyConversation";
import Messages from "./messages/Messages";
import ChatMessageInput from "./ChatMessageInput";

interface Props {
    olderChats: MessageType[];
    chatUser: UserType | null;
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
            user: chatUser,
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
                    {messages.map((msg, index) => (
                        <Messages key={index} msg={msg} chatUser={chatUser} />
                    ))}
                </div>
            </div>
            <form
                className="mt-2 flex justify-between items-center gap-x-4 w-full"
                onSubmit={handleSendMessage}
            >
                <ChatMessageInput message={message} setMessage={setMessage}/>
                <div className="ml-2 w-[120px]">
                    <BigBlackButton>Send</BigBlackButton>
                </div>
            </form>
        </div>
    );
};

export default ChatComponent;