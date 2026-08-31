import { useState, useEffect } from "react";
import styles from "./RobotChat.module.css"

export default function Chat() {
    const [message, setMessage] = useState("");
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [history, setHistory] = useState<String[]>([]);

    useEffect(() => {
        const ws = new WebSocket(import.meta.env.VITE_BACKEND_URL);

        ws.onopen = () => {
            console.log("Websocket connection opened");
            setWebSocket(ws);
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "response") {
                setHistory(prev => [...prev, data.message])
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

    const handleSendMessage = (message: string) => {
        webSocket?.send(JSON.stringify({
            type: "robot-agent-command",
            question: message,
        }));
        setHistory(prev => [...prev, message]);
        setMessage("");
    };

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatHeader}>
                RaspbotV2 AI Agent
            </div>
            <div className={styles.chatBox}>
                <div className={styles.sideBar}>
                    Test1
                </div>
                <div className={styles.chatMessages}>
                    <div className={styles.chatHistory}>
                        {history.map((message, index) => 
                            <p key={index}>{message}</p>
                        )}
                    </div>
                    <div className={styles.chatText}>
                        <input
                            type="text"
                            className={styles.chatInputBox}
                            placeholder="Write your message here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button 
                            className={styles.chatButton}
                            onClick={() => handleSendMessage(message)}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}