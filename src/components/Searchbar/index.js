import React, { useState, useContext } from 'react'
import axios from 'axios'
import { isEmpty } from 'lodash'

import { PokemonsContext } from 'context/pokemons-context'

import './styles.scss'

function Searchbar() {
  const [search, setSearch] = useState('')
  const [state, dispatch] = useContext(PokemonsContext)

  const setPokemonsSearch = data => {
    dispatch({
      type: 'ADD_POKEMONS_SEARCH',
      payload: data
    })
  }

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

  const fetchSearchPokemon = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
    const url = `https://pokeapi.co/api/v2/pokemon/${search}/`
    const formatPokemonSearch = { name: data.name, url }
    setPokemonsSearch(formatPokemonSearch)
  }

  const handleSearchButton = () => {
    if (!isEmpty(search)) {
      fetchSearchPokemon()
    } else {
      fetchPokemons()
    }
  }

  const onKeyUp = (event) => {
    if (event.charCode === 13) {
      if (!isEmpty(search)) {
        fetchSearchPokemon()
      } else {
        fetchPokemons()
      }
    }
  }

  return (
    <header id="searchbar" className="searchbar">
      <div className="container container-fluid">
        <div className="searchbar-form">
          <input type="text" placeholder="Search pokemon name or number" onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => onKeyUp(e)} />
          <button onClick={() => handleSearchButton()}>
            <i className="fa fa-search" />
            Search
          </button>
        </div>
      </div>
    </header>
  )
}

export default Searchbar
