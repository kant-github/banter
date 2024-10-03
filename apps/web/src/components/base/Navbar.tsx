"use client";
import BlackBtn from "../buttons/BlackBtn";
import { WhiteBtn } from "../buttons/WhiteBtn";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useSession } from "next-auth/react";
import AppLogo from "../heading/AppLogo";
import { useRouter } from "next/navigation";
import DarkMode from "./DarkMode";

export default function () {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleGettingStartedClick = () => {
    setIsModalOpen(true);
  };

  const handleDashboardClick = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <div className="flex justify-between w-full px-8 h-16 bg-white dark:bg-[#171717]">
        <AppLogo />
        <div className="flex flex-row items-center justify-center w-[360px] gap-x-6">
          {
            session?.user ? (
              <BlackBtn onClick={handleDashboardClick}>Dashboard</BlackBtn>
            ) : (
              <div className="w-64">
                <BlackBtn onClick={handleGettingStartedClick}>Getting Started</BlackBtn>
              </div>
            )
          }
          <div>
            <DarkMode />
          </div>
          <WhiteBtn onClick={() => { /* Your Home button logic */ }}>Home</WhiteBtn>
          <WhiteBtn onClick={() => { /* Your Features button logic */ }}>Features</WhiteBtn>

        </div>
      </div>
      <LoginModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
