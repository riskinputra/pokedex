import React, { useContext } from 'react'

import { PokemonsContext } from 'context/pokemons-context'

import './styles.scss'

function Loading() {
  const [state] = useContext(PokemonsContext)

  return (
    state.isLoading && (<div className="loading">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    </div>)
  )
}

export default Loading
