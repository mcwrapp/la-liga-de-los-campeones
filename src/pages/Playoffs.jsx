
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import logo from '../assets/Logo.png'
import escudoArgentinos from '../assets/escudo-argentinos.png'
import escudoBoca from '../assets/escudo-boca.png'
import escudoEstudiantes from '../assets/escudo-estudiantes.png'
import escudoIndependiente from '../assets/escudo-independiente.png'
import escudoNewells from '../assets/escudo-newells.png'
import escudoRacing from '../assets/escudo-racing.png'
import escudoRiver from '../assets/escudo-river.png'
import escudoSanLorenzo from '../assets/escudo-sanlorenzo.png'
import escudoVelez from '../assets/escudo-velez.png'
import golUsuario from '../assets/sonidos/gol-usuario.mp3'
import golRival from '../assets/sonidos/gol-rival.mp3'
import pitidoInicial from '../assets/sonidos/pitido-inicial.mp3'
import pitidoFinal from '../assets/sonidos/pitido-final.mp3'
import { equipos } from '../data/equipos'

const rondas = [
  'OCTAVOS DE FINAL',
  'CUARTOS DE FINAL',
  'SEMIFINAL',
  'FINAL',
]

function obtenerEscudo(equipo) {
  switch (equipo.nombre) {
    case 'ARGENTINOS JUNIORS':
      return escudoArgentinos
    case 'BOCA JUNIORS':
      return escudoBoca
    case 'ESTUDIANTES':
      return escudoEstudiantes
    case 'INDEPENDIENTE':
      return escudoIndependiente
    case "NEWELL'S OLD BOYS":
      return escudoNewells
    case 'RACING CLUB':
      return escudoRacing
    case 'RIVER PLATE':
      return escudoRiver
    case 'SAN LORENZO':
      return escudoSanLorenzo
    case 'VÉLEZ SARSFIELD':
      return escudoVelez
    default:
      return null
  }
}

function promedioEquipo(equipo) {
  return equipo.jugadores.reduce(
    (total, jugador) => total + jugador.rating,
    0
  ) / equipo.jugadores.length
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function golesSegunRendimiento(mediaPropia, mediaRival) {
  const diferencia = mediaPropia - mediaRival
  let goles = numeroAleatorio(0, 2)

  if (diferencia > 3) goles++
  if (diferencia > 7) goles++
  if (diferencia < -3) goles--
  if (diferencia < -7) goles--

  return Math.max(0, Math.min(5, goles))
}

function generarGoles(cantidad, jugadores, equipo) {
  return Array.from({ length: cantidad }, () => {
    const jugador = jugadores[numeroAleatorio(0, jugadores.length - 1)]

    return {
      minuto: numeroAleatorio(1, 90),
      jugador: jugador.nombre.trim().split(' ').slice(-1)[0],
      equipo,
    }
  })
}

function obtenerTorneoGuardado(datosIniciales) {
  try {
    const guardado = localStorage.getItem('ligaCampeonesPlayoffs')

    if (guardado) {
      return JSON.parse(guardado)
    }
  } catch (error) {
    console.error('No se pudo recuperar el torneo:', error)
  }

  if (!datosIniciales) return null

  return {
    datos: datosIniciales,
    ronda: 0,
    partido: null,
    rivalesDisponibles: equipos,
    historial: [],
    finalizado: false,
  }
}

function Playoffs() {
  const location = useLocation()
  const navigate = useNavigate()

  const [estadoInicial] = useState(() =>
  obtenerTorneoGuardado(location.state)
)

const datos = estadoInicial?.datos || null

const onceTitular = datos?.onceTitular || []
const promedio = Number(datos?.promedio) || 0

const [ronda, setRonda] = useState(estadoInicial?.ronda ?? 0)
const [partido, setPartido] = useState(estadoInicial?.partido ?? null)

const [rivalesDisponibles, setRivalesDisponibles] = useState(
  estadoInicial?.rivalesDisponibles ?? equipos
)

const [historial, setHistorial] = useState(
  estadoInicial?.historial ?? []
)

const [finalizado, setFinalizado] = useState(
  estadoInicial?.finalizado ?? false
)

const [minutoActual, setMinutoActual] = useState(
  estadoInicial?.minutoActual ?? 0
)

const ultimoMinutoRevisado = useRef(minutoActual)

const [golesMostrados, setGolesMostrados] = useState(
  estadoInicial?.golesMostrados ?? 0
)

const [partidoEnCurso, setPartidoEnCurso] = useState(
  estadoInicial?.partidoEnCurso ?? false
)

useEffect(() => {
  if (!partidoEnCurso) return

  const reloj = setInterval(() => {
    setMinutoActual(minuto => {
if (minuto >= 90) {
  clearInterval(reloj)

  const sonidoFinal = new Audio(pitidoFinal)
  sonidoFinal.play().catch(() => {})

  setPartidoEnCurso(false)

  if (partido && (!partido.ganoUsuario || ronda === 3)) {
    setFinalizado(true)
  }

  return 90
}

      return minuto + 1
    })
  }, 111)

  return () => clearInterval(reloj)
}, [partidoEnCurso])

useEffect(() => {
  if (!partido || !partidoEnCurso) {
    ultimoMinutoRevisado.current = minutoActual
    return
  }

  const golesNuevos = partido.goles.filter(
    gol =>
      gol.minuto > ultimoMinutoRevisado.current &&
      gol.minuto <= minutoActual
  )

  golesNuevos.forEach(gol => {
    const sonido = new Audio(
      gol.equipo === 'propio' ? golUsuario : golRival
    )

    sonido.play().catch(() => {})
  })

  ultimoMinutoRevisado.current = minutoActual
}, [minutoActual, partido, partidoEnCurso])

useEffect(() => {
  if (!partido || !partidoEnCurso) {
    ultimoMinutoRevisado.current = minutoActual
    return
  }

  const golesNuevos = partido.goles.filter(
    gol =>
      gol.minuto > ultimoMinutoRevisado.current &&
      gol.minuto <= minutoActual
  )

  golesNuevos.forEach(gol => {
    const sonido = new Audio(
      gol.equipo === 'propio' ? golUsuario : golRival
    )

    sonido.play().catch(() => {})
  })

  ultimoMinutoRevisado.current = minutoActual
}, [minutoActual, partido, partidoEnCurso])

useEffect(() => {
  if (!datos) return

  localStorage.setItem(
    'ligaCampeonesPlayoffs',
    JSON.stringify({
      datos,
      ronda,
      partido,
      rivalesDisponibles,
      historial,
      finalizado,
      minutoActual,
golesMostrados,
partidoEnCurso,
    })
  )
}, [
  datos,
  ronda,
  partido,
  rivalesDisponibles,
  historial,
  finalizado,
  minutoActual,
golesMostrados,
partidoEnCurso,
])

  if (!datos || onceTitular.length !== 11) {
    return (
      <div className="pantalla">
        <Header />
        <main className="playoffs-error">
          <h2>NO HAY UN EQUIPO COMPLETO</h2>
          <p>Primero tenés que completar tu XI histórico.</p>
          <button onClick={() => navigate('/juego')}>
            VOLVER AL JUEGO
          </button>
        </main>
        <Footer />
      </div>
    )
  }

  function simularPartido() {
    if (rivalesDisponibles.length === 0) return

    const sonidoInicial = new Audio(pitidoInicial)
sonidoInicial.play().catch(() => {})
    const indice = numeroAleatorio(0, rivalesDisponibles.length - 1)
    const rival = rivalesDisponibles[indice]
    const mediaRival = promedioEquipo(rival)

    const rendimientoPropio = numeroAleatorio(-6, 6)
    const rendimientoRival = numeroAleatorio(-6, 6)

    const poderPropio = promedio + rendimientoPropio
    const poderRival = mediaRival + rendimientoRival

    let golesPropios = golesSegunRendimiento(
      poderPropio,
      poderRival
    )

    let golesRival = golesSegunRendimiento(
      poderRival,
      poderPropio
    )

    let penales = null
    let ganoUsuario = golesPropios > golesRival

    if (golesPropios === golesRival) {
      const penalesPropios = numeroAleatorio(3, 5)
      const penalesRival = numeroAleatorio(3, 5)

      const usuarioGanaPenales =
        penalesPropios === penalesRival
          ? Math.random() >= 0.5
          : penalesPropios > penalesRival

      penales = {
        propios: penalesPropios,
        rival: penalesRival,
      }

      ganoUsuario = usuarioGanaPenales

      if (penalesPropios === penalesRival) {
        penales.propios++
        penales.rival++
        if (usuarioGanaPenales) penales.propios++
        else penales.rival++
      }
    }

    const goles = [
      ...generarGoles(golesPropios, onceTitular, 'propio'),
      ...generarGoles(golesRival, rival.jugadores, 'rival'),
    ].sort((a, b) => a.minuto - b.minuto)

    const nuevoPartido = {
      rival,
      mediaRival: mediaRival.toFixed(1),
      golesPropios,
      golesRival,
      goles,
      penales,
      ganoUsuario,
    }

setPartido(nuevoPartido)

setRivalesDisponibles(restantes =>
  restantes.filter(equipo => equipo.id !== rival.id)
)

setHistorial(actual => [...actual, nuevoPartido])

setMinutoActual(0)
setGolesMostrados(0)
setFinalizado(false)
setPartidoEnCurso(true)
  }


function siguientePaso() {
  if (partidoEnCurso) return

  if (!partido) {
    simularPartido()
    return
  }

  if (finalizado) {
    if (partido.ganoUsuario && ronda === 3) {
      navigate('/tu-camino', {
        state: { historial },
      })
    } else {
      navigate('/')
    }

    return
  }

  setRonda(actual => actual + 1)
  setPartido(null)
}


  const campeon = finalizado && partido?.ganoUsuario && ronda === 3
  const eliminado = finalizado && partido && !partido.ganoUsuario
const golesPropiosActuales = partido
  ? partido.goles.filter(
      gol => gol.equipo === 'propio' && gol.minuto <= minutoActual
    ).length
  : 0

const golesRivalActuales = partido
  ? partido.goles.filter(
      gol => gol.equipo === 'rival' && gol.minuto <= minutoActual
    ).length
  : 0
  return (
    <div className="pantalla">
      <Header />

      <main className="pantalla-playoffs">

        <section className="playoffs-encabezado">
          <div>
            <span className="playoffs-etiqueta">
              LA LIGA DE LOS CAMPEONES
            </span>
            <h1>PLAYOFFS</h1>
            <p>EL CAMINO AL TÍTULO</p>
          </div>

          <img
  src={logo}
  alt="La Liga de los Campeones"
  onClick={() => navigate('/')}
/>
        </section>

        <nav className="progreso-playoffs">
          {rondas.map((nombre, indice) => (
            <div
              key={nombre}
              className={`ronda-progreso ${
                indice === ronda ? 'ronda-actual' : ''
              } ${
                indice < ronda ? 'ronda-superada' : ''
              }`}
            >
              <span>{nombre}</span>
              {indice < 3 && <b>›</b>}
            </div>
          ))}
        </nav>

        <section className="contenido-playoffs">

          <div className="partido-playoffs">

            <div className="titulo-ronda">
              {rondas[ronda]}
            </div>

            {!partido ? (
              <div className="partido-pendiente">
                <h2>EL PRÓXIMO DESAFÍO</h2>
                <p>
                  Tu equipo está listo para disputar
                  {ronda === 0 ? ' los octavos de final' :
                    ronda === 1 ? ' los cuartos de final' :
                    ronda === 2 ? ' la semifinal' :
                    ' la gran final'}.
                </p>
                <div className="escudos-pendientes">
                  <span>⚽</span>
                  <b>VS</b>
                  <span>?</span>
                </div>
                <button
                  className="boton-jugar"
                  onClick={siguientePaso}
                >
                  JUGAR {rondas[ronda]}
                  <span>›</span>
                </button>
              </div>
            ) : (
              <>
<div className="marcador-partido">

<div className="equipo-marcador">
  <img
    className="escudo-marcador"
    src={logo}
    alt="Escudo de tu equipo"
  />
  <h2>TU EQUIPO</h2>
  <p>Media: {promedio.toFixed(1)}</p>
</div>

  <div className="centro-marcador">
    <div className="reloj-partido">
      {partidoEnCurso ? `${minutoActual}'` : "90'"}
    </div>

    <div className="resultado-partido">
      <strong>{golesPropiosActuales}</strong>
      <span>-</span>
      <strong>{golesRivalActuales}</strong>
    </div>
  </div>

<div className="equipo-marcador">
  <img
    className="escudo-marcador"
    src={obtenerEscudo(partido.rival)}
    alt={`Escudo de ${partido.rival.nombre}`}
  />
  <h2>{partido.rival.nombre} {partido.rival.anio}</h2>
  <p>Media: {partido.mediaRival}</p>
</div>

</div>

                {partido.penales && !partidoEnCurso && (
                  <div className="resultado-penales">
                    DEFINICIÓN POR PENALES:
                    {' '}{partido.penales.propios}
                    {' - '}{partido.penales.rival}
                  </div>
                )}

                <div className="resumen-partido">
<div className="cronica-partido">
  <h2>
    {partidoEnCurso
      ? 'PARTIDO EN JUEGO'
      : partido.ganoUsuario
        ? '¡VICTORIA!'
        : 'ELIMINADOS'}
  </h2>

  <p>
    {partidoEnCurso
      ? 'El partido está en marcha. Todavía puede pasar cualquier cosa.'
      : partido.ganoUsuario
        ? 'Tu equipo consiguió el triunfo y sigue avanzando en el campeonato.'
        : 'Esta vez no alcanzó. Tu camino en el torneo termina acá.'}
  </p>
</div>

                  <div className="goles-partido">
                    <h3>⚽ GOLES DEL PARTIDO</h3>

                    {partido.goles.length === 0 ? (
                      <p className="sin-goles">
                        No hubo goles durante el partido.
                      </p>
                    ) : (
                      partido.goles
  .filter(gol => gol.minuto <= minutoActual)
  .map((gol, indice) => (
                        <div
                          key={indice}
                          className="evento-gol"
                        >
                          <strong>{gol.minuto}'</strong>
                          <span>{gol.jugador}</span>
                          <small>
                            {gol.equipo === 'propio'
                              ? 'TU EQUIPO'
                              : partido.rival.nombre}
                          </small>
                        </div>
                      ))
                    )}
                  </div>

                </div>

                {campeon && (
                  <div className="mensaje-campeon">
                    ¡CAMPEONES DEL FÚTBOL ARGENTINO!
                  </div>
                )}

<button
  className="boton-jugar"
  onClick={siguientePaso}
  disabled={partidoEnCurso}
>
{partidoEnCurso
  ? 'PARTIDO EN JUEGO...'
  : campeon
    ? 'DESCUBRIR TU CAMINO'
    : eliminado
      ? 'VOLVER AL MENÚ'
      : `JUGAR ${rondas[ronda + 1]}`}
  <span>›</span>
</button>
              </>
            )}

          </div>

          <aside className="camino-playoffs">
            <h2>TU CAMINO EN EL TORNEO</h2>

            {rondas.map((nombre, indice) => {
              const registro = historial[indice]

              return (
                <div
                  key={nombre}
className={`item-camino ${
  indice === ronda ? 'camino-actual' : ''
} ${
  registro && !registro.ganoUsuario ? 'derrota' : ''
}`}
                >
                  <span className="circulo-camino">
                    {registro
                      ? registro.ganoUsuario ? '✓' : '×'
                      : indice + 1}
                  </span>

                  <div>
                    <h3>{nombre}</h3>
{registro ? (
  <p>
<span className="rival-camino">
  <img
    src={obtenerEscudo(registro.rival)}
    alt={`Escudo de ${registro.rival.nombre}`}
    className="escudo-camino"
  />
  {registro.rival.nombre} {registro.rival.anio}
</span>

    <strong>
      {registro.golesPropios} - {registro.golesRival}
    </strong>
  </p>
) : (
                      <p>
                        {indice === ronda
                          ? 'Próximo partido...'
                          : 'Por jugar'}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </aside>

        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Playoffs
