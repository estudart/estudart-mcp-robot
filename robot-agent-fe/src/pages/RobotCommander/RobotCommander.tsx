import axios from "axios";
import styles from "./RobotCommander.module.css"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"

function RobotCommander () {
    const [tiltAngle, setTiltAngle] = useState<number>(25);
    const [panAngle, setPanAngle] = useState<number>(90);
    const [distance, setDistance] = useState<string>("0")
    const [frame, setFrame] = useState("");
    const [ledColor, setLedColor] = useState<string>("WHITE");

    const ledColorsOptions = {
        "BLUE": "#0000FF",
        "RED": "#FF0000",
        "GREEN": "#00FF00",
        "YELLOW": "#FFFF00",
        "PURPLE": "#800080",
        "WHITE": "#FFFFFF"
    };

    const commanderUrl = (
        import.meta.env.VITE_BACKEND_REST_URL ?? "http://localhost:8080"
    );

    const handlePanAngle = async (angle: number = 20, direction: string) => {
        if (direction == "left") {
            if (panAngle <= 0) return;
            setPanAngle(prevAngle => prevAngle - angle)
        } else if (direction == "right") {
            if (panAngle >= 180) return;
            setPanAngle(prevAngle => prevAngle + angle);
        } else console.log(`Invalid direction: ${direction}`);
    };

    useEffect(() => {
        axios.post(`${commanderUrl}/servo/setPanAngle?angle=${panAngle}`)
        .catch(err => console.log(`Could not set pan angle, reason: ${err}`));
    }, [panAngle]);

    const handleTiltAngle = async (angle: number = 20, direction: string) => {
        if (direction == "down") {
            if (tiltAngle >= 110) return;
            setTiltAngle(prevAngle => prevAngle - angle);
        } else if (direction == "up") {
            if (tiltAngle <= 0) return;
            setTiltAngle(prevAngle => prevAngle + angle);
        } else console.log(`Invalid direction: ${direction}`);
    };

    useEffect(() => {
        axios.post(`${commanderUrl}/servo/setTiltAngle?angle=${tiltAngle}`)
        .catch(err => console.log(`Could not set tilt angle, reason: ${err}`));
    }, [tiltAngle]);

    const handleLedColorChange = async (color: string) => {
        setLedColor(color);
    };

    useEffect(() => {
        axios.post(`${commanderUrl}/led/setAllLeds?color=${ledColor}`)
        .catch(err => console.log(`Could not change led color, reason: ${err}`));
    }, [ledColor])

    const handleMove = async (direction: string) => {
        try {
            const moveResponse = await axios.post(`${commanderUrl}/move/${direction}`);
            return moveResponse.data;
        } catch (error) {
            console.log(`Could not move robot, reason: ${error}`);
        };
    };

    useEffect(() => {
        const url = (
            import.meta.env.VITE_BACKEND_URL ?? 
            "ws://localhost:8080"
        )
        const ws = new WebSocket(`${url}/?subscribeType=robot-data-consumer`);

        ws.onopen = () => {
            console.log("Websocket connection opened");
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const dataType = data.type;
            if (dataType === "camera-frame") {
                setFrame(`data:image/jpeg;base64,${data.frame.trim()}`);
            } else if (dataType === "distance-cm") {
                setDistance(data.distance);
            };
        };

        ws.onclose = () => {
            console.log("Connection was closed");
        }

        const handleKeyDown = async (event: KeyboardEvent) => {
            const selectedKey = event.key;
            if (selectedKey == " ") event.preventDefault();
            if (event.repeat) return;

            switch (selectedKey) {
                case "p":
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
                <div className={styles.distanceTracker}>
                    {<p>Distance: {distance}</p>}
                </div>
                <div className={styles.colorPannel}>
                    {Object.entries(ledColorsOptions).map((color) => 
                        <button
                            className={ 
                                ledColor === color[0] 
                                ? styles.colorPannelButtonClicked 
                                : styles.colorPannelButton
                            }
                            style={{ backgroundColor: color[1] }}
                            onClick={() => handleLedColorChange(color[0])}
                        >
                            {color[0]}
                        </button>
                    )}
                </div>
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
                    <>
                        <img
                            className={ styles.cameraFrame }
                            src={frame}
                        />
                        <div className={styles.cameraViewArrows}>
                            <div className={styles.cameraViewArrowsTop}>
                                <ChevronUp
                                    onClick={() => handleTiltAngle(10, "up")}
                                />
                            </div>
                            <div className={styles.cameraViewArrowsMiddles}>
                                <ChevronLeft 
                                    onClick={() => handlePanAngle(10, "left")}
                                />
                                <ChevronRight
                                    onClick={() => handlePanAngle(10, "right")}
                                />
                            </div>
                            <div className={styles.cameraViewArrowsTop}>
                                <ChevronDown
                                    onClick={() => handleTiltAngle(10, "down")}
                                />
                            </div>
                        </div>
                    </>
                ) : <p>Waiting frame...</p>}
            </div>
        </div>
    )
};

export default RobotCommander;
