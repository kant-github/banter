import { Router, Response, Request } from "express";
import prisma from "@repo/db/client";
import moment from "moment";

export default async function getChatGroups(req: Request, res: Response) {
  try {
    const user = req.user;
    const groups = await prisma.chatGroup.findMany({
      where: {
        user_id: Number(user?.id),
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const formattedGroups = groups.map((group) => ({
      ...group,
      created_at: moment(group.created_at).format("dddd, MMMM D, YYYY"),
    }));

    res.status(200).json({
      data: formattedGroups,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error in receiving the chat groups",
    });
  }
}
