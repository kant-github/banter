import prisma from "@repo/db/client";
import { Response, Request } from "express";

export default async function (req: Request, res: Response) {
  try {
    const user_id = req.user?.id;
    const groupId = req.params.id;
    console.log("user id is : ");
    console.log(user_id);
    console.log("group id is : ");
    console.log(groupId);
    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required" });
    }
    if (groupId) {
      const chatGroup = await prisma.chatGroup.findUnique({
        where: {
          id: groupId,
        },
      });

      if (chatGroup) {
        const recentJoined = await prisma.recentlyJoinedGroups.findUnique({
          where: {
            user_id_group_id: {
              user_id: user_id!,
              group_id: groupId,
            },
          },
        });

        if (!recentJoined) {
          await prisma.recentlyJoinedGroups.create({
            data: {
              user_id: user_id!,
              group_id: groupId,
            },
          });
        } else {
          await prisma.recentlyJoinedGroups.update({
            where: {
              user_id_group_id: {
                user_id: user_id!,
                group_id: groupId,
              },
            },
            data: {
              joined_at: new Date(),
            },
          });
        }

        return res.status(200).json({
          data: chatGroup,
        });
      }
      return res.status(404).json({
        message: "This group doesn't exist",
      });
    }
    return res.status(400).json({
      message: "Group ID is required",
    });
  } catch (err) {
    console.error("Error in receiving single chat group:", err);
    return res.status(500).json({
      message: "Error in receiving single chat group",
    });
  }
}
