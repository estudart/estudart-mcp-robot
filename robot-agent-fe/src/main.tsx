import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import RobotChat from './pages/RobotChat/RobotChat'
import RobotCommander from './pages/RobotCommander/RobotCommander'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<RobotChat />*/}
    <RobotCommander />
  </StrictMode>,
)
