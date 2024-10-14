import { GiJigsawPiece } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { Afacad } from "next/font/google"
const font = Afacad({
    subsets: ['latin'],
    weight: '700',
    display: 'swap',
});

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
                className="transition-transform transform group-hover:-translate-x-[2px] text-[#f2a633] dark:text-[#f2a633]"
            />
            <div
                className={`text-xl md:text-3xl tracking-widest text-black dark:text-gray-300 flex items-center ${font.className}`}>
                <span className="text-[#f5a331]">B</span>anter
            </div>
        </div>
    );
}
