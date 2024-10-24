import React, { useRef, useState, useEffect, useMemo } from "react";
import { GroupChatType, GroupChatUserType, MessageType, UserType } from "types";
import { getSocket, sendMessage, sendTypingEvent } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import Messages from "./messages/Messages";
import ChatMessageInput from "./ChatMessageInput";
import { EmptyConversation } from "./EmptyConversation";
import BlackBtn from "../buttons/BlackBtn";
import TypingDots from "../loaders/TypingDots";

interface Props {
    olderChats: MessageType[];
    chatUser?: UserType | null;
    group: GroupChatType;
    users: GroupChatUserType[];
}

export default function ChatComponent({ chatUser, olderChats, group, users }: Props) {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<MessageType[]>(olderChats);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    let typingTimeout: NodeJS.Timeout;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const socket = useMemo(() => {
        if (chatUser?.id) {
            return getSocket(group.id, chatUser.id);
        }
        return null;
    }, [group.id, chatUser?.id]);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            // Check if the incoming data is actually a message, not a typing event
            if (data.type === 'message') {
                // Ensure the message is not empty before processing it
                if (!data.message.trim()) {
                    console.warn('Received an empty message:', data);
                    return;
                }

                const messageExists = messages.some(msg => msg.id === data.id);
                if (!messageExists) {
                    setMessages(prevMessages => [...prevMessages, data]);
                    scrollToBottom();
                } else {
                    console.warn('Duplicate message received:', data);
                }
            } else if (data.type === 'typing') {
                handleTypingEvent(data);
            }
        };


        const handleTypingEvent = (event: MessageEvent) => {
            const typingData = JSON.parse(event.data);
            const { type, userId } = typingData;

            if (Number(userId) === chatUser?.id) return;

            let checkUsers = users.find(u => u.user.id === Number(userId));
            if (!checkUsers) return;

            if (type === 'typing-start') {
                setTypingUsers(prev => {
                    // Avoid duplicates
                    if (!prev.includes(checkUsers.user.name)) {
                        return [...prev, checkUsers.user.name];
                    }
                    return prev;
                });
            } else if (type === 'typing-stop') {
                setTypingUsers(prev => prev.filter(name => name !== checkUsers.user.name));
            }
        };

        socket.addEventListener("message", handleMessage);
        socket.addEventListener("message", handleTypingEvent);

        return () => {
            socket.removeEventListener("message", handleMessage);
            socket.removeEventListener("message", handleTypingEvent);
        };
    }, [socket, messages, chatUser?.id]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim() || !chatUser) return;
        console.log("message sent bro");

        const newMessage: MessageType = {
            id: uuidv4(),
            message,
            name: chatUser?.name ?? "Unknown",
            group_id: group.id,
            user_id: chatUser?.id ?? 0,
            created_at: new Date().toISOString(),
            user: chatUser,
        };

        sendMessage(newMessage);
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessage("");
        scrollToBottom();
        sendTypingEvent(chatUser?.id.toString(), 'typing-stop');
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        sendTypingEvent(chatUser?.id.toString()!, 'typing-start');

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            sendTypingEvent(chatUser?.id.toString()!, 'typing-stop');
        }, 3000);
    };

    return (
        <div className="flex flex-col h-[82vh] p-4 bg-white dark:bg-[#262629] rounded-[6px]">
            <div className="mt-4">
                {messages.length < 1 && <EmptyConversation />}
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col-reverse">
                <div className="flex flex-col gap-2 px-2">
                    {messages.map(msg => (
                        <Messages key={msg.id} msg={msg} chatUser={chatUser!} />
                    ))}
                </div>
            </div>
            <div>
                {typingUsers.length > 0 && (
                    <div className="text-xs text-yellow-500 flex flex-row items-center gap-x-2 font-light ml-4">
                        <TypingDots/>
                        {typingUsers.length > 3 ? (
                            <>
                                {typingUsers.slice(0, 3).join(", ")} and {typingUsers.length - 3} others are typing...
                            </>
                        ) : (
                            <>
                                {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
                            </>
                        )}
                    </div>
                )}
            </div>

            <form
                className="mt-2 flex justify-between items-center gap-x-4 w-full"
                onSubmit={handleSendMessage}
            >
                <div className="ml-2 gap-x-6 flex items-center w-full mb-2">
                    <ChatMessageInput message={message} setMessage={setMessage} onChange={handleTyping} />
                    <BlackBtn>Send</BlackBtn>
                </div>
            </form>
        </div>
    );
}
