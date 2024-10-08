import { Response, Request } from "express";
import prisma from "@repo/db/client";
import { fileUploader } from "../utils/cloudinary/fileUploader";

export default async function(req: Request, res: Response) {
    try {
        const { title, passcode } = req.body;
        if(!title || !passcode) {
            return res.status(400).json({
                message: "Title and Passcode is required"
            })
        }
        //@ts-ignore
        const groupPhoto  = req?.files?.groupPhoto?.tempFilePath;
        let uploadedImageUrl: string | null = null;
        if (groupPhoto) {
            const uploadedImage = await fileUploader(groupPhoto);
            uploadedImageUrl = uploadedImage.secure_url;
        }


        const chatGroup = await prisma.chatGroup.create({
            data: {
                title: title,
                passcode: passcode,
                user_id: Number(req.user?.id),
                groupImage: uploadedImageUrl,
            },
        });

        return res.status(200).json({
            message: "Chat group created successfully",
            chatGroup,
        });

    } catch (err) {
        console.log("Error in creating a chat group", err);
        return res.status(500).json({
            message: "Error in creating a chat group",
        });
    }
}
