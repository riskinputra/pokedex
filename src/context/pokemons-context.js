import React, { useReducer, createContext } from "react"

// Create Context Object
export const PokemonsContext = createContext()

const initState = {
  pokemons: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POKEMONS':
      return {
        pokemons: action.payload
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
