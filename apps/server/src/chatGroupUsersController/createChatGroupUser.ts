import prisma from "@repo/db/client";
import { Request, Response } from "express";

export async function createChatGroupUser(req: Request, res: Response) {
    try {
        const body = req.body;

        const user = await prisma.groupUsers.create({
            data: body
        })
        return res.json({ message: "User created successfully!", data: user });
    } catch (err) {
        return res.json({
            message: "Not able to let the user join the room"
        })
    }
}