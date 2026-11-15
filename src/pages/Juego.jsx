
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import logo from '../assets/Logo.png'
import { equipos } from '../data/equipos'

const formaciones = {
  '4-4-2': [
    { categoria: 'DEL', left: 38, top: 17 },
    { categoria: 'DEL', left: 62, top: 17 },
    { categoria: 'MED', left: 15, top: 42 },
    { categoria: 'MED', left: 38, top: 42 },
    { categoria: 'MED', left: 62, top: 42 },
    { categoria: 'MED', left: 85, top: 42 },
    { categoria: 'DEF', left: 15, top: 68 },
    { categoria: 'DEF', left: 38, top: 68 },
    { categoria: 'DEF', left: 62, top: 68 },
    { categoria: 'DEF', left: 85, top: 68 },
    { categoria: 'ARQ', left: 50, top: 87 },
  ],
  '4-3-3': [
    { categoria: 'DEL', left: 25, top: 17 },
    { categoria: 'DEL', left: 50, top: 17 },
    { categoria: 'DEL', left: 75, top: 17 },
    { categoria: 'MED', left: 25, top: 43 },
    { categoria: 'MED', left: 50, top: 43 },
    { categoria: 'MED', left: 75, top: 43 },
    { categoria: 'DEF', left: 15, top: 68 },
    { categoria: 'DEF', left: 38, top: 68 },
    { categoria: 'DEF', left: 62, top: 68 },
    { categoria: 'DEF', left: 85, top: 68 },
    { categoria: 'ARQ', left: 50, top: 87 },
  ],
  '5-3-2': [
    { categoria: 'DEL', left: 38, top: 17 },
    { categoria: 'DEL', left: 62, top: 17 },
    { categoria: 'MED', left: 25, top: 43 },
    { categoria: 'MED', left: 50, top: 43 },
    { categoria: 'MED', left: 75, top: 43 },
    { categoria: 'DEF', left: 10, top: 68 },
    { categoria: 'DEF', left: 30, top: 68 },
    { categoria: 'DEF', left: 50, top: 68 },
    { categoria: 'DEF', left: 70, top: 68 },
    { categoria: 'DEF', left: 90, top: 68 },
    { categoria: 'ARQ', left: 50, top: 87 },
  ],
  '3-4-3': [
    { categoria: 'DEL', left: 25, top: 17 },
    { categoria: 'DEL', left: 50, top: 17 },
    { categoria: 'DEL', left: 75, top: 17 },
    { categoria: 'MED', left: 15, top: 43 },
    { categoria: 'MED', left: 38, top: 43 },
    { categoria: 'MED', left: 62, top: 43 },
    { categoria: 'MED', left: 85, top: 43 },
    { categoria: 'DEF', left: 25, top: 68 },
    { categoria: 'DEF', left: 50, top: 68 },
    { categoria: 'DEF', left: 75, top: 68 },
    { categoria: 'ARQ', left: 50, top: 87 },
  ],
}

function Juego() {
  const location = useLocation()
  const navigate = useNavigate()

  const formacion = location.state?.formacion || '4-4-2'
  const puestos = formaciones[formacion] || formaciones['4-4-2']

  const [equiposRestantes, setEquiposRestantes] = useState(equipos)
  const [equipoActual, setEquipoActual] = useState(null)
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null)
  const [onceTitular, setOnceTitular] = useState(Array(11).fill(null))

  const cantidadSeleccionados = onceTitular.filter(Boolean).length
  const equipoCompleto = cantidadSeleccionados === 11

  function categoriaCompleta(categoria) {
    return !puestos.some(
      (puesto, indice) =>
        puesto.categoria === categoria && !onceTitular[indice]
    )
  }

  function sortearEquipo() {
    if (equipoActual || equipoCompleto || equiposRestantes.length === 0) return

    const indice = Math.floor(Math.random() * equiposRestantes.length)
    const nuevoEquipo = equiposRestantes[indice]

    setEquipoActual(nuevoEquipo)
    setEquiposRestantes(restantes =>
      restantes.filter(equipo => equipo.id !== nuevoEquipo.id)
    )
    setJugadorSeleccionado(null)
  }

function seleccionarJugador(jugador) {
  if (!equipoActual) return
  setJugadorSeleccionado(jugador)
}

function armarEquipoAleatorio() {
  if (cantidadSeleccionados > 0) return

  const equiposDisponibles = [...equipos]

  const nuevoOnce = puestos.map(puesto => {
    const indiceEquipo = Math.floor(
      Math.random() * equiposDisponibles.length
    )

    const equipo = equiposDisponibles.splice(indiceEquipo, 1)[0]

    const jugadoresCompatibles = equipo.jugadores.filter(
      jugador => jugador.posicion === puesto.categoria
    )

    const indiceJugador = Math.floor(
      Math.random() * jugadoresCompatibles.length
    )

    const jugador = jugadoresCompatibles[indiceJugador]

    return {
      ...jugador,
      equipo: equipo.nombre,
      anio: equipo.anio,
    }
  })

  setOnceTitular(nuevoOnce)
  setEquipoActual(null)
  setJugadorSeleccionado(null)
  setEquiposRestantes([])
}

function armarEquipoAleatorio() {
  const equiposDisponibles = [...equipos]

  const nuevoOnce = puestos.map(puesto => {
    const indiceEquipo = Math.floor(
      Math.random() * equiposDisponibles.length
    )

    const equipo = equiposDisponibles.splice(indiceEquipo, 1)[0]

    const jugadoresCompatibles = equipo.jugadores.filter(
      jugador => jugador.posicion === puesto.categoria
    )

    const indiceJugador = Math.floor(
      Math.random() * jugadoresCompatibles.length
    )

    const jugador = jugadoresCompatibles[indiceJugador]

    return {
      ...jugador,
      equipo: equipo.nombre,
      anio: equipo.anio,
    }
  })

  setOnceTitular(nuevoOnce)
  setEquipoActual(null)
  setJugadorSeleccionado(null)
  setEquiposRestantes([])
}

  function asignarJugador(indice) {
    if (!jugadorSeleccionado || onceTitular[indice]) return

    const puesto = puestos[indice]

    if (jugadorSeleccionado.posicion !== puesto.categoria) return

    const nuevoOnce = [...onceTitular]

    nuevoOnce[indice] = {
      ...jugadorSeleccionado,
      equipo: equipoActual.nombre,
      anio: equipoActual.anio,
    }

    setOnceTitular(nuevoOnce)
    setJugadorSeleccionado(null)
    setEquipoActual(null)
  }

  const promedio = equipoCompleto
    ? (
        onceTitular.reduce((total, jugador) => total + jugador.rating, 0) / 11
      ).toFixed(1)
    : null

function irAPlayoffs() {
  localStorage.removeItem('ligaCampeonesPlayoffs')

navigate('/playoffs', {
  replace: true,
  state: {
    onceTitular,
    promedio,
    formacion,
  },
})
}

  return (
    <div className="pantalla pantalla-armado">
      <Header />

      <main className="pantalla-juego">

        <section className={`panel-sorteo ${equipoCompleto ? 'panel-completo' : ''}`}>

          <div className="equipo">
            {equipoActual ? (
              <>
                <h2>{equipoActual.nombre}</h2>
                <h3>- {equipoActual.anio}</h3>
              </>
            ) : (
              <span>{equipoCompleto ? 'XI COMPLETADO' : '---'}</span>
            )}
          </div>

          <h3 className="titulo-jugadores">
            {equipoActual
              ? 'ELEGÍ UN JUGADOR'
              : equipoCompleto
                ? 'TU EQUIPO ESTÁ LISTO PARA COMPETIR'
                : 'SORTEÁ TU EQUIPO'}
          </h3>

          <div className="jugadores-disponibles">

            {equipoActual && equipoActual.jugadores.map((jugador, indice) => (
              <button
                key={`${equipoActual.id}-${indice}`}
                className={`jugador-disponible ${
                  jugadorSeleccionado?.nombre === jugador.nombre
                    ? 'jugador-elegido'
                    : ''
                } ${
                  categoriaCompleta(jugador.posicion)
                    ? 'jugador-sin-puesto'
                    : ''
                }`}
                onClick={() => seleccionarJugador(jugador)}
           disabled={categoriaCompleta(jugador.posicion)}
              >
                <span className="nombre-jugador">{jugador.nombre}</span>
                <span className="categoria-jugador">{jugador.posicion}</span>
                <span className="rating-jugador">{jugador.rating}</span>
              </button>
            ))}

          </div>

{cantidadSeleccionados === 0 && (
  <button
    className="sortear-aleatorio"
    onClick={armarEquipoAleatorio}
  >
    ⚡ ARMAR XI ALEATORIO
  </button>
)}
          
          <button
            className="sortear"
            onClick={equipoCompleto ? irAPlayoffs : sortearEquipo}
            disabled={!equipoCompleto && (!!equipoActual || equiposRestantes.length === 0)}
          >
            {equipoCompleto
              ? 'SIMULAR PLAYOFFS'
              : equipoActual
                ? 'ELEGÍ UN JUGADOR'
                : 'SORTEAR EQUIPO'}
          </button>

          {equipoCompleto && (
            <div className="mensaje-final">
              <h2>¡XI COMPLETADO!</h2>
              <p>VALORACIÓN MEDIA</p>
              <strong>{promedio}</strong>
            </div>
          )}

        </section>

        <section className="cancha">

          <h2>MI XI</h2>

          <p className="instruccion-cancha">
            {jugadorSeleccionado
              ? `Elegí un puesto ${jugadorSeleccionado.posicion}`
              : 'Seleccioná un jugador y ubicá su ficha en la cancha.'}
          </p>

          <div className="campo-codigo">

            <div className="linea-mitad" />
            <div className="circulo-central" />
            <div className="area-superior" />
            <div className="area-chica-superior" />
            <div className="area-inferior" />
            <div className="area-chica-inferior" />
            <div className="arco-superior" />
            <div className="arco-inferior" />
            <div className="punto-central" />
            <div className="punto-superior" />
            <div className="punto-inferior" />

            {puestos.map((puesto, indice) => {
              const jugador = onceTitular[indice]
              const compatible =
                jugadorSeleccionado?.posicion === puesto.categoria

              return (
                <button
                  key={indice}
                  className={`puesto-ficha ${
                    jugador ? 'puesto-ocupado' : ''
                  } ${compatible ? 'puesto-compatible' : ''}`}
                  style={{
                    left: `${puesto.left}%`,
                    top: `${puesto.top}%`,
                  }}
                  onClick={() => asignarJugador(indice)}
                  disabled={!!jugador || !compatible}
                  title={puesto.categoria}
                >
                  {jugador ? (
                    <>
                      <span className="ficha-rating">{jugador.rating}</span>
                      <span className="ficha-nombre">
                        {jugador.nombre.trim().split(' ').slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    <span className="ficha-posicion">{puesto.categoria}</span>
                  )}
                </button>
              )
            })}

          </div>

          <p className="contador-xi">
            XI COMPLETADO: {cantidadSeleccionados}/11
          </p>

        </section>

        <section className="logo">
          <img
            src={logo}
            alt="La Liga de los Campeones"
            onClick={() => navigate('/')}
          />
        </section>

      </main>

      <section className="instrucciones-juego">
        <div className="instrucciones-encabezado">
          <span>GUÍA DEL JUEGO</span>
          <h2>¿CÓMO SE JUEGA?</h2>
          <p>
            Armá tu XI histórico, elegí bien a tus jugadores y preparate
            para competir por el campeonato.
          </p>
        </div>

        <div className="pasos-juego">

          <article className="paso-juego">
            <span className="numero-paso">01</span>
            <h3>SORTEÁ UN EQUIPO</h3>
            <p>
              Presioná el botón para descubrir un equipo histórico del
              fútbol argentino. Cada equipo aparece una sola vez durante
              la partida.
            </p>
          </article>

          <article className="paso-juego">
            <span className="numero-paso">02</span>
            <h3>ELEGÍ UN JUGADOR</h3>
            <p>
              Cada equipo tiene once jugadores disponibles. Elegí uno
              para incorporarlo a tu formación. Solo podés seleccionar
              un jugador por equipo.
            </p>
          </article>

          <article className="paso-juego">
            <span className="numero-paso">03</span>
            <h3>REVISÁ SU VALORACIÓN</h3>
            <p>
              Cada jugador tiene un rating entre 1 y 99. Cuanto más alto
              sea el número, mejor es su valoración. ¡Buscá a las grandes
              figuras para potenciar tu equipo!
            </p>
          </article>

          <article className="paso-juego">
            <span className="numero-paso">04</span>
            <h3>COMPLETÁ TU XI</h3>
            <p>
              Ubicá al jugador en un puesto compatible con su categoría:
              arquero, defensa, mediocampista o delantero. Repetí el
              proceso hasta completar los once lugares.
            </p>
          </article>

          <article className="paso-juego">
            <span className="numero-paso">05</span>
            <h3>¡A LOS PLAYOFFS!</h3>
            <p>
              Cuando completes tu formación, se calculará la valoración
              media de tu equipo. El máximo posible es 99. Después,
              presioná SIMULAR PLAYOFFS y descubrí hasta dónde puede llegar
              tu equipo.
            </p>
          </article>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Juego
