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

const ObservableHeader = observer(Header)

class HeaderContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    console.log(this.context)
    const { displayName } = this.context
    return <ObservableHeader displayName={displayName} />
  }
}
HeaderContainer.contextType = AppContext

export default HeaderContainer
