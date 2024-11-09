import { Dispatch, SetStateAction, useState } from "react";
import InputBox from "../utility/InputBox";
import BigBlackButton from "../buttons/BigBlackButton";
import PhotoUploadIcon from "../ui/PhotoUploadIcon";
import CrossButton from "../utility/CrossButton";
import Spinner from "../loaders/Spinner";

interface CreateRoomProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    roomTitle: string;
    setRoomTitle: (value: string) => void;
    roomPasscode: string;
    setRoomPasscode: (value: string) => void;
    createChatHandler: () => Promise<void>;
    groupPhoto: File | null;
    setGroupPhoto: (value: File) => void;
    setIcon: Dispatch<SetStateAction<string | null>>;
    icon: string | null;
}

export default function CreateRoom({
    open,
    setOpen,
    roomTitle,
    setRoomTitle,
    roomPasscode,
    setRoomPasscode,
    createChatHandler,
    groupPhoto,
    setGroupPhoto,
    setIcon,
    icon
}: CreateRoomProps) {
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit() {
        setSubmitting(true);
        await createChatHandler();
        setSubmitting(false);
    }


    return (
        <>
            {open && (
                <div className="fixed w-screen h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form
                        className="bg-white dark:bg-[#262629] dark:text-gray-200 p-6 rounded-lg shadow-lg w-[400px] relative"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>
                        <div className="flex flex-row justify-between">
                            <p className="text-sm font-bold text-gray-300">
                                Create Room
                            </p>
                            <CrossButton setOpen={setOpen} /></div>
                        <div className="mt-4 flex flex-row items-center gap-x-3 w-full">
                            <div className="flex flex-col">
                                <PhotoUploadIcon setIcon={setIcon} setGroupPhoto={setGroupPhoto} />
                            </div>

                            <InputBox input={roomTitle} setInput={setRoomTitle} label="Room Title" />
                        </div>
                        <div className="text-gray-600 text-sm ml-0.5">{groupPhoto ? <span className="text-[10px] text-yellow-500 font-medium max-w-4 overflow-hidden">{groupPhoto.name.slice(0, 6)}...</span> : <span className="text-[10px] text-yellow-500">{icon}</span>}</div>
                        <div className="mt-2">
                            <InputBox type="password" input={roomPasscode} setInput={setRoomPasscode} label="Create Passcode" />
                        </div>

                        <div className="flex justify-end mt-6">
                            <BigBlackButton disabled={submitting}>
                                {submitting ? <Spinner /> : "Create Room"}
                            </BigBlackButton>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

