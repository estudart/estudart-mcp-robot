import { WebSocketServer, WebSocket } from "ws";
import { Stream } from "node:stream";
import { IncomingMessage } from "node:http";
import { RobotAssistent } from "./robot-assistent.service.js";
import { UnknownAgentError } from "../errors/unknown-agent.error.js";


export class WebSocketService {
    _wss: WebSocketServer;
    _robotAssistent: RobotAssistent;
    _connections: WebSocket[];

    constructor(
        robotAssistent: RobotAssistent,
    ) {
        this._wss = new WebSocketServer({ noServer: true });
        this._robotAssistent = robotAssistent;
        this.setEventHandlers();
        this._connections = [];
    }

    setEventHandlers() {
        this._wss.on("connection", (ws: WebSocket, request: IncomingMessage) => {
            const urlParams = new URL(request.url || '', 'http://localhost').searchParams;

            if (urlParams.get("subscribeType") === "robot-data-consumer") {
                this._connections.push(ws);
            }

            console.log("New client connected");

            ws.on("message", async (message) => {
                let response;
                try {
                    const data = JSON.parse(message.toString());
                    const dataType = data.type;
                    // console.log(`New message: ${JSON.stringify(data.type)}`);
                    if (dataType === "camera-frame") {
                        // console.log("received message from camera");
                        if (this._connections.length) {
                            this._connections.forEach((connection) => {
                                connection.send(JSON.stringify({ type: dataType, frame: data.message }))
                            })
                        }
                    } else if (dataType === "distance-cm") {
                        if (this._connections.length) {
                            this._connections.forEach((connection) => {
                                connection.send(JSON.stringify({ type: dataType, distance: data.message }))
                            })
                        }
                    } else {
                        const agent = dataType;
                        const question = data.question;

                        response = await this._robotAssistent.invoke(agent, question);

                        ws.send(JSON.stringify({ type: "response", message: response, agent }))
                    };
                } catch (error) {
                    if (error instanceof UnknownAgentError) {
                        ws.send(JSON.stringify({
                            type: "error",
                            message: `${error}`
                        }));
                    } else {
                        ws.send(JSON.stringify({
                            type: "error",
                            message: `${error}`
                        }));
                    }
                };
            });

            ws.on('close', () => console.log("Connection closed"));
        })
    }

    handleUpgrade(request: IncomingMessage, socket: Stream.Duplex, upgradeHead: Buffer) {
        this._wss.handleUpgrade(request, socket, upgradeHead, (ws) => {
            this._wss.emit('connection', ws, request);
        }) 
    }

}
