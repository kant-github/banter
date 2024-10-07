import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import Routes from "./routes/index";
import { setupSocket } from "./socket";
import redis from "./config/redis.config";
import { cloudinaryConnect } from "./config/cloudinary.config";
import fileUpload from "express-fileupload"

const app = express();
app.use(cors());
app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
)
cloudinaryConnect();

const PORT = process.env.PORT || 7001;
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
    adapter: createAdapter(redis),
});
setupSocket(io);

app.get("/", (req: Request, res: Response) => {
    res.send("Server started");
});

app.use("/api", Routes);

server.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
}).on("error", (err) => {
    console.error(`Server failed to start on port ${PORT}:`, err.message);
});
