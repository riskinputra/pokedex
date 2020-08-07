import React from 'react'
import classnames from 'classnames'

import './styles.scss'

function Card({ children, radius }) {
  const rounded = radius || 'rounded-1'
  return (
    <div id="card" className={classnames('card', rounded)}>
      {children}
    </div>
  )
}

export default Card
