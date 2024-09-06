import prisma from "@repo/db/client";
import { Request, Response } from "express";

export default async function updateChatGroup(req: Request, res: Response) {
    try {
        const groupId = req.params.id;

        if (!groupId) {
            return res.status(400).json({
                message: "Group ID is required",
            });
        }
        const chatGroup = await prisma.chatGroup.update({
            where: {
                id: groupId,
            },
            data: req.body,
        });
        if (chatGroup) {
            return res.status(200).json({
                message: "Chat group updated successfully",
                chatGroup,
            });
        } else {
            return res.status(404).json({
                message: "No chat group found with the given ID",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Error in updating the chat group",
        });
    }
}
