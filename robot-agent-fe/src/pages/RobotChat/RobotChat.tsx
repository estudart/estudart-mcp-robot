import { useState, useEffect } from "react";
import ChatMessages from "../../components/ChatMessages";
import styles from "../RobotChat/RobotChat.module.css"

export default function RobotChat() {
    const [message, setMessage] = useState("");
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [history, setHistory] = useState<Record<string, string | boolean>[]>([]);
    const [agent, setAgent] = useState<string>("robot-agent");

    const agents = ["robot-agent", "architecture-agent"];

    useEffect(() => {
        const ws = new WebSocket(
            import.meta.env.VITE_BACKEND_URL ?? "ws://localhost:8080"
        );

        ws.onopen = () => {
            console.log("Websocket connection opened");
            setWebSocket(ws);
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "response") {
                setHistory(prev => [...prev, {
                    message: data.message,
                    isUser: false,
                    agent: data.agent,
                }])
            }
        };

        ws.onclose = () => {
            console.log("Connection was closed");
            setWebSocket(null);
        }

        return () => {
            if (ws) {
                ws.close();
                setWebSocket(null);
            }
        };
    }, []);

    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        webSocket?.send(JSON.stringify({
            type: agent,
            question: message,
        }));
        setHistory(prev => [...prev, { message, isUser: true, agent: agent }]);
        setMessage("");
    };

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatHeader}>
                RaspbotV2 AI Agent 🤖
            </div>
            <div className={styles.chatBox}>
                <div className={styles.sideBar}>
                    {agents.map((a, index) =>
                        <p
                            key={index}
                            className={agent === a ? styles.sideBarOptionsSelected : styles.sideBarOptions}
                            onClick={() => setAgent(a)}
                        >
                            {a}
                        </p>
                    )}
                </div>
                <ChatMessages
                    agent={ agent }
                    message={ message }
                    setMessage={ setMessage }
                    history={ history }
                    handleSendMessage={ handleSendMessage }
                />
            </div>
        </div>
    )
}