"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DeleteDialogBox from "../utility/DeleteDialogBox";
import EditDialogBox from "../utility/EditDialogBox";
import { useRouter } from "next/navigation";
import { FRONTEND_BASE_URL } from "@/lib/apiAuthRoutes";
import { OptionsMenu } from "./OptionsMenu";

interface Item {
    id: string;
    user_id: number;
    title: string;
    passcode: string;
    created_at: string;
}

interface CardListProps {
    items: Item[];
    className?: string;
}

export default function CardList({
    items,
    className,
}: CardListProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [deleteDialogBox, setDeleteDialogBox] = useState<boolean>(false);
    const [editDialogBox, setEditDialogBox] = useState<boolean>(false);
    const router = useRouter();

    return (
        <>
            <div className={cn("flex flex-wrap gap-x-4 justify-center", className)}>
                {items.map((item, idx) => (
                    <div
                        onDoubleClick={() => {
                            router.push(`${FRONTEND_BASE_URL}/chat/${item.id}`)
                        }}
                        key={item.id}
                        className="relative group block p-2 h-full w-1/4 select-none"
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
                                <OptionsMenu
                                    setDeleteDialogBox={setDeleteDialogBox}
                                    setEditDialogBox={setEditDialogBox}
                                    setSelectedItemId={setSelectedItemId}
                                    item={item}
                                />
                            </div>
                            <CardDescription>{item.passcode}</CardDescription>
                            <CardDate>{item.created_at}</CardDate>
                        </Card>
                    </div>
                ))}
            </div>
            {deleteDialogBox && selectedItemId && (
                <DeleteDialogBox
                    itemId={selectedItemId}
                    deleteDialogBox={deleteDialogBox}
                    setDeleteDialogBox={setDeleteDialogBox}
                />
            )}
            {
                editDialogBox && selectedItemId && (
                    <EditDialogBox
                        itemId={selectedItemId}
                        editDialogBox={editDialogBox}
                        setEditDialogBox={setEditDialogBox}
                        selectedItem={items.find(item => item.id === selectedItemId) ?? null}
                    />

                )
            }
        </>
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
            <p>Passcode: {" "}</p>
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
            <p className="font-light">Created at:</p><i>{children}</i>
        </div>
    );
}
