import { Server, WebSocket } from 'ws';
import prisma from '@repo/db/client';
import { createClient } from 'redis';

interface CustomWebSocket extends WebSocket {
    room?: string;
    userId?: string;
}

export function setupWebSocket(wss: Server) {
    const redisPublisher = createClient({ url: "rediss://default:AZ0pAAIjcDFiNjIyZmViODQ3NWY0N2NiODNlNjEwN2EzMTE4ZTY2N3AxMA@famous-sloth-40233.upstash.io:6379" });
    const redisSubscriber = createClient({ url: "rediss://default:AZ0pAAIjcDFiNjIyZmViODQ3NWY0N2NiODNlNjEwN2EzMTE4ZTY2N3AxMA@famous-sloth-40233.upstash.io:6379" });


    redisPublisher.connect().catch(err => console.error('Redis Publisher Connection Error:', err));
    redisSubscriber.connect().catch(err => console.error('Redis Subscriber Connection Error:', err));

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
            if (customClient.readyState === WebSocket.OPEN && customClient.room === room) {
                customClient.send(JSON.stringify(message));
                sentCount++;
            }
        });
        console.log(`Message broadcasted to ${sentCount} clients in room: ${room}`);
    };

    wss.on('connection', (ws: CustomWebSocket, req) => {
        const params = new URLSearchParams(req.url?.split('?')[1]);
        const room = params.get('room') || '';
        const userId = params.get('userId') || '';
        console.log("user id is : ", userId);
        console.log("room is : ", room);

        if (!room) {
            ws.send(JSON.stringify({ error: 'Invalid room' }));
            ws.close();
            return;
        }

        ws.room = room;
        ws.userId = userId;

        // console.log(`Client connected to room: ${room}. Total clients in room: ${wss.clients.size}`);

        ws.on('message', async (message: string) => {
            try {
                const data = JSON.parse(message);
                console.log('Incoming message data:', data);

                if (data.type === 'chat-message' || !data.type) {  // Fallback to handle missing `type`
                    console.log('Processing chat message...');
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

                    redisPublisher.publish('chat-messages', JSON.stringify({ room: ws.room, data }));
                } else if (data.type === 'typing-start' || data.type === 'typing-stop') {
                    console.log(`Handling typing event: ${data.type}`);
                    redisPublisher.publish('typing-events', JSON.stringify({ room: ws.room, data }));
                } else {
                    console.log('Unknown message type:', data.type);
                }
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });



        // Handle WebSocket disconnection
        ws.on('close', () => {
            console.log(`Client disconnected from room ${ws.room}`);
        });
    });

}
