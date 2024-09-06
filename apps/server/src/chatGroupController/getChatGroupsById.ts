import prisma from "@repo/db/client";
import { Response, Request } from "express";

export default async function (req: Request, res: Response) {
    try {
        const groupId = req.params.id;
        if (groupId) {
            const chatGroup = await prisma.chatGroup.findUnique({
                where: {
                    id: groupId
                }
            })

            res.status(200).json({
                data: chatGroup
            })
        }
        res.status(200).json({
            message: "This group doesn't exist"
        })
    } catch (err) {
        console.log("Error in recieving single chat group");
        res.status(500).json({
            message: "Error in recieving single chat group"
        })
    }
}