import { Response, Request } from "express";
import prisma from "@repo/db/client"; // Adjust the import path as necessary
import { fileUploader } from "../utils/cloudinary/fileUploader"; // Adjust the import path as necessary

export default async function createChatGroup(req: Request, res: Response) {
  try {
    const { title, passcode, icon } = req.body; // Extract title, passcode, and icon from the request body

    // Validate input
    if (!title || !passcode) {
      return res.status(400).json({
        message: "Title and Passcode are required",
      });
    }

    // Get the uploaded group photo from the request files
    //@ts-ignore
    const groupPhoto = req?.files?.groupPhoto?.tempFilePath;

    // Initialize variable for the uploaded image URL
    let groupImage: string | null = null;

    // Check if a group photo file is provided
    if (groupPhoto) {
      // If an image file is provided, upload it to Cloudinary
      const uploadedImage = await fileUploader(groupPhoto);
      groupImage = uploadedImage.secure_url; // Get the secure URL from the uploaded image
    } else if (icon) {
      // If no image file is provided but an icon is, use the icon directly
      groupImage = icon; // Set the groupImage to the icon data
    }

    // Create a new chat group in the database
    const chatGroup = await prisma.chatGroup.create({
      data: {
        title: title,
        passcode: passcode,
        user_id: Number(req.user?.id), // Ensure user ID is a number
        groupImage: groupImage, // Save the group image (either uploaded or icon)
      },
    });

    // Respond with a success message and the created chat group data
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
