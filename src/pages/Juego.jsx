import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import logo from '../assets/Logo.png'
import cancha from '../assets/4-4-2.png'


function Juego() {

  const location = useLocation()
  const navigate = useNavigate()

  const formacion = location.state?.formacion || '4-4-2'

  const [equipoSorteado, setEquipoSorteado] = useState(null)

  return (
    <div className="pantalla">

      <Header />

      <main className="pantalla-juego">

        <section className="panel-sorteo">

<div className="equipo">

  {equipoSorteado ? (
    <>
      <h2>RIVER</h2>
      <h3>- 2015</h3>
    </>
  ) : (
    <span>---</span>
  )}

</div>
<div className="posiciones">

  <div className="posicion">
    <span>ARQ.</span>
    <span className="vacio">{equipoSorteado ? 'M. BAROVERO' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>LD.</span>
    <span className="vacio">{equipoSorteado ? 'G. MERCADO' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>DFC.</span>
    <span className="vacio">{equipoSorteado ? 'J. MAIDANA' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>DFC.</span>
    <span className="vacio">{equipoSorteado ? 'R. FUNES MORI' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>LI.</span>
    <span className="vacio">{equipoSorteado ? 'L. VANGIONI' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>MI.</span>
    <span className="vacio">{equipoSorteado ? 'L. PISCULICHI' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>MC.</span>
    <span className="vacio">{equipoSorteado ? 'L. PONZIO' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>MC.</span>
    <span className="vacio">{equipoSorteado ? 'M. KRANEVITTER' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>MD.</span>
    <span className="vacio">{equipoSorteado ? 'C. SANCHEZ' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>DC.</span>
    <span className="vacio">{equipoSorteado ? 'L. ALARIO' : '----------'}</span>
  </div>

  <div className="posicion">
    <span>DC.</span>
    <span className="vacio">{equipoSorteado ? 'F. CAVENAGHI' : '----------'}</span>
  </div>

</div>

          <button
  className="sortear"
  onClick={() => setEquipoSorteado(true)}
>
  SORTEAR
</button>

        </section>

<section className="cancha">

  <h2>MI XI</h2>

  <p>
    Formación: <strong>{formacion}</strong>
  </p>

  <div className="campo">

    <img
      src={cancha}
      alt="Cancha de fútbol"
    />

  </div>

</section>

<section className="logo">

  <img
    src={logo}
    alt="La Liga de los Campeones"
    onClick={() => navigate('/')}
  />

</section>

      </main>

      <Footer />

    </div>
  )
}

export default Juego