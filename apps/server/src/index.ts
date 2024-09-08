import express, { Request, Response } from "express";
import { createServer } from "http";
import Routes from "./routes/index";
import cors from "cors"

const app = express();
app.use(cors())
const PORT = process.env.PORT || 7001;

const server = createServer(app);

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.send("Server started");
})

app.use("/api",Routes)

server.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
}).on('error', (err) => {
    console.error("Server failed to start:", err.message);
});
