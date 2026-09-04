import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import RobotChat from './pages/RobotChat/RobotChat'
import RobotCommander from './pages/RobotCommander/RobotCommander'
import NavBar from './components/NavBar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/robot-commander' element={<RobotCommander/>}/>
      </Routes>
      <Routes>
        <Route path='/robot-chat' element={<RobotChat/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
