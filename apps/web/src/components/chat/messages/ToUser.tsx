import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageType } from "types";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import MessageOptionsMenu from "@/components/ui/MessageOptionsMenu";
import MessageOptionsMenuToUser from "@/components/ui/MessageOptionsMenuToUser";

export default function Message({ msg }: { msg: MessageType }) {
  const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), {
    addSuffix: true,
  });
  const [like, setLike] = useState(false);
  const [messageOptionDialogbox, setMessageOptionDialogbox] = useState(false);
  return (
    <div className="flex items-start gap-2 max-w-sm self-start mb-2">
      <div className="flex flex-row items-center gap-x-2">
        <Image
          alt="rk"
          src={msg.user?.image!}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col rounded-[3px] px-3 py-1 text-sm font-light bg-gradient-to-r from-zinc-200 to-gray-300 text-black relative">
          {like && <FcLike className="absolute -top-2 -left-1" />}
          <div className="absolute bottom-1 left-1">
            <MessageOptionsMenuToUser
              like={like}
              setLike={setLike}
              msg={msg}
              isOpen={messageOptionDialogbox}
              setIsOpen={setMessageOptionDialogbox}
            />
          </div>
          <div className="">
            <span className="text-pink-600 text-xs font-medium">
              {msg.name}
            </span>
            <span className="flex justify-start">{msg.message}</span>
            <span className="text-[8px] text-gray-500">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
