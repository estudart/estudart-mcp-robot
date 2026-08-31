import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RobotChat from './pages/RobotChat'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RobotChat />
  </StrictMode>,
)
