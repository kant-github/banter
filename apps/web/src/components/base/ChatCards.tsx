import CardHoverChatCards from "../ui/CardHoverChatCards";
import { IoIosArrowForward } from "react-icons/io";

export default function ({ groups }: { groups: any }) {
    return (
        <div className="bg-[#37474f] pt-6 pb-10">
            {/* Parent div that triggers the hover */}
            <div className="flex items-center justify-start gap-x-2 text-white text-sm font-extralight ml-48 mb-2 tracking-wide group italic">
                recent rooms
                <IoIosArrowForward className="mt-[2px] transition-transform transform group-hover:translate-x-[2px]" />
            </div>

            <CardHoverChatCards items={groups} />
        </div>
    )
}
