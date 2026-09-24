import { useState } from "react";
import useWebSocket from "../../hooks/webSocketHook";
import ChatMessages from "../../components/ChatMessages";
import styles from "../RobotChat/RobotChat.module.css"

function RobotChat() {
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState<Record<string, string | boolean>[]>([]);
    const [agent, setAgent] = useState<string>("robot-agent");

    const agents = ["robot-agent", "architecture-agent"];

    const handleMessage = (data: Record<any, any>) => {
        if (data.type === "response") {
            setHistory(prev => [...prev, {
                message: data.message,
                isUser: false,
                agent: data.agent,
            }])
        }
    }

    const { send } = useWebSocket(
        import.meta.env.VITE_BACKEND_URL ?? "ws://localhost:8080",
        {
            onMessage: (data: Record<any, any>) => handleMessage(data),
            onClose: undefined,
            onOpen: undefined,
            reconnect: true
        }
    );

    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        send(JSON.stringify({
            type: agent,
            question: message,
        }));
        setHistory(prev => [...prev, { message, isUser: true, agent: agent }]);
        setMessage("");
    };

    return (
        <div className={styles.chatPage}>
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

export default RobotChat;
