import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import BigBlackButton from "../buttons/BigBlackButton";
import axios from "axios";
import { useSession } from "next-auth/react";
import { clearCache } from "actions/common";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";

interface Props {
    itemId: string;
    editDialogBox: boolean;
    setEditDialogBox: (value: boolean) => void;
    selectedItem: {
        title: string;
        passcode: string;
    } | null;
}

export default function EditDialogBox({
    itemId,
    editDialogBox,
    setEditDialogBox,
    selectedItem,
}: Props) {
    const [title, setTitle] = useState("");
    const [passcode, setPasscode] = useState("");

    const { data: session } = useSession();
    if (!session) {
        return null
    }
    useEffect(() => {
        if (selectedItem) {
            setTitle(selectedItem.title);
            console.log(session);
            setPasscode(selectedItem.passcode);
        }
    }, [selectedItem]);

    const handleSaveChanges = async () => {
        try {
            const payload = {
                title,
                passcode
            }
            const { data } = await axios.put(`http://localhost:7001/api/chat-group/${itemId}`, payload, {
                headers: {
                    authorization: `Bearer ${session.user.token}`,
                },
            })
            clearCache("dashboard");
            toast.success(data.message);
            setEditDialogBox(false);
        } catch (err) {
            console.log("error in updating")
        }
    };

    if (!selectedItem) {
        return null;
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${!editDialogBox ? 'hidden' : ''}`}>
            <div className="bg-white dark:bg-[#262629] dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-lg relative w-2/6">
                <div className="flex justify-between">
                    <p className="text-sm font-md">
                        Update the room's title and passcode.
                    </p>
                    <div onClick={() => {
                        setEditDialogBox(false);
                    }} className="cursor-pointer p-1 hover:shadow-lg hover:bg-gray-100 rounded-[4px] transition-all duration-300">
                        <RxCross2 />
                    </div>
                </div>
                <div className="text-xs font-thin mb-4">
                    Share the new passcode for access
                </div>
                <div className="mb-4">
                    <InputBox value={title} label="Title" input={title} setInput={setTitle} />
                </div>
                <div>
                    <InputBox type="password" label="Passcode" input={passcode} setInput={setPasscode} />
                </div>
                <div className="w-full pt-4 flex items-center justify-center">
                    <BigBlackButton onClick={handleSaveChanges}>Save Changes</BigBlackButton>
                </div>
            </div>
        </div>
    );
}
