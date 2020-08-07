import React from 'react'

import PokemonDetail from 'components/PokemonDetail'

import './styles.scss'

function Pokemon() {
  return (
    <div id="pokemon" className="pokemon">
      <div className="pokemon-content">
        <div className="container container-fluid">
          <PokemonDetail />
        </div>
      </div>
    </div>
  )
}

export default Pokemon
