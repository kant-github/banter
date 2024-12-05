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


    useEffect(() => {
        debugger
        console.log("Printing liked user", msg.LikedUsers);
        setLike(msg.LikedUsers.length > 0);
    }, [msg.LikedUsers]);

    useEffect(() => {
        if (chatUser?.id) {
            if (like) {
                sendLikeEvent(msg.id, chatUser.id, chatUser.name);
            } else {
                sendUnlikeEvent(msg.id, chatUser.id);
            }
        }
    }, [like, chatUser?.id, msg.id]);

    return (
        <>
            {msg.user_id === chatUser?.id ? (
                <FromUser chatUser={chatUser} msg={msg} setLike={setLike} like={like} />
            ) : (
                <ToUser msg={msg} setLike={setLike} like={like} />
            )}
        </>
    );
}
