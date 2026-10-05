import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Inicio from './pages/Inicio'
import Juego from './pages/Juego'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Inicio />} />

        <Route path="/juego" element={<Juego />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App