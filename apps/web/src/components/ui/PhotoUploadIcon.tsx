import { useRef } from "react";
import { MdAddAPhoto } from "react-icons/md"
interface photoUploadIconProps {
    setGroupPhoto: (value: File) => void;
}
export default function ({ setGroupPhoto }: photoUploadIconProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    )
}