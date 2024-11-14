import { Server, WebSocket } from "ws";
import prisma from "@repo/db/client";
import { createClient } from "redis";

interface CustomWebSocket extends WebSocket {
  room?: string;
  userId?: string;
  isAlive?: boolean; // Track if connection is alive
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

// Initialize Redis clients
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

// Initialize Redis clients once at the start
initRedisClients();

export function setupWebSocket(wss: Server) {
  // Redis subscription for chat messages and typing events
  redisSubscriber.subscribe("chat-messages", (message) => {
    const parsedMessage = JSON.parse(message);
    broadcastToRoom(parsedMessage.room, parsedMessage.data, wss);
  });

  redisSubscriber.subscribe("typing-events", (message) => {
    const parsedEvents = JSON.parse(message);
    broadcastToRoom(parsedEvents.room, parsedEvents.data, wss);
  });

  // Periodic ping to keep Redis connections alive
  setInterval(() => {
    redisPublisher.ping().catch((err) => console.error("Publisher Ping error:", err));
    redisSubscriber.ping().catch((err) => console.error("Subscriber Ping error:", err));
  }, 60000);

  const broadcastToRoom = (room: string, message: any, wss: Server) => {
    wss.clients.forEach((client) => {
      const customClient = client as CustomWebSocket;
      if (customClient.readyState === WebSocket.OPEN && customClient.room === room) {
        customClient.send(JSON.stringify(message));
      }
    });
  };

  wss.on("connection", (ws: CustomWebSocket, req) => {
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
        } else if (data.type === "typing-start" || data.type === "typing-stop") {
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

    ws.on("close", () => {
      // Handle WebSocket disconnection if needed
    });
  });

  // Periodically check if clients are alive
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

  // Clean up interval and Redis clients on server shutdown
  wss.on("close", () => {
    clearInterval(interval);
    redisPublisher.disconnect();
    redisSubscriber.disconnect();
  });
}
