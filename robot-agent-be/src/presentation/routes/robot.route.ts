import express, { Request, Response } from "express"

import { robotCommanderService } from "../../dependencies.js";

export const robotCommanderRoutes = express.Router();

const runCommand = async (res: Response, command: () => Promise<unknown>) => {
    try {
        await command();
        res.json({ status: "ok" });
    } catch (error) {
        res.status(502).json({ status: "error", message: `${error}` });
    }
};

robotCommanderRoutes.post('/move/forward', (req: Request, res: Response) =>
    runCommand(res, () => robotCommanderService.moveForward())
);

robotCommanderRoutes.post('/move/backward', (req: Request, res: Response) =>
    runCommand(res, () => robotCommanderService.moveBackward())
);

robotCommanderRoutes.post('/move/turn-left', (req: Request, res: Response) =>
    runCommand(res, () => robotCommanderService.turnLeft())
);

robotCommanderRoutes.post('/move/turn-right', (req: Request, res: Response) =>
    runCommand(res, () => robotCommanderService.turnRight())
);

robotCommanderRoutes.post('/move/stop', (req: Request, res: Response) =>
    runCommand(res, () => robotCommanderService.stop())
);
