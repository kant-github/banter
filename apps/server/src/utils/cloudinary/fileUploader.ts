import { v2 as cloudinary } from "cloudinary";


export async function fileUploader(tempFilePath: string) {
    return await cloudinary.uploader.upload(tempFilePath);
}
