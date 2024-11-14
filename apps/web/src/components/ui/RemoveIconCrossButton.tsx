import { Dispatch, SetStateAction } from "react";
import { RxCross2 } from "react-icons/rx";

type props = {
    icon: string | null;
    setIcon: Dispatch<SetStateAction<string | null>>;
}
export default function ({icon, setIcon}: props) {
    return (
        icon &&
        <RxCross2 onClick={() => setIcon(null)} className="text-yellow-500 cursor-pointer" size={10} />

    )
}