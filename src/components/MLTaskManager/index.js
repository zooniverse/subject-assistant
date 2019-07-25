import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import Fetch from './Fetch'

class MLTaskManager extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const state = this.state
    const mlTask = this.context.mlTask
    const mlResults = this.context.mlResults
    
    return (
      <div className="mlTaskManager">
        <h2>ML Task Manager</h2>
        
        <p>
          This lets users fetch results from the ML service.
          For the moment, we're just testing fetch services from pretty much anywhere.
        </p>
        
        <Fetch />
        
      </div>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)