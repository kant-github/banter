import { Router, Response, Request } from "express"
import prisma from "@repo/db/client"

export default async function getChatGroups(req: Request, res: Response) {
    try {
        const user = req.user
        console.log(user);
        const groups = await prisma.chatGroup.findMany({
            where: {
                user_id: Number(user?.id)
            },
            orderBy: {
                created_at: "desc"
            }
        })
        res.status(200).json({
            data: groups
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in recieving the chat groups"
        })
    }
}