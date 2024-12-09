import { Server, WebSocket } from "ws";
import prisma from "@repo/db/client";
import { createClient } from "redis";
import { json } from "express";

interface CustomWebSocket extends WebSocket {
  room?: string;
  userId?: string;
  isAlive?: boolean;
}

// Redis URL
const REDIS_URL = "rediss://default:AZ0pAAIjcDFiNjIyZmViODQ3NWY0N2NiODNlNjEwN2EzMTE4ZTY2N3AxMA@famous-sloth-40233.upstash.io:6379";

let redisPublisher: ReturnType<typeof createClient>;
let redisSubscriber: ReturnType<typeof createClient>;

// Function to create Redis client with exponential backoff and error handling
const createRedisClient = (url: string) => {
  return createClient({
    url,
    socket: {
      connectTimeout: 30000,
      keepAlive: 60000,
      reconnectStrategy: (retries) => {
        if (retries > 10) return new Error("Max retries reached");
        return Math.min(retries * 100, 5000);
      },
    },
  });
};

const initRedisClients = () => {
  if (!redisPublisher) {
    redisPublisher = createRedisClient(REDIS_URL);
    redisPublisher.connect().catch((err) => console.error("Redis Publisher Connection Error:", err));
  }

  if (!redisSubscriber) {
    redisSubscriber = createRedisClient(REDIS_URL);
    redisSubscriber.connect().catch((err) => console.error("Redis Subscriber Connection Error:", err));
  }

  const handleRedisError = (client: ReturnType<typeof createClient>, clientName: string) => {
    client.on("error", (err) => {
      console.error(`${clientName} Error:`, err);
      if (err.code === "ETIMEDOUT") {
        client.disconnect().finally(() => client.connect());
      }
    });
  };

  handleRedisError(redisPublisher, "Redis Publisher");
  handleRedisError(redisSubscriber, "Redis Subscriber");
};

initRedisClients();



export function setupWebSocket(wss: Server) {

  const onlineUsers = new Set<number>();


  redisSubscriber.subscribe("chat-messages", (message) => {
    const parsedMessage = JSON.parse(message);
    const { data, ws } = parsedMessage;
    broadcastToRoom(ws, data, wss);
  });

  redisSubscriber.subscribe("typing-events", (message) => {
    const parsedMessage = JSON.parse(message);
    const { data, ws } = parsedMessage;
    broadcastToRoom(ws, data, wss);
  });

  redisSubscriber.subscribe("like-events", (message) => {
    const parsedMessage = JSON.parse(message);
    const { data, ws } = parsedMessage;
    broadcastToRoom(ws, data, wss);
  })

  setInterval(() => {
    redisPublisher.ping().catch((err) => console.error("Publisher Ping error:", err));
    redisSubscriber.ping().catch((err) => console.error("Subscriber Ping error:", err));
  }, 60000);

  const broadcastToRoom = (sender: CustomWebSocket, message: any, wss: Server) => {
    wss.clients.forEach((socket) => {
      const client = socket as CustomWebSocket;
      if (client.readyState === WebSocket.OPEN && client.room === sender.room && client.userId !== sender.userId) {
        client.send(JSON.stringify(message));
      }
    });

  };

  const broadcastOnlineUsers = () => {

    const onlineUserList = Array.from(onlineUsers);
    const data = {
      type: "online-users",
      count: onlineUserList.length,
      list: onlineUserList
    }


    wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    })
  }

  wss.on("connection", async (ws: CustomWebSocket, req) => {
    const params = new URLSearchParams(req.url?.split("?")[1]);
    const room = params.get("room") || "";
    const userId = params.get("userId") || "";

    if (!room) {
      ws.send(JSON.stringify({ error: "Invalid room" }));
      ws.close();
      return;
    }

    onlineUsers.add(Number(userId));
    broadcastOnlineUsers();

    ws.room = room;
    ws.userId = userId;
    ws.isAlive = true;


    // await prisma.users.update({
    //   where: {
    //     id: Number(userId)
    //   }, data: {
    //     isOnline: true
    //   }
    // })

    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("message", async (message: string) => {

      try {

        const data = JSON.parse(message);

        if (data.type === "chat-message" || !data.type) {
          await prisma.chats.create({
            data: {
              id: data.message.id,
              message: data.message.message,
              name: data.message.name,
              group_id: data.message.group_id,
              user_id: data.message.user_id,
              created_at: data.message.created_at,
            },
          });


          redisPublisher.publish("chat-messages", JSON.stringify({ ws, data }));

        }
        else if (data.type === "typing-start" || data.type === "typing-stop") {
          redisPublisher.publish("typing-events", JSON.stringify({ ws, data }));
        }
        else if (data.type === "like-event" || data.type === "unlike-event") {

          const action = data.type === "like-event" ? "like" : "unlike";

          if (action === "like") {

            await prisma.likedUser.create({
              data: {
                message_id: data.messageId,
                user_id: Number(userId),
                username: data.name
              },
            });
          } else if (action === "unlike") {

            await prisma.likedUser.delete({
              where: {
                message_id_user_id: {
                  message_id: data.messageId,
                  user_id: Number(userId),
                },
              },
            });
          }

          redisPublisher.publish("like-events", JSON.stringify({ ws, data })) //------------>
        }
        else {

        }
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });

    ws.on("close", async () => {
      // await prisma.users.update({
      //   where: {
      //     id: Number(userId)
      //   }, data: {
      //     isOnline: false,
      //     lastSeen: new Date()
      //   }
      // })
      console.log(`${ws.userId} is disconnected`);

      onlineUsers.delete(Number(userId));
      broadcastOnlineUsers();
    });
  });


  const interval = setInterval(() => {
    wss.clients.forEach((client) => {
      const customClient = client as CustomWebSocket;
      if (customClient.isAlive === false) {
        return customClient.terminate();
      }
      customClient.isAlive = false;
      customClient.ping();
    });
  }, 30000); // Check every 30 seconds

  wss.on("close", () => {
    clearInterval(interval);
    redisPublisher.disconnect();
    redisSubscriber.disconnect();
  });
}
