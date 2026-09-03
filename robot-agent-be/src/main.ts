import http from "http";
import { Stream } from "node:stream";
import { IncomingMessage } from "node:http";
import express, { Application, Request, Response } from "express";
import { webSocketService } from "./dependencies.js";
import robotRoutes from "./presentation/routes/agent.route.js";

export const port: number = Number(process.env.API_PORT) || 8080
export const app: Application = express()
export const server: http.Server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(robotRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.send("Server is up");
});

server.on('upgrade',  (request: IncomingMessage, socket: Stream.Duplex, upgradeHead: Buffer) => {
    webSocketService.handleUpgrade(request, socket, upgradeHead);
});
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});