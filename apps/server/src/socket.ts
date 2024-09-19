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
            console.log("Your socket is connected", socket.id);

            socket.on("message", (data: string) => {
                console.log("The server side message is...", data);
                if (socket.room) {
                    socket.to(socket.room).emit("message", data);
                    console.log("emitted");
                }
            });
            socket.on("disconnect", () => {
                console.log("The socket is disconnected", socket.id);
            });
    });
}