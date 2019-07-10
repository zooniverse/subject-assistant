import React from 'react'
import { observer } from 'mobx-react'
import { AppContext } from './store/AppContext'

function Header(props) {
  console.log('Header', props)
  return (
    <header>
      <h1>Zoo ML Subject Assistant</h1>
      <h2>Hello, {props.name}</h2>
    </header>
  )
}

const ObservableHeader = observer(Header)

class HeaderContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <AppContext.Consumer>
        {(store) => <ObservableHeader name={store.name} /> }
      </AppContext.Consumer>
    )
  }
}

export default HeaderContainer
