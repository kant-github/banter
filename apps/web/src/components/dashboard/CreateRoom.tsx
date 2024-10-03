import { useState } from "react";
import InputBox from "../utility/InputBox";
import BigBlackButton from "../buttons/BigBlackButton";

interface CreateRoomProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    roomTitle: string;
    setRoomTitle: (value: string) => void;
    roomPasscode: string;
    setRoomPasscode: (value: string) => void;
    createChatHandler: () => Promise<void>;
}

export default function CreateRoom({
    open,
    setOpen,
    roomTitle,
    setRoomTitle,
    roomPasscode,
    setRoomPasscode,
    createChatHandler,
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
                        }}
                    >
                        <button
                            type="button"
                            className="absolute top-3 right-5 text-gray-500 hover:text-gray-700 hover:bg-[#f2f2f2] transition duration-150 px-1.5"
                            onClick={() => setOpen(false)}
                        >
                            &#10005;
                        </button>
                        <div className="mt-4">
                            <InputBox input={roomTitle} setInput={setRoomTitle} label="Room Title" />
                        </div>
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