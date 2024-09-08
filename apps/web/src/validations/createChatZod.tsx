import { z } from "zod"

export const createChatSchema = z.object({
    title: z.string().min(4, { message: "Room title should contain atleast 4 characters" }).max(191, { message: "Room should not exceeds 191 characters" }),
    passcode: z.string().min(4, { message: "Passcode should contain atleast 4 characters" }).max(32, { message: "Passcode should not exceeds 32 characters" }),
}).required();

export type createChatSchemaType = z.infer<typeof createChatSchema>;