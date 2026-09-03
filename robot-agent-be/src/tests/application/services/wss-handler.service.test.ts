import WebSocket from "ws";
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "http";
import express, { Application } from "express";
import { Stream } from "node:stream";
import { IncomingMessage } from "node:http";
import { WebSocketService } from "../../../application/services/wss-handler.service";
import { FakeRobotAgent } from "../../fakes/fake-robot-agent";
import { FakeArchAgent } from "../../fakes/fake-arch-agent";


describe(WebSocketService.name, () => {
    let port: number;
    let fakeRobotAgent!: FakeRobotAgent
    let fakeArchAgent!: FakeArchAgent;
    let app!: Application;
    let server!: http.Server;
    let sut!: WebSocketService;
    
    beforeEach(() => {
        port = 3000;
        fakeRobotAgent = new FakeRobotAgent();
        fakeArchAgent = new FakeArchAgent();

        app = express();
        server = http.createServer(app);
        sut = new WebSocketService(fakeRobotAgent, fakeArchAgent)

        server.on('upgrade',  (request: IncomingMessage, socket: Stream.Duplex, upgradeHead: Buffer) => {
            sut.handleUpgrade(request, socket, upgradeHead);
        });
        server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        });
    });

    afterEach(() => {
        server.close();
    })

    it('It tests agent is called', async () => {
        const question = "can you turn the led blue please?"
        const wssClient = new WebSocket(`ws://localhost:${port}`);

        const responseMessage = await new Promise( async (resolve, reject) => {
            wssClient.onopen = () => {wssClient.send(JSON.stringify({type: "robot-agent", question}))};
            wssClient.onmessage = (message) => {
                const data = JSON.parse(message.data.toString());
                resolve(data.message);
            }
            setTimeout(() => reject(new Error('Wrong reponse')), 2000);
        })

        wssClient.close();

        assert.deepEqual(responseMessage, `FakeRobotAgent: ${question}`);
    });
});
