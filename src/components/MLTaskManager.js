import React from 'react'
import { observer } from 'mobx-react'
import AppContext from '@store'

class MLTaskManager extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      url: 'https://www.zooniverse.org/api/projects?http_cache=true&page=1&sort=-launch_date&launch_approved=true&cards=true&include=avatar&state=live'
    }
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
          <legend>URL</legend>
          <input className="long text input" value={state.url} onChange={(e) => { this.setState({ url: e.target.value }) }} />
          <button className="action button" onClick={() => { mlTask.testFetch(state.url) }}>Fetch</button>
        </fieldset>
        
      </form>
    )
  }  
}

MLTaskManager.contextType = AppContext

export default observer(MLTaskManager)