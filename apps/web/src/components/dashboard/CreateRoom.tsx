import { useState } from "react";
import InputBox from "../utility/InputBox";
import BigBlackButton from "../buttons/BigBlackButton";

interface CreateRoomProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function CreateRoom({ open, setOpen }: CreateRoomProps) {
    const [roomTitle, setRoomTitle] = useState<string>("");
    const [roomPasscode, setRoomPasscode] = useState<string>("");

    return (
        <>
            {open && (
                <div className="fixed w-screen h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            &#10005;
                        </button>
                        <div className="mt-2">
                            <InputBox input={roomTitle} setInput={setRoomTitle} label="Room Title" />
                        </div>
                        <div className="mt-2">
                            <InputBox type="password" input={roomPasscode} setInput={setRoomPasscode} label="Enter Passcode" />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <BigBlackButton onClick={() => {}}>Create Room</BigBlackButton>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
