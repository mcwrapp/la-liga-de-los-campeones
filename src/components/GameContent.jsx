import { useState } from 'react'
import FormationSelector from './FormationSelector'
import logo from '../assets/Logo.png'

function GameContent() {

  const [formacion, setFormacion] = useState('4-3-3')

  return (
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

        <button className="jugar">
          JUGAR
        </button>

      </section>

      <section className="logo">

        <img src={logo} alt="La Liga de los Campeones" />

      </section>

    </main>
  )
}

export default GameContent