import prisma from "@repo/db/client";
import { Request, Response } from "express";

export async function getChatGroupUsers(req: Request, res: Response) {
    try {
        console.log("hihihihihi");
        const { group_id} = req.query;
        console.log(group_id);

        if(!group_id){
            return res.status(401).json({
                message: "ChT GROUP id is unavailable"
            })
        }
        const users = await prisma.groupUsers.findMany({
            where: {
                group_id: group_id as string
            }
        })
        console.log(users);

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