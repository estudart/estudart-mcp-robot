import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'
import RobotChat from './pages/RobotChat/RobotChat'
import RobotCommander from './pages/RobotCommander/RobotCommander'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <nav>
        <Link to="/robot-commander">RobotCommander</Link> |{" "}
        <Link to="/robot-chat">RobotChat</Link> |{" "}
      </nav>
      <Routes>
        <Route path='/robot-commander' element={<RobotCommander/>}/>
      </Routes>
      <Routes>
        <Route path='/robot-chat' element={<RobotChat/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
