import { MessageType, UserType } from "types";
import FromUser from "./FromUser";
import ToUser from "./ToUser";
import { useEffect, useState, useMemo } from "react";
import { sendLikeEvent, sendUnlikeEvent } from "@/lib/socket.config";

interface Props {
    msg: MessageType;
    chatUser: UserType | null;
    socket: WebSocket | null;
}

export default function MessageComponent({ msg, chatUser, socket }: Props) {
    const [like, setLike] = useState(false);
    console.log("rendered");
    // Use useMemo to compute the initial like state based on msg.LikedUsers
    const initialLikeState = useMemo(() => msg.LikedUsers.length > 0, [msg]);

    // Set the initial like state on mount only
    useEffect(() => {
        console.log("here");
        setLike(initialLikeState);
    }, [initialLikeState]); // Runs only once when initialLikeState changes

    // Send like/unlike event through WebSocket when like state changes
    useEffect(() => {
        if (chatUser?.id) {
            if (like) {
                sendLikeEvent(msg.id, chatUser.id); // Send like event to WebSocket
            } else {
                sendUnlikeEvent(msg.id, chatUser.id); // Send unlike event to WebSocket
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
