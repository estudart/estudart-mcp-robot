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

robotCommanderRoutes.post('/led/setAllLeds', (req: Request, res: Response) => {
    const { color } = req.query;
    if (color !== undefined && typeof color === 'string') {
        runCommand(res, () => robotCommanderService.setAllLeds(color));
    } else {
        res.status(502).json({
            status: "error", message: "Color must be sent in the query params"
        });
    };
});

robotCommanderRoutes.post("/servo/setPanAngle", (req: Request, res: Response) => {
    const { angle } = req.query;
    const casted = Number(angle);
    if (angle !== undefined && !Number.isNaN(casted)) {
        runCommand(res, () => robotCommanderService.setPanAngle(Number(angle)));
    } else {
        res.status(502).json({
            status: "error", message: "Could not set pan angle"
        });
    };
});

robotCommanderRoutes.post("/servo/setTiltAngle", (req: Request, res: Response) => {
    const { angle } = req.query;
    const casted = Number(angle);
    if (angle !== undefined && !Number.isNaN(casted)) {
        runCommand(res, () => robotCommanderService.setTiltAngle(Number(angle)));
    } else {
        res.status(502).json({
            status: "error", message: "Could not set tilt angle"
        });
    };
});

robotCommanderRoutes.post("/servo/servoHome", (req: Request, res: Response) => {
    runCommand(res, () => robotCommanderService.setServoHome());
});
