import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getChats(req: Request, res: Response) {
    try {
        const { group_id } = req.params;

        if (!group_id) {
            return res.status(400).json({
                message: "Group ID is required"
            });
        }

        const chats = await prisma.chats.findMany({
            where: {
                group_id: group_id
            },
            include: {
                user: true
            }
        });

        res.status(200).json({
            message: "Successfully fetched all chats",
            data: chats
        });
    } catch (err) {
        console.error("Error fetching chats:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
