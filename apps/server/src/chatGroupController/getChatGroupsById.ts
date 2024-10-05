import prisma from "@repo/db/client";
import { Response, Request } from "express";

export default async function (req: Request, res: Response) {
    try {
        const groupId = req.params.id;
        console.log(groupId);
        if (groupId) {
            const chatGroup = await prisma.chatGroup.findUnique({
                where: {
                    id: groupId
                }
            });
            if (chatGroup) {
                return res.status(200).json({
                    data: chatGroup
                });
            }
            return res.status(404).json({
                message: "This group doesn't exist"
            });
        }
        return res.status(400).json({
            message: "Group ID is required"
        });
    } catch (err) {
        console.error("Error in receiving single chat group:", err);
        return res.status(500).json({
            message: "Error in receiving single chat group"
        });
    }
}
