import React, { useContext } from 'react'
import axios from 'axios'

import { isEmpty, result } from 'lodash'

import { PokemonsContext } from 'context/pokemons-context'

import Searchbar from 'components/Searchbar'
import PokemonList from 'components/PokemonList'
import Footer from 'components/Footer'

import './styles.scss'

function Home() {
  const [state, dispatch] = useContext(PokemonsContext)

  const setMorePokemons = data => {
    dispatch({
      type: 'ADD_POKEMONS_MORE',
      payload: data
    })
  }

  const nextApi = result(state.pokemons, 'next', '')

  const handleMorePokemons = async () => {
    const { data } = await axios.get(nextApi)
    setMorePokemons(data)
  }

  const moreButton = !isEmpty(nextApi) && !state.isSearch && (<div className="more-button">
    <button onClick={() => handleMorePokemons()}>More Pokemons...</button>
  </div>)

  return (
    <div id="home" className="home">
      <Searchbar />

      <div className="home-content">
        <div className="container container-fluid">
          <PokemonList />
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              { moreButton }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
