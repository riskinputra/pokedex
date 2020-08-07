import React from 'react'

import Searchbar from 'components/Searchbar'
import PokemonList from 'components/PokemonList'

import './styles.scss'

function Home() {
  return (
    <div id="home" className="home">
      <Searchbar />

      <div className="home-content">
        <div className="container container-fluid">
          <PokemonList />
        </div>
      </div>
    </div>
  )
}

export default Home
