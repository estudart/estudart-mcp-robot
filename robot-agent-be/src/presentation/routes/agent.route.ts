import express, { Request, Response } from "express"

import { robotAssistent } from "../../dependencies.js";

const robotRoutes = express.Router()

// Agent
robotRoutes.post('/robot-assistent', async (req: Request, res: Response) => {
    console.log(req.body.question)
    const agentAswer = await robotAssistent.invoke("robot-agent", req.body.question);
    res.send(`${agentAswer}`);
});

robotRoutes.post('/architecture-agent', async (req: Request, res: Response) => {
    console.log(req.body.question)
    const agentAswer = await robotAssistent.invoke("architecture-agent", req.body.question);
    res.send(`${agentAswer}`);
});

export default robotRoutes;
