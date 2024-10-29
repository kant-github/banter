"use client";
import { useState } from "react";
import CardHoverChatCards from "../ui/CardHoverChatCards";
import { IoIosArrowForward } from "react-icons/io";

export default function ({
  groups,
  recentGroups,
}: {
  groups: any;
  recentGroups: any;
}) {
  const [roomType, setRoomType] = useState("created by you");

  function toggleRoomType() {
    setRoomType((prev) =>
      prev === "recent joined rooms" ? "created by you" : "recent joined rooms"
    );
  }

  // Determine which groups to display based on roomType
  const displayGroups = roomType === "recent joined rooms" ? recentGroups : groups;

  return (
    <div className="bg-[#37474f] dark:bg-[#141313] pt-6 pb-16">
      {displayGroups.length >= 0 && (
        <span
          onClick={toggleRoomType}
          className="flex items-center justify-start select-none gap-x-2 text-white text-xs font-extralight ml-48 mb-3 tracking-wide group italic cursor-pointer dark:text-gray-200"
        >
          {roomType}
          <IoIosArrowForward className="mt-[2px] transition-transform transform group-hover:translate-x-[2px]" />
        </span>
      )}
      <CardHoverChatCards items={displayGroups} />
    </div>
  );
}
