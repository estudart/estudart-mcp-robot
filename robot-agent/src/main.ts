import http from "http";
import express, { Application, Request, Response } from "express";
import { WebSocketServer } from "ws";
import { wssHandler } from "./application/services/wss-handler.service.js";
import robotRoutes from "./presentation/routes/agent.route.js";

export const port: number = Number(process.env.API_PORT) || 8080
export const app: Application = express()
export const server: http.Server = http.createServer(app);
export const wss = new WebSocketServer({ server });
wssHandler(wss);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(robotRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.send("Server is up");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});