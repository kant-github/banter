import { useState } from "react";
import { RedBtn } from "../buttons/RedBtn";
import { WhiteBtn } from "../buttons/WhiteBtn";
import { signOut } from "next-auth/react";

interface props {
    logoutDropdown: boolean;
    setLogoutDropDown: (value: boolean) => void;
}


export default function ({ logoutDropdown, setLogoutDropDown }: props) {
    const [loading, setLoading] = useState<boolean>(false);
    const handleLogout = async () => {
        signOut({
            redirect: true,
            callbackUrl: "/"
        })
    }
    return (
        <div className={`fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center z-50 `}>
            <div className="bg-white max-w-lg p-6 relative">
                <div className="w-[400px]">
                    <p className="text-md font-bold mb-4">
                        Log out
                    </p>
                    <p className="text-xs font-light mb-4">
                        Are you sure you want to log out? <br/> 
                        You can come back anytime, Press cancel to stay !!
                    </p>
                    <div className="flex items-center justify-end gap-4 pt-4 pr-2 w-full">
                        <WhiteBtn onClick={() => setLogoutDropDown(false)}>Cancel</WhiteBtn>
                        <RedBtn onClick={handleLogout}>
                            Log out
                        </RedBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}