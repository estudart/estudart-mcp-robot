import express, { Request, Response } from "express"

import { robotAssistent } from "../../dependencies.js";

const robotAssistentRoutes = express.Router()

robotAssistentRoutes.post('/robot-assistent', async (req: Request, res: Response) => {
    console.log(req.body.question)
    const agentAswer = await robotAssistent.invoke("robot-agent", req.body.question);
    res.send(`${agentAswer}`);
});

robotAssistentRoutes.post('/architecture-agent', async (req: Request, res: Response) => {
    console.log(req.body.question)
    const agentAswer = await robotAssistent.invoke("architecture-agent", req.body.question);
    res.send(`${agentAswer}`);
});

export default robotAssistentRoutes;
