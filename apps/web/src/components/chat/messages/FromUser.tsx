import Image from "next/image";
import { MessageType } from "types";

export default function ({msg}: {msg: MessageType}) {
    return (
        <div className="flex items-start gap-2 max-w-sm self-end mb-2">
            <div className="flex items-center gap-x-2">
                <span className="text-sm font-light bg-gradient-to-r from-zinc-900 to-black text-white rounded-[5px] py-1.5 px-4">{msg.message}</span>
                <Image alt="User Image" src={msg.user?.image!} width={32} height={32} className="rounded-full" />
            </div>
        </div>
    )
}