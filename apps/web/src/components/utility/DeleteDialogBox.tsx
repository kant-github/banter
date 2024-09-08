"use client";

import { useSession } from "next-auth/react";
import { RedBtn } from "../buttons/RedBtn";
import { WhiteBtn } from "../buttons/WhiteBtn";
import { useState } from "react";
import axios from "axios";
import { clearCache } from "actions/common";
import { toast } from "sonner";

interface Props {
    itemId: string;
    deleteDialogBox: boolean;
    setDeleteDialogBox: (value: boolean) => void;
}

export default function DeleteDialogBox({
    itemId,
    deleteDialogBox,
    setDeleteDialogBox,
}: Props) {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    async function deleteRoomHandler() {
        console.log("Hi")
        if (!session?.user?.token) {
            console.error("User is not authenticated.");
            return;
        }
        console.log(session?.user?.token)

        setLoading(true);

        try {
            const { data } = await axios.delete(`http://localhost:7001/api/chat-group/${itemId}`, {
                headers: {
                    authorization: `Bearer ${session.user.token}`,
                },
            });
            clearCache("dashboard");
            toast.success('Chat has been deleted');
            setDeleteDialogBox(false);
        } catch (err) {
            console.error("Failed to delete the room:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${!deleteDialogBox ? 'hidden' : ''}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
                <p className="text-sm font-light">
                    Are you sure you want to delete this room? <br />
                    Remember this action can't be undone, and you will lose all your data.
                </p>
                <div className="flex items-center justify-end gap-4 pt-4 pr-2 w-full">
                    <WhiteBtn onClick={() => setDeleteDialogBox(false)}>Cancel</WhiteBtn>
                    <RedBtn onClick={deleteRoomHandler}>
                        {loading ? "Deleting..." : "Delete"}
                    </RedBtn>
                </div>
            </div>
        </div>
    );
}
