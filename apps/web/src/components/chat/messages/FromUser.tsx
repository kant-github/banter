import Image from "next/image";
import { MessageType, UserType } from "types";
import { formatDistanceToNowStrict } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { FcLike } from "react-icons/fc";
import MessageOptionsMenu from "@/components/ui/MessageOptionsMenu";
import { toast } from "sonner";

interface Props {
  msg: MessageType
  like: boolean;
  setLike: Dispatch<SetStateAction<boolean>>;
  chatUser: UserType | null;
}

export default function Message({ msg, like, setLike, chatUser }: Props) {
  const formattedDate = formatDistanceToNowStrict(new Date(msg.created_at), {
    addSuffix: true,
  });
  const [messageOptionDialogbox, setMessageOptionDialogbox] = useState(false);

  // const currentUserLiked = msg.LikedUsers.some((x) => x.user_id === chatUser?.id);
  // const otherUserLiked = msg.LikedUsers.some((x) => x.user_id !== chatUser?.id);
  
  const likeHandler = () => {
    setLike(prev => !prev)
  }

  return (
    <div className="flex items-start gap-2 max-w-sm self-end">
      <div className="flex items-center gap-x-2">
        <div onDoubleClick={likeHandler} className="relative text-sm font-light bg-gradient-to-r from-zinc-900 to-black text-white rounded-br-[6px] rounded-tl-[6px] rounded-bl-[6px] py-1.5 px-4 select-none">
          {like && <FcLike className="absolute -top-2 -left-1" />}
          <div className="absolute bottom-1 left-1">
            <MessageOptionsMenu
              like={like}
              setLike={setLike}
              msg={msg}
              isOpen={messageOptionDialogbox}
              setIsOpen={setMessageOptionDialogbox}
            />
          </div>
          {
            
            msg.LikedUsers.map((user) => {
              return (
                <div>{user.username}</div>
              )
            })
          }
          <div className="ml-2">
            <span className="text-green-600 flex justify-start text-xs font-medium">
              You
            </span>
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
