import React, { useContext } from 'react'
import AppContext from '@store'

function Status401() {
  const store = useContext(AppContext)
  return (
    <article>
      <h2>Login Required</h2>
      <div class="info text">
        <button
          class="action button"
          onClick={() => { store.auth.login() }}
        >
          Login
        </button>
      </div>
    </article>
  )
}

export default Status401
