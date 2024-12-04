import { MessageType, UserType } from "types";
import FromUser from "./FromUser";
import ToUser from "./ToUser";
import { useEffect, useState, useCallback, useRef } from "react";
import { sendLikeEvent, sendUnlikeEvent } from "@/lib/socket.config";

interface Props {
    msg: MessageType;
    chatUser: UserType | null;
    socket: WebSocket | null;
}

export default function MessageComponent({ msg, chatUser, socket }: Props) {
    const [like, setLike] = useState(false);
    const isInitialRender = useRef(true); // Track initial render

    const handleSocketMessage = useCallback((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // Check if the message data is the same message (to avoid duplicates)
        if (data.subType === "like" || data.subType === "unlike") {
            // console.log(data);
        }
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.addEventListener("message", handleSocketMessage);

        return () => {
            socket.removeEventListener("message", handleSocketMessage);
        };
    }, [socket, handleSocketMessage]);

    useEffect(() => {
        // Skip effect during the initial render
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        if (chatUser?.id) {
            if (like) {
                console.log("sending like event");
                sendLikeEvent(msg.id, chatUser.id);
            } else {
                console.log("sending unlike event");
                sendUnlikeEvent(msg.id, chatUser.id);
            }
        }
    }, [like, chatUser?.id, msg.id]);

    return (
        <>
            {msg.user_id === chatUser?.id ? (
                <FromUser msg={msg} setLike={setLike} like={like} />
            ) : (
                <ToUser msg={msg} setLike={setLike} like={like} />
            )}
        </>
    );
}
