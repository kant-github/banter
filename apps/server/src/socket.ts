import prisma from "@repo/db/client";
import { Server, Socket } from "socket.io";


interface customSocket extends Socket {
    room?: string
}

export function setupSocket(io: Server) {

    io.use((socket: customSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room"));
        }
        socket.room = room
        next();
    })

    io.on("connection", (socket: customSocket) => {
            socket.join(socket.room!)

            socket.on("message", async (data) => {
                                
                await prisma.chats.create({
                    data: {
                        id: data.id,
                        message: data.message,
                        name: data.name,
                        group_id: data.group_id,
                        user_id: data.user_id,
                        created_at: data.created_at
                    }
                });
                

                if (socket.room) {
                    socket.to(socket.room).emit("message", data);
                }
            });
            socket.on("disconnect", () => {
                console.log("The socket is disconnected", socket.id);
            });
    });
}