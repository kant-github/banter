import React, { useRef, useState, useEffect } from "react";
import BigBlackButton from "../buttons/BigBlackButton";

interface Message {
    id: number;
    name: string;
    message: string;
}

export default function () {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, name: "Rishi", message: "Hello!" },
        { id: 2, name: "Aarav", message: "Hey, how's it going?" },
        { id: 3, name: "Rishi", message: "It's going well, thanks for asking!" },
        { id: 4, name: "Aarav", message: "That's great to hear! ❤️" },
        { id: 5, name: "Rishi", message: "What are you up to today?" }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, name: "Rishi", message }
            ]);
            setMessage("");
        }
    };

    return (
        <div className="flex flex-col h-[80vh] p-4 bg-[#ffff] rounded-[6px]">
            <div className="flex-1 overflow-y-auto flex flex-col-reverse">
                <div ref={messagesEndRef} />
                <div className="flex flex-col gap-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-sm rounded-[3px] py-2 px-4 text-sm font-light ${msg.name === "Rishi"
                                    ? "bg-gradient-to-r from-[#1f282e] to-[black] text-white self-end"
                                    : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
                                }`}
                        >
                            {msg.message}
                        </div>
                    ))}
                </div>
            </div>
            {/* Form to Send Messages */}
            <form className="mt-2 flex justify-between items-center gap-x-4 w-full" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    className="flex-1 p-2 font-light text-sm border rounded-[4px] outline-none"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="ml-2 w-[120px]">
                    <BigBlackButton onClick={() => {}}>Send</BigBlackButton>
                </div>
            </form>
        </div>
    );
}
