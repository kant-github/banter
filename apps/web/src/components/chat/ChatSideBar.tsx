import { GroupChatUserType } from "types";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import Image from "next/image";

export default function ({ users }: { users: Array<GroupChatUserType> | [] }) {
    const participantLabel = users.length === 1 ? "participant" : "participants";

    return (
        <div className="w-1/5 bg-[#f2f2f2] dark:bg-[#1c1c1c] dark:text-gray-300 h-[91.5vh] flex flex-col pb-[12px]">

            <div className="text-xs font-mono ml-9 mt-[3.7rem]">{users.length} {participantLabel}</div>
            <div className="px-6 flex-grow overflow-y-auto space-y-4 mt-2">
                {
                    users.length > 0 && users.map((item, index) => {
                        const joinedAt = new Date(item.joined_at);
                        const now = new Date();
                        const hoursDifference = differenceInHours(now, joinedAt);
                        let joinTimeDisplay;

                        if (hoursDifference < 24) {
                            const minutesDifference = differenceInMinutes(now, joinedAt);
                            joinTimeDisplay = minutesDifference < 60
                                ? `${minutesDifference} minutes ago`
                                : `${hoursDifference} hours ago`;
                        } else {
                            joinTimeDisplay = format(joinedAt, 'MMMM dd, yyyy');
                        }

                        return (
                            <div
                                key={index}
                                className="flex flex-row items-center gap-x-2 border-[1px] dark:border-gray-600 text-xs px-4 h-16 bg-white rounded-[8px] transition-shadow dark:hover:shadow-lg hover:shadow-md dark:bg-[#262629]"
                            >
                                <Image width={28} height={28} alt="logo" src={item.user.image} className="rounded-full" />
                                <div>
                                    <h2 className="text-xs font-semibold">{item.user.name.slice(0, 12)}</h2>
                                    <p className="text-[11px]">Joined: <i className="font-thin">{joinTimeDisplay}</i></p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
