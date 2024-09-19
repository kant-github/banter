import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function getChatGroupUserBySearch(req: Request, res: Response) {
    try {
        const group_id = req.query.group_id as string;
        console.log(group_id);
        const groups = await prisma.chatGroup.findMany({
            where: {
                title: {
                    startsWith: group_id,
                    mode: "insensitive"
                }
            }
        })
        return res.status(200).json({
            message: "Succesfully searched all the chat groups",
            data: groups
        })
    } catch (err) {
        res.status(404).json({
            message: "Error in searching all the chat groups"
        })
    }
}