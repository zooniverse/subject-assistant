import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'

class MLTaskManager extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const state = this.state
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
          <legend>ML Task Request ID</legend>
          <div className="flex-row">
            <input className="text input flex-item grow" value={mlTask.id} onChange={(e) => { mlTask.setId(e.target.value) }} />
            <button className="action button flex-item" onClick={() => { mlTask.fetchTask() }}>Fetch</button>
          </div>
        </fieldset>
        
      </form>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)