"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

export default function CardList({
    items,
    className,
}: {
    items: {
        title: string;
        passcode: string;
        created_at: string;
    }[];
    className?: string;
}) {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className={cn("flex flex-row gap-x-4", className)}>
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="relative group block p-2 h-full w-1/4"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-[#c9d0d4] dark:bg-slate-800/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <div className="flex justify-between items-start">
                            <CardTitle>{item.title}</CardTitle>
                            <OptionsMenu />
                        </div>
                        <CardDescription>{item.passcode}</CardDescription>
                        <CardDate>{item.created_at}</CardDate>
                    </Card>
                </div>
            ))}
        </div>
    );
}

function OptionsMenu({ className }: { className?: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} className={`relative ${className}`}>
            <SlOptionsVertical
                size={12}
                className="cursor-pointer text-zinc-100"
                onClick={toggleMenu}
            />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute rounded-[4px] right-0 mt-2 w-28 bg-white dark:bg-slate-800 shadow-lg z-50"
                    >
                        <ul className="py-0.5  text-sm text-zinc-900 dark:text-zinc-100 ">
                            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer text-xs">Copy</li>
                            <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer text-xs">Edit</li>
                            <li className="px-4 py-2 hover:bg-red-200 dark:hover:bg-slate-700 cursor-pointer text-xs bg-red-50 flex flex-row items-center justify-between">Delete <MdDelete color="red" size={14} />
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Card({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full px-2 bg-[#1f282e] border border-transparent dark:border-white/[0.2] relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}

function CardTitle({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <h4 className={cn("text-zinc-100 font-bold tracking-wide", className)}>
            {children}
        </h4>
    );
}

function CardDescription({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "mt-6 text-zinc-100 font-light flex tracking-wide leading-relaxed text-xs",
                className
            )}
        >
            <p>Passcode : </p>
            <i className="font-thin">{children}</i>
        </div>
    );
}

function CardDate({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                "mt-2 text-zinc-100 font-thin flex tracking-wide leading-relaxed text-xs",
                className
            )}
        >
            <p className="font-light">Created at:</p> <i>{children}</i>
        </div>
    );
}
