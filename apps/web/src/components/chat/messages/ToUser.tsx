import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageType, UserType } from "types";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import MessageOptionsMenuToUser from "@/components/ui/MessageOptionsMenuToUser";
import { sendLikeEvent, sendUnlikeEvent } from "@/lib/socket.config";

interface Props {
  msg: MessageType;
  chatUser: UserType | null;
}

export default function Message({ msg, chatUser }: Props) {
  const [messageOptionDialogbox, setMessageOptionDialogbox] = useState(false);
  const [likeCount, setLikeCount] = useState(msg.LikedUsers.length);
  console.log("Like count is : ", likeCount);

  const likeHandler = () => {
    if (!chatUser) return;

    const currentUserLiked = msg.LikedUsers.some((user) => user.user_id === chatUser.id);

    if (currentUserLiked) {
      setLikeCount((prev) => Math.max(0, prev - 1));
      sendUnlikeEvent(msg.id, chatUser.id, chatUser.name);
    } else {
      setLikeCount((prev) => prev + 1);
      sendLikeEvent(msg.id, chatUser.id, chatUser.name);
    }
  };

  const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), {
    addSuffix: true,
  });

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
        <div
          onDoubleClick={likeHandler}
          className="flex flex-col rounded-tr-[5px] rounded-bl-[5px] rounded-br-[5px] px-3 py-1 text-sm font-light bg-gradient-to-r from-zinc-200 to-gray-300 text-black relative select-none"
        >
          {likeCount > 0 && <FcLike className="absolute -top-2 -left-1" />}
          <div className="absolute bottom-1 left-1">
            <MessageOptionsMenuToUser
              like={likeCount > 0}
              setLike={() => {}}
              msg={msg}
              isOpen={messageOptionDialogbox}
              setIsOpen={setMessageOptionDialogbox}
            />
          </div>
          {likeCount > 0 && (
            <div className="text-xs text-gray-400">
              Liked by {msg.LikedUsers.slice(0, 2).map((user) => user.username).join(", ")}
              {likeCount > 2 && ` and ${likeCount - 2} others`}
            </div>
          )}
          <div className="">
            <span className="text-pink-600 text-xs font-medium">{msg.name}</span>
            <span className="flex justify-start">{msg.message}</span>
            <span className="text-[8px] text-gray-500">{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
