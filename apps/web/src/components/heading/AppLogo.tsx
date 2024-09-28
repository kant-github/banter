import Image from "next/image";
import { GiJigsawPiece } from "react-icons/gi";
import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push("/dashboard");
            }}
            className="flex flex-row gap-2 items-center cursor-pointer select-none">
            <GiJigsawPiece size={25} />
            <div className="text-xl md:text-md font-extrabold">ChatApp</div>
        </div>
    )
}