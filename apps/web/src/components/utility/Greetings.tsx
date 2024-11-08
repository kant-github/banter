
import { Cedarville_Cursive } from "next/font/google";
import { useSession } from "next-auth/react";
const font = Cedarville_Cursive({ weight: "400", subsets: ["latin"] });

interface Props {
    groups: any;
}
export default function () {
    const { data: session } = useSession();
    return (
        <span
            className={`text-center dark:text-gray-300 text-[19px] ${font.className}`}
        >
            Hey {session?.user.name?.split(" ")[0]}
        </span>
    )
}