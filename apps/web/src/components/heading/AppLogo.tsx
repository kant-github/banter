import { GiJigsawPiece } from "react-icons/gi";
import { useRouter } from "next/navigation";


export default function () {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push("/dashboard");
            }}
            className="flex flex-row gap-x-5 items-center ml-2 cursor-pointer select-none group mt-1">
            <GiJigsawPiece
                size={25}
                className="transition-transform transform group-hover:-translate-x-[2px] text-black dark:text-gray-300"
            />
            <div
                className={`text-xl md:text-2xl tracking-widest text-black dark:text-gray-300`}>
                Banter
            </div>
        </div>
    );
}
