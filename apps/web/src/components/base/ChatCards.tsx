"use client";
import { useState, useEffect } from "react";
import CardHoverChatCards from "../ui/CardHoverChatCards";
import { IoIosArrowForward } from "react-icons/io";

export default function ({
  groups,
  recentGroups,
}: {
  groups: any;
  recentGroups: any;
}) {
  const [roomType, setRoomType] = useState("recent joined rooms");
  const [displayGroups, setDisplayGroups] = useState(groups);
  const [fade, setFade] = useState(false);

  function toggleRoomType() {
    setFade(true);
    setTimeout(() => {
      setRoomType((prev) =>
        prev === "recent joined rooms" ? "created by you" : "recent joined rooms"
      );
    }, 150);
  }

  useEffect(() => {
    setDisplayGroups(roomType === "recent joined rooms" ? recentGroups : groups);
    setFade(false); // Start fading in
  }, [roomType, groups, recentGroups]);

  return (
    <div className="bg-[#37474f] dark:bg-[#141313] pt-6 pb-16">
      {displayGroups.length >= 1 && (
        <span
          onClick={toggleRoomType}
          className="inline-flex items-center justify-start select-none gap-x-2 text-white text-xs font-extralight ml-48 mb-3 tracking-wide group italic cursor-pointer dark:text-gray-200"
        >
          {roomType}
          <IoIosArrowForward className="mt-[2px] transition-transform transform group-hover:translate-x-[2px]" />
        </span>
      )}
      <div className={`transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}>
        <CardHoverChatCards items={displayGroups} />
      </div>
    </div>
  );
}
