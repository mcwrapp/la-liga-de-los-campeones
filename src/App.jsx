import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Inicio from './pages/Inicio'
import Juego from './pages/Juego'
import Playoffs from './pages/Playoffs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/playoffs" element={<Playoffs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App