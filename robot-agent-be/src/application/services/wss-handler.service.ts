import { WebSocketServer } from "ws";
import { Stream } from "node:stream";
import { IncomingMessage } from "node:http";
import { RobotAssistent } from "./robot-assistent.service";
import { UnknownAgentError } from "../errors/unknown.error";


export class WebSocketService {
    _wss: WebSocketServer;
    _robotAssistent: RobotAssistent;

    constructor(
        robotAssistent: RobotAssistent,
    ) {
        this._wss = new WebSocketServer({ noServer: true });
        this._robotAssistent = robotAssistent;
        this.setEventHandlers();
    }

    setEventHandlers() {
        this._wss.on("connection", (ws) => {
            console.log("New client connected");

            ws.on("message", async (message) => {
                let response;
                try {
                    const data = JSON.parse(message.toString());
                    console.log(`New message: ${JSON.stringify(data)}`);

                    const agent = data.type;
                    const question = data.question;

                    response = await this._robotAssistent.invoke(agent, question);

                    ws.send(JSON.stringify({ type: "response", message: response, agent }))
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
