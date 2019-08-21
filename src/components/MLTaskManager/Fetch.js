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
      <form className="form" onSubmit={(e) => { return stopEvent(e) }}>
        <h2>Fetch Task</h2>
      
        <fieldset>
          <legend>Status</legend>
          <var className="block">Task: {mlTask.status} / Results: {mlResults.status}</var>
          {(mlTask.statusMessage && mlTask.statusMessage.length > 0)
            ? <var className="error block">[Task] {mlTask.statusMessage}</var>
            : null
          }
          {(mlResults.statusMessage && mlResults.statusMessage.length > 0)
            ? <var className="error block">[Results] {mlResults.statusMessage}</var>
            : null
          }
        </fieldset>
        
        <fieldset>
          <legend>ML Task Request ID</legend>
          <div className="flex-row">
            <input className="text input flex-item grow" value={mlTask.id} onChange={(e) => { mlTask.setId(e.target.value) }} />
            <button
              className="action button flex-item"
              type="button"
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
