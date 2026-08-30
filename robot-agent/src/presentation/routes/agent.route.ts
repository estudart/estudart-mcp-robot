import express, { Request, Response } from "express"

import { robotAssistent } from "../../dependencies.js";

const robotRoutes = express.Router()

// Health check
robotRoutes.get('/health', (req: Request, res: Response) => {
    res.send("Server is up");
});

// Agent
robotRoutes.post('/robot-agent', async (req: Request, res: Response) => {
    console.log(req.body.question)
    const agentAswer = await robotAssistent.invoke(req.body.question);
    res.send(`${agentAswer}`);
});

export default robotRoutes;
