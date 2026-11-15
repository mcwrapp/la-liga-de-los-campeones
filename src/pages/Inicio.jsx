
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../components/Header'
import FormationSelector from '../components/FormationSelector'
import Footer from '../components/Footer'
import logo from '../assets/Logo.png'

function Inicio() {
  const [formacion, setFormacion] = useState('4-4-2')
  const navigate = useNavigate()

  function comenzarJuego() {
    navigate('/juego', {
      state: {
        formacion: formacion
      }
    })
  }

  return (
    <div className="pantalla pantalla-inicio">
      <Header />

      <main className="inicio-main">
        <section className="inicio-panel">
          <span className="inicio-etiqueta">
            EL DESAFÍO COMIENZA ACÁ
          </span>

          <h1>
            ARMÁ TU XI
            <br />
            <span>HISTÓRICO</span>
          </h1>

          <p className="inicio-descripcion">
            Elegí tu formación, reuní a las grandes leyendas
            del fútbol argentino y construí un equipo capaz
            de hacer historia.
          </p>

          <div className="inicio-separador" />

          <div className="inicio-seleccion">
            <h2>FORMACIÓN TÁCTICA</h2>
            <p>Elegí cómo querés parar a tu equipo</p>

            <FormationSelector
              formacion={formacion}
              setFormacion={setFormacion}
            />
          </div>

          <button
            className="jugar inicio-boton"
            onClick={comenzarJuego}
          >
            COMENZAR DESAFÍO
            <span>›</span>
          </button>

          <div className="inicio-pie-panel">
            <span>11 LEYENDAS</span>
            <span>•</span>
            <span>UN SOLO EQUIPO</span>
          </div>
        </section>

        <section className="inicio-identidad">
          <div className="inicio-resplandor" />

          <img
            src={logo}
            alt="La Liga de los Campeones"
          />

        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Inicio
