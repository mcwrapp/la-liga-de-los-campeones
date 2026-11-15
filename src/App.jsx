
import './App.css'

import { useEffect, useRef } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useNavigationType,
} from 'react-router-dom'

import Inicio from './pages/Inicio'
import Juego from './pages/Juego'
import Playoffs from './pages/Playoffs'
import TuCamino from './pages/TuCamino'

function ControlarRetroceso() {
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const primeraCarga = useRef(true)

  useEffect(() => {
    if (primeraCarga.current) {
      primeraCarga.current = false
      return
    }

    if (navigationType === 'POP') {
      navigate('/', { replace: true })
    }
  }, [navigationType, navigate])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ControlarRetroceso />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/playoffs" element={<Playoffs />} />
        <Route path="/tu-camino" element={<TuCamino />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
