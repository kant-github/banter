"use client";
import BlackBtn from "@/components/buttons/BlackBtn";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    function routeHandler() {
        router.push("/");
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Image
                src="/images/404.svg"
                height={500}
                width={500}
                alt="not-found"
            />
            <div className="w-40 mt-8">
                <BlackBtn onClick={routeHandler}>Go to Home page</BlackBtn>
            </div>
        </div>
    );
}
