import React from 'react'
import { Link } from 'react-router-dom'

import logo from './img/logo.svg'

import './styles.scss'

function Navbar() {
  return (
    <nav id="navbar" className="navbar" data-testid="navbar">
      <Link to="/">
        <img src={logo} alt="pokedex-logo" />
      </Link>
    </nav>
  )
}

export default Navbar
