import { GroupChatUserType } from "types";
import { FaUserTie } from "react-icons/fa";

export default function ({users}: {users: Array<GroupChatUserType> | []}) {
    return (
        <div className="w-1/5 bg-[#f2f2f2] dark:bg-[#1c1c1c] dark:text-gray-300 h-[91.5vh] flex flex-col pb-[12px]">
            <div className="flex items-center gap-x-3 text-2xl pl-8 py-6 font-bold">
                <FaUserTie />      
                <h1 className="mt-1">Users</h1>
            </div>
            <div className="px-6 flex-grow overflow-y-auto space-y-4">
                {
                    users.length > 0 && users.map((item, index) => (
                        <div key={index} className="border-[1px] dark:border-gray-600 text-xs px-4 py-4 bg-white rounded-[8px] transition-shadow dark:hover:shadow-lg hover:shadow-md dark:bg-[#262629]">
                            <div className="text-sm font-semibold">
                                <h2>{item.name}</h2>
                            </div>
                            <div>
                                <h5>joined: <i className="font-light">{item.created_at}</i></h5>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
