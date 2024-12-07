import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageType, UserType } from "types";
import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import MessageOptionsMenuToUser from "@/components/ui/MessageOptionsMenuToUser";
import { sendLikeEvent, sendUnlikeEvent } from "@/lib/socket.config";
import { AiFillLike } from "react-icons/ai";

interface Props {
  msg: MessageType;
  chatUser: UserType | null;
}

export default function Message({ msg, chatUser }: Props) {
  const [messageOptionDialogbox, setMessageOptionDialogbox] = useState(false);
  const [likedUsersDropDown, setLikedUsersDropdown] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(msg.LikedUsers.length);
  useEffect(() => {
    setLikeCount(msg.LikedUsers.length);
  }, [msg.LikedUsers.length])

  const likeHandler = () => {
    if (!chatUser) return;

    const currentUserLiked = msg.LikedUsers.some((user) => user.user_id === chatUser.id);

    if (currentUserLiked) {
      sendUnlikeEvent(msg.id, chatUser.id, chatUser.name);
      setLikeCount((prev) => Math.max(0, prev - 1));
    } else {
      sendLikeEvent(msg.id, chatUser.id, chatUser.name);
      setLikeCount((prev) => prev + 1);
    }
  };

  const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), {
    addSuffix: true,
  });

  console.log("like count is : ", likeCount);

  return (
    <div className="flex items-start gap-2 max-w-sm self-start mb-2">
      <div className="flex flex-row items-end gap-x-2">
        <div className="flex items-center">
          <Image
            alt="rk"
            src={msg.user?.image!}
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
        <div
          onDoubleClick={likeHandler}
          className="flex flex-col rounded-br-[7px] rounded-tl-[7px] rounded-tr-[7px] px-3 py-1 text-sm font-light bg-gradient-to-r from-zinc-200 to-gray-300 text-black relative select-none"
        >
          {likeCount > 0 &&
            <div className="bg-zinc-700 flex items-center justify-center gap-x-2 rounded-[12px] px-2 absolute -top-2 right-1" onClick={() => setLikedUsersDropdown(true)}>
              <AiFillLike onClick={() => setLikedUsersDropdown(true)} className="text-yellow-500" />
              {<span className="text-[10px] text-red-500">{likeCount}</span>}

            </div>
          }
          <div className="absolute bottom-1 left-1">
            <MessageOptionsMenuToUser
              like={likeCount > 0}
              setLike={() => { }}
              msg={msg}
              isOpen={messageOptionDialogbox}
              setIsOpen={setMessageOptionDialogbox}
            />
          </div>
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
