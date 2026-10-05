function FormationSelector({ formacion, setFormacion }) {
  return (
    <div className="formaciones">

      <button
        className={formacion === '4-3-3' ? 'seleccionada' : ''}
        onClick={() => setFormacion('4-3-3')}
      >
        4-3-3
      </button>

      <button
        className={formacion === '4-4-2' ? 'seleccionada' : ''}
        onClick={() => setFormacion('4-4-2')}
      >
        4-4-2
      </button>

      <button
        className={formacion === '5-3-2' ? 'seleccionada' : ''}
        onClick={() => setFormacion('5-3-2')}
      >
        5-3-2
      </button>

      <button
        className={formacion === '3-4-3' ? 'seleccionada' : ''}
        onClick={() => setFormacion('3-4-3')}
      >
        3-4-3
      </button>

    </div>
  )
}

export default FormationSelector