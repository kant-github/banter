// import your Prisma client
import prisma from "@repo/db/client";
import { Request, Response } from "express";

export async function createChatGroupUser(req: Request, res: Response) {
    try {
        const { user_id, group_id } = req.body;
        
        // Check if required fields are provided
        if (!user_id || !group_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if the user already exists in the group
        const existingUser = await prisma.groupUsers.findFirst({
            where: {
                user_id: Number(user_id),
                group_id,
            },
            include: {
                user: true,
            },
        });

        console.log("Existing user is:", existingUser);

        // If the user is already in the group, update the RecentlyJoinedGroups record
        if (existingUser) {
            // Update the recently joined groups record
            await prisma.recentlyJoinedGroups.upsert({
                where: {
                    user_id_group_id: {
                        user_id: Number(user_id),
                        group_id,
                    },
                },
                update: {
                    joined_at: new Date(),  // Update timestamp if the record exists
                },
                create: {
                    user_id: Number(user_id),
                    group_id,
                    joined_at: new Date(),  // Insert new record with current timestamp
                },
            });

            return res.status(200).json({ message: "User is already in the group", data: existingUser });
        }

        // If the user is not in the group, create a new entry in GroupUsers
        const newUser = await prisma.groupUsers.create({
            data: {
                user_id: Number(user_id),
                group_id,
            },
            include: {
                user: true,
            },
        });

        // Create a new entry in RecentlyJoinedGroups for the newly added user
        const helper = await prisma.recentlyJoinedGroups.create({
            data: {
                user_id: Number(user_id),
                group_id,
                joined_at: new Date(),
            },
        });

        console.log("helper is : ", helper);

        return res.status(200).json({ message: "User added to group successfully", data: newUser });
    } catch (err) {
        console.error("Error creating group user:", err);
        return res.status(500).json({ message: "Unable to add user to the group", error: "some error occurred" });
    }
}
