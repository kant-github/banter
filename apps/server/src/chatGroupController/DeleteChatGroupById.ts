import prisma from "@repo/db/client";
import { Response, Request } from "express";


export default async function (req: Request, res: Response) {
    try {
        const groupId = req.params.id;

        if (!groupId) {
            res.status(500).json({ message: "No chat groups exist" })
        }
        const group = await prisma.chatGroup.delete({
            where: {
                id: groupId
            }
        })

        res.status(200).json({
            message: "Chat group is deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in deleting the chat group"
        })
    }
}