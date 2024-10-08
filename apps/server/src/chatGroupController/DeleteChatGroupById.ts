import prisma from "@repo/db/client";
import { Response, Request } from "express";

export default async function (req: Request, res: Response) {
    const groupId = req.params.id;
    
    if (!groupId) {
        return res.status(400).json({ message: "Chat group ID is required" });
    }
    try {
        const deletedGroup = await prisma.chatGroup.delete({
            where: {
                id: groupId
            }
        });
        if (!deletedGroup) {
            return res.status(404).json({ message: "Chat group not found" });
        }

        res.status(200).json({
            message: "Chat group deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting chat group:", err);
        res.status(500).json({
            message: "Error in deleting the chat group",
        });
    }
}
