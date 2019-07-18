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
      <form>
        <h2>ML Task Manager</h2>
        <fieldset>
          <legend>Status</legend>
          <var>{mlTask.status}</var>
        </fieldset>
      </form>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)