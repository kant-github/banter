import { getServerSession } from "next-auth";
import CardHoverChatCards from "../ui/CardHoverChatCards";
import { IoIosArrowForward } from "react-icons/io";
import { authOption } from "app/api/auth/[...nextauth]/options";

export default async function ({ groups }: { groups: any }) {
    const session = await getServerSession(authOption);
    console.log(session?.user);
    return (
        <div className="bg-[#37474f] dark:bg-[#141313] pt-6 pb-16">
            {
                groups.length >= 1 && (
                    <span className="w-28 flex items-center justify-start select-none gap-x-2 text-white text-xs font-extralight ml-48 mb-3 tracking-wide group italic cursor-pointer dark:text-gray-200">
                        recent rooms
                        <IoIosArrowForward className="mt-[2px] transition-transform transform group-hover:translate-x-[2px]" />
                    </span>
                )
            }

            <CardHoverChatCards items={groups} />
        </div>
    )
}
