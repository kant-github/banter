import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getChats(req: Request, res: Response) {
    try {
        const { group_id } = req.params;

        if (!group_id) {
            res.status(500).json({
                message: "Error in recieving chats"
            })
        }

        const chats = await prisma.chats.findMany({
            where: {
                group_id: group_id
            }
        })

        res.status(200).json({
            message: "Successfully fetched all chats",
            data: chats
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in recieving chats"
        })
    }
}