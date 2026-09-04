import http from "http";
import { Stream } from "node:stream";
import { IncomingMessage } from "node:http";
import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { webSocketService } from "./dependencies.js";
import robotAssistentRoutes from "./presentation/routes/agent.route.js";
import { robotCommanderRoutes } from "./presentation/routes/robot.route.js";

export const port: number = Number(process.env.API_PORT) || 8080
export const app: Application = express()
export const server: http.Server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(robotAssistentRoutes);
app.use(robotCommanderRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.send("Server is up");
});

server.on('upgrade',  (request: IncomingMessage, socket: Stream.Duplex, upgradeHead: Buffer) => {
    webSocketService.handleUpgrade(request, socket, upgradeHead);
});
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});