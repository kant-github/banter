import Image from "next/image";
import { MessageType } from "types";

export default function ({ msg }: { msg: MessageType }) {
    return (
        <div className="flex items-start gap-2 max-w-sm self-start mb-2">
            <div className="flex items-center gap-x-2">
                <Image alt="rk" src={msg.user?.image!} width={32} height={32} className="rounded-full" />
                <span className="rounded-[3px] py-1.5 px-4 text-sm font-light bg-gradient-to-r from-zinc-200 to-gray-300 text-black">{msg.message}</span>
            </div>
        </div>
    )
}