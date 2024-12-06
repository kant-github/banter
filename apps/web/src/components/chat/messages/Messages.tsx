import { MessageType, UserType } from "types";
import FromUser from "./FromUser";
import ToUser from "./ToUser";


interface Props {
    msg: MessageType;
    chatUser: UserType | null;
}

export default function MessageComponent({ msg, chatUser }: Props) {

    return (
        <>
            {msg.user_id === chatUser?.id ? (
                <FromUser chatUser={chatUser} msg={msg} />
            ) : (
                <ToUser chatUser={chatUser} msg={msg} />
            )}
        </>
    );
}
