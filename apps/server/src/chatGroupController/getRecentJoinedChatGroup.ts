import prisma from "@repo/db/client";
import { Request, Response } from "express";

export async function getRecentJoinedChatGroup(req: Request, res: Response) {

  const user = req.user;
  if (!user) {
    // Send response early if user is not authenticated
    return res.status(404).json({
      message: "User is not authenticated",
    });
  }

  const fetchAll = req.query.fetchAll == "true";

  try {
    const data = await prisma.recentlyJoinedGroups.findMany({
      where: {
        user_id: Number(user.id),
      },
      select: {
        group: {
          select: {
            id: true,
            user_id: true,
            title: true,
            passcode: true,
            groupImage: true,
            created_at: true,
          },
        },
      },
      orderBy: {
        joined_at: "desc",
      },
      take: fetchAll ? undefined : 6,
    });

    if (data.length === 0) {
      // Early return if no data found to prevent further execution
      return res.status(404).json({
        message: "No recently joined groups found for the user",
      });
    }

    // Transform the data to the desired format
    const transformedData = data.map((item) => {
      const { id, user_id, title, passcode, groupImage, created_at } = item.group;
      return {
        id,
        user_id,
        title,
        passcode,
        groupImage,
        // Format the date to 'Wednesday, October 30, 2024'
        created_at: new Date(created_at).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });

    // Send the transformed data response after all processing
    return res.status(200).json({
      message: "Recently joined groups fetched successfully",
      data: transformedData,
    });
    
  } catch (err) {
    console.error("Error fetching recently joined groups:", err);
    // Only send error response if it hasn't been sent already
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Unable to fetch recently joined groups",
        error: "Some error occurred",
      });
    }
  }
}
