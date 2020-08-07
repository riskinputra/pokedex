import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { map, result } from 'lodash'
import { Link } from "react-router-dom";

import { PokemonsContext } from 'context/pokemons-context'
import Card from 'components/Card'

import pokeball from './img/pokeball.png'

import './styles.scss'

function PokemonList() {
  const [state, dispatch] = useContext(PokemonsContext)

  const setPokemons = data => {
    dispatch({
      type: 'ADD_POKEMONS',
      payload: data
    })
  }
  const fetchPokemons = async () => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
    setPokemons(data)
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  const pokemonsList = map(result(state.pokemons, 'results', []), pokemon => {
    const pokemonSplitUrl = result(pokemon, 'url').split('/')
    const getId = pokemonSplitUrl[pokemonSplitUrl.length - 2]
    return (
      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 pokemon-list--card" id={`pokemon-${pokemon.name}-${getId}`} key={`pokemon-${pokemon.name}-${getId}`}>
        <Card>
          <Link to={`/pokemon/${getId}`}>
            <div className="pokemon-list--image">
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getId}.svg`} alt={pokemon} className="pokemon-list--monster" />
              <img src={pokeball} alt="pokeball" className="pokemon-list--pokeball" />
            </div>
            <div className="pokemon-list--content">
              <div className="pokemon-list--content-head">
                <div className="pokemon-list--content-name">
                  {pokemon.name}
                </div>
                <div className="pokemon-list--content-id">
                  {getId}
                </div>
              </div>
            </div>
          </Link>
        </Card>
      </div>
    )
  })
  return (
    <div className="row pokemon-list">
      {pokemonsList}
    </div>
  )
}

export default PokemonList
