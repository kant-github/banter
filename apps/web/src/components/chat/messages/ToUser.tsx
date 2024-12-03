import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageType } from "types";
import { Dispatch, SetStateAction, useState } from "react";
import { FcLike } from "react-icons/fc";
import MessageOptionsMenuToUser from "@/components/ui/MessageOptionsMenuToUser";

interface Props {
  msg: MessageType
  like: boolean;
  setLike: Dispatch<SetStateAction<boolean>>
}

export default function Message({ msg, like, setLike }: Props) {
  const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), {
    addSuffix: true,
  });
  const [messageOptionDialogbox, setMessageOptionDialogbox] = useState(false);
  return (
    <div className="flex items-start gap-2 max-w-sm self-start mb-2">
      <div className="flex flex-row items-center gap-x-2">
        <Image
          alt="rk"
          src={msg.user?.image!}
          width={36}
          height={36}
          className="rounded-full"
        />
        <div onDoubleClick={() => setLike(prev => !prev)} className="flex flex-col rounded-tr-[5px] rounded-bl-[5px] rounded-br-[5px] px-3 py-1 text-sm font-light bg-gradient-to-r from-zinc-200 to-gray-300 text-black relative select-none">
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
