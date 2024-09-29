import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { GroupChatType } from "types";
import { OptionsMenu } from "../ui/OptionsMenu";

interface props {
    myRoomDropdown: boolean;
    setMyRoomDropDown: (value: boolean) => void;
    groups: GroupChatType[];
}

export default function ({ myRoomDropdown, setMyRoomDropDown, groups }: props) {
    return (
        <div
            className={`fixed top-0 right-0 h-screen w-[350px] bg-[#f2f2f2] shadow-xl z-50 rounded-xl transform transition-transform duration-400 ${myRoomDropdown ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div>
                <div className="flex items-center justify-start gap-x-2 ml-4 mt-4 p-4 cursor-pointer">
                    <RxCross2
                        size={22}
                        onClick={() => {
                            setMyRoomDropDown(false);
                        }}
                    />
                    <h1 className="text-2xl font-bold tracking-wide">All rooms</h1>
                </div>
                <p className="mx-8 text-xs text-gray-500">
                    Browse through the complete collection of rooms you've created, and take control of their customization and management.
                </p>
            </div>
            <div className="mx-4 mt-8 overflow-y-auto">
                {groups.map((group, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-[10px] pl-4 ml-2 hover:bg-gray-200 rounded-[2px] cursor-pointer"
                    >
                        <div className="text-xs font-extralight">{group.title}</div>
                        <div className="mr-4">
                            <OptionsMenu color={"black"} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
