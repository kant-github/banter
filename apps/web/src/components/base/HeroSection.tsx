import Image from "next/image";
import Heading from "../heading/Heading";
import ButtonGroup from "../client/ButtonGroup";
import FeatureSection from "./FeatureSection";

export default function () {
    return (
        <div className="bg-[#F1F1F1] dark:bg-[#141313] dark:text-gray-400 w-full h-full">
            <div className="flex flex-col items-center justify-center">
                <div className="mt-12">
                    <Heading>Real-Time Conversations, Scalable Connections</Heading>
                </div>
                <div className="w-1/2 mt-8">
                    <p className="text-center font-extralight">Experience seamless, real-time communication with our lightning-fast, Redis-powered chat app, designed to scale effortlessly as your connections grow
                    </p>
                </div>
                <div className="mt-8">
                    <ButtonGroup />
                </div>
                <div>
                    <Image className="transform transition-transform duration-300 hover:scale-105" src={"/images/conversation.svg"} width={600} height={600} alt="hero" />
                </div>
                <div className="">
                    <FeatureSection />
                </div>
            </div>
        </div>
    )
}