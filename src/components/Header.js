import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import AppContext from '@store'

function Header() {
  const store = useContext(AppContext)
  
  console.log('+++ ', store.auth.user)
  return (
    <header>
      <h1>Zoo ML Subject Assistant</h1>
      <nav>
        <Link to="/"><i className="material-icons">home</i></Link>
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
        <div className="user">
          {(!store.auth.user)
            ? <button onClick={() => { store.auth.login() }}>Login</button>
            : <button onClick={() => { store.auth.logout() }}>Logout</button>
          }
        </div>
      </nav>
    </header>
  )
}

export default observer(Header)
