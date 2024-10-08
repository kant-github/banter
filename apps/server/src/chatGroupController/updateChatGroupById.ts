import prisma from "@repo/db/client";
import { Request, Response } from "express";
import { fileUploader } from "../utils/cloudinary/fileUploader";

export default async function updateChatGroup(req: Request, res: Response) {
    try {
        const groupId = req.params.id;

        // @ts-ignore
        const groupPhoto = req?.files?.groupPhoto?.tempFilePath;
        console.log("group photo form backend while uodating is : ", groupPhoto);

        if (!groupId) {
            return res.status(400).json({
                message: "Group ID is required",
            });
        }

        const uploadedImage = await fileUploader(groupPhoto);
        console.log("uploaded image while updating is : ", uploadedImage);

        const chatGroup = await prisma.chatGroup.update({
            where: {
                id: groupId,
            },
            data: {
                title: req.body.title,
                passcode: req.body.passcode,
                groupImage: uploadedImage.secure_url,
            },
        });
        console.log("chat group after getting updated is : ", chatGroup);

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
        return res.status(500).json({
            message: "Error in updating the chat group",
        });
    }
}
