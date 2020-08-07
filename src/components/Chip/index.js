import React from 'react'
import classnames from 'classnames'

import './styles.scss'

function Chip({ children, type }) {
  return (
    <div className={classnames('chip', type)}>
      {children}
    </div>
  )
}

export default Chip
