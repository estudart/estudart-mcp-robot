import axios from "axios";
import styles from "./RobotCommander.module.css"

function RobotCommander () {
    const commanderUrl = (
        import.meta.env.VITE_BACKEND_REST_URL ?? "http://localhost:8080"
    );
    const handleMove = async (direction: string) => {
        const moveResponse = await axios.post(`${commanderUrl}/move/${direction}`);
        return moveResponse.data;
    };

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
                CAMERA
            </div>
        </div>
    )
};

export default RobotCommander;
