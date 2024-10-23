import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageType } from "types";

export default function Message({ msg }: { msg: MessageType }) {
    // const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), { addSuffix: true });
    // console.log(msg.created_at);
    return (
        <div className="flex items-start gap-2 max-w-sm self-start mb-2">
            <div className="flex flex-row items-center gap-x-2">
                <Image alt="rk" src={msg.user?.image!} width={32} height={32} className="rounded-full" />
                <div className="flex flex-col rounded-[3px] px-3 py-1 text-sm font-light bg-gradient-to-r from-zinc-200 to-gray-300 text-black">
                    <span className="text-pink-600 text-xs font-medium">{msg.name}</span>
                    <span className="flex justify-start">{msg.message}</span>
                    {/* <span className="text-[8px] text-gray-500">{formattedDate}</span> */}
                </div>
            </div>
        </div>
    );
}
