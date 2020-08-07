import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { PokemonsContextProvider } from "context/pokemons-context";
import Navbar from 'components/Navbar'

import Home from 'pages/Home'

function App() {
  return (
    <Router>
      <div id="app" className="App">
        <PokemonsContextProvider>
          <Navbar />
          <Switch>
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
