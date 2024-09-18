import prisma from "@repo/db/client";
import { Request, Response } from "express";

export async function deleteChatGroupUser(req: Request, res: Response) {
    try {
        const user_id = req.query.user_id; 
        if (!user_id) {
            return res.status(400).json({
                message: "group_id is required"
            });
        }

        const data = await prisma.groupUsers.delete({
            where: {
                id: Number(user_id)
            },
            
        });

        return res.status(200).json({
            message: "Chat group user deleted successfully",
            data: data
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error in deleting chat group user",
        });
    }
}
