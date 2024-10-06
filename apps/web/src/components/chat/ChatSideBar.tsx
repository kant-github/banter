import { GroupChatUserType } from "types";
import { FaUserTie } from "react-icons/fa";
import { format } from "date-fns";

export default function UsersList({ users }: { users: Array<GroupChatUserType> | [] }) {
    const participantLabel = users.length === 1 ? "participant" : "participants";

    return (
        <div className="w-1/5 bg-[#f2f2f2] dark:bg-[#1c1c1c] dark:text-gray-300 h-[91.5vh] flex flex-col pb-[12px]">
            <div className="flex flex-row items-center gap-x-3 text-2xl ml-9 mt-4 font-bold">
                <FaUserTie size={24} />
                <h1 className="mt-1">Users</h1>
            </div>
            <div className="text-xs font-mono ml-9 mt-2">{users.length} {participantLabel}</div>
            <div className="px-6 flex-grow overflow-y-auto space-y-4 mt-2">
                {
                    users.length > 0 && users.map((item, index) => (
                        <div key={index} className="border-[1px] dark:border-gray-600 text-xs px-4 py-4 bg-white rounded-[8px] transition-shadow dark:hover:shadow-lg hover:shadow-md dark:bg-[#262629]">
                            <div className="text-sm font-semibold">
                                <h2>{item.user.name}</h2>
                            </div>
                            <div>
                                <h5>Joined: <i className="font-light">{format(new Date(item.joined_at), 'MMMM dd, yyyy')}</i></h5> {/* Format the date */}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
