"use client";
import Image from "next/image";
import BlackBtn from "../buttons/BlackBtn";
import { WhiteBtn } from "../buttons/WhiteBtn";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useSession } from "next-auth/react";

export default function () {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleGettingStartedClick = () => {
    setIsModalOpen(true);
  };

  const handleDashboardClick = () => {
    window.location.href = "/dashboard";
  };

  return (
    <>
      <div className="flex justify-between w-full px-8 h-16">
        <div className="flex flex-row gap-2 items-center cursor-pointer">
          <Image src={"/images/icon_192x192.png"} width={22} height={22} alt="logo" />
          <div className="text-xl md:text-md font-extrabold">ChatApp</div>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-2">
          <WhiteBtn onClick={() => { /* Your Home button logic */ }}>Home</WhiteBtn>
          <WhiteBtn onClick={() => { /* Your Features button logic */ }}>Features</WhiteBtn>
          <div className="px-4">
            {
              session?.user ? (
                <BlackBtn onClick={handleDashboardClick}>Dashboard</BlackBtn>
              ) : (
                <BlackBtn onClick={handleGettingStartedClick}>Getting Started</BlackBtn>
              )
            }
          </div>
        </div>
      </div>
      <LoginModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
