
import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'

import Header from '../components/Header'
import logo from '../assets/Logo.png'
import { historiaEquipos } from '../data/historiaEquipos'
import Footer from '../components/Footer'

const rondas = [
  'Octavos de final',
  'Cuartos de final',
  'Semifinal',
  'Final',
]

function TuCamino() {
  const navigate = useNavigate()
  const location = useLocation()

  const historial = location.state?.historial || []
  if (historial.length !== 4) {
  return <Navigate to="/" replace />
}

  const equiposEnCamino = historial.map((partido, indice) => ({
    ...partido.rival,
    ronda: rondas[indice],
    historia: historiaEquipos[partido.rival.id],
  }))

  const [equipoSeleccionado, setEquipoSeleccionado] = useState(
    equiposEnCamino[0]?.id || null
  )

  const equipoActual = equiposEnCamino.find(
    equipo => equipo.id === equipoSeleccionado
  )

  return (
    <div className="pantalla tu-camino">
      <Header />

      <main className="contenido-tu-camino">
        <section className="encabezado-tu-camino">
          <img
  src={logo}
  alt="La Liga de los Campeones"
  onClick={() => navigate('/')}
/>

          <div>
            <h1>TU CAMINO</h1>
            <p>
              CONOCÉ LA HISTORIA DE LOS GRANDES EQUIPOS QUE ENFRENTASTE
            </p>
          </div>
        </section>

        <section className="paneles-tu-camino">

          <aside className="lista-equipos-camino">
            <h2>EQUIPOS EN TU CAMINO</h2>

            <div className="lista-equipos-scroll">
              {equiposEnCamino.map(equipo => (
                <button
                  key={equipo.id}
                  className={`equipo-camino ${
                    equipoSeleccionado === equipo.id ? 'activo' : ''
                  }`}
                  onClick={() => setEquipoSeleccionado(equipo.id)}
                >
                  <img
                    src={equipo.historia?.escudo}
                    alt={`Escudo de ${equipo.nombre}`}
                  />

                  <div>
                    <h3>{equipo.nombre} {equipo.anio}</h3>
                    <p>{equipo.ronda}</p>
                  </div>

                  <span>›</span>
                </button>
              ))}
            </div>
          </aside>

          <section className="ficha-historica">
            {equipoActual ? (
              <>
                <div className="ficha-encabezado">
                  <img
                    src={equipoActual.historia?.escudo}
                    alt={`Escudo de ${equipoActual.nombre}`}
                  />

                  <h2>
                    {equipoActual.nombre} {equipoActual.anio}
                  </h2>
                </div>

                <div className="ficha-contenido">
                  <div className="ficha-historia">
                    <p>{equipoActual.historia?.historia}</p>
                  </div>

<div className="ficha-foto">
  <img
    src={equipoActual.historia?.foto}
    alt={`Plantel histórico de ${equipoActual.nombre} ${equipoActual.anio}`}
  />
</div>
                </div>

                <div className="ficha-logros">
                  <h3>🏆 PRINCIPALES LOGROS</h3>

                  <ul>
                    {equipoActual.historia?.logros.map((logro, indice) => (
                      <li key={indice}>{logro}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p className="sin-equipos-camino">
                No hay equipos para mostrar todavía.
              </p>
            )}
          </section>

        </section>

        <button
          className="boton-volver-camino"
          onClick={() => navigate('/')}
        >
          VOLVER AL MENÚ ›
        </button>
      </main>

      <Footer />
    </div>
    
  )
}

export default TuCamino
