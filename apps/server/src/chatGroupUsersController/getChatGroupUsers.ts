import prisma from "@repo/db/client";
import { Request, Response } from "express";

export async function getChatGroupUsers(req: Request, res: Response) {
    try {
        const { group_id} = req.query;
        if(!group_id){
            return res.status(401).json({
                message: "Chat group is unavailable"
            })
        }
        const users = await prisma.groupUsers.findMany({
            where: {
                group_id: group_id as string
            },
            include: {
                user: true
            }
        })

        return res.json({
            message: "Successfully fetched all the chat group users",
            data: users
        })
    } catch(err) {
        return res.status(401).json({
            message: "Error in recieving the chat group users"
        })
    }
}