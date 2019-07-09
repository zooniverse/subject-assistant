import React from 'react'
import { AppContext } from './store/AppContext'

class Header extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <AppContext.Consumer>
        {(store) => (
          <header>
            <h1>Zoo ML Subject Assistant</h1>
            <h2>Hello, {store.name}</h2>
          </header>
        )}
      </AppContext.Consumer>
    )
  }
}

export default Header
