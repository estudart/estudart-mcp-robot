import { useState, useEffect } from "react";
import styles from "./RobotChat.module.css"

export default function Chat() {
    const [message, setMessage] = useState("");
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const [history, setHistory] = useState<Record<string, string | boolean>[]>([]);

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
                    isUser: false
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
            type: "robot-agent-command",
            question: message,
        }));
        setHistory(prev => [...prev, { message, isUser: true }]);
        setMessage("");
    };

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatHeader}>
                RaspbotV2 AI Agent 🤖
            </div>
            <div className={styles.chatBox}>
                <div className={styles.sideBar}>
                    Test1
                </div>
                <div className={styles.chatMessages}>
                    <div className={styles.chatHistory}>
                        {history.map((data, index) =>
                            <div className={data.isUser ? styles.userMessageContainer : styles.agentMessageContainer}>
                                <p key={index} className={data.isUser ? styles.userMessage : styles.agentMessage}>
                                    {data.message}
                                </p>
                            </div>
                        )}
                    </div>
                    <form
                        className={styles.chatText}
                        onSubmit={handleSendMessage}
                    >
                        <input
                            type="text"
                            className={styles.chatInputBox}
                            placeholder="Say hi to Robby!"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button 
                            className={styles.chatButton}
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}