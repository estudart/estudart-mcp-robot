import express, { Application, Request, Response } from "express"

import { robotAssistent } from "../../dependencies.js";

export const app: Application = express()
export const port: number = Number(process.env.API_PORT) ?? 3000

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.send("Server is up");
});

// Agent
app.post('/robot-agent', async (req: Request, res: Response) => {
    console.log(req.body.question)
    const agentAswer = await robotAssistent.invoke(req.body.question);
    res.send(`${agentAswer}`);
});
