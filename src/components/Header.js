import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import AppContext from '@store'

function Header() {
  const store = useContext(AppContext)
  return (
    <header>
      <h1>Zoo ML Subject Assistant</h1>
      <h2>Hello, {store.user}</h2>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  )
}

export default observer(Header)
