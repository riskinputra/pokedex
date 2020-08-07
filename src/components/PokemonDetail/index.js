import React, { useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { result, find, map, forEach } from 'lodash'

import { PokemonsContext } from 'context/pokemons-context'

import Chip from 'components/Chip'
import Footer from 'components/Footer'

import bg1 from './img/bg-1.png'

import './styles.scss'

function PokemonDetail() {
  const [state, dispatch] = useContext(PokemonsContext)
  const { id } = useParams()

  const setPokemonsDetail = data => {
    dispatch({
      type: 'ADD_POKEMONS_DETAILS',
      payload: data
    })
  }

  const getTypeDetail = async item => {
    const resTypeDetail = await axios.get(item.type.url)
    return await result(resTypeDetail.data, 'damage_relations.double_damage_from')
  }

  const fetchPokemonsDetail = async () => {
    const resDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const resDesc = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const pokemon_description = find(resDesc.data.flavor_text_entries, text => text.version.name === 'ruby' ).flavor_text
    const pokemon_category = find(resDesc.data.genera, cat => cat.language.name === 'en' ).genus
    const typeMaping = await Promise.all(
      map(resDetail.data.types, getTypeDetail)
    )
    const pokemon_weakness = []
    forEach(typeMaping, weakness => {
      pokemon_weakness.push(...weakness)
    })

    setPokemonsDetail({ ...resDetail.data, pokemon_description, pokemon_category, pokemon_weakness })
  }

  useEffect(() => {
    fetchPokemonsDetail()
  }, [])

  const monsterImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` || result(state.pokemonDetail, 'sprites.front_default')

  const pokemonTypes = map(result(state.pokemonDetail, 'types', []), (type, index) => (
    <span key={index} >
      <Chip type={`type-${result(type, 'type.name')}`}>{result(type, 'type.name')}</Chip>
    </span>
  ))

  const pokemonWeakness = map(result(state.pokemonDetail, 'pokemon_weakness', []), (weak, index) => (
    <span key={index} >
      <Chip type={`type-${result(weak, 'name')}`}>{result(weak, 'name')}</Chip>
    </span>
  ))

  const pokemonAbilities = map(result(state.pokemonDetail, 'abilities', []), (ability, index) => 
    (ability.is_hidden && <span key={index} >
      <Chip type="type-ability">{result(ability, 'ability.name')}</Chip>
    </span>)
  )

  const pokemonStat = map(result(state.pokemonDetail, 'stats', []), (stat, index) => (
    <div key={index} className="bar" data-text={stat.stat.name} style={{'--data-state': `${stat.base_stat}%`}}></div>
  ))
  
  return (
    <div id="pokemon-detail" className="pokemon-detail">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className="pokemon-detail--left">
            <div className="pokemon-detail--img">
              <img className="pokemon-detail--monster" src={monsterImage} alt={result(state.pokemonDetail, 'name')} />
              <img className="pokemon-detail--bg1" src={bg1} alt="bg1" />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <div className="pokemon-detail--right">
            <div className="pokemon-detail--header">
              <h1>{result(state.pokemonDetail, 'name')}</h1>
              <h4>{`No. ${id}`}</h4>
            </div>
            <div className="pokemon-detail--desc">
              <p>{result(state.pokemonDetail, 'pokemon_description')}</p>
            </div>
            <div className="pokemon-detail--spesification">
              <div className="pokemon-detail--spesification-type">
                <h4>Type :</h4>
                <div>
                  {pokemonTypes}
                </div>
              </div>
              <div className="pokemon-detail--spesification-weakness">
                <h4>Weakness :</h4>
                <div>
                  {pokemonWeakness}
                </div>
              </div>
              <div className="pokemon-detail--spesification-detail">
                <div className="pokemon-detail--spesification-detail-left">
                  <div>
                    <h4>Height :</h4>
                    <div>
                      {result(state.pokemonDetail, 'height') / 10} m
                    </div>
                  </div>
                  <div>
                    <h4>Weakness :</h4>
                    <div>
                    {result(state.pokemonDetail, 'weight') / 10} kg
                    </div>
                  </div>
                </div>

                <div className="pokemon-detail--spesification-detail-right">
                  <div>
                    <h4>Abilities :</h4>
                    <div>
                      {pokemonAbilities}
                    </div>
                  </div>
                  <div>
                    <h4>Category :</h4>
                    <div>
                      {result(state.pokemonDetail, 'pokemon_category')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pokemon-detail--stat">
              {pokemonStat}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
