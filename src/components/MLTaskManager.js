import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { stopEvent } from '@util'

class MLTaskManager extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const state = this.state
    const mlTask = this.context.mlTask
    const mlResults = this.context.mlResults
    
    return (
      <form className="mlTaskManager form">
        <h2>ML Task Manager</h2>
        
        <p>
          This lets users fetch results from the ML service.
          For the moment, we're just testing fetch services from pretty much anywhere.
        </p>
        
        <fieldset>
          <legend>Status</legend>
          <var>Task: {mlTask.status} / Results: {mlResults.status}</var>
        </fieldset>
        
        <fieldset>
          <legend>ML Task Request ID</legend>
          <div className="flex-row">
            <input
              className="text input flex-item grow"
              value={mlTask.id}
              onChange={(e) => { mlTask.setId(e.target.value) }}
            />
            <button
              className="action button flex-item"
              onClick={(e) => {
                mlTask.fetch()
                stopEvent(e)
              }}
            >
              Fetch
            </button>
          </div>
        </fieldset>
        
      </form>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)