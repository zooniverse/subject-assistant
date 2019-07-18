import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { AppContext } from '../store/AppContext'

function Header() {
  const store = useContext(AppContext)
  return (
    <header>
      <h1>Zoo ML Subject Assistant</h1>
      <h2>Hello, {store.displayName}</h2>
    </header>
  )
}

export default observer(Header)
