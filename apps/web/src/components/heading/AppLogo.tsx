import { GiJigsawPiece } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { Yesteryear } from "next/font/google"

const font = Yesteryear({ weight: "400", subsets: ['latin'] })

export default function () {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push("/dashboard");
            }}
            className="flex flex-row gap-x-5 items-center ml-2 cursor-pointer select-none group">
            <GiJigsawPiece
                size={25}
                className="transition-transform transform group-hover:-translate-x-[2px] text-black dark:text-gray-300"
            />
            <div
                className={`text-xl md:text-2xl mt-1 tracking-widest text-black dark:text-gray-300 ${font.className}`}>
                Banter
            </div>
        </div>
    );
}
