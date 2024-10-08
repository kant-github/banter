import { Response, Request } from "express";
import prisma from "@repo/db/client";
import { fileUploader } from "../utils/cloudinary/fileUploader";

export default async function(req: Request, res: Response) {
    try {
        const body = req.body;
        console.log("body is : ", body);
        //@ts-ignore
        const groupPhoto  = req?.files?.groupPhoto?.tempFilePath;
        console.log("group photo recieved : ", groupPhoto);
        

        const user = req.user;

        console.log("group photo us : ",groupPhoto);


        const uploadedImage = await fileUploader(groupPhoto);
        console.log("Uplaoded image is : ", uploadedImage);

        const chatGroup = await prisma.chatGroup.create({
            data: {
                title: body.title,
                passcode: body.passcode,
                user_id: Number(user?.id),
                groupImage: uploadedImage.secure_url,
            },
        });
        console.log("chat group is : ", chatGroup);

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
