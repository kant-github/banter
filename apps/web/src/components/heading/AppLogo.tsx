import { GiJigsawPiece } from "react-icons/gi";
import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push("/dashboard");
            }}
            className="flex flex-row gap-2 items-center ml-2 cursor-pointer select-none group">
            <GiJigsawPiece size={25} className="transition-transform transform group-hover:-translate-x-[2px]" />
            <div className="text-xl md:text-md font-extrabold tracking-wider">Banter</div>
        </div>
    )
}