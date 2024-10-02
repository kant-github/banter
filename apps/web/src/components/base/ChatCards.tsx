import CardHoverChatCards from "../ui/CardHoverChatCards";
import { IoIosArrowForward } from "react-icons/io";

export default function ({ groups }: { groups: any }) {
    return (
        <div className="bg-[#37474f] pt-6 pb-16">
            {
                groups.length >= 1 && (
                    <span className="w-28 flex items-center justify-start select-none gap-x-2 text-white text-xs font-extralight ml-48 mb-3 tracking-wide group italic cursor-pointer">
                        recent rooms
                        <IoIosArrowForward className="mt-[2px] transition-transform transform group-hover:translate-x-[2px]" />
                    </span>
                )
            }

            <CardHoverChatCards items={groups} />
        </div>
    )
}
