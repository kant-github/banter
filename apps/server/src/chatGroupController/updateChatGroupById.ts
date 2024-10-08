import prisma from "@repo/db/client";
import { Request, Response } from "express";
import { fileUploader } from "../utils/cloudinary/fileUploader";

export default async function updateChatGroup(req: Request, res: Response) {
    try {
        const groupId = req.params.id;
        console.log("req body is : ", req.body);

        // @ts-ignore
        const groupPhoto = req?.files?.groupPhoto?.tempFilePath;

        if (!groupId) {
            return res.status(400).json({
                message: "Group ID is required",
            });
        }

        const updateData: {
            title?: string;
            passcode?: string;
            groupImage?: string;
        } = {
            title: req.body.title,
            passcode: req.body.passcode,
        };


        if (groupPhoto) {
            const uploadedImage = await fileUploader(groupPhoto);
            updateData.groupImage = uploadedImage.secure_url;
        }

        const chatGroup = await prisma.chatGroup.update({
            where: {
                id: groupId,
            },
            data: updateData,
        });

        if (chatGroup) {
            return res.status(200).json({
                message: "Chat group updated successfully",
            });
        } else {
            return res.status(404).json({
                message: "No chat group found with the given ID",
            });
        }
    } catch (err) {
        console.error("Error in updating the chat group:", err);
        return res.status(500).json({
            message: "Error in updating the chat group",
        });
    }
}
