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
    console.log(this.context)
    const { name } = this.context
    return <ObservableHeader name={name} />
  }
}
HeaderContainer.contextType = AppContext

export default HeaderContainer
