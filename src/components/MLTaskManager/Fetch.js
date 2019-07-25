import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'
import { stopEvent } from '@util'

class Fetch extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    const mlTask = this.context.mlTask
    const mlResults = this.context.mlResults
    
    return (
      <form className="form">
        <h2>Fetch Task</h2>
      
        <fieldset>
          <legend>Status</legend>
          <var>Task: {mlTask.status} / Results: {mlResults.status}</var>
        </fieldset>
        
        <fieldset>
          <legend>ML Task Request ID</legend>
          <div className="flex-row">
            <input className="text input flex-item grow" value={mlTask.id} onChange={(e) => { mlTask.setId(e.target.value) }} />
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

Fetch.contextType = AppContext

export default observer(Fetch)
