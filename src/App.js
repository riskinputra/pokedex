import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { PokemonsContextProvider } from "context/pokemons-context";
import Navbar from 'components/Navbar'

import Home from 'pages/Home'
import Pokemon from 'pages/Pokemon'

function App() {
  return (
    <Router>
      <div id="app" className="App">
        <PokemonsContextProvider>
          <Navbar />
          <Switch>
            <Route path="/pokemon/:id">
              <Pokemon />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </PokemonsContextProvider>
      </div>
    </Router>
  )
}

export default App
