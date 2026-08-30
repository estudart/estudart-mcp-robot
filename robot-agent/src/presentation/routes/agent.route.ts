import express, { Request, Response } from "express"

import { robotAssistent } from "../../dependencies.js";

const robotRoutes = express.Router()

// Agent
robotRoutes.post('/robot-agent', async (req: Request, res: Response) => {
    console.log(req.body.question)
    const agentAswer = await robotAssistent.invoke(req.body.question);
    res.send(`${agentAswer}`);
});

export default robotRoutes;
