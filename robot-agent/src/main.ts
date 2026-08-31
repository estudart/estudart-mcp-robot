import http from "http";
import express, { Application, Request, Response } from "express";
import { WebSocketServer } from "ws";
import { initWebSocket } from "./presentation/wss/wsHandler.js";
import robotRoutes from "./presentation/routes/agent.route.js";

export const app: Application = express()
export const server: http.Server = http.createServer(app);
export const wss = new WebSocketServer({ server });
initWebSocket(wss);
export const port: number = Number(process.env.API_PORT) || 8080

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(robotRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.send("Server is up");
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});