import { useRef, useState } from "react";
import InputBox from "../utility/InputBox";
import BigBlackButton from "../buttons/BigBlackButton";
import { MdAddAPhoto } from "react-icons/md";

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
    setGroupPhoto
}: CreateRoomProps) {
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    async function handleSubmit() {
        setSubmitting(true);
        await createChatHandler();
        setSubmitting(false);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            console.log("file is: ", file);
            setGroupPhoto(file);
        }
    }

    function handleIconClick() {
        fileInputRef.current?.click();
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
                        }}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-5 text-gray-500 hover:text-gray-700 dark:hover:text-black transition duration-150 px-1.5"
                            onClick={() => setOpen(false)}
                        >
                            &#10005;
                        </button>
                        <p className="text-sm font-bold mb-4 text-gray-300">
                            Create Room
                        </p>
                        <div className="mt-4 flex flex-row items-center gap-x-3 w-full">
                            <div className="flex flex-col">
                                <div className="p-2 dark:bg-zinc-900 dark:hover:bg-black mt-4 rounded-[2px] cursor-pointer">
                                    <MdAddAPhoto className="text-gray-400" size={30} onClick={handleIconClick} />

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        aria-label="browse"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <InputBox input={roomTitle} setInput={setRoomTitle} label="Room Title" />
                        </div>
                        <span className="mt-1 text-gray-600 text-sm">{groupPhoto ? <span className="text-[1px] text-yellow-500 font-medium max-w-4 overflow-hidden">{groupPhoto.name.slice(0, 6)}...</span> : <span className="text-[4px] text-gray-500">Select file</span>}</span>
                        <div className="mt-4">
                            <InputBox type="password" input={roomPasscode} setInput={setRoomPasscode} label="Create Passcode" />
                        </div>

                        <div className="flex justify-end mt-6">
                            <BigBlackButton disabled={submitting}>
                                {submitting ? "Creating..." : "Create Room"}
                            </BigBlackButton>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}


