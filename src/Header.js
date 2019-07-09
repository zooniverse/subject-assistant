import React from 'react'
import { AppContext } from './store/AppContext'

class Header extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <header>
        <h1>Zoo ML Subject Assistant</h1>
        <h2>Hello, {this.context.name}</h2>
      </header>
    )
  }
}

Header.contextType = AppContext

export default Header
