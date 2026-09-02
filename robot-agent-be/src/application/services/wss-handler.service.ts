import { WebSocketServer } from "ws";
import { robotAgent } from "../../dependencies.js";
import { architectureAgent } from "../../dependencies.js";

interface WSMessage {
    type: string;
    question?: any;
}

export function wssHandler(wss: WebSocketServer) {
    wss.on("connection", (ws) => {
        console.log("New client connected");

        ws.on("message", async (message) => {
            let response;
            try {
                const data = JSON.parse(message.toString()) as WSMessage;
                console.log(`New message: ${JSON.stringify(data)}`);

                if (data.type === "robot-agent") {
                    response = await robotAgent.invokeAgent(data.question);

                    ws.send(JSON.stringify({
                        type: "response",
                        message: response,
                        agent: "robot-agent",
                    }));
                };

                if (data.type === "architecture-agent") {
                    response = await architectureAgent.invokeAgent(data.question);

                    ws.send(JSON.stringify({
                        type: "response",
                        message: response,
                        agent: "architecture-agent",
                    }));
                };

                
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
