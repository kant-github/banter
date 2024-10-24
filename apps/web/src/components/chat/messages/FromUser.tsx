import Image from "next/image";
import { MessageType } from "types";
import { formatDistanceToNowStrict } from "date-fns";

export default function Message({ msg }: { msg: MessageType }) {
    const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), { addSuffix: true });

    return (
        <div className="flex items-start gap-2 max-w-sm self-end mb-2">
            <div className="flex items-center gap-x-2">

                <div className="text-sm font-light bg-gradient-to-r from-zinc-900 to-black text-white rounded-[5px] py-1.5 px-4">
                    <span className="text-green-600 text-xs font-medium">You</span>
                    <span className="block">{msg.message}</span>
                    <span className="text-[8px] flex justify-end text-gray-400 ">{formattedDate}</span>
                </div>
                <Image alt="User Image" src={msg.user?.image!} width={32} height={32} className="rounded-full" />
            </div>
        </div>
    );
}
