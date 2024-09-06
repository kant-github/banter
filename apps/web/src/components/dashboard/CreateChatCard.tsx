"use client";
import Image from "next/image";
import BigWhiteBtn from "../buttons/BigWhiteBtn";
import { useState } from "react";
import CreateRoom from "./CreateRoom";

export default function CreateRoomComponent() {
    const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);

    return (
        <>
            <div className="w-2/5 transform bg-[#202a2e] px-12 py-4 rounded-[8px] ml-8">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-x-8 items-center mt-4 justify-between">
                        <p className="text-white font-thin text-xs">
                            Start creating a room to chat with your friends and stay connected easily. Just a few clicks, and you’ll have your own space to chat, share, and catch up whenever you want.
                        </p>
                        <Image src="/images/talking.png" width={80} height={80} alt="talking" />
                    </div>
                    <div className="w-3/5 flex flex-row justify-center mt-8 mb-3">
                        <BigWhiteBtn onClick={() => setCreateRoomModal(true)}>Create Room</BigWhiteBtn>
                    </div>
                </div>
            </div>
            <CreateRoom open={createRoomModal} setOpen={setCreateRoomModal} />
        </>
    );
}
