import { describe, it, after, before } from "node:test";
import assert from "node:assert/strict";
import http from "http";
import { RobotCommanderService } from "../../../application/services/robot-commander.service";
import express, { Application, Request, Response } from "express";
import { FakeRobotRestAdapter } from "../../fakes/fake-robot-rest-adapter";
import { resolve } from "node:dns";


describe(RobotCommanderService.name, () => {
    let app: Application;
    let fakeRobotAdapter: FakeRobotRestAdapter;
    let port: number;
    let robotCommanderService: RobotCommanderService;
    let server: http.Server;

    before(() => {
        port = 8080;
        app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.post("/move/forward", (req: Request, res: Response) => {
            res.send("Moved forward");
        })
        app.post("/move/backward", (req: Request, res: Response) => {
            res.send("Moved backward");
        })
        app.post("/move/turn-left", (req: Request, res: Response) => {
            res.send("Turned left");
        })
        app.post("/move/turn-right", (req: Request, res: Response) => {
            res.send("Turned right");
        })
        app.post("/move/stop", (req: Request, res: Response) => {
            res.send("Stopped");
        })

        server = app.listen(port, () => {});

        fakeRobotAdapter = new FakeRobotRestAdapter(`http://localhost:${port}`);
        robotCommanderService = new RobotCommanderService(fakeRobotAdapter);
    });

    after(() => {
        return new Promise<void>((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    })

    it('Tests Robot Commander succesfully calls movement forward', async () => {
        const response = await robotCommanderService.moveForward();
        assert.deepEqual(response.data, "Moved forward");
    });

    it('Tests Robot Commander succesfully calls movement backward', async () => {
        const response = await robotCommanderService.moveBackward();
        assert.deepEqual(response.data, "Moved backward");
    });

    it('Tests Robot Commander succesfully calls turn left', async () => {
        const response = await robotCommanderService.turnLeft();
        assert.deepEqual(response.data, "Turned left");
    });

    it('Tests Robot Commander succesfully calls turn right', async () => {
        const response = await robotCommanderService.turnRight();
        assert.deepEqual(response.data, "Turned right");
    });

    it('Tests Robot Commander succesfully calls stop', async () => {
        const response = await robotCommanderService.stop();
        assert.deepEqual(response.data, "Stopped");
    });
})