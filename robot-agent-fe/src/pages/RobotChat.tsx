import { useState } from "react";
import styles from "./RobotChat.module.css"

export default function Chat() {
    const [message, setMessage] = useState("");

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
                        history
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
                            onClick={() => console.log("hi")}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}