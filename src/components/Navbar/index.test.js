import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom"

import Navbar from './index'

describe('components/Navbar', () => {

  it('has id #navbar', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    )
    const { getByTestId } = screen
    const elementId = getByTestId('navbar')
    expect(elementId).toHaveAttribute('id', 'navbar')
  })

  it('has logo image', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    )
    const { getByAltText } = screen
    const element = getByAltText(/pokedex-logo/i)
    expect(element).toBeInTheDocument()
  })
})
