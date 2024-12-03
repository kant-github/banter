import { Dispatch, SetStateAction } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ShowPassword({ type, setShowPassword, showPassword }: {
    type: string | undefined,
    setShowPassword: Dispatch<SetStateAction<boolean>>,
    showPassword: boolean
}) {
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            {
                type === 'password' && (
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEye/> : <FaEyeSlash /> }
                    </div>
                )
            }
        </div>
    );
}
