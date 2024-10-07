"use client";
import Image from "next/image";
import { ImHome } from "react-icons/im";
import BigWhiteBtn from "../buttons/BigWhiteBtn";
import { useState } from "react";
import CreateRoom from "./CreateRoom";
import axios from "axios";
import { toast } from "sonner";
import moment from 'moment';
import { createChatSchema } from "@/validations/createChatZod";
import { clearCache } from "actions/common";

export default function CreateRoomComponent({ user }: { user: any }) {
    const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);
    const [roomTitle, setRoomTitle] = useState<string>("");
    const [roomPasscode, setRoomPasscode] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [groupPhoto, setGroupPhoto] = useState<File | null>(null);
    console.log("Group photo is : ", groupPhoto);

    async function createChatHandler() {
        const payload = { title: roomTitle, passcode: roomPasscode };
        const result = createChatSchema.safeParse(payload);
    
        if (!result.success) {
            const errorMessages = result.error.errors.map(err => err.message).join(", ");
            toast.error(`Error: ${errorMessages}`);
            return;
        }
    
        const finalPayload = new FormData();
        finalPayload.append('title', result.data.title);
        finalPayload.append('passcode', result.data.passcode);
        if (groupPhoto) {
            finalPayload.append('groupPhoto', groupPhoto);
        }
    
        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:7001/api/chat-group", finalPayload, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const formattedDate = moment().format('dddd, MMMM D, YYYY');
            toast.message(data.message, {
                description: formattedDate
            });
    
            setRoomTitle("");
            setRoomPasscode("");
            clearCache("dashboard");
            setCreateRoomModal(false);
        } catch (err) {
            console.log(err);
            toast.error("Failed to create chat room. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    

    function openModal() {
        setCreateRoomModal(true);
    }

    return (
        <>
            <div className="md:w-2/5 w-screen transform dark:bg-[#f5a331] bg-[#202a2e] px-12 py-4 rounded-[8px] mx-4 my-12">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-x-8 items-center mt-4 justify-between">
                        <div>
                            <div className="flex flex-row items-center ml-0.5 gap-x-2">
                                <ImHome size={18} className="dark:text-gray-800 text-gray-200" />
                                <h3 className="dark:text-gray-800 pt-1 text-gray-200 font-bold">Create a Room</h3>
                            </div>
                            <p className="text-gray-200 dark:text-gray-800 font-normal tracking-wider md:text-xs text-[8px] mt-3">
                                Start a chat room with just a few clicks and stay connected with friends. Chat, share, and catch up anytime!
                            </p>
                        </div>
                        <Image src="/images/talking.png" width={80} height={80} alt="talking" />
                    </div>
                    <div className="w-3/5 flex flex-row justify-center mt-8 mb-3">
                        <BigWhiteBtn onClick={openModal}>Create Room</BigWhiteBtn>
                    </div>
                </div>
            </div>
            <CreateRoom
                createChatHandler={createChatHandler}
                roomTitle={roomTitle}
                setRoomTitle={setRoomTitle}
                roomPasscode={roomPasscode}
                setRoomPasscode={setRoomPasscode}
                open={createRoomModal}
                setOpen={setCreateRoomModal}
                groupPhoto={groupPhoto}
                setGroupPhoto={setGroupPhoto}
            />
        </>
    );
}
