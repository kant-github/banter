import { MessageType, UserType } from "types";
import FromUser from "./FromUser";
import ToUser from "./ToUser";

export default function ({ msg, chatUser }: { msg: MessageType, chatUser: UserType | null }) {
    console.log("messages sent");
    return (
        <>
            {
                msg.user_id === chatUser?.id ? (
                    <FromUser msg={msg}/>
                ) : (
                   <ToUser msg={msg}/>
                )
            }
        </>
    )
}