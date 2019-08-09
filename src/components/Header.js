import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import AppContext from '@store'

function Header() {
  const store = useContext(AppContext)
  return (
    <header>
      <h1>Zoo ML Subject Assistant</h1>
      <nav>
        <Link to="/">Home</Link>
        <label
          className={(store.demoMode) ? 'active' : ''}
        >
          <input
            type="checkbox"
            checked={store.demoMode}
            onChange={store.toggleDemoMode}
          />
          Demo Mode
        </label>
      </nav>
    </header>
  )
}

export default observer(Header)
