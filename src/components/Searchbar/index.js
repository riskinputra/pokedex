import React from 'react'

import './styles.scss'

function Searchbar() {
  return (
    <header id="searchbar" className="searchbar">
      <div className="container container-fluid">
        <div className="searchbar-form">
          <input type="text" placeholder="Search pokemon name or number" />
          <button>
            <i className="fa fa-search" />
            Search
          </button>
        </div>
      </div>
    </header>
  )
}

export default Searchbar
