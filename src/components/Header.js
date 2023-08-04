import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import AppContext from '@store'
import zooniverseLogo from '@assets/zooniverse-icon-web-white-small.png'

function Header() {
  const store = useContext(AppContext)
  return (
    <header>
      <div>
        <img class="zooniverse logo" src={zooniverseLogo} alt="Zooniverse logo" />
        <h1>Zooniverse ML Subject Assistant</h1>
      </div>
      <nav>
        <Link to="/"><i className="material-icons">home</i></Link>
        <Link to="/intro">Intro</Link>
        <span class="filler"></span>
        <div className="user">
          {(store.auth.user)
            ? <span>{store.auth.user.display_name || store.auth.user.login}</span>
            : undefined
          }
          {(store.auth.user)
            ? <button onClick={() => { store.auth.logout() }}>Logout</button>
            : <button onClick={() => { store.auth.login() }}>Login</button>
          }
        </div>
      </nav>
    </header>
  )
}

export default observer(Header)
