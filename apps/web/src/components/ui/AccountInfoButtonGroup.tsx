import { Dispatch, SetStateAction } from "react";
import BlackBtn from "../buttons/BlackBtn";
import { MdEditNote } from "react-icons/md";

interface props {
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
    saveChanges: () => void;
}

export default function ({editMode, setEditMode, saveChanges}: props) {
    return (
        <div className="flex gap-x-4 items-center">
            <BlackBtn
                className="flex items-center justify-center gap-x-2 mr-12"
                onClick={() => setEditMode(!editMode)}
            >
                {/* {editMode ? "Cancel" : <MdEditNote size={18} />} */}
                {editMode ? "Cancel" : (<span className="flex items-center gap-x-2"><MdEditNote size={18} />Edit Profile</span>)}
            </BlackBtn>
            {editMode && (
                <BlackBtn
                    className="mr-12 gap-x-2"
                    onClick={saveChanges}
                >
                    Save
                </BlackBtn>
            )}
        </div>
    )
}