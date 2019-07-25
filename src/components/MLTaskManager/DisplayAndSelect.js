import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { ASYNC_STATES, stopEvent } from '@util'

class DisplayAndSelect extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const mlTask = this.context.mlTask
    const mlResults = this.context.mlResults
    
    // If the results aren't ready, don't render this component.
    if (mlTask.status !== ASYNC_STATES.SUCCESS && mlResults !== ASYNC_STATES) {
      return null
    }
    
    return (
      <form className="form">
        <h2>Select Subjects</h2>
      </form>
    )
  }  
}

DisplayAndSelect.contextType = AppContext

export default observer(DisplayAndSelect)
