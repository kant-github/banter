"use client"
import { HoverEffect } from "../ui/card-hover-effect";
import { PiPasswordFill } from "react-icons/pi";
import { FaHouseLock } from "react-icons/fa6";
import { SiWechat } from "react-icons/si";


export default function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    id: "1",
    title: "Secure Rooms",
    description: "Creating highly secure digital environments for private, safe, and seamless online interactions.",
    icon: <FaHouseLock color="white" size={17}/>
  },
  {
    id: "2",
    title: "Password Authentication",
    description: "Providing robust, password-protected access to digital content and online services for enhanced security.",
    icon: <PiPasswordFill color="white" size={17}/>
  },
  {
    id: "3",
    title: "Chat with Friends",
    description: "Enabling fast, secure, and reliable messaging to stay connected and communicate effortlessly with friends.",
    icon: <SiWechat color="white" size={17}/>
  },
];
