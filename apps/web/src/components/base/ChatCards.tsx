"use client";
import { useState, useEffect } from "react";
import CardHoverChatCards from "../ui/CardHoverChatCards";
import { IoIosArrowForward } from "react-icons/io";
import { fetchRecentGroup } from "fetch/fetchRecentGroups";
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import Spinner from "../loaders/Spinner";

export default function ({
  groups,
  recentGroups,
  token,
}: {
  groups: any;
  recentGroups: any;
  token: string | null;
}) {
  const [roomType, setRoomType] = useState("created by you");
  const [displayGroups, setDisplayGroups] = useState(groups);
  const [fade, setFade] = useState(false);
  const [fetchAll, setFetchAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullCreatedGroups, setFullCreatedGroups] = useState<any[]>([]); // Store full created by you groups
  const [fullRecentGroups, setFullRecentGroups] = useState<any[]>([]); // Store full recent joined groups

  function toggleRoomType() {
    setFade(true);
    setTimeout(() => {
      setRoomType((prev) =>
        prev === "recent joined rooms" ? "created by you" : "recent joined rooms"
      );
    }, 150);
  }

  useEffect(() => {
    if (fetchAll) {
      // Display all groups based on current roomType
      setDisplayGroups(
        roomType === "recent joined rooms" ? fullRecentGroups : fullCreatedGroups
      );
    } else {
      setDisplayGroups(roomType === "recent joined rooms" ? recentGroups : groups);
    }
    setFade(false); // Start fading in
  }, [roomType, groups, recentGroups, fetchAll, fullCreatedGroups, fullRecentGroups]);

  async function loadMore() {
    if (isLoading) return;

    if (fetchAll) {
      setDisplayGroups(roomType === "recent joined rooms" ? recentGroups : groups);
      setFetchAll(false);
      return;
    }

    setIsLoading(true);

    try {
      const allGroups = await fetchRecentGroup(token, true);
      if (allGroups) {
        // Separate full data for each room type
        if (roomType === "recent joined rooms") {
          setFullRecentGroups(allGroups);
        } else {
          setFullCreatedGroups(allGroups);
        }

        setDisplayGroups(allGroups);
        setFetchAll(true);
      } else {
        console.error("No more rooms available.");
      }
    } catch (err) {
      console.error("Error loading more rooms:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#37474f] dark:bg-[#141313] pt-6 pb-16">
      {displayGroups.length > 0 ? (
        <>
          <span
            onClick={toggleRoomType}
            className="inline-flex items-center justify-start select-none gap-x-2 text-white text-xs font-extralight ml-48 mb-3 tracking-wide group italic cursor-pointer dark:text-gray-200"
          >
            {roomType}
            <IoIosArrowForward className="mt-[2px] transition-transform transform group-hover:translate-x-[2px]" />
          </span>

          <div
            className={`transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"
              }`}
          >
            <CardHoverChatCards items={displayGroups} />
            <span
              onClick={loadMore}
              className="flex justify-end text-xs text-zinc-300 font-thin mr-52 mt-4 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-x-2">
                  <Spinner />
                  <span>
                    "Loading..."
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-x-2">
                  <span>{fetchAll ? "Show Less" : "Load More"}</span>
                  {fetchAll ? <MdOutlineKeyboardDoubleArrowUp size={14} className="mt-1" /> : <MdOutlineKeyboardDoubleArrowDown size={14} className="mt-1" />}
                </div>
              )}
            </span>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-400 text-sm mt-4">No rooms available to show.</div>
      )}
    </div>
  );
}
