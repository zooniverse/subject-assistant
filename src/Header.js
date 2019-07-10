import React from 'react'
import { observer } from 'mobx-react'
import { AppContext } from './store/AppContext'

function Header(props) {
  console.log('Header', props)
  return (
    <header>
      <h1>Zoo ML Subject Assistant</h1>
      <h2>Hello, {props.displayName}</h2>
    </header>
  )
}

class HeaderContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const { displayName } = this.context
    console.log('Header context', { displayName } )
    return <Header displayName={displayName} />
  }
}
HeaderContainer.contextType = AppContext

export default observer(HeaderContainer)
