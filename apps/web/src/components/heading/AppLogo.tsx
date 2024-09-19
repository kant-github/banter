import Image from "next/image";
import { useRouter } from "next/navigation";

export default function () {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push("/dashboard");
            }}
            className="flex flex-row gap-2 items-center cursor-pointer select-none">
            <Image src={"/images/icon_192x192.png"} width={22} height={22} alt="logo" />
            <div className="text-xl md:text-md font-extrabold">ChatApp</div>
        </div>
    )
}