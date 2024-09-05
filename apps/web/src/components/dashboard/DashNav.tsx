import { authOption } from "app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import ProfileDropDown from "./ProfileDropDown";
import Image from "next/image";

export default async function () {

    const session = await getServerSession(authOption)
    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full px-8 py-4">
                <div className="flex flex-row gap-2 items-center cursor-pointer">
                    <Image src={"/images/icon_192x192.png"} width={22} height={22} alt="logo" />
                    <div className="text-xl md:text-md font-extrabold">ChatApp</div>
                </div>
                <div>
                    <ProfileDropDown />
                </div>
            </div>

        </div>
    )
}