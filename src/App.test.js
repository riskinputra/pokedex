import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {

  it('has id #app', () => {
    render(<App/>)
    const { getByTestId } = screen
    const elementId = getByTestId('app')
    expect(elementId).toHaveAttribute('id', 'app')
  })

})
