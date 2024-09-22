import { Router } from "express";
import authmiddleware from "../middleware/authMiddleware";
import storeChatGroup from "../chatGroupController/storeChatGroup";
import getChatGroups from "../chatGroupController/getChatGroups";
import getChatGroupsById from "../chatGroupController/getChatGroupsById";
import updateChatGroupById from "../chatGroupController/updateChatGroupById";
import DeleteChatGroupById from "../chatGroupController/DeleteChatGroupById";
import { getChatGroupUsers } from "../chatGroupUsersController/getChatGroupUsers";
import { createChatGroupUser } from "../chatGroupUsersController/createChatGroupUser";
import { deleteChatGroupUser } from "../chatGroupUsersController/deleteChatGroupUserController";
import getChatGroupUserBySearch from "../chatGroupController/getChatGroupBySearch";
import getChats from "../chatController/getChats";
const router = Router();

//chat-group-controller
router.get("/chat-group", authmiddleware, getChatGroups);
router.post("/chat-group", authmiddleware, storeChatGroup);
router.get("/chat-group-check/:id", getChatGroupsById);
router.put("/chat-group/:id", authmiddleware, updateChatGroupById);
router.delete("/chat-group/:id", authmiddleware, DeleteChatGroupById);
router.get("/chat-group-by-search", getChatGroupUserBySearch);

//chat-group-user-controller
router.get("/chat-group-user", getChatGroupUsers);
router.post("/chat-group-user", createChatGroupUser);
router.delete("/chat-group-user", deleteChatGroupUser);


// chats-controller
router.get("/chats/:group_id", getChats);

export default router;
