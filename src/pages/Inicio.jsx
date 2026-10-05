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
    <div className="pantalla">

      <Header />

      <main>

        <section className="panel">

          <h1>
            ARMÁ TU XI
            <br />
            HISTÓRICO
          </h1>

          <p>
            Tirá el dado, elegí a tus leyendas
            favoritas e intentá tocar el cielo
            con las manos.
          </p>

          <h2>Formación:</h2>

          <FormationSelector
            formacion={formacion}
            setFormacion={setFormacion}
          />

          <button
            className="jugar"
            onClick={comenzarJuego}
          >
            JUGAR
          </button>

        </section>

        <section className="logo">

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