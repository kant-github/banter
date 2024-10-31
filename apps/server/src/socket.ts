import { Server, WebSocket } from "ws";
import prisma from "@repo/db/client";
import { createClient } from "redis";

interface CustomWebSocket extends WebSocket {
  room?: string;
  userId?: string;
  isAlive?: boolean; // Track if connection is alive
}

export function setupWebSocket(wss: Server) {
  const redisPublisher = createClient({
    url: "rediss://default:AZ0pAAIjcDFiNjIyZmViODQ3NWY0N2NiODNlNjEwN2EzMTE4ZTY2N3AxMA@famous-sloth-40233.upstash.io:6379",
    socket: {
      connectTimeout: 10000,
      reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
    },
  });
  const redisSubscriber = createClient({
    url: "rediss://default:AZ0pAAIjcDFiNjIyZmViODQ3NWY0N2NiODNlNjEwN2EzMTE4ZTY2N3AxMA@famous-sloth-40233.upstash.io:6379",
    socket: {
      connectTimeout: 10000,
      reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
    },
  });

  // Connect Redis clients with error handling
  redisPublisher
    .connect()
    .catch((err) => console.error("Redis Publisher Connection Error:", err));
  redisSubscriber
    .connect()
    .catch((err) => console.error("Redis Subscriber Connection Error:", err));

  redisPublisher.on("error", (err) => {
    console.error("Redis Publisher Error:", err);
    redisPublisher.connect(); // Reconnect on error
  });

  redisSubscriber.on("error", (err) => {
    console.error("Redis Subscriber Error:", err);
    redisSubscriber.connect(); // Reconnect on error
  });

  redisSubscriber.subscribe("chat-messages", (message) => {
    const parsedMessage = JSON.parse(message);
    broadcastToRoom(parsedMessage.room, parsedMessage.data, wss);
  });

  redisSubscriber.subscribe("typing-events", (message) => {
    const parsedEvents = JSON.parse(message);
    broadcastToRoom(parsedEvents.room, parsedEvents.data, wss);
  });

  const broadcastToRoom = (room: string, message: any, wss: Server) => {
    let sentCount = 0;
    wss.clients.forEach((client) => {
      const customClient = client as CustomWebSocket;
      if (
        customClient.readyState === WebSocket.OPEN &&
        customClient.room === room
      ) {
        customClient.send(JSON.stringify(message));
        sentCount++;
      }
    });
  };

  wss.on("connection", (ws: CustomWebSocket, req) => {
    // Set up initial values and handle room assignment
    const params = new URLSearchParams(req.url?.split("?")[1]);
    const room = params.get("room") || "";
    const userId = params.get("userId") || "";

    if (!room) {
      ws.send(JSON.stringify({ error: "Invalid room" }));
      ws.close();
      return;
    }

    ws.room = room;
    ws.userId = userId;
    ws.isAlive = true;

    // Set up ping/pong heartbeat
    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("message", async (message: string) => {
      try {
        const data = JSON.parse(message);

        if (data.type === "chat-message" || !data.type) {
          await prisma.chats.create({
            data: {
              id: data.id,
              message: data.message,
              name: data.name,
              group_id: data.group_id,
              user_id: data.user_id,
              created_at: data.created_at,
            },
          });
          redisPublisher.publish(
            "chat-messages",
            JSON.stringify({ room: ws.room, data })
          );
        } else if (
          data.type === "typing-start" ||
          data.type === "typing-stop"
        ) {
          redisPublisher.publish(
            "typing-events",
            JSON.stringify({ room: ws.room, data })
          );
        } else {
          console.log("Unknown message type:", data.type);
        }
      } catch (error) {
        console.error("Error handling message:", error);
      }
    });

    // Handle WebSocket disconnection
    ws.on("close", () => {});
  });

  // Periodically check if clients are alive
  const interval = setInterval(() => {
    wss.clients.forEach((client) => {
      const customClient = client as CustomWebSocket;
      if (customClient.isAlive === false) {
        return customClient.terminate();
      }

      customClient.isAlive = false;
      customClient.ping(); // Send ping to clients to check if they respond with pong
    });
  }, 30000); // 30 seconds

  // Clean up interval on server shutdown
  wss.on("close", () => {
    clearInterval(interval);
  });
}
