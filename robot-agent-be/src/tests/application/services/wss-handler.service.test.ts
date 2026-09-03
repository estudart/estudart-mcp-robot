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
import { RobotAssistent } from "../../../application/services/robot-assistent.service";
import { UnknownAgentError } from "../../../application/errors/unknown.error";


describe(WebSocketService.name, () => {
    let port: number;
    let fakeRobotAgent!: FakeRobotAgent
    let fakeArchAgent!: FakeArchAgent;
    let robotAssistent!: RobotAssistent
    let app!: Application;
    let server!: http.Server;
    let sut!: WebSocketService;
    
    beforeEach(() => {
        port = 3000;
        fakeRobotAgent = new FakeRobotAgent();
        fakeArchAgent = new FakeArchAgent();
        robotAssistent = new RobotAssistent(fakeRobotAgent, fakeArchAgent);

        app = express();
        server = http.createServer(app);
        sut = new WebSocketService(robotAssistent)

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

    it('It tests RobotAgent is called', async () => {
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

    it('It tests ArchAgent is called', async () => {
        const question = "can you turn the led blue please?"
        const wssClient = new WebSocket(`ws://localhost:${port}`);

        const responseMessage = await new Promise( async (resolve, reject) => {
            wssClient.onopen = () => { 
                wssClient.send(JSON.stringify({type: "architecture-agent", question}))
            };
            wssClient.onmessage = (message) => {
                const data = JSON.parse(message.data.toString());
                resolve(data.message);
            }
            setTimeout(() => reject(new Error('Wrong reponse')), 2000);
        })

        wssClient.close();

        assert.deepEqual(responseMessage, `FakeArchAgent: ${question}`);
    });

    it('It tests bad agent name throws UnknownAgentError', async () => {
        const question = "can you turn the led blue please?"
        const wssClient = new WebSocket(`ws://localhost:${port}`);

        const agent = "architeture-agent";

        const responseMessage = await new Promise( async (resolve, reject) => {
            wssClient.onopen = () => { 
                wssClient.send(JSON.stringify({type: agent, question}))
            };
            wssClient.onmessage = (message) => {
                const data = JSON.parse(message.data.toString());
                resolve(data.message);
            }
            setTimeout(() => reject(new Error('Wrong reponse')), 2000);
        })

        wssClient.close();

        assert.deepEqual(responseMessage, `UnknownAgentError: Agent ${agent} does not exist!`);
    });
});
