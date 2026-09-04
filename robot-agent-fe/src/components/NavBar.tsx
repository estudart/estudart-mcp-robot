import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css"

export default function NavBar() {
    return (
      <nav className={styles.navbar}>
        <header className={styles.navbarTitle}>RaspbotV2 🤖</header>
        <Link to="/robot-chat">RobotChat</Link> |{" "}
        <Link to="/robot-commander">RobotCommander</Link>
      </nav>
    )
}