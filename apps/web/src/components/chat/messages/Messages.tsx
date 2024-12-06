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

    return (
        <>
            {msg.user_id === chatUser?.id ? (
                <FromUser chatUser={chatUser} msg={msg}/>
            ) : (
                <ToUser chatUser={chatUser} msg={msg}/>
            )}
        </>
    );
}
