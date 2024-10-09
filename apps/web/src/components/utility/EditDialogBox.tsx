import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import BigBlackButton from "../buttons/BigBlackButton";
import axios from "axios";
import { useSession } from "next-auth/react";
import { clearCache } from "actions/common";
import { toast } from "sonner";
import PhotoUploadIcon from "../ui/PhotoUploadIcon";
import CrossButton from "./CrossButton";
import Spinner from "../loaders/Spinner";

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
    const [groupPhoto, setGroupPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { data: session } = useSession();
    if (!session) {
        return null
    }
    useEffect(() => {
        if (selectedItem) {
            setTitle(selectedItem.title);
            setPasscode(selectedItem.passcode);
        }
    }, [selectedItem]);

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            const finalPayload = new FormData();
            finalPayload.append('title', title);
            finalPayload.append('passcode', passcode);
            if (groupPhoto) {
                finalPayload.append('groupPhoto', groupPhoto);
            }
            const { data } = await axios.put(`http://localhost:7001/api/chat-group/${itemId}`, finalPayload, {
                headers: {
                    authorization: `Bearer ${session.user.token}`,
                },
            })
            clearCache("dashboard");
            toast.success(data.message);
            setEditDialogBox(false);
        } catch (err) {
            console.log("error in updating")
        } finally {
            setLoading(false);
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
                    <CrossButton setOpen={setEditDialogBox} />
                </div>
                <div className="text-xs font-thin mb-4">
                    Share the new passcode for access
                </div>
                <div className="flex flex-row items-center gap-x-3">
                    <PhotoUploadIcon setGroupPhoto={setGroupPhoto} />
                    <InputBox value={title} label="Title" input={title} setInput={setTitle} />
                </div>
                <div className="text-gray-600 text-sm ml-0.5">{groupPhoto ? <span className="text-[1px] text-yellow-500 font-medium max-w-4 overflow-hidden">{groupPhoto.name.slice(0, 6)}...</span> : <span className="text-[4px] text-gray-500">Select file</span>}</div>
                <div className="mt-2">
                    <InputBox type="password" label="Passcode" input={passcode} setInput={setPasscode} />
                </div>
                <div className="w-full pt-4 flex items-center justify-center">
                    <BigBlackButton disabled={loading} onClick={handleSaveChanges}>{loading ? <Spinner /> : "Save Changes"}</BigBlackButton>
                </div>
            </div>
        </div>
    );
}
