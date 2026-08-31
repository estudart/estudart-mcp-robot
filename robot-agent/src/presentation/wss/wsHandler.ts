import { WebSocketServer } from "ws";
import { robotAgent } from "../../dependencies.js";

interface WSMessage {
    type: string;
    question?: any;
}

export function initWebSocket(wss: WebSocketServer) {
    wss.on("connection", (ws) => {
        console.log("New client connected");

        ws.on("message", async (message) => {
            let response;
            try {
                const data = JSON.parse(message.toString()) as WSMessage;
                console.log(`New message: ${JSON.stringify(data)}`);

                if (data.type == "robot-agent-command") {
                    response = await robotAgent.invokeAgent(data.question);
                };

                ws.send(JSON.stringify({
                    type: "response",
                    message: response
                }));
                
            } catch (error) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: `Error: ${error}`
                }));
            };
        });

        wss.on('close', () => console.log("Connection closed"));
    })
    
}