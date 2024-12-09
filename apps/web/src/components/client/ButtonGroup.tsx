"use client"
import { useState } from "react";
import LoginModal from "../base/LoginModal";
import BlackBtn from "../buttons/BlackBtn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { WhiteBtn } from "../buttons/WhiteBtn";



export default function() {
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const router = useRouter();
    const { data: session } = useSession();

    async function handleStartchattingButton() {
        if(session?.user){
            router.push("/dashboard")
        } else{
            setIsModalOpen(prev => !prev)
        }
    }
    return (
        <>
            <WhiteBtn onClick={handleStartchattingButton}>Start Chatting</WhiteBtn>
            <LoginModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}