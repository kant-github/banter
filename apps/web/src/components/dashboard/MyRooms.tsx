import { RxCross2 } from "react-icons/rx";
import { GroupChatType } from "types";
import { OptionsMenu } from "../ui/OptionsMenu";
import { useState } from "react";
import DeleteDialogBox from "../utility/DeleteDialogBox";
import EditDialogBox from "../utility/EditDialogBox";

interface props {
    myRoomDropdown: boolean;
    setMyRoomDropDown: (value: boolean) => void;
    groups: GroupChatType[];
}

export default function ({ myRoomDropdown, setMyRoomDropDown, groups }: props) {
    const [deleteDialogBox, setDeleteDialogBox] = useState<boolean>(false);
    const [editDialogBox, setEditDialogBox] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    return (
        <>
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
                                <OptionsMenu item={group} setSelectedItemId={setSelectedItemId} setEditDialogBox={setEditDialogBox} setDeleteDialogBox={setDeleteDialogBox} color={"black"} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {deleteDialogBox && selectedItemId && (
                <DeleteDialogBox
                    itemId={selectedItemId}
                    deleteDialogBox={deleteDialogBox}
                    setDeleteDialogBox={setDeleteDialogBox}
                />
            )}
            {
                editDialogBox && selectedItemId && (
                    <EditDialogBox
                        itemId={selectedItemId}
                        editDialogBox={editDialogBox}
                        setEditDialogBox={setEditDialogBox}
                        selectedItem={groups.find(item => item.id === selectedItemId) ?? null}
                    />

                )
            }
        </>
    );
}
