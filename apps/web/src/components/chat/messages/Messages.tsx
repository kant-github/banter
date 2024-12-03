import { MessageType, UserType } from "types";
import FromUser from "./FromUser";
import ToUser from "./ToUser";
import { useEffect, useState } from "react";
import { sendLikeEvent, sendUnlikeEvent } from "@/lib/socket.config";

export default function ({ msg, chatUser }: { msg: MessageType, chatUser: UserType | null }) {

    const [like, setLike] = useState(false);

    useEffect(() => {
        if (chatUser?.id) {
            if (like) {
                console.log("sending like event")
                sendLikeEvent(msg.id, chatUser.id);
            } else {
                console.log("sending unlike event")
                sendUnlikeEvent(msg.id, chatUser.id);
            }
        }
    }, [like, chatUser?.id, msg.id]);


    return (
        <>
            {
                msg.user_id === chatUser?.id ? (
                    <FromUser msg={msg} setLike={setLike} like={like} />
                ) : (
                    <ToUser msg={msg} setLike={setLike} like={like} />
                )
            }
        </>
    )
}