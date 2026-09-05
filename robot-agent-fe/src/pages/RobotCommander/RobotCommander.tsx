import axios from "axios";
import styles from "./RobotCommander.module.css"
import { useEffect, useState } from "react";

function RobotCommander () {
    const [frame, setFrame] = useState("");
    const commanderUrl = (
        import.meta.env.VITE_BACKEND_REST_URL ?? "http://localhost:8080"
    );
    const handleMove = async (direction: string) => {
        const moveResponse = await axios.post(`${commanderUrl}/move/${direction}`);
        return moveResponse.data;
    };

    useEffect(() => {
        const ws = new WebSocket(
            import.meta.env.VITE_BACKEND_URL ?? 
            "ws://localhost:8080/?subscribeType=camera-frame-consumer"
        );

        ws.onopen = () => {
            console.log("Websocket connection opened");
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "camera-frame") {
                setFrame(`data:image/jpeg;base64,${data.frame.trim()}`);
            };
        };

        ws.onclose = () => {
            console.log("Connection was closed");
        }

        const handleKeyDown = async (event: KeyboardEvent) => {
            const selectedKey = event.key;
            switch (selectedKey) {
                case " ":
                    await handleMove("stop");
                    break;
                case "w":
                    await handleMove("forward");
                    break;
                case "s":
                    await handleMove("backward");
                    break;
                case "a":
                    await handleMove("turn-left");
                    break;
                case "d":
                    await handleMove("turn-right");
                    break;
                default:
                    console.log(`Unavailable key: ${selectedKey}`)
            };
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            if (ws) {
                ws.close();
            }
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div className={styles.robotCommanderPage}>
            <div className={styles.joyStickView}>
                <div className="Commands">
                    <button className={styles.joyStickButton}
                        onClick={() => handleMove("forward")}
                    >
                        🔼
                    </button>
                    <div className={styles.secondJoyStickLine}>
                        <button className={styles.joyStickButton}
                            onClick={() => handleMove("turn-left")}
                        >
                            ◀️
                        </button>
                        <button className={styles.joyStickButton}
                            onClick={() => handleMove("stop")}
                        >
                            🔴
                        </button>
                        <button className={styles.joyStickButton}
                            onClick={() => handleMove("turn-right")}
                        >
                            ▶️
                        </button>
                    </div>
                    <button className={styles.joyStickButton}
                        onClick={() => handleMove("backward")}
                    >
                        🔽
                    </button>
                </div>
            </div>
            <div className={styles.cameraView}>
                {frame ? (
                    <img
                        src={frame}
                    />
                    
                ) : <p>Aguardando frame...</p>}
            </div>
        </div>
    )
};

export default RobotCommander;
