import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'

class MLTaskManager extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const mlTask = this.context.mlTask
    
    return (
      <form className="mlTaskManager form">
        <h2>ML Task Manager</h2>
        
        <p>
          This lets users fetch results from the ML service.
          For the moment, we're just testing fetch services from pretty much anywhere.
        </p>
        
        <fieldset>
          <legend>Status</legend>
          <var>{mlTask.status}</var>
        </fieldset>
        
        <fieldset>
          <legend>URL</legend>
          <input className="text input" value={''} onChange={() => {}} />
          <button className="action button" onClick={() => {}}>Fetch</button>
        </fieldset>
        
      </form>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)