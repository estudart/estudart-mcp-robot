import { WebSocketServer } from "ws";
import { Stream } from "node:stream";
import { IncomingMessage } from "node:http";
import { RobotAssistent } from "./robot-assistent.service";

interface WSMessage {
    type: "robot-agent" | "architecture-agent";
    question?: any;
}

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
                    const data = JSON.parse(message.toString()) as WSMessage;
                    console.log(`New message: ${JSON.stringify(data)}`);

                    const agent = data.type;
                    const question = data.question;

                    response = await this._robotAssistent.invoke(agent, question);

                    ws.send(JSON.stringify({ type: "response", message: response, agent }))                    
                } catch (error) {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: `Error: ${error}`
                    }));
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
