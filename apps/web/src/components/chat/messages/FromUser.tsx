import Image from "next/image";
import { MessageType, UserType } from "types";
import { formatDistanceToNowStrict } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { FcLike } from "react-icons/fc";
import MessageOptionsMenu from "@/components/ui/MessageOptionsMenu";
import { toast } from "sonner";
import { sendLikeEvent, sendUnlikeEvent } from "@/lib/socket.config";

interface Props {
  msg: MessageType
  chatUser: UserType | null;
}

export default function Message({ msg, chatUser }: Props) {
  const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), {
    addSuffix: true,
  });
  const [messageOptionDialogbox, setMessageOptionDialogbox] = useState(false);
  // const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(msg.LikedUsers.length);

  const likeHandler = () => {
    if (!chatUser) return;

    const currentUserLiked = msg.LikedUsers.some((user) => user.user_id === chatUser.id);

    if (currentUserLiked) {
      sendUnlikeEvent(msg.id, chatUser.id, chatUser.name);
      setLikeCount((prev) => Math.max(0, prev - 1)); // Decrement count
    } else {
      sendLikeEvent(msg.id, chatUser.id, chatUser.name);
      setLikeCount((prev) => prev + 1); // Increment count
    }
  };

  return (
    <div className="flex items-start gap-2 max-w-sm self-end">
      <div className="flex items-center gap-x-2">
        <div onDoubleClick={likeHandler} className="relative text-sm font-light bg-gradient-to-r from-zinc-900 to-black text-white rounded-br-[6px] rounded-tl-[6px] rounded-bl-[6px] py-1.5 px-4 select-none">
          {likeCount > 0 && <FcLike className="absolute -top-2 -left-1" />}
          <div className="absolute bottom-1 left-1">
            <MessageOptionsMenu
              like={likeCount > 0}
              setLike={() => {}}
              msg={msg}
              isOpen={messageOptionDialogbox}
              setIsOpen={setMessageOptionDialogbox}
            />
          </div>
          <div className="ml-2">
            <span className="text-green-600 flex justify-start text-xs font-medium">
              You
            </span>
            {likeCount > 0 && (
            <div className="text-xs text-gray-400">
              Liked by {msg.LikedUsers.slice(0, 2).map((user) => user.username).join(", ")}
              {likeCount > 2 && ` and ${likeCount - 2} others`}
            </div>
          )}
            <span className="block">{msg.message}</span>
            <span className="text-[8px] flex justify-end text-gray-400 ">
              {formattedDate}
            </span>
          </div>
        </div>
        <Image
          alt="User Image"
          src={msg.user?.image!}
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
