import React, { useReducer, createContext } from "react"

// Create Context Object
export const PokemonsContext = createContext()

const initState = {
  pokemons: {},
  pokemonDetail: {},
  isSearch: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POKEMONS':
      return {
        pokemons: action.payload,
        isSearch: false
      }
    case 'ADD_POKEMONS_DETAILS':
      return {
        pokemonDetail: action.payload,
        isSearch: false
      }
    case 'ADD_POKEMONS_SEARCH':
      return {
        ...state,
        pokemons: { ...state.pokemons, results: [action.payload] },
        isSearch: true
      }
    case 'ADD_POKEMONS_MORE':
      return {
        pokemons: { ...state.pokemons, results: [...state.pokemons.results, ...action.payload.results] },
        isSearch: false
      }
    default:
      throw new Error()
  }
}
// Create a provider for components to consume and subscribe to changes
export const PokemonsContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initState)

  return <PokemonsContext.Provider value={[state, dispatch]}>{props.children}</PokemonsContext.Provider>
}
