import GoogleSignInButton from "../buttons/GoogleSignInButton"
import { signIn } from "next-auth/react"
export default function ({isModalOpen, setIsModalOpen}: {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void
}) {

    async function handleLogin() {
        signIn("google", {
            redirect: true,
            callbackUrl: "/",
        })
    }

    return (
        <div>
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                onClick={() => setIsModalOpen(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-md font-bold mb-4">Getting Started ?</h2>
                            <div>
                                <p className="mb-4 font-thin text-sm">To access all the exciting features of ChatApp and stay updated with the latest conversations. Log in now to connect with others and explore what's new!
                                </p>
                            </div>
                            <div className="w-full">
                                <GoogleSignInButton onClick={handleLogin}>Sign In using Google</GoogleSignInButton>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}