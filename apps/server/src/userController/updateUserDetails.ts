import prisma from "@repo/db/client";
import { Request, Response } from "express";

export async function updateUserDetails(req: Request, res: Response) {
    const user = req.user;
    console.log("user is : ", user);
    console.log("body is : ", req.body);

    if(!user) {
        res.status(403).json({
            message: "User is not authenticated"
        })
    }

    try {
        console.log("started updating the user");
        const updatedUser = await prisma.users.update({
            where: {
                id: Number(user?.id)
            },
            data: {
                name: req.body.name,
            }
        })    
        console.log("updated user is : ", updatedUser);
        
        res.status(200).json({
            message: "User updated successfully",
            updatedUser
        })

    } catch(err) {

    }
}
